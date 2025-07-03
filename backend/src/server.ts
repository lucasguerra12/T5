import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

export interface Servico {
    id: number;
    nome: string;
    preco: number;
}


let servicos: Servico[] = [
    { id: 1, nome: 'Manicure', preco: 40.00 },
    { id: 2, nome: 'Pedicure', preco: 50.00 },
];

let proximoIdServico = servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1;





app.get('/servicos', (req, res) => {
    console.log('GET /servicos -> Listando serviços...');
    res.json(servicos);
});


app.post('/servicos', (req, res) => {
    const { nome, preco } = req.body;
    const novoServico: Servico = { 
        id: proximoIdServico++, 
        nome, 
        preco: parseFloat(preco) 
    };
    servicos.push(novoServico);
    console.log('POST /servicos -> Serviço cadastrado:', novoServico);
    res.status(201).json(novoServico);
});


app.put('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, preco } = req.body;
    const index = servicos.findIndex(s => s.id === id);

    if (index !== -1) {
        servicos[index] = { ...servicos[index], nome, preco: parseFloat(preco) };
        console.log(`PUT /servicos/${id} -> Serviço atualizado:`, servicos[index]);
        res.status(200).json(servicos[index]);
    } else {
        res.status(404).send('Serviço não encontrado');
    }
});


app.delete('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const servicoExcluido = servicos.find(s => s.id === id);
    servicos = servicos.filter(s => s.id !== id);
    console.log(`DELETE /servicos/${id} -> Serviço excluído:`, servicoExcluido);
    res.status(200).json({ message: 'Serviço excluído com sucesso' });
});



const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Backend limpo e funcional rodando em http://localhost:${PORT}`);
});
