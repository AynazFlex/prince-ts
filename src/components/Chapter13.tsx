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
    "bg-[#111827]! border-2 border-[#4b5563]! text-slate-200! font-bold uppercase tracking-wider text-center! shadow-[0_0_15px_rgba(75,85,99,0.3)]! font-mono",

  // Категория союзников
  alliance:
    "border-rose-600/50! text-rose-300! bg-[#2d0510]! shadow-[0_0_12px_rgba(239,68,68,0.15)]! text-left! font-mono text-xs w-[260px]",

  // Варианты исхода
  outcome:
    "border-amber-500/50! text-amber-300! bg-[#241a05]! font-mono text-[11px]! w-[240px]",

  // Единственное решение
  solution:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-mono text-xs w-[250px]",

  // Финальный закон меча
  law: "border-2 border-slate-500! text-slate-300! font-bold text-center! bg-[#1f2937]! shadow-[0_0_20px_rgba(75,85,99,0.25)]! w-[330px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "⚔️ ГЛАВА 13. СОЮЗНИЧЕСКИЕ И СОБСТВЕННЫЕ ВОЙСКА" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Суть союзнических войск
  {
    id: "aux-root",
    data: {
      label:
        "🛡️ СОЮЗНИЧЕСКИЕ ВОЙСКА\nСилы сильного соседа, призванные для твоей защиты. Они опаснее наемников, ибо монолитны и подчиняются чужому лидеру.",
    },
    position: { x: 340, y: 120 },
    className: nodeClasses.alliance,
  },

  // Уровень 3: Два исхода использования чужой армии (Развилка)
  {
    id: "out-lose",
    data: {
      label:
        "💀 ЕСЛИ ОНИ ПРОИГРАЮТ:\nТы неминуемо терпишь поражение вместе с ними и теряешь всё.",
    },
    position: { x: 80, y: 240 },
    className: nodeClasses.outcome,
  },
  {
    id: "out-win",
    data: {
      label:
        "⛓️ ЕСЛИ ОНИ ПОБЕДЯТ:\nТы попадаешь к ним в ПОЛНУЮ ЗАВИСИМОСТЬ. Они заберут твою власть.",
    },
    position: { x: 600, y: 240 },
    className: nodeClasses.outcome,
  },

  // Уровень 4: Единственное верное решение
  {
    id: "own-army",
    data: {
      label:
        "🟢 ОПОРА НА СВОИ СИЛЫ\nМудрый правитель всегда предпочитает проиграть со своими, чем победить с чужими, ибо чужая победа ложна.",
    },
    position: { x: 340, y: 360 },
    className: nodeClasses.solution,
  },

  // Уровень 5: Итоговая максима главы
  {
    id: "wisdom-13",
    data: {
      label:
        "⚖️ ЗАКОН ОРУЖИЯ\n«Наемные войска опасны своей трусостью, союзнические же — своей доблестью. Без собственного войска ни одно государство не находится в безопасности»",
    },
    position: { x: 310, y: 480 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-s1",
    source: "start",
    target: "aux-root",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },

  // Развилка исходов
  {
    id: "e-[#881337]-l",
    source: "aux-root",
    target: "out-lose",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e-[#881337]-w",
    source: "aux-root",
    target: "out-win",
    animated: true,
    style: { stroke: "#b91c1c", strokeWidth: 2 },
  },

  // Схождение к решению
  {
    id: "e-sol-1",
    source: "out-lose",
    target: "own-army",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-sol-2",
    source: "out-win",
    target: "own-army",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // К финалу
  {
    id: "e-final",
    source: "own-army",
    target: "wisdom-13",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
];

export default function Chapter13() {
  return (
    <div className="w-full h-full relative">
      {/* Исправленная плашка на чистом русском языке */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#0f172a]/95 backdrop-blur border border-[#334155] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-slate-300 shadow-2xl">
        <span className="text-rose-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли выводит непреложное правило: призывать сильного соседа для
        своей защиты — это добровольный шаг в рабство. Если они проиграют, тебя
        уничтожит враг. Если они победят, они сами начнут диктовать тебе свои
        условия. Настоящая независимость возможна только при наличии собственной
        гражданской армии.
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesConnectable={false}
        nodesDraggable={true}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="bg-[#0f172a] border-[#334155] text-slate-400 fill-slate-400" />
      </ReactFlow>
    </div>
  );
}
