import React, { useState, useEffect } from 'react';
import { getServicos, excluirServico } from '../api/servicos';
import FormularioCadastroServico from './formularioCadastroServico';

export interface Servico {
    id: number;
    nome: string;
    preco: number;
}

export default function Servicos() {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

    const fetchServicos = async () => {
        try {
            const data = await getServicos();
            setServicos(data);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
            alert("Não foi possível carregar os serviços. Verifique se o backend está rodando.");
        }
    };

    useEffect(() => {
        fetchServicos();
    }, []);

    const handleExcluir = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
            try {
                await excluirServico(id);
                fetchServicos();
            } catch (error) {
                console.error("Erro ao excluir serviço:", error);
                alert("Não foi possível excluir o serviço.");
            }
        }
    };
    
    const handleOpenModal = (servico: Servico | null = null) => {
        setServicoSelecionado(servico);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setServicoSelecionado(null);
    };

    const handleSave = () => {
        fetchServicos();
        handleCloseModal();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Gerenciamento de Serviços</h1>
            <div className="mb-4">
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300"
                >
                    Cadastrar Novo Serviço
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Preço</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {servicos.map(servico => (
                            <tr key={servico.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{servico.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">R$ {servico.preco.toFixed(2).replace('.', ',')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(servico)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        Editar
                                    </button>
                                    <button onClick={() => handleExcluir(servico.id)} className="text-red-600 hover:text-red-900">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <FormularioCadastroServico 
                        servico={servicoSelecionado} 
                        onSave={handleSave} 
                        onClose={handleCloseModal} 
                    />
                </div>
            )}
        </div>
    );
}
