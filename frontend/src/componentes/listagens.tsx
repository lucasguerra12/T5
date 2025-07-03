// frontend/src/componentes/Listagens.tsx
import React, { useEffect, useState } from 'react';
import * as relatoriosApi from '../api/listagens';

export default function Listagens() {
    const [top10Clientes, setTop10Clientes] = useState<any[]>([]);
    const [clientesGenero, setClientesGenero] = useState<any>({});
    const [maisConsumidos, setMaisConsumidos] = useState<any[]>([]);
    // ... outros estados para as demais listagens

    useEffect(() => {
        const fetchData = async () => {
            const top10Res = await relatoriosApi.getTop10ClientesQuantidade();
            setTop10Clientes(top10Res.data);

            const generoRes = await relatoriosApi.getClientesPorGenero();
            setClientesGenero(generoRes.data);

            const maisConsumidosRes = await relatoriosApi.getMaisConsumidos();
            setMaisConsumidos(maisConsumidosRes.data);

        };
        fetchData();
    }, []);

    const renderTop10Clientes = () => (
        <div>
            <h2 className="text-xl font-bold mb-2">1. Top 10 Clientes (Quantidade)</h2>
            <ul className="list-disc pl-5">
                {top10Clientes.map(cliente => (
                    <li key={cliente.id}>{cliente.nome} - {cliente.quantidade} itens</li>
                ))}
            </ul>
        </div>
    );

    const renderClientesPorGenero = () => (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">2. Clientes por Gênero</h2>
            {Object.keys(clientesGenero).map(genero => (
                <div key={genero} className="mb-3">
                    <h3 className="text-lg font-semibold">{genero}</h3>
                    <ul className="list-disc pl-5">
                        {clientesGenero[genero].map((cliente: any) => (
                            <li key={cliente.id}>{cliente.nome}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderMaisConsumidos = () => (
         <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">3. Itens Mais Consumidos (Geral)</h2>
            <ul className="list-disc pl-5">
                {maisConsumidos.map((item, index) => (
                    <li key={index}>{item.nome} ({item.tipo}) - {item.quantidade} vezes</li>
                ))}
            </ul>
        </div>
    );



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Relatórios e Listagens</h1>
            {renderTop10Clientes()}
            {renderClientesPorGenero()}
            {renderMaisConsumidos()}
        </div>
    );
}