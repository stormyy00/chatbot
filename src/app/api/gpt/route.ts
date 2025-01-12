import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    console.log("Request body:", body);
    if (body.prompt === "Hello") {
      body.prompt = "Hi there!";
    }

    const response = {
      message: "Request received successfully",
      response: body,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 },
    );
  }
}
