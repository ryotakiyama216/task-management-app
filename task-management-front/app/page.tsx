"use client";

import { useState } from "react";
import { useLocalTasks } from "./hooks/useLocalTasks";

export default function Home() {
  const { tasks, addTask, deleteTask } = useLocalTasks();
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    addTask(inputValue.trim());
    setInputValue("");
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">タスク管理</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="タスクを入力"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center p-2 border rounded">
            <span>{task}</span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

