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

  // Факторы судьбы
  fortune:
    "border-slate-600! text-slate-400! bg-slate-900/60! font-mono text-xs w-[250px]",

  // Быстрый взлет
  rise: "border-amber-500/50! text-amber-300! bg-[#241205]! font-mono text-xs w-[250px]",

  // Кризис и уязвимость
  crisis:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-[11px]! w-[260px]",

  // Главный вывод главы
  law: "border-2 border-red-600! text-red-400! font-bold text-center! bg-[#3a0505]! shadow-[0_0_20px_rgba(220,38,38,0.3)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🎲 ГЛАВА 7. ВЛАСТЬ ЧЕРЕЗ ЧУЖОЕ ОРУЖИЕ И ФОРТУНУ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Суть взлета на удаче
  {
    id: "n-rise",
    data: {
      label:
        "🚀 ЛЕГКИЙ ВЗЛЕТ\nВласть достается без труда благодаря внешним силам, деньгам или случаю.\n➔ Взлететь легко, УДЕРЖАТЬ крайне трудно.",
    },
    position: { x: 370, y: 120 },
    className: nodeClasses.rise,
  },

  // Уровень 3: Две главные уязвимости (Разветвление)
  {
    id: "v-foundation",
    data: {
      label:
        "❌ Отсутствие фундамента\nУ правителя нет преданных лично ему корней в структуре. Всё держится на внешнем благополучии.",
    },
    position: { x: 80, y: 240 },
    className: nodeClasses.crisis,
  },
  {
    id: "v-dependence",
    data: {
      label:
        "❌ Тотальная зависимость\nВласть держится на капризах тех, кто её дал, или на внешних условиях (цены на ресурсы, слабость врагов).",
    },
    position: { x: 660, y: 240 },
    className: nodeClasses.fortune,
  },

  // Уровень 4: Исторический кейс главы (Чезаре Борджиа)
  {
    id: "case-borgia",
    data: {
      label:
        "🎭 ПРИМЕР ЧЕЗАРЕ БОРДЖИА\nСделал всё идеально с точки зрения личной доблести, но его опора (папа Александр VI) умер, а сам Чезаре заболел. Фортуна уничтожила идеальный план.",
    },
    position: { x: 370, y: 360 },
    className: nodeClasses.fortune,
  },

  // Уровень 5: Великая максима о смене ветра
  {
    id: "wisdom-7",
    data: {
      label:
        "⚖️ ЗАКОН СУДЬБЫ\n«Кто не заложил фундамент власти заранее, при великой доблести, может быть, и сумеет сделать это впоследствии, но ценой огромных усилий зодчего и с опасностью для всего здания»",
    },
    position: { x: 345, y: 490 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "n-rise",
    style: { stroke: "#d97706" },
  },

  // Разветвление на риски
  {
    id: "e-r1",
    source: "n-rise",
    target: "v-foundation",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
  {
    id: "e-r2",
    source: "n-rise",
    target: "v-dependence",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Схождение к кейсу Чезаре Борджиа
  {
    id: "e-c1",
    source: "v-foundation",
    target: "case-borgia",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-c2",
    source: "v-dependence",
    target: "case-borgia",
    style: { stroke: "#475569" },
  },

  // Финальный переход к закону (Импульсная стрелка)
  {
    id: "e-final",
    source: "case-borgia",
    target: "wisdom-7",
    animated: true,
    style: { stroke: "#dc2626", strokeWidth: 2 },
  },
];

export default function Chapter7() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-rose-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли предупреждает: стабильность, купленная за счет внешних
        подарков судьбы — это колосс на глиняных ногах. Как только Фортуна
        сменит вектор (изменятся цены, враги поумнеют), здание без внутреннего
        фундамента рухнет под собственным весом.
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
