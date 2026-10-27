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

  // Компоненты финального штурма
  crisis:
    "border-red-600/50! text-red-400! bg-[#3a0505]! font-mono text-xs w-[250px]",
  action:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-bold font-mono text-xs w-[250px]",
  foundation:
    "border-amber-500/50! text-amber-300! bg-[#241205]! font-mono text-xs w-[250px]",

  // Абсолютный финал книги
  law: "border-2 border-amber-500! text-amber-300! font-black text-center! bg-[#2d1505]! shadow-[0_0_30px_rgba(217,119,6,0.4)]! w-[360px] font-mono tracking-wide text-sm!",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🇮🇹 ГЛАВА 26. ФИНАЛЬНЫЙ ПРИЗЫВ К ОБЪЕДИНЕНИЮ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Условия для великого исхода (Развилка)
  {
    id: "n-crisis",
    data: {
      label:
        "🌋 ИДЕАЛЬНЫЙ УПАДОК\nИталия разграблена, опустошена и порабощена. Макиавелли видит в этом высший шанс: чтобы проявилась доблесть лидера, страна должна была дойти до крайности.",
    },
    position: { x: 40, y: 130 },
    className: nodeClasses.crisis,
  },
  {
    id: "n-action",
    data: {
      label:
        "🔱 МАНФЕСТ VIRТÙ (ДОБЛЕСТИ)\nБог не хочет делать всё за нас, чтобы не лишать нас свободной воли и заслуженной славы. Лидер обязан действовать сам.",
    },
    position: { x: 800, y: 130 },
    className: nodeClasses.action,
  },

  // Уровень 3: Фундамент победы (Центр)
  {
    id: "core-army",
    data: {
      label:
        "⚔️ НОВАЯ НАЦИОНАЛЬНАЯ АРМИЯ\nПервое и главное дело: создать собственное гражданское войско. Новая тактика и личная преданность солдат сокрушат швейцарскую пехоту и испанскую конницу.",
    },
    position: { x: 420, y: 250 },
    className: nodeClasses.foundation,
  },

  // Уровень 4: Абсолютный финал всей книги «Государь»
  {
    id: "absolute-final",
    data: {
      label:
        "👑 ПОБЕДА СИЛЫ И РАЗУМА\n«Доблесть грудью встретит вражий натиск, и короток будет бой, ибо древняя отвага еще не умерла в итальянских сердцах!»",
    },
    position: { x: 370, y: 390 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Потоки от старта
  {
    id: "e-s1",
    source: "start",
    target: "n-crisis",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-action",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },

  // Схождение к ядру (Армии)
  {
    id: "e-c-core",
    source: "n-crisis",
    target: "core-army",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-a-core",
    source: "n-action",
    target: "core-army",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },

  // Финальный триумфальный импульс
  {
    id: "e-triumph",
    source: "core-army",
    target: "absolute-final",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 2.5 },
  },
];

export default function Chapter26() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          👑 МАНИФЕСТ ВЛАСТИ:
        </span>
        Макиавелли закрывает трактат не сухой инструкцией, а мощным
        патриотическим аккордом. Вся предыдущая геометрия, психология обмана,
        маски Льва и Лисицы, укрощение Фортуны и правила создания армии были
        написаны ради одной высшей цели — построения сильного, суверенного и
        единого Государства, способного защитить себя само.
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
