

const API_URL = "http://localhost:32833";

export async function listarProdutos() {
    const resp = await fetch(`${API_URL}/produtos`);
    if (!resp.ok) throw new Error("Erro ao buscar produtos");
    return resp.json();
}
export async function cadastrarProduto(produto: any) {
    const resp = await fetch(`${API_URL}/produto/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    if (!resp.ok) throw new Error("Erro ao cadastrar produto");
    return resp.json();
}

export async function atualizarProduto(produto: any) {
    const resp = await fetch(`${API_URL}/produto/atualizar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    if (!resp.ok) throw new Error("Erro ao atualizar produto");
    return resp;
}

export async function excluirProduto(produto: any) {
    const resp = await fetch(`${API_URL}/produto/excluir`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });
    if (!resp.ok) throw new Error("Erro ao excluir produto");
    return resp;
}