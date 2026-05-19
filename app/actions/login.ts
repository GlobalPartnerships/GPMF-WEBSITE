"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  lang: z.string(),
});

export type LoginState = {
  formError?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { formError: "Please enter a valid email and password." };
  }

  const { email, password, lang } = parsed.data;

  const API_BASE = process.env.API_BASE_URL ?? "http://localhost:5000/api/v1";

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return { formError: "Could not reach the server. Please try again." };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { formError: body.error ?? "Login failed. Please check your credentials." };
  }

  const { access_token, refresh_token, user } = await res.json();

  const supabase = await createClient();
  await supabase.auth.setSession({ access_token, refresh_token });

  redirect(`/${lang}/${user.role === "admin" ? "admin" : "user"}`);
}
