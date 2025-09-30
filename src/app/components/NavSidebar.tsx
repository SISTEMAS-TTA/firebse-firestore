"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";

const allItems = [
  { icon: "🏠", label: "Inicio", href: "/", roles: ["user", "admin"] },
  { icon: "📋", label: "Tareas", href: "/tasks", roles: ["user", "admin"] },
  { icon: "📊", label: "Logs (Admin)", href: "/logs", roles: ["admin"] },
];

export default function NavSidebar() {
  const router = useRouter();
  const { user, profile, loading } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Filtrar elementos según el rol del usuario
  const userRole = profile?.role || "user";
  const visibleItems = allItems.filter((item) => item.roles.includes(userRole));

  if (loading) {
    return (
      <nav className="h-screen w-64 bg-gray-900 text-white p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      {/* Header con información del usuario */}
      <div className="mb-6 p-3 bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-xl">
            {profile?.role === "admin" ? "👑" : "👤"}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {profile?.role === "admin" ? "Admin" : "Usuario"}
            </p>
            <p className="text-xs text-gray-300 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 space-y-2">
        {visibleItems.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700"
          >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Logout button */}
      <div className="mt-4">
        <button
          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-600 w-full text-left"
          onClick={handleLogout}
        >
          <span className="text-xl">🚪</span>
          <span>Salir</span>
        </button>
      </div>
    </nav>
  );
}
