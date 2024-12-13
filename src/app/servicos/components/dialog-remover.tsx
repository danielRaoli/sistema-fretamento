import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import removeIcon from "@/app/assets/remove.svg";
import { api } from "@/lib/axios";
import { Servico, Veiculo } from "@/lib/types";

interface VeiculoProps {
  servico: Servico;
  setServicos: React.Dispatch<React.SetStateAction<Servico[]>>;
}

export default function DialogRemover({ servico, setServicos }: VeiculoProps) {
  const handleRemoverVeiculo = async (id: string) => {
    try {
      await api.delete(`/servico/${id}`);
      setServicos((prevServicos) => prevServicos.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao remover serviço:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={removeIcon}
            alt="Remover"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[350px] h-[150px] flex flex-col items-center">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">
            Deseja remover o serviço?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button
            className="bg-red-500"
            onClick={() => handleRemoverVeiculo(servico.id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
