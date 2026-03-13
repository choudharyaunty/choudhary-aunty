import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Bell,
  Brain,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  DollarSign,
  Eye,
  Fingerprint,
  Flame,
  Info,
  Lock,
  MapPin,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const AUTH_KEY = "intelligence_auth";
const CORRECT_PASSWORD = "amar2026";

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATED DATA
// ─────────────────────────────────────────────────────────────────────────────

const PVI_SCORE = 72;
const PVI_SUB_SCORES = [
  { name: "GMV Growth", score: 78 },
  { name: "Aunty Activity", score: 65 },
  { name: "Customer Retention", score: 71 },
  { name: "Batch Health", score: 80 },
  { name: "Quality Score", score: 82 },
  { name: "Community Engagement", score: 58 },
];

const ALERTS = [
  {
    id: 1,
    level: "critical" as const,
    message: "GMV declined 18% WoW in Patna zone — investigate demand drop",
    time: "2 hours ago",
    resolved: false,
  },
  {
    id: 2,
    level: "critical" as const,
    message:
      "Aunty Babita Tai has not accepted batch CA-BIO-2026-007 — batch closes in 6 hours",
    time: "4 hours ago",
    resolved: false,
  },
  {
    id: 3,
    level: "warning" as const,
    message:
      "Quality score for Coconut Laddoo (Anju Maasi) dropped from 4.8 to 4.3 over 4 weeks",
    time: "6 hours ago",
    resolved: false,
  },
  {
    id: 4,
    level: "warning" as const,
    message: "Revenue concentration risk: Top 2 aunties = 67% of total GMV",
    time: "8 hours ago",
    resolved: false,
  },
  {
    id: 5,
    level: "warning" as const,
    message: "Refund rate spiked to 4.2% this week — above 3% threshold",
    time: "10 hours ago",
    resolved: false,
  },
  {
    id: 6,
    level: "warning" as const,
    message: "12 customers moved from Champions to At-Risk segment this week",
    time: "12 hours ago",
    resolved: false,
  },
  {
    id: 7,
    level: "info" as const,
    message: "Diwali is 14 days away — 3 product categories expected to spike",
    time: "1 day ago",
    resolved: false,
  },
  {
    id: 8,
    level: "info" as const,
    message:
      "New aunty application from Mithila region pending approval — skills: Sweets",
    time: "1 day ago",
    resolved: false,
  },
];

const GMV_CHART_DATA = [
  { week: "W1", actual: 18200, forecast: null },
  { week: "W2", actual: 21500, forecast: null },
  { week: "W3", actual: 19800, forecast: null },
  { week: "W4", actual: 24600, forecast: null },
  { week: "W5", actual: 22100, forecast: null },
  { week: "W6", actual: 26800, forecast: null },
  { week: "W7", actual: 29200, forecast: null },
  { week: "W8", actual: 31000, forecast: null },
  { week: "W9", actual: null, forecast: 33500 },
  { week: "W10", actual: null, forecast: 38000 },
  { week: "W11", actual: null, forecast: 42800 },
  { week: "W12", actual: null, forecast: 48700 },
];

const CHURN_DATA = [
  {
    name: "Sarla Maasi",
    risk: 72,
    reason: "No order in 28 days",
    initials: "SM",
  },
  {
    name: "Preetkaur Aunty",
    risk: 45,
    reason: "Batch fill declining",
    initials: "PA",
  },
  {
    name: "Geeta Devi",
    risk: 12,
    reason: "Active and growing",
    initials: "GD",
  },
  {
    name: "Anju Choudhary",
    risk: 4,
    reason: "Platform top performer",
    initials: "AC",
  },
  {
    name: "Babita Tai",
    risk: 8,
    reason: "High retention customer",
    initials: "BT",
  },
];

const REORDER_SEGMENTS = [
  { segment: "Champions", pct: 89 },
  { segment: "Loyal", pct: 74 },
  { segment: "Potential", pct: 52 },
  { segment: "At-Risk", pct: 23 },
  { segment: "Lost", pct: 8 },
];

const DEMAND_SKU = [
  {
    sku: "Coconut Laddoo (Meva Premium)",
    current: 48,
    predicted: 62,
    trend: "up",
  },
  { sku: "Namakpara (Diamond Cut)", current: 35, predicted: 38, trend: "up" },
  { sku: "Gulab Khaja", current: 42, predicted: 39, trend: "down" },
  { sku: "Guddamma", current: 21, predicted: 21, trend: "stable" },
  { sku: "Chura Bhunja Premium", current: 29, predicted: 35, trend: "up" },
  { sku: "Meethapara", current: 18, predicted: 14, trend: "down" },
];

