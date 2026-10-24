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

  // Две крайности информационного потока
  flattery:
    "border-red-600/50! text-red-400! bg-[#3a0505]! text-left! font-mono text-xs w-[250px]",
  freeSpeech:
    "border-slate-600! text-slate-400! bg-slate-950/60! text-left! font-mono text-xs w-[250px]",

  // Эффективный фильтр (Золото / Изумруд)
  filterGood:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-mono text-xs w-[260px]",
  tactic:
    "border-amber-500/40! text-amber-300! bg-[#241205]! font-mono text-[11px]! w-[240px]",

  // Финальный закон информации
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "👁️ ГЛАВА 23. ФИЛЬТР ЛЖИ: КАК ИЗБЕГАТЬ ЛЬСТЕЦОВ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Два опасных полюса информации (Развилка)
  {
    id: "n-flattery",
    data: {
      label:
        "❌ ХОР ЛЬСТЕЦОВ\nОкружение говорит только то, что приятно лидеру. Итог: эхо-камера, оторванность от реальности и роковые ошибки.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.flattery,
  },
  {
    id: "n-free",
    data: {
      label:
        "❌ АБСОЛЮТНАЯ СВОБОДА СЛОВА\nКаждый может высказать государю правду в лицо в любой момент. Итог: мгновенная потеря авторитета и падение престижа власти.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.freeSpeech,
  },

  // Уровень 3: Третий путь — Алгоритм Контролируемой Правды (Центр)
  {
    id: "filter-core",
    data: {
      label:
        "🟢 ШЛЮЗ КОНТРОЛИРУЕМОЙ ПРАВДЫ\nВыбери узкий круг мудрых людей. Дай им право говорить суровую истину, но только по твоим вопросам.",
    },
    position: { x: 360, y: 240 },
    className: nodeClasses.filterGood,
  },

  // Уровень 4: Два правила удержания шлюза
  {
    id: "rule-ask",
    data: {
      label:
        "⚡️ Спрашивай сам\nВыслушивай их мнение по любому поводу, но решение принимай единолично. Пресекай любые попытки давать советы без твоего запроса.",
    },
    position: { x: 180, y: 360 },
    className: nodeClasses.tactic,
  },
  {
    id: "rule-anger",
    data: {
      label:
        "⚡️ Не гневайся на горькую весть\nДай советникам понять, что чем они честнее, тем больше твоё расположение к ним. Но если они начнут лукавить — карай.",
    },
    position: { x: 550, y: 360 },
    className: nodeClasses.tactic,
  },

  // Уровень 5: Итоговая максима главы
  {
    id: "wisdom-23",
    data: {
      label:
        "⚖️ ЗАКОН ИНФОРМАЦИИ\n«Добрые советы, кто бы их ни давал, родятся из мудрости государя, а не мудрость государя рождается из добрых советов»",
    },
    position: { x: 320, y: 480 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // От старта к ловушкам
  {
    id: "e-s1",
    source: "start",
    target: "n-flattery",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "n-free",
    style: { stroke: "#475569" },
  },

  // Схождение от крайностей к решению-фильтру
  {
    id: "e-f-core",
    source: "n-flattery",
    target: "filter-core",
    style: { stroke: "#ef4444", strokeDasharray: "4,4" },
  },
  {
    id: "e-fr-core",
    source: "n-free",
    target: "filter-core",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Разветвление правил работы шлюза
  {
    id: "e-r1",
    source: "filter-core",
    target: "rule-ask",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-r2",
    source: "filter-core",
    target: "rule-anger",
    style: { stroke: "#10b981" },
  },

  // Схождение к финальной максиме (Анимированные изумрудные импульсы точных данных)
  {
    id: "e-end-1",
    source: "rule-ask",
    target: "wisdom-23",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-end-2",
    source: "rule-anger",
    target: "wisdom-23",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
];

export default function Chapter23() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-amber-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли выстраивает защиту от главной угрозы управления —
        дезинформации со стороны элит. Лидер не должен позволять придворным
        превращать свой разум в эхо-камеру. Построй шлюз контролируемой правды:
        слушай жесткие факты только тогда, когда сам требуешь отчета, оставаясь
        для всех остальных непреклонным монолитом.
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
