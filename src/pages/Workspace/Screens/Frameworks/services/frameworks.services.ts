import api from "../../../../../services/api/axios";
import type { CreateFrameworkInput, UpdateFrameworkInput } from "../type";




export const getAllFrameworks = async () => {
    const response = await api.get('/frameworks');  
    return response.data.data
}

export const createFramework = async (payload: CreateFrameworkInput) => {
    const response = await api.post('/frameworks', payload);  
    return response.data.data
}
export const updateFramework = async (id: string, data: UpdateFrameworkInput) => {
  const response = await api.patch(`/frameworks/${id}`, data);
  return response.data;
};

export const deleteFramework = async (id: string) => {
  const response = await api.delete(`/frameworks/${id}`);
  return response.data;
};

export const getFrameworkById = async (id: string) => {
  const response = await api.get(`/frameworks/${id}`);
  return response.data;
};
