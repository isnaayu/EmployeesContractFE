import ApiInstance from "../api/ApiInstance";
import { FileListsResponse } from "../types/FileLists";

const API_URL = 'FileLists';
export const getAllFileList = async()=> {
    const response = await ApiInstance.get<FileListsResponse[]>(API_URL);
    return response;
}