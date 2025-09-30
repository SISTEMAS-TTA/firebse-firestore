"use client";

import NavSidebar from "@/app/components/NavSidebar";
import AuthWrapper from "@/app/components/AuthWrapper";
import useUser from "@/app/hooks/useUser";

export default function LogsPage() {
  const { profile, loading } = useUser();

  if (loading) {
    return (
      <AuthWrapper>
        <div className="flex">
          <NavSidebar />
          <main className="flex-1 p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
          </main>
        </div>
      </AuthWrapper>
    );
  }

  const isAdmin = profile?.role === "admin";

  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-3">📊</span>
              Logs del Sistema
            </h1>

            {isAdmin ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">👑</span>
                  <div>
                    <h2 className="text-lg font-semibold text-green-800">
                      ¡Hola Admin!
                    </h2>
                    <p className="text-green-700">
                      Tienes acceso completo a los logs del sistema. Aquí podrás
                      monitorear toda la actividad.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⛔</span>
                  <div>
                    <h2 className="text-lg font-semibold text-red-800">
                      Acceso Restringido
                    </h2>
                    <p className="text-red-700">
                      Esta página está disponible solo para administradores.
                      Contacta al administrador si necesitas acceso.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isAdmin && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Logs Recientes</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-20">INFO</span>
                    <span className="w-32">2025-09-30 10:30</span>
                    <span>Usuario registrado: admin@test.com</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-20">INFO</span>
                    <span className="w-32">2025-09-30 10:25</span>
                    <span>Nueva tarea creada por admin</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-20">INFO</span>
                    <span className="w-32">2025-09-30 10:20</span>
                    <span>Sistema iniciado correctamente</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AuthWrapper>
  );
}
