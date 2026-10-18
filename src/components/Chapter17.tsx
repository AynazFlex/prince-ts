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

  // Эмоциональные опоры
  loveAxis:
    "border-sky-500/50! text-sky-300! bg-[#0c1a24]! text-left! font-mono text-xs w-[250px]",
  fearAxis:
    "border-amber-500/50! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[250px]",
  hateAxis:
    "border-red-600! text-red-400! bg-[#3a0505]! shadow-[0_0_15px_rgba(220,38,38,0.25)]! font-bold font-mono text-xs w-[260px]",

  // Описания мотивов
  motive:
    "border-slate-700! text-slate-400! bg-slate-950/60! font-mono text-[11px]! w-[240px]",

  // Финальный закон
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[330px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "⚖️ ГЛАВА 17. ЧТО ЛУЧШЕ: ЛЮБОВЬ ИЛИ СТРАХ?" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Извечная дилемма правителя (Развилка)
  {
    id: "n-love",
    data: {
      label:
        "💙 ВНУШАТЬ ЛЮБОВЬ\nОпора на преданность, благодарность и моральный авторитет.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.loveAxis,
  },
  {
    id: "n-fear",
    data: {
      label:
        "🔱 ВНУШАТЬ СТРАХ\nОпора на суровость, железную дисциплину и неотвратимость наказания.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.fearAxis,
  },

  // Уровень 3: Уязвимость Любви (Левая ветка)
  {
    id: "love-risk",
    data: {
      label:
        "❌ Хрупкость человеческой природы\nЛюди корыстны. Узы любви рвутся при малейшей угрозе личной выгоде. Правитель не контролирует чужие эмоции.",
    },
    position: { x: 60, y: 250 },
    className: nodeClasses.motive,
  },

  // Уровень 3: Надежность Страха (Правая ветка)
  {
    id: "fear-strength",
    data: {
      label:
        "✅ Полный контроль государя\nСтрах держится на боязни наказания, которая не покидает человека никогда. Государь сам решает, когда наказывать.",
    },
    position: { x: 660, y: 250 },
    className: nodeClasses.motive,
  },

  // Уровень 4: Главная граница власти — НЕКРОССИРУЕМАЯ ЗОНА
  {
    id: "n-hate",
    data: {
      label:
        "🚨 ГРАНЬ НЕНАВИСТИ (Катастрофа)\nСтрах не должен перерастать в ненависть! Ненависть рушит систему подчинения.",
    },
    position: { x: 460, y: 360 },
    className: nodeClasses.hateAxis,
  },

  // Уровень 5: Как не вызвать ненависть
  {
    id: "hate-rules",
    data: {
      label:
        "🛑 ДВЕ КРАСНЫЕ ЛИНИИ:\n1. Не трогай имущество подданных\n2. Не трогай их женщин\n«Человек скорее забудь смерть отца, чем потерю наследства»",
    },
    position: { x: 460, y: 460 },
    className: nodeClasses.motive,
  },

  // Уровень 6: Высшая максима Макиавелли
  {
    id: "wisdom-17",
    data: {
      label:
        "⚖️ ЗАКОН ПСИХОЛОГИИ\n«Любят государей по собственному усмотрению, а боятся — по усмотрению государей. Мудрому правителю лучше рассчитывать на то, что зависит от него самого»",
    },
    position: { x: 325, y: 580 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Разветвление от старта
  {
    id: "e-s1",
    source: "start",
    target: "n-love",
    style: { stroke: "#3b82f6", strokeWidth: 1.5 },
  },
  {
    id: "start-fear",
    source: "start",
    target: "n-fear",
    style: { stroke: "#d97706", strokeWidth: 2 },
  },

  // Спуски
  {
    id: "e-l1",
    source: "n-love",
    target: "love-risk",
    style: { stroke: "#475569" },
  },
  {
    id: "e-f1",
    source: "n-fear",
    target: "fear-strength",
    style: { stroke: "#d97706" },
  },

  // Опасный сдвиг страха в ненависть
  {
    id: "e-fhate",
    source: "fear-strength",
    target: "n-hate",
    animated: true,
    style: { stroke: "#ef4444", strokeDasharray: "5,5" },
  },
  {
    id: "e-h-rules",
    source: "n-hate",
    target: "hate-rules",
    style: { stroke: "#dc2626" },
  },

  // Схождение к финалу
  {
    id: "e-end-l",
    source: "love-risk",
    target: "wisdom-17",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-f",
    source: "fear-strength",
    target: "wisdom-17",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
  {
    id: "e-end-h",
    source: "hate-rules",
    target: "wisdom-17",
    style: { stroke: "#ef4444", strokeDasharray: "4,4" },
  },
];

export default function Chapter17() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли выводит главный психологический закон прагматизма: строй
        систему управления на том, чем распоряжаешься ты сам (**страх**), а не
        на том, что находится в воле других людей (**любовь**). Но удерживай
        суровость в рамках закона, никогда не грабь подданных, чтобы страх не
        превратился в карающую тебя ненависть.
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
