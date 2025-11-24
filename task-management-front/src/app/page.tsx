"use client";

import { useState } from "react";
import { useTasks } from "@/src/app/hooks/useTasks";

export default function Home() {
  const { tasks, addTask, removeTask } = useTasks();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(input);
    setInput("");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">タスク管理</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={handleAdd}
        >
          追加
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{task.text}</span>
            <button
              className="text-red-500"
              onClick={() => removeTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}