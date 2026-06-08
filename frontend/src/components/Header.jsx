import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-teal-600 font-bold text-2xl gap-2">
          <Activity size={32} />
          <span>Clínica Viva</span>
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-teal-600 font-medium">Início</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-teal-600 font-medium">Painel Administrativo</Link>
        </nav>
        <div>
          <a href="#appointment" className="bg-teal-600 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-700 transition">
            Agendar Consulta
          </a>
        </div>
      </div>
    </header>
  );
}
