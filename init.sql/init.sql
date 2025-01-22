-- Включение расширения pgcrypto для генерации UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Удаление таблиц, если они существуют (для чистоты тестирования)
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS department;

-- Создание таблицы department
CREATE TABLE department (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL
);

-- Создание таблицы users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Создание таблицы employee
CREATE TABLE employee (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id UUID REFERENCES department(id) ON DELETE SET NULL,
    hire_date DATE NOT NULL
);

-- Вставка тестовых данных в таблицу department
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM department) THEN
        INSERT INTO department (id, name)
        VALUES
            (gen_random_uuid(), 'HR'),
            (gen_random_uuid(), 'Engineering');
    END IF;
END $$;

-- Вставка тестовых данных в таблицу users
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users) THEN
        INSERT INTO users (id, username, password, role, created_at)
        VALUES
            (gen_random_uuid(), 'admin', crypt('password', gen_salt('bf')), 'ADMIN', NOW()),
            (gen_random_uuid(), 'user', crypt('password', gen_salt('bf')), 'USER', NOW());
    END IF;
END $$;

-- Вставка тестовых данных в таблицу employee
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM employee) THEN
        INSERT INTO employee (id, name, position, salary, department_id, hire_date)
        VALUES
            (gen_random_uuid(), 'John Doe', 'Manager', 80000, 
                (SELECT id FROM department WHERE name = 'HR'), '2023-12-01'),
            (gen_random_uuid(), 'Jane Smith', 'Engineer', 60000, 
                (SELECT id FROM department WHERE name = 'Engineering'), '2023-11-15');
    END IF;
END $$;

-- Проверка данных
SELECT * FROM department;
SELECT * FROM users;
SELECT * FROM employee;