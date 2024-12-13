"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormInput from "@/components/form-input";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import DialogInformacoes from "./components/dialog-informacoes";
import { Fornecedor } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";
import Image from "next/image";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [buscarNome, setBuscarNome] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchFornecedores = async () => {
      setCarregando(true);
      try {
        const response = await api.get("/api/fornecedor");
        setFornecedores(response.data.data ? response.data.data : []);
        console.log("Fornecedores:", response.data.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      } finally {
        setCarregando(false);
      }
    };
    fetchFornecedores();
  }, []);

  const filtroFornecedoresNome = fornecedores.filter((fornecedor) => {
    if (!fornecedor) return false;

    return fornecedor.nome.toLowerCase().includes(buscarNome.toLowerCase());
  });

  return (
    <section className="bg-[#070180] pt-12 h-[425px]">
      <div className="h-[400px] w-[1100px] max-h-screen mx-auto rounded-md bg-white flex flex-col">
        <div className=" bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Fornecedores
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <form className="flex gap-2 font-bold">
                <FormInput
                  label="Nome:"
                  name="nome"
                  placeholder="Digite a nome..."
                  value={buscarNome}
                  onChange={(e) => setBuscarNome(e.target.value)}
                />
              </form>
              <DialogAdicionar
                setFornecedor={setFornecedores}
                fornecedores={fornecedores}
              />
            </div>
            {carregando ? (
              <div className="flex items-center justify-center p-10">
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                  width={50}
                  height={50}
                />
              </div>
            ) : (
              <div className="h-[200px] overflow-y-scroll scrollbar-hide">
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Nome Completo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Data Nascimento
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Documento
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Cidade
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        UF
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Telefone
                      </TableHead>
                      <TableHead className="text-black font-bold text-center">
                        Tipo Pessoa
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {filtroFornecedoresNome.map((fornecedor) => (
                      <TableRow
                        key={fornecedor.id}
                        className="hover:bg-gray-200"
                      >
                        <TableCell>{fornecedor.nome}</TableCell>
                        <TableCell>
                          {new Date(
                            fornecedor.dataNascimento
                          ).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>{fornecedor.cpf}</TableCell>
                        <TableCell>{fornecedor.endereco.cidade}</TableCell>
                        <TableCell>{fornecedor.endereco.uf}</TableCell>
                        <TableCell>{fornecedor.telefone}</TableCell>
                        <TableCell>{fornecedor.tipo.toUpperCase()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar
                              fornecedor={fornecedor}
                              setFornecedores={setFornecedores}
                              fornecedores={fornecedores}
                            />
                            <DialogRemover
                              fornecedor={fornecedor}
                              setFornecedores={setFornecedores}
                            />
                            <DialogInformacoes fornecedorId={fornecedor.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
