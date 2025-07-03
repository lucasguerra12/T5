import axios from 'axios';
import { Servico } from '../componentes/servicos'; 


const api = axios.create({
  baseURL: 'http://localhost:3001', 
});


export const getServicos = async () => {
  const response = await api.get('/servicos');
  return response.data;
};


export const cadastrarServico = async (servico: { nome: string; preco: string }) => {
  const response = await api.post('/servicos', servico);
  return response.data;
};


export const atualizarServico = async (servico: Servico) => {
  const response = await api.put(`/servicos/${servico.id}`, servico);
  return response.data;
};


export const excluirServico = async (id: number) => {
  const response = await api.delete(`/servicos/${id}`);
  return response.data;
};
