
import React, { useState } from 'react';

const CreationLab: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [serviceType, setServiceType] = useState('Prototipagem Industrial');
  const [material, setMaterial] = useState('PLA (Eco-friendly, Alta Estética)');
  const [selectedColor, setSelectedColor] = useState('Preto Sólido');
  const [dimensions, setDimensions] = useState({ width: '', height: '', depth: '' });
  const [instructions, setInstructions] = useState('');

  const colorPalette = [
    { name: 'Preto Sólido', class: 'bg-black', border: 'border-gray-700' },
    { name: 'Branco Neve', class: 'bg-white', border: 'border-gray-200' },
    { name: 'Cinza Rato', class: 'bg-gray-500', border: 'border-gray-400' },
    { name: 'Vermelho Fogo', class: 'bg-red-600', border: 'border-red-400' },
    { name: 'Azul Elétrico', class: 'bg-blue-600', border: 'border-blue-400' },
    { name: 'Verde Floresta', class: 'bg-green-600', border: 'border-green-400' },
    { name: 'Laranja Solar', class: 'bg-orange-500', border: 'border-orange-400' },
    { name: 'Amarelo Vivo', class: 'bg-yellow-400', border: 'border-yellow-200' },
    { name: 'Dourado Seda', class: 'bg-yellow-600', border: 'border-yellow-500' },
    { name: 'Prateado Seda', class: 'bg-slate-400', border: 'border-slate-300' },
    { name: 'Verde Neon', class: 'bg-lime-400', border: 'border-lime-200' },
    { name: 'Translúcido', class: 'bg-cyan-100/30', border: 'border-cyan-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userName) {
      alert("Por favor, preencha o seu nome e email.");
      return;
    }

    const subject = encodeURIComponent(`Orçamento 3D: Projeto de ${userName}`);
    const body = encodeURIComponent(
      `Olá Printed Fusion,\n\n` +
      `Gostaria de solicitar um orçamento para o seguinte projeto:\n\n` +
      `--- DETALHES DO CLIENTE ---\n` +
      `Nome: ${userName}\n` +
      `Email: ${userEmail}\n\n` +
      `--- CONFIGURAÇÃO TÉCNICA ---\n` +
      `Tipo de Serviço: ${serviceType}\n` +
      `Material: ${material}\n` +
      `Cor Selecionada: ${selectedColor}\n` +
      `Dimensões Estimadas: ${dimensions.width || '?'}x${dimensions.depth || '?'}x${dimensions.height || '?'} mm\n\n` +
      `--- INSTRUÇÕES ADICIONAIS ---\n` +
      `${instructions || 'Sem notas adicionais.'}\n\n` +
      `--- ATENÇÃO ---\n` +
      `*Vou anexar os ficheiros (.STL / .OBJ / .PDF) manualmente a este email.*`
    );

    window.location.href = `mailto:printed.fusion3d@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 glow-cyan">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-4xl font-tech font-bold mb-4 uppercase tracking-tighter text-glow-cyan">Email Gerado</h2>
        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
          O teu cliente de email deve ter aberto com os dados preenchidos.
          <br /><br />
          <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl text-red-400">
            <p className="font-bold uppercase tracking-widest text-sm mb-2">Ação Requerida:</p>
            <p className="text-sm">Por favor, <span className="text-white underline">anexa agora os teus ficheiros 3D</span> (.stl, .obj, etc.) diretamente na tua aplicação de email antes de clicares em enviar.</p>
          </div>
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setUserEmail('');
            setUserName('');
          }}
          className="px-10 py-4 bg-gray-900 text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-black transition-all font-bold uppercase text-xs tracking-widest"
        >
          Novo Orçamento
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16 border-b border-cyan-900/30 pb-10">
        <h2 className="text-5xl font-tech font-bold mb-4 tracking-tight uppercase">Laboratório de Criação</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          Configura os parâmetros técnicos e prepara o envio do teu projeto para análise profissional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Step 1: Configuration */}
        <div className="lg:col-span-6 space-y-8 bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-900 pb-4">
            <h3 className="text-xl font-bold text-cyan-400 flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs border border-cyan-500/30 font-tech">01</span>
              <span className="font-tech tracking-wider text-sm uppercase">Configuração Técnica</span>
            </h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Nome do Requerente</label>
                <input
                  required
                  type="text"
                  placeholder="João Silva"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Email para Resposta</label>
                <input
                  required
                  type="email"
                  placeholder="exemplo@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white transition-all text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Tipo de Projeto</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white transition-all text-sm"
                >
                  <option>Prototipagem Industrial</option>
                  <option>Peça de Reposição</option>
                  <option>Figura / Colecionável</option>
                  <option>Design Paramétrico</option>
                  <option>Outro Especial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Material Base</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white transition-all text-sm"
                >
                  <option>PLA (Alta Definição)</option>
                  <option>PETG (Resistência)</option>
                  <option>ABS (Industrial)</option>
                  <option>TPU (Flexível)</option>
                  <option>PA-CF (Fibra Carbono)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Esquema de Cores Disponíveis</label>
                <span className="text-[9px] text-cyan-500 font-bold uppercase">{selectedColor}</span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-6 gap-2 p-4 bg-black rounded-xl border border-gray-800/50 shadow-inner">
                {colorPalette.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-full aspect-square rounded-lg border-2 transition-all transform active:scale-90 ${color.class} ${color.border} ${selectedColor === color.name ? 'ring-2 ring-cyan-500 border-white z-10 scale-110 shadow-[0_0_15px_rgba(0,242,255,0.3)]' : 'opacity-60 hover:opacity-100'
                      }`}
                  >
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${color.name === 'Branco Neve' ? 'bg-black' : 'bg-white'}`}></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Dimensões Envolventes (mm)</label>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="L"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-lg px-3 py-3 text-center focus:border-cyan-500 outline-none text-sm font-mono"
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="C"
                    value={dimensions.depth}
                    onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-lg px-3 py-3 text-center focus:border-cyan-500 outline-none text-sm font-mono"
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="A"
                    value={dimensions.height}
                    onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-lg px-3 py-3 text-center focus:border-cyan-500 outline-none text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Notas Adicionais</label>
              <textarea
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Ex: Tolerância de 0.2mm, acabamento mate, ou uso de roscas de metal..."
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white resize-none text-sm leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Step 2: Professional Protocol Info */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 shadow-2xl flex flex-col h-full border-l-4 border-l-cyan-500">
            <div className="flex items-center justify-between mb-8 border-b border-gray-900 pb-4">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs border border-cyan-500/30 font-tech">02</span>
                <span className="font-tech tracking-wider text-sm uppercase">Protocolo de Ativos</span>
              </h3>
            </div>

            <div className="space-y-8 flex-grow">
              <div className="flex items-start space-x-5 group">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-800 group-hover:border-cyan-500/40 transition-all">
                  <span className="text-cyan-500 font-tech text-xs">A</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Preencher Configuração</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Define os materiais e especificações técnicas para que possamos avaliar a viabilidade da peça.</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-800 group-hover:border-cyan-500/40 transition-all">
                  <span className="text-cyan-500 font-tech text-xs">B</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Gerar Email de Orçamento</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Ao clicar no botão abaixo, o teu dispositivo abrirá o email com todos os detalhes formatados para a nossa equipa.</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
                  <span className="text-cyan-500 font-tech text-xs">C</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Anexo Manual de Ficheiros</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-bold">IMPORTANTE: Por segurança, deves anexar manualmente os teus modelos (.STL, .OBJ, .3MF) ou desenhos técnicos (.PDF) diretamente no email.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['.STL', '.OBJ', '.3MF', '.PDF', '.PNG'].map(ext => (
                      <span key={ext} className="px-2 py-1 bg-black border border-gray-800 rounded text-[9px] font-mono text-gray-500">{ext}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <button
                type="submit"
                className="w-full py-5 rounded-xl bg-cyan-500 text-black font-tech font-bold text-sm tracking-widest hover:bg-cyan-400 transition-all shadow-2xl flex items-center justify-center space-x-3 glow-cyan active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>GERAR EMAIL E SOLICITAR ORÇAMENTO</span>
              </button>
              <p className="text-[9px] text-gray-600 text-center uppercase tracking-[0.2em] font-bold">
                Printed Fusi⏻N | São João da Madeira | Industrial Quality
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreationLab;
