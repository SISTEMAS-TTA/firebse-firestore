"use client";

import NavSidebar from "@/app/components/NavSidebar";
import TaskList from "@/app/components/TaskList";
import AuthWrapper from "@/app/components/AuthWrapper";
import useAdmin from "@/app/hooks/useAdmin";
import Link from "next/link";

export default function HomePage() {
  const { isAdmin, profile, loading } = useAdmin();

  if (loading) {
    return (
      <AuthWrapper>
        <div className="flex">
          <div className="w-64 bg-gray-900"></div>
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isAdmin ? "🏠 Panel de Administración" : "🏠 Dashboard"}
            </h1>
            <p className="text-gray-600 mt-2">
              {isAdmin 
                ? `Bienvenido, ${profile?.email}. Tienes acceso completo al sistema.`
                : `Bienvenido al sistema de gestión de tareas, ${profile?.email}`
              }
            </p>
          </div>

          {/* Cards diferentes según el rol */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card común: Tareas */}
            <Link href="/tasks" className="block">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📋 Tareas
                </h3>
                <p className="text-gray-600">
                  {isAdmin ? "Supervisa todas las tareas" : "Gestiona tus tareas asignadas"}
                </p>
              </div>
            </Link>

            {/* Cards específicas para admin */}
            {isAdmin ? (
              <>
                <Link href="/admin/users" className="block">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      👥 Gestión de Usuarios
                    </h3>
                    <p className="text-gray-600">Administra usuarios del sistema</p>
                  </div>
                </Link>
                
                <Link href="/logs" className="block">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📊 Logs del Sistema
                    </h3>
                    <p className="text-gray-600">Monitorea la actividad del sistema</p>
                  </div>
                </Link>

                <Link href="/admin/settings" className="block">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ⚙️ Configuración
                    </h3>
                    <p className="text-gray-600">Configuraciones del sistema</p>
                  </div>
                </Link>

                {/* Estadísticas rápidas para admin */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-md text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    📈 Estadísticas Rápidas
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>• Usuarios activos: -</p>
                    <p>• Tareas pendientes: -</p>
                    <p>• Sistema: Operativo ✅</p>
                  </div>
                </div>

                {/* Acciones rápidas para admin */}
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-md text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    ⚡ Acciones Rápidas
                  </h3>
                  <div className="space-y-2">
                    <Link 
                      href="/admin/users" 
                      className="block text-sm hover:underline"
                    >
                      • Crear nuevo usuario
                    </Link>
                    <Link 
                      href="/logs" 
                      className="block text-sm hover:underline"
                    >
                      • Ver logs recientes
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Cards para usuarios normales */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📊 Mi Progreso
                  </h3>
                  <p className="text-gray-600">Visualiza tu progreso personal</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🎯 Mis Objetivos
                  </h3>
                  <p className="text-gray-600">Establece y sigue tus metas</p>
                </div>
              </>
            )}
          </div>

          {/* Sección de tareas */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isAdmin ? "📋 Todas las Tareas del Sistema" : "📋 Tus Tareas Recientes"}
            </h2>
            <TaskList />
          </div>
        </main>
      </div>
    </AuthWrapper>
  );
}