const AIS_AUNTIES = [
  {
    name: "Anju Choudhary",
    initials: "AC",
    score: 91,
    completion: 94,
    quality: 96,
    repeat: 88,
    batchFill: 91,
    response: 89,
    badge: "Stable" as const,
    color: "#10b981",
  },
  {
    name: "Babita Tai",
    initials: "BT",
    score: 84,
    completion: 87,
    quality: 88,
    repeat: 79,
    batchFill: 83,
    response: 82,
    badge: "Rising Star" as const,
    color: "#f59e0b",
  },
  {
    name: "Sarla Maasi",
    initials: "SM",
    score: 52,
    completion: 58,
    quality: 61,
    repeat: 44,
    batchFill: 51,
    response: 47,
    badge: "Needs Attention" as const,
    color: "#ef4444",
  },
  {
    name: "Preetkaur Aunty",
    initials: "PA",
    score: 71,
    completion: 74,
    quality: 76,
    repeat: 68,
    batchFill: 70,
    response: 66,
    badge: "Stable" as const,
    color: "#10b981",
  },
  {
    name: "Geeta Devi",
    initials: "GD",
    score: 88,
    completion: 91,
    quality: 90,
    repeat: 84,
    batchFill: 88,
    response: 86,
    badge: "Rising Star" as const,
    color: "#f59e0b",
  },
  {
    name: "Meena Devi",
    initials: "MD",
    score: 63,
    completion: 67,
    quality: 65,
    repeat: 60,
    batchFill: 62,
    response: 61,
    badge: "Stable" as const,
    color: "#10b981",
  },
];

const BATCH_FORECAST = [
  {
    product: "Coconut Laddoo (Meva Premium)",
    region: "Mithila",
    orders: 14,
    capacity: 20,
    fill: 87,
    recommended: "18 kg",
    day: "Tuesday",
    risk: "On Track",
  },
  {
    product: "Namakpara (Diamond Cut)",
    region: "Bhojpur",
    orders: 8,
    capacity: 20,
    fill: 62,
    recommended: "16 kg",
    day: "Monday",
    risk: "At Risk",
  },
  {
    product: "Gulab Khaja",
    region: "Magadh",
    orders: 5,
    capacity: 20,
    fill: 38,
    recommended: "12 kg",
    day: "Thursday",
    risk: "Likely Fail",
  },
  {
    product: "Guddamma",
    region: "Mithila",
    orders: 16,
    capacity: 20,
    fill: 91,
    recommended: "20 kg",
    day: "Wednesday",
    risk: "On Track",
  },
  {
    product: "Chura Bhunja Premium",
    region: "Bhojpur",
    orders: 11,
    capacity: 20,
    fill: 74,
    recommended: "16 kg",
    day: "Friday",
    risk: "On Track",
  },
  {
    product: "Meethapara",
    region: "Magadh",
    orders: 7,
    capacity: 20,
    fill: 48,
    recommended: "12 kg",
    day: "Tuesday",
    risk: "At Risk",
  },
  {
    product: "Coconut Laddoo (Basic)",
    region: "Mithila",
    orders: 18,
    capacity: 20,
    fill: 96,
    recommended: "20 kg",
    day: "Monday",
    risk: "On Track",
  },
  {
    product: "Chura Bhunja Basic",
    region: "Bhojpur",
    orders: 4,
    capacity: 20,
    fill: 28,
    recommended: "10 kg",
    day: "Saturday",
    risk: "Likely Fail",
  },
];

const FESTIVALS = [
  {
    name: "Navratri",
    daysAway: 8,
    spike: 42,
    categories: ["Fasting Foods", "Sabudana", "Sweets"],
    action: "Activate Navratri fasting SKUs, push Vrat-friendly variants",
    color: "#f97316",
  },
  {
    name: "Diwali",
    daysAway: 14,
    spike: 85,
    categories: ["Sweets", "Namkeen", "Gift Boxes"],
    action: "Start promoting Sweets SKUs now — onboard 2 more aunties",
    color: "#f59e0b",
  },
  {
    name: "Bhai Dooj",
    daysAway: 16,
    spike: 31,
    categories: ["Sweets", "Traditional Mithai"],
    action: "Promote traditional Bihar sweets for gifting",
    color: "#84cc16",
  },
  {
    name: "Chhath Puja",
    daysAway: 22,
    spike: 67,
    categories: ["Thekua", "Prasad Items", "Puffed Rice"],
    action: "Prepare Chhath-special SKU bundle — Bihar-exclusive",
    color: "#06b6d4",
  },
  {
    name: "Christmas",
    daysAway: 45,
    spike: 18,
    categories: ["Plum Cake", "Sweets"],
    action: "Cross-cultural gifting opportunity — limited edition",
    color: "#8b5cf6",
  },
];

