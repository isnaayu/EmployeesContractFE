import ApiInstance from '../api/ApiInstance';
import { PositionsResponse } from '../types/positions';

const API_URL = 'Positions';
export const getAllPositions = async () => {
  const response = await ApiInstance.get<PositionsResponse[]>(API_URL);
  return response;
};

export const createPositions = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await ApiInstance.post(`${API_URL}/import-positions`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
};

export const deletePositionById = async (id: number) => {
    const response = await ApiInstance.delete(`${API_URL}/${id}`);
    return response;
};
