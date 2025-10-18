'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const teamMembers = [
  {
    uuid: 'a4c060f846df42c6a79239c1caef5f05',
    name: 'lmJester',
    role: 'Основатель',
  },
  {
    uuid: '34d556454ead401780c19e7d4c3af41e',
    name: 'Ollaadyshek',
    role: 'Гейм-дизайнер',
  },
    {
    uuid: '948d237462fc47e8b79dc69169947043',
    name: 'Rasandr',
    role: 'Гейм-дизайнер',
  },
  {
    uuid: '86f26c46bb4f4fc48f0595742759b583',
    name: 'SomniaRay',
    role: 'Дизайнер',
  },
  {
    uuid: 'fda918635916404a8f67b403f36d0dc3',
    name: 'SleppYll',
    role: 'Дизайнер',
  },
  {
    uuid: '7d8985211a524d5c87fc116edd8dc487',
    name: 'Mr_Skittlles',
    role: 'Разработчик',
  },
];

export default function TeamPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16">
      {/* Назад */}
      <button
        onClick={() => router.back()}
        className="mb-6 self-start bg-[#0b0e13] hover:shadow-[0_0_10px_2px_rgba(165,105,255,0.5)] text-[#6e3bcf] hover:text-purple-400 w-12 h-12 flex items-center justify-center rounded-full transition duration-200 border border-[#1a1f2e]"
        aria-label="Вернуться назад"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text text-center"
      >
        Наша команда
      </motion.h1>

      {/* Список участников */}
      <ul className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {teamMembers.map((member, index) => (
          <motion.li
            key={member.uuid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-4 bg-[#11161e] p-4 rounded-xl border border-gray-800 hover:border-purple-500 transition"
          >
            <img
              src={`https://crafatar.com/avatars/${member.uuid}?size=64&overlay`}
              alt={member.name}
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="text-lg font-medium text-white">{member.name}</p>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          </motion.li>
        ))}
      </ul>
            <p className="mt-16 text-sm text-gray-500 text-center">
        Список будет увеличиватся, ведь здесь можешь быть ты.
      </p>
      <footer id="contact" className="mt-24 border-t border-gray-800 w-full max-w-5xl pt-8 text-center">
        <p className="text-gray-400 mb-4">© 2025 PrismArc. Все права защищены.</p>

      </footer>
    </div>
  );
}
