import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import editIcon from "@/app/assets/edit.svg";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import axios from "axios";
import { Cidade, Cliente, Uf } from "@/lib/types";

interface ClienteEditProps {
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
  cliente: Cliente;
}

export default function DialogEditar({
  cliente,
  clientes,
  setClientes,
}: ClienteEditProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [client, setCliente] = useState<Cliente>(cliente);

  useEffect(() => {
    axios
      .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const sortedUfs = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUfs(sortedUfs);
      })
      .catch((error) => {
        console.error("Error fetching UFs:", error);
      });

    handleUfChange(client.endereco.uf);
  }, []);

  // Carrega as cidades com base na UF selecionada
  const handleUfChange = (uf: string) => {
    setCliente({ ...client, endereco: { ...client.endereco, uf: uf } });

    axios
      .get<Cidade[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const sortedCidades = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setCidades(sortedCidades);
      })
      .catch((error) => {
        console.error("Error fetching cidades:", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(cliente);
    const response = await api.put(`/cliente/${client.id}`, client);
    if (!response.data.isSuccess) {
      console.log(response.data.message + "error");
    }

    const clienteAtualizado = response.data.data;
    const clientesAtualizados = clientes.filter(
      (cliente) => cliente.id !== clienteAtualizado.id
    );
    setClientes([...clientesAtualizados, clienteAtualizado]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          className="cursor-pointer"
          src={editIcon}
          alt="Editar"
          width={25}
        />
      </DialogTrigger>
      <DialogContent className="w-auto h-[80%] overflow-y-scroll mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Formulário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-10 items-start">
            <fieldset className="border p-4 rounded">
              <legend className="font-semibold">Cliente</legend>
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  value={client.nome}
                  id="nome"
                  onChange={(e) =>
                    setCliente({ ...client, nome: e.target.value })
                  }
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  type="date"
                  value={client.dataNascimento}
                  id="dataNascimento"
                  onChange={(e) =>
                    setCliente({
                      ...client,
                      dataNascimento: e.target.value,
                    })
                  }
                />
              </div>

              {/* Telefone */}
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={client.telefone}
                  onChange={(e) =>
                    setCliente({ ...client, telefone: e.target.value })
                  }
                />
              </div>
              {/* CPF */}
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={client.cpf}
                  onChange={(e) =>
                    setCliente({ ...client, cpf: e.target.value })
                  }
                />
              </div>

              {/* Tipo */}
              <div>
                <Label htmlFor="tipocliente">Tipo do cliente</Label>
                <RadioGroup
                  value={client.tipo}
                  onValueChange={(e) => setCliente({ ...client, tipo: e })}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FISICA" id="fisica" />
                    <label htmlFor="fisica">Física</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="JURIDICA" id="juridica" />
                    <label htmlFor="juridica">Jurídica</label>
                  </div>
                </RadioGroup>
              </div>
              {/* Documento */}
              <div>
                <Label htmlFor="documento">Documento</Label>
                <Input
                  id="documento"
                  value={client.documento.documento}
                  onChange={(e) =>
                    setCliente({
                      ...client,
                      documento: {
                        ...client.documento,
                        documento: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <RadioGroup
                  value={client.documento.tipo}
                  onValueChange={(e) =>
                    setCliente({
                      ...client,
                      documento: { ...client.documento, tipo: e },
                    })
                  }
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rg" id="rg" />
                    <label htmlFor="rg">RG</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cnh" id="cnh" />
                    <label htmlFor="cnh">CNH</label>
                  </div>
                </RadioGroup>
              </div>
            </fieldset>

            {/* Endereço */}
            <fieldset className="border p-4 rounded">
              <legend className="font-semibold">Endereço</legend>
              <div className="">
                <Label htmlFor="uf">UF</Label>
                <select
                  id="uf"
                  value={client.endereco.uf}
                  onChange={(e) => handleUfChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a UF</option>
                  {ufs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <Label htmlFor="cidade">Cidade</Label>
                <select
                  id="cidade"
                  value={client.endereco.cidade}
                  onChange={(e) =>
                    setCliente({
                      ...client,
                      endereco: { ...client.endereco, cidade: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione uma cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>

              {[
                { label: "Rua", name: "rua" },
                { label: "Bairro", name: "bairro" },
                { label: "Número", name: "numero" },
              ].map(({ label, name }) => (
                <div key={name} className="mt-4">
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    value={
                      client.endereco[name as keyof typeof client.endereco] ||
                      ""
                    }
                    onChange={(e) =>
                      setCliente((prev) => ({
                        ...prev,
                        endereco: {
                          ...prev.endereco,
                          [name]: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              ))}
            </fieldset>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full mt-8">
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
