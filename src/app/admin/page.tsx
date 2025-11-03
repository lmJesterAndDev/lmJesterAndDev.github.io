'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
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
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'owner') {
      router.push('/todo');
      return;
    }
    setUser(parsed);
    loadTodos();
  }, []);

  async function loadTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data) {
      setTodos(data);
      const uniqueUsers = Array.from(new Set(data.map((t) => t.owner)));
      setUsers(uniqueUsers);
      if (uniqueUsers.length > 0 && !selectedUser) setSelectedUser(uniqueUsers[0]);
    }
  }

  async function toggleDone(id: number, current: boolean) {
    const { error } = await supabase
      .from('todos')
      .update({ done: !current })
      .eq('id', id);
    if (!error) loadTodos();
  }

  async function deleteTodo(id: number) {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (!error) loadTodos();
  }

  const filteredTodos = selectedUser
    ? todos.filter((t) => t.owner === selectedUser)
    : [];

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex">
      {/* Боковая панель пользователей */}
      <div className="w-60 border-r border-gray-800 p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Пользователи</h2>
        {users.map((u) => (
          <Button
            key={u}
            className={`justify-start transition-colors ${
              selectedUser === u
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-[#11161e] hover:bg-[#151b25]'
            }`}
            onClick={() => setSelectedUser(u)}
          >
            {u}
          </Button>
        ))}
      </div>

      {/* Основная панель */}
      <div className="flex-1 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">
          Задания: {selectedUser || 'не выбрано'}
        </h1>

        <motion.div layout className="space-y-3">
          {filteredTodos.map((t) => (
            <Card
              key={t.id}
              className={`border-none p-3 transition-all ${
                t.done
                  ? 'bg-[#0e1219] opacity-80'
                  : 'bg-[#11161e] hover:bg-[#141b25]'
              } text-white`}
            >
              <CardContent className="flex justify-between items-center p-0">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleDone(t.id, t.done)}
                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                  />
                  <p
                    className={`text-base ${
                      t.done ? 'line-through text-gray-500' : 'text-gray-100'
                    }`}
                  >
                    {t.title}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => deleteTodo(t.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Удалить
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredTodos.length === 0 && (
            <p className="text-gray-500 text-center">
              Нет заданий для этого пользователя
            </p>
          )}
        </motion.div>

        <div className="pt-6">
          <Button
            className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 transition-colors"
            onClick={() => router.push('/todo')}
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
