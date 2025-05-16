// src/components/tasks/TaskItem.tsx
import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";
import styles from "./Task.module.css";
import { type Task } from "../../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={styles.taskCard}>
      <button
        className={styles.toggleBtn}
        onClick={() => onToggle(task._id, !task.completed)}
        aria-label="Toggle Complete"
      >
        {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
      </button>
      <div className={styles.content}>
        <span className={task.completed ? styles.completed : ""}>
          {task.title}
        </span>
        {task.tags.length > 0 && (
          <div className={styles.tags}>
            {task.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(task._id)}
        aria-label="Delete Task"
      >
        <FaTrash />
      </button>
    </li>
  );
}
