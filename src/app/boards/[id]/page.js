"use client";

import { useParams, notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import Column from "@/components/Column";
import CreateColumn from "@/components/CreateColumn";
import { useKanbanStore } from "@/store/useKanbanStore";

export default function BoardPage() {
  const { id: boardId } = useParams();
  const boards = useKanbanStore((state) => state.boards);
  const columns = useKanbanStore((state) => state.columns);

  const board = boards.find((board) => board.id === boardId);
  const boardColumns = columns.filter((column) => column.boardId === boardId);

  if (board === undefined) {
    return notFound();
  }

  return (
    <div className="flex grow flex-col overflow-hidden">
      <Topbar board={board} />
      <div className="flex grow flex-row gap-4 overflow-auto p-4">
        {boardColumns.map((column) => (
          <Column
            className="flex-none basis-80"
            key={column.id}
            column={column}
          />
        ))}
        <CreateColumn className="flex-none basis-80" boardId={board.id} />
      </div>
    </div>
  );
}
