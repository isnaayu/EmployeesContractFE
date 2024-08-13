import ApiInstance from "../api/ApiInstance";
import { DetailEmployee, DetailEmployeeRequest } from "../types/employee";

const API_URL = 'DetailEmployee';

export const fetchAllDetailEmployees = async (daysUntilContractEnds?: number) => {
    const response = await ApiInstance.get<DetailEmployee[]>(API_URL, {
        params: { daysUntilContractEnds },
    });
    return response;
};

export const fetchDetailEmployeeById = async (detailEmployeeId: number) => {
    const response = await ApiInstance.get(`${API_URL}/${detailEmployeeId}`);
    return response;
};

export const createDetailEmployee = async (file: File, subjectName: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subjectName', subjectName);

    const response = await ApiInstance.post(`${API_URL}/import-detailemployee`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
};

export const updateDetailEmployee = async (employeeRequest: DetailEmployeeRequest) => {
    const response = await ApiInstance.put<DetailEmployee>(API_URL, employeeRequest);
    return response;
};

export const deleteDetailEmployee = async (id: number) => {
    const response = await ApiInstance.delete(`${API_URL}/${id}`);
    return response;
};