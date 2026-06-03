'use client';
import { useState } from 'react';
import { Upload, File, Trash2, Eye, Lock } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

interface FinancialDocument {
  id: number;
  fileName: string;
  createdAt: Date;
  fileUrl: string;
}

export default function FinancialStatements() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth = useAuth();
  const user = auth.user;
  const isAdmin = user?.role === 'admin';

  // Usar tRPC para obtener documentos
  const { data: documents = [], refetch } = trpc.financialDocuments.list.useQuery();
  const uploadMutation = trpc.financialDocuments.upload.useMutation();
  const deleteMutation = trpc.financialDocuments.delete.useMutation();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea PDF
    if (file.type !== 'application/pdf') {
      setError('Solo se aceptan archivos PDF');
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo no debe superar 10MB');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Convertir archivo a base64
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-purple-50">
      {/* Navegación */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">Clínica Centro de Varices</h1>
          <div className="flex gap-6">
            <a href="/" className="text-gray-600 hover:text-cyan-600 transition">Inicio</a>
            <a href="/#quienes-somos" className="text-gray-600 hover:text-cyan-600 transition">Quiénes Somos</a>
            <a href="/#procedimientos" className="text-gray-600 hover:text-cyan-600 transition">Procedimientos</a>
            <a href="/#contacto" className="text-gray-600 hover:text-cyan-600 transition">Contacto</a>
            <a href="/financial-statements" className="text-cyan-600 font-semibold">Estados Financieros</a>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Estados Financieros
          </h2>
          <p className="text-gray-600 text-lg">
            Accede a nuestros estados financieros y documentos de transparencia
          </p>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área de Administración - Solo para administradores */}
          {isAdmin && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-purple-200 hover:border-purple-400 transition">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Panel de Administrador</h3>
                  <p className="text-gray-600 text-sm text-center mb-6">
                    Sube, edita y elimina estados financieros
                  </p>

                  <label className="w-full">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <div className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:shadow-lg transition text-center">
                      {uploading ? 'Subiendo...' : 'Seleccionar PDF'}
                    </div>
                  </label>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Máximo 10MB • Solo PDF
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Galería de Documentos */}
          <div className={isAdmin ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Documentos Disponibles</h3>
                {!isAdmin && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full text-xs text-blue-700">
                    <Lock className="w-3 h-3" />
                    Solo lectura
                  </div>
                )}
              </div>

              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No hay documentos disponibles aún</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-cyan-300 hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <File className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{doc.fileName}</p>
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
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </a>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                            title="Eliminar documento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón de Acceso Administrador */}
        <div className="mt-12 text-center">
          <a
            href="/financial-statements/login"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
          >
            Acceso Panel Administrador
          </a>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-8 border border-cyan-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Transparencia</h3>
          <p className="text-gray-700 leading-relaxed">
            En nuestro compromiso con la transparencia y la confianza, compartimos nuestros estados financieros 
            de manera pública. Todos los documentos están disponibles para visualización por parte de 
            entidades regulatorias, pacientes y el público en general.
          </p>
        </div>
      </div>
    </div>
  );
}
