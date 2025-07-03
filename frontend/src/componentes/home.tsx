import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            <div className="max-w-3xl w-full bg-white p-10 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
                <h1 className="text-5xl font-bold text-green-primary">
                    Bem-vindo ao Sistema WB
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    A solução completa e moderna para o gerenciamento do seu negócio.
                    Organize seus clientes, produtos e serviços de forma eficiente e intuitiva.
                </p>
                <div className="mt-10 flex justify-center gap-x-6">
                    <a
                        href="/clientes"
                        className="px-8 py-3 bg-green-primary text-white font-semibold rounded-lg shadow-md hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-green-focus focus:ring-opacity-75 transition-transform transform hover:scale-110 duration-300"
                    >
                        Gerenciar Clientes
                    </a>
                    <a
                        href="/clientes"
                        className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-transform transform hover:scale-110 duration-300"
                    >
                        Cadastrar Cliente
                    </a>
                </div>
            </div>
            <footer className="mt-12 text-gray-500">
                <p>&copy; {new Date().getFullYear()} WB. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}