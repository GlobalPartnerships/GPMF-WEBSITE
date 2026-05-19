"use client";
import { createContext, useContext, useEffect } from "react";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "user" | "moderator" | "admin";
  profile_image_url: string | null;
};

type UserContextValue = { user: AppUser | null };

const UserContext = createContext<UserContextValue>({ user: null });

export function UserProvider({
  user,
  children,
}: {
  user: AppUser | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (user) console.log("[UserContext] user set:", user);
  }, [user]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
