'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type Todo = {
  id: number;
  title: string;
  owner: string;
  done: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);

  function reloadTodos() {
    const storedTodos = localStorage.getItem('todos');
    const parsed: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(parsed);
    const uniqueUsers = Array.from(new Set(parsed.map((t) => t.owner)));
    setUsers(uniqueUsers);
    if (!selectedUser && uniqueUsers.length > 0) {
      setSelectedUser(uniqueUsers[0]);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'owner') router.push('/todo');
    setUser(parsed);

    reloadTodos();
  }, [router]);

  // Автообновление каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      reloadTodos();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredTodos = selectedUser
    ? todos.filter((t) => t.owner === selectedUser)
    : [];

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex">
      <div className="w-60 border-r border-gray-800 p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          Пользователи
        </h2>
        {users.map((u) => (
          <Button
            key={u}
            className={`text-left ${
              selectedUser === u ? 'bg-cyan-500/20' : ''
            }`}
            onClick={() => setSelectedUser(u)}
          >
            {u}
          </Button>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">
          Задания пользователя: {selectedUser || 'Не выбрано'}
        </h1>

        <motion.div layout className="space-y-3">
          {filteredTodos.map((t) => (
            <Card key={t.id} className="bg-[#11161e] border-none p-3">
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.done}
                    disabled
                    className="cursor-pointer w-5 h-5 accent-cyan-500"
                  />
                  <p
                    className={
                      t.done ? 'line-through text-gray-400' : ''
                    }
                  >
                    {t.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTodos.length === 0 && (
            <p className="text-gray-500">
              Нет заданий для этого пользователя
            </p>
          )}
        </motion.div>

        <Button
          className="mt-6 cursor-pointer"
          onClick={() => router.push('/todo')}
        >
          Назад
        </Button>
      </div>
    </div>
  );
}
