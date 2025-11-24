"use client";

import { useEffect, useState } from "react";
import { Task } from "@/src/types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 初回ロード時 localStorage から読み込む
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // localStorage に保存する
  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // タスク追加
  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };

    saveTasks([...tasks, newTask]);
  };

  // タスク削除
  const removeTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    saveTasks(newTasks);
  };

  return { tasks, addTask, removeTask };
};
