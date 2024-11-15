// schemas/userSchema.js
import { z } from "zod";

export const subscriptionSchema = z.object({
    userId: z.number().int(),
    subscriptionType: z.enum(['perso', 'pro', 'fusion']),
    billingPeriod: z.enum(['mensuel', 'annuel']),
});