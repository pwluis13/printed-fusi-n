
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-tech font-bold mb-8 text-cyan-400">Sobre a Printed Fusi⏻N</h2>
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p className="text-xl">
          Nascida da convergência entre a engenharia de precisão e o design inovador, a Printed Fusi⏻N é mais do que um estúdio de impressão 3D – é o vosso parceiro na manufatura do futuro.
        </p>
        <p>
          O nosso laboratório está equipado com tecnologia de ponta capaz de processar desde os polímeros mais comuns (PLA, PETG) até materiais técnicos avançados carregados com fibra de carbono ou TPU flexível. Focamo-nos em entregar não apenas peças, mas soluções funcionais, protótipos de alta fidelidade e peças artísticas com acabamento de estúdio.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          <div className="p-6 bg-[#0a0a0a] border border-gray-800 rounded-xl text-center">
            <h3 className="text-cyan-400 font-bold mb-2">Precisão</h3>
            <p className="text-xs text-gray-500 italic">Tolerâncias mínimas para ajustes perfeitos em cada camada.</p>
          </div>
          <div className="p-6 bg-[#0a0a0a] border border-gray-800 rounded-xl text-center">
            <h3 className="text-cyan-400 font-bold mb-2">Velocidade</h3>
            <p className="text-xs text-gray-500 italic">Processos otimizados para entrega rápida de orçamentos e peças.</p>
          </div>
          <div className="p-6 bg-[#0a0a0a] border border-gray-800 rounded-xl text-center">
            <h3 className="text-cyan-400 font-bold mb-2">Materiais</h3>
            <p className="text-xs text-gray-500 italic">Curadoria rigorosa de filamentos para durabilidade e estética.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
