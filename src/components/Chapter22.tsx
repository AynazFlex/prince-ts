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

  // Три ума
  mindType:
    "border-slate-600! text-slate-400! bg-slate-950/60! text-left! font-mono text-xs w-[240px]",
  mindBest:
    "border-amber-500/60! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[240px]",

  // Тест министра
  testNode:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-xs w-[260px]",
  solution:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-mono text-[11px]! w-[250px]",

  // Финальный закон кадров
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[330px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🧠 ГЛАВА 22. КАДРОВЫЙ СКАНИНГ: КАК ВЫБИРАТЬ МИНИСТРОВ" },
    position: { x: 360, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Три рода ума по Макиавелли (Горизонтальный веер)
  {
    id: "m1",
    data: {
      label:
        "🔱 1. ВЫСШИЙ УМ\nПостигает всё сам, без чужой помощи. Идеальный лидер.",
    },
    position: { x: 0, y: 130 },
    className: nodeClasses.mindBest,
  },
  {
    id: "m2",
    data: {
      label:
        "📜 2. ПЕРВОКЛАССНЫЙ УМ\nСам не постигает, но может понять и оценить то, что постигли другие.",
    },
    position: { x: 360, y: 130 },
    className: nodeClasses.mindType,
  },
  {
    id: "m3",
    data: {
      label:
        "❌ 3. БЕСПОЛЕЗНЫЙ УМ\nНи сам ничего не постигает, ни чужого понять не может. Профнепригоден.",
    },
    position: { x: 720, y: 130 },
    className: nodeClasses.mindType,
  },

  // Уровень 3: Безошибочный тест на лояльность министра (Ветка от m2)
  {
    id: "minister-test",
    data: {
      label:
        "🔍 ЛАКМУСОВЫЙ ТЕСТ МАКСИМА\n«Если ты видишь, что министр больше думает о себе, чем о тебе, и во всяком деле ищет своей выгоды — он никогда не будет хорошим слугой»",
    },
    position: { x: 360, y: 250 },
    className: nodeClasses.testNode,
  },

  // Уровень 4: Двусторонний контракт удержания кадров
  {
    id: "contract-1",
    data: {
      label:
        "💰 Обязанность государя\nЧтобы сохранить верность министра, осыпай его почестями, деньгами и должностями. Он должен понимать, что без тебя он ничто.",
    },
    position: { x: 180, y: 380 },
    className: nodeClasses.solution,
  },
  {
    id: "contract-2",
    data: {
      label:
        "🛡️ Обязанность министра\nОн должен страшиться любых перемен в государстве, зная, что крах государя — это его личный крах.",
    },
    position: { x: 550, y: 380 },
    className: nodeClasses.solution,
  },

  // Уровень 5: Итоговый закон
  {
    id: "wisdom-22",
    data: {
      label:
        "⚖️ ЗАКОН СИНЕРГИИ\n«Когда государь и министр могут полностью полагаться друг на друга, система крепка. Если же этого нет, финал всегда будет плохим»",
    },
    position: { x: 0, y: 520 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к умам
  {
    id: "e-s1",
    source: "start",
    target: "m1",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
  { id: "e-s2", source: "start", target: "m2", style: { stroke: "#475569" } },
  { id: "e-s3", source: "start", target: "m3", style: { stroke: "#ef4444" } },

  // Спуск к тесту
  {
    id: "e-test",
    source: "m2",
    target: "minister-test",
    style: { stroke: "#d97706" },
  },

  // Разветвление контракта
  {
    id: "e-c1",
    source: "minister-test",
    target: "contract-1",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-c2",
    source: "minister-test",
    target: "contract-2",
    style: { stroke: "#10b981" },
  },

  // Схождение к финалу (Анимированные стрелки)
  {
    id: "e-end-m1",
    source: "m1",
    target: "wisdom-22",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-c1",
    source: "contract-1",
    target: "wisdom-22",
    animated: true,
    style: { stroke: "#10b981" },
  },
  {
    id: "e-end-c2",
    source: "contract-2",
    target: "wisdom-22",
    animated: true,
    style: { stroke: "#10b981" },
  },
];

export default function Chapter22() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли раскладывает механику подбора команды. Окружение лидера — это
        зеркало его собственного ума. Хороший министр — это тот, чья личная
        выгода на 100% совпадает с выживанием системы. Сделай его богатым и
        сильным, но жестко привяжи его благополучие к своему трону.
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
