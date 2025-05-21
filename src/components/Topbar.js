"use client";

import { useState } from "react";
import Button from "@/components/Button";
import FlyOut from "@/components/FlyOut";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { useKanbanStore } from "@/store/useKanbanStore";

export default function Topbar({ board }) {
  const updateBoard = useKanbanStore((state) => state.updateBoard);
  const deleteBoard = useKanbanStore((state) => state.deleteBoard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState(board.name);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    updateBoard(board.id, newBoardName);
    setIsModalOpen(false);
  }

  function onDeleteClick() {
    deleteBoard(board.id);
    closeModal();
  }

  return (
    <header className="flex items-center justify-between border-b border-b-[#444] bg-[#2b2c37] p-4">
      <h2 className="text-2xl font-medium text-white">{board.name}</h2>
      <div className="flex flex-row items-center gap-x-2">
        <FlyOut>
          <FlyOut.Toggle />
          <FlyOut.List>
            <FlyOut.Item onClick={openModal}>Rename</FlyOut.Item>
            <FlyOut.Item onClick={onDeleteClick}>Delete</FlyOut.Item>
          </FlyOut.List>
        </FlyOut>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Form className="space-y-4" onSubmit={onSubmit}>
          <Form.Title>Rename Board</Form.Title>
          <FormControl className="space-y-2">
            <FormControl.Label htmlFor="newBoardName">
              Board Name
            </FormControl.Label>
            <FormControl.Input
              id="newBoardName"
              value={newBoardName}
              onChange={(event) => setNewBoardName(event.target.value)}
              required
              autoFocus
            />
          </FormControl>
          <Button type="submit" onSubmit={onSubmit}>
            Save
          </Button>
        </Form>
      </Modal>
    </header>
  );
}
