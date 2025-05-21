import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useKanbanStore } from "@/store/useKanbanStore";
import FlyOut from "@/components/FlyOut";
import Modal from "@/components/Modal";
import FormControl from "@/components/FormControl";
import Button from "@/components/Button";

export default function Task({ task }) {
  const subtasks = useKanbanStore((state) => state.subtasks);
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const updateTask = useKanbanStore((state) => state.updateTask);
  const createSubtask = useKanbanStore((state) => state.createSubtask);
  const updateSubtask = useKanbanStore((state) => state.updateSubtask);
  const deleteSubtask = useKanbanStore((state) => state.deleteSubtask);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [newSubtaskName, setNewSubtaskName] = useState("");
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onDeleteClick() {
    deleteTask(task.id);
  }

  function onSave() {
    updateTask(task.id, taskName, taskDescription);
    setIsEditing(false);
  }

  const taskSubtasks = subtasks.filter((subtask) => subtask.taskId === task.id);
  const subtasksCompleted = taskSubtasks.reduce(
    (count, subtask) => (subtask.completed ? count + 1 : count),
    0,
  );

  return (
    <>
      <div
        className="group cursor-pointer rounded bg-[#2b2c37] p-4 text-white hover:text-[#635fc7]"
        onClick={openModal}
        draggable={true}
        onDragStart={(event) =>
          event.dataTransfer.setData(
            "transfer",
            JSON.stringify({
              taskId: task.id,
              columnId: task.columnId,
            }),
          )
        }
      >
        <div className="flex flex-row items-start justify-between">
          <span>{task.name}</span>
          <FlyOut className="text-white group-hover:visible md:invisible">
            <FlyOut.Toggle />
            <FlyOut.List>
              <FlyOut.Item onClick={onDeleteClick}>Delete</FlyOut.Item>
            </FlyOut.List>
          </FlyOut>
        </div>
        <p className="text-[#828fa3]">
          {taskSubtasks.length > 0
            ? `${subtasksCompleted} of ${taskSubtasks.length} subtasks`
            : "No subtasks"}
        </p>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="rounded bg-[#2b2c37] p-2 md:p-4">
          {isEditing ? (
            <form className="space-y-4">
              <FormControl className="space-y-2">
                <FormControl.Label htmlFor="name">Task Name</FormControl.Label>
                <FormControl.Input
                  id="name"
                  placeholder="e.g. Take a coffee break"
                  value={taskName}
                  onChange={(event) => setTaskName(event.target.value)}
                />
              </FormControl>
              <FormControl className="space-y-2">
                <FormControl.Label htmlFor="description">
                  Task Description
                </FormControl.Label>
                <FormControl.Textarea
                  id="description"
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge batteries a little."
                  rows="3"
                  value={taskDescription}
                  onChange={(event) => setTaskDescription(event.target.value)}
                />
              </FormControl>
              <div className="flex flex-row items-center gap-x-2">
                <Button type="button" onClick={onSave}>
                  Save
                </Button>
                <Button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <span className="block space-y-2">
                <span className="block font-bold text-white">Task Name</span>
                <span className="block w-full rounded border border-[rgba(130,143,163,0.25)] px-4 py-2 text-white focus:outline focus:outline-[#635fc7]">
                  {task.name}
                </span>
              </span>
              <span className="block space-y-2">
                <span className="block font-bold text-white">
                  Task Description
                </span>
                <span className="block min-h-24 w-full rounded border border-[rgba(130,143,163,0.25)] px-4 py-2 text-white focus:outline focus:outline-[#635fc7]">
                  {task.description ? task.description : "No description"}
                </span>
              </span>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </div>
          )}
          <hr className="my-4" />
          <div>
            <div className="max-h-48 overflow-y-auto">
              {taskSubtasks.map((subtask) => (
                <div
                  className="flex flex-row items-center gap-x-2"
                  key={subtask.id}
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={(event) => {
                      updateSubtask(subtask.id, event.target.checked);
                    }}
                  />
                  <span
                    className={clsx("grow", {
                      "text-[#828fa3] line-through": subtask.completed,
                    })}
                  >
                    {subtask.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteSubtask(subtask.id)}
                  >
                    <XMarkIcon className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            {show ? (
              <div className="flex flex-row gap-x-2">
                <FormControl.Input
                  type="text"
                  placeholder="e.g. Your subtask here"
                  value={newSubtaskName}
                  onChange={(event) => setNewSubtaskName(event.target.value)}
                  required
                />
                <Button
                  type="button"
                  onClick={() => {
                    createSubtask(task.id, newSubtaskName);
                    setShow(false);
                    setNewSubtaskName("");
                  }}
                >
                  Create
                </Button>
              </div>
            ) : (
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => setShow(true)}
              >
                + Add
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
