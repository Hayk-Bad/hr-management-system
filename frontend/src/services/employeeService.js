import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/employees';

export const getEmployees = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const addEmployee = async (employee) => {
    return await axios.post(BASE_URL, employee);
};

export const updateEmployee = async (id, employee) => {
    return await axios.put(`${BASE_URL}/${id}`, employee);
};

export const deleteEmployee = async (id) => {
    return await axios.delete(`${BASE_URL}/${id}`);
};
