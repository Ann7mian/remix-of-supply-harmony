import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Check,
  RefreshCw,
  Clock,
  ArrowLeft,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Plug,
  Star,
  Brain,
  Plus,
  Gauge,
  Camera,
  Pencil,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ViewSwitcher } from "@/components/platform/ViewSwitcher";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import pythiaBot from "@/assets/pythia-bot.png";
import pythiaAvatar from "@/assets/pythia-avatar.png";

export const Route = createFileRoute("/portal")({
  component: Portal,
});

type Decision = null | "aceptado" | "otra" | "esperar";
type CaptureMethod = null | "pos" | "manual" | "scan";

function Portal() {
  const [decision, setDecision] = useState<Decision>(null);
  const [inventoryConnected, setInventoryConnected] = useState(false);
  const [captureMethod, setCaptureMethod] = useState<CaptureMethod>(null);
  const [orderDelivered, setOrderDelivered] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo compact />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Salir
            </Link>
          </div>
        </div>

        <ViewSwitcher className="mt-4 self-start" />

        {/* Saludo */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-muted-foreground">Hola, Doña Chole 👋</p>
          <h1 className="mt-0.5 text-xl font-extrabold tracking-tight text-foreground">Tu pedido necesita validación</h1>
        </div>

        <Tabs defaultValue="pedido" className="mt-4">
          <TabsList
            className={cn(
              "grid h-auto w-full gap-1 rounded-2xl bg-muted p-1",
              inventoryConnected ? "grid-cols-4" : "grid-cols-2",
            )}
          >
            <TabsTrigger value="pedido" className="rounded-xl py-2 text-xs font-semibold">Pedido</TabsTrigger>
            <TabsTrigger value="inventario" className="rounded-xl py-2 text-xs font-semibold">Inventario</TabsTrigger>
            {inventoryConnected && (
              <>
                <TabsTrigger value="oportunidades" className="rounded-xl py-2 text-xs font-semibold">Crecer</TabsTrigger>
                <TabsTrigger value="encuesta" className="rounded-xl py-2 text-xs font-semibold">Encuesta</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* ===== Pedido (flujo original sin cambios) ===== */}
          <TabsContent value="pedido" className="mt-4">
            {/* Notificación */}
            <div className="flex items-center gap-3 rounded-3xl bg-gradient-brand p-4 text-primary-foreground shadow-brand">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/15">
                <Bell className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Un producto no está disponible</p>
                <p className="text-xs text-primary-foreground/85">Pythia ya te aseguró una alternativa.</p>
              </div>
            </div>

            {decision === null ? (
              <>
                {/* Tarjeta morada: Pythia Bot habla en primera persona */}
                <div className="mt-5 overflow-hidden rounded-3xl bg-gradient-ai p-5 text-ai-foreground shadow-ai">
                  <div className="flex items-start gap-3">
                    <img
                      src={pythiaBot}
                      alt="Pythia Bot"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 drop-shadow animate-float-slow"
                    />
                    <div>
                      <p className="text-sm font-bold">Pythia Bot</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ai-foreground/95">
                        “¡Hola! Noté que no alcanzamos Fanta para tu pedido, pero como sé que a tus clientes les
                        encantan los sabores cítricos, ya te aseguré Sprite de 600 ml. ¡Tu negocio no se detiene!”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Producto vs alternativa */}
                <div className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-secondary/60 p-4 text-center">
                      <span className="text-3xl">🥤</span>
                      <p className="mt-2 text-sm font-bold text-foreground">Fanta 600 ml</p>
                      <p className="text-xs font-semibold text-destructive">No disponible</p>
                    </div>
                    <div className="rounded-2xl bg-ai-soft p-4 text-center ring-2 ring-ai/30">
                      <span className="text-3xl">🟢</span>
                      <p className="mt-2 text-sm font-bold text-foreground">Sprite 600 ml</p>
                      <p className="text-xs font-semibold text-ai">Sugerido por Pythia</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-ai-soft/70 p-3 text-sm text-foreground">
                    <img src={pythiaAvatar} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0" />
                    <span>
                      Elegí <strong>Sprite</strong> por tu preferencia de sabores cítricos.{" "}
                      <strong className="text-ai">92% compatible.</strong>
                    </span>
                  </div>
                </div>

                {/* Botones grandes */}
                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => {
                      setDecision("aceptado");
                      setOrderDelivered(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand py-4 text-base font-bold text-primary-foreground shadow-brand transition-transform active:scale-[0.98]"
                  >
                    <Check className="h-5 w-5" /> Aceptar Sprite 600 ml
                  </button>
                  <button
                    onClick={() => setDecision("otra")}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-base font-bold text-foreground transition-transform active:scale-[0.98]"
                  >
                    <RefreshCw className="h-5 w-5 text-muted-foreground" /> Elegir otra opción
                  </button>
                  <button
                    onClick={() => setDecision("esperar")}
                    className="flex w-full items-center justify-center gap-1.5 py-2 text-sm font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    <Clock className="h-4 w-4" /> Esperar reposición
                  </button>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Tú conservas el control de la decisión.
                </p>
              </>
            ) : (
              <Confirmation decision={decision} onReset={() => setDecision(null)} />
            )}
          </TabsContent>

          {/* ===== Inventario Conectado ===== */}
          <TabsContent value="inventario" className="mt-4">
            {inventoryConnected ? (
              <InventoryPanel />
            ) : captureMethod === null ? (
              <InventoryMethodChooser onSelect={setCaptureMethod} />
            ) : captureMethod === "pos" ? (
              <ConnectInventory
                onConnect={() => setInventoryConnected(true)}
                onBack={() => setCaptureMethod(null)}
              />
            ) : captureMethod === "manual" ? (
              <ManualCapture
                onSave={() => setInventoryConnected(true)}
                onBack={() => setCaptureMethod(null)}
              />
            ) : (
              <ScanNotebook
                onSave={() => setInventoryConnected(true)}
                onBack={() => setCaptureMethod(null)}
              />
            )}
          </TabsContent>


          {/* ===== Oportunidades de crecimiento ===== */}
          {inventoryConnected && (
            <TabsContent value="oportunidades" className="mt-4">
              <GrowthPanel />
            </TabsContent>
          )}

          {/* ===== Encuesta de satisfacción ===== */}
          {inventoryConnected && (
            <TabsContent value="encuesta" className="mt-4">
              {orderDelivered && !surveyDone ? (
                <SurveyPanel onDone={() => setSurveyDone(true)} />
              ) : (
                <SurveyEmpty done={surveyDone} />
              )}
              <ContinuousLearningCard />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

function Confirmation({ decision, onReset }: { decision: Exclude<Decision, null>; onReset: () => void }) {
  const map = {
    aceptado: { icon: Check, color: "bg-success/12 text-success", title: "¡Sustitución aceptada!", text: "Tu pedido sale con Sprite 600 ml. Llega hoy mismo." },
    otra: { icon: RefreshCw, color: "bg-ai-soft text-ai", title: "Veamos otras opciones", text: "Pythia te mostrará alternativas compatibles con tus preferencias." },
    esperar: { icon: Clock, color: "bg-warning/12 text-warning", title: "Reposición programada", text: "Pythia te avisará en cuanto Fanta 600 ml esté disponible." },
  } as const;
  const item = map[decision];
  const Icon = item.icon;
  return (
    <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
      <img src={pythiaBot} alt="Pythia Bot" width={96} height={96} loading="lazy" className="h-24 w-24 drop-shadow animate-float-slow" />
      <span className={cn("mt-4 grid h-16 w-16 place-items-center rounded-3xl", item.color)}>
        <Icon className="h-8 w-8" />
      </span>
      <h2 className="mt-4 text-xl font-extrabold text-foreground">{item.title}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{item.text}</p>
      <button
        onClick={onReset}
        className="mt-8 rounded-2xl bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
      >
        Volver
      </button>
    </div>
  );
}

/* ============ Inventario Conectado ============ */

function ConnectInventory({ onConnect, onBack }: { onConnect: () => void; onBack?: () => void }) {
  const benefits = [
    { icon: AlertTriangle, label: "Alertas de agotamiento" },
    { icon: RefreshCw, label: "Reposición inteligente" },
    { icon: Sparkles, label: "Recomendaciones personalizadas" },
    { icon: TrendingUp, label: "Oportunidades de crecimiento" },
  ];
  return (
    <div className="space-y-4">
      {onBack && <BackToMethods onBack={onBack} />}
      <div className="overflow-hidden rounded-3xl bg-gradient-ai p-5 text-ai-foreground shadow-ai">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/15">
            <Plug className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold">Inventario Conectado</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ai-foreground/95">
              Conecta tu sistema de ventas para recibir recomendaciones más precisas y oportunidades de crecimiento personalizadas.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm font-bold text-foreground">Beneficios</p>
        <ul className="mt-3 space-y-3">
          {benefits.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-3 py-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-ai-soft text-ai">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onConnect}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand py-4 text-base font-bold text-primary-foreground shadow-brand transition-transform active:scale-[0.98]"
      >
        <Plug className="h-5 w-5" /> Conectar sistema
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Opcional. Puedes seguir usando Pythia sin conectar tu inventario.
      </p>
    </div>
  );
}

function InventoryPanel() {
  const topRotation = [
    { name: "Coca-Cola 600 ml", units: 320 },
    { name: "Ciel 1 L", units: 240 },
    { name: "Powerade Mora 500 ml", units: 180 },
  ];
  const lowRotation = [
    { name: "Fresca 355 ml", units: 12 },
    { name: "Del Valle Mango 413 ml", units: 9 },
  ];
  const soonOut = [
    { name: "Sprite 600 ml", units: 6 },
    { name: "Coca-Cola Sin Azúcar 600 ml", units: 4 },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-ai" />
          <p className="text-sm font-bold text-foreground">Inventario actual</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Stat label="SKUs" value="48" />
          <Stat label="Unidades" value="1,240" />
          <Stat label="Por agotarse" value="3" tone="warning" />
        </div>
      </div>

      <ProductList
        title="Mayor rotación"
        icon={TrendingUp}
        items={topRotation}
        unitLabel="vendidas / sem"
        tone="success"
      />
      <ProductList
        title="Menor rotación"
        icon={TrendingDown}
        items={lowRotation}
        unitLabel="vendidas / sem"
        tone="muted"
      />
      <ProductList
        title="Próximos a agotarse"
        icon={AlertTriangle}
        items={soonOut}
        unitLabel="en piso"
        tone="warning"
      />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-ai" />
          <p className="text-sm font-bold text-foreground">Tendencia de ventas</p>
        </div>
        <Sparkline />
        <p className="mt-2 text-xs text-muted-foreground">
          +12% vs. semana anterior. Pico los viernes por la tarde.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "warning" }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <p className={cn("text-xl font-extrabold", tone === "warning" ? "text-warning" : "text-foreground")}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function ProductList({
  title,
  icon: Icon,
  items,
  unitLabel,
  tone,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; units: number }[];
  unitLabel: string;
  tone: "success" | "warning" | "muted";
}) {
  const toneClass =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-muted-foreground";
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", toneClass)} />
        <p className="text-sm font-bold text-foreground">{title}</p>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((p) => (
          <li key={p.name} className="flex items-center justify-between rounded-2xl bg-secondary/60 px-3 py-2.5">
            <span className="text-sm font-semibold text-foreground">{p.name}</span>
            <span className={cn("text-xs font-bold", toneClass)}>
              {p.units} {unitLabel}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sparkline() {
  const points = [12, 18, 14, 22, 20, 28, 34];
  const max = Math.max(...points);
  return (
    <div className="mt-3 flex h-20 items-end gap-1.5">
      {points.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-brand"
          style={{ height: `${(v / max) * 100}%` }}
          aria-hidden
        />
      ))}
    </div>
  );
}

/* ============ Oportunidades de Crecimiento ============ */

function GrowthPanel() {
  const recommendations = [
    {
      text: "Negocios similares en tu zona venden más incorporando Coca-Cola Sin Azúcar.",
      impact: "+8% ingresos",
      confidence: 87,
    },
    {
      text: "Sprite 600 ml presenta una demanda superior al promedio en tu región.",
      impact: "+15 cajas/mes",
      confidence: 92,
    },
    {
      text: "Existe oportunidad de ampliar tu catálogo con productos de alta rotación.",
      impact: "+12% ticket",
      confidence: 78,
    },
  ];
  return (
    <div className="space-y-4">
      <GrowthScoreCard score={74} />

      <div className="space-y-3">
        {recommendations.map((r, i) => (
          <div key={i} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-ai-soft text-ai">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-foreground">{r.text}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                Impacto: {r.impact}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                Confianza: {r.confidence}%
              </Badge>
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand py-3 text-sm font-bold text-primary-foreground shadow-brand transition-transform active:scale-[0.98]">
              <Plus className="h-4 w-4" /> Agregar al próximo pedido
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Basado en datos agregados y anonimizados de la red.
      </p>
    </div>
  );
}

function GrowthScoreCard({ score }: { score: number }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-brand p-5 text-primary-foreground shadow-brand">
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4" />
        <p className="text-sm font-bold">Potencial de Crecimiento</p>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <p className="text-5xl font-extrabold leading-none">{score}</p>
        <p className="pb-1 text-sm font-semibold text-primary-foreground/80">/ 100</p>
      </div>
      <Progress value={score} className="mt-4 h-2 bg-white/20" />
      <ul className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-primary-foreground/90">
        <li>• Rotación</li>
        <li>• Diversidad de catálogo</li>
        <li>• Tendencias locales</li>
        <li>• Oportunidades detectadas</li>
      </ul>
    </div>
  );
}

/* ============ Encuesta de Satisfacción ============ */

function SurveyPanel({ onDone }: { onDone: () => void }) {
  const [received, setReceived] = useState<boolean | null>(null);
  const [substitution, setSubstitution] = useState<boolean | null>(null);
  const [onTime, setOnTime] = useState<boolean | null>(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-ai p-5 text-ai-foreground shadow-ai">
        <div className="flex items-start gap-3">
          <img src={pythiaBot} alt="" width={48} height={48} className="h-12 w-12 shrink-0 drop-shadow" />
          <div>
            <p className="text-sm font-bold">¿Cómo nos fue?</p>
            <p className="mt-1 text-sm text-ai-foreground/95">
              Tu opinión ayuda a Pythia a mejorar tus próximas recomendaciones.
            </p>
          </div>
        </div>
      </div>

      <YesNoQuestion label="¿Recibiste tu pedido completo?" value={received} onChange={setReceived} />
      <YesNoQuestion label="¿La sustitución sugerida fue adecuada?" value={substitution} onChange={setSubstitution} />
      <YesNoQuestion label="¿La entrega llegó a tiempo?" value={onTime} onChange={setOnTime} />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm font-bold text-foreground">Calificación general</p>
        <div className="mt-3 flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStars(n)}
              className="p-1 transition-transform active:scale-90"
              aria-label={`${n} estrellas`}
            >
              <Star
                className={cn(
                  "h-8 w-8",
                  n <= stars ? "fill-warning text-warning" : "text-muted-foreground/40",
                )}
              />
            </button>
          ))}
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comentarios (opcional)"
          className="mt-4 rounded-2xl"
        />
      </div>

      <button
        onClick={onDone}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand py-4 text-base font-bold text-primary-foreground shadow-brand transition-transform active:scale-[0.98]"
      >
        <Check className="h-5 w-5" /> Enviar respuestas
      </button>
    </div>
  );
}

function YesNoQuestion({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange(true)}
          className={cn(
            "rounded-2xl border py-2.5 text-sm font-bold transition-colors",
            value === true
              ? "border-transparent bg-success/15 text-success"
              : "border-border bg-secondary/60 text-foreground hover:bg-muted",
          )}
        >
          Sí
        </button>
        <button
          onClick={() => onChange(false)}
          className={cn(
            "rounded-2xl border py-2.5 text-sm font-bold transition-colors",
            value === false
              ? "border-transparent bg-destructive/15 text-destructive"
              : "border-border bg-secondary/60 text-foreground hover:bg-muted",
          )}
        >
          No
        </button>
      </div>
    </div>
  );
}

function SurveyEmpty({ done }: { done: boolean }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-ai-soft text-ai">
        <Star className="h-7 w-7" />
      </span>
      <p className="mt-3 text-sm font-bold text-foreground">
        {done ? "¡Gracias por tu opinión!" : "Sin pedidos pendientes por evaluar"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {done
          ? "Pythia ya está aprendiendo de tu respuesta."
          : "Te enviaremos una encuesta cuando se entregue tu próximo pedido."}
      </p>
    </div>
  );
}

function ContinuousLearningCard() {
  return (
    <div className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ai-soft text-ai">
          <Brain className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">Aprendizaje continuo</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pythia aprende continuamente de tus decisiones y comentarios para mejorar futuras recomendaciones.
          </p>
        </div>
      </div>
    </div>
  );
}
