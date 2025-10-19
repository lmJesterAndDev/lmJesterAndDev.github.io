'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Github, Mail, MessageCircle, ArrowLeft, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        'service_8ossko5', 
        'template_b5w7tc1',   
        { message },       
        '5mjlbwaDpMMBPzYAZ'
      );

      setSent(true);
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Не удалось отправить сообщение 😢');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white flex flex-col items-center px-6 py-16">
      {/* Кнопка "Назад" */}
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
        Контакти
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg mb-12 max-w-2xl text-center"
      >
  Если ты хочешь присоединиться к нашему сообществу или сотрудничать — мы всегда открыты для общения! Свяжись с нами любым удобным способом.
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

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 bg-[#11161e] px-6 py-3 rounded-2xl border border-gray-800 hover:border-cyan-500 transition"
        >
          <Mail className="text-cyan-400 w-6 h-6" />
          Email
        </motion.button>
      </div>

      <footer className="mt-24 border-t border-gray-800 w-full max-w-5xl pt-8 text-center">
        <p className="text-gray-400 mb-4">© 2025 PrismArc. Все права защищены.</p>
      </footer>

      {/* Модальне вікно */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#11161e] border border-[#2a2f3a] rounded-2xl p-8 w-full max-w-md text-center relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-semibold mb-4">Отправить сообщение</h2>
              <p className="text-gray-400 text-sm mb-6">
             Письмо будет отправлено на: <span className="text-cyan-400 font-medium">support@prismarc.fun</span>
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 font-medium"
                >
                  ✅ Сообщение успешно отправлено!
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <textarea
                    required
                    rows={5}
                    placeholder="Введите ваше сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-[#0b0e13] border border-gray-700 rounded-xl p-3 text-sm focus:border-cyan-500 outline-none resize-none"
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl py-2 font-medium hover:opacity-90 transition disabled:opacity-50"
                  >
                    {sending ? 'Отправка...' : 'Отправить'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
