"use client";

import useUser from "@/app/hooks/useUser";

export default function UserWelcome() {
  const { user, profile, loading } = useUser();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const isAdmin = profile.role === "admin";
  const welcomeMessage = isAdmin ? "¡Hola Admin!" : "¡Hola Usuario!";
  const roleIcon = isAdmin ? "👑" : "👤";
  const roleBadgeColor = isAdmin
    ? "bg-purple-100 text-purple-800"
    : "bg-blue-100 text-blue-800";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{roleIcon}</span>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {welcomeMessage}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${roleBadgeColor}`}
        >
          {isAdmin ? "Administrador" : "Usuario"}
        </span>
      </div>

      {isAdmin && (
        <div className="mt-3 p-3 bg-purple-50 rounded-md">
          <p className="text-sm text-purple-700 flex items-center">
            <span className="mr-2">🔑</span>
            Tienes permisos de administrador. Puedes acceder a todas las
            funciones del sistema.
          </p>
        </div>
      )}
    </div>
  );
}
