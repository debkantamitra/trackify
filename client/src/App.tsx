// src/App.tsx
import { useEffect, useState } from "react";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";
import { fetchTasks, updateTask, deleteTask } from "./api/tasksApi";
import { type Task } from "./types";
import { FaTasks } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (task: Task) => setTasks((prev) => [task, ...prev]);
  const handleToggle = async (id: string, completed: boolean) => {
    const updated = await updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="container">
      <header>
        <FaTasks size={28} color="#0070f3" />
        <h1>Trackify Tasks</h1>
      </header>

      <TaskForm onAdd={handleAdd} />

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
