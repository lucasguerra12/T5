import axios from 'axios';
import { Servico } from '../componentes/servicos'; // Vamos importar a interface do nosso componente principal

// Configuração do Axios para se comunicar com o backend
const api = axios.create({
  baseURL: 'http://localhost:3001', // A porta deve ser a mesma do backend
});

// Função para buscar todos os serviços no backend
export const getServicos = async () => {
  const response = await api.get('/servicos');
  return response.data;
};

// Função para cadastrar um novo serviço
export const cadastrarServico = async (servico: { nome: string; preco: string }) => {
  const response = await api.post('/servicos', servico);
  return response.data;
};

// Função para atualizar um serviço existente
export const atualizarServico = async (servico: Servico) => {
  const response = await api.put(`/servicos/${servico.id}`, servico);
  return response.data;
};

// Função para excluir um serviço
export const excluirServico = async (id: number) => {
  const response = await api.delete(`/servicos/${id}`);
  return response.data;
};
