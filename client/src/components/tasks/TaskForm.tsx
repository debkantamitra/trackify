// src/components/tasks/TaskForm.tsx
import { useState, type FormEvent } from "react";
import { createTask } from "../../api/tasksApi";
import { useApi } from "../../hooks/useApi";
import { type Task } from "../../types";

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { call: createTaskCall, loading, error: apiError } = useApi(createTask);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setLocalError("Title is required");
      return;
    }

    setLocalError(null);

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const newTask = await createTaskCall({ title, tags });

    if (newTask) {
      onAdd(newTask);
      setTitle("");
      setTagsInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <br />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        disabled={loading}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add Task"}
      </button>
      {(localError || apiError) && (
        <p style={{ color: "red" }}>{localError || apiError}</p>
      )}
    </form>
  );
}
