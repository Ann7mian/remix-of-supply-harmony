import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { orders, orderStages } from "@/lib/mock-data";
import { DonutRing } from "@/components/platform/charts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/orders")({
  component: Orders,
});

function Orders() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground lg:text-3xl">Gestión de pedidos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pipeline desde el pedido hasta la aprobación, con propensión de aceptación calculada por Pythia.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((o) => (
          <div key={o.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft lg:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">
                  {o.id} <span className="font-medium text-muted-foreground">· {o.client}</span>
                </p>
              </div>
              {o.stage === 4 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-bold text-success">
                  <Check className="h-3.5 w-3.5" /> Aprobado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ai-soft px-3 py-1 text-xs font-bold text-ai">
                  <Sparkles className="h-3.5 w-3.5" /> {o.acceptance}% propensión de aceptación
                </span>
              )}
            </div>

            {/* Timeline */}
            <div className="mt-6 flex items-center">
              {orderStages.map((stage, i) => {
                const done = i <= o.stage;
                const current = i === o.stage && o.stage < 4;
                return (
                  <div key={stage} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          "grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition-colors",
                          done ? "bg-gradient-brand text-primary-foreground shadow-brand" : "bg-secondary text-muted-foreground",
                          current && "ring-4 ring-primary/20",
                        )}
                      >
                        {done && !current ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className={cn("text-[11px] font-semibold", done ? "text-foreground" : "text-muted-foreground")}>
                        {stage}
                      </span>
                    </div>
                    {i < orderStages.length - 1 && (
                      <div className={cn("mx-1 mb-5 h-1 flex-1 rounded-full", i < o.stage ? "bg-gradient-brand" : "bg-secondary")} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sustitución */}
            {o.suggested !== "—" && (
              <div className="mt-6 grid items-center gap-4 rounded-2xl bg-secondary/50 p-4 sm:grid-cols-[1fr_auto_1fr_auto]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Solicitado</p>
                  <p className="mt-0.5 text-sm font-bold text-foreground">{o.requested}</p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-primary sm:block" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ai">Sugerido por Pythia</p>
                  <p className="mt-0.5 text-sm font-bold text-foreground">{o.suggested}</p>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <DonutRing value={o.acceptance} size={64} stroke={7} color="var(--color-ai)">
                    <span className="text-sm font-extrabold text-ai">{o.acceptance}%</span>
                  </DonutRing>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
