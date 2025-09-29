"use client";

import NavSidebar from "@/app/components/NavSidebar";
import TaskList from "@/app/components/TaskList";
import AuthWrapper from "@/app/components/AuthWrapper";

export default function HomePage() {
  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Bienvenido al sistema de gestión de tareas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📋 Tareas
              </h3>
              <p className="text-gray-600">Gestiona tus tareas asignadas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📊 Estadísticas
              </h3>
              <p className="text-gray-600">Visualiza tu progreso</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ⚙️ Configuración
              </h3>
              <p className="text-gray-600">Ajusta tus preferencias</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tus Tareas Recientes
            </h2>
            <TaskList />
          </div>
        </main>
      </div>
    </AuthWrapper>
  );
}
