// hooks/useUser.tsx
"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "@/app/types";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        setProfile(snap.exists() ? (snap.data() as UserProfile) : null);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, profile, loading };
}
