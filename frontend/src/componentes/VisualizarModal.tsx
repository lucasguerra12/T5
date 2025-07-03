import React from 'react';
import VisualizarCliente from './VisualizarCliente';

interface VisualizarModalProps {
  cliente: any;
  onClose: () => void;
}

const VisualizarModal: React.FC<VisualizarModalProps> = ({ cliente, onClose }) => {
  
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" 
      onClick={handleBackgroundClick}
    >
      <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
      
        <VisualizarCliente cliente={cliente} />
        <div className="flex justify-end mt-4">
          <button 
            onClick={onClose} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizarModal;