import { Link } from "react-router-dom";

export default function BarraNavegacao() {
    return (
        <nav className="bg-green-primary p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">WB</Link>
                <div className="flex space-x-4">
                    <Link to="/clientes" className="text-white hover:text-gray-200">Clientes</Link>
                    <Link to="/produtos" className="text-white hover:text-gray-200">Produtos</Link>
                    <Link to="/servicos" className="text-white hover:text-gray-200">Serviços</Link>
                    <Link to="/listagens" className="text-white hover:text-gray-200">Listagens</Link> {/* Adicione o novo link */}
                </div>
            </div>
        </nav>
    );
}
