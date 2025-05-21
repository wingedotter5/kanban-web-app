import { useState } from "react";
import Task from "@/components/Task";
import Button from "@/components/Button";
import { useKanbanStore } from "@/store/useKanbanStore";
import CreateTask from "@/components/CreateTask";
import FlyOut from "@/components/FlyOut";
import Form from "@/components/Form";
import FormControl from "@/components/FormControl";
import Modal from "@/components/Modal";

export default function Column({ className, column }) {
  const tasks = useKanbanStore((state) => state.tasks);
  const updateColumn = useKanbanStore((state) => state.updateColumn);
  const deleteColumn = useKanbanStore((state) => state.deleteColumn);
  const moveTask = useKanbanStore((state) => state.moveTask);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState(column.name);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onDeleteClick() {
    deleteColumn(column.id);
  }

  function onRenameClick() {
    openModal();
  }

  function onSubmit(event) {
    event.preventDefault();
    updateColumn(column.id, newColumnName);
    closeModal();
  }

  function onDrop(event) {
    event.preventDefault();
    const { taskId, columnId } = JSON.parse(
      event.dataTransfer.getData("transfer"),
    );

    if (column.id === columnId) {
      return;
    }

    moveTask(taskId, column.id);
  }

  const columnTasks = tasks.filter((task) => task.columnId === column.id);

  return (
    <div
      className={`flex flex-col gap-y-4 ${className}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex flex-row items-center justify-between">
        <span className="text-[#828fa3]">
          {column.name} ({columnTasks.length})
        </span>
        <FlyOut>
          <FlyOut.Toggle />
          <FlyOut.List>
            <FlyOut.Item onClick={onRenameClick}>Rename</FlyOut.Item>
            <FlyOut.Item onClick={onDeleteClick}>Delete</FlyOut.Item>
          </FlyOut.List>
        </FlyOut>
      </div>
      {columnTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <CreateTask columnId={column.id} />
      <Modal open={isModalOpen} onClose={closeModal}>
        <Form className="space-y-4" onSubmit={onSubmit}>
          <Form.Title>Rename Column</Form.Title>
          <FormControl className="space-y-2">
            <FormControl.Label htmlFor="newColumnName">
              Column Name
            </FormControl.Label>
            <FormControl.Input
              type="text"
              id="newColumnName"
              value={newColumnName}
              onChange={(event) => setNewColumnName(event.target.value)}
              placeholder="e.g. Todo"
              autoFocus
              required
            />
          </FormControl>
          <Button type="submit">Save</Button>
        </Form>
      </Modal>
    </div>
  );
}
