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

  // Типы государств (Золотая ветка)
  stateType:
    "border-amber-500/50! text-amber-300! bg-[#241205]! font-bold font-mono",

  // Способы обретения (Багровая ветка)
  method:
    "border-[#881337]/50! text-rose-300! bg-[#1d050f]! text-[11px]! font-mono",

  // Финальная максима
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.2)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Корень всей политической мысли
  {
    id: "root",
    data: { label: "👑 ВСЕ ГОСУДАРСТВА И ИХ ВИДЫ" },
    position: { x: 440, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главная развилка
  {
    id: "rep",
    data: { label: "🏛️ РЕСПУБЛИКИ\n(Управление народными массами)" },
    position: { x: 140, y: 130 },
    className: nodeClasses.stateType,
  },
  {
    id: "prince",
    data: { label: "⚔️ КНЯЖЕСТВА\n(Единоличная власть монарха)" },
    position: { x: 640, y: 130 },
    className: nodeClasses.stateType,
  },

  // Уровень 3: Подтипы княжеств (Разветвление от Княжеств)
  {
    id: "p-hereditary",
    data: {
      label:
        "📜 Наследственные\nВласть давно принадлежит роду государя. Удерживать легче всего.",
    },
    position: { x: 420, y: 240 },
    className: nodeClasses.method,
  },
  {
    id: "p-new",
    data: {
      label:
        "🔥 Новые\nЛибо созданные с нуля, либо присоединенные к наследственным.",
    },
    position: { x: 800, y: 240 },
    className: nodeClasses.method,
  },

  // Уровень 4: Способы обретения новых земель
  {
    id: "m-own",
    data: { label: "🛡️ Своим оружием и доблестью (Virtù)" },
    position: { x: 660, y: 350 },
    className: nodeClasses.method,
  },
  {
    id: "m-foreign",
    data: { label: "💰 Чужим оружием и милостью судьбы (Fortuna)" },
    position: { x: 940, y: 350 },
    className: nodeClasses.method,
  },

  // Уровень 5: Состояние народа до захвата
  {
    id: "peo-free",
    data: { label: "🗽 Привыкли жить свободно" },
    position: { x: 660, y: 440 },
    className: nodeClasses.method,
  },
  {
    id: "peo-ruled",
    data: { label: "👑 Привыкли повиноваться государю" },
    position: { x: 940, y: 440 },
    className: nodeClasses.method,
  },

  // Уровень 6: Аксиома Первой главы
  {
    id: "axiom-1",
    data: {
      label:
        "⚖️ МАКСИМА ВЛАСТИ\n«Новые государства приобретаются либо своим, либо чужим оружием, либо благодаря доблести, либо по милости фортуны»",
    },
    position: { x: 380, y: 540 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Коренное разделение
  {
    id: "e-r-rep",
    source: "root",
    target: "rep",
    style: { stroke: "#475569" },
  },
  {
    id: "e-r-prince",
    source: "root",
    target: "prince",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },

  // Классификация княжеств
  {
    id: "e-p-h",
    source: "prince",
    target: "p-hereditary",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-p-n",
    source: "prince",
    target: "p-new",
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },

  // Как приобретаются новые
  {
    id: "e-n-own",
    source: "p-new",
    target: "m-own",
    style: { stroke: "#b91c1c" },
  },
  {
    id: "e-n-for",
    source: "p-new",
    target: "m-foreign",
    style: { stroke: "#b91c1c" },
  },

  // Привычки людей
  {
    id: "e-m-f",
    source: "m-own",
    target: "peo-free",
    style: { stroke: "#475569" },
  },
  {
    id: "e-m-r",
    source: "m-foreign",
    target: "peo-ruled",
    style: { stroke: "#475569" },
  },

  // Сведение к итоговому правилу
  {
    id: "e-end-1",
    source: "p-hereditary",
    target: "axiom-1",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-2",
    source: "peo-ruled",
    target: "axiom-1",
    style: { stroke: "#b91c1c", strokeDasharray: "4,4" },
  },
];

export default function Chapter1() {
  return (
    <div className="w-full h-full relative">
      {/* Информационная тактическая плашка */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#881337]/30 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          🧭 АНАТОМИЯ ВЛАСТИ:
        </span>
        Макиавелли начинает с четкой классификации политических систем. Основной
        фокус всей книги направлен не на стабильные республики или
        наследственные земли, а на самую опасную и динамичную зону — **новые
        княжества**.
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
