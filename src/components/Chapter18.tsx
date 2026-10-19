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

  // Две природы боя
  humanWay:
    "border-slate-600! text-slate-400! bg-slate-950/60! text-left! font-mono text-xs w-[250px]",
  beastWay:
    "border-[#881337]! text-rose-300! bg-[#1d050f]! font-bold font-mono text-xs w-[250px]",

  // Ипостаси Льва и Лисицы
  lionNode:
    "border-amber-500/60! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[220px]",
  foxNode:
    "border-orange-500/50! text-orange-400! bg-[#2c1d05]! font-bold font-mono text-xs w-[220px]",

  // Практическая тактика
  tactic:
    "border-slate-700! text-slate-300! bg-slate-950/40! font-mono text-[11px]! w-[250px]",

  // Финальный закон маски
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🦊 ГЛАВА 18. ЛЕВ И ЛИСИЦА (КАК ДЕРЖАТЬ СЛОВО)" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Два способа борьбы
  {
    id: "way-man",
    data: {
      label:
        "📜 ПУТЬ ЧЕЛОВЕКА (Законы)\nОпора на право, договоры и честное слово. Часто этого недостаточно.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.humanWay,
  },
  {
    id: "way-beast",
    data: {
      label:
        "🐾 ПУТЬ ЗВЕРИ (Сила и хитрость)\nПрименяется, когда законы бессильны. Требует умения ломать правила.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.beastWay,
  },

  // Уровень 3: Разветвление звериной натуры (Ветка от way-beast)
  {
    id: "beast-lion",
    data: {
      label:
        "🦁 ЛЕВ (Сила)\nСлепая мощь, способная распугивать волков. Беззащитен против капканов и скрытых ловушек.",
    },
    position: { x: 500, y: 240 },
    className: nodeClasses.lionNode,
  },
  {
    id: "beast-fox",
    data: {
      label:
        "🦊 ЛИСИЦА (Хитрость)\nВысший интеллект и гибкость. Распознает капканы и обманы, но беззащитна перед волками.",
    },
    position: { x: 880, y: 240 },
    className: nodeClasses.foxNode,
  },

  // Уровень 4: Тактическое правило верности договору
  {
    id: "word-rule",
    data: {
      label:
        "⚡️ Нарушай слово из выгоды\nРазумный правитель не должен держать слово, если это вредит его государству или если исчезли причины, побудившие обещание.",
    },
    position: { x: 660, y: 360 },
    className: nodeClasses.tactic,
  },

  // Уровень 4: Главный навык маскировки (Для левой и правой веток)
  {
    id: "mask-skill",
    data: {
      label:
        "🎭 Великое притворство\nНеобязательно обладать всеми добродетелями, но критически важно КАЗАТЬСЯ ими: милосердным, верным, честным, набожным.",
    },
    position: { x: 240, y: 360 },
    className: nodeClasses.tactic,
  },

  // Уровень 5: Абсолютный итог главы
  {
    id: "wisdom-18",
    data: {
      label:
        "⚖️ ЗАКОН КАНЦЕЛЯРИИ\n«Люди судят по виду, ибо видеть дано всем, а осязать — немногим. Каждый видит, каким ты кажешься, мало кто осязает, каков ты есть»",
    },
    position: { x: 330, y: 490 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта
  {
    id: "e-s1",
    source: "start",
    target: "way-man",
    style: { stroke: "#475569" },
  },
  {
    id: "e-s2",
    source: "start",
    target: "way-beast",
    style: { stroke: "#881337", strokeWidth: 2 },
  },

  // От зверя к ипостасям
  {
    id: "e-b1",
    source: "way-beast",
    target: "beast-lion",
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
  {
    id: "e-b2",
    source: "way-beast",
    target: "beast-fox",
    style: { stroke: "#f97316", strokeWidth: 1.5 },
  },

  // Сведение от зверей к правилу нарушения обещаний
  {
    id: "e-l-w",
    source: "beast-lion",
    target: "word-rule",
    style: { stroke: "#d97706" },
  },
  {
    id: "e-f-w",
    source: "beast-fox",
    target: "word-rule",
    style: { stroke: "#f97316" },
  },

  // Привязка маски к человеческому пути
  {
    id: "e-m-m",
    source: "way-man",
    target: "mask-skill",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Схождение в финал (Анимированные стрелки интриги)
  {
    id: "e-end-mask",
    source: "mask-skill",
    target: "wisdom-18",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-end-word",
    source: "word-rule",
    target: "wisdom-18",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
  },
];

export default function Chapter18() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли легитимизирует политический обман. Если ты будешь действовать
        только как человек (честно) — тебя уничтожат хищники. Стань Львом, чтобы
        ломать врагов силой, и Лисицей, чтобы обходить капканы договоров.
        Главное — виртуозно владеть маской благочестия.
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
