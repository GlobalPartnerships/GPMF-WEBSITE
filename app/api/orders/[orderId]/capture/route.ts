import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
