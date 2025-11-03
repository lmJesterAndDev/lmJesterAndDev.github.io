'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

type Todo = {
  id: number;
  title: string;
  owner: string;
  done: boolean;
};

export default function TodoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [targetUser, setTargetUser] = useState(''); // для добавления задач другим

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);

    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  function addTodo() {
    if (!newTodo.trim()) return;
    const ownerName =
      user.role === 'owner' && targetUser.trim() ? targetUser : user.username;

    const newTask = {
      id: Date.now(),
      title: newTodo,
      owner: ownerName,
      done: false,
    };
    const updated = [...todos, newTask];
    setTodos(updated);
    setNewTodo('');
    setTargetUser('');
  }

  function toggleDone(id: number) {
    const updated = todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(updated);
  }

  function logout() {
    localStorage.removeItem('user');
    router.push('/login');
  }

  // задачи, которые должен видеть текущий пользователь
  const visibleTodos =
    user?.role === 'owner' ? todos : todos.filter(t => t.owner === user?.username);

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          ToDo-лист {user?.username}
        </h1>
        <Button onClick={logout}>Выйти</Button>
      </div>

      <div className="flex gap-2 mb-4 w-full max-w-xl">
        <Input
          placeholder="Новая задача..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          className="bg-[#11161e] border-none text-white"
        />
        {user?.role === 'owner' && (
          <Input
            placeholder="Кому (логин)"
            value={targetUser}
            onChange={e => setTargetUser(e.target.value)}
            className="bg-[#11161e] border-none text-white w-40"
          />
        )}
        <Button onClick={addTodo}>Добавить</Button>
      </div>

      <motion.div layout className="space-y-3 w-full max-w-xl">
        {visibleTodos.map(t => (
          <Card key={t.id} className="bg-[#11161e] border-none p-3">
            <CardContent className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
                <p className={t.done ? 'line-through text-gray-400' : ''}>
                  {t.title}
                  {user?.role === 'owner' && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({t.owner})
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
