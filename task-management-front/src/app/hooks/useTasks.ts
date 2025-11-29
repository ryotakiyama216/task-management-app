"use client";

import { useEffect, useState } from "react";
import { Task } from "@/src/types/task";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

console.log("API", API_BASE)

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // 📌 タスク一覧取得 (GET /tasks)
  // ---------------------------
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("タスク取得エラー:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------------------
  // 📌 タスク追加 (POST /tasks)
  // ---------------------------
  const addTask = async (title: string, description: string, priority: number, status: number, project_id: string) => {
    const newTask: Task = {
      task_id: crypto.randomUUID(),
      task_title: title,
      task_description: description,
      task_priority: priority,
      task_status: status,
      project_id: project_id,
    };

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("APIエラー: 追加できませんでした");
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------------------
  // 📌 タスク削除 (DELETE /tasks/{id})
  // ---------------------------
  const removeTask = async (id: string) => {
    // try {
    //   const res = await fetch(`${API_BASE}/tasks/${id}`, {
    //     method: "DELETE",
    //   });

    //   if (!res.ok) throw new Error("削除できませんでした");

    //   setTasks((prev) => prev.filter((task) => task.task_id !== id));
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return {
    tasks,
    loading,
    addTask,
    removeTask,
    reload: fetchTasks,
  };
};

