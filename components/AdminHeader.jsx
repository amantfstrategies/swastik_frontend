'use client';
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { removeAuthorizationHeader } from '@/utils/axiosInstance';
const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      removeAuthorizationHeader();
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-sky-500 p-4 shadow-md z-10">
      <div className='flex w-full'>
      <button onClick={handleLogout} className="hover:text-gray-400 ml-auto">
        Logout
      </button>
      </div>
    

    </header>
  );
};
export default AdminHeader
