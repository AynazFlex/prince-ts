import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeClasses = {
  header:
    "bg-[#111827]! border-2 border-[#4b5563]! text-slate-200! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(75,85,99,0.3)]! font-mono",

  // Две формы подготовки государя
  actionBody:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! text-left! font-mono text-xs w-[260px]",
  actionMind:
    "border-amber-500/50! text-amber-300! bg-[#241205]! text-left! font-mono text-xs w-[260px]",

  // Конкретные методы
  method:
    "border-slate-700! text-slate-300! bg-slate-950/60! font-mono text-[11px]! w-[240px]",

  // Риск мирного времени
  danger:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-[11px]! w-[240px]",

  // Финальный закон меча
  law: "border-2 border-slate-500! text-slate-300! font-bold text-center! bg-[#1f2937]! shadow-[0_0_20px_rgba(75,85,99,0.25)]! w-[330px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "⚔️ ГЛАВА 14. ОБЯЗАННОСТИ ГОСУДАРЯ В ВОЕННОМ ДЕОЕ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главный риск мирного времени (Слева)
  {
    id: "n-danger",
    data: {
      label:
        "🚨 ЛОВУШКА МИРНОГО ВРЕМЕНИ\n«Когда государи больше думали о роскоши и удовольствиях, чем о военных упражнениях, они теряли свои государства»",
    },
    position: { x: 40, y: 130 },
    className: nodeClasses.danger,
  },

  // Уровень 2: Две оси постоянной подготовки (Правый веер)
  {
    id: "prep-body",
    data: {
      label:
        "💪 ДЕЛА (Физическая подготовка)\nПостоянное нахождение на учениях, содержание армии в порядке и регулярная охота.",
    },
    position: { x: 450, y: 130 },
    className: nodeClasses.actionBody,
  },
  {
    id: "prep-mind",
    data: {
      label:
        "🧠 УМ (Интеллектуальная подготовка)\nЧтение исторических трудов, разбор действий великих людей, анализ причин их побед и поражений.",
    },
    position: { x: 820, y: 130 },
    className: nodeClasses.actionMind,
  },

  // Уровень 3: Задачи для Оси «Дела» (Под prep-body)
  {
    id: "m-body-1",
    data: {
      label:
        "🗺️ Изучение топографии\nПривыкать к рельефу (горы, долины, болота). Это дает знание своей страны и помогает понимать чужую.",
    },
    position: { x: 450, y: 260 },
    className: nodeClasses.method,
  },

  // Уровень 3: Задачи для Оси «Ум» (Под prep-mind)
  {
    id: "m-mind-1",
    data: {
      label:
        "🏆 Выбор идеала (Подражание)\nАлександр Македонский подражал Ахиллу, Юлий Цезарь — Александру. Найди великого лидера прошлого и следуй его шагам.",
    },
    position: { x: 820, y: 260 },
    className: nodeClasses.method,
  },

  // Уровень 4: Финальный вывод военного блока
  {
    id: "wisdom-14",
    data: {
      label:
        "⚖️ ЗАКОН ПОСТОЯННОЙ ГОТОВНОСТИ\n«Мудрый государь никогда не празднует в мирное время. Он копит силы, чтобы в случае изменения судьбы встретить удар во всеоружии»",
    },
    position: { x: 310, y: 420 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "n-danger",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-s2",
    source: "start",
    target: "prep-body",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-s3",
    source: "start",
    target: "prep-mind",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },

  // Спуски по осям
  {
    id: "e-b1",
    source: "prep-body",
    target: "m-body-1",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-m1",
    source: "prep-mind",
    target: "m-mind-1",
    style: { stroke: "#d97706" },
  },

  // Схождение к финальной максиме (Анимированные лазерные линии)
  {
    id: "e-f-danger",
    source: "n-danger",
    target: "wisdom-14",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-f-body",
    source: "m-body-1",
    target: "wisdom-14",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-f-mind",
    source: "m-mind-1",
    target: "wisdom-14",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
];

export default function Chapter14() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#0f172a]/95 backdrop-blur border border-[#334155] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-300 shadow-2xl">
        <span className="text-slate-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли закрывает военный блок абсолютным правилом: у правителя нет
        права расслабляться. Мирное время — это иллюзия. Охота — это не
        развлечение, а бесплатная топографическая разведка. Чтение истории — это
        не досуг, а ментальная штабная тренировка. Будь готов к войне всегда, и
        тогда Фортуна не застанет тебя врасплох.
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesConnectable={false}
        nodesDraggable={true}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="bg-[#0f172a] border-[#334155] text-slate-400 fill-slate-400" />
      </ReactFlow>
    </div>
  );
}
