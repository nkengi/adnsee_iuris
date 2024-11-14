// app/api/subscription/change/route.js
// import { subscriptionSchema } from "@/models/userSchema";
// import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { queryDatabase } from '@/db/db';
import { z } from "zod"; // pour validation


export async function POST(req: NextRequest) {
    try {
        // zod validation through schema
        const body = await req.json();
        const validatedData = subscriptionSchema.parse(body);
        alert(`User id: ${validatedData.userId}\n
            Type of subscribtion: ${validatedData.subscriptionType}\n
            Billing period: ${validatedData.billingPeriod}`
        );

        const result = await queryDatabase(
            `INSERT INTO quiz (user_id, subscription_type, billing_period)
             VALUES ($1, $2, $3) RETURNING *`,
            [
                validatedData.userId,
                validatedData.subscriptionType,
                validatedData.billingPeriod,
            ]
        );

        return new Response(JSON.stringify({ success: true, subscription }), { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';

        return new Response(JSON.stringify({ error: message }), { status: 400 });
    }
}
