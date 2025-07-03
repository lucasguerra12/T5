import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // A porta deve ser a mesma do backend
});

export const getClientesMaisConsumoQuantidade = () => api.get('/listagens/clientes-mais-consumo-quantidade').then(res => res.data);
export const getClientesPorGenero = () => api.get('/listagens/clientes-por-genero').then(res => res.data);
export const getConsumoGeral = () => api.get('/listagens/consumo-geral').then(res => res.data);
export const getConsumoPorGenero = () => api.get('/listagens/consumo-por-genero').then(res => res.data);
export const getClientesMenosConsumoQuantidade = () => api.get('/listagens/clientes-menos-consumo-quantidade').then(res => res.data);
export const getClientesMaisConsumoValor = () => api.get('/listagens/clientes-mais-consumo-valor').then(res => res.data);
