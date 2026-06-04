import api from "../../../../../services/api/axios";

export const polishText = async (payload: { text: string; frameworkId: string }) => {
  const { data } = await api.post('/polish', payload);
  return data;
};