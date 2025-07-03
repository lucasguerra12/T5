import { Link } from 'react-router-dom';

export default function BarraNavegacao() { 
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">WB</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/clientes" className="nav-link">Clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/produtos" className="nav-link">Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/servicos" className="nav-link">Serviços</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}