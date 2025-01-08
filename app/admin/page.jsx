"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/admin/login");
    }
  }, []);

  useEffect(() => {
    router.push("/admin/categories");
  }, [router]);
  return null;
}
