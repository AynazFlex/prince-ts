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
    "bg-[#1f050e]! border-2 border-[#881337]! text-rose-200! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(136,19,55,0.3)]! font-mono",

  // Тактические дилеммы
  dilemma:
    "border-slate-600! text-slate-400! bg-slate-950/60! text-left! font-mono text-xs w-[250px]",

  // Эффективные решения (Золото)
  solutionGood:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-mono text-xs w-[250px]",

  // Ошибочные решения (Багровый)
  solutionBad:
    "border-red-600/50! text-red-400! bg-[#3a0505]! font-mono text-xs w-[250px]",

  // Высший закон инженерной обороны
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🧱 ГЛАВА 20. АНАЛИЗ ТАКТИЧЕСКИХ УКРЕПЛЕНИЙ И КРЕПОСТЕЙ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Дилемма 1: Оружие подданных
  {
    id: "d1",
    data: { label: "⚔️ Дилемма 1: Вооружать ли подданных?" },
    position: { x: 40, y: 130 },
    className: nodeClasses.dilemma,
  },
  {
    id: "s1-good",
    data: {
      label:
        "🟢 Своих граждан — ВООРУЖАТЬ\nЭто делает их твоей опорой. Чужие станут твоими воинами, а верные укрепятся в верности.",
    },
    position: { x: 40, y: 220 },
    className: nodeClasses.solutionGood,
  },
  {
    id: "s1-bad",
    data: {
      label:
        "🔴 Новых подданных — РАЗОРУЖАТЬ\nЭто показывает твое недоверие и рождает скрытую обиду, ведущую к бунту.",
    },
    position: { x: 40, y: 310 },
    className: nodeClasses.solutionBad,
  },

  // Дилемма 2: Внутренний раскол
  {
    id: "d2",
    data: {
      label:
        "🎭 Дилемма 2: Стоит ли сеять вражду среди подданных для легкого контроля?",
    },
    position: { x: 390, y: 130 },
    className: nodeClasses.dilemma,
  },
  {
    id: "s2-bad",
    data: {
      label:
        "🔴 Стратегическая ошибка\nРаскол хорош только в мирное время. При наступлении внешнего врага слабая фракция всегда примет его сторону, и город падет.",
    },
    position: { x: 400, y: 240 },
    className: nodeClasses.solutionBad,
  },

  // Дилемма 3: Каменные крепости
  {
    id: "d3",
    data: { label: "🏰 Дилемма 3: Построение каменных крепостей" },
    position: { x: 760, y: 130 },
    className: nodeClasses.dilemma,
  },
  {
    id: "s3-analysis",
    data: {
      label:
        "⚠️ Стены беззащитны без лояльности\nКрепости полезны, если ты боишься внешнего врага. Но если тебя ненавидит собственный народ — никакие стены не спасут, когда враг придет им на помощь.",
    },
    position: { x: 770, y: 220 },
    className: nodeClasses.dilemma,
  },

  // Уровень 4: Финальная максима
  {
    id: "wisdom-20",
    data: {
      label:
        "⚖️ ЗАКОН ИНЖЕНЕРИИ\n«Лучшая из всех крепостей — не быть ненавистным народу. Какими бы прочными ни были твои стены, они не спасут тебя, если ты окружен ненавистью подданных»",
    },
    position: { x: 345, y: 460 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Потоки от старта
  { id: "e-d1", source: "start", target: "d1", style: { stroke: "#475569" } },
  { id: "e-d2", source: "start", target: "d2", style: { stroke: "#475569" } },
  { id: "e-d3", source: "start", target: "d3", style: { stroke: "#475569" } },

  // Связи дилеммы 1
  {
    id: "e-s1g",
    source: "d1",
    target: "s1-good",
    style: { stroke: "#10b981" },
  },
  { id: "e-s1b", source: "d1", target: "s1-bad", style: { stroke: "#ef4444" } },

  // Связи дилеммы 2
  { id: "e-s2b", source: "d2", target: "s2-bad", style: { stroke: "#ef4444" } },

  // Связи дилеммы 3
  {
    id: "e-s3a",
    source: "d3",
    target: "s3-analysis",
    style: { stroke: "#d97706" },
  },

  // Схождение к финальной максиме (Анимированные стрелки)
  {
    id: "e-end-s1",
    source: "s1-good",
    target: "wisdom-20",
    style: { stroke: "#10b981", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-s2",
    source: "s2-bad",
    target: "wisdom-20",
    style: { stroke: "#ef4444", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-s3",
    source: "s3-analysis",
    target: "wisdom-20",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
];

export default function Chapter20() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли анализирует классические инструменты контроля. Ошибочно
        думать, что можно удержать власть, разоружив людей или искусственно
        расколов общество на фракции. Единственная абсолютная и
        неприступная цитадель для любого государя — это отсутствие слепой
        ненависти со стороны его собственного народа.
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesConnectable={false}
        nodesDraggable={true}
      >
        <Background color="#2d0e17" gap={20} size={1} />
        <Controls className="bg-[#16060c] border-[#2d0e17] text-rose-400 fill-rose-400" />
      </ReactFlow>
    </div>
  );
}
