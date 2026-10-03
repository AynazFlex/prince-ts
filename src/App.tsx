import { useState, useEffect, useRef } from "react";
import Chapter1 from "./components/Chapter1";
import Chapter2 from "./components/Chapter2";
import Chapter3 from "./components/Chapter3";

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
  // В последующие дни мы добавим все 26 глав
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
        <div>
          <div className="mb-6 p-2 border-b border-[#881337]/30">
            <h1 className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
              IL PRINCIPE
            </h1>
            <p className="text-[9px] text-[#881337] mt-1 uppercase font-bold tracking-wider">
              Алгоритмы Власти Макиавелли
            </p>
          </div>

          <nav className="space-y-1 overflow-y-auto max-h-[72vh] pr-1">
            <div className="text-[10px] text-amber-500/60 uppercase font-bold px-2 py-1 tracking-wider">
              I. Анатомия земель
            </div>
            {chapters.map((ch) => (
              <button
                key={ch.id}
                disabled={!ch.available}
                onClick={() => {
                  setActiveChapter(ch.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-xs transition-all ${
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
        {activeChapter === 1 && <Chapter1 />}
        {activeChapter === 2 && <Chapter2 />}
        {activeChapter === 3 && <Chapter3 />}
      </main>
    </div>
  );
}
