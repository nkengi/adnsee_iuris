INSERT INTO users (username, email, password_hash, typeAccount)
VALUES ('adn_see_iuris', 'admin@adn_see_iuris.org', 'hashed_password', 'fusion');

-- Insert users with different account types
INSERT INTO users (username, email, password_hash, typeAccount)
VALUES 
  ('user_pro', 'userpro@test.com', 'hashed_password_1', 'pro'),
  ('user_fusion', 'userfusion@test.com', 'hashed_password_2', 'fusion'),
  ('user_perso', 'userperso@test.com', 'hashed_password_3', 'perso');


-- // schemas/userSchema.js
-- import { z } from "zod";

-- export const userSchema = z.object({
--   usernameOrEmail: z.string().nonempty("Le nom d'utilisateur ou l'email est requis."),
--   password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
--   typeAccount: z.enum(['perso', 'pro', 'fusion']),
-- });

-- export const subscriptionSchema = z.object({
--   userId: z.number().int(),
--   subscriptionType: z.enum(['perso', 'pro', 'fusion']),
--   billingPeriod: z.enum(['mensuel', 'annuel']),
-- });
