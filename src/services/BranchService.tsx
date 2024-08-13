import ApiInstance from "../api/ApiInstance";
import { BranchResponse } from "../types/branches";

const API_URL = 'Branch';
export const getAllBranch = async()=> {
    const response = await ApiInstance.get<BranchResponse[]>(API_URL);
    return response;
}


export const createBranch = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await ApiInstance.post(`${API_URL}/import-branches`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
};

export const deleteBranchById = async (id: number) => {
    const response = await ApiInstance.delete(`${API_URL}/${id}`);
    return response;
};