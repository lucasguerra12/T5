import { useEffect, useState } from "react"
import { cadastrarCliente, atualizarCliente } from "../api/clientes"

type props = {
    cliente: any;
    onSave?: () => void;
    onClose?: () => void;
    setTela?: Function;
    setCliente?: Function;
}

export default function FormularioCadastro(props: props) {
    // Passo 1: A solução definitiva. Garante que 'cliente' seja sempre um objeto.
    const cliente = props.cliente || {};
    const { onSave, onClose, setTela, setCliente } = props;

    const [nome, setNome] = useState('')
    const [nomeSocial, setNomeSocial] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataEmissaoCpf, setDataEmissaoCpf] = useState('')
    const [telefones, setTelefones] = useState([''])
    const [ddd, setDdd] = useState([''])
    const [endereco, setEndereco] = useState({
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        codigoPostal: '',
        informacoesAdicionais: ''
    })

    // Passo 2: O useEffect agora depende da variável 'cliente' que é sempre segura.
    useEffect(() => {
        if (cliente.id) {
            setNome(cliente.nome || '');
            setNomeSocial(cliente.nomeSocial || '');
            setCpf(cliente.cpf?.valor || '');
            setDataEmissaoCpf(cliente.cpf?.dataEmissao || '');
            setTelefones(cliente.telefones?.map((telefone: any) => telefone.numero) || ['']);
            setDdd(cliente.telefones?.map((telefone: any) => telefone.ddd) || ['']);
            setEndereco(cliente.endereco || { estado: '', cidade: '', bairro: '', rua: '', numero: '', codigoPostal: '', informacoesAdicionais: '' });
        }
    }, [cliente])

    const handleTelefoneChange = (index: number, value: string) => {
        const newTelefones = [...telefones];
        newTelefones[index] = value;
        setTelefones(newTelefones);
    };
    
    const handleDddChange = (index: number, value: string) => {
        const newDdd = [...ddd];
        newDdd[index] = value;
        setDdd(newDdd);
    };

    const addTelefone = () => {
        setTelefones([...telefones, '']);
        setDdd([...ddd, '']);
    };

    async function submeterFormulario(e: any) {
        e.preventDefault()
        let telefonesFormatados = telefones.map((telefone, index) => {
            return {
                numero: telefone,
                ddd: ddd[index]
            }
        })
        let objeto = {
            id: cliente.id,
            nome: nome,
            nomeSocial: nomeSocial,
            endereco: endereco,
            cpf: {
                valor: cpf,
                dataEmissao: dataEmissaoCpf
            },
            telefones: telefonesFormatados
        }

        if (cliente.id) {
            await atualizarCliente(objeto)
        } else {
            await cadastrarCliente(objeto)
        }

        if (onSave) {
            onSave();
        } else if (setTela) {
            setCliente && setCliente({});
            setTela('Clientes');
        }
    }

    function handleCancel() {
        if (onClose) {
            onClose();
        } else if (setTela) {
            setTela('Clientes');
        }
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{cliente.id ? 'Editando Cliente' : 'Cadastro de Cliente'}</h1>
            <form onSubmit={submeterFormulario} className="space-y-4">
                {/* O restante do formulário continua o mesmo */}
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="nomeSocial" className="block text-sm font-medium text-gray-700">Nome Social</label>
                    <input type="text" id="nomeSocial" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                    <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="dataEmissaoCpf" className="block text-sm font-medium text-gray-700">Data de Emissão do CPF</label>
                    <input type="date" id="dataEmissaoCpf" value={dataEmissaoCpf} onChange={(e) => setDataEmissaoCpf(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Telefones</label>
                    {telefones.map((telefone, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input type="text" placeholder="DDD" value={ddd[index]} onChange={(e) => handleDddChange(index, e.target.value)} className="w-1/4 mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                            <input type="text" placeholder="Número" value={telefone} onChange={(e) => handleTelefoneChange(index, e.target.value)} className="w-3/4 mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    ))}
                    <button type="button" onClick={addTelefone} className="text-sm text-indigo-600 hover:text-indigo-900">Adicionar outro telefone</button>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Endereço</label>
                    <input type="text" placeholder="Estado" value={endereco.estado} onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                    <input type="text" placeholder="Cidade" value={endereco.cidade} onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                    <input type="text" placeholder="Bairro" value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                    <input type="text" placeholder="Rua" value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                    <input type="text" placeholder="Número" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                    <input type="text" placeholder="Código Postal" value={endereco.codigoPostal} onChange={(e) => setEndereco({ ...endereco, codigoPostal: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                    <input type="text" placeholder="Informações Adicionais" value={endereco.informacoesAdicionais} onChange={(e) => setEndereco({ ...endereco, informacoesAdicionais: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                </div>
                
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-primary text-white rounded-md hover:bg-green-dark">{cliente.id ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        </div>
    )
}