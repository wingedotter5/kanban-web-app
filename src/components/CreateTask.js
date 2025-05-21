"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import { useKanbanStore } from "@/store/useKanbanStore";

export default function CreateTaskButton({ columnId }) {
  const createTask = useKanbanStore((state) => state.createTask);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    createTask(columnId, taskName);
    setTaskName("");
    closeModal();
  }

  return (
    <>
      <button className="w-max cursor-pointer text-left" onClick={openModal}>
        + Add Task
      </button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Form className="space-y-4" onSubmit={onSubmit}>
          <Form.Title>Add Task</Form.Title>
          <FormControl className="space-y-2">
            <FormControl.Label htmlFor="taskName">Task Name</FormControl.Label>
            <FormControl.Input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
              placeholder="e.g. Design search pages"
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
