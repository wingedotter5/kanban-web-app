"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { useKanbanStore } from "@/store/useKanbanStore";

export default function CreateColumn({ className, boardId }) {
  const createColumn = useKanbanStore((state) => state.createColumn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnName, setColumnName] = useState("");

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    createColumn(boardId, columnName);
    setColumnName("");
    closeModal();
  }

  return (
    <>
      <button
        className={`w-max cursor-pointer self-start text-left ${className}`}
        onClick={openModal}
      >
        + Add Column
      </button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Form className="space-y-4" onSubmit={onSubmit}>
          <Form.Title>Add Column</Form.Title>
          <FormControl className="space-y-2">
            <FormControl.Label htmlFor="columnName">
              Column Name
            </FormControl.Label>
            <FormControl.Input
              type="text"
              id="columnName"
              value={columnName}
              onChange={(event) => setColumnName(event.target.value)}
              placeholder="e.g. Todo"
              autoFocus
              required
            />
          </FormControl>
          <Button type="submit">Create</Button>
        </Form>
      </Modal>
    </>
  );
}
