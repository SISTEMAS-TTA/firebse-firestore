"use client";

import { useEffect, useState } from "react";
import NavSidebar from "@/app/components/NavSidebar";
import AuthWrapper from "@/app/components/AuthWrapper";
import useAdmin from "@/app/hooks/useAdmin";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, loading, router, mounted]);

  if (!mounted || loading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 bg-gray-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              ⚙️ Configuración del Sistema
            </h1>
            <p className="text-gray-600 mt-2">
              Configuraciones avanzadas del sistema
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuraciones generales */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔧 Configuraciones Generales
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Sistema
                  </label>
                  <input
                    type="text"
                    defaultValue="MVP Task Dashboard"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Límite de Tareas por Usuario
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>

            {/* Configuraciones de seguridad */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔒 Configuraciones de Seguridad
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Requerir autenticación de 2 factores
                  </span>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Sesiones automáticas (24h)
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiempo de sesión (minutos)
                  </label>
                  <input
                    type="number"
                    defaultValue="1440"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Aplicar Configuración
                </button>
              </div>
            </div>

            {/* Estadísticas del sistema */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Estadísticas del Sistema
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de Usuarios:</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Administradores:</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tareas Activas:</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tareas Completadas:</span>
                  <span className="font-semibold">-</span>
                </div>
              </div>
            </div>

            {/* Acciones del sistema */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🛠️ Acciones del Sistema
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors">
                  🔄 Sincronizar Base de Datos
                </button>
                <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                  🧹 Limpiar Logs Antiguos
                </button>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  📤 Exportar Datos
                </button>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  ⚠️ Reiniciar Sistema
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthWrapper>
  );
}
