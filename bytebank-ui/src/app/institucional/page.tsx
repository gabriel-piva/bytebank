"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Gift, 
  Wallet, 
  Network, 
  Monitor,
  Instagram,
  MessageCircle,
  Youtube
} from "lucide-react";

export default function InstitucionalPage() {
  const router = useRouter();

  const handleOpenAccount = () => {
    console.log("Abrir conta");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <img 
              src="/text-logo.png" 
              alt="Bytebank Logo"
              className="h-6 sm:h-8 lg:h-10 object-contain"
            />
            
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <a href="#" className="text-[#ED4A4C] hover:text-[#d13c3e] font-space-grotesk font-normal transition-colors duration-200 text-xs lg:text-sm" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Sobre
              </a>
              <a href="#" className="text-[#ED4A4C] hover:text-[#d13c3e] font-space-grotesk font-normal transition-colors duration-200 text-xs lg:text-sm" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Serviços
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <Button 
              onClick={handleOpenAccount}
              className="bg-[#ED4A4C] hover:bg-[#d13c3e] text-white px-3 lg:px-6 py-1.5 lg:py-2 rounded-md font-inter font-normal transition-all duration-200 shadow-sm hover:shadow-md text-xs lg:text-sm"
              style={{fontFamily: "'Inter', sans-serif"}}
            >
              Abrir minha conta
            </Button>
            <Button 
              onClick={handleLogin}
              variant="outline"
              className="border-[#ED4A4C] text-[#ED4A4C] hover:bg-red-50 px-3 lg:px-6 py-1.5 lg:py-2 rounded-md font-inter font-normal transition-all duration-200 text-xs lg:text-sm"
              style={{fontFamily: "'Inter', sans-serif"}}
            >
              Já tenho conta
            </Button>
          </div>
        </div>
      </header>

      <section className="" style={{
        backgroundImage: "url(/vector.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        <div className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 xl:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
            <div className="w-full lg:w-1/2 xl:w-2/5">
              <h1 className="text-3xl font-space-grotesk font-medium leading-tight mb-4 lg:mb-6 text-white" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Experimente mais liberdade<br />
                no controle da sua vida<br />
                financeira. Crie sua conta<br />
                com a gente!
              </h1>
              <p className="text-sm lg:text-base xl:text-lg text-white/90 font-inter font-normal mb-6" style={{fontFamily: "'Inter', sans-serif"}}>
                Simplifique sua vida financeira com soluções digitais inovadoras e seguras.
              </p>
            </div>

            <div className="w-full lg:w-1/2 xl:w-2/5 flex justify-center lg:justify-end">
              <img 
                src="/financial.png" 
                alt=""
                className="w-full max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>

        
      </section>

      <section className="bg-white py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 xl:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-space-grotesk font-medium text-gray-900 mb-3 lg:mb-4" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              Vantagens do nosso banco
            </h2>
            <p className="text-sm lg:text-base xl:text-lg text-gray-600 font-inter font-normal max-w-3xl mx-auto" style={{fontFamily: "'Inter', sans-serif"}}>
              Descubra por que milhares de pessoas escolhem o Bytebank para suas necessidades financeiras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
            <div className="text-center group">
              <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-[#ED4A4C] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200">
                <Gift className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
              </div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-2 lg:mb-3" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Conta e cartão gratuitos
              </h3>
              <p className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-[#ED4A4C] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200">
                <Wallet className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
              </div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-2 lg:mb-3" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Saques sem custo
              </h3>
              <p className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-[#ED4A4C] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200">
                <Network className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
              </div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-2 lg:mb-3" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Programa de pontos
              </h3>
              <p className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-[#ED4A4C] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-200">
                <Monitor className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
              </div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-2 lg:mb-3" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Seguro Dispositivos
              </h3>
              <p className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
                Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-8 lg:py-12 xl:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
            <div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-3 lg:mb-4" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Serviços
              </h3>
              <ul className="space-y-1.5 lg:space-y-2">
                <li>
                  <a href="#" className="text-xs lg:text-sm xl:text-base text-gray-600 hover:text-gray-900 font-inter font-normal transition-colors duration-200" style={{fontFamily: "'Inter', sans-serif"}}>
                    Conta corrente
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs lg:text-sm xl:text-base text-gray-600 hover:text-gray-900 font-inter font-normal transition-colors duration-200" style={{fontFamily: "'Inter', sans-serif"}}>
                    Conta PJ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs lg:text-sm xl:text-base text-gray-600 hover:text-gray-900 font-inter font-normal transition-colors duration-200" style={{fontFamily: "'Inter', sans-serif"}}>
                    Cartão de crédito
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-3 lg:mb-4" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Contato
              </h3>
              <ul className="space-y-1.5 lg:space-y-2">
                <li className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal" style={{fontFamily: "'Inter', sans-serif"}}>
                  0800 004 250 08
                </li>
                <li className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal" style={{fontFamily: "'Inter', sans-serif"}}>
                  meajuda@bytebank.com.br
                </li>
                <li className="text-xs lg:text-sm xl:text-base text-gray-600 font-inter font-normal" style={{fontFamily: "'Inter', sans-serif"}}>
                  ouvidoria@bytebank.com.br
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm lg:text-base xl:text-lg font-space-grotesk font-medium text-gray-900 mb-3 lg:mb-4" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                Desenvolvido para Tech Challenge
              </h3>
              <div className="flex items-center mb-3 lg:mb-4">
                <img 
                  src="/text-logo.png" 
                  alt="Bytebank Logo"
                  className="h-4 lg:h-6 xl:h-8 object-contain"
                />
              </div>
              <div className="flex space-x-2 lg:space-x-3">
                <a href="#" className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <Instagram className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                </a>
                <a href="#" className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                </a>
                <a href="#" className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                  <Youtube className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 