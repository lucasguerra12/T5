import { useState, useEffect } from "react";
import { listarServicos, excluirServico } from "../api/servicos";
import FormularioCadastroServico from "./formularioCadastroServico";

export default function Servicos() {
    const [servicos, setServicos] = useState<any[]>([]);
    const [servicoSelecionado, setServicoSelecionado] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchServicos();
    }, []);

    const fetchServicos = async () => {
        try {
            const data = await listarServicos();
            setServicos(data);
        } catch (error) {
            console.error("Erro ao buscar servicos:", error);
        }
    };

    const handleExcluir = async (id: number) => {
        const servicoParaExcluir = servicos.find(p => p.id === id);
        if (servicoParaExcluir) {
            await excluirServico(servicoParaExcluir);
            fetchServicos();
        }
    };

    const handleOpenModal = (servico: any = null) => {
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
            <h1 className="text-2xl font-bold mb-4">Serviços</h1>
            <div className="mb-4">
                <button onClick={() => handleOpenModal()} className="bg-green-primary hover:bg-green-dark text-white font-bold py-2 px-4 rounded shadow-md">
                    Cadastrar Novo Serviço
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {servicos.map(servico => (
                            <tr key={servico.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{servico.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">R$ {servico.preco.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => handleOpenModal(servico)} className="text-indigo-600 hover:text-indigo-900">
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
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
                        <FormularioCadastroServico servico={servicoSelecionado} onSave={handleSave} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
}