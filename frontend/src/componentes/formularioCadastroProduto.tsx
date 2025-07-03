import { useEffect, useState } from "react";
import { cadastrarProduto, atualizarProduto } from "../api/produtos";

type Props = {
    produto: any;
    onSave: () => void;
    onClose: () => void;
}

export default function FormularioCadastroProduto({ produto, onSave, onClose }: Props) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);

    useEffect(() => {
        if (produto) {
            setNome(produto.nome || '');
            setPreco(produto.preco || 0);
        }
    }, [produto]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const dadosProduto = { id: produto?.id, nome, preco: Number(preco) };
        if (produto?.id) {
            await atualizarProduto(dadosProduto);
        } else {
            await cadastrarProduto(dadosProduto);
        }
        onSave();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{produto?.id ? 'Editando Produto' : 'Cadastro de Produto'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
                    <input type="number" id="preco" value={preco} onChange={(e) => setPreco(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-primary text-white rounded-md hover:bg-green-dark">{produto?.id ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        </div>
    )
}