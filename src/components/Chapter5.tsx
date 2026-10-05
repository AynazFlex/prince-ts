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

  // Природа свободных людей
  nature:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! text-left! font-mono text-xs w-[280px]",

  // Три пути Макиавелли
  pathDestruction:
    "border-red-600! text-red-400! bg-[#3a0505]! shadow-[0_0_15px_rgba(220,38,38,0.2)]! font-bold font-mono text-xs w-[220px]",
  pathReside:
    "border-amber-500/50! text-amber-300! bg-[#241205]! font-mono text-xs w-[220px]",
  pathOligarchy:
    "border-slate-600! text-slate-400! bg-slate-900/60! font-mono text-xs w-[220px]",

  // Итоговый закон
  law: "border-2 border-red-600! text-red-400! font-bold text-center! bg-[#3a0505]! shadow-[0_0_20px_rgba(220,38,38,0.3)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🗽 ГЛАВА 5. УПРАВЛЕНИЕ СВОБОДНЫМИ ГОСУДАРСТВАМИ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главный фактор риска (Психология республик)
  {
    id: "republic-nature",
    data: {
      label:
        "🌋 ПАМЯТЬ О СВОБОДЕ\n«В республиках больше жизни, больше ненависти, сильнее жажда мести; память о былой свободе не дает и не может дать им покоя»",
    },
    position: { x: 340, y: 120 },
    className: nodeClasses.nature,
  },

  // Уровень 3: Три пути удержания завоеванного (Горизонтальный веер)
  {
    id: "p1",
    data: {
      label:
        "💥 ПУТЬ 1. РАЗРУШИТЬ\nРазорить город, ликвидировать его институты. Самый надежный способ.",
    },
    position: { x: 40, y: 260 },
    className: nodeClasses.pathDestruction,
  },
  {
    id: "p2",
    data: {
      label:
        "🏠 ПУТЬ 2. ПЕРЕСЕЛИТЬСЯ\nЖить там самому, чтобы лично контролировать порядок на месте.",
    },
    position: { x: 400, y: 260 },
    className: nodeClasses.pathReside,
  },
  {
    id: "p3",
    data: {
      label:
        "🤝 ПУТЬ 3. СОЗДАТЬ ОЛИГАРХИЮ\nПредоставить жить по старым законам, но поставить у власти лояльное меньшинство.",
    },
    position: { x: 760, y: 260 },
    className: nodeClasses.pathOligarchy,
  },

  // Уровень 4: Анализ уязвимости 3-го пути
  {
    id: "oligarchy-risk",
    data: {
      label:
        "⚠️ Хрупкость олигархии: марионеточное правительство держится только на силе и авторитете завоевателя.",
    },
    position: { x: 660, y: 380 },
    className:
      "border-slate-700! text-slate-400! bg-slate-950/40! font-mono text-[11px]! w-[220px]",
  },

  // Уровень 5: Бескомпромиссная максима Макиавелли
  {
    id: "wisdom-5",
    data: {
      label:
        "⚖️ ЗАКОН РЕСПУБЛИК\n«Кто захватит город, с давних пор пользующийся свободой, и пощадит его, пусть ждет своей гибели»",
    },
    position: { x: 300, y: 490 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к психологии
  {
    id: "e-s1",
    source: "start",
    target: "republic-nature",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Разветвление на 3 стратегии
  {
    id: "e-p1",
    source: "republic-nature",
    target: "p1",
    animated: true,
    style: { stroke: "#dc2626", strokeWidth: 2 },
  },
  {
    id: "e-p2",
    source: "republic-nature",
    target: "p2",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-p3",
    source: "republic-nature",
    target: "p3",
    style: { stroke: "#475569" },
  },

  // Внутренняя связь 3-го пути
  {
    id: "e-oli",
    source: "p3",
    target: "oligarchy-risk",
    style: { stroke: "#475569", strokeDasharray: "3,3" },
  },

  // Сведение к финальной максиме
  {
    id: "e-f1",
    source: "p1",
    target: "wisdom-5",
    style: { stroke: "#dc2626", strokeWidth: 1.5 },
  },
  {
    id: "e-f2",
    source: "p2",
    target: "wisdom-5",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-f3",
    source: "oligarchy-risk",
    target: "wisdom-5",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
];

export default function Chapter5() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-red-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Если завоеванные люди привыкли к монарху, их легко подчинить, уничтожив
        старый род. Но если они знали свободу, у тебя нет компромиссов.
        Свободный город либо уничтожит тебя своей памятью о вольности, либо ты
        должен полностью разрушить его структуру, чтобы выжить.
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
