import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, TrendingUp, Tag } from "lucide-react";
import { clients } from "@/lib/mock-data";
import { DonutRing, Sparkline } from "@/components/platform/charts";
import { cn } from "@/lib/utils";
import pythiaAvatar from "@/assets/pythia-avatar.png";

export const Route = createFileRoute("/_app/clients")({
  component: Clients,
});

function Clients() {
  const [active, setActive] = useState(clients[0]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground lg:text-3xl">Perfil inteligente del cliente</h1>
        <p className="mt-1 text-sm text-muted-foreground">Comportamiento y preferencias detectadas por Pythia.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Lista */}
        <div className="space-y-3">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left shadow-soft transition-all",
                active.id === c.id ? "border-primary" : "border-border hover:shadow-card",
              )}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-sm font-bold text-primary-foreground">
                {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-foreground">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">{c.segment}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Detalle */}
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-soft">
              <DonutRing value={active.acceptanceScore} size={120} stroke={11} color="var(--color-ai)">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-ai">{active.acceptanceScore}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Score</p>
                </div>
              </DonutRing>
              <p className="mt-3 text-sm font-bold text-foreground">Aceptación de sustituciones</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                <TrendingUp className="h-4 w-4 text-primary" /> Historial de aceptación
              </div>
              <Sparkline data={active.history} height={90} />
              <p className="mt-3 text-sm text-muted-foreground">
                Tendencia <strong className="text-success">al alza</strong> en las últimas 7 semanas.
              </p>
            </div>
          </div>

          {/* Preferencias */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
              <Heart className="h-4 w-4 text-primary" /> Preferencias detectadas
            </div>
            <div className="flex flex-wrap gap-2">
              {active.preferences.map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand-soft px-3.5 py-2 text-sm font-semibold text-foreground">
                  <Tag className="h-3.5 w-3.5 text-primary" /> {p}
                </span>
              ))}
            </div>
          </div>

          {/* Insights de Pythia */}
          <div className="rounded-3xl bg-gradient-ai p-6 text-ai-foreground shadow-ai">
            <div className="mb-4 flex items-center gap-3">
              <img src={pythiaAvatar} alt="Pythia Bot" width={44} height={44} loading="lazy" className="h-11 w-11 drop-shadow" />
              <div className="leading-tight">
                <p className="text-sm font-bold">Insights de Pythia</p>
                <p className="text-xs text-ai-foreground/80">Lectura humana del comportamiento</p>
              </div>
            </div>
            <p className="mb-4 rounded-2xl bg-white/12 p-4 text-sm leading-relaxed backdrop-blur">
              “{active.name.split(" ").slice(0, 2).join(" ")} confía en mí cuando cuido su sabor favorito. Si
              respeto sus cítricos y su formato de 600 ml, casi siempre acepta la sustitución, sobre todo en fin de
              semana cuando no puede quedarse sin producto.”
            </p>
            <div className="space-y-2.5">
              {active.insights.map((ins) => (
                <div key={ins} className="flex items-start gap-2.5 rounded-2xl bg-white/12 p-3.5 text-sm leading-relaxed backdrop-blur">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ai-foreground" />
                  {ins}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
