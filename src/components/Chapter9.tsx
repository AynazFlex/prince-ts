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

  // Две силы в обществе
  peopleForce:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! text-left! font-mono text-xs w-[260px]",
  eliteForce:
    "border-amber-500/50! text-amber-300! bg-[#241205]! text-left! font-mono text-xs w-[260px]",

  // Риски и тактика
  tactic:
    "border-slate-700! text-slate-300! bg-slate-950/60! font-mono text-[11px]! w-[240px]",

  // Финальный закон
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🏛️ ГЛАВА 9. ГРАЖДАНСКОЕ КНЯЖЕСТВО (БАЛАНС СИЛ)" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Две опоры власти (Развилка)
  {
    id: "p-people",
    data: {
      label:
        "👥 ОПОРА НА НАРОД\nНарод ищет защиты от угнетения знати. Его цель честнее, а численность огромна.\n➔ Власть легко удержать.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.peopleForce,
  },
  {
    id: "p-elite",
    data: {
      label:
        "👔 ОПОРА НА ЗНАТЬ (ЭЛИТЫ)\nЗнать хочет властвовать и угнетать народ. Они видят в государе лишь равного себе.\n➔ Власть удержать ТРУДНО.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.eliteForce,
  },

  // Уровень 3: Тактика работы с Народом (Левая ветка)
  {
    id: "act-peo-1",
    data: {
      label:
        "✅ Простота контроля\nНароду достаточно одного: чтобы его не угнетали. Дай им безопасность, и они будут преданы.",
    },
    position: { x: 60, y: 260 },
    className: nodeClasses.tactic,
  },
  {
    id: "act-peo-2",
    data: {
      label:
        "✅ Неуязвимость в кризис\nВ момент войны народ — твоя единственная стена. Если они сыты и защищены, они не предадут.",
    },
    position: { x: 60, y: 350 },
    className: nodeClasses.tactic,
  },

  // Уровень 3: Риски работы со Знатью (Правая ветка)
  {
    id: "act-eli-1",
    data: {
      label:
        "❌ Постоянная угроза заговора\nЗнать амбициозна. Если ты ослабнешь, они не просто бросят тебя, они возглавят восстание.",
    },
    position: { x: 660, y: 260 },
    className: nodeClasses.tactic,
  },
  {
    id: "act-eli-2",
    data: {
      label:
        "🔄 Обязательное правило\nДаже если тебя выдвинула знать, ты обязан немедленно завоевать расположение НАРОДА.",
    },
    position: { x: 660, y: 350 },
    className: nodeClasses.tactic,
  },

  // Уровень 4: Финальное правило устойчивости
  {
    id: "wisdom-9",
    data: {
      label:
        "⚖️ ЗАКОН ЛОЯЛЬНОСТИ\n«Государю необходимо жить в дружбе с народом, иначе в несчастливое время он будет отвергнут»",
    },
    position: { x: 360, y: 470 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к силам
  {
    id: "e-s1",
    source: "start",
    target: "p-people",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "p-elite",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },

  // Потоки левой ветки
  {
    id: "e-pl1",
    source: "p-people",
    target: "act-peo-1",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-pl2",
    source: "act-peo-1",
    target: "act-peo-2",
    style: { stroke: "#10b981" },
  },

  // Потоки правой ветки
  {
    id: "e-el1",
    source: "p-elite",
    target: "act-eli-1",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-el2",
    source: "act-eli-1",
    target: "act-eli-2",
    style: { stroke: "#d97706" },
  },

  // Сведение к итоговому балансу
  {
    id: "e-f-peo",
    source: "act-peo-2",
    target: "wisdom-9",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-f-eli",
    source: "act-eli-2",
    target: "wisdom-9",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
];

export default function Chapter9() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли выводит закон социального баланса. Знать изменчива, корыстна
        и всегда ищет способ сесть на трон сама. Народ же пассивен и хочет лишь
        покоя. Умный правитель всегда опирается на широкие народные массы: их
        лояльность купить дешевле, а защищают они преданнее всего.
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
