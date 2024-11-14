import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from '@/db/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, role } = await req.json();
    console.log(`Req server Json\n userId: ${userId}\n role: ${role}`);
    console.log(`type of userId:\n ${typeof userId}`);
    console.log(`type of role:\n ${typeof role}`);
    

    let result;

    if (role === "none") {
      // Delete role if "none" is chosen
      result = await queryDatabase(
        `DELETE FROM superUser WHERE user_id = $1 RETURNING *`,
        [userId]
      );
      console.log(`Role deletion result:\n${JSON.stringify(result)}`);
    } else {
      // Insert or update role
      
      result = await queryDatabase(
        `INSERT INTO superuser (user_id, current_role)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET current_role = $2
         RETURNING *`,
        [userId, role]
      );
      console.log(`Role insertion/updating result:\n${JSON.stringify(result)}`);
    }

    // Assuming result is an array
    const assignedRole = result ? result[0] : null;
    return NextResponse.json({ status: "success", data: assignedRole });
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message });
  }
}
