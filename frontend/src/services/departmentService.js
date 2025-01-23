import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/departments';

export const getDepartments = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const addDepartment = async (department) => {
    return await axios.post(BASE_URL, department);
};

export const updateDepartment = async (id, department) => {
    return await axios.put(`${BASE_URL}/${id}`, department);
};

export const deleteDepartment = async (id) => {
    return await axios.delete(`${BASE_URL}/${id}`);
};
