"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/app/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assignerId: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "tasks"),
          where("assigneeId", "==", user.uid)
        );

        const unsubTasks = onSnapshot(q, (snapshot) => {
          const list: Task[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Task[];
          setTasks(list);
        });

        return () => unsubTasks();
      }
    });

    return () => unsubAuth();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mis Tareas</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded-md bg-gray-50">
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p>No tienes tareas asignadas.</p>}
    </div>
  );
}
