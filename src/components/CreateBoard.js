"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { useKanbanStore } from "@/store/useKanbanStore";

export default function CreateBoardButton() {
  const createBoard = useKanbanStore((state) => state.createBoard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardName, setBoardName] = useState("");

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    createBoard(boardName);
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal}>Create Board</Button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Form className="space-y-4" onSubmit={onSubmit}>
          <Form.Title>Add Board</Form.Title>
          <FormControl className="space-y-2">
            <FormControl.Label htmlFor="boardName">
              Board Name
            </FormControl.Label>
            <FormControl.Input
              type="text"
              id="boardName"
              placeholder="e.g. Web Design"
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
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
