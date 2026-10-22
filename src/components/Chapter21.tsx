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

  // Стратегии авторитета
  enterprise:
    "border-amber-500/60! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[250px]",
  neutrality:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-xs w-[250px]",

  // Факторы действий
  action:
    "border-slate-700! text-slate-300! bg-slate-950/40! font-mono text-[11px]! w-[240px]",
  danger:
    "border-red-600/50! text-red-400! bg-[#3a0505]! font-mono text-[11px]! w-[240px]",

  // Финальный закон авторитета
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "👑 ГЛАВА 21. КАК ГОСУДАРЬ ДОЛЖЕН КУПИТЬ ПОЧТЕНИЕ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Два пути внешней политики (Развилка)
  {
    id: "n-enterprise",
    data: {
      label:
        "🔱 МАСШТАБНЫЕ ПРЕДПРИЯТИЯ\nГромкие военные кампании, великие дела и реформы. Держат подданных в изумлении и напряжении.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.enterprise,
  },
  {
    id: "n-neutrality",
    data: {
      label:
        "❌ ТРУСЛИВЫЙ НЕЙТРАЛИТЕТ\nПопытка отсидеться, когда воюют сильные соседи. Макиавелли считает это гарантированным крахом.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.neutrality,
  },

  // Уровень 3: Кейс Фердинанда Арагонского (Под n-enterprise)
  {
    id: "case-ferdinand",
    data: {
      label:
        "⚔️ Эффект отвлечения внимания\nФердинанд постоянно начинал новые войны. Это занимало умы баронов, не давая им времени на внутренние заговоры против него.",
    },
    position: { x: 60, y: 250 },
    className: nodeClasses.action,
  },
  {
    id: "act-culture",
    data: {
      label:
        "🎨 Покровительство талантам\nГосударь обязан награждать выдающихся граждан, устраивать праздники и поддерживать ремесла.",
    },
    position: { x: 60, y: 360 },
    className: nodeClasses.action,
  },

  // Уровень 3: Капкан нейтралитета (Под n-neutrality)
  {
    id: "neut-lose",
    data: {
      label:
        "💀 Ловушка для слабого\nПобедителю не нужен сомнительный друг, который не помог в беде. Побежденный презирает тебя за трусость. Ты станешь добычей.",
    },
    position: { x: 660, y: 250 },
    className: nodeClasses.danger,
  },

  // Уровень 4: Итоговая максима главы
  {
    id: "wisdom-21",
    data: {
      label:
        "⚖️ ЗАКОН РЕПУТАЦИИ\n«Государя уважают также, когда он открыто заявляет себя врагом или другом, то есть когда он без колебаний выступает в пользу одного против другого»",
    },
    position: { x: 360, y: 460 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта
  {
    id: "e-s1",
    source: "start",
    target: "n-enterprise",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-neutrality",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Левая ветка
  {
    id: "e-e1",
    source: "n-enterprise",
    target: "case-ferdinand",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-e2",
    source: "case-ferdinand",
    target: "act-culture",
    style: { stroke: "#10b981" },
  },

  // Правая ветка
  {
    id: "e-n1",
    source: "n-neutrality",
    target: "neut-lose",
    animated: true,
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },

  // Схождение к финалу (Анимированные стрелки)
  {
    id: "e-end-e",
    source: "act-culture",
    target: "wisdom-21",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-end-n",
    source: "neut-lose",
    target: "wisdom-21",
    style: { stroke: "#ef4444", strokeDasharray: "4,4" },
  },
];

export default function Chapter21() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли формулирует законы внешнего позиционирования. Мелкие дела
        рождают презрение. Лидер обязан совершать масштабные шаги, которые
        держат общество в постоянном фокусе. В международных конфликтах выбирай
        сторону жестко и открыто: скрытый нейтралитет презирают все.
      </div>

      <ReactFlow
        nodes={initialNodes}
        nodesDraggable={true}
        nodesConnectable={false}
        edges={initialEdges}
        fitView
      >
        <Background color="#2d0e17" gap={20} size={1} />
        <Controls className="bg-[#16060c] border-[#2d0e17] text-rose-400 fill-rose-400" />
      </ReactFlow>
    </div>
  );
}
