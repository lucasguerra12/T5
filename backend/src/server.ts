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

let clientes: Cliente[] = [
];
let proximoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;


interface Produto {
    id: number;
    nome: string;
    preco: number;
}

let produtos: Produto[] = [
    { id: 1, nome: 'Shampoo Anti-caspa', preco: 35.50 },
    { id: 2, nome: 'Condicionador Hidratante', preco: 45.00 },
    { id: 3, nome: 'Gel Modelador', preco: 25.00 }
];
let proximoIdProduto = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;




app.get('/clientes', (req, res) => {
    console.log('GET /clientes -> Listando todos os clientes.');
    res.json(clientes);
});


app.get('/cliente/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        console.log(`GET /cliente/${id} -> Cliente encontrado:`, cliente.nome);
        res.json(cliente);
    } else {
        console.log(`GET /cliente/${id} -> Cliente não encontrado.`);
        res.status(404).send('Cliente não encontrado');
    }
});


app.post('/cliente/cadastrar', (req, res) => {
    const novoCliente: Cliente = { ...req.body, id: proximoId++ };
    clientes.push(novoCliente);
    console.log('POST /cliente/cadastrar -> Cliente cadastrado:', novoCliente.nome);
    res.status(201).json(novoCliente);
});


app.put('/cliente/atualizar', (req, res) => {
    const clienteAtualizado: Cliente = req.body;
    const index = clientes.findIndex(c => c.id === clienteAtualizado.id);
    if (index !== -1) {
        clientes[index] = clienteAtualizado;
        console.log('PUT /cliente/atualizar -> Cliente atualizado:', clienteAtualizado.nome);
        res.status(200).json(clientes[index]);
    } else {
        console.log(`PUT /cliente/atualizar -> Cliente com ID ${clienteAtualizado.id} não encontrado.`);
        res.status(404).send('Cliente não encontrado');
    }
});


app.delete('/cliente/excluir', (req, res) => {
    const { id } = req.body;
    const index = clientes.findIndex(c => c.id === id);
    if (index !== -1) {
        const clienteRemovido = clientes.splice(index, 1);
        console.log('DELETE /cliente/excluir -> Cliente excluído:', clienteRemovido[0].nome);
        res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } else {
        console.log(`DELETE /cliente/excluir -> Cliente com ID ${id} não encontrado.`);
        res.status(404).send('Cliente não encontrado');
    }
});

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produto/cadastrar', (req, res) => {
    const novoProduto: Produto = { ...req.body, id: proximoIdProduto++ };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produto/atualizar', (req, res) => {
    const produtoAtualizado: Produto = req.body;
    const index = produtos.findIndex(p => p.id === produtoAtualizado.id);
    if (index !== -1) {
        produtos[index] = produtoAtualizado;
        res.status(200).json(produtos[index]);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.delete('/produto/excluir', (req, res) => {
    const { id } = req.body;
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
        res.status(404).send('Produto não encontrado');
    }
});


const PORT = 32833; 
app.listen(PORT, () => {
    console.log(`Backend em TypeScript rodando em http://localhost:${PORT}`);
});