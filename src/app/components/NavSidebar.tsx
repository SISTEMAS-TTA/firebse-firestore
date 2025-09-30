"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import useAdmin from "@/app/hooks/useAdmin";

export default function NavSidebar() {
  const router = useRouter();
  const { isAdmin, profile, loading } = useAdmin();

  // Items base para todos los usuarios
  const baseItems = [
    { icon: "🏠", label: "Inicio", href: "/" },
    { icon: "📋", label: "Tareas", href: "/tasks" },
  ];

  // Items adicionales para administradores
  const adminItems = [
    { icon: "👥", label: "Gestión Usuarios", href: "/admin/users" },
    { icon: "📊", label: "Logs", href: "/logs" },
    { icon: "⚙️", label: "Configuración", href: "/admin/settings" },
  ];

  // Combinar items según el rol
  const items = isAdmin ? [...baseItems, ...adminItems] : baseItems;

  if (loading) {
    return (
      <nav className="h-screen w-64 bg-gray-900 text-white p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
        </div>
      </nav>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="h-screen w-64 bg-gray-900 text-white p-4 space-y-4">
      {/* Información del usuario */}
      <div className="mb-6 p-3 bg-gray-800 rounded-md">
        <div className="text-sm text-gray-300 mb-0.5">Conectado como:</div>
        <div className="font-semibold my-1">{profile?.email}</div>
        <div className="text-xs text-blue-400 capitalize my-0.5">
          {isAdmin ? "Administrador" : "👤 Usuario 👤"}
        </div>
      </div>

      {items.map(({ icon, label, href }) => (
        <Link
          key={label}
          href={href}
          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
      
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-600 mt-4 w-full text-left transition-colors"
        onClick={handleLogout}
      >
        <span className="text-xl">🚪</span>
        <span>Salir</span>
      </button>
    </nav>
  );
}
