'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/todo');
    } else {
      setError('Неверный логин или пароль');
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e13] flex items-center justify-center text-white">
      <Card className="bg-[#11161e] border border-gray-800 p-6 w-[350px]">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">Вход</h1>

          <Input
            placeholder="Логин"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mb-3 bg-[#0b0e13] border-gray-700 text-white"
          />
          <Input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mb-4 bg-[#0b0e13] border-gray-700 text-white"
          />

          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

          <Button className="w-full" onClick={handleLogin}>Войти</Button>
        </CardContent>
      </Card>
    </div>
  );
}
