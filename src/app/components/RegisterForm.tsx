"use client";

import React, { useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Guardar en Firestore con el rol
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role,
        createdAt: serverTimestamp(),
      });

      alert("Usuario registrado con éxito ✅");
      router.push("/");
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 p-4 border rounded-md">
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-3 py-2 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full border px-3 py-2 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="w-full border px-3 py-2 rounded-md"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">Usuario</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Registrar
      </button>
    </form>
  );
}
