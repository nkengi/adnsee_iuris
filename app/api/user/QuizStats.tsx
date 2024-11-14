import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// import {  } from "@/db/admin/";

// User Progress Tracking API
// this endpoint fetches quiz stats for the logged-in user.
export async function GET(req: NextRequest) {
  // Récupère le user id dans la requete ( à check en détail)
  const userId = req.headers.get("user-id");
  
  // const stats = await sql`
  //   SELECT 
  //     SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS inProgress,
  //     SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed
  //   FROM user_quiz_progress
  //   WHERE user_id = ${userId};
  // `;
  const stats = await sql`
    SELECT 
      SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS inProgress,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed
    FROM user_quiz_progress
    WHERE user_id = ${userId};
  `;
  console.log(
    `Quiz Stats route endpoint api:\n
     ${JSON.stringify(stats)}
    `
    );
  

  return NextResponse.json({ status: "success", stats: stats.rows[0] });
}
