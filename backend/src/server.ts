import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


interface Telefone {
    ddd: string;
    numero: string;
}

interface Endereco {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

interface Cliente {
    id: number;
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rgs: string[];
    dataCadastro: Date;
    telefones: string[];
    produtosConsumidos: number[];
    servicosConsumidos: number[];
}


interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface Servico {
    id: number;
    nome: string;
    preco: number;
}


let clientes: Cliente[] = [
    {
        id: 1,
        nome: "João Silva",
        nomeSocial: "João",
        genero: "Masculino",
        cpf: "123.456.789-00",
        rgs: ["12.345.678-9"],
        dataCadastro: new Date(),
        telefones: ["(11) 98765-4321"],
        produtosConsumidos: [1, 2],
        servicosConsumidos: [1],
    },
];
let produtos: Produto[] = [
    { id: 1, nome: "Shampoo Hidratante Profundo", preco: 45.90 },
    { id: 2, nome: "Condicionador Reconstrutor", preco: 49.90 },
];
let servicos: Servico[] = [
    { id: 1, nome: 'Manicure', preco: 40.00 },
    { id: 2, nome: 'Pedicure', preco: 50.00 },
];


let proximoIdCliente = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
let proximoIdProduto = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
let proximoIdServico = servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1;



app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.post('/clientes', (req, res) => {
    const novoCliente: Cliente = { ...req.body, id: proximoIdCliente++ };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = clientes.findIndex(c => c.id === id);
    if (index !== -1) {
        clientes[index] = { ...req.body, id };
        res.status(200).json(clientes[index]);
    } else {
        res.status(404).send('Cliente não encontrado');
    }
});

app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    clientes = clientes.filter(c => c.id !== id);
    res.status(200).json({ message: 'Cliente excluído com sucesso' });
});



app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    const novoProduto: Produto = { id: proximoIdProduto++, nome, preco: parseFloat(preco) };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, preco } = req.body;
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos[index] = { ...produtos[index], nome, preco: parseFloat(preco) };
        res.status(200).json(produtos[index]);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    produtos = produtos.filter(p => p.id !== id);
    res.status(200).json({ message: 'Produto excluído com sucesso' });
});



app.get('/servicos', (req, res) => {
    res.json(servicos);
});

app.post('/servicos', (req, res) => {
    const { nome, preco } = req.body;
    const novoServico: Servico = { id: proximoIdServico++, nome, preco: parseFloat(preco) };
    servicos.push(novoServico);
    res.status(201).json(novoServico);
});

app.put('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, preco } = req.body;
    const index = servicos.findIndex(s => s.id === id);
    if (index !== -1) {
        servicos[index] = { ...servicos[index], nome, preco: parseFloat(preco) };
        res.status(200).json(servicos[index]);
    } else {
        res.status(404).send('Serviço não encontrado');
    }
});

app.delete('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    servicos = servicos.filter(s => s.id !== id);
    res.status(200).json({ message: 'Serviço excluído com sucesso' });
});

app.get('/api/relatorio/top-10-clientes-quantidade', (req, res) => {
    const clientesComContagem = clientes.map(cliente => ({
        ...cliente,
        quantidade: cliente.produtosConsumidos.length + cliente.servicosConsumidos.length
    }));
    const top10 = clientesComContagem.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);
    res.json(top10);
});

// ROTA 2: Listagem de todos os clientes por gênero
app.get('/api/relatorio/clientes-por-genero', (req, res) => {
    // CORREÇÃO: Usando reduce para agrupar os clientes de forma mais segura
    const clientesPorGenero = clientes.reduce((acc, cliente) => {
        const genero = cliente.genero;
        if (!acc[genero]) {
            acc[genero] = [];
        }
        acc[genero].push(cliente);
        return acc;
    }, {} as { [key: string]: Cliente[] });
    res.json(clientesPorGenero);
});

// ROTA 3: Listagem geral dos serviços ou produtos mais consumidos
app.get('/api/relatorio/mais-consumidos', (req, res) => {
    const contagem: { [key: string]: { nome: string, tipo: 'Produto' | 'Serviço', quantidade: number } } = {};

    clientes.forEach(cliente => {
        cliente.produtosConsumidos.forEach(idProduto => {
            const produto = produtos.find(p => p.id === idProduto);
            if (produto) {
                const chave = `produto-${idProduto}`;
                if (!contagem[chave]) {
                    contagem[chave] = { nome: produto.nome, tipo: 'Produto', quantidade: 0 };
                }
                contagem[chave].quantidade++;
            }
        });

        cliente.servicosConsumidos.forEach(idServico => {
            const servico = servicos.find(s => s.id === idServico);
            if (servico) {
                const chave = `servico-${idServico}`;
                if (!contagem[chave]) {
                    contagem[chave] = { nome: servico.nome, tipo: 'Serviço', quantidade: 0 };
                }
                contagem[chave].quantidade++;
            }
        });
    });

    const listaConsumidos = Object.values(contagem).sort((a, b) => b.quantidade - a.quantidade);
    res.json(listaConsumidos);
});

// ROTA 4: Listagem dos serviços ou produtos mais consumidos por gênero
app.get('/api/relatorio/mais-consumidos-por-genero', (req, res) => {
    type ConsumoItem = { nome: string; tipo: 'Produto' | 'Serviço'; quantidade: number };
    const consumoPorGenero: { [key: string]: { [key: string]: ConsumoItem } } = {};

    clientes.forEach(cliente => {
        const genero = cliente.genero;
        if (!consumoPorGenero[genero]) {
            consumoPorGenero[genero] = {};
        }
        
        const processaConsumo = (item: Produto | Servico | undefined, tipo: 'Produto' | 'Serviço') => {
            if (!item) return;
            const chave = `${tipo.toLowerCase()}-${item.id}`;
            if (!consumoPorGenero[genero][chave]) {
                consumoPorGenero[genero][chave] = { nome: item.nome, tipo, quantidade: 0 };
            }
            consumoPorGenero[genero][chave].quantidade++;
        };
        
        cliente.produtosConsumidos.forEach(id => processaConsumo(produtos.find(p => p.id === id), 'Produto'));
        cliente.servicosConsumidos.forEach(id => processaConsumo(servicos.find(s => s.id === id), 'Serviço'));
    });
    
    const resultadoFinal: { [key: string]: ConsumoItem[] } = {};
    for (const genero in consumoPorGenero) {
        resultadoFinal[genero] = Object.values(consumoPorGenero[genero]).sort((a, b) => b.quantidade - a.quantidade);
    }

    res.json(resultadoFinal);
});

// ROTA 5: Listagem dos 10 clientes que menos consumiram
app.get('/api/relatorio/bottom-10-clientes-quantidade', (req, res) => {
    const clientesComContagem = clientes.map(cliente => ({
        ...cliente,
        quantidade: cliente.produtosConsumidos.length + cliente.servicosConsumidos.length
    }));
    const bottom10 = clientesComContagem.sort((a, b) => a.quantidade - b.quantidade).slice(0, 10);
    res.json(bottom10);
});

// ROTA 6: Listagem dos 5 clientes que mais consumiram em valor
app.get('/api/relatorio/top-5-clientes-valor', (req, res) => {
    const clientesComValor = clientes.map(cliente => {
        const valorProdutos = cliente.produtosConsumidos.reduce((total, idProduto) => {
            const produto = produtos.find(p => p.id === idProduto);
            return total + (produto ? produto.preco : 0);
        }, 0);

        const valorServicos = cliente.servicosConsumidos.reduce((total, idServico) => {
            const servico = servicos.find(s => s.id === idServico);
            return total + (servico ? servico.preco : 0);
        }, 0);

        return { ...cliente, valorTotal: valorProdutos + valorServicos };
    });

    const top5 = clientesComValor.sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 5);
    res.json(top5);
});




const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend completo rodando em http://localhost:${PORT}`);
});
