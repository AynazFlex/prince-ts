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

  // Две смертельные угрозы
  threatHate:
    "border-red-600! text-red-400! bg-[#3a0505]! font-bold font-mono text-xs w-[250px]",
  threatContempt:
    "border-rose-500/60! text-rose-300! bg-[#2d0510]! font-bold font-mono text-xs w-[250px]",

  // Инструменты защиты (Золото/Сталь)
  defense:
    "border-emerald-500/50! text-emerald-300! bg-[#042417]! font-mono text-xs w-[260px]",
  institution:
    "border-slate-600! text-slate-400! bg-slate-900/60! font-mono text-[11px]! w-[250px]",

  // Финальный закон авторитета
  law: "border-2 border-amber-600! text-amber-400! font-bold text-center! bg-[#2d1505]! shadow-[0_0_20px_rgba(217,119,6,0.25)]! w-[340px] font-mono",
};

const initialNodes: Node[] = [
  // Уровень 1: Старт
  {
    id: "start",
    data: { label: "🛡️ ГЛАВА 19. ЗАЩИТА ОТ НЕНАВИСТИ И ПРЕЗРЕНИЯ" },
    position: { x: 420, y: 20 },
    className: nodeClasses.header,
  },

  // Уровень 2: Две главные ловушки авторитета (Развилка)
  {
    id: "t-hate",
    data: {
      label:
        "🔴 1. НЕНАВИСТЬ ПОДДАННЫХ\nРождается из хищничества, посягательства на имущество и честь граждан.\n➔ Смертный приговор для власти.",
    },
    position: { x: 60, y: 130 },
    className: nodeClasses.threatHate,
  },
  {
    id: "t-cont",
    data: {
      label:
        "🔴 2. ПРЕЗРЕНИЕ НАРОДА\nРождается из нерешительности, трусости, слабости и легкомыслия государя.\n➔ Лишает систему авторитета.",
    },
    position: { x: 660, y: 130 },
    className: nodeClasses.threatContempt,
  },

  // Уровень 3: Инструмент громоотвода (Делегирование негатива — под т-hate)
  {
    id: "def-lightning",
    data: {
      label:
        "⚡️ Создавай контролируемые громоотводы\nВозлагай все непопулярные и жестокие дела (налоги, приговоры) на судей и министров. Все милости оказывай лично.",
    },
    position: { x: 60, y: 260 },
    className: nodeClasses.defense,
  },
  {
    id: "inst-france",
    data: {
      label:
        "🏛️ Пример: Парламент Франции\nКороль создал третью палату (суд), чтобы она наказывала знать и защищала народ, отводя обвинения в жестокости от короны.",
    },
    position: { x: 60, y: 370 },
    className: nodeClasses.institution,
  },

  // Уровень 3: Противоядие от презрения (Под т-cont)
  {
    id: "def-majesty",
    data: {
      label:
        "👑 Демонстрируй величие\nВ действиях государя должны сквозить великодушие, бесстрашие, твердость и непоколебимость решений.",
    },
    position: { x: 660, y: 260 },
    className: nodeClasses.defense,
  },

  // Уровень 4: Главная защита от заговоров
  {
    id: "conspiracy-shield",
    data: {
      label:
        "🛡️ Щит от внутренних заговоров\nЗаговорщик идет на риск, только если думает, что убийством лидера угодит народу. Если народ доволен, заговор обречен на провал.",
    },
    position: { x: 360, y: 490 },
    className: nodeClasses.institution,
  },

  // Уровень 5: Итоговая максима главы
  {
    id: "wisdom-19",
    data: {
      label:
        "⚖️ ЗАКОН АВТОРИТЕТА\n«Государь должен сделать так, чтобы о его решениях судили как о бесповоротных, и поддерживать о себе мнение как о человеке, которого нельзя обмануть или перехитрить»",
    },
    position: { x: 330, y: 610 },
    className: nodeClasses.law,
  },
];

const initialEdges: Edge[] = [
  // Разветвление от старта
  {
    id: "e-s1",
    source: "start",
    target: "t-hate",
    style: { stroke: "#ef4444", strokeWidth: 1.5 },
  },
  {
    id: "e-s2",
    source: "start",
    target: "t-cont",
    style: { stroke: "#b91c1c", strokeWidth: 1.5 },
  },

  // Движение левой ветки
  {
    id: "e-h1",
    source: "t-hate",
    target: "def-lightning",
    style: { stroke: "#10b981" },
  },
  {
    id: "e-h2",
    source: "def-lightning",
    target: "inst-france",
    style: { stroke: "#10b981" },
  },

  // Движение правой ветки
  {
    id: "e-c1",
    source: "t-cont",
    target: "def-majesty",
    style: { stroke: "#10b981" },
  },

  // Связи к щиту от заговоров
  {
    id: "e-z1",
    source: "inst-france",
    target: "conspiracy-shield",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },
  {
    id: "e-z2",
    source: "def-majesty",
    target: "conspiracy-shield",
    style: { stroke: "#475569", strokeDasharray: "4,4" },
  },

  // Схождение к финалу (Анимированные золотые стрелки)
  {
    id: "e-end-shield",
    source: "conspiracy-shield",
    target: "wisdom-19",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 1.5 },
  },
  {
    id: "e-end-dir",
    source: "def-majesty",
    target: "wisdom-19",
    animated: true,
    style: { stroke: "#d97706", strokeWidth: 1.5 },
  },
];

export default function Chapter19() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#110308]/90 backdrop-blur border border-[#2d0e17] p-4 rounded max-w-[calc(100vw-2rem)] md:max-w-xs text-xs text-rose-300 shadow-2xl">
        <span className="text-rose-500 font-bold block mb-1">
          ⚡️ СУТЬ ГЛАВЫ:
        </span>
        Макиавелли выстраивает архитектуру внутренней безопасности. Ненависть
        опасна, презрение — фатально. Главный секрет выживания наверху —
        выстроить структуру так, чтобы весь негатив от жестких законов забирали
        на себя марионеточные суды или министры, а государь оставался в глазах
        народа источником только милостей и непоколебимого величия.
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
