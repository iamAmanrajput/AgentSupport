"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import type { PublicFile } from "@workspace/backend/private/files";
import { Button } from "@workspace/ui/components/button";
import {
  FileIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { UploadDialog } from "../components/upload-dialog";
import { useState } from "react";
import { DeleteFileDialog } from "../components/delete-file-dialog";

export const FilesView = () => {
  const files = usePaginatedQuery(
    api.private.files.list,
    {},
    {
      initialNumItems: 10,
    }
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingFirstPage,
    isLoadingMore,
  } = useInfiniteScroll({
    status: files.status,
    loadMore: files.loadMore,
    loadSize: 10,
  });

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);
  const handleDeleteClick = (file: PublicFile) => {
    setSelectedFile(file);
    setDeleteDialogOpen(true);
  };

  const handleFileDeleted = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <DeleteFileDialog
        onOpenChange={setDeleteDialogOpen}
        open={deleteDialogOpen}
        file={selectedFile}
        onDeleted={handleFileDeleted}
      />
      <UploadDialog
        onOpenChange={setUploadDialogOpen}
        open={uploadDialogOpen}
      />
      <div className="flex min-h-screen flex-col bg-secondary/20 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-primary md:text-3xl">
              Knowledge Base
            </h1>

            <p className="text-xs font-bold text-muted-foreground md:text-base">
              Upload and manage documents for your AI assistant
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="flex items-center justify-between border-b bg-muted/20 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-sm font-semibold">Documents</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Manage your knowledge base files
                </p>
              </div>

              <Button
                className="gap-2 shadow-sm"
                onClick={() => setUploadDialogOpen(true)}
              >
                <PlusIcon className="size-4" />
                Add New
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-5 py-3.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:px-6">
                    Name
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:px-6">
                    Type
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:px-6">
                    Size
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-right text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:px-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {(() => {
                  if (isLoadingFirstPage) {
                    return (
                      <TableRow>
                        <TableCell
                          className="h-32 text-center text-sm text-muted-foreground"
                          colSpan={4}
                        >
                          Loading files...
                        </TableCell>
                      </TableRow>
                    );
                  }

                  if (files.results.length === 0) {
                    return (
                      <TableRow>
                        <TableCell
                          className="h-32 text-center text-sm text-muted-foreground"
                          colSpan={4}
                        >
                          No files found
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return files.results.map((file) => (
                    <TableRow
                      className="group transition-colors hover:bg-muted/30"
                      key={file.id}
                    >
                      <TableCell className="px-5 py-4 sm:px-6">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40 text-muted-foreground transition-colors group-hover:bg-background group-hover:text-foreground">
                            <FileIcon className="size-4" />
                          </div>

                          <span className="truncate text-sm font-medium">
                            {file.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6">
                        <Badge
                          className="rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
                          variant="outline"
                        >
                          {file.type}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-5 py-4 text-sm text-muted-foreground sm:px-6">
                        {file.size}
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  className="size-8 rounded-lg p-0 text-muted-foreground opacity-70 transition-opacity group-hover:opacity-100 hover:text-foreground"
                                  size="sm"
                                  variant="ghost"
                                >
                                  <MoreHorizontalIcon className="size-4" />
                                </Button>
                              }
                            />

                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteClick(file)}
                              >
                                <TrashIcon className="mr-2 size-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ));
                })()}
              </TableBody>
            </Table>

            {!isLoadingFirstPage && files.results.length > 0 && (
              <div className="border-t bg-muted/10">
                <InfiniteScrollTrigger
                  canLoadMore={canLoadMore}
                  isLoadingMore={isLoadingMore}
                  onLoadMore={handleLoadMore}
                  ref={topElementRef}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
