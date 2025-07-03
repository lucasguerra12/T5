import { useState, useEffect } from "react";
import { listarProdutos, excluirProduto, cadastrarProduto, atualizarProduto } from "../api/produtos";
import FormularioCadastroProduto from "./FormularioCadastroProduto";

export default function Produtos() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const data = await listarProdutos();
            setProdutos(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const handleExcluir = async (id: number) => {
        const produtoParaExcluir = produtos.find(p => p.id === id);
        if (produtoParaExcluir) {
            await excluirProduto(produtoParaExcluir);
            fetchProdutos(); 
        }
    };

    const handleOpenModal = (produto: any = null) => {
        setProdutoSelecionado(produto);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProdutoSelecionado(null);
    };

    const handleSave = () => {
        fetchProdutos();
        handleCloseModal();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Produtos</h1>
            <div className="mb-4">
                <button onClick={() => handleOpenModal()} className="bg-green-primary hover:bg-green-dark text-white font-bold py-2 px-4 rounded shadow-md">
                    Cadastrar Novo Produto
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
                        {produtos.map(produto => (
                            <tr key={produto.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{produto.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">R$ {produto.preco.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => handleOpenModal(produto)} className="text-indigo-600 hover:text-indigo-900">
                                        Editar
                                    </button>
                                    <button onClick={() => handleExcluir(produto.id)} className="text-red-600 hover:text-red-900">
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
                        <FormularioCadastroProduto produto={produtoSelecionado} onSave={handleSave} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
}