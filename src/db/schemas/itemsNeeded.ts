import { pgTable, uuid, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { ongs } from "./ongs";

export const itensNecessidade = pgTable("itens_necessidade", {
  id: uuid("id").primaryKey().defaultRandom(),
  ongId: uuid("ong_id")
    .references(() => ongs.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  itemType: varchar("item_type", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
