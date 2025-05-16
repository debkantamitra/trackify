// src/components/tasks/TaskList.tsx
import TaskItem from "./TaskItem";
import { type Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: "center", color: "#666" }}>No tasks yet</p>;
  }

  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
