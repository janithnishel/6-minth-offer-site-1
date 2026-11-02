import { pgTable, uuid, varchar, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Launch-offer registrations.
 * - package_slug: 'solo' | 'growth' | 'scale' | 'ultimate'
 * - The Solo package is capped at 10 seats (enforced in the API route
 *   inside a transaction by counting rows with package_slug = 'solo').
 * - email is unique: one offer registration per business email.
 */
export const offerRegistrations = pgTable(
  "offer_registrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    packageSlug: varchar("package_slug", { length: 24 }).notNull(),
    fullName: varchar("full_name", { length: 120 }).notNull(),
    email: varchar("email", { length: 190 }).notNull().unique(),
    phone: varchar("phone", { length: 32 }).notNull(),
    businessName: varchar("business_name", { length: 160 }),
    teamSize: varchar("team_size", { length: 40 }),
    message: varchar("message", { length: 600 }),
    code: varchar("code", { length: 24 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("offer_reg_package_idx").on(t.packageSlug),
    index("offer_reg_created_idx").on(t.createdAt),
  ],
);

export type OfferRegistration = typeof offerRegistrations.$inferSelect;
export type NewOfferRegistration = typeof offerRegistrations.$inferInsert;
