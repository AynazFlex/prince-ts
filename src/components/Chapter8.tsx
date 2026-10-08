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

  // Развилка типов жестокости
  goodCruelty:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! text-left! font-mono text-xs w-[260px]",
  badCruelty:
    "border-red-600/50! text-red-400! bg-[#3a0505]! shadow-[0_0_10px_rgba(220,38,38,0.15)]! text-left! font-mono text-xs w-[260px]",

  // Действия и следствия
  action:
    "border-amber-500/40! text-amber-300! bg-[#241205]! font-mono text-[11px]! w-[240px]",
  result:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-[11px]! w-[240px]",

  // Финальный железный закон
  law: "border-2 border-red-600! text-red-400! font-bold text-center! bg-[#3a0505]! shadow-[0_0_20px_rgba(220,38,38,0.3)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "💀 ГЛАВА 8. ВЛАСТЬ ЧЕРЕЗ ЗЛОДЕЯНИЯ (ТЕРРОР)" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главный парадокс Макиавелли о жестокости (Развилка)
  {
    id: "c-good",
    data: {
      label:
        "🟢 ЖЕСТОКОСТЬ «БЛАГАЯ»\nПрименяется один раз в самом начале ради безопасности. Быстро прекращается и перерастает в заботу о подданных.",
    },
    position: { x: 80, y: 130 },
    className: nodeClasses.goodCruelty,
  },
  {
    id: "c-bad",
    data: {
      label:
        "🔴 ЖЕСТОКОСТЬ «ДУРНАЯ»\nВначале почти незаметна, но со временем не утихает, а разрастается. Правитель не может выпустить меч из рук.",
    },
    position: { x: 640, y: 130 },
    className: nodeClasses.badCruelty,
  },

  // Уровень 3: Инструкция для «Благого» террора (Левая ветка)
  {
    id: "act-good-1",
    data: {
      label:
        "⚡️ Наноси обиды разом\nУничтожь всех врагов за один удар. Пережитый шок забудется быстрее, если насилие не повторится.",
    },
    position: { x: 80, y: 260 },
    className: nodeClasses.action,
  },
  {
    id: "act-good-2",
    data: {
      label:
        "🌾 Расточай блага по капле\nДелай добрые дела маленькими порциями, чтобы подданные успевали их оценить и смаковать.",
    },
    position: { x: 80, y: 350 },
    className: nodeClasses.action,
  },

  // Уровень 3: Последствия «Дурного» террора (Правая ветка)
  {
    id: "res-bad-1",
    data: {
      label:
        "🌋 Постоянный страх заговора\nКогда насилие идет изо дня в день, подданные ожесточаются. Правитель впадает в паранойю.",
    },
    position: { x: 640, y: 260 },
    className: nodeClasses.result,
  },
  {
    id: "res-bad-2",
    data: {
      label:
        "☠️ Неминуемый крах\nНенависть подданных невозможно сдерживать вечно. Рано или поздно система взорвется изнутри.",
    },
    position: { x: 640, y: 350 },
    className: nodeClasses.result,
  },

  // Уровень 4: Абсолютная максима главы
  {
    id: "wisdom-8",
    data: {
      label:
        "⚖️ ЗАКОН НАКАЗАНИЙ\n«Обиды нужно наносить разом: чем меньше их распробуют, тем меньше от них вреда; благодеяния же полезно оказывать мало-помалу, чтобы их распробовали как можно лучше»",
    },
    position: { x: 360, y: 470 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Потоки от старта
  {
    id: "e-s1",
    source: "start",
    target: "c-good",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "c-bad",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Движение левой ветки
  {
    id: "e-g1",
    source: "c-good",
    target: "act-good-1",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-g2",
    source: "act-good-1",
    target: "act-good-2",
    style: { stroke: "#10b981" },
  },

  // Движение правой ветки
  {
    id: "e-b1",
    source: "c-bad",
    target: "res-bad-1",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-b2",
    source: "res-bad-1",
    target: "res-bad-2",
    animated: true,
    style: { stroke: "#b91c1c", strokeWidth: 2 },
  },

  // Сведение к финальному закону
  {
    id: "e-final-g",
    source: "act-good-2",
    target: "wisdom-8",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-final-b",
    source: "res-bad-2",
    target: "wisdom-8",
    animated: true,
    style: { stroke: "#dc2626" },
  },
];

export default function Chapter8() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-red-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли не морализирует, а считает математику власти. Жестокость
        допустима, но она должна быть хирургической и разовой. Если правитель
        вынужден применять террор постоянно, он совершает стратегическую ошибку:
        порождает тотальную ненависть, которая стирает любые шансы удержать
        трон.
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
