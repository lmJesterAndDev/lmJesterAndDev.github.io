'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PrismArcSite() {
  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-12">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <img src="/prismarc-logo.png" alt="PrismArc Logo" className="h-14" />
        </motion.div>
      <nav className="flex gap-8 text-lg">
        <Link href="/about" className="hover:text-cyan-400 transition-colors">О нас</Link>
        <Link href="/projects" className="hover:text-cyan-400 transition-colors">Проекты</Link>
        <Link href="/contact" className="hover:text-cyan-400 transition-colors">Контакты</Link>
        <Link href="/team" className="hover:text-cyan-400 transition-colors">Команда</Link>
      </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
          PrismArc — создаём миры Minecraft
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Мы разрабатываем уникальные Minecraft сборки, которые превращают игру в новое приключение.
          Оптимизация, стиль и креатив — наша философия.
        </p>

        <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 transition">
          <a href="https://discord.gg/66eDTSD9jX" target="_blank" rel="noopener noreferrer">
            Присоединиться к Discord
          </a>
        </Button>
      </motion.section>

      {/* Footer */}
      <footer id="contact" className="mt-24 border-t border-gray-800 w-full max-w-5xl pt-8 text-center">
        <p className="text-gray-400 mb-4">© 2025 PrismArc. Все права защищены.</p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/PrismArcTeam" className="text-gray-400 hover:text-white transition"><Github /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><Globe /></a>
        </div>
      </footer>
    </div>
  );
}
