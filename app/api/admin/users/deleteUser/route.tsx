// /app/api/admin/users/deleteUser/[id]/route.ts
import { NextRequest,NextResponse } from "next/server";
import { queryDatabase } from "@/db/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id, 10);
    await queryDatabase(`DELETE FROM users WHERE id = $1`, [userId]);
    return NextResponse.json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error? error.message : "Erreur inconnue";
    return NextResponse.json({ status: "error", message: errorMessage });
  }
}
