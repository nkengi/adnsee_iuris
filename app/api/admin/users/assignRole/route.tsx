// /app/api/admin/users/assignRole/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { queryDatabase } from "@/db/lib/db";

const assignRoleSchema = z.object({
  userId: z.number(),
  role: z.string(),
});

const tableStructure = await queryDatabase(
  `SELECT column_name FROM information_schema.columns WHERE table_name = 'super_user'`
);
console.log("super_user table structure:", tableStructure);


export async function POST(req: NextRequest) {
  try {
    const { userId, role } = assignRoleSchema.parse(await req.json());

    let result;
    if (role === "none") {
      result = await queryDatabase("DELETE FROM super_user WHERE user_id = $1 RETURNING *", [userId]);
    } else {
      result = await queryDatabase(
        `INSERT INTO super_user (user_id, current_role)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET current_role = $2
         RETURNING *`,
        [userId, role]
      );
    }
    console.log(`result assign role:\n${result}`);
    

    return NextResponse.json({ status: "success", data: result[0] });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return NextResponse.json({ status: "error", message: errorMessage });
  }
}
