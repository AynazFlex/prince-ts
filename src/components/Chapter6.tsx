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

  // Две силы
  virtu:
    "border-amber-500/60! text-amber-300! bg-[#241205]! font-bold font-mono text-xs w-[240px]",
  fortuna:
    "border-slate-600! text-slate-400! bg-slate-900/60! font-mono text-xs w-[240px]",

  // Факторы реформ и силы
  action:
    "border-amber-600/40! text-amber-400! bg-[#1a0c04]! font-mono text-[11px]! w-[250px]",
  risk: "border-rose-600/50! text-rose-300! bg-[#2d0510]! font-mono text-[11px]! w-[260px]",

  // Итоговый закон
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[320px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "👑 ГЛАВА 6. ДОБЛЕСТЬ (VIRTU) ПРОТИВ СУДЬБЫ (FORTUNA)" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Базовый дуализм
  {
    id: "n-virtu",
    data: {
      label:
        "🔱 ЛИЧНАЯ ДОБЛЕСТЬ (Virtù)\nОпора на собственные силы, талант и ум (Моисей, Кир, Ромул).\n➔ Трудно завоевать, ЛЕГКО удержать.",
    },
    position: { x: 80, y: 130 },
    className: nodeClasses.virtu,
  },
  {
    id: "n-fortuna",
    data: {
      label:
        "🎲 МИЛОСТЬ СУДЬБЫ (Fortuna)\nСлучайное стечение обстоятельств, чужая помощь. Судьба дает лишь шанс, который нужно уметь реализовать.",
    },
    position: { x: 640, y: 130 },
    className: nodeClasses.fortuna,
  },

  // Уровень 3: Проблема введения новых законов (Реформы)
  {
    id: "reform-core",
    data: {
      label:
        "🌋 РИСК НОВОВВЕДЕНИЙ\n«Нет дела более трудного, опасного и сомнительного в успехе, чем введение новых установлений»",
    },
    position: { x: 360, y: 260 },
    className: nodeClasses.risk,
  },

  // Уровень 4: Причины провала реформ
  {
    id: "r-enemies",
    data: {
      label:
        "🔥 Враги: все те, кому было хорошо при старых законах (яростно атакуют).",
    },
    position: { x: 220, y: 380 },
    className: nodeClasses.risk,
  },
  {
    id: "r-friends",
    data: {
      label:
        "❄️ Друзья: те, кому будет хорошо при новых (защищают вяло и нерешительно).",
    },
    position: { x: 500, y: 380 },
    className: nodeClasses.risk,
  },

  // Уровень 5: Главное условие успеха реформатора
  {
    id: "prophets-law",
    data: {
      label:
        "⚔️ ВООРУЖЕННЫЕ ПРОРОКИ\nКогда народ перестает верить, нужно иметь силу, чтобы заставить его поверить принудительно (Пример: Савонарола погиб, ибо был безоружен).",
    },
    position: { x: 360, y: 490 },
    className: nodeClasses.action,
  },

  // Уровень 6: Аксиома
  {
    id: "wisdom-6",
    data: {
      label:
        "⚖️ ЗАКОН ВОЛИ\n«Кто меньше полагался на милость судьбы, тот удерживал власть прочнее всего»",
    },
    position: { x: 320, y: 610 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к двум началам
  {
    id: "e-s1",
    source: "start",
    target: "n-virtu",
    style: { stroke: "#d97706", strokeWidth: 2 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-fortuna",
    style: { stroke: "#475569", strokeWidth: 1.5 },
  },

  // Сведение к проблеме реформ
  {
    id: "e-v-r",
    source: "n-virtu",
    target: "reform-core",
    style: { stroke: "#d97706", strokeDasharray: "4,4" },
  },
  {
    id: "e-f-r",
    source: "n-fortuna",
    target: "reform-core",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Разветвление природы рисков реформ
  {
    id: "e-r1",
    source: "reform-core",
    target: "r-enemies",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-r2",
    source: "reform-core",
    target: "r-friends",
    style: { stroke: "#3b82f6" },
  },

  // От рисков к решению (силе)
  {
    id: "e-e1",
    source: "r-enemies",
    target: "prophets-law",
    style: { stroke: "#b91c1c" },
  },
  {
    id: "e-e2",
    source: "r-friends",
    target: "prophets-law",
    style: { stroke: "#475569" },
  },

  // К финальной максиме
  {
    id: "e-final",
    source: "prophets-law",
    target: "wisdom-6",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 2 },
  },
];

export default function Chapter6() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли разделяет силу воли (Virtù) и слепой случай (Fortuna).
        Опирающийся на судьбу падает при первом изменении ветра. Но даже великая
        доблесть бессильна при введении реформ, если у реформатора нет
        материальной силы (оружия) удержать колеблющуюся толпу.
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
