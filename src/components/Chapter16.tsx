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

  // Две стратегии
  prodigality:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-xs w-[250px]",
  parsimony:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-bold font-mono text-xs w-[250px]",

  // Последствия (Узлы)
  consequence:
    "border-slate-700! text-slate-400! bg-slate-950/60! font-mono text-[11px]! w-[240px]",
  danger:
    "border-red-600/60! text-red-400! bg-[#3a0505]! font-mono text-[11px]! w-[240px]",

  // Финальная максима
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "💰 ГЛАВА 16. ЩЕДРОСТЬ И БЕРЕЖЛИВОСТЬ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главная развилка бюджетирования
  {
    id: "n-prodigality",
    data: {
      label:
        "🔴 ПОКАЗНАЯ ЩЕДРОСТЬ\nСтремление тратить много ради пустой славы. Ведет к быстрому опустошению казны.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.prodigality,
  },
  {
    id: "n-parsimony",
    data: {
      label:
        "🟢 РАЗУМНАЯ БЕРЕЖЛИВОСТЬ\nЭкономия внутренних ресурсов. Поначалу тебя назовут скупым, но со временем это принесет пользу.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.parsimony,
  },

  // Уровень 3: Каскад последствий щедрости (Левая ветка)
  {
    id: "prod-1",
    data: {
      label:
        "📉 1. Рост налогов\nКазна пуста ➔ правитель вынужден душить народ поборами ради новых денег.",
    },
    position: { x: 0, y: 250 },
    className: nodeClasses.danger,
  },
  {
    id: "prod-2",
    data: {
      label:
        "📉 2. Тотальная ненависть\nНарод беднеет и начинает ненавидеть государя. Система становится хрупкой.",
    },
    position: { x: 0, y: 340 },
    className: nodeClasses.danger,
  },

  // Уровень 3: Каскад последствий бережливости (Правая ветка)
  {
    id: "pars-1",
    data: {
      label:
        "📈 1. Финансовый резерв\nПозволяет защищать страну в войне и вести кампании без введения новых налогов.",
    },
    position: { x: 720, y: 250 },
    className: nodeClasses.consequence,
  },
  {
    id: "pars-2",
    data: {
      label:
        "📈 2. Истинное признание\nНарод видит, что он защищен и не разграблен поборами, и признает государя щедрым по факту.",
    },
    position: { x: 720, y: 340 },
    className: nodeClasses.consequence,
  },

  // Уровень 4: Исключение из правил (Чужие деньги)
  {
    id: "exception-funds",
    data: {
      label:
        "🪙 ИСКЛЮЧЕНИЕ: Расточительство на войне\nТратить чужое добро и трофеи (как Цезарь или Кир) — полезно. Это разжигает пыл солдат и не калечит твой бюджет.",
    },
    position: { x: 360, y: 270 },
    className: nodeClasses.consequence,
  },

  // Уровень 5: Итоговый закон
  {
    id: "wisdom-16",
    data: {
      label:
        "⚖️ ЗАКОН КАЗНЫ\n«Ничто не расточает само себя так, как щедрость. Ради славы щедрого ты неизбежно придешь к бедности и презрению»",
    },
    position: { x: 360, y: 460 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Разделение от старта
  {
    id: "e-s1",
    source: "start",
    target: "n-prodigality",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-parsimony",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },

  // Левая ветка
  {
    id: "e-p1",
    source: "n-prodigality",
    target: "prod-1",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-p2",
    source: "prod-1",
    target: "prod-2",
    animated: true,
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },

  // Правая ветка
  {
    id: "e-pa1",
    source: "n-parsimony",
    target: "pars-1",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-pa2",
    source: "pars-1",
    target: "pars-2",
    style: { stroke: "#10b981" },
  },

  // Связь исключения
  {
    id: "e-ex",
    source: "start",
    target: "exception-funds",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Схождение к финалу
  {
    id: "e-f1",
    source: "prod-2",
    target: "wisdom-16",
    animated: true,
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-f2",
    source: "pars-2",
    target: "wisdom-16",
    style: { stroke: "#10b981", strokeDasharray: "4,4" },
  },
  {
    id: "e-f3",
    source: "exception-funds",
    target: "wisdom-16",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
];

export default function Chapter16() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли ломает очередной стереотип о «добром правителе». Щедрость за
        счет внутренних ресурсов ведет к насилию над собственным народом через
        налоги. Мудрый лидер не боится прослыть скупым — бережливость
        гарантирует силу и независимость системы в критический момент.
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
