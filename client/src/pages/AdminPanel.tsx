'use client';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Upload, File, Trash2, Eye, LogOut } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface FinancialDocument {
  id: number;
  fileName: string;
  createdAt: Date;
  fileUrl: string;
}

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminName, setAdminName] = useState('');

  // Usar tRPC para obtener documentos
  const { data: documents = [], refetch } = trpc.financialDocuments.list.useQuery();
  const uploadMutation = trpc.financialDocuments.upload.useMutation();
  const deleteMutation = trpc.financialDocuments.delete.useMutation();

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    
    if (!token) {
      setLocation('/financial-statements/login');
      return;
    }
    
    setAdminName(username || 'Administrador');
  }, [setLocation]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Solo se aceptan archivos PDF');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo no debe superar 10MB');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        
        try {
          await uploadMutation.mutateAsync({
            fileName: file.name,
            fileData: base64,
          });
          
          setSuccess('Archivo subido exitosamente');
          refetch();
          event.target.value = '';
        } catch (err: any) {
          setError(err.message || 'Error al subir el archivo');
          console.error(err);
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error al procesar el archivo');
      console.error(err);
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este archivo?')) return;

    try {
      await deleteMutation.mutateAsync({ id });
      setSuccess('Archivo eliminado');
      refetch();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el archivo');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    setLocation('/financial-statements/login');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50">
      {/* Navegación */}
      <nav className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Panel Administrador</h1>
            <p className="text-purple-100 text-sm">Bienvenido, {adminName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gestionar Estados Financieros
          </h2>
          <p className="text-gray-600 text-lg">
            Sube, edita y elimina documentos de transparencia
          </p>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 animate-pulse">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700 animate-pulse">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área de Carga */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition h-full">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Upload className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Subir Documento</h3>
                <p className="text-gray-600 text-sm text-center mb-6">
                  Sube archivos PDF de estados financieros anuales
                </p>

                <label className="w-full">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <div className="w-full px-4 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold cursor-pointer hover:shadow-lg transition text-center hover:scale-105 transform">
                    {uploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subiendo...
                      </div>
                    ) : (
                      'Seleccionar PDF'
                    )}
                  </div>
                </label>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Máximo 10MB • Solo PDF
                </p>
              </div>
            </div>
          </div>

          {/* Galería de Documentos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Documentos Cargados</h3>

              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No hay documentos cargados aún</p>
                  <p className="text-gray-400 text-sm mt-2">Sube tu primer documento usando el panel de la izquierda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition transform hover:scale-102"
                      style={{
                        animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center shadow-md">
                          <File className="w-7 h-7 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 truncate">{doc.fileName}</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(doc.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition font-semibold hover:shadow-lg"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </a>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition hover:shadow-lg"
                          title="Eliminar documento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Información del Panel</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Sube documentos PDF de estados financieros</li>
            <li>✓ Visualiza todos los documentos cargados</li>
            <li>✓ Elimina documentos cuando sea necesario</li>
            <li>✓ Los documentos son visibles para el público en la página de Estados Financieros</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
