import { BrowserRouter, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
import Clientes from "./clientes";
import Home from "./home";

function Roteador() {
    return (
        <>
            <BrowserRouter>
                <BarraNavegacao />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Roteador