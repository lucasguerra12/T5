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
    sobreNome: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
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
    { id: 1, nome: "Ana", sobreNome: "Silva", email: "ana.silva@example.com", endereco: { estado: "SP", cidade: "São Paulo", bairro: "Centro", rua: "Rua A", numero: "123", codigoPostal: "01000-000", informacoesAdicionais: "" }, telefones: [{ ddd: "11", numero: "98765-4321" }] },
    { id: 2, nome: "Bruno", sobreNome: "Santos", email: "bruno.santos@example.com", endereco: { estado: "RJ", cidade: "Rio de Janeiro", bairro: "Copacabana", rua: "Av. B", numero: "456", codigoPostal: "22000-000", informacoesAdicionais: "Apto 101" }, telefones: [{ ddd: "21", numero: "91234-5678" }] },
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



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend completo rodando em http://localhost:${PORT}`);
});
