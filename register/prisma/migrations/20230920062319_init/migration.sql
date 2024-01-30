-- CreateTable
CREATE TABLE "register" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateofbirth" TEXT NOT NULL,
    "Yearofpassing" TEXT NOT NULL,
    "MartialStatus" TEXT NOT NULL,
    "Currentprofession" TEXT NOT NULL,
    "Professiondescription" VARCHAR(255) NOT NULL,
    "Address" TEXT NOT NULL,
    "Pincode" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "Foundestoflifeandschool" VARCHAR(255) NOT NULL,
    "Suggestion" VARCHAR(255) NOT NULL,

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "signup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "register_email_key" ON "register"("email");

-- CreateIndex
CREATE UNIQUE INDEX "register_contact_key" ON "register"("contact");
