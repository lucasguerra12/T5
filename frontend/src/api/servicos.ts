const API_URL = "http://localhost:32833";

export async function listarServicos() {
    const resp = await fetch(`${API_URL}/servicos`);
    if (!resp.ok) throw new Error("Erro ao buscar serviços");
    return resp.json();
}

export async function cadastrarServico(servico: any) {
    const resp = await fetch(`${API_URL}/servico/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico)
    });
    if (!resp.ok) throw new Error("Erro ao cadastrar serviço");
    return resp.json();
}

export async function atualizarServico(servico: any) {
    const resp = await fetch(`${API_URL}/servico/atualizar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico)
    });
    if (!resp.ok) throw new Error("Erro ao atualizar serviço");
    return resp;
}

export async function excluirServico(servico: any) {
    const resp = await fetch(`${API_URL}/servico/excluir`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico)
    });
    if (!resp.ok) throw new Error("Erro ao excluir serviço");
    return resp;
}