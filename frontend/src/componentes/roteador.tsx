import { BrowserRouter, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
import Clientes from "./clientes";
import Home from "./home";
import Produtos from "./produtos";
import Servicos from "./servicos";
import Listagens from "./listagens"; // Importe o novo componente

function Roteador() {
    return (
        <>
            <BrowserRouter>
                <BarraNavegacao />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/produtos" element={<Produtos />} /> 
                    <Route path="/servicos" element={<Servicos />} />
                    <Route path="/listagens" element={<Listagens />} /> {/* Adicione a nova rota */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Roteador;
