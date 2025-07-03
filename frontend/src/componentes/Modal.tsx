import FormularioCadastro from './formularioCadastro';

interface ModalProps {
    cliente: any;
    onClose: () => void;
    onSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ cliente, onClose, onSave }) => {
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" onClick={handleBackgroundClick}>
            <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                <div className="mt-3 text-center">
                    <FormularioCadastro cliente={cliente} onSave={onSave} onClose={onClose} />
                </div>
            </div>
        </div>
    );
};

export default Modal;