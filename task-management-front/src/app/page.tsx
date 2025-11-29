"use client";

import { useState } from "react";
import { useTasks } from "@/src/app/hooks/useTasks";

export default function Home() {
  const { tasks, addTask, removeTask } = useTasks();
  // const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1); // 1：低 2：中 3：高
  const [status, setStatus] = useState(1);     // 1：未 2：進 3：済

  const handleAdd = () => {
    if (!title.trim()) return;
    
    addTask(title, description, priority, status);

    setTitle("");
    setDescription("");
    setPriority(1);
    setStatus(1);
  };

 return (
  <main className="p-6">
    <h1 className="text-2xl font-bold mb-4">タスク管理</h1>

    {/* 追加フォーム */}
    <div className="space-y-2 mb-6">
      {/* タイトル */}
      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスク名（例：部屋の掃除）"
      />

      {/* 説明 */}
      <textarea
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="説明（例：トイレ・お風呂・玄関の掃除）"
      />

      {/* 優先度 */}
      <select
        className="border p-2 w-full"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        <option value={1}>優先度：低</option>
        <option value={2}>優先度：中</option>
        <option value={3}>優先度：高</option>
      </select>

      {/* ステータス */}
      <select
        className="border p-2 w-full"
        value={status}
        onChange={(e) => setStatus(Number(e.target.value))}
      >
        <option value={1}>未完了</option>
        <option value={2}>進行中</option>
        <option value={3}>完了</option>
      </select>

      {/* 追加ボタン */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleAdd}
      >
        追加
      </button>
    </div>

    {/* タスク一覧 */}
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{task.task_title}</p>
            <p className="text-sm text-gray-600">{task.task_description}</p>
            <p className="text-xs text-gray-500 mt-1">
              優先度: {task.task_priority} / ステータス: {task.task_status}
            </p>
          </div>

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