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

  // Две категории силы
  fieldForce:
    "border-slate-600! text-slate-400! bg-slate-900/60! font-mono text-xs w-[250px]",
  fortressForce:
    "border-amber-500/50! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[260px]",

  // Условия неприступности
  supply:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-mono text-[11px]! w-[240px]",
  risk: "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-[11px]! w-[240px]",

  // Итоговый закон
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🏰 ГЛАВА 10. ОЦЕНКА ОБОРОНОСПСОБНОСТИ ГОСУДАРСТВ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главная развилка возможностей (Развилка)
  {
    id: "c-field",
    data: {
      label:
        "⚔️ СИЛА ДЛЯ ОТКРЫТОГО БОЯ\nГосударство имеет много денег и людей, способных собрать армию и дать генеральное сражение в поле.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.fieldForce,
  },
  {
    id: "c-fortress",
    data: {
      label:
        "🛡️ СИЛА ДЛЯ ОБОРОНЫ\nГосударство не может выйти против врага в поле. Стратегия: запереться за стенами и держать осаду.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.fortressForce,
  },

  // Уровень 3: 3 условия абсолютной неприступности крепости (Правая ветка)
  {
    id: "sup-1",
    data: {
      label:
        "🧱 Укрепленный город\nМощные оборонительные стены, рвы и артиллерия.",
    },
    position: { x: 660, y: 250 },
    className: nodeClasses.supply,
  },
  {
    id: "sup-2",
    data: {
      label:
        "🌾 Ресурсы на 1 год\nЗапасы еды, воды, оружия и работы для населения, чтобы пересидеть долгую осаду.",
    },
    position: { x: 660, y: 330 },
    className: nodeClasses.supply,
  },
  {
    id: "sup-3",
    data: {
      label:
        "❤️ Преданность и порядок\nНарод не паникует, а правитель умело поддерживает дух, рассеивая страх перед врагом.",
    },
    position: { x: 660, y: 410 },
    className: nodeClasses.supply,
  },

  // Уровень 3: Риск осаждающего врага (Левая ветка)
  {
    id: "risk-siege",
    data: {
      label:
        "⏳ Психология осады\nПрирода людей такова, что долгая, бесплодная осада изнуряет нападающих, а их лагерь разлагается.",
    },
    position: { x: 60, y: 270 },
    className: nodeClasses.risk,
  },

  // Уровень 4: Итоговая максима главы
  {
    id: "wisdom-10",
    data: {
      label:
        "⚖️ ЗАКОН КРЕПОСТИ\n«Государя, который имеет укрепленный город и не внушает ненависти народу, невозможно взять штурмом»",
    },
    position: { x: 360, y: 520 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта
  {
    id: "e-s1",
    source: "start",
    target: "c-field",
    style: { stroke: "#475569" },
  },
  {
    id: "e-s2",
    source: "start",
    target: "c-fortress",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },

  // Связи условий крепости
  ...["sup-1", "sup-2", "sup-3"].map((id) => ({
    id: `e-fort-${id}`,
    source: "c-fortress",
    target: id,
    style: { stroke: "#10b981" },
  })),

  // Связи риска осады
  {
    id: "e-field-risk",
    source: "c-field",
    target: "risk-siege",
    style: { stroke: "#475569" },
  },

  // Схождение к финалу (Анимированные стрелки)
  {
    id: "e-final-risk",
    source: "risk-siege",
    target: "wisdom-10",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-final-sup",
    source: "sup-3",
    target: "wisdom-10",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
];

export default function Chapter10() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли дает четкий оборонный алгоритм, перекликаясь с Сунь-Цзы. Если
        твоя инфраструктура защищена, а народ сплочен вокруг тебя и обеспечен
        ресурсами, любая внешняя агрессия разобьется о стены времени. Враг
        умоется кровью и уйдет ни с чем.
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
