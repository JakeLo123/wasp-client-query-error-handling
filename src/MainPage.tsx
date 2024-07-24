import React, { FormEventHandler, FormEvent } from "react";
import { type Task } from "wasp/entities";
import { type AuthUser, getUsername } from "wasp/auth";
import { logout } from "wasp/client/auth";
import {
  createTask,
  updateTask,
  deleteTasks,
  useQuery,
  getTasks,
} from "wasp/client/operations";
import waspLogo from "./waspLogo.png";

import "./Main.css";

export const MainPage = ({ user }: { user: AuthUser }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;
  else return "Everything is fine";
};

function Todo({ id, isDone, description }: Task) {
  const handleIsDoneChange: FormEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      await updateTask({
        id,
        isDone: event.currentTarget.checked,
      });
    } catch (err: any) {
      window.alert("Error while updating task " + err?.message);
    }
  };

  return (
    <li>
      <span className="todo-item">
        <input
          type="checkbox"
          id={id.toString()}
          checked={isDone}
          onChange={handleIsDoneChange}
        />
        <span>{description}</span>
        <button onClick={() => void deleteTasks([id])}>Delete</button>
      </span>
    </li>
  );
}

function TasksList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;
  return (
    <ol className="tasklist">
      {tasks.map((task, idx) => (
        <Todo {...task} key={idx} />
      ))}
    </ol>
  );
}

function NewTaskForm() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const description = event.currentTarget.description.value;
      console.log(description);
      event.currentTarget.reset();
      await createTask({ description });
    } catch (err: any) {
      window.alert("Error: " + err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" />
      <input type="submit" value="Create task" />
    </form>
  );
}
