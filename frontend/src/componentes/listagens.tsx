import React, { useEffect, useState } from 'react';
import * as api from '../api/listagens';

const ListagemCard = ({ titulo, data, renderItem }: { titulo: string, data: any[] | null, renderItem: (item: any) => React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{titulo}</h2>
        <ul className="space-y-2">
            {data ? data.map((item, index) => <li key={index} className="p-2 bg-gray-50 rounded">{renderItem(item)}</li>) : <p>Carregando...</p>}
        </ul>
    </div>
);

const ListagemPorGeneroCard = ({ titulo, data, renderItem }: { titulo: string, data: any | null, renderItem: (item: any) => React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{titulo}</h2>
        {data ? Object.keys(data).map(genero => (
            <div key={genero} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">{genero}</h3>
                <ul className="space-y-2 mt-2">
                    {data[genero].length > 0 ? data[genero].map((item: any, index: number) => (
                        <li key={index} className="p-2 bg-gray-50 rounded">{renderItem(item)}</li>
                    )) : <p className="text-sm text-gray-500">Nenhum dado encontrado.</p>}
                </ul>
            </div>
        )) : <p>Carregando...</p>}
    </div>
);


export default function Listagens() {
    const [top10ClientesQuantidade, setTop10ClientesQuantidade] = useState(null);
    const [clientesPorGenero, setClientesPorGenero] = useState(null);
    const [consumoGeral, setConsumoGeral] = useState(null);
    const [consumoPorGenero, setConsumoPorGenero] = useState(null);
    const [bottom10Clientes, setBottom10Clientes] = useState(null);
    const [top5ClientesValor, setTop5ClientesValor] = useState(null);

    useEffect(() => {
        api.getClientesMaisConsumoQuantidade().then(setTop10ClientesQuantidade);
        api.getClientesPorGenero().then(setClientesPorGenero);
        api.getConsumoGeral().then(setConsumoGeral);
        api.getConsumoPorGenero().then(setConsumoPorGenero);
        api.getClientesMenosConsumoQuantidade().then(setBottom10Clientes);
        api.getClientesMaisConsumoValor().then(setTop5ClientesValor);
    }, []);

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Relatórios e Listagens</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ListagemCard 
                    titulo="10 Clientes que Mais Consumiram (Quantidade)"
                    data={top10ClientesQuantidade}
                    renderItem={item => `${item.nome} ${item.sobreNome} - ${item.totalConsumido} itens`}
                />
                <ListagemCard 
                    titulo="5 Clientes que Mais Consumiram (Valor)"
                    data={top5ClientesValor}
                    renderItem={item => `${item.nome} ${item.sobreNome} - R$ ${item.valorTotal.toFixed(2)}`}
                />
                <ListagemCard 
                    titulo="10 Clientes que Menos Consumiram"
                    data={bottom10Clientes}
                    renderItem={item => `${item.nome} ${item.sobreNome} - ${item.totalConsumido} itens`}
                />
                <ListagemCard 
                    titulo="Produtos/Serviços Mais Consumidos (Geral)"
                    data={consumoGeral}
                    renderItem={item => `${item.nome} - ${item.quantidade} consumidos`}
                />
                <ListagemPorGeneroCard
                    titulo="Clientes por Gênero"
                    data={clientesPorGenero}
                    renderItem={item => `${item.nome} ${item.sobreNome}`}
                />
                <ListagemPorGeneroCard
                    titulo="Consumo por Gênero"
                    data={consumoPorGenero}
                    renderItem={item => `${item.nome} - ${item.quantidade} consumidos`}
                />
            </div>
        </div>
    );
}

