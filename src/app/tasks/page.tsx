"use client";

import NavSidebar from "@/app/components/NavSidebar";
import TaskList from "@/app/components/TaskList";
import AuthWrapper from "@/app/components/AuthWrapper";

export default function TasksPage() {
  return (
    <AuthWrapper>
      <div className="flex">
        <NavSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Mis Tareas</h1>
          <TaskList />
        </main>
      </div>
    </AuthWrapper>
  );
}
