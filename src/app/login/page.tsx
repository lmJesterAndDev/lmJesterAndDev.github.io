'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type User = {
  username: string;
  password: string;
  role: 'owner' | 'user';
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('users');
    if (!stored) {
      const defaultUsers: User[] = [
        { username: 'admin', password: '1234', role: 'owner' },
        { username: 'user', password: '1234', role: 'user' },
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  function handleLogin() {
    setError('');
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      localStorage.setItem('user', JSON.stringify(found));
      router.push('/todo');
    } else {
      setError('Неверный логин или пароль');
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e13] flex items-center justify-center text-white">
      <Card className="bg-[#11161e] border border-gray-800 p-6 w-[350px]">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">
            Вход
          </h1>

          <Input
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3 bg-[#0b0e13] border-gray-700 text-white"
          />
          <Input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 bg-[#0b0e13] border-gray-700 text-white"
          />

          {error && (
            <p className="text-red-500 mb-3 text-center">{error}</p>
          )}

          <Button className="w-full" onClick={handleLogin}>
            Войти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
