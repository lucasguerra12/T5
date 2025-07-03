import React from 'react';

interface VisualizarClienteProps {
  cliente: any;
}

const VisualizarCliente: React.FC<VisualizarClienteProps> = ({ cliente }) => {
  const formatarEndereco = () => {
    if (!cliente.endereco) return "Endereço não cadastrado.";
    const { rua, numero, bairro, cidade, estado, codigoPostal } = cliente.endereco;
    return `${rua}, ${numero} - ${bairro}, ${cidade} - ${estado}, CEP: ${codigoPostal}`;
  };

  const formatarTelefone = () => {
    if (!cliente.telefones || cliente.telefones.length === 0) return "Telefone não cadastrado.";
    const { ddd, numero } = cliente.telefones[0];
    return `(${ddd}) ${numero}`;
  };

  const tituloSecaoClass = "text-lg font-semibold text-green-primary mt-4 border-b-2 border-green-light pb-1 mb-2";
  const rotuloClass = "font-medium text-gray-700";
  const dadoClass = "text-gray-900";

  return (
    <div className="p-4 bg-white rounded-lg max-h-[70vh] overflow-y-auto">
      <h3 className="text-2xl font-bold text-center mb-6 text-green-primary">
        Detalhes de {cliente.nome} {cliente.sobreNome}
      </h3>
      
      <div className={tituloSecaoClass}>Informações Pessoais</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <span className={rotuloClass}>Nome Completo: </span>
          <span className={dadoClass}>{cliente.nome} {cliente.sobreNome}</span>
        </div>
        <div>
          <span className={rotuloClass}>Email: </span>
          <span className={dadoClass}>{cliente.email || 'Não cadastrado'}</span>
        </div>
      </div>
      
      <div className={tituloSecaoClass}>Contato</div>
      <div>
        <span className={rotuloClass}>Telefone: </span>
        <span className={dadoClass}>{formatarTelefone()}</span>
      </div>

      <div className={tituloSecaoClass}>Endereço</div>
      <div>
        <p className={dadoClass}>{formatarEndereco()}</p>
        {cliente.endereco?.informacoesAdicionais && (
          <p className="mt-1">
            <span className={rotuloClass}>Complemento: </span>
            <span className={dadoClass}>{cliente.endereco.informacoesAdicionais}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default VisualizarCliente;