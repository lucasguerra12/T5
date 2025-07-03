import { useState, useEffect } from "react";
import { excluirCliente, listarClientes } from "../api/clientes";
import Modal from "./Modal";
import VisualizarModal from "./VisualizarModal";

export default function Clientes() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [clienteParaVisualizar, setClienteParaVisualizar] = useState<any>(null);
    const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const data = await listarClientes();
        setClientes(data);
    };

    const handleExcluir = async (id: number) => {
        const clienteParaExcluir = clientes.find(c => c.id === id);
        if (clienteParaExcluir) {
            await excluirCliente(clienteParaExcluir);
            fetchClientes();
        }
    };

    const handleOpenEditModal = (cliente: any = null) => {
        setClienteSelecionado(cliente);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setClienteSelecionado(null);
    };
    
    const handleOpenVisualizarModal = (cliente: any) => {
        setClienteParaVisualizar(cliente);
        setIsVisualizarModalOpen(true);
    };
    
    const handleCloseVisualizarModal = () => {
        setIsVisualizarModalOpen(false);
        setClienteParaVisualizar(null);
    };

    const handleSave = () => {
        fetchClientes();
        handleCloseEditModal();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <div className="mb-4">
                <button onClick={() => handleOpenEditModal()} className="bg-green-primary hover:bg-green-dark text-white font-bold py-2 px-4 rounded shadow-md">
                    Cadastrar Novo Cliente
                </button>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sobrenome</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {clientes.map(cliente => (
                            <tr key={cliente.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cliente.sobreNome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => handleOpenVisualizarModal(cliente)} className="text-blue-600 hover:text-blue-900">
                                        Visualizar
                                    </button>
                                    <button onClick={() => handleOpenEditModal(cliente)} className="text-indigo-600 hover:text-indigo-900">
                                        Editar
                                    </button>
                                    <button onClick={() => handleExcluir(cliente.id)} className="text-red-600 hover:text-red-900">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditModalOpen && (
                <Modal cliente={clienteSelecionado} onClose={handleCloseEditModal} onSave={handleSave} />
            )}

            {isVisualizarModalOpen && (
                <VisualizarModal cliente={clienteParaVisualizar} onClose={handleCloseVisualizarModal} />
            )}
        </div>
    );
}