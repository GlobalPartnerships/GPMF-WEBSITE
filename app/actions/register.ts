"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Invalid email address").max(100),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().max(20).optional()
    ),
    lang: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword" | "phone", string[]>
>;

export type RegisterState = {
  errors?: RegisterFieldErrors;
  formError?: string;
};

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as RegisterFieldErrors };
  }

  const { name, email, password, phone, lang } = parsed.data;

  const API_BASE = process.env.API_BASE_URL ?? "http://localhost:5000/api/v1";

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, ...(phone ? { phone } : {}) }),
    });
  } catch {
    return { formError: "Could not reach the server. Please try again." };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { formError: body.error ?? "Registration failed. Please try again." };
  }

  const { access_token, refresh_token, user } = await res.json();

  const supabase = await createClient();
  await supabase.auth.setSession({ access_token, refresh_token });

  redirect(`/${lang}/register/${user.id}`);
}
