-- Включение расширения pgcrypto для генерации UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Удаление таблиц, если они существуют (для чистоты тестирования)
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;

-- Создание таблицы department
CREATE TABLE department (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);

-- Вставка данных в таблицу department
INSERT INTO department (id, name)
VALUES
    ('936ead6d-03d3-48bf-b989-5ef42d0fb80b', 'HR'),
    ('106e18b3-7187-40e1-9294-1b987d49cd21', 'Engineering');

-- Создание таблицы employee
CREATE TABLE employee (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    birth_date DATE,
    age INT,
    citizenship VARCHAR(255),
    passport_number VARCHAR(255) UNIQUE,
    address TEXT,
    education TEXT,
    military_record TEXT,
    work_activity TEXT,
    vacation TEXT,
    position VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id UUID NOT NULL,
    hire_date DATE NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

-- Вставка данных в таблицу employee
INSERT INTO employee (last_name, first_name, middle_name, birth_date, age, citizenship, passport_number, address, education, military_record, work_activity, vacation, position, salary, department_id, hire_date)
VALUES
    ('Smith', 'John', 'A.', '1980-05-15', 44, 'USA', '123456789', '123 Main St, New York, NY', 'Bachelor of Science', 'None', 'Software Engineer at XYZ Inc.', '2023-01-10 to 2023-01-20', 'Manager', 85000.00, '936ead6d-03d3-48bf-b989-5ef42d0fb80b', '2022-06-01'),
    ('Doe', 'Jane', 'B.', '1990-07-20', 34, 'Canada', '987654321', '456 Maple Ave, Toronto, ON', 'Master of Arts', 'None', 'HR Specialist at ABC Ltd.', '2023-02-15 to 2023-02-25', 'HR Specialist', 60000.00, '936ead6d-03d3-48bf-b989-5ef42d0fb80b', '2021-11-15'),
    ('Johnson', 'Robert', NULL, '1985-03-10', 39, 'UK', '192837465', '789 Oak Dr, London, UK', 'PhD in Physics', 'Served in the UK Army', 'Research Scientist at DEF Corp.', '2023-03-01 to 2023-03-10', 'Researcher', 95000.00, '106e18b3-7187-40e1-9294-1b987d49cd21', '2018-09-01'),
    ('Brown', 'Emily', 'C.', '1995-09-25', 29, 'Australia', '564738291', '101 Pine Rd, Sydney, AU', 'Bachelor of Engineering', 'None', 'Junior Engineer at GHI Ltd.', '2023-04-10 to 2023-04-20', 'Engineer', 70000.00, '106e18b3-7187-40e1-9294-1b987d49cd21', '2020-05-15'),
    ('Taylor', 'Michael', 'D.', '1992-12-01', 32, 'Germany', '314159265', '202 Elm St, Berlin, DE', 'MBA', 'None', 'Marketing Manager at JKL Inc.', '2023-05-05 to 2023-05-15', 'Marketing Manager', 80000.00, '936ead6d-03d3-48bf-b989-5ef42d0fb80b', '2019-07-01');

-- Проверка данных
SELECT * FROM department;
SELECT * FROM employee;