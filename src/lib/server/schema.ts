import { relations } from "drizzle-orm";
import { 
    boolean,
    integer,
    pgTable,
    serial,
    text,
    varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    first_name: varchar("first_name", { length: 255 }).notNull(),
    last_name: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    completed: boolean("completed").notNull(),
    user_id: integer("user_id").notNull(),
});
  
export const usersRelations = relations(users, ({ many }) => ({
    todos: many(todos),
}));
  
export const todosRelations = relations(todos, ({ one }) => ({
    user: one(users, {
        fields: [todos.user_id],
        references: [users.id],
    }),
}));