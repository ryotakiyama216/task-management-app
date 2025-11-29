"use client";

import { useState, useEffect } from "react";
import { Project } from "@/src/types/project";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

console.log("API", API_BASE)

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  // -----------------------
  // プロジェクト一覧取得
  // -----------------------
  const fetchProjects = async () => {
    try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/projects`);
        const data = await res.json();
        setProjects(data);
    } catch (error) {
        console.error("プロジェクト取得エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  // 初回ロード
  useEffect(() => {
    fetchProjects();
  }, []);

  // -----------------------
  // プロジェクト登録
  // -----------------------
  const addProject = async (
    pjName: string, pjDetail: string, pjDeadline: string, pjPriority: number, pjStatus: number
  ) => {
    const newProject: Project = {
        project_id: crypto.randomUUID(),
        project_name: pjName,
        project_description: pjDetail,
        project_deadline: pjDeadline,
        project_priority: pjPriority,
        project_status: pjStatus,
    };

    try {
        const res = await fetch(`${API_BASE}/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProject),
        });

        console.log(res)

        if (!res.ok) throw new Error("APIエラー: プロジェクト追加失敗");

        setProjects((prev) => [...prev, newProject]);
    } catch (err) {
        console.error(err);
    }
  };

  // ---------------------------
  // 📌 プロジェクト削除 (DELETE /projects/{id})
  // ---------------------------
  const removeProject = async (id: string) => {
    // try {
    //   const res = await fetch(`${API_BASE}/tasks/${id}`, {
    //     method: "DELETE",
    //   });

    //   if (!res.ok) throw new Error("削除できませんでした");

    //   setTasks((prev) => prev.filter((task) => task.id !== id));
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return { projects, loading, addProject, removeProject };
};
