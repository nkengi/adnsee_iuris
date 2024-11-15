// /app/api/admin/users/toggleStatus/[id]/route.ts
import { NextRequest,NextResponse } from "next/server";
import { queryDatabase } from "@/db/db";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id, 10);
    const result = await queryDatabase(
      `UPDATE users SET account_status = NOT account_status WHERE id = $1 RETURNING account_status`,
      [userId]
    );

    return NextResponse.json({ status: "success", updatedStatus: result[0].account_status });
  } catch (error) {
    const errorMessage = error instanceof Error? error.message : "Erreur inconnue";
    return NextResponse.json({ status: "error", message: errorMessage });
  }
}
