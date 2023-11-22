-- CreateEnum
CREATE TYPE "MaritialStatus" AS ENUM ('Married', 'Unmarried');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- CreateTable
CREATE TABLE "Student" (
    "userId" TEXT NOT NULL,
    "roll" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("roll","classId","sectionId","sessionId")
);

-- CreateTable
CREATE TABLE "StudentCategory" (
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentCategory_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isCurrentSession" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "Stuff" (
    "userId" TEXT NOT NULL,
    "stuffId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "designationId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "workExperence" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL,
    "maritialStatus" "MaritialStatus" NOT NULL DEFAULT 'Unmarried',
    "dateOfJoining" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("stuffId")
);

-- CreateTable
CREATE TABLE "StuffDesignation" (
    "id" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StuffDesignation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StuffDepartment" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StuffDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffRatings" (
    "stuffId" TEXT NOT NULL,
    "roll" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffRatings_pkey" PRIMARY KEY ("stuffId")
);

-- CreateTable
CREATE TABLE "ClassSubject" (
    "classId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "classClassId" TEXT,
    "sectionSectionId" TEXT,

    CONSTRAINT "ClassSubject_pkey" PRIMARY KEY ("classId","sectionId","subjectId","groupId","roomId")
);

-- CreateTable
CREATE TABLE "ClassTimetable" (
    "classId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassTimetable_pkey" PRIMARY KEY ("classId","sectionId","subjectId","groupId","roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stuff_userId_key" ON "Stuff"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StudentCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("sectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "StuffDesignation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "StuffDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffRatings" ADD CONSTRAINT "staffRatings_stuffId_fkey" FOREIGN KEY ("stuffId") REFERENCES "Stuff"("stuffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffRatings" ADD CONSTRAINT "staffRatings_roll_classId_sectionId_sessionId_fkey" FOREIGN KEY ("roll", "classId", "sectionId", "sessionId") REFERENCES "Student"("roll", "classId", "sectionId", "sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_classId_sectionId_roomId_groupId_fkey" FOREIGN KEY ("classId", "sectionId", "roomId", "groupId") REFERENCES "ClassSection"("classId", "sectionId", "roomId", "groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_subjectId_groupId_fkey" FOREIGN KEY ("subjectId", "groupId") REFERENCES "Subject"("code", "groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_classClassId_fkey" FOREIGN KEY ("classClassId") REFERENCES "Class"("classId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubject" ADD CONSTRAINT "ClassSubject_sectionSectionId_fkey" FOREIGN KEY ("sectionSectionId") REFERENCES "Section"("sectionId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTimetable" ADD CONSTRAINT "ClassTimetable_classId_sectionId_roomId_groupId_subjectId_fkey" FOREIGN KEY ("classId", "sectionId", "roomId", "groupId", "subjectId") REFERENCES "ClassSubject"("classId", "sectionId", "roomId", "groupId", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;
