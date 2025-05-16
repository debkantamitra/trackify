// src/api/tasks.ts
import { api } from './client';
import type { Task } from "../types";

// 1. GET all tasks
export async function fetchTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>('/tasks');
  return res.data;
}

// 2. POST new task
export async function createTask(newTask: { title: string; tags?: string[] }): Promise<Task> {
  const res = await api.post<Task>('/tasks', newTask);
  return res.data;
}

// 3. PUT toggle or update task
export async function updateTask(id: string, updates: Partial<Pick<Task, 'completed' | 'tags' | 'title'>>): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, updates);
  return res.data;
}

// 4. DELETE a task
export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
