'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();

  const projects = [
    {
      title: 'TMR',
      desc: 'Магически-Технологическая RPG сборка с кастомными модами, сюжетными линиями и прогрессией.',
    },
    {
      title: 'TMR',
      desc: 'Магически-Технологическая RPG сборка с кастомными модами, сюжетными линиями и прогрессией.',
    },
    {
      title: 'TMR',
      desc: 'Магически-Технологическая RPG сборка с кастомными модами, сюжетными линиями и прогрессией.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16">
      {/* Кнопка "Вернуться" */}
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
        className="text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
      >
        Наши проекты
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="bg-[#11161e] border-none shadow-lg hover:shadow-cyan-700/20 transition">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-3">{proj.title}</h3>
                <p className="text-gray-400">{proj.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
