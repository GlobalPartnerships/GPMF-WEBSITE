import "server-only";

const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:5000/api/v1";

interface RequestOptions {
  headers?: Record<string, string>;
  next?: NextFetchRequestConfig;
}

async function request<T>(
  path: string,
  method: string,
  body?: unknown,
  options?: RequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    next: options?.next,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `API ${method} ${path} failed (${response.status}): ${errorBody}`
    );
  }

  if (response.status === 204) return undefined as T;

  return response.json();
}

export function apiGet<T>(path: string, options?: RequestOptions): Promise<T> {
  return request<T>(path, "GET", undefined, options);
}

export function apiPost<T>(
  path: string,
  body: unknown,
  options?: RequestOptions
): Promise<T> {
  return request<T>(path, "POST", body, options);
}

export function apiPut<T>(
  path: string,
  body: unknown,
  options?: RequestOptions
): Promise<T> {
  return request<T>(path, "PUT", body, options);
}

export function apiPatch<T>(
  path: string,
  body: unknown,
  options?: RequestOptions
): Promise<T> {
  return request<T>(path, "PATCH", body, options);
}

export function apiDelete<T = void>(
  path: string,
  options?: RequestOptions
): Promise<T> {
  return request<T>(path, "DELETE", undefined, options);
}

export async function apiUpload<T>(
  path: string,
  formData: FormData,
  options?: RequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { ...options?.headers },
    body: formData,
    next: options?.next,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `API POST ${path} failed (${response.status}): ${errorBody}`
    );
  }

  return response.json();
}
