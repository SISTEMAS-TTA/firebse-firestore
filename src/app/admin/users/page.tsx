"use client";

import { useEffect, useState } from "react";
import NavSidebar from "@/app/components/NavSidebar";
import AuthWrapper from "@/app/components/AuthWrapper";
import AdminUserManagement from "@/app/components/AdminUserManagement";
import useAdmin from "@/app/hooks/useAdmin";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
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
    return null; // El useEffect redirigirá
  }

  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              👥 Gestión de Usuarios
            </h1>
            <p className="text-gray-600 mt-2">
              Administra los usuarios del sistema
            </p>
          </div>
          
          <AdminUserManagement />
        </main>
      </div>
    </AuthWrapper>
  );
}
