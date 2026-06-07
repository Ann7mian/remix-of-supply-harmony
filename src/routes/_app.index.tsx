import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Boxes,  ArrowLeftRight, CheckCircle2, TrendingDown, MapPin, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-logistics.jpg";
import { kpis, alerts, centers, type Risk } from "@/lib/mock-data";
import { RiskBadge, SectionTitle } from "@/components/platform/ui";
import { Sparkline } from "@/components/platform/charts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

const kpiIcons = { alert: AlertTriangle, box: Boxes, swap: ArrowLeftRight, check: CheckCircle2 } as const;
const alertEmoji: Record<Risk, string> = { alto: "🔴", medio: "🟠", bajo: "🟢" };

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm font-semibold text-muted-foreground">Buenos días, Ana 👋</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground lg:text-3xl">
          Centro de control inteligente
        </h1>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 text-primary-foreground shadow-brand lg:p-10">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Pythia en tiempo real
          </span>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight lg:text-4xl">
            Pythia detectó posibles faltantes antes del despacho
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/85 lg:text-base">
            18 pedidos en riesgo. Pythia ya preparó las mejores sustituciones para que el cliente conserve el control.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-background px-5 py-3 text-sm font-bold text-primary shadow-soft transition-transform hover:scale-[1.02]">
            Revisar sustituciones <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <img
          src={heroImg}
          alt="Centro de distribución logístico"
          width={1280}
          height={960}
          className="pointer-events-none absolute -right-6 bottom-0 hidden w-[46%] max-w-2xl rounded-2xl opacity-95 mix-blend-luminosity lg:block"
        />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = kpiIcons[k.icon as keyof typeof kpiIcons];
          return (
            <div key={k.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-2xl",
                    k.tone === "alto" && "bg-destructive/10 text-destructive",
                    k.tone === "medio" && "bg-warning/12 text-warning",
                    k.tone === "bajo" && "bg-success/12 text-success",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <RiskBadge risk={k.tone} label={k.delta} />
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">{k.value}</p>
              <p className="mt-0.5 text-sm font-medium text-muted-foreground">{k.label}</p>
            </div>
          );
        })}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* MAPA OPERATIVO */}
        <section className="lg:col-span-3">
          <SectionTitle title="Mapa operativo" subtitle="Centros de distribución monitoreados en vivo" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="relative h-[320px] w-full rounded-2xl bg-secondary/60">
              <div
                className="absolute inset-0 rounded-2xl opacity-[0.5]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              {centers.map((c) => (
                <div key={c.id} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                  <div className="group relative -translate-x-1/2 -translate-y-1/2">
                    <span
                      className={cn(
                        "block h-3.5 w-3.5 rounded-full ring-4",
                        c.status === "alto" && "bg-destructive ring-destructive/25 animate-pulse-ring",
                        c.status === "medio" && "bg-warning ring-warning/25",
                        c.status === "bajo" && "bg-success ring-success/25",
                      )}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-6 z-10 w-44 -translate-x-1/2 rounded-xl border border-border bg-card p-2.5 text-center opacity-0 shadow-card transition-opacity group-hover:opacity-100">
                      <p className="flex items-center justify-center gap-1 text-xs font-bold text-foreground">
                        <MapPin className="h-3 w-3 text-primary" /> {c.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{c.ordersAtRisk} pedidos en riesgo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {centers.map((c) => (
                <div key={c.id} className="flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2">
                  <RiskBadge risk={c.status} label={c.name.replace("CEDIS ", "")} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALERTAS */}
        <section className="lg:col-span-2">
          <SectionTitle title="Alertas inteligentes" subtitle="Detección automática" />
          <div className="space-y-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-card"
              >
                <span className="text-xl">{alertEmoji[a.level]}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-foreground">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.detail}</p>
                  <p className="mt-2 text-[11px] font-medium text-muted-foreground/70">{a.time}</p>
                </div>
              </div>
            ))}
            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
              <div className="mb-1 flex items-center gap-2 text-sm font-bold text-foreground">
                <TrendingDown className="h-4 w-4 text-primary" /> Tendencia de faltantes (7 días)
              </div>
              <Sparkline data={[8, 11, 9, 14, 12, 16, 18]} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
