import React, { useEffect, useState } from 'react';
import { Users, FileText, Activity, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pacientesRes, tarefasRes] = await Promise.all([
          api.get('/patients'),
          api.get('/tasks'),
        ]);
        // Assumption: API returns data directly or in an array. Using optional chaining.
        setPacientes(Array.isArray(pacientesRes.data) ? pacientesRes.data : []);
        setTarefas(Array.isArray(tarefasRes.data) ? tarefasRes.data : []);
      } catch (err) {
        console.error('Erro ao buscar dados', err);
        setError('Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 3000.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 flex items-start gap-3 rounded-r-md">
          <AlertCircle className="text-red-500 mt-0.5" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="bg-teal-100 p-4 rounded-xl text-teal-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total de Pacientes</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? '...' : pacientes.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total de Tarefas</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? '...' : tarefas.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tabela de Pacientes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users size={20} className="text-teal-600"/> Últimos Pacientes
            </h2>
            <button className="text-sm text-teal-600 font-medium hover:text-teal-700">Ver todos</button>
          </div>
          <div className="p-6">
            {loading ? (
              <p className="text-gray-500 animate-pulse">Carregando...</p>
            ) : pacientes.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhum paciente cadastrado ainda.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {pacientes.slice(0, 5).map(paciente => (
                  <li key={paciente.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{paciente.nome}</p>
                      <p className="text-sm text-gray-500">{paciente.doenca} - {paciente.severidade}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Tabela de Tarefas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileText size={20} className="text-blue-600"/> Tarefas Recentes
            </h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Ver todas</button>
          </div>
          <div className="p-6">
            {loading ? (
              <p className="text-gray-500 animate-pulse">Carregando...</p>
            ) : tarefas.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhuma tarefa criada.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {tarefas.slice(0, 5).map(tarefa => (
                  <li key={tarefa.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{tarefa.titulo || tarefa.descricao}</p>
                    </div>
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${tarefa.concluida ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {tarefa.concluida ? 'Concluída' : 'Pendente'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
