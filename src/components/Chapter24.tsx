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

  // Причины краха
  causeNode:
    "border-red-600/50! text-red-400! bg-[#3a0505]! text-left! font-mono text-xs w-[260px]",

  // Фатальное поведение
  behavior:
    "border-rose-500/60! text-rose-300! bg-[#2d0510]! font-mono text-[11px]! w-[240px]",

  // Финальный закон ответственности
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "📉 ГЛАВА 24. ПОЧЕМУ ГОСУДАРИ ТЕРЯЮТ СВОИ ГОСУДАРСТВА" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: 3 главные причины потери власти (Горизонтальный веер ошибок)
  {
    id: "c1",
    data: {
      label:
        "❌ ПОРОК ВОЙСКА\nОпора на наемные или союзнические силы вместо создания собственной преданной гражданской армии.",
    },
    position: { x: 0, y: 130 },
    className: nodeClasses.causeNode,
  },
  {
    id: "c2",
    data: {
      label:
        "❌ ВРАЖДА С НАРОДОМ\nПотеря лояльности широких народных масс из-за чрезмерных поборов, налогов или притеснений.",
    },
    position: { x: 360, y: 130 },
    className: nodeClasses.causeNode,
  },
  {
    id: "c3",
    data: {
      label:
        "❌ НЕУМЕНИЕ ОБУЗДАТЬ ЗНАТЬ\nНеспособность защитить себя от заговоров и амбиций собственной элиты.",
    },
    position: { x: 720, y: 130 },
    className: nodeClasses.causeNode,
  },

  // Уровень 3: Психологическая ошибка мирного времени (Под центром)
  {
    id: "err-peace",
    data: {
      label:
        "🚨 Ловушка штиля\n«В ведро никто не думает о буре». В сытые, спокойные годы итальянские князья не готовили систему к кризису, надеясь на извечный авось.",
    },
    position: { x: 360, y: 260 },
    className: nodeClasses.behavior,
  },

  // Уровень 3: Позорное перекладывание вины (Справа)
  {
    id: "err-blame",
    data: {
      label:
        "🤦 Позорный финал\nКогда пришла беда, они бежали, обвиняя в своей гибели судьбу (Фортуну) или трусость народа, вместо того чтобы винить собственную беспечность.",
    },
    position: { x: 720, y: 260 },
    className: nodeClasses.behavior,
  },

  // Уровень 4: Финальный закон ответственности лидера
  {
    id: "wisdom-24",
    data: {
      label:
        "⚖️ ЗАКОН ОТВЕТСТВЕННОСТИ\n«Лишь те способы защиты хороши, основательны и надежны, которые зависят от тебя самого и от твоей собственной доблести»",
    },
    position: { x: 200, y: 440 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к причинам
  { id: "e-s1", source: "start", target: "c1", style: { stroke: "#ef4444" } },
  { id: "e-s2", source: "start", target: "c2", style: { stroke: "#ef4444" } },
  { id: "e-s3", source: "start", target: "c3", style: { stroke: "#ef4444" } },

  // Спуск к ошибке мирного времени
  {
    id: "e-c2-p",
    source: "c2",
    target: "err-peace",
    style: { stroke: "#475569" },
  },

  // Спуск к перекладыванию вины
  {
    id: "e-c3-b",
    source: "c3",
    target: "err-blame",
    style: { stroke: "#475569" },
  },

  // Схождение к финалу (Анимированные стрелки краха)
  {
    id: "e-f1",
    source: "c1",
    target: "wisdom-24",
    style: { stroke: "#b91c1c", strokeDasharray: "4,4" },
  },
  {
    id: "e-f2",
    source: "err-peace",
    target: "wisdom-24",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
  {
    id: "e-f3",
    source: "err-blame",
    target: "wisdom-24",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
];

export default function Chapter24() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-red-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли уничтожает оправдания проигравших политиков. Системы рушатся
        не из-за «плохой судьбы» или «плохого народа». Крах — это всегда
        следствие беспечности лидера в мирные годы. Единственная защита, которая
        работает — это твоя собственная доблесть (`Virtù`).
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
