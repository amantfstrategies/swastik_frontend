'use client';
import React from 'react'
import Link from 'next/link';
const AdminSidebar = () => {
    return (
        <aside className="fixed top-0 left-0 w-64 bg-sky-500 text-white h-full p-6 z-20">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul className="space-y-6">
            <li>
              <Link href="/admin/categories">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/products">
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/slides">
                Slides
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  };
export default AdminSidebar
