
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsPreparing(true);

    // Simulate tech synchronization delay
    setTimeout(() => {
      const emailSubject = encodeURIComponent(`Contacto Printed Fusion: ${formData.subject || 'Geral'} - ${formData.name}`);
      const emailBody = encodeURIComponent(
        `Olá Printed Fusion,\n\n` +
        `Receberam uma nova mensagem através do portal web:\n\n` +
        `--- DADOS DO CONTACTO ---\n` +
        `Nome: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Assunto: ${formData.subject || 'Não especificado'}\n\n` +
        `--- MENSAGEM ---\n` +
        `${formData.message}\n\n` +
        `-------------------------\n` +
        `Enviado via Terminal Printed Fusi⏻N`
      );

      window.location.href = `mailto:printed.fusion3d@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      setSubmitted(true);
      setIsPreparing(false);
    }, 1800);
  };

  if (isPreparing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden mb-6 relative">
          <div className="absolute inset-y-0 left-0 bg-cyan-500 w-full origin-left animate-loading-bar glow-cyan"></div>
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-[0.4em] animate-pulse">Sincronizando Protocolos</h3>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">Enviando dados para o terminal de saída...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 glow-cyan">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-tech font-bold mb-4 uppercase tracking-tighter text-glow-cyan">Protocolo de Ligação Iniciado</h2>
        <p className="text-gray-400 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
          A tua aplicação de email foi aberta com a mensagem configurada. Por favor, clica em <span className="text-white font-bold underline">Enviar</span> no teu cliente de email para completar a transmissão.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="px-8 py-3 bg-transparent border border-gray-800 text-gray-500 hover:text-cyan-400 hover:border-cyan-400 rounded-lg transition-all font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-tech font-bold mb-6 text-cyan-400 uppercase tracking-tight">Ligação Direta</h2>
          <p className="text-gray-400 mb-10 text-lg font-light leading-relaxed">
            Tens uma dúvida técnica, queres discutir um projeto em larga escala ou precisas de consultoria em materiais? O nosso laboratório está pronto para responder.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-5 group">
              <div className="w-14 h-14 bg-cyan-500/5 rounded-xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-tech text-sm uppercase tracking-widest text-white mb-1">E-mail Técnico</h4>
                <p className="text-gray-500 font-mono text-sm">printed.fusion3d@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-5 group">
              <div className="w-14 h-14 bg-cyan-500/5 rounded-xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-tech text-sm uppercase tracking-widest text-white mb-1">WhatsApp / Signal</h4>
                <p className="text-gray-500 font-mono text-sm">+351 914 526 662</p>
              </div>
            </div>

            <div className="flex items-start space-x-5 group">
              <div className="w-14 h-14 bg-cyan-500/5 rounded-xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-tech text-sm uppercase tracking-widest text-white mb-1">Estúdio Físico</h4>
                <p className="text-gray-500 text-sm">São João da Madeira, Portugal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-10 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>

          <h3 className="text-2xl font-tech font-bold mb-8 uppercase tracking-tighter">Mensagem Rápida</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Nome</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-all text-sm"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-all text-sm font-mono"
                  placeholder="exemplo@email.pt"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Assunto</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-all text-sm"
                placeholder="Ex: Orçamento industrial, Dúvida técnica..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Mensagem</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition-all resize-none text-sm leading-relaxed"
                placeholder="Como podemos ajudar no teu projeto?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isPreparing}
              className="w-full py-4 bg-cyan-500 text-black font-tech font-bold rounded-lg hover:bg-cyan-400 transition-all glow-cyan uppercase tracking-widest text-xs flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Enviar Mensagem</span>
            </button>
            <p className="text-[9px] text-gray-600 text-center uppercase tracking-[0.2em]">Sincronizando com o Protocolo Printed Fusi⏻N</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
