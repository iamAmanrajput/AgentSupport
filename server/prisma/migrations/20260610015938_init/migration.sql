-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('UNASSIGNED', 'UNRESOLVED', 'ESCALATED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM', 'TOOL');

-- CreateEnum
CREATE TYPE "KnowledgeBaseEntryStatus" AS ENUM ('PENDING', 'READY', 'ERROR');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operators" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "operators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "widgetToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_assignments" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'FREE',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE',
    "maxProjects" INTEGER NOT NULL DEFAULT 2,
    "maxOperators" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMP(3),
    "razorpaySubscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "widget_settings" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "greetMessage" TEXT NOT NULL,
    "suggestions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "widget_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_sessions" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "contactSessionId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "status" "ConversationStatus" NOT NULL DEFAULT 'UNASSIGNED',
    "assignedOperatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "textContent" TEXT,
    "payload" JSONB,
    "agentName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage_files" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" BIGINT NOT NULL,
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "storage_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_base_entries" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "storageFileId" TEXT,
    "filename" TEXT NOT NULL,
    "contentHash" TEXT,
    "category" TEXT,
    "status" "KnowledgeBaseEntryStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_base_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_base_chunks" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "qdrantPointId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_base_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "operators_email_key" ON "operators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "operators_token_key" ON "operators"("token");

-- CreateIndex
CREATE INDEX "operators_adminId_idx" ON "operators"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_widgetToken_key" ON "projects"("widgetToken");

-- CreateIndex
CREATE INDEX "projects_creatorId_idx" ON "projects"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_creatorId_name_key" ON "projects"("creatorId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "project_assignments_projectId_operatorId_key" ON "project_assignments"("projectId", "operatorId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_adminId_key" ON "subscriptions"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_razorpaySubscriptionId_key" ON "subscriptions"("razorpaySubscriptionId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "widget_settings_projectId_key" ON "widget_settings"("projectId");

-- CreateIndex
CREATE INDEX "contact_sessions_projectId_idx" ON "contact_sessions"("projectId");

-- CreateIndex
CREATE INDEX "contact_sessions_expiresAt_idx" ON "contact_sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "contact_sessions_email_idx" ON "contact_sessions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_threadId_key" ON "conversations"("threadId");

-- CreateIndex
CREATE INDEX "conversations_assignedOperatorId_idx" ON "conversations"("assignedOperatorId");

-- CreateIndex
CREATE INDEX "conversations_projectId_createdAt_idx" ON "conversations"("projectId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "conversations_status_projectId_createdAt_idx" ON "conversations"("status", "projectId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "threads_projectId_idx" ON "threads"("projectId");

-- CreateIndex
CREATE INDEX "messages_threadId_createdAt_idx" ON "messages"("threadId", "createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "storage_files_publicId_key" ON "storage_files"("publicId");

-- CreateIndex
CREATE INDEX "storage_files_projectId_idx" ON "storage_files"("projectId");

-- CreateIndex
CREATE INDEX "knowledge_base_entries_projectId_status_idx" ON "knowledge_base_entries"("projectId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_base_entries_projectId_contentHash_key" ON "knowledge_base_entries"("projectId", "contentHash");

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_base_chunks_qdrantPointId_key" ON "knowledge_base_chunks"("qdrantPointId");

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_base_chunks_entryId_chunkIndex_key" ON "knowledge_base_chunks"("entryId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "operators" ADD CONSTRAINT "operators_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assignments" ADD CONSTRAINT "project_assignments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_assignments" ADD CONSTRAINT "project_assignments_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "operators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widget_settings" ADD CONSTRAINT "widget_settings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_sessions" ADD CONSTRAINT "contact_sessions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_contactSessionId_fkey" FOREIGN KEY ("contactSessionId") REFERENCES "contact_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_assignedOperatorId_fkey" FOREIGN KEY ("assignedOperatorId") REFERENCES "operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_files" ADD CONSTRAINT "storage_files_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_base_entries" ADD CONSTRAINT "knowledge_base_entries_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_base_entries" ADD CONSTRAINT "knowledge_base_entries_storageFileId_fkey" FOREIGN KEY ("storageFileId") REFERENCES "storage_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_base_chunks" ADD CONSTRAINT "knowledge_base_chunks_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "knowledge_base_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
