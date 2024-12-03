DO $$ BEGIN
    CREATE TYPE "public"."payment_method" AS ENUM('credit_card', 'bank_transfer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

DO $$ BEGIN
    CREATE TYPE "public"."role" AS ENUM('admin', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint