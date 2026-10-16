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

  // Иллюзии против Реальности
  illusion:
    "border-slate-700! text-slate-400! bg-slate-950/60! text-left! font-mono text-xs w-[260px]",
  reality:
    "border-amber-500/50! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[260px]",

  // Поведение государя
  behavior:
    "border-[#881337]/50! text-rose-300! bg-[#1d050f]! font-mono text-[11px]! w-[240px]",

  // Финальный закон реализма
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[330px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🎭 ГЛАВА 15. ПОЛИТИЧЕСКИЙ РЕАЛИЗМ И ПРАВИЛА ВЛАСТИ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Главный раскол философии Макиавелли (Развилка)
  {
    id: "n-illusion",
    data: {
      label:
        "💭 ВОТЧИНА ИЛЛЮЗИЙ\nПопытка построить воображаемые республики, которых никто не видел. Стремление всегда быть идеальным и добрым.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.illusion,
  },
  {
    id: "n-reality",
    data: {
      label:
        "👁️ ИСТИННОЕ ПОЛОЖЕНИЕ ДЕЛА\nИзучение мира таким, какой он есть. Окружающие люди эгоистичны, корыстны и жестоки.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.reality,
  },

  // Уровень 3: Последствия идеализма (Ветка от n-illusion)
  {
    id: "ill-result",
    data: {
      label:
        "❌ Неминуемый крах\nТот, кто отвергает реальность ради идеала, быстрее приближает свою гибель, чем учится сохранять власть.",
    },
    position: { x: 60, y: 250 },
    className: nodeClasses.illusion,
  },

  // Уровень 3: Инструкция выживания для государя (Ветка от n-reality)
  {
    id: "real-rule-1",
    data: {
      label:
        "🔱 Научись быть недобродетельным\nПравитель должен уметь отступать от морали, если этого требуют интересы государства.",
    },
    position: { x: 660, y: 250 },
    className: nodeClasses.behavior,
  },
  {
    id: "real-rule-2",
    data: {
      label:
        "🔱 Избегай позорных пороков\nНе бойся тех пороков, без которых нельзя удержать власть, но берегись тех, что порождают ненависть народа.",
    },
    position: { x: 660, y: 340 },
    className: nodeClasses.behavior,
  },

  // Уровень 4: Абсолютная максима главы
  {
    id: "wisdom-15",
    data: {
      label:
        "⚖️ ЗАКОН РЕАЛИЗМА\n«Расстояние между тем, как люди живут и как они должны жить, настолько велико, что желающий всегда быть хорошим погибнет среди тех, кто плох»",
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
    target: "n-illusion",
    style: { stroke: "#475569" },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-reality",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },

  // Движение левой ветки
  {
    id: "e-i1",
    source: "n-illusion",
    target: "ill-result",
    style: { stroke: "#475569" },
  },

  // Движение правой ветки
  {
    id: "e-r1",
    source: "n-reality",
    target: "real-rule-1",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-r2",
    source: "real-rule-1",
    target: "real-rule-2",
    style: { stroke: "#d97706" },
  },

  // Схождение к финалу (Анимированные стрелки)
  {
    id: "e-f1",
    source: "ill-result",
    target: "wisdom-15",
    style: { stroke: "#ef4444", strokeDasharray: "4,4" },
  },
  {
    id: "e-f2",
    source: "real-rule-2",
    target: "wisdom-15",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
];

export default function Chapter15() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли срывает маски с традиционной средневековой морали. Он
        заявляет: добродетели хороши, пока они укрепляют систему, но если слепое
        следование добру ведет к развалу структуры и бунту — такое «добро»
        становится преступлением перед государством.
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
