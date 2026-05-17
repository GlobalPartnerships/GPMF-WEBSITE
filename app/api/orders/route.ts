import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

export async function POST(request: NextRequest) {
  const { planId, userId } = await request.json();

  const response = await fetch(`${API_BASE_URL}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, plan_id: planId }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
