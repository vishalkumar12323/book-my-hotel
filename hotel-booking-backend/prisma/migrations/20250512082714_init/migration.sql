-- AlterTable
ALTER TABLE "room_facilities" ALTER COLUMN "wifi" SET DEFAULT false,
ALTER COLUMN "ac" SET DEFAULT false,
ALTER COLUMN "tv" SET DEFAULT false,
ALTER COLUMN "waterPurifier" SET DEFAULT false,
ALTER COLUMN "twineBed" SET DEFAULT false,
ALTER COLUMN "cityView" SET DEFAULT false,
ALTER COLUMN "bathroom" SET DEFAULT false,
ALTER COLUMN "kitchen" SET DEFAULT false;

-- AlterTable
ALTER TABLE "units" ALTER COLUMN "available" SET DEFAULT false;
