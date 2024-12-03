
DO $$ BEGIN
    CREATE TYPE "public"."status" AS ENUM('draft', 'sent', 'paid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint