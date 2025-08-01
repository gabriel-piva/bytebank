interface InfiniteScrollLoaderProps {
  message?: string;
}

export default function InfiniteScrollLoader({ 
  message = "Carregando mais transações..." 
}: InfiniteScrollLoaderProps) {
  return (
    <div className="infinite-scroll-loader flex flex-col items-center justify-center py-8 space-y-4">
      {/* Loader animado com efeito de pulso */}
      <div className="relative">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-10 h-10 border-4 border-transparent border-t-blue-300 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-2 w-6 h-6 border-2 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDirection: "reverse" }}></div>
      </div>
      
      {/* Texto sugestivo com animação de fade */}
      <div className="text-center animate-pulse">
        <p className="text-sm text-gray-600 font-medium">{message}</p>
        <p className="text-xs text-gray-400 mt-1">Aguarde um momento...</p>
      </div>
      
      {/* Indicador de progresso com animação sequencial */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
      </div>
      
      {/* Barra de progresso animada */}
      <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: "60%" }}></div>
      </div>
    </div>
  );
} 