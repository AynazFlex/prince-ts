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
    "bg-[#111827]! border-2 border-[#4b5563]! text-slate-200! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(75,85,99,0.3)]! font-mono",

  // Классификация войск
  armyType:
    "border-slate-500/50! text-slate-300! bg-[#1f2937]! text-left! font-mono text-xs w-[250px]",

  // Зона наемников (Янтарный риск)
  mercenaryRisk:
    "border-amber-500/60! text-amber-400! bg-[#241a05]! shadow-[0_0_12px_rgba(245,158,11,0.15)]! text-left! font-mono text-xs w-[270px]",

  // Характеристики пороков
  vice: "border-rose-600/40! text-rose-400! bg-[#2d0510]! font-mono text-[11px]! w-[240px]",

  // Итоговый закон меча
  law: "border-2 border-slate-500! text-slate-300! font-bold text-center! bg-[#1f2937]! shadow-[0_0_20px_rgba(75,85,99,0.25)]! w-[330px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "⚔️ ГЛАВА 12. ВИДЫ ВОЙСК И НАЕМНЫЕ СОЛДАТЫ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: 4 вида войск по Макиавелли (Горизонтальный веер)
  {
    id: "t-own",
    data: {
      label:
        "🟢 Собственные\n(Граждане государства. Единственная надежная опора)",
    },
    position: { x: 40, y: 130 },
    className: nodeClasses.armyType,
  },
  {
    id: "t-merc",
    data: {
      label: "🟡 Наемные\n(Чужаки за деньги. Бесполезны и опасны для системы)",
    },
    position: { x: 400, y: 130 },
    className: nodeClasses.mercenaryRisk,
  },
  {
    id: "t-aux",
    data: {
      label:
        "🔴 Союзнические\n(Войска чужого государя, призванные на помощь. Разберем в гл. 13)",
    },
    position: { x: 760, y: 130 },
    className: nodeClasses.armyType,
  },
  {
    id: "t-mixed",
    data: { label: "🔵 Смешанные\n(Комбинация своих и наемных/союзнических)" },
    position: { x: 1120, y: 130 },
    className: nodeClasses.armyType,
  },

  // Уровень 3: Анатомия пороков наемников (Ветвление от t-merc)
  {
    id: "m-vice-1",
    data: {
      label:
        "❌ В мирное время грабят тебя (калят казну), в военное время — бегут от врага (подставляют фронт).",
    },
    position: { x: 310, y: 250 },
    className: nodeClasses.vice,
  },
  {
    id: "m-vice-2",
    data: {
      label:
        "❌ У них нет иной мотивации, кроме скудного жалованья, которого мало, чтобы заставить их умирать за тебя.",
    },
    position: { x: 310, y: 340 },
    className: nodeClasses.vice,
  },

  // Уровень 4: Два типа наемных капитанов (Развилка)
  {
    id: "capt-good",
    data: {
      label:
        "🥷 Капитан талантлив ➔ ОПАСНОСТЬ\nОн начнет искать славы для себя и свергнет тебя (или потребует больше денег).",
    },
    position: { x: 60, y: 440 },
    className: nodeClasses.mercenaryRisk,
  },
  {
    id: "capt-bad",
    data: {
      label:
        "🥷 Капитан бездарен ➔ КРАХ\nОн проиграет первое же серьезное сражение и погубит твое государство.",
    },
    position: { x: 560, y: 440 },
    className: nodeClasses.mercenaryRisk,
  },

  // Уровень 5: Железный итог главы
  {
    id: "wisdom-12",
    data: {
      label:
        "⚖️ ЗАКОН ОБОРОНЫ\n«Нынешний позор и раззорение Италии вызваны единственно тем, что она долгие годы полагалась на наемное воинство»",
    },
    position: { x: 310, y: 560 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта
  {
    id: "e-s1",
    source: "start",
    target: "t-own",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "t-merc",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "e-s3",
    source: "start",
    target: "t-aux",
    style: { stroke: "#4b5563" },
  },
  {
    id: "e-s4",
    source: "start",
    target: "t-mixed",
    style: { stroke: "#4b5563" },
  },

  // Спуск по наемникам
  {
    id: "e-m1",
    source: "t-merc",
    target: "m-vice-1",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e-m2",
    source: "m-vice-1",
    target: "m-vice-2",
    style: { stroke: "#f59e0b" },
  },

  // Развилка капитанов
  {
    id: "e-c1",
    source: "m-vice-2",
    target: "capt-good",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-c2",
    source: "m-vice-2",
    target: "capt-bad",
    style: { stroke: "#ef4444" },
  },

  // Схождение к финалу (Анимированные стрелки)
  {
    id: "e-f1",
    source: "capt-good",
    target: "wisdom-12",
    style: { stroke: "#b91c1c", strokeDasharray: "4,4" },
  },
  {
    id: "e-f2",
    source: "capt-bad",
    target: "wisdom-12",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 1.5 },
  },
];

export default function Chapter12() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#0f172a]/95 backdrop-blur border border-[#334155] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли выкатывает жесткий военный аудит. Государство, не имеющее
        преданной гражданской армии и опирающееся на покупную силу, беззащитно.
        Наемники трусливы перед врагом, дерзки перед гражданами и разорительны
        для казны.
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesConnectable={false}
        nodesDraggable={true}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="bg-[#0f172a] border-[#334155] text-slate-400 fill-slate-400" />
      </ReactFlow>
    </div>
  );
}
