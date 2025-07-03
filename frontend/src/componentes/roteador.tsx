import { BrowserRouter, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
import Clientes from "./clientes";
import Home from "./home";
import Produtos from "./produtos";

function Roteador() {
    return (
        <>
            <BrowserRouter>
                <BarraNavegacao />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/produtos" element={<Produtos />} /> 
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Roteador