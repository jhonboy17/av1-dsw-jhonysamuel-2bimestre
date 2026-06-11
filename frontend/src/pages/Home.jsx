import React, { useState } from 'react';
import { Calendar, UserPlus, Phone, Activity } from 'lucide-react';
import heroImg from '../assets/hero.png';
import api from '../services/api';

export default function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    especialidade: 'Clínico Geral',
    data: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    // O título da tarefa será o nome do paciente, a descrição terá os detalhes.
    const titulo = `Consulta: ${formData.nome}`;
    const descricao = `Telefone: ${formData.telefone} | Especialidade: ${formData.especialidade} | Data: ${formData.data}`;

    try {
      await api.post('/tasks', {
        titulo,
        descricao,
      });
      setMensagem({ tipo: 'sucesso', texto: 'Agendamento confirmado com sucesso!' });
      setFormData({ nome: '', telefone: '', especialidade: 'Clínico Geral', data: '' });
    } catch (error) {
      console.error(error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao tentar agendar. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-600 font-bold tracking-widest text-sm mb-4 uppercase">Bem-vindo à Clínica Viva</p>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Clínica Médica em que <span className="text-teal-600">você pode confiar.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Atendimento humanizado, exames de ponta e agendamento simples. Cuidamos da sua saúde para você aproveitar a vida.
            </p>
            <div className="flex gap-4">
              <a href="#appointment" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition">
                Agendar Agora
              </a>
              <a href="#services" className="bg-white hover:bg-gray-50 text-teal-600 border border-gray-200 font-semibold py-3 px-8 rounded-full shadow-sm transition">
                Nossos Serviços
              </a>
            </div>
          </div>
          <div className="flex justify-end">
            <img 
              src={heroImg} 
              alt="Médicos sorrindo" 
              className="w-full max-w-md rounded-2xl shadow-xl border border-gray-100 object-cover"
            />
          </div>
        </section>

        {/* Services / Features */}
        <section id="services" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Por que nos escolher?</h2>
              <p className="text-gray-500 mt-4">Estrutura completa para o seu bem-estar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-teal-50 rounded-2xl text-center">
                <div className="bg-teal-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-teal-600 mb-4">
                  <UserPlus size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Equipe Especializada</h3>
                <p className="text-gray-600">Profissionais altamente qualificados e sempre prontos para te atender.</p>
              </div>
              <div className="p-6 bg-teal-50 rounded-2xl text-center">
                <div className="bg-teal-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-teal-600 mb-4">
                  <Activity size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tecnologia de Ponta</h3>
                <p className="text-gray-600">Equipamentos modernos para diagnósticos rápidos e precisos.</p>
              </div>
              <div className="p-6 bg-teal-50 rounded-2xl text-center">
                <div className="bg-teal-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-teal-600 mb-4">
                  <Calendar size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Agendamento Fácil</h3>
                <p className="text-gray-600">Marque suas consultas e exames de forma rápida e 100% online.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Form area */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="appointment">
          <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Agende sua Consulta</h2>
            
            {mensagem && (
              <div className={`mb-6 p-4 rounded-xl ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {mensagem.texto}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-teal-50 font-medium text-sm">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-teal-100 focus:outline-none focus:ring-2 focus:ring-white/50" 
                  placeholder="Seu nome" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-teal-50 font-medium text-sm">Telefone</label>
                <input 
                  type="text"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-teal-100 focus:outline-none focus:ring-2 focus:ring-white/50" 
                  placeholder="(00) 00000-0000" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-teal-50 font-medium text-sm">Especialidade</label>
                <select 
                  value={formData.especialidade}
                  onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option className="text-gray-900" value="Clínico Geral">Clínico Geral</option>
                  <option className="text-gray-900" value="Pediatria">Pediatria</option>
                  <option className="text-gray-900" value="Cardiologia">Cardiologia</option>
                  <option className="text-gray-900" value="Ortopedia">Ortopedia</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-teal-50 font-medium text-sm">Data Preferencial</label>
                <input 
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-teal-100 focus:outline-none focus:ring-2 focus:ring-white/50" 
                />
              </div>
              <div className="md:col-span-2 mt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-white text-teal-600 font-bold text-lg py-4 rounded-xl shadow-md hover:bg-gray-50 transition disabled:opacity-70"
                >
                  {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
