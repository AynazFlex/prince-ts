import { useState, useEffect, useRef } from "react";
import { Chapters } from "./components";

interface Chapter {
  id: number;
  title: string;
  section: "anatomy" | "army" | "psychology";
  available: boolean;
}

const chapters: Chapter[] = [
  // Блок 1: Анатомия территорий
  { id: 1, title: "1. Виды государств", section: "anatomy", available: true },
  {
    id: 2,
    title: "2. Наследственные княжества",
    section: "anatomy",
    available: true,
  },
  {
    id: 3,
    title: "3. Смешанные княжества",
    section: "anatomy",
    available: true,
  },
  {
    id: 4,
    title: "4. Структура вертикали (Дарий)",
    section: "anatomy",
    available: true,
  },
  {
    id: 5,
    title: "5. Как управлять свободными городами",
    section: "anatomy",
    available: true,
  },
  {
    id: 6,
    title: "6. Новые княжества (Собственное оружие)",
    section: "anatomy",
    available: true,
  },
  {
    id: 7,
    title: "7. Новые княжества (Чужое оружие)",
    section: "anatomy",
    available: true,
  },
  {
    id: 8,
    title: "8. Новые княжества (Через злодеяния)",
    section: "anatomy",
    available: true,
  },
  {
    id: 9,
    title: "9. Гражданское княжество",
    section: "anatomy",
    available: true,
  },
  {
    id: 10,
    title: "10. Оценка сил государств",
    section: "anatomy",
    available: true,
  },
  {
    id: 11,
    title: "11. Церковные государства",
    section: "anatomy",
    available: true,
  },
  {
    id: 12,
    title: "12. Виды войск и наемники",
    section: "army",
    available: true,
  },
  {
    id: 13,
    title: "13. Союзнические войска",
    section: "army",
    available: true,
  },
  {
    id: 14,
    title: "14. Обязанности в военном деле",
    section: "army",
    available: true,
  },
  {
    id: 15,
    title: "15. За что государей хвалят или порицают",
    section: "psychology",
    available: true,
  },
  {
    id: 16,
    title: "16. О щедрости и бережливости",
    section: "psychology",
    available: true,
  },
  {
    id: 17,
    title: "17. О любви и страхе",
    section: "psychology",
    available: true,
  },
  {
    id: 18,
    title: "18. Как государи должны держать слово",
    section: "psychology",
    available: true,
  },
  {
    id: 19,
    title: "19. Как избегать ненависти и презрения",
    section: "psychology",
    available: true,
  },
  {
    id: 20,
    title: "20. Полезны ли крепости",
    section: "psychology",
    available: true,
  },
  {
    id: 21,
    title: "21. Как поступать, чтобы тебя почитали",
    section: "psychology",
    available: true,
  },
  {
    id: 22,
    title: "22. О советниках государей",
    section: "psychology",
    available: true,
  },
  {
    id: 23,
    title: "23. Как избегать льстецов",
    section: "psychology",
    available: true,
  },
  {
    id: 24,
    title: "24. Почему государи Италии лишились государств",
    section: "psychology",
    available: true,
  },
  {
    id: 25,
    title: "25. Власть Фортуны над людьми",
    section: "psychology",
    available: true,
  },
  {
    id: 26,
    title: "26. Призыв освободить Италию от варваров",
    section: "psychology",
    available: true,
  },
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const asideRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!target) return;
      if (
        asideRef.current &&
        !asideRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [isMenuOpen]);

  return (
    <div className="flex h-dvh w-screen bg-[#0c0205] text-rose-100 overflow-hidden font-mono relative">
      {/* КНОПКА МЕНЮ — СЛЕВА ВВЕРХУ */}
      <button
        ref={menuButtonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden absolute top-4 right-4 z-50 bg-[#16060c]/90 backdrop-blur hover:bg-[#2d0e17] active:bg-[#4c0519] p-1.5 rounded border border-[#881337]/40 text-rose-300 font-bold text-xs uppercase tracking-widest transition-all shadow-2xl"
      >
        {isMenuOpen ? "✕ Скрыть" : "☰ Меню"}
      </button>

      {/* АДАПТИВНЫЙ САЙДБАР */}
      <aside
        ref={asideRef}
        className={`
          fixed md:static inset-y-0 left-0 w-72 bg-[#110308] border-r border-[#2d0e17] flex flex-col justify-between p-4 pt-16 md:pt-4 z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Изменили обертку на flex-колонку, чтобы nav занимал всю оставшуюся высоту */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Заголовок дашборда */}
          <div className="mb-4 p-2 border-b border-[#881337]/30 shrink-0">
            <h1 className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
              IL PRINCIPE
            </h1>
            <p className="text-[9px] text-[#881337] mt-1 uppercase font-bold tracking-wider">
              Алгоритмы Власти Макиавелли
            </p>
          </div>

          {/* НАВИГАЦИЯ: Теперь flex-1 забирает всё свободное место, а overflow-y-auto дает красивый плавный скролл */}
          <nav className="flex-1 overflow-y-auto space-y-1 pr-1 pb-4 custom-scrollbar">
            {/* БЛОК I */}
            <div className="text-[10px] text-amber-500/60 uppercase font-bold px-2 py-1 tracking-wider mb-1">
              I. Анатомия земель (1-11)
            </div>
            {chapters
              .filter((ch) => ch.section === "anatomy")
              .map((ch) => (
                <button
                  key={ch.id}
                  disabled={!ch.available}
                  onClick={() => {
                    setActiveChapter(ch.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-all mb-0.5 ${
                    activeChapter === ch.id
                      ? "bg-[#4c0519]/30 text-rose-400 border border-[#881337]/50 shadow-[0_0_15px_rgba(136,19,55,0.2)] font-bold"
                      : ch.available
                        ? "text-slate-400 hover:bg-[#16060c] hover:text-slate-200"
                        : "text-slate-700 cursor-not-allowed opacity-20"
                  }`}
                >
                  {ch.title}
                </button>
              ))}

            {/* БЛОК II */}
            <div className="text-[10px] text-sky-500/60 uppercase font-bold px-2 py-1 tracking-wider mt-4 mb-1">
              II. Архитектура меча (12-14)
            </div>
            {chapters
              .filter((ch) => ch.section === "army")
              .map((ch) => (
                <button
                  key={ch.id}
                  disabled={!ch.available}
                  onClick={() => {
                    setActiveChapter(ch.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-all mb-0.5 ${
                    activeChapter === ch.id
                      ? "bg-[#4c0519]/30 text-rose-400 border border-[#881337]/50 shadow-[0_0_15px_rgba(136,19,55,0.2)] font-bold"
                      : ch.available
                        ? "text-slate-400 hover:bg-[#16060c] hover:text-slate-200"
                        : "text-slate-700 cursor-not-allowed opacity-20"
                  }`}
                >
                  {ch.title}
                </button>
              ))}

            {/* БЛОК III — ДОБАВИЛИ ФИЛЬТРАЦИЮ ДЛЯ ПСИХОЛОГИИ И ГЛАВЫ 15 */}
            <div className="text-[10px] text-rose-500/60 uppercase font-bold px-2 py-1 tracking-wider mt-4 mb-1">
              III. Маска Льва и Лисицы (15-26)
            </div>
            {chapters
              .filter((ch) => ch.section === "psychology")
              .map((ch) => (
                <button
                  key={ch.id}
                  disabled={!ch.available}
                  onClick={() => {
                    setActiveChapter(ch.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-all mb-0.5 ${
                    activeChapter === ch.id
                      ? "bg-[#4c0519]/30 text-rose-400 border border-[#881337]/50 shadow-[0_0_15px_rgba(136,19,55,0.2)] font-bold"
                      : ch.available
                        ? "text-slate-400 hover:bg-[#16060c] hover:text-slate-200"
                        : "text-slate-700 cursor-not-allowed opacity-20"
                  }`}
                >
                  {ch.title}
                </button>
              ))}
          </nav>
        </div>

        <div className="text-[9px] text-[#4c0519] text-center border-t border-[#16060c] pt-4 tracking-widest font-bold">
          PRINCE-TS V1.0 • 26 DAYS
        </div>
      </aside>

      {/* ХОЛСТ СХЕМ */}
      <main className="flex-1 h-full bg-[#090204] relative w-full">
        {activeChapter === 1 && Chapters.chapter1}
        {activeChapter === 2 && Chapters.chapter2}
        {activeChapter === 3 && Chapters.chapter3}
        {activeChapter === 4 && Chapters.chapter4}
        {activeChapter === 5 && Chapters.chapter5}
        {activeChapter === 6 && Chapters.chapter6}
        {activeChapter === 7 && Chapters.chapter7}
        {activeChapter === 8 && Chapters.chapter8}
        {activeChapter === 9 && Chapters.chapter9}
        {activeChapter === 10 && Chapters.chapter10}
        {activeChapter === 11 && Chapters.chapter11}
        {activeChapter === 12 && Chapters.chapter12}
        {activeChapter === 13 && Chapters.chapter13}
        {activeChapter === 14 && Chapters.chapter14}
        {activeChapter === 15 && Chapters.chapter15}
        {activeChapter === 16 && Chapters.chapter16}
        {activeChapter === 17 && Chapters.chapter17}
        {activeChapter === 18 && Chapters.chapter18}
        {activeChapter === 19 && Chapters.chapter19}
        {activeChapter === 20 && Chapters.chapter20}
        {activeChapter === 21 && Chapters.chapter21}
        {activeChapter === 22 && Chapters.chapter22}
        {activeChapter === 23 && Chapters.chapter23}
        {activeChapter === 24 && Chapters.chapter24}
        {activeChapter === 25 && Chapters.chapter25}
        {activeChapter === 26 && Chapters.chapter26}
        {activeChapter > 26 && (
          <div className="flex items-center justify-center h-full text-[#4c0519] text-xs tracking-widest uppercase font-bold">
            Ожидание анализа следующего шага власти...
          </div>
        )}
      </main>
    </div>
  );
}
