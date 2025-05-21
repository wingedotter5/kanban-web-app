import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import { boards, columns, tasks, subtasks } from "@/store/data";

export const useKanbanStore = create((set) => ({
  boards,
  columns,
  tasks,
  subtasks,

  // Boards
  createBoard: (name) =>
    set((state) => ({
      boards: state.boards.concat({ id: uuidv4(), name }),
    })),
  updateBoard: (id, name) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id ? { ...board, name } : board,
      ),
    })),
  deleteBoard: (id) =>
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    })),

  // Columns
  createColumn: (boardId, name) =>
    set((state) => ({
      columns: state.columns.concat({
        id: uuidv4(),
        name,
        boardId,
      }),
    })),
  updateColumn: (id, name) =>
    set((state) => ({
      columns: state.columns.map((column) =>
        column.id === id ? { ...column, name } : column,
      ),
    })),
  deleteColumn: (id) =>
    set((state) => ({
      columns: state.columns.filter((column) => column.id !== id),
    })),

  // Tasks
  createTask: (columnId, name) =>
    set((state) => ({
      tasks: state.tasks.concat({
        id: uuidv4(),
        name,
        description: "",
        columnId,
      }),
    })),
  updateTask: (id, name, description) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, name, description } : task,
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  moveTask: (taskId, columnId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, columnId } : task,
      ),
    })),

  // Subtasks
  createSubtask: (taskId, name) =>
    set((state) => ({
      subtasks: state.subtasks.concat({
        id: uuidv4(),
        name,
        completed: false,
        taskId,
      }),
    })),
  updateSubtask: (id, completed) =>
    set((state) => ({
      subtasks: state.subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, completed } : subtask,
      ),
    })),
  deleteSubtask: (id) =>
    set((state) => ({
      subtasks: state.subtasks.filter((subtask) => subtask.id !== id),
    })),
}));
