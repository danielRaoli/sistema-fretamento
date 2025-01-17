export type FormField = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
};

export type Endereco = {
  uf: string;
  cidade: string;
  rua: string;
  bairro: string;
  numero: string;
};

export type Habilitacao = {
  protocolo: string;
  vencimento: string;
  categoria: string;
  cidade: string;
  uf: string;
};

export type Documento = {
  documento: string;
  tipo: string;
};

export type FormData = {
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  habilitacao: Habilitacao;
};
export type FormDataFornecedor = {
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  tipo: string;
};

export type Motorista = {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: {
    documento: string;
    tipo: string;
  };
  endereco: {
    uf: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: string;
  };
  cpf: string;
  habilitacao: {
    protocolo: string;
    vencimento: string;
    categoria: string;
    cidade: string;
    uf: string;
  };
};

export type Fornecedor = {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: {
    documento: string;
    tipo: string;
  };
  endereco: {
    uf: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: string;
  };
  cpf: string;
  tipo: string;
};

export type Veiculo = {
  id: string;
  prefixo: string;
  kmAtual: string;
  placa: string;
  marca: string;
  localEmplacado: string;
  uf: string;
  carroceria: string;
  capacidadeTank: string;
  ano: number;
  tipo: string;
  modelo: string;
  quantidadePoltronas: number;
};

export interface Uf {
  id: number;
  sigla: string;
  nome: string;
}

export interface Cidade {
  id: number;
  nome: string;
}

export interface Cliente {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
  documento: Documento;
  endereco: Endereco;
  cpf: string;
  tipo: string;
}