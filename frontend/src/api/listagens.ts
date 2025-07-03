import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', 
});

export const getTop10ClientesQuantidade = () => apiClient.get('/relatorio/top-10-clientes-quantidade');
export const getClientesPorGenero = () => apiClient.get('/relatorio/clientes-por-genero');
export const getMaisConsumidos = () => apiClient.get('/relatorio/mais-consumidos');
export const getMaisConsumidosPorGenero = () => apiClient.get('/relatorio/mais-consumidos-por-genero');
export const getBottom10ClientesQuantidade = () => apiClient.get('/relatorio/bottom-10-clientes-quantidade');
export const getTop5ClientesValor = () => apiClient.get('/relatorio/top-5-clientes-valor');