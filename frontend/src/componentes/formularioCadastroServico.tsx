import React, { useState, useEffect, FormEvent } from 'react';
import { cadastrarServico, atualizarServico } from '../api/servicos';
import { Servico } from './servicos';

type Props = {
    servico: Servico | null;
    onSave: () => void;
    onClose: () => void;
}

export default function FormularioCadastroServico({ servico, onSave, onClose }: Props) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');

    useEffect(() => {
        if (servico) {
            setNome(servico.nome || '');
            setPreco(String(servico.preco) || '');
        }
    }, [servico]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (servico && servico.id) {
                await atualizarServico({ ...servico, nome, preco: Number(preco) });
            } else {
                await cadastrarServico({ nome, preco });
            }
            onSave();
        } catch (error) {
            console.error("Falha ao salvar o serviço:", error);
            alert("Não foi possível salvar o serviço.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{servico?.id ? 'Editar Serviço' : 'Cadastrar Novo Serviço'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Nome do Serviço</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="preco" className="block text-gray-700 text-sm font-bold mb-2">Preço (R$)</label>
                    <input
                        type="number"
                        id="preco"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        step="0.01"
                        min="0"
                    />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
