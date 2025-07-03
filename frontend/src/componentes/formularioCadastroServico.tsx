import React, { useEffect, useState } from "react";
import { cadastrarServico, atualizarServico } from "../api/servicos";

type Props = {
    servico: any;
    onSave: () => void;
    onClose: () => void;
}

export default function FormularioCadastroServico({ servico, onSave, onClose }: Props) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);

    useEffect(() => {
        if (servico) {
            setNome(servico.nome || '');
            setPreco(servico.preco || 0);
        }
    }, [servico]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const dadosServico = { id: servico?.id, nome, preco: Number(preco) };
        try {
            if (servico?.id) {
                await atualizarServico(dadosServico);
            } else {
                await cadastrarServico(dadosServico);
            }
            onSave();
        } catch (error) {
            console.error("Falha ao salvar serviço:", error);
            alert("Não foi possível salvar o serviço.");
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{servico?.id ? 'Editando Serviço' : 'Cadastro de Serviço'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Serviço</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
                    <input type="number" step="0.01" id="preco" value={preco} onChange={(e) => setPreco(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-primary text-white rounded-md hover:bg-green-dark">{servico?.id ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        </div>
    )
}