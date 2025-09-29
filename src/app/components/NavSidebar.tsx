"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

const items = [
  { icon: "🏠", label: "Inicio", href: "/" },
  { icon: "📋", label: "Tareas", href: "/tasks" },
  { icon: "📊", label: "Logs (Admin)", href: "/logs" },
];

export default function NavSidebar() {
  const router = useRouter();

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
      {items.map(({ icon, label, href }) => (
        <Link
          key={label}
          href={href}
          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700"
        >
          <span className="text-xl">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-600 mt-4 w-full text-left"
        onClick={handleLogout}
      >
        <span className="text-xl">🚪</span>
        <span>Salir</span>
      </button>
    </nav>
  );
}
