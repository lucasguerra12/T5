import { error } from "console";

const API_URL = "http://localhost:32832";

export async function listarClientes() {
    const resp = await fetch(`${API_URL}/clientes`, { redirect: "follow" });
    if (resp.status !== 200 && resp.status !== 302) {
        throw new Error("Erro ao buscar cliente");
    }
    return resp.json();
}

export async function cadastrarCliente(cliente: any) {
    const resp = await fetch (`${API_URL}/cliente/cadastrar`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });
    if (!resp.ok)
        throw new Error("Erro ao cadastrar cliente");
    return resp;
}

export async function excluirCliente(cliente: any) {
    const resp = await fetch(`${API_URL}/cliente/excluir`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });
    if (!resp.ok)
        throw new Error("Erro ao excluir cliente");
    return resp;
}

export async function atualizarCliente(cliente: any) {
    const resp = await fetch(`${API_URL}/cliente/atualizar`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });
    if (!resp.ok)
        throw new Error("Erro ao atualizar cliente");
    return resp;
}



