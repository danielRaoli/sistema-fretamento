"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/axios";
import { Cidade, Cliente, Documento, Endereco, Uf } from "@/lib/types";

interface ClienteProps {
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}

export default function DialogAdicionar({
  clientes,
  setClientes,
}: ClienteProps) {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");

  const [documento, setDocumento] = useState<Documento>({
    documento: "",
    tipo: "",
  });

  const [endereco, setEndereco] = useState<Endereco>({
    uf: "",
    cidade: "",
    rua: "",
    bairro: "",
    numero: "",
  });

  // Carrega as UFs ao montar o componente
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
  }, []);

  // Carrega as cidades com base na UF selecionada
  const handleUfChange = (uf: string) => {
    setEndereco({ ...endereco, uf: uf });
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
    const cliente = {
      nome: nome,
      dataNascimento: dataNascimento,
      telefone: telefone,
      documento: documento,
      endereco: endereco,
      cpf: cpf,
      tipo: tipo,
    };
    console.log(cliente);
    const response = await api.post("/cliente", cliente);
    if (!response.data.isSuccess) {
      console.log(response.data.message + "error");
    }

    setClientes([...clientes, response.data.data]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-10 bg-green-600">Adicionar Cliente</Button>
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
                <Input id="nome" onChange={(e) => setNome(e.target.value)} />
              </div>

              {/* Data de Nascimento */}
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  type="date"
                  id="dataNascimento"
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>

              {/* Telefone */}
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              {/* CPF */}
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" onChange={(e) => setCpf(e.target.value)} />
              </div>

              {/* Tipo */}
              <div>
                <Label htmlFor="tipocliente">Tipo do cliente</Label>
                <RadioGroup
                  value={tipo}
                  onValueChange={(e) => setTipo(e)}
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
                  onChange={(e) =>
                    setDocumento({ ...documento, documento: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <RadioGroup
                  value={documento.tipo}
                  onValueChange={(e) => setDocumento({ ...documento, tipo: e })}
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
                  onChange={(e) =>
                    setEndereco({ ...endereco, cidade: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Selecione a Cidade</option>
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
                    value={endereco[name as keyof typeof endereco] || ""}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </fieldset>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full mt-8">
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
