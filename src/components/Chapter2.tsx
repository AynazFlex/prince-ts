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

  // Стабильность (Золото)
  stability:
    "border-amber-500/50! text-amber-300! bg-[#241205]! text-left! font-mono text-xs w-[260px]",

  // Факторы риска (Багровый)
  risk: "border-rose-600/50! text-rose-300! bg-[#2d0510]! text-left! font-mono text-[11px]! w-[240px]",

  // Итог/Аксиома
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.2)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "👑 ГЛАВА 2. НАСЛЕДСТВЕННЫЕ КНЯЖЕСТВА" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главное преимущество
  {
    id: "advantage",
    data: {
      label:
        "🛡️ ИНЕРЦИЯ ТРАДИЦИИ\nПодданные привыкли к роду государя. Доверие и лояльность работают автоматически по привычке.",
    },
    position: { x: 100, y: 130 },
    className: nodeClasses.stability,
  },

  // Уровень 3: 3 правила для сохранения власти (Золотая ветка)
  {
    id: "rule1",
    data: {
      label:
        "📜 Не изменять старые порядки\n(Не ломать законы и обычаи предков)",
    },
    position: { x: 50, y: 250 },
    className: nodeClasses.stability,
  },
  {
    id: "rule2",
    data: {
      label:
        "⏳ Применяться к обстоятельствам\n(Гибко реагировать на новые кризисы)",
    },
    position: { x: 50, y: 325 },
    className: nodeClasses.stability,
  },
  {
    id: "rule3",
    data: {
      label:
        "🤝 Править с умеренностью\n(У наследника меньше причин и поводов обижать подданных)",
    },
    position: { x: 50, y: 400 },
    className: nodeClasses.stability,
  },

  // Уровень 2: Сценарий переворота/захвата (Правая ветка)
  {
    id: "crisis",
    data: {
      label: "🌋 Вторжение сильного врага\n(Законный правитель теряет трон)",
    },
    position: { x: 680, y: 140 },
    className: nodeClasses.risk,
  },

  // Уровень 3: Закономерность возврата власти
  {
    id: "return-law",
    data: {
      label:
        "🔄 Неминуемый реванш\nПри первой же ошибке или неудаче захватчика народ поддержит старого государя и вернет ему трон.",
    },
    position: { x: 680, y: 260 },
    className: nodeClasses.risk,
  },

  // Уровень 4: Главная максима главы
  {
    id: "wisdom-2",
    data: {
      label:
        "⚖️ МАКСИМА ИНЕРЦИИ\n«В древности и непрерывности правления стираются воспоминания о бывших переворотах и их причинах»",
    },
    position: { x: 370, y: 520 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к двум веткам
  {
    id: "e-s1",
    source: "start",
    target: "advantage",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "crisis",
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },

  // Связи правил стабильности
  ...["rule1", "rule2", "rule3"].map((id) => ({
    id: `e-adv-${id}`,
    source: "advantage",
    target: id,
    style: { stroke: "#d97706", opacity: 0.6 },
  })),

  // Связи кризиса
  {
    id: "e-cr-ret",
    source: "crisis",
    target: "return-law",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
  },

  // Сведение к итоговой аксиоме
  {
    id: "e-end-gold",
    source: "rule3",
    target: "wisdom-2",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-red",
    source: "return-law",
    target: "wisdom-2",
    style: { stroke: "#b91c1c", strokeDasharray: "4,4" },
  },
];

export default function Chapter2() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#881337]/30 p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          🧭 ЗАКОН ПРЕЕМСТВЕННОСТИ:
        </span>
        Наследственная власть держится на мощной силе привычки общества.
        Государю не нужно быть гением, чтобы удерживать такой трон — достаточно
        просто соблюдать меру, не вводить резких реформ и позволить инерции
        времени работать на себя.
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
