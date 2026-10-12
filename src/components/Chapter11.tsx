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

  // Природа теократии (Фиолетовый)
  dogma:
    "border-purple-500/50! text-purple-300! bg-[#1a0f2e]! text-left! font-mono text-xs w-[260px]",

  // Парадоксы Макиавелли
  paradox:
    "border-slate-600! text-slate-400! bg-slate-950/60! text-left! font-mono text-[11px]! w-[240px]",

  // Исторические факторы усиления (Золото)
  history:
    "border-amber-500/40! text-amber-300! bg-[#241205]! font-mono text-[11px]! w-[250px]",

  // Финальный закон
  law: "border-2 border-purple-600! text-purple-400! font-bold text-center! bg-[#1a0f2e]! shadow-[0_0_20px_rgba(168,85,247,0.25)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "⛪ ГЛАВА 11. ЦЕРКОВНЫЕ ГОСУДАРСТВА (ТЕОКРАТИИ)" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Уникальный статус (Центральный узел)
  {
    id: "core-dogma",
    data: {
      label:
        "🔮 СИЛА РЕЛИГИОЗНЫХ ДОГМ\nПриобретаются доблестью или фортуной, но удерживаются авторитетом древних традиций. Единственные безопасные и счастливые государства.",
    },
    position: { x: 370, y: 120 },
    className: nodeClasses.dogma,
  },

  // Уровень 3: Два главных политических парадокса Макиавелли (Левый блок)
  {
    id: "p1",
    data: {
      label:
        "🛑 Имеют власть, но не защищают ее\n(Ни один внешний враг не решается штурмовать земли, находящиеся под защитой Бога)",
    },
    position: { x: 60, y: 240 },
    className: nodeClasses.paradox,
  },
  {
    id: "p2",
    data: {
      label:
        "🛑 Имеют подданных, но не управляют ими\n(Народ не помышляет о бунте, так как духовный страх сильнее политического)",
    },
    position: { x: 60, y: 330 },
    className: nodeClasses.paradox,
  },

  // Уровень 3: Как Папство стало великой светской силой (Правый блок)
  {
    id: "h1",
    data: {
      label:
        "📜 Фактор Александра VI (Борджиа)\nВпервые показал, чего может добиться Папа с помощью денег и военной силы, расширив владения Церкви.",
    },
    position: { x: 680, y: 230 },
    className: nodeClasses.history,
  },
  {
    id: "h2",
    data: {
      label:
        "📜 Политический триумф\nЦерковь превратилась из духовного института в мощнейшего светского игрока, перед которым трепетал даже король Франции.",
    },
    position: { x: 680, y: 340 },
    className: nodeClasses.history,
  },

  // Уровень 4: Финальный закон первого мета-блока
  {
    id: "wisdom-11",
    data: {
      label:
        "⚖️ МАКСИМА ТЕОКРАТИИ\n«Эти государства создаются Богом и Им поддерживаются, так что рассуждать о них было бы делом дерзким и высокомерным»",
    },
    position: { x: 370, y: 460 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта
  {
    id: "e-s1",
    source: "start",
    target: "core-dogma",
    style: { stroke: "#a855f7", strokeWidth: 1.5 },
  },

  // Ветка парадоксов
  {
    id: "e-p1",
    source: "core-dogma",
    target: "p1",
    style: { stroke: "#475569" },
  },
  { id: "e-p2", source: "p1", target: "p2", style: { stroke: "#475569" } },

  // Ветка истории
  {
    id: "e-h1",
    source: "core-dogma",
    target: "h1",
    style: { stroke: "#d97706" },
  },
  { id: "e-h2", source: "h1", target: "h2", style: { stroke: "#d97706" } },

  // Сведение к финальной максиме (Анимированная фиолетовая стрелка)
  {
    id: "e-end-p",
    source: "p2",
    target: "wisdom-11",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-h",
    source: "h2",
    target: "wisdom-11",
    animated: true,
    style: { stroke: "#a855f7", strokeWidth: 2 },
  },
];

export default function Chapter11() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-purple-400 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли завершает разбор территорий самым стабильным типом власти.
        Теократии стоят вне классических законов политологии: правителю здесь
        прощается любая слабость или отсутствие доблести, так как подданные
        подчиняются не человеку, а священному догмату.
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
