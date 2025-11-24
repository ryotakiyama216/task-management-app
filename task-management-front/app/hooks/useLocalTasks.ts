"use client";

import { useEffect, useState } from "react";

export const useLocalTasks = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  // 初回だけlocalStorageから読み込む
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // 変更があったらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return { tasks, addTask, deleteTask };
};