const AUTHENTICITY_SKUS = [
  {
    sku: "Coconut Laddoo (Mithila Style)",
    score: 97,
    ingredientMatch: 98,
    methodCompliance: 96,
    regionalOrigin: 98,
    homeKitchen: 97,
  },
  {
    sku: "Thekua (Traditional)",
    score: 94,
    ingredientMatch: 95,
    methodCompliance: 93,
    regionalOrigin: 96,
    homeKitchen: 93,
  },
  {
    sku: "Gulab Khaja",
    score: 91,
    ingredientMatch: 92,
    methodCompliance: 90,
    regionalOrigin: 93,
    homeKitchen: 91,
  },
  {
    sku: "Namakpara Diamond Cut",
    score: 88,
    ingredientMatch: 89,
    methodCompliance: 88,
    regionalOrigin: 86,
    homeKitchen: 90,
  },
  {
    sku: "Guddamma Mango Jaggery",
    score: 84,
    ingredientMatch: 86,
    methodCompliance: 83,
    regionalOrigin: 85,
    homeKitchen: 84,
  },
  {
    sku: "Chura Bhunja Premium",
    score: 79,
    ingredientMatch: 80,
    methodCompliance: 78,
    regionalOrigin: 81,
    homeKitchen: 76,
  },
];

const TASTE_SEGMENTS = [
  {
    name: "Spice Seekers",
    pct: 32,
    love: "Achar, Namakpara, Nimki",
    orderFreq: "2.1x/month",
    nudge:
      "🌶️ Anju Maasi's batch of Mixed Achar opens Friday — limited 2 kg batches. Don't miss!",
    nextOrder: "Mixed Achar — Anju Maasi (₹380)",
    color: "#ef4444",
  },
  {
    name: "Sweet Lovers",
    pct: 28,
    love: "Coconut Laddoo, Gulab Khaja, Meethapara",
    orderFreq: "1.8x/month",
    nudge:
      "🍬 Diwali is 14 days away — order your traditional sweets batch now before it sells out!",
    nextOrder: "Coconut Laddoo (Meva Premium) — Geeta Devi (₹520)",
    color: "#f59e0b",
  },
  {
    name: "Health Conscious",
    pct: 21,
    love: "Low Oil variants, Jain options, Chura Bhunja",
    orderFreq: "1.4x/month",
    nudge:
      "🥗 New Low Oil Chura Bhunja batch by Preetkaur Aunty — crafted for your lifestyle.",
    nextOrder: "Chura Bhunja Premium (Low Oil) — Preetkaur Aunty (₹460)",
    color: "#10b981",
  },
  {
    name: "Gift Buyers",
    pct: 19,
    love: "Assorted hampers, festival sweets, premium packaging",
    orderFreq: "1.2x/month",
    nudge:
      "🎁 Curate your Diwali gift hamper — 3 products, 2 aunties, hand-packed with love.",
    nextOrder: "Diwali Sweets Hamper — Anju Choudhary (₹980)",
    color: "#8b5cf6",
  },
];

const ZONES = [
  {
    name: "Patna Central",
    type: "red" as const,
    demand: 89,
    supply: 32,
    need: 4,
  },
  {
    name: "Muzaffarpur",
    type: "red" as const,
    demand: 74,
    supply: 28,
    need: 3,
  },
  { name: "Darbhanga", type: "red" as const, demand: 68, supply: 22, need: 3 },
  { name: "Gaya", type: "blue" as const, demand: 31, supply: 82, need: 0 },
  { name: "Bhagalpur", type: "blue" as const, demand: 28, supply: 71, need: 0 },
  { name: "Motihari", type: "blue" as const, demand: 35, supply: 68, need: 0 },
  {
    name: "Sitamarhi",
    type: "green" as const,
    demand: 58,
    supply: 62,
    need: 0,
  },
  {
    name: "Madhubani",
    type: "green" as const,
    demand: 71,
    supply: 69,
    need: 0,
  },
  {
    name: "Samastipur",
    type: "green" as const,
    demand: 64,
    supply: 67,
    need: 0,
  },
  { name: "Ara", type: "green" as const, demand: 48, supply: 51, need: 0 },
  {
    name: "Begusarai",
    type: "green" as const,
    demand: 52,
    supply: 55,
    need: 0,
  },
  { name: "Siwan", type: "green" as const, demand: 43, supply: 46, need: 0 },
];

const EARNINGS_OPTIMISER = [
  {
    name: "Anju Choudhary",
    initials: "AC",
    current: 14200,
    optimised: 19300,
    recs: [
      { action: "Add Namakpara to menu", impact: "+₹2,400/month", emoji: "🧆" },
      {
        action: "Open 2nd batch on Tuesday",
        impact: "+₹1,800/month",
        emoji: "📅",
      },
      {
        action: "Increase Coconut Laddoo batch to 6kg",
        impact: "+₹900/month",
        emoji: "🎯",
      },
    ],
    meaning: "could fund a child's school fees for 3 months",
  },
  {
    name: "Geeta Devi",
    initials: "GD",
    current: 9800,
    optimised: 13400,
    recs: [
      {
        action: "Launch Chhath Puja special SKU",
        impact: "+₹1,800/month",
        emoji: "🪔",
      },
      {
        action: "Add premium packaging tier",
        impact: "+₹1,200/month",
        emoji: "📦",
      },
      {
        action: "Join WhatsApp bulk buyer group",
        impact: "+₹600/month",
        emoji: "💬",
      },
    ],
    meaning: "covers monthly household grocery bill",
  },
  {
    name: "Babita Tai",
    initials: "BT",
    current: 7400,
    optimised: 10600,
    recs: [
      {
        action: "Offer Guddamma in premium tin",
        impact: "+₹1,400/month",
        emoji: "🥭",
      },
      {
        action: "Accept corporate gifting orders",
        impact: "+₹1,100/month",
        emoji: "🏢",
      },
      { action: "List Meethapara variant", impact: "+₹700/month", emoji: "🍬" },
    ],
    meaning: "pays for 2 months of electricity",
  },
];

