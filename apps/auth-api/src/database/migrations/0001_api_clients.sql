CREATE TABLE "api_clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text NOT NULL,
	"client_id" text NOT NULL,
	"client_secret_hash" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX "api_clients_uuid_unique" ON "api_clients" ("uuid");
--> statement-breakpoint
CREATE UNIQUE INDEX "api_clients_client_id_unique" ON "api_clients" ("client_id");
