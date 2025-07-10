# World Beauty (WB) - Sistema de Gestão de Clientes, Produtos e Serviços

## Sobre o Projeto

Este projeto foi desenvolvido para a empresa fictícia **World Beauty (WB)**, atendendo aos requisitos de um sistema de gestão completo para clientes, produtos e serviços, com arquitetura distribuída e interface SPA (Single Page Application) utilizando React e TypeScript.

O sistema permite o cadastro, atualização, exclusão e listagem de clientes, produtos e serviços, além de relatórios e listagens especiais para análise de consumo. Toda a comunicação com o banco de dados é feita de forma assíncrona, garantindo uma experiência fluida e moderna para o usuário.

---

## Tecnologias Utilizadas

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Typescript 
- **Gerenciamento de Estado:** React Hooks
- **Ambiente de Desenvolvimento:** VSCode

---

## Versões Recomendadas e Comandos de Execução

### Versões de Softwares e Bibliotecas Fundamentais

- **Node.js:** 18.19.0  
- **npm:** 9.8.1  
- **React:** 18.2.0  
- **TypeScript:** 4.9.5  
- **TailwindCSS:** 3.3.3  
- **Supabase JS:** 2.39.7  
- **@heroicons/react:** 2.1.1  
- **VSCode:** 1.89.1

As versões exatas das dependências podem ser conferidas no arquivo `package.json`.

---

### Ordem e Comandos para Execução do Projeto

1. **Clone o repositório**
    ```bash
    git clone https://github.com/lucasguerra12/T5.git
    cd T5
    ```

2. **Instale as dependências no frontend e backend**
    ```bash
    #no front use o seguinte comando para instalar corretamente#

    npm install --legacy-peer-deps

    ```

3. **Inicie o projeto no back e no front com:**
    ```bash
    npm start
    ```

---

## Funcionalidades

### Clientes

- Cadastro de clientes com endereço, telefone e gênero (masculino/feminino)
- Atualização de dados do cliente (nome, sobrenome, email, gênero, endereço, telefones, produtos e serviços associados)
- Exclusão de clientes
- Listagem geral de clientes com filtro por nome
- Listagem de clientes por gênero
- Listagem dos 10 clientes que mais consumiram produtos/serviços (quantidade)
- Listagem dos 10 clientes que menos consumiram produtos/serviços (quantidade)
- Listagem dos 5 clientes que mais consumiram em valor

### Produtos

- Cadastro de produtos com nome e valor
- Atualização e exclusão de produtos
- Listagem de todos os produtos

### Serviços

- Cadastro de serviços com nome e valor
- Atualização e exclusão de serviços
- Listagem de todos os serviços

### Listagens Especiais

- Top 10 produtos/serviços mais consumidos (geral)
- Top 10 produtos/serviços mais consumidos por gênero (seleção por botão)
- Todas as listagens apresentam visual moderno, responsivo e intuitivo

---

## Arquitetura

- **SPA (Single Page Application):** Toda a navegação é feita sem recarregar a página, proporcionando uma experiência fluida.
- **Arquitetura distribuída:** O frontend se comunica com o backend 
- **Componentização:** O código é organizado em componentes reutilizáveis para facilitar manutenção e evolução do sistema.

---


## Modelo Relacional (Recomendado)

- **clientes** (id, nome, sobrenome, email, genero, endereco_id)
- **enderecos** (id, estado, cidade, bairro, rua, numero, codigo_postal, informacoes_adicionais)
- **telefones** (id, ddd, numero, cliente_id)
- **produtos** (id, nome, valor)
- **servicos** (id, nome, valor)
- **produtos_consumidos** (id, cliente_id, produto_id)
- **servicos_consumidos** (id, cliente_id, servico_id)

---

## Funções SQL Especiais (Supabase)

Crie as funções abaixo no SQL Editor do Supabase para habilitar as listagens especiais:

### Top 10 produtos/serviços mais consumidos (geral)

```sql
CREATE OR REPLACE FUNCTION mais_consumidos_geral()
RETURNS TABLE (
    id INT,
    nome VARCHAR,
    tipo VARCHAR,
    total_consumido INT
) AS $$
SELECT p.id, p.nome, 'produto' AS tipo, COUNT(pc.produto_id) AS total_consumido
FROM produtos p
LEFT JOIN produtos_consumidos pc ON p.id = pc.produto_id
GROUP BY p.id, p.nome
UNION ALL
SELECT s.id, s.nome, 'serviço' AS tipo, COUNT(sc.servico_id) AS total_consumido
FROM servicos s
LEFT JOIN servicos_consumidos sc ON s.id = sc.servico_id
GROUP BY s.id, s.nome
ORDER BY total_consumido DESC, nome
LIMIT 10;
$$ LANGUAGE SQL;
```

### Top 10 produtos/serviços mais consumidos por gênero

```sql
CREATE OR REPLACE FUNCTION mais_consumidos_por_genero_filtrado(genero_param VARCHAR)
RETURNS TABLE (
    id INT,
    nome VARCHAR,
    tipo VARCHAR,
    total_consumido INT
) AS $$
SELECT 
    p.id, 
    p.nome, 
    'produto' AS tipo, 
    COUNT(pc.produto_id) AS total_consumido
FROM produtos p
JOIN produtos_consumidos pc ON p.id = pc.produto_id
JOIN clientes c ON pc.cliente_id = c.id
WHERE c.genero = genero_param::genero_enum
GROUP BY p.id, p.nome

UNION ALL

SELECT 
    s.id, 
    s.nome, 
    'serviço' AS tipo, 
    COUNT(sc.servico_id) AS total_consumido
FROM servicos s
JOIN servicos_consumidos sc ON s.id = sc.servico_id
JOIN clientes c ON sc.cliente_id = c.id
WHERE c.genero = genero_param::genero_enum
GROUP BY s.id, s.nome

ORDER BY total_consumido DESC, nome
LIMIT 10;
$$ LANGUAGE SQL;
```

### Top 10 maiores consumidores (quantidade)

```sql
CREATE OR REPLACE FUNCTION top_consumidores_quantidade()
RETURNS TABLE (
    id INT,
    nome VARCHAR,
    sobrenome VARCHAR,
    produtos_qtd INT,
    servicos_qtd INT,
    total_consumido INT
) AS $$
SELECT
    c.id,
    c.nome,
    c.sobrenome,
    COALESCE(pc.produtos_qtd, 0) AS produtos_qtd,
    COALESCE(sc.servicos_qtd, 0) AS servicos_qtd,
    COALESCE(pc.produtos_qtd, 0) + COALESCE(sc.servicos_qtd, 0) AS total_consumido
FROM clientes c
LEFT JOIN (
    SELECT cliente_id, COUNT(*) AS produtos_qtd
    FROM produtos_consumidos
    GROUP BY cliente_id
) pc ON c.id = pc.cliente_id
LEFT JOIN (
    SELECT cliente_id, COUNT(*) AS servicos_qtd
    FROM servicos_consumidos
    GROUP BY cliente_id
) sc ON c.id = sc.cliente_id
ORDER BY total_consumido DESC
LIMIT 10;
$$ LANGUAGE SQL;
```

### Top 10 menores consumidores (quantidade)

```sql
CREATE OR REPLACE FUNCTION bottom_consumidores_quantidade()
RETURNS TABLE (
    id INT,
    nome VARCHAR,
    sobrenome VARCHAR,
    produtos_qtd INT,
    servicos_qtd INT,
    total_consumido INT
) AS $$
SELECT
    c.id,
    c.nome,
    c.sobrenome,
    COALESCE(pc.produtos_qtd, 0) AS produtos_qtd,
    COALESCE(sc.servicos_qtd, 0) AS servicos_qtd,
    COALESCE(pc.produtos_qtd, 0) + COALESCE(sc.servicos_qtd, 0) AS total_consumido
FROM clientes c
LEFT JOIN (
    SELECT cliente_id, COUNT(*) AS produtos_qtd
    FROM produtos_consumidos
    GROUP BY cliente_id
) pc ON c.id = pc.cliente_id
LEFT JOIN (
    SELECT cliente_id, COUNT(*) AS servicos_qtd
    FROM servicos_consumidos
    GROUP BY cliente_id
) sc ON c.id = sc.cliente_id
ORDER BY total_consumido ASC, c.nome
LIMIT 10;
$$ LANGUAGE SQL;
```

### Top 5 clientes por valor consumido

```sql
CREATE OR REPLACE FUNCTION top5_consumidores_valor()
RETURNS TABLE (
    id INT,
    nome VARCHAR,
    sobrenome VARCHAR,
    valor_produtos NUMERIC,
    valor_servicos NUMERIC,
    valor_total NUMERIC
) AS $$
SELECT
    c.id,
    c.nome,
    c.sobrenome,
    COALESCE(SUM(p.valor), 0) AS valor_produtos,
    COALESCE(SUM(s.valor), 0) AS valor_servicos,
    COALESCE(SUM(p.valor), 0) + COALESCE(SUM(s.valor), 0) AS valor_total
FROM clientes c
LEFT JOIN produtos_consumidos pc ON c.id = pc.cliente_id
LEFT JOIN produtos p ON pc.produto_id = p.id
LEFT JOIN servicos_consumidos sc ON c.id = sc.cliente_id
LEFT JOIN servicos s ON sc.servico_id = s.id
GROUP BY c.id, c.nome, c.sobrenome
ORDER BY valor_total DESC
LIMIT 5;
$$ LANGUAGE SQL;
```

---

## Telas do Sistema

- **Home:** Acesso rápido às principais funcionalidades.
- **Clientes:** Cadastro, atualização, exclusão e listagem.
- **Produtos:** Cadastro, atualização, exclusão e listagem.
- **Serviços:** Cadastro, atualização, exclusão e listagem.
- **Listagens Especiais:** Relatórios e análises de consumo.

---

## Experiência do Usuário

- Interface responsiva e intuitiva
- Navegação rápida sem recarregar a página
- Feedback visual para todas as operações (sucesso/erro)
- Filtros e buscas para facilitar o uso

---

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para melhorias!

---

## Licença

Este projeto é acadêmico e não possui licença comercial.

---

**World Beauty (WB) - Sistema de Gestão**  
Desenvolvido para a disciplina de Tecnicas de Programacao I - Fatec  
Professor Dr. Eng. Gerson
