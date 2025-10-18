'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
    const router = useRouter();
  return  (
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
        Контакты
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg mb-12 max-w-2xl text-center"
      >
        Если ты хочешь присоединиться к нашему сообществу или сотрудничать — мы всегда открыты
        для общения! Свяжись с нами любым удобным способом.
      </motion.p>

      <div className="flex flex-col sm:flex-row justify-center gap-8">
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="https://discord.gg/66eDTSD9jX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#11161e] px-6 py-3 rounded-2xl border border-gray-800 hover:border-cyan-500 transition"
        >
          <MessageCircle className="text-cyan-400 w-6 h-6" />
          Discord
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1 }}
          href="https://github.com/PrismArcTeam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#11161e] px-6 py-3 rounded-2xl border border-gray-800 hover:border-cyan-500 transition"
        >
          <Github className="text-cyan-400 w-6 h-6" />
          GitHub
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1 }}
          href="mailto:prismarc.team@gmail.com"
          className="flex items-center gap-3 bg-[#11161e] px-6 py-3 rounded-2xl border border-gray-800 hover:border-cyan-500 transition"
        >
          <Mail className="text-cyan-400 w-6 h-6" />
          Email
        </motion.a>
      </div>
            <footer id="contact" className="mt-24 border-t border-gray-800 w-full max-w-5xl pt-8 text-center">
        <p className="text-gray-400 mb-4">© 2025 PrismArc. Все права защищены.</p>
      </footer>
    </div>
  );
}