const QUALITY_DATA = [
  {
    name: "Sarla Maasi",
    data: [4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.3],
    flagged: true,
    suggestion:
      "Reach out with recipe support offer — schedule a 20-min review call",
  },
  {
    name: "Anju Choudhary",
    data: [4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 4.8, 4.9],
    flagged: false,
    suggestion: null,
  },
  {
    name: "Geeta Devi",
    data: [4.5, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9],
    flagged: false,
    suggestion: null,
  },
  {
    name: "Babita Tai",
    data: [4.6, 4.6, 4.7, 4.6, 4.7, 4.8, 4.8, 4.8],
    flagged: false,
    suggestion: null,
  },
];

const COMMUNITY_BRIDGE = [
  {
    title: "Diwali Lakshmi Puja Guide",
    views: 342,
    category: "Sweets",
    predictedOrders: 12,
    conversion: 3.5,
  },
  {
    title: "Pregnancy Nutrition in Bihar",
    views: 287,
    category: "Health Foods",
    predictedOrders: 8,
    conversion: 2.8,
  },
  {
    title: "Traditional Coconut Mithai Recipes",
    views: 214,
    category: "Sweets",
    predictedOrders: 9,
    conversion: 4.2,
  },
  {
    title: "Navratri Fasting Foods Guide",
    views: 198,
    category: "Fasting Foods",
    predictedOrders: 11,
    conversion: 5.6,
  },
  {
    title: "Bihar's Chhath Prasad Traditions",
    views: 176,
    category: "Prasad Items",
    predictedOrders: 7,
    conversion: 4.0,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

function scoreBg(score: number) {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function riskColor(risk: string) {
  if (risk === "On Track")
    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (risk === "At Risk")
    return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <Icon className="w-5 h-5 text-amber-400" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white font-display">{title}</h2>
        {subtitle && (
          <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function MiniBar({
  label,
  value,
  color = "bg-amber-500",
}: { label: string; value: number; color?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

const WEEK_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

function QualitySparkline({
  data,
  flagged,
}: { data: number[]; flagged: boolean }) {
  const chartData = data.map((v, i) => ({ week: WEEK_LABELS[i], rating: v }));
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart
        data={chartData}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
      >
        <Line
          type="monotone"
          dataKey="rating"
          stroke={flagged ? "#ef4444" : "#10b981"}
          strokeWidth={2}
          dot={false}
        />
        <YAxis domain={[4.0, 5.0]} tick={{ fontSize: 8, fill: "#64748b" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD GATE
// ─────────────────────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (pw === CORRECT_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "true");
        onAuth();
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
    },
    [pw, onAuth],
  );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        animate={shaking ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
        data-ocid="intelligence.dialog"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
            <Brain className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display mb-1">
            Intelligence Hub
          </h1>
          <p className="text-slate-400 text-sm">
            Choudhary Aunty · Internal Access Only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="Enter access code"
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
              data-ocid="intelligence.input"
              autoFocus
            />
          </div>
          {error && (
            <p
              className="text-red-400 text-sm text-center"
              data-ocid="intelligence.error_state"
            >
              Incorrect access code. Please try again.
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            data-ocid="intelligence.submit_button"
          >
            Access Hub
          </Button>
        </form>

        <p className="text-slate-600 text-xs text-center mt-6">
          Authorised personnel only · All access is logged
        </p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

function IntelligenceDashboard() {
  const [resolvedAlerts, setResolvedAlerts] = useState<number[]>([]);
  const [expandedZones, setExpandedZones] = useState<string[]>([]);

  const activeAlerts = useMemo(
    () => ALERTS.filter((a) => !resolvedAlerts.includes(a.id)),
    [resolvedAlerts],
  );

  const criticalCount = activeAlerts.filter(
    (a) => a.level === "critical",
  ).length;

  const toggleZone = (name: string) =>
    setExpandedZones((prev) =>
      prev.includes(name) ? prev.filter((z) => z !== name) : [...prev, name],
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Brain className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white font-display leading-none">
                Intelligence Hub
              </h1>
              <p className="text-[10px] text-slate-500">
                Choudhary Aunty Platform · Internal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {criticalCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
                <Bell className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="text-red-400 text-xs font-bold">
                  {criticalCount} Critical
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
              <span className="text-slate-400 text-xs">PVI</span>
              <span
                className={`text-lg font-bold font-display ${scoreColor(PVI_SCORE)}`}
              >
                {PVI_SCORE}
              </span>
              <span className="text-slate-600 text-xs">/100</span>
              <span className="text-emerald-400 text-xs flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +4
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── Section 1: PVI ─────────────────────────────────────────── */}
        <section data-ocid="intelligence.pvi.section">
          <SectionHeader
            icon={Zap}
            title="Platform Vitality Index"
            subtitle="Composite platform health score updated weekly"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gauge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <svg
                  viewBox="0 0 140 140"
                  className="w-full h-full -rotate-90"
                  role="img"
                  aria-label="Platform Vitality Index gauge"
                >
                  <circle
                    cx="70"
                    cy="70"
                    r="56"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="56"
                    fill="none"
                    stroke={
                      PVI_SCORE >= 70
                        ? "#10b981"
                        : PVI_SCORE >= 50
                          ? "#f59e0b"
                          : "#ef4444"
                    }
                    strokeWidth="12"
                    strokeDasharray={`${(PVI_SCORE / 100) * 351.86} 351.86`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-4xl font-bold font-display ${scoreColor(PVI_SCORE)}`}
                  >
                    {PVI_SCORE}
                  </span>
                  <span className="text-slate-500 text-xs">/ 100</span>
                </div>
              </div>
              <p className="text-emerald-400 text-sm font-medium mt-3 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +4 points from last week
              </p>
            </div>

            {/* Sub-scores */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-slate-400 text-sm mb-5">
                Sub-score Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PVI_SUB_SCORES.map((s) => (
                  <div key={s.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">{s.name}</span>
                      <span
                        className={`text-sm font-bold font-display ${scoreColor(s.score)}`}
                      >
                        {s.score}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${scoreBg(s.score)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Critical Alerts ────────────────────────────── */}
        <section data-ocid="intelligence.alerts.section">
          <SectionHeader
            icon={Bell}
            title="Critical Alerts Engine"
            subtitle={`${activeAlerts.length} active alerts requiring attention`}
          />
          <div className="space-y-2">
            <AnimatePresence>
              {activeAlerts.map((alert, i) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16, height: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-slate-900 border-l-4 ${
                    alert.level === "critical"
                      ? "border-red-500"
                      : alert.level === "warning"
                        ? "border-amber-500"
                        : "border-blue-400"
                  } border-y border-r border-slate-800`}
                  data-ocid={`intelligence.alerts.item.${i + 1}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {alert.level === "critical" && (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    {alert.level === "warning" && (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                    {alert.level === "info" && (
                      <Info className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                        alert.level === "critical"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : alert.level === "warning"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {alert.level}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setResolvedAlerts((p) => [...p, alert.id])}
                      className="h-7 text-xs border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 bg-transparent"
                      data-ocid={`intelligence.alerts.resolve_button.${i + 1}`}
                    >
                      Resolve
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {activeAlerts.length === 0 && (
              <div
                className="flex items-center justify-center gap-2 py-8 text-emerald-400"
                data-ocid="intelligence.alerts.empty_state"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">
                  All alerts resolved — platform is healthy
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── Section 3: Predictive Models ──────────────────────────── */}
        <section data-ocid="intelligence.predictions.section">
          <SectionHeader
            icon={Target}
            title="Predictive Models"
            subtitle="AI-driven forecasts based on historical patterns"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GMV Forecast */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-1">
                GMV Forecast
              </h3>
              <div className="flex gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500">30-day</p>
                  <p className="text-lg font-bold text-amber-400 font-display">
                    ₹1.24L
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">60-day</p>
                  <p className="text-lg font-bold text-amber-400 font-display">
                    ₹2.87L
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={GMV_CHART_DATA}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [
                      `₹${(v / 1000).toFixed(1)}k`,
                      "",
                    ]}
                  />
                  <Bar dataKey="actual" name="Actual" radius={[3, 3, 0, 0]}>
                    {GMV_CHART_DATA.map((d) => (
                      <Cell
                        key={`${d.week}-actual`}
                        fill={d.actual !== null ? "#10b981" : "transparent"}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="forecast" name="Forecast" radius={[3, 3, 0, 0]}>
                    {GMV_CHART_DATA.map((d) => (
                      <Cell
                        key={`${d.week}-forecast`}
                        fill={d.forecast !== null ? "#f59e0b" : "transparent"}
                        opacity={0.7}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Based on order
                trends + Diwali festival demand
              </p>
            </div>

            {/* Aunty Churn Risk */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">
                Aunty Churn Risk
              </h3>
              <div className="space-y-3">
                {CHURN_DATA.map((a, i) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-3"
                    data-ocid={`intelligence.churn.item.${i + 1}`}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{
                        background:
                          a.risk >= 70
                            ? "#ef4444"
                            : a.risk >= 40
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    >
                      {a.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-300">{a.name}</span>
                        <span
                          className={`text-sm font-bold font-display ${
                            a.risk >= 70
                              ? "text-red-400"
                              : a.risk >= 40
                                ? "text-amber-400"
                                : "text-emerald-400"
                          }`}
                        >
                          {a.risk}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            a.risk >= 70
                              ? "bg-red-500"
                              : a.risk >= 40
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                          style={{ width: `${a.risk}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {a.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reorder Probability */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">
                Customer Reorder Probability
              </h3>
              <div className="space-y-3">
                {REORDER_SEGMENTS.map((s, i) => (
                  <div
                    key={s.segment}
                    data-ocid={`intelligence.reorder.item.${i + 1}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-300">
                        {s.segment}
                      </span>
                      <span
                        className={`text-sm font-bold font-display ${scoreColor(s.pct)}`}
                      >
                        {s.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreBg(s.pct)}`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Top reorder
                trigger: Coconut Laddoo after first Achar order
              </p>
            </div>

            {/* Demand Forecast per SKU */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">
                Demand Forecast per SKU
              </h3>
              <div className="space-y-2.5">
                {DEMAND_SKU.map((sku, i) => (
                  <div
                    key={sku.sku}
                    className="flex items-center gap-3"
                    data-ocid={`intelligence.demand.item.${i + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate">
                        {sku.sku}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        This week: {sku.current} orders
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={`text-sm font-bold font-display ${
                          sku.trend === "up"
                            ? "text-emerald-400"
                            : sku.trend === "down"
                              ? "text-red-400"
                              : "text-slate-400"
                        }`}
                      >
                        {sku.predicted}
                      </p>
                      <p className="text-[10px] text-slate-500">predicted</p>
                    </div>
                    {sku.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {sku.trend === "down" && (
                      <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    {sku.trend === "stable" && (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: AIS ────────────────────────────────────────── */}
        <section data-ocid="intelligence.ais.section">
          <SectionHeader
            icon={Users}
            title="Aunty Intelligence Score (AIS)"
            subtitle="Composite weekly performance score per aunty"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AIS_AUNTIES.map((aunty, i) => (
              <div
                key={aunty.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                data-ocid={`intelligence.ais.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{
                      background: `${aunty.color}20`,
                      border: `2px solid ${aunty.color}40`,
                    }}
                  >
                    <span style={{ color: aunty.color }}>{aunty.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">
                      {aunty.name}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        aunty.badge === "Rising Star"
                          ? "bg-amber-500/20 text-amber-400"
                          : aunty.badge === "Stable"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {aunty.badge === "Rising Star"
                        ? "⭐ Rising Star"
                        : aunty.badge === "Stable"
                          ? "✓ Stable"
                          : "⚠ Needs Attention"}
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold font-display ${scoreColor(aunty.score)}`}
                  >
                    {aunty.score}
                  </div>
                </div>
                <div className="space-y-2">
                  <MiniBar
                    label="Completion Rate"
                    value={aunty.completion}
                    color={scoreBg(aunty.completion)}
                  />
                  <MiniBar
                    label="Quality"
                    value={aunty.quality}
                    color={scoreBg(aunty.quality)}
                  />
                  <MiniBar
                    label="Repeat Customers"
                    value={aunty.repeat}
                    color={scoreBg(aunty.repeat)}
                  />
                  <MiniBar
                    label="Batch Fill"
                    value={aunty.batchFill}
                    color={scoreBg(aunty.batchFill)}
                  />
                  <MiniBar
                    label="Response"
                    value={aunty.response}
                    color={scoreBg(aunty.response)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: Batch Demand Forecasting ───────────────────── */}
        <section data-ocid="intelligence.batch.section">
          <SectionHeader
            icon={ShoppingCart}
            title="Batch Demand Forecasting Engine"
            subtitle="Predicted fill rates and optimal batch opening days"
          />
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-4 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-amber-300 text-sm">
              Opening Gulab Khaja batch on Thursday increases fill rate by 23%
              based on historical data
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                data-ocid="intelligence.batch.table"
              >
                <thead>
                  <tr className="border-b border-slate-800">
                    {[
                      "Product",
                      "Region",
                      "Fill Progress",
                      "Predicted Fill",
                      "Rec. Size",
                      "Best Day",
                      "Risk",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-400 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BATCH_FORECAST.map((b, i) => (
                    <tr
                      key={b.product}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30"
                      data-ocid={`intelligence.batch.row.${i + 1}`}
                    >
                      <td className="px-4 py-3 text-slate-200 whitespace-nowrap">
                        {b.product}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {b.region}
                      </td>
                      <td className="px-4 py-3 w-32">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                b.orders / b.capacity >= 0.7
                                  ? "bg-emerald-500"
                                  : b.orders / b.capacity >= 0.4
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{
                                width: `${(b.orders / b.capacity) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 shrink-0">
                            {b.orders}/{b.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-bold font-display ${b.fill >= 70 ? "text-emerald-400" : b.fill >= 40 ? "text-amber-400" : "text-red-400"}`}
                        >
                          {b.fill}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                        {b.recommended}
                      </td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                        {b.day}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${riskColor(b.risk)}`}
                        >
                          {b.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Section 6: Cultural Calendar ──────────────────────────── */}
        <section data-ocid="intelligence.calendar.section">
          <SectionHeader
            icon={Calendar}
            title="Cultural Calendar Intelligence"
            subtitle="Festival demand signals for next 90 days"
          />
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-400" />
              <p className="text-emerald-300 text-sm">
                Projected festival revenue boost:{" "}
                <strong>+₹45,000 over next 30 days</strong> if recommended
                actions are taken
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FESTIVALS.map((f, i) => (
              <div
                key={f.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                data-ocid={`intelligence.calendar.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white">{f.name}</h3>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: `${f.color}20`, color: f.color }}
                  >
                    {f.daysAway}d away
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-1">
                    Expected demand spike
                  </p>
                  <p
                    className="text-2xl font-bold font-display"
                    style={{ color: f.color }}
                  >
                    +{f.spike}%
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {f.categories.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2.5">
                  <p className="text-[11px] text-slate-400 flex items-start gap-1">
                    <Zap className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                    {f.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 7: Recipe Authenticity ────────────────────────── */}
        <section data-ocid="intelligence.authenticity.section">
          <SectionHeader
            icon={Fingerprint}
            title="Recipe Authenticity Fingerprint"
            subtitle="How closely each SKU matches traditional regional recipes"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUTHENTICITY_SKUS.map((sku, i) => (
              <div
                key={sku.sku}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                data-ocid={`intelligence.authenticity.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-200 leading-tight pr-2">
                    {sku.sku}
                  </h3>
                  {sku.score >= 90 && (
                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 whitespace-nowrap">
                      ✓ Authentic
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-3xl font-bold font-display ${scoreColor(sku.score)}`}
                  >
                    {sku.score}%
                  </span>
                  {sku.score < 90 && (
                    <span className="text-[10px] text-amber-400">
                      ⚠ Minor gaps
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <MiniBar
                    label="Ingredient Match"
                    value={sku.ingredientMatch}
                    color={scoreBg(sku.ingredientMatch)}
                  />
                  <MiniBar
                    label="Method Compliance"
                    value={sku.methodCompliance}
                    color={scoreBg(sku.methodCompliance)}
                  />
                  <MiniBar
                    label="Regional Origin"
                    value={sku.regionalOrigin}
                    color={scoreBg(sku.regionalOrigin)}
                  />
                  <MiniBar
                    label="Home Kitchen"
                    value={sku.homeKitchen}
                    color={scoreBg(sku.homeKitchen)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 8: Customer Taste DNA ─────────────────────────── */}
        <section data-ocid="intelligence.taste.section">
          <SectionHeader
            icon={Eye}
            title="Customer Taste DNA"
            subtitle="Silent taste profiling across 4 behavioural segments"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TASTE_SEGMENTS.map((seg, i) => (
              <div
                key={seg.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                data-ocid={`intelligence.taste.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${seg.color}15`,
                      border: `1px solid ${seg.color}30`,
                    }}
                  >
                    <span className="text-lg">
                      {seg.name === "Spice Seekers"
                        ? "🌶️"
                        : seg.name === "Sweet Lovers"
                          ? "🍬"
                          : seg.name === "Health Conscious"
                            ? "🥗"
                            : "🎁"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{seg.name}</h3>
                    <p className="text-xs text-slate-400">
                      {seg.pct}% of customers · {seg.orderFreq}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Loves: <span className="text-slate-300">{seg.love}</span>
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  Next predicted:{" "}
                  <span className="text-amber-400 font-medium">
                    {seg.nextOrder}
                  </span>
                </p>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">
                    WhatsApp Nudge
                  </p>
                  <p className="text-xs text-slate-200">{seg.nudge}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 9: Supply-Demand Heat Brain ───────────────────── */}
        <section data-ocid="intelligence.heatbrain.section">
          <SectionHeader
            icon={MapPin}
            title="Supply-Demand Heat Brain"
            subtitle="Zone-level supply vs demand intelligence"
          />
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-red-300 text-sm">
              3 red zones identified — potential{" "}
              <strong>₹28,000 monthly GMV at risk</strong> without aunty
              recruitment
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ZONES.map((zone, i) => (
              <div
                key={zone.name}
                className={`rounded-xl p-4 border cursor-pointer transition-all ${
                  zone.type === "red"
                    ? "bg-red-500/10 border-red-500/30 hover:bg-red-500/15"
                    : zone.type === "blue"
                      ? "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15"
                      : "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15"
                }`}
                onClick={() => zone.type === "red" && toggleZone(zone.name)}
                onKeyDown={(e) => {
                  if (
                    (e.key === "Enter" || e.key === " ") &&
                    zone.type === "red"
                  ) {
                    toggleZone(zone.name);
                  }
                }}
                data-ocid={`intelligence.heatbrain.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p
                    className={`text-xs font-semibold ${
                      zone.type === "red"
                        ? "text-red-300"
                        : zone.type === "blue"
                          ? "text-blue-300"
                          : "text-emerald-300"
                    }`}
                  >
                    {zone.name}
                  </p>
                  {zone.type === "red" &&
                    (expandedZones.includes(zone.name) ? (
                      <ChevronUp className="w-3 h-3 text-red-400" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-red-400" />
                    ))}
                </div>
                <p className="text-[10px] text-slate-400">
                  Demand: {zone.demand}%
                </p>
                <p className="text-[10px] text-slate-400">
                  Supply: {zone.supply}%
                </p>
                {zone.type === "red" && (
                  <p className="text-[10px] text-red-400 font-bold mt-1">
                    Need {zone.need} aunties
                  </p>
                )}
                <AnimatePresence>
                  {zone.type === "red" && expandedZones.includes(zone.name) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 pt-2 border-t border-red-500/20 overflow-hidden"
                    >
                      <p className="text-[10px] text-slate-300">
                        Recruitment brief: Seek {zone.need} home cooks
                        specialising in Sweets or Achar in {zone.name} within 30
                        days.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 10: Aunty Earnings Optimiser ──────────────────── */}
        <section data-ocid="intelligence.earnings.section">
          <SectionHeader
            icon={DollarSign}
            title="Aunty Earnings Optimiser"
            subtitle="Data-driven recommendations to maximise aunty income"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {EARNINGS_OPTIMISER.map((aunty, i) => (
              <div
                key={aunty.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                data-ocid={`intelligence.earnings.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 text-sm">
                    {aunty.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {aunty.name}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      +₹{((aunty.optimised - aunty.current) / 100).toFixed(0)}k
                      potential uplift
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-[10px] text-slate-400">Current</p>
                    <p className="text-lg font-bold text-slate-300 font-display">
                      ₹{(aunty.current / 1000).toFixed(1)}k
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                    <p className="text-[10px] text-emerald-400">Optimised</p>
                    <p className="text-lg font-bold text-emerald-400 font-display">
                      ₹{(aunty.optimised / 1000).toFixed(1)}k
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {aunty.recs.map((r) => (
                    <div
                      key={r.action}
                      className="flex items-start gap-2 text-[11px]"
                    >
                      <span>{r.emoji}</span>
                      <div className="flex-1">
                        <span className="text-slate-300">{r.action}</span>
                        <span className="text-emerald-400 font-bold ml-1">
                          {r.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-400/80 italic">
                  ✨ This extra income {aunty.meaning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 11: Quality Drift Detection ───────────────────── */}
        <section data-ocid="intelligence.quality.section">
          <SectionHeader
            icon={TrendingDown}
            title="Quality Drift Detection"
            subtitle="Rating trend monitoring — early intervention before customer complaints"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUALITY_DATA.map((aunty, i) => (
              <div
                key={aunty.name}
                className={`bg-slate-900 border rounded-2xl p-5 ${
                  aunty.flagged ? "border-red-500/30" : "border-slate-800"
                }`}
                data-ocid={`intelligence.quality.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{aunty.name}</h3>
                  {aunty.flagged ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      ⚠ Declining
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ Healthy
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-slate-400 text-xs">
                    {aunty.data[0]}
                  </span>
                  <div className="flex-1">
                    <QualitySparkline
                      data={aunty.data}
                      flagged={aunty.flagged}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold font-display ${aunty.flagged ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {aunty.data[aunty.data.length - 1]}
                  </span>
                </div>
                {aunty.suggestion && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mt-2">
                    <p className="text-[11px] text-red-300">
                      💬 {aunty.suggestion}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 12: Community-to-Commerce Bridge ──────────────── */}
        <section data-ocid="intelligence.community.section">
          <SectionHeader
            icon={Sparkles}
            title="Community-to-Commerce Bridge"
            subtitle="Salah-Mashwara content driving marketplace conversions"
          />
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-4">
            <p className="text-blue-300 text-sm">
              🔗 Community drove{" "}
              <strong>18% of last week's new customer acquisitions</strong> —
              highest ever
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-slate-800 text-center">
              {[
                {
                  label: "Content Views",
                  value: "1,217",
                  color: "text-blue-400",
                },
                {
                  label: "Product Views",
                  value: "342",
                  color: "text-amber-400",
                },
                { label: "Orders", value: "47", color: "text-emerald-400" },
              ].map((m) => (
                <div key={m.label} className="bg-slate-900 p-4">
                  <p className={`text-2xl font-bold font-display ${m.color}`}>
                    {m.value}
                  </p>
                  <p className="text-xs text-slate-400">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="divide-y divide-slate-800">
              {COMMUNITY_BRIDGE.map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 p-4"
                  data-ocid={`intelligence.community.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-400">
                      {item.views} views → {item.category}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-400">
                      {item.predictedOrders} orders
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {item.conversion}% conv.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 mt-10 py-6 text-center">
        <p className="text-slate-600 text-xs">
          Intelligence Hub · Choudhary Aunty Platform · Internal Use Only · All
          data is simulated
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function IntelligenceHubPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "true",
  );

  return (
    <AnimatePresence mode="wait">
      {authed ? (
        <motion.div
          key="hub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <IntelligenceDashboard />
        </motion.div>
      ) : (
        <motion.div
          key="gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PasswordGate onAuth={() => setAuthed(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
