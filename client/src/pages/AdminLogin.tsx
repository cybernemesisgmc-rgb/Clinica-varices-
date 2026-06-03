'use client';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = 'angelica alvarez';
  const ADMIN_PASSWORD = 'Clinicacentrodevarices';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular validación
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username.toLowerCase() === ADMIN_USERNAME.toLowerCase() && password === ADMIN_PASSWORD) {
      // Guardar en localStorage
      localStorage.setItem('adminToken', 'authenticated');
      localStorage.setItem('adminUsername', username);
      setLocation('/financial-statements/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-purple-50 flex items-center justify-center p-4">
      {/* Navegación */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">Clínica Centro de Varices</h1>
          <div className="flex gap-6">
            <a href="/" className="text-gray-600 hover:text-cyan-600 transition">Inicio</a>
            <a href="/financial-statements" className="text-cyan-600 font-semibold">Estados Financieros</a>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="w-full max-w-md mt-20">
        {/* Tarjeta de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-100 hover:border-purple-300 transition">
          {/* Icono */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Panel Administrador
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Acceso restringido para administradores
          </p>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Usuario */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                disabled={loading}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando...' : 'Acceder al Panel'}
            </button>
          </form>

          {/* Línea divisoria */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-gray-500 text-sm">o</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Botón Visualizar */}
          <button
            onClick={() => setLocation('/financial-statements')}
            className="w-full py-3 border-2 border-cyan-500 text-cyan-600 font-bold rounded-lg hover:bg-cyan-50 transition"
          >
            Ver Estados Financieros
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            ¿Necesitas ayuda? Contacta al equipo administrativo
          </p>
        </div>
      </div>

      {/* Fondo decorativo */}
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
    </div>
  );
}
