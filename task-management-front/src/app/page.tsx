"use client";

import { useState } from "react";
import { useTasks } from "@/src/app/hooks/useTasks";
import { useProjects } from "@/src/app/hooks/useProjects";

import {
  FolderPlus,
  ListPlus,
  Trash2,
  Type,
  FileText,
  Flag,
  CheckCircle,
  Sun,
  Moon,
  Calendar
} from "lucide-react";

export default function Home() {
  const { tasks, addTask, removeTask } = useTasks();
  const { projects, addProject } = useProjects();

  const [dark, setDark] = useState(false);

  // ---- タスク入力 ----
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(1);
  const [projectId, setProjectId] = useState("");

  // ---- プロジェクト入力 ----
  const [pjName, setPjName] = useState("");
  const [pjDetail, setPjDetail] = useState("");
  const [pjDeadline, setPjDeadline] = useState("");
  const [pjPriority, setPjPriority] = useState(1);
  const [pjStatus, setPjStatus] = useState(1);

  const handleAddTask = () => {
    if (!title.trim()) return;

    addTask(title, description, priority, status, projectId);

    setTitle("");
    setDescription("");
    setPriority(1);
    setStatus(1);
  };

  const handleAddProject = () => {
    if (!pjName.trim()) return;

    addProject(pjName, pjDetail, pjDeadline, pjPriority, pjStatus);

    setPjName("");
    setPjDetail("");
    setPjDeadline("");
    setPjPriority(1);
    setPjStatus(1);
  };

  return (
    <main className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-all">

        {/* ダークモード切替 */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          プロジェクト & タスク管理
        </h1>

        {/* ==================== プロジェクト追加 ==================== */}
        <section className="mb-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3">
            <FolderPlus size={22} />
            プロジェクト追加
          </h2>

          <div className="space-y-3">

            {/* タイトル */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <Type size={18} className="text-gray-500" />
              <input
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={pjName}
                onChange={(e) => setPjName(e.target.value)}
                placeholder="プロジェクト名"
              />
            </div>

            {/* 詳細 */}
            <div className="flex items-start gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <FileText size={18} className="text-gray-500 mt-1" />
              <textarea
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={pjDetail}
                onChange={(e) => setPjDetail(e.target.value)}
                placeholder="プロジェクト説明"
              />
            </div>

            {/* 締め切り */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <Calendar size={18} className="text-gray-500" />
              <input
                type="date"
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={pjDeadline}
                onChange={(e) => setPjDeadline(e.target.value)}
                placeholder="締め切り"
              />
            </div>

            {/* 優先度 */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <Flag size={18} className="text-gray-500" />
              <select
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={pjPriority}
                onChange={(e) => setPjPriority(Number(e.target.value))}
              >
                <option value={1}>優先度：低</option>
                <option value={2}>優先度：中</option>
                <option value={3}>優先度：高</option>
              </select>
            </div>

            {/* ステータス */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <CheckCircle size={18} className="text-gray-500" />
              <select
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={pjStatus}
                onChange={(e) => setPjStatus(Number(e.target.value))}
              >
                <option value={1}>未着手</option>
                <option value={2}>進行中</option>
                <option value={3}>完了</option>
              </select>
            </div>

            {/* 追加ボタン */}
            <button
              onClick={handleAddProject}
              className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:scale-105 transition-transform"
            >
              <FolderPlus size={20} />
              追加
            </button>
          </div>
        </section>

        {/* ==================== タスク追加 ==================== */}
        <section className="mb-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3">
            <ListPlus size={22} />
            タスク追加
          </h2>

          <div className="space-y-3">

            {/* タイトル */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <Type size={18} className="text-gray-500" />
              <input
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タスク名"
              />
            </div>

            {/* 説明 */}
            <div className="flex items-start gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <FileText size={18} className="text-gray-500 mt-1" />
              <textarea
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="説明"
              />
            </div>

            {/* 優先度 */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <Flag size={18} className="text-gray-500" />
              <select
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              >
                <option value={1}>優先度：低</option>
                <option value={2}>優先度：中</option>
                <option value={3}>優先度：高</option>
              </select>
            </div>

            {/* ステータス */}
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 dark:bg-gray-700">
              <CheckCircle size={18} className="text-gray-500" />
              <select
                className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-100"
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
              >
                <option value={1}>未着手</option>
                <option value={2}>進行中</option>
                <option value={3}>完了</option>
              </select>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:scale-105 transition-transform"
            >
              <ListPlus size={20} />
              追加
            </button>
          </div>
        </section>

        {/* ==================== タスク一覧 ==================== */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.task_id}
              className="border bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {task.task_title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {task.task_description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    優先度: {task.task_priority} / ステータス: {task.task_status}
                  </p>
                </div>

                <button
                  className="text-red-500 hover:scale-110 transition-transform"
                  onClick={() => removeTask(task.task_id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

