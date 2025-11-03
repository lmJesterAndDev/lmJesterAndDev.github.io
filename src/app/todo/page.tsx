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
  const [targetUser, setTargetUser] = useState('');

  // Загрузка пользователя и задач
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
  }, [router]);

  // Синхронизация задач с localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Добавление новой задачи
  function addTodo() {
    if (!newTodo.trim()) return;

    // Если админ пишет логин — задача пойдёт тому пользователю
    // Если нет — себе
    const ownerName =
      user.role === 'owner' && targetUser.trim()
        ? targetUser.trim()
        : user.username;

    const newTask: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      owner: ownerName,
      done: false,
    };

    // Добавляем в список
    const updated = [...todos, newTask];
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated)); // 👈 важно
    setNewTodo('');
    setTargetUser('');
  }

  function toggleDone(id: number) {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated)); // 👈 важно
  }

  function logout() {
    localStorage.removeItem('user');
    router.push('/login');
  }

  // обновляем список каждые 2 секунды — чтобы admin видел изменения
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('todos');
      if (stored) setTodos(JSON.parse(stored));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // какие задачи видим
  const visibleTodos =
    user?.role === 'owner'
      ? todos
      : todos.filter((t) => t.owner === user?.username);

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
          onChange={(e) => setNewTodo(e.target.value)}
          className="bg-[#11161e] border-none text-white"
        />
        {user?.role === 'owner' && (
          <Input
            placeholder="Кому (логин)"
            value={targetUser}
            onChange={(e) => setTargetUser(e.target.value)}
            className="bg-[#11161e] border-none text-white w-40"
          />
        )}
        <Button onClick={addTodo}>Добавить</Button>
      </div>

      {user?.role === 'owner' && (
        <Button
          className="mb-6 bg-cyan-700/30"
          onClick={() => router.push('/admin')}
        >
          Панель администратора
        </Button>
      )}

      <motion.div layout className="space-y-3 w-full max-w-xl">
        {visibleTodos.map((t) => (
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
