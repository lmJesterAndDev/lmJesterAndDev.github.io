'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

const teamMembers = [
  {
    uuid: 'a4c060f846df42c6a79239c1caef5f05',
    name: 'lmJester',
    role: 'Основатель',
    about: 'Создатель проекта PrismArc. Разрабатывает архитектуру модов и занимается общим видением проекта.',
  },
  {
    name: 'pingvooleni',
    role: 'Гейм-дизайнер',
    about: 'Придумывает уникальные игровые механики и взаимодействия. Стремится сделать игровой процесс захватывающим и увлекательным.',
    avatar: '/a83a1fc5-59eb-4fa9-9cf8-4c40b7ae07aa.png',
  },
  {
    uuid: '34d556454ead401780c19e7d4c3af41e',
    name: 'Ollaadyshek',
    role: 'Гейм-дизайнер',
    about: 'Отвечает за концепты, баланс и игровую механику. Помогает превращать идеи в живой мир.',
  },
  {
    uuid: '948d237462fc47e8b79dc69169947043',
    name: 'Rasandr',
    role: 'Гейм-дизайнер',
    about: 'Прорабатывает квесты и сюжетные линии. Любит продумывать атмосферу и глубину мира.',
  },
  {
    uuid: '86f26c46bb4f4fc48f0595742759b583',
    name: 'SomniaRay',
    role: 'Дизайнер',
    about: 'Создает визуальный стиль проекта — от интерфейсов до текстур. Отвечает за эстетику и узнаваемость.',
  },
  {
    uuid: 'fda918635916404a8f67b403f36d0dc3',
    name: 'SleppYll',
    role: 'Дизайнер',
    about: 'Работает над 3D-моделями и визуальными эффектами. Вдохновляется минимализмом и мягкими цветами.',
  },
  {
    uuid: '7d8985211a524d5c87fc116edd8dc487',
    name: 'Mr_Skittlles',
    role: 'Разработчик',
    about: 'Занимается кодом и реализацией механик. Любит оптимизацию и чистую архитектуру.',
  },
];

export default function TeamPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<typeof teamMembers[number] | null>(null);

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16 relative">
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
            <ul className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {teamMembers.map((member, index) => (
          <motion.li
            key={member.uuid ?? index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setSelected(member)}
            className="flex items-center gap-4 bg-[#11161e] p-4 rounded-xl border border-gray-800 hover:border-purple-500 transition cursor-pointer hover:shadow-[0_0_12px_rgba(165,105,255,0.3)]"
          >
            <img
              src={member.uuid ? `https://crafatar.com/avatars/${member.uuid}?size=64&overlay` : member.avatar}
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
        Список будет увеличиваться — ведь здесь можешь быть ты.
      </p>

      <footer
        id="contact"
        className="mt-24 border-t border-gray-800 w-full max-w-5xl pt-8 text-center"
      >
        <p className="text-gray-400 mb-4">© 2025 PrismArc. Все права защищены.</p>
      </footer>
        <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#11161e] border border-[#2a2f3a] rounded-2xl p-8 max-w-md w-full mx-4 text-center relative"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Закрыть */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 transition"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={
                  selected.uuid
                    ? `https://crafatar.com/avatars/${selected.uuid}?size=128&overlay`
                    : selected.avatar
                }
                alt={selected.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h2 className="text-2xl font-semibold mb-1">{selected.name}</h2>
              <p className="text-purple-400 mb-4">{selected.role}</p>
              <p className="text-gray-300 leading-relaxed">{selected.about}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
