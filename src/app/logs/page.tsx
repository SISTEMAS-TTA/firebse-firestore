"use client";

import NavSidebar from "@/app/components/NavSidebar";
import AuthWrapper from "@/app/components/AuthWrapper";

export default function LogsPage() {
  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">
            Logs del Sistema (Solo Admin)
          </h1>
          <p className="text-gray-600">
            Esta página estará disponible solo para administradores.
          </p>
        </main>
      </div>
    </AuthWrapper>
  );
}
