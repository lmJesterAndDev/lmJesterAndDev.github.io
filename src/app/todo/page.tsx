'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Todo = {
  id: number;
  title: string;
  owner: string;
  done: boolean;
};

export default function TodoPage() {
  const [user, setUser] = useState<any>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [targetUser, setTargetUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) loadTodos();
  }, [user]);

  async function loadTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true });
    if (!error && data) setTodos(data);
  }

  async function addTodo() {
    if (!newTodo.trim()) return;
    const ownerName =
      user.role === 'owner' && targetUser
        ? targetUser
        : user.username;

    const { error } = await supabase
      .from('todos')
      .insert({ title: newTodo, owner: ownerName });
    if (!error) {
      setNewTodo('');
      setTargetUser('');
      loadTodos();
    }
  }

  async function toggleDone(id: number, current: boolean) {
    const { error } = await supabase
      .from('todos')
      .update({ done: !current })
      .eq('id', id);
    if (!error) loadTodos();
  }

  const visibleTodos =
    user?.role === 'owner'
      ? todos
      : todos.filter((t) => t.owner === user.username);

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        ToDo-лист {user?.username}
      </h1>

      {/* Панель добавления задач */}
      <div className="flex gap-2 mb-4 w-full max-w-xl">
        <Input
          placeholder="Новая задача..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="bg-[#11161e] border-none text-white placeholder-gray-400"
        />
        {user?.role === 'owner' && (
          <Input
            placeholder="Кому (логин)"
            value={targetUser}
            onChange={(e) => setTargetUser(e.target.value)}
            className="bg-[#11161e] border-none text-white placeholder-gray-400 w-40"
          />
        )}
        <Button
          onClick={addTodo}
          className="bg-cyan-500 hover:bg-cyan-600 transition-colors"
        >
          Добавить
        </Button>
      </div>

      {/* Список задач */}
      <div className="space-y-3 w-full max-w-xl">
        {visibleTodos.map((t) => (
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
                    t.done
                      ? 'line-through text-gray-500'
                      : 'text-gray-100'
                  }`}
                >
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

        {visibleTodos.length === 0 && (
          <p className="text-gray-500 text-center">
            Пока нет задач
          </p>
        )}
      </div>
    </div>
  );
}
