'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
      const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16">
      {/* Кнопка "Вернуться назад" */}
    <button
      onClick={() => router.back()}
      className="mb-6 self-start bg-[#0b0e13] hover:shadow-[0_0_10px_2px_rgba(165,105,255,0.5)] text-[#6e3bcf] hover:text-purple-400 w-12 h-12 flex items-center justify-center rounded-full transition duration-200 border border-[#1a1f2e]"
      aria-label="Вернуться назад"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
      >
        О нас
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg leading-relaxed max-w-3xl text-center"
      >
        PrismArc — команда энтузиастов, объединённых любовью к Minecraft и стремлением
        создавать уникальные игровые миры. Мы разрабатываем продуманные модпаки,
        где каждая деталь — от баланса до визуала — создаётся вручную.
        <br /><br />
        Мы ценим качество, стабильность и атмосферу. Наши проекты сочетают
        оптимизацию, эстетику и продуманный геймплей, чтобы подарить игрокам
        по-настоящему новое ощущение от Minecraft.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-gray-400 text-center"
      >
        <p>📍 Основано в 2025 году</p>
        <p>💡 Философия: «Красота — в деталях»</p>
      </motion.div>
    </div>
  );
}
