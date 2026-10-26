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

  // Две силы
  fortuneStream:
    "border-sky-500/50! text-sky-300! bg-[#0c1a24]! text-left! font-mono text-xs w-[260px]",
  virtuDam:
    "border-amber-500/60! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[260px]",

  // Два стиля управления
  cautionStyle:
    "border-slate-700! text-slate-400! bg-slate-950/60! font-mono text-xs w-[240px]",
  audacityStyle:
    "border-orange-500/50! text-orange-400! bg-[#2c1d05]! font-bold font-mono text-xs w-[240px]",

  // Финальный закон воли
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🎲 ГЛАВА 25. БИТВА ВОЛИ (VIRTU) И СУДЬБЫ (FORTUNA)" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Великий баланс 50/50 (Развилка)
  {
    id: "n-fortune",
    data: {
      label:
        "🌊 ФОРТУНА КАК БУРНАЯ РЕКА\nУправляет половиной дел. Если она беснуется, никто не может остановить её поток в лоб.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.fortuneStream,
  },
  {
    id: "n-virtu",
    data: {
      label:
        "🧱 ДОБЛЕСТЬ КАК СИСТЕМА ДАМБ\nВторая половина подконтрольна нам. В мирное время возводи плотины и каналы, чтобы укротить реку.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.virtuDam,
  },

  // Уровень 3: Два типа поведения лидеров перед лицом судьбы
  {
    id: "style-caution",
    data: {
      label:
        "❄️ ОСТОРОЖНОСТЬ и выжидание\nДействуют медленно, взвешивая каждый шаг. Если времена требуют натиска, осторожные лидеры гибнут.",
    },
    position: { x: 60, y: 260 },
    className: nodeClasses.cautionStyle,
  },
  {
    id: "style-audacity",
    data: {
      label:
        "🔥 НАТИСК и отвага\nДействуют стремительно, агрессивно и дерзко. Ломают обстоятельства под себя.",
    },
    position: { x: 660, y: 260 },
    className: nodeClasses.audacityStyle,
  },

  // Уровень 4: Психологический вердикт Макиавелли
  {
    id: "audacity-win",
    data: {
      label:
        "⚡️ Фортуна любит наглых\nОна — женщина, друг молодых и дерзких. Холодное выжидание злит её, а яростный напор заставляет подчиниться.",
    },
    position: { x: 660, y: 360 },
    className: nodeClasses.audacityStyle,
  },

  // Уровень 5: Высшая максима всей философии книги
  {
    id: "wisdom-25",
    data: {
      label:
        "⚖️ ЗАКОН ФОРТУНЫ\n«Я считаю, что натиск лучше осторожности, ибо фортуна — женщина, и чтобы удержать её, необходимо бить её и пинать»",
    },
    position: { x: 330, y: 480 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Разделение от старта
  {
    id: "e-s1",
    source: "start",
    target: "n-fortune",
    style: { stroke: "#3b82f6", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-virtu",
    style: { stroke: "#d97706", strokeWidth: 2 },
  },

  // Спуски к стилям
  {
    id: "e-c1",
    source: "n-fortune",
    target: "style-caution",
    style: { stroke: "#475569" },
  },
  {
    id: "e-a1",
    source: "n-virtu",
    target: "style-audacity",
    style: { stroke: "#d97706" },
  },

  // Прорыв к победе через натиск
  {
    id: "e-a2",
    source: "style-audacity",
    target: "audacity-win",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
  },

  // Схождение к финалу
  {
    id: "e-end-c",
    source: "style-caution",
    target: "wisdom-25",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-a",
    source: "audacity-win",
    target: "wisdom-25",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
  },
];

export default function Chapter25() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли уничтожает фатализм. Судьба слепа и жестока, но она забирает
        власть только у тех, кто не построил оборонительные дамбы (армию и
        институты) в мирные годы. Когда кризис уже начался, побеждает тот, кто
        атакует стихию с дерзким и яростным натиском, а не ждет у моря погоды.
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
