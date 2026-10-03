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

  // Типы земель
  easyZone:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! text-left! font-mono text-xs w-[250px]",
  dangerZone:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! text-left! font-mono text-xs w-[280px]",

  // Действия / Инструкции
  action:
    "border-amber-500/40! text-amber-300! bg-[#241205]! text-left! font-mono text-[11px]! w-[250px]",
  error:
    "border-red-600/50! text-red-400! bg-[#3a0505]! text-left! font-mono text-[11px]! w-[250px]",

  // Финал
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.2)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "⚔️ ГЛАВА 3. СМЕШАННЫЕ КНЯЖЕСТВА" },
    position: { x: 440, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Развилка 1 — Схожие язык и культура (Левая ветка)
  {
    id: "same-culture",
    data: {
      label:
        "🟢 ТИП 1. СХОЖАЯ КУЛЬТУРА\nНовая земля близка по языку и обычаям к твоей (например, Бургундия к Франции). Удержать ЛЕГКО.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.easyZone,
  },

  // Уровень 3: 2 правила для Типа 1
  {
    id: "rule-same-1",
    data: { label: "📜 Уничтожить род прежнего государя" },
    position: { x: 40, y: 250 },
    className: nodeClasses.action,
  },
  {
    id: "rule-same-2",
    data: {
      label: "⚖️ Не менять старые законы и налоги (Слияние произойдет само)",
    },
    position: { x: 40, y: 315 },
    className: nodeClasses.action,
  },

  // Уровень 2: Развилка 2 — Разные языки и обычаи (Правая ветка)
  {
    id: "diff-culture",
    data: {
      label:
        "🔴 ТИП 2. ЧУЖДАЯ КУЛЬТУРА\nРазные языки, законы и нравы. Удержать ТРУДНО. Требуются радикальные меры.",
    },
    position: { x: 640, y: 130 },
    className: nodeClasses.dangerZone,
  },

  // Уровень 3: Эффективные действия для Типа 2
  {
    id: "act-diff-1",
    data: {
      label:
        "🏠 Переселиться туда жить\n(Позволяет сразу видеть беспорядки и гасить их в зародыше)",
    },
    position: { x: 550, y: 260 },
    className: nodeClasses.action,
  },
  {
    id: "act-diff-2",
    data: {
      label:
        "🛡️ Основать колонии\n(Дешевле войск, разоряет лишь малую часть бессильных людей)",
    },
    position: { x: 550, y: 345 },
    className: nodeClasses.action,
  },
  {
    id: "act-diff-3",
    data: {
      label:
        "🤝 Защищать слабых соседей\n(Стать их лидером, но не давать им набрать большую силу)",
    },
    position: { x: 550, y: 430 },
    className: nodeClasses.action,
  },

  // Уровень 3: Смертельные ошибки завоевателя (Пример Людовика XII)
  {
    id: "err-1",
    data: { label: "❌ Усилил сильное государство (Папство)" },
    position: { x: 920, y: 260 },
    className: nodeClasses.error,
  },
  {
    id: "err-2",
    data: { label: "❌ Ввел в страну чужеземного вождя (Испанию)" },
    position: { x: 920, y: 325 },
    className: nodeClasses.error,
  },
  {
    id: "err-3",
    data: { label: "❌ Не переселился и не основал колоний" },
    position: { x: 920, y: 390 },
    className: nodeClasses.error,
  },

  // Уровень 4: Финальный железный закон Макиавелли
  {
    id: "wisdom-3",
    data: {
      label:
        "⚖️ ЗАКОН ЭКСПАНСИИ\n«Страсть к завоеваниям — дело естественное и обычное. Но горе тем, кто совершает ошибки, не имея для завоевания сил»",
    },
    position: { x: 370, y: 550 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От корня к двум ситуациям
  {
    id: "e-s1",
    source: "start",
    target: "same-culture",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "diff-culture",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Связи легкой зоны
  {
    id: "e-[#881337]-1",
    source: "same-culture",
    target: "rule-same-1",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-[#881337]-2",
    source: "same-culture",
    target: "rule-same-2",
    style: { stroke: "#10b981" },
  },

  // Связи сложной зоны (Действия против Ошибок)
  ...["act-diff-1", "act-diff-2", "act-diff-3"].map((id) => ({
    id: `e-act-${id}`,
    source: "diff-culture",
    target: id,
    style: { stroke: "#d97706" },
  })),
  ...["err-1", "err-2", "err-3"].map((id) => ({
    id: `e-err-${id}`,
    source: "diff-culture",
    target: id,
    style: { stroke: "#ef4444", strokeWidth: 1.2 },
  })),

  // Переход к итогу
  {
    id: "e-final-1",
    source: "rule-same-2",
    target: "wisdom-3",
    style: { stroke: "#10b981", strokeDasharray: "4,4" },
  },
  {
    id: "e-final-2",
    source: "act-diff-3",
    target: "wisdom-3",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-final-3",
    source: "err-3",
    target: "wisdom-3",
    animated: true,
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },
];

export default function Chapter3() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-rose-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли формулирует закон: **«Людей нужно либо ласкать, либо
        уничтожать»**, ведь за мелкую обиду человек может отомстить, а за
        крупную — уже нет. Завоевывая чуждую землю, гаси кризисы на взлете,
        расселяй колонии и никогда не усиливай сильных соседей.
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
