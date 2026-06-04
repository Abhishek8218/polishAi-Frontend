import api from "../../../../../services/api/axios";

export const getAllHistory = async () => {
    const response = await api.get('/polish-history');  
    return response.data.data
}