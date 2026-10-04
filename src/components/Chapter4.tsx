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

  // Тип 1: Абсолютный монолит (Золото)
  monolith:
    "border-amber-500/50! text-amber-300! bg-[#241205]! text-left! font-mono text-xs w-[260px]",

  // Тип 2: Феодальная сеть (Багровый)
  feudal:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! text-left! font-mono text-xs w-[260px]",

  // Характеристики штурма и удержания
  tactics:
    "border-slate-700! text-slate-300! bg-slate-950/60! text-left! font-mono text-[11px]! w-[240px]",

  // Итоговая максима
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.2)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "👑 ГЛАВА 4. СТРУКТУРА ВЕРТИКАЛИ ВЛАСТИ" },
    position: { x: 440, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Развилка 1 — Единоличное правление (Левая ветка)
  {
    id: "type-monolith",
    data: {
      label:
        "🔷 АБСОЛЮТНЫЙ МОНОЛИТ\nГосударь + слуги (Турция / Персия Дария). Нет знати с личной властью.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.monolith,
  },

  // Уровень 3: Завоевание и удержание Монолита
  {
    id: "m-capture",
    data: {
      label:
        "⛔ ЗАВОЕВАТЬ: Крайне трудно\nНикто не может предать государя и призвать тебя. Армия сплочена.",
    },
    position: { x: 60, y: 250 },
    className: nodeClasses.tactics,
  },
  {
    id: "m-hold",
    data: {
      label:
        "✅ УДЕРЖАТЬ: Очень легко\nДостаточно уничтожить род правителя. У народа нет новых авторитетов.",
    },
    position: { x: 60, y: 340 },
    className: nodeClasses.tactics,
  },

  // Уровень 2: Развилка 2 — Правление с баронами (Правая ветка)
  {
    id: "type-feudal",
    data: {
      label:
        "🔶 ФЕОДАЛЬНАЯ СЕТЬ\nГосударь + бароны (Франция). Знать имеет свои земли и личных вассалов.",
    },
    position: { x: 640, y: 130 },
    className: nodeClasses.feudal,
  },

  // Уровень 3: Завоевание и удержание Сети
  {
    id: "f-capture",
    data: {
      label:
        "✅ ЗАВОЕВАТЬ: Очень легко\nВсегда можно подкупить недовольного барона, который откроет путь.",
    },
    position: { x: 640, y: 250 },
    className: nodeClasses.tactics,
  },
  {
    id: "f-hold",
    data: {
      label:
        "⛔ УДЕРЖАТЬ: Крайне трудно\nОбиженные и недовольные бароны возглавят новые мятежи на местах.",
    },
    position: { x: 640, y: 340 },
    className: nodeClasses.tactics,
  },

  // Уровень 4: Железный вывод Макиавелли
  {
    id: "wisdom-4",
    data: {
      label:
        "⚖️ ЗАКОН СТРУКТУРЫ\n«Причина удержания власти лежит не в доблести завоевателя, а в характере завоеванного устройства»",
    },
    position: { x: 370, y: 460 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От корня
  {
    id: "e-s1",
    source: "start",
    target: "type-monolith",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "type-feudal",
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },

  // Цепочка Монолита
  {
    id: "e-m1",
    source: "type-monolith",
    target: "m-capture",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-m2",
    source: "m-capture",
    target: "m-hold",
    style: { stroke: "#d97706" },
  },

  // Цепочка Феодалов
  {
    id: "e-f1",
    source: "type-feudal",
    target: "f-capture",
    style: { stroke: "#b91c1c" },
  },
  {
    id: "e-f2",
    source: "f-capture",
    target: "f-hold",
    style: { stroke: "#b91c1c" },
  },

  // Сведение к аксиоме
  {
    id: "e-end-m",
    source: "m-hold",
    target: "wisdom-4",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-end-f",
    source: "f-hold",
    target: "wisdom-4",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
];

export default function Chapter4() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли объясняет политический парадокс. Государство с жесткой
        вертикалью власти (Персия) тяжело сломать, но забрав корону, ты
        получаешь полный покой. Децентрализованное государство (Франция) падает
        от первого удара, но бесконечные внутренние связи знати превратят
        удержание власти в ад.
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
