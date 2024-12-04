import painel from "@/app/assets/painel-de-controle.png";
import motorista from "@/app/assets/motorista.png";
import clientes from "@/app/assets/pessoas.png";
import fornecedores from "@/app/assets/grupo.png";
import veiculos from "@/app/assets/onibus.png";
import viagens from "@/app/assets/montanha.png";
import manutencao from "@/app/assets/manutencao.png";
import documentos from "@/app/assets/documentos.png";
import financeiro from "@/app/assets/financa.png";
import sino from "@/app/assets/sino.svg";
import passagens from "@/app/assets/passagens.png";

import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="h-6 bg-black">
        <p className="text-center font-bold text-white">
          Infoservice Fretamento
        </p>
      </div>
      <nav className="h-28 bg-white flex items-center justify-between mx-10">
        <div className="flex items-center gap-4">
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071] hover:border-[#220071] hover:text-white transition-all">
            <Image src={painel} alt="Painel de controle" width={45} />
            <p className="font-bold text-sm">Painel</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={motorista} alt="Motoristas" width={45} />
            <p className="font-bold text-sm">Motoristas</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={clientes} alt="Clientes" width={45} />
            <p className="font-bold text-sm">Clientes</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={fornecedores} alt="Fornecedores" width={45} />
            <p className="font-bold text-sm">Fornecedores</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={veiculos} alt="Veículos" width={45} />
            <p className="font-bold text-sm">Veículos</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={viagens} alt="Viagens" width={45} />
            <p className="font-bold text-sm">Viagens</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={manutencao} alt="Veículos" width={45} />
            <p className="font-bold text-sm">Manutenções</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={documentos} alt="Veículos" width={45} />
            <p className="font-bold text-sm">Documentos</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={financeiro} alt="Veículos" width={45} />
            <p className="font-bold text-sm">Financeiro</p>
          </span>
          <span className="flex flex-col items-center gap-2 p-4 bg-transparent border-2 rounded-md cursor-pointer w-[110px] h-[100px] hover:bg-[#220071]  hover:border-[#220071] hover:text-white transition-all">
            <Image src={passagens} alt="Passagens" width={45} />
            <p className="font-bold text-sm">Passagens</p>
          </span>
        </div>

        <Image src={sino} alt="Sino" width={60} className="cursor-pointer" />
      </nav>
    </header>
  );
}