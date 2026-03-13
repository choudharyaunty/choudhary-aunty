import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  IndianRupee,
  Lock,
  MapPin,
  RefreshCw,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Colour palette ──────────────────────────────────────────────────────────
const NAVY = "#0f172a";
const NAVY_MID = "#1e293b";
const NAVY_BORDER = "#334155";
const GOLD = "#f59e0b";
const GOLD_LIGHT = "#fcd34d";
const TEAL = "#06b6d4";
const GREEN = "#22c55e";
const RED = "#ef4444";
const SLATE = "#94a3b8";

const CHART_COLORS = ["#3b82f6", "#06b6d4", "#f59e0b", "#22c55e", "#a855f7"];

// ─── Password Gate ───────────────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "amar2026") {
      onSuccess();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #0c1a35 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-4"
      >
        {/* Logo area */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <Lock className="w-8 h-8" style={{ color: GOLD }} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8" style={{ background: NAVY_BORDER }} />
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: SLATE }}
            >
              Confidential
            </span>
            <div className="h-px w-8" style={{ background: NAVY_BORDER }} />
          </div>
          <h1
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Investor MIS Report
          </h1>
          <p className="text-sm" style={{ color: SLATE }}>
            Choudhary Aunty · Authorized Access Only
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{ background: NAVY_MID, border: `1px solid ${NAVY_BORDER}` }}
          data-ocid="investor_mis.dialog"
        >
          <div className="space-y-2">
            <label
              htmlFor="mis-password"
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: SLATE }}
            >
              Access Password
            </label>
            <Input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-600 focus:border-amber-500"
              id="mis-password"
              data-ocid="investor_mis.input"
              autoFocus
            />
            {error && (
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: RED }}
                data-ocid="investor_mis.error_state"
              >
                <AlertCircle className="w-3 h-3" /> Incorrect password. Try
                again.
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full font-semibold"
            style={{ background: GOLD, color: NAVY }}
            data-ocid="investor_mis.submit_button"
          >
            Access Report
          </Button>
        </form>

        <p className="text-center text-xs mt-4" style={{ color: "#475569" }}>
          For access, contact kaisehoaunty@gmail.com
        </p>
      </motion.div>
    </main>
  );
}

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  growth,
  icon: Icon,
  positive = true,
}: {
  label: string;
  value: string;
  growth: string;
  icon: React.ElementType;
  positive?: boolean;
}) {
  return (
    <Card
      className="border-0 relative overflow-hidden"
      style={{
        background: NAVY_MID,
        borderLeft: `3px solid ${positive ? GREEN : RED}`,
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div
            className="p-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <Icon className="w-4 h-4" style={{ color: GOLD }} />
          </div>
          <Badge
            className="text-xs font-semibold px-2 py-0.5"
            style={{
              background: positive
                ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.15)",
              color: positive ? GREEN : RED,
              border: `1px solid ${positive ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
            }}
          >
            {positive ? (
              <TrendingUp className="w-3 h-3 mr-1 inline" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1 inline" />
            )}
            {growth}
          </Badge>
        </div>
        <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
        <div className="text-xs" style={{ color: SLATE }}>
          {label}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  description,
}: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2
        className="text-lg font-bold text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      <p className="text-sm mt-0.5" style={{ color: SLATE }}>
        {description}
      </p>
      <div
        className="h-px mt-3"
        style={{
          background: `linear-gradient(to right, ${GOLD}, transparent)`,
        }}
      />
    </div>
  );
}

// ─── Chart Tooltip ────────────────────────────────────────────────────────────

const ChartTooltipStyle = {
  contentStyle: {
    background: NAVY_MID,
    border: `1px solid ${NAVY_BORDER}`,
    borderRadius: 8,
    color: "white",
  },
  labelStyle: { color: SLATE },
  itemStyle: { color: GOLD_LIGHT },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const monthlyGmvData = [
  { month: "Jan", gmv: 1.2, revenue: 0.22 },
  { month: "Feb", gmv: 1.6, revenue: 0.29 },
  { month: "Mar", gmv: 1.9, revenue: 0.35 },
  { month: "Apr", gmv: 2.3, revenue: 0.42 },
  { month: "May", gmv: 2.8, revenue: 0.52 },
  { month: "Jun", gmv: 3.1, revenue: 0.57 },
  { month: "Jul", gmv: 3.6, revenue: 0.66 },
  { month: "Aug", gmv: 4.0, revenue: 0.74 },
  { month: "Sep", gmv: 4.5, revenue: 0.83 },
  { month: "Oct", gmv: 5.1, revenue: 0.94 },
  { month: "Nov", gmv: 5.9, revenue: 1.09 },
  { month: "Dec", gmv: 6.8, revenue: 1.25 },
];

const revenueBreakdown = [
  { name: "Commission", value: 62 },
  { name: "Delivery Fee", value: 22 },
  { name: "Ad Revenue", value: 11 },
  { name: "Subscriptions", value: 5 },
];

const newCustomerData = [
  { month: "Jan", customers: 180 },
  { month: "Feb", customers: 220 },
  { month: "Mar", customers: 275 },
  { month: "Apr", customers: 310 },
  { month: "May", customers: 360 },
  { month: "Jun", customers: 395 },
  { month: "Jul", customers: 440 },
  { month: "Aug", customers: 480 },
  { month: "Sep", customers: 515 },
  { month: "Oct", customers: 550 },
  { month: "Nov", customers: 585 },
  { month: "Dec", customers: 620 },
];

const repeatRateData = [
  { month: "Jan", rate: 28 },
  { month: "Feb", rate: 30 },
  { month: "Mar", rate: 31 },
  { month: "Apr", rate: 33 },
  { month: "May", rate: 34 },
  { month: "Jun", rate: 35 },
  { month: "Jul", rate: 36 },
  { month: "Aug", rate: 37 },
  { month: "Sep", rate: 38 },
  { month: "Oct", rate: 39 },
  { month: "Nov", rate: 40 },
  { month: "Dec", rate: 41 },
];

const cohortData = [
  { cohort: "Jan", day0: 100, day30: 44, day60: 31, day90: 22 },
  { cohort: "Feb", day0: 100, day30: 42, day60: 29, day90: 20 },
  { cohort: "Mar", day0: 100, day30: 46, day60: 33, day90: 24 },
  { cohort: "Apr", day0: 100, day30: 45, day60: 32, day90: 23 },
];

const topAunties = [
  {
    name: "Priya Sharma",
    state: "Bihar",
    category: "Pickles & Achaar",
    gmv: "₹42,800",
    orders: 186,
    rating: 4.9,
  },
  {
    name: "Sunita Devi",
    state: "Bihar",
    category: "Sweets & Mithai",
    gmv: "₹38,400",
    orders: 164,
    rating: 4.8,
  },
  {
    name: "Geeta Verma",
    state: "Bihar",
    category: "Rice & Biryani",
    gmv: "₹35,200",
    orders: 142,
    rating: 4.8,
  },
  {
    name: "Rani Kumari",
    state: "Bihar",
    category: "Pickles & Achaar",
    gmv: "₹31,600",
    orders: 128,
    rating: 4.7,
  },
  {
    name: "Meena Singh",
    state: "Bihar",
    category: "Sweets & Mithai",
    gmv: "₹28,900",
    orders: 118,
    rating: 4.9,
  },
  {
    name: "Kavita Jha",
    state: "Bihar",
    category: "Snacks",
    gmv: "₹24,500",
    orders: 105,
    rating: 4.7,
  },
  {
    name: "Anita Prasad",
    state: "Bihar",
    category: "Rice & Biryani",
    gmv: "₹22,100",
    orders: 96,
    rating: 4.6,
  },
  {
    name: "Usha Yadav",
    state: "Bihar",
    category: "Pickles & Achaar",
    gmv: "₹20,400",
    orders: 88,
    rating: 4.8,
  },
  {
    name: "Rekha Mishra",
    state: "Bihar",
    category: "Sweets & Mithai",
    gmv: "₹18,700",
    orders: 82,
    rating: 4.6,
  },
  {
    name: "Lata Gupta",
    state: "Bihar",
    category: "Snacks",
    gmv: "₹16,200",
    orders: 74,
    rating: 4.7,
  },
];

const categoryBreakdown = [
  { name: "Pickles & Achaar", value: 34 },
  { name: "Sweets & Mithai", value: 28 },
  { name: "Rice & Biryani", value: 22 },
  { name: "Snacks", value: 16 },
];

const revenueTableData = [
  {
    month: "Jan 2025",
    gmv: "₹1.2L",
    commission: "₹13,440",
    delivery: "₹4,800",
    ads: "₹2,400",
    total: "₹20,640",
  },
  {
    month: "Feb 2025",
    gmv: "₹1.6L",
    commission: "₹17,920",
    delivery: "₹6,400",
    ads: "₹3,200",
    total: "₹27,520",
  },
  {
    month: "Mar 2025",
    gmv: "₹1.9L",
    commission: "₹21,280",
    delivery: "₹7,600",
    ads: "₹3,800",
    total: "₹32,680",
  },
  {
    month: "Apr 2025",
    gmv: "₹2.3L",
    commission: "₹25,760",
    delivery: "₹9,200",
    ads: "₹4,600",
    total: "₹39,560",
  },
  {
    month: "May 2025",
    gmv: "₹2.8L",
    commission: "₹31,360",
    delivery: "₹11,200",
    ads: "₹5,600",
    total: "₹48,160",
  },
  {
    month: "Jun 2025",
    gmv: "₹3.1L",
    commission: "₹34,720",
    delivery: "₹12,400",
    ads: "₹6,200",
    total: "₹53,320",
  },
  {
    month: "Jul 2025",
    gmv: "₹3.6L",
    commission: "₹40,320",
    delivery: "₹14,400",
    ads: "₹7,200",
    total: "₹61,920",
  },
  {
    month: "Aug 2025",
    gmv: "₹4.0L",
    commission: "₹44,800",
    delivery: "₹16,000",
    ads: "₹8,000",
    total: "₹68,800",
  },
  {
    month: "Sep 2025",
    gmv: "₹4.5L",
    commission: "₹50,400",
    delivery: "₹18,000",
    ads: "₹9,000",
    total: "₹77,400",
  },
  {
    month: "Oct 2025",
    gmv: "₹5.1L",
    commission: "₹57,120",
    delivery: "₹20,400",
    ads: "₹10,200",
    total: "₹87,720",
  },
  {
    month: "Nov 2025",
    gmv: "₹5.9L",
    commission: "₹66,080",
    delivery: "₹23,600",
    ads: "₹11,800",
    total: "₹101,480",
  },
  {
    month: "Dec 2025",
    gmv: "₹6.8L",
    commission: "₹76,160",
    delivery: "₹27,200",
    ads: "₹13,600",
    total: "₹116,960",
  },
];

const metricDefinitions = [
  {
    metric: "GMV",
    definition:
      "Gross Merchandise Value — total value of orders placed on the platform before any deductions.",
  },
  {
    metric: "NPS",
    definition:
      "Net Promoter Score — customer loyalty metric; % promoters minus % detractors on a 0–10 scale.",
  },
  {
    metric: "CAC",
    definition:
      "Customer Acquisition Cost — total marketing spend divided by new customers acquired in the period.",
  },
  {
    metric: "LTV",
    definition:
      "Lifetime Value — predicted total revenue from a customer over their relationship with the platform.",
  },
  {
    metric: "Contribution Margin",
    definition:
      "Revenue minus variable costs per order; indicates per-order profitability after direct costs.",
  },
  {
    metric: "Take Rate",
    definition:
      "Platform revenue as a percentage of GMV; reflects monetisation efficiency.",
  },
  {
    metric: "Day-30 Retention",
    definition:
      "Percentage of new customers who place at least one more order within 30 days of their first order.",
  },
  {
    metric: "LTV:CAC Ratio",
    definition:
      "Lifetime Value divided by Customer Acquisition Cost; measures capital efficiency of growth.",
  },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("executive");

  return (
    <main className="min-h-screen" style={{ background: NAVY }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0c1a35 60%, #0f2444 100%)`,
          borderBottom: `1px solid ${NAVY_BORDER}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-5 w-1 rounded" style={{ background: GOLD }} />
                <span
                  className="text-xs tracking-[0.2em] uppercase font-semibold"
                  style={{ color: GOLD }}
                >
                  Confidential · For Authorized Investors Only
                </span>
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Investor MIS Report
              </h1>
              <p className="text-sm mt-0.5" style={{ color: SLATE }}>
                Choudhary Aunty — India's Home Chef Marketplace · Data as of
                March 2026
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs" style={{ color: SLATE }}>
                  Report Period
                </div>
                <div className="text-sm font-semibold text-white">
                  Jan 2025 – Mar 2026
                </div>
              </div>
              <Button
                onClick={() => toast.info("Report download coming soon")}
                className="flex items-center gap-2 text-sm"
                style={{
                  background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.4)",
                  color: GOLD,
                }}
                data-ocid="investor_mis.download_button"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList
            className="flex flex-wrap gap-1 h-auto p-1 mb-8 rounded-xl"
            style={{ background: NAVY_MID, border: `1px solid ${NAVY_BORDER}` }}
            data-ocid="investor_mis.tab"
          >
            {[
              { value: "executive", label: "Executive Summary" },
              { value: "gmv", label: "GMV & Revenue" },
              { value: "unit", label: "Unit Economics" },
              { value: "growth", label: "Growth Metrics" },
              { value: "chefs", label: "Chef Network" },
              { value: "expansion", label: "State Expansion" },
              { value: "appendix", label: "Appendix" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs sm:text-sm px-3 py-2 rounded-lg transition-all data-[state=active]:text-white"
                style={{
                  color: activeTab === tab.value ? "white" : SLATE,
                  background:
                    activeTab === tab.value
                      ? "rgba(245,158,11,0.2)"
                      : "transparent",
                }}
                data-ocid={`investor_mis.${tab.value}.tab`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Tab 1: Executive Summary ─────────────────────────────────── */}
          <TabsContent value="executive">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="Executive Summary"
                description="High-level platform performance snapshot for the current reporting period."
              />

              {/* Investor Highlights */}
              <div
                className="rounded-xl p-4 mb-6 flex items-start gap-3"
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.25)",
                }}
                data-ocid="investor_mis.executive.card"
              >
                <Star
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: GOLD }}
                />
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">
                    Investor Highlights
                  </div>
                  <p className="text-sm" style={{ color: SLATE }}>
                    Platform GMV growing{" "}
                    <span
                      className="font-semibold"
                      style={{ color: GOLD_LIGHT }}
                    >
                      18% MoM
                    </span>
                    . Bihar fully live with 124 active aunties. Expanding to UP
                    and Bengal in Q2 2026.
                  </p>
                </div>
              </div>

              {/* KPI Grid */}
              <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                data-ocid="investor_mis.executive.section"
              >
                <KpiCard
                  label="Total GMV"
                  value="₹28.4L"
                  growth="+18% MoM"
                  icon={IndianRupee}
                  positive={true}
                />
                <KpiCard
                  label="Total Orders"
                  value="3,847"
                  growth="+22% MoM"
                  icon={BarChart2}
                  positive={true}
                />
                <KpiCard
                  label="Active Aunties"
                  value="124"
                  growth="+14% MoM"
                  icon={Users}
                  positive={true}
                />
                <KpiCard
                  label="Cities Live"
                  value="3"
                  growth="+0 MoM"
                  icon={MapPin}
                  positive={true}
                />
                <KpiCard
                  label="NPS Score"
                  value="68"
                  growth="+4 pts MoM"
                  icon={Star}
                  positive={true}
                />
                <KpiCard
                  label="Repeat Order Rate"
                  value="41%"
                  growth="+3pp MoM"
                  icon={RefreshCw}
                  positive={true}
                />
              </div>

              {/* Milestones Timeline */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: NAVY_MID,
                  border: `1px solid ${NAVY_BORDER}`,
                }}
              >
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: TEAL }} />
                  Key Milestones
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      date: "Jan 2026",
                      event:
                        "Bihar ki Rasoi launched — first state module live",
                      icon: CheckCircle,
                    },
                    {
                      date: "Feb 2026",
                      event: "50th Aunty onboarded on the platform",
                      icon: CheckCircle,
                    },
                    {
                      date: "Feb 2026",
                      event: "1,000th order milestone reached",
                      icon: CheckCircle,
                    },
                    {
                      date: "Mar 2026",
                      event:
                        "100th Aunty milestone — chef network surpasses century mark",
                      icon: CheckCircle,
                    },
                  ].map((m, i) => (
                    <div
                      key={String(i)}
                      className="flex items-start gap-3"
                      data-ocid={`investor_mis.milestone.item.${i + 1}`}
                    >
                      <div className="flex flex-col items-center">
                        <m.icon className="w-4 h-4" style={{ color: GREEN }} />
                        {i < 3 && (
                          <div
                            className="w-px h-4 mt-1"
                            style={{ background: NAVY_BORDER }}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <span
                          className="text-xs font-semibold mr-2"
                          style={{ color: GOLD }}
                        >
                          {m.date}
                        </span>
                        <span className="text-sm" style={{ color: SLATE }}>
                          {m.event}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Tab 2: GMV & Revenue ─────────────────────────────────────── */}
          <TabsContent value="gmv">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="GMV & Revenue"
                description="Monthly gross merchandise value, revenue streams, and platform monetisation metrics."
              />

              {/* KPI Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Platform Take Rate", value: "18.4%" },
                  { label: "Revenue per Order", value: "₹136" },
                  { label: "MoM GMV Growth", value: "18.2%" },
                  { label: "YoY GMV Growth", value: "142%" },
                ].map((kpi, i) => (
                  <div
                    key={String(i)}
                    className="rounded-xl p-4"
                    style={{
                      background: NAVY_MID,
                      border: `1px solid ${NAVY_BORDER}`,
                    }}
                    data-ocid={"investor_mis.gmv.card"}
                  >
                    <div className="text-xl font-bold text-white">
                      {kpi.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: SLATE }}>
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div
                  className="lg:col-span-2 rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Monthly GMV Trend (₹ Lakhs)
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={monthlyGmvData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: SLATE, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: SLATE, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        {...ChartTooltipStyle}
                        formatter={(v: number) => [`₹${v}L`, "GMV"]}
                      />
                      <Bar dataKey="gmv" fill={GOLD} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Revenue Breakdown
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {revenueBreakdown.map((_, i) => (
                          <Cell
                            key={String(i)}
                            fill={CHART_COLORS[i % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        {...ChartTooltipStyle}
                        formatter={(v: number) => [`${v}%`, "Share"]}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 11, color: SLATE }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Table */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: NAVY_MID,
                  border: `1px solid ${NAVY_BORDER}`,
                }}
                data-ocid="investor_mis.gmv.table"
              >
                <div
                  className="px-5 py-3 border-b"
                  style={{ borderColor: NAVY_BORDER }}
                >
                  <h3 className="text-sm font-semibold text-white">
                    Monthly Revenue Breakdown
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: NAVY_BORDER }}>
                      {[
                        "Month",
                        "GMV",
                        "Commission",
                        "Delivery",
                        "Ads",
                        "Total Revenue",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className="text-xs"
                          style={{ color: SLATE }}
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueTableData.map((row, i) => (
                      <TableRow
                        key={String(i)}
                        style={{ borderColor: NAVY_BORDER }}
                        data-ocid={"investor_mis.gmv.row"}
                      >
                        <TableCell className="text-xs text-white">
                          {row.month}
                        </TableCell>
                        <TableCell
                          className="text-xs"
                          style={{ color: GOLD_LIGHT }}
                        >
                          {row.gmv}
                        </TableCell>
                        <TableCell className="text-xs text-white">
                          {row.commission}
                        </TableCell>
                        <TableCell className="text-xs text-white">
                          {row.delivery}
                        </TableCell>
                        <TableCell className="text-xs text-white">
                          {row.ads}
                        </TableCell>
                        <TableCell
                          className="text-xs font-semibold"
                          style={{ color: GREEN }}
                        >
                          {row.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Tab 3: Unit Economics ─────────────────────────────────────── */}
          <TabsContent value="unit">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="Unit Economics"
                description="Customer acquisition costs, lifetime value, and per-order margin analysis."
              />

              {/* Key ratios */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "LTV:CAC Ratio", value: "22.9×", good: true },
                  { label: "Payback Period", value: "2.3 mo", good: true },
                  { label: "Gross Margin / Order", value: "34%", good: true },
                  { label: "Contribution Margin", value: "28%", good: true },
                ].map((kpi, i) => (
                  <div
                    key={String(i)}
                    className="rounded-xl p-4"
                    style={{
                      background: NAVY_MID,
                      border: `1px solid ${kpi.good ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: kpi.good ? GREEN : RED }}
                    >
                      {kpi.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: SLATE }}>
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Break-even callout */}
              <div
                className="rounded-xl p-4 mb-6"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.25)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" style={{ color: TEAL }} />
                  <span className="text-sm font-semibold text-white">
                    Break-Even Trajectory
                  </span>
                </div>
                <p className="text-sm" style={{ color: SLATE }}>
                  Platform reaches unit economics break-even at{" "}
                  <span className="font-semibold text-white">
                    ₹45L monthly GMV
                  </span>
                  . Current:{" "}
                  <span className="font-semibold" style={{ color: GOLD_LIGHT }}>
                    ₹28.4L
                  </span>{" "}
                  (<span style={{ color: GREEN }}>63% of target</span>)
                </p>
                <Progress
                  value={63}
                  className="mt-3 h-2"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CAC Table */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                  data-ocid="investor_mis.unit.table"
                >
                  <div
                    className="px-5 py-3 border-b"
                    style={{ borderColor: NAVY_BORDER }}
                  >
                    <h3 className="text-sm font-semibold text-white">
                      CAC by Acquisition Channel
                    </h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderColor: NAVY_BORDER }}>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          Channel
                        </TableHead>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          CAC
                        </TableHead>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          Mix %
                        </TableHead>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          Quality
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          channel: "WhatsApp",
                          cac: "₹85",
                          mix: "38%",
                          quality: "High",
                        },
                        {
                          channel: "Instagram",
                          cac: "₹210",
                          mix: "22%",
                          quality: "Medium",
                        },
                        {
                          channel: "Referral",
                          cac: "₹42",
                          mix: "31%",
                          quality: "Very High",
                        },
                        {
                          channel: "Organic",
                          cac: "₹0",
                          mix: "9%",
                          quality: "Very High",
                        },
                        {
                          channel: "Blended",
                          cac: "₹124",
                          mix: "100%",
                          quality: "—",
                        },
                      ].map((row, i) => (
                        <TableRow
                          key={String(i)}
                          style={{
                            borderColor: NAVY_BORDER,
                            background:
                              i === 4 ? "rgba(245,158,11,0.05)" : undefined,
                          }}
                        >
                          <TableCell className="text-xs font-medium text-white">
                            {row.channel}
                          </TableCell>
                          <TableCell
                            className="text-xs"
                            style={{ color: GOLD_LIGHT }}
                          >
                            {row.cac}
                          </TableCell>
                          <TableCell className="text-xs text-white">
                            {row.mix}
                          </TableCell>
                          <TableCell className="text-xs">
                            <span
                              style={{
                                color:
                                  row.quality === "Very High"
                                    ? GREEN
                                    : row.quality === "High"
                                      ? TEAL
                                      : SLATE,
                              }}
                            >
                              {row.quality}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* LTV Table */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <div
                    className="px-5 py-3 border-b"
                    style={{ borderColor: NAVY_BORDER }}
                  >
                    <h3 className="text-sm font-semibold text-white">
                      LTV by Customer Segment
                    </h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderColor: NAVY_BORDER }}>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          Segment
                        </TableHead>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          LTV (12 mo)
                        </TableHead>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          LTV:CAC
                        </TableHead>
                        <TableHead className="text-xs" style={{ color: SLATE }}>
                          % of Users
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          segment: "Premium",
                          ltv: "₹5,200",
                          ratio: "42.0×",
                          pct: "18%",
                        },
                        {
                          segment: "Regular",
                          ltv: "₹2,840",
                          ratio: "22.9×",
                          pct: "54%",
                        },
                        {
                          segment: "Occasional",
                          ltv: "₹980",
                          ratio: "7.9×",
                          pct: "28%",
                        },
                      ].map((row, i) => (
                        <TableRow
                          key={String(i)}
                          style={{ borderColor: NAVY_BORDER }}
                        >
                          <TableCell className="text-xs font-medium text-white">
                            {row.segment}
                          </TableCell>
                          <TableCell
                            className="text-xs"
                            style={{ color: GREEN }}
                          >
                            {row.ltv}
                          </TableCell>
                          <TableCell
                            className="text-xs"
                            style={{ color: GOLD_LIGHT }}
                          >
                            {row.ratio}
                          </TableCell>
                          <TableCell className="text-xs text-white">
                            {row.pct}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Tab 4: Growth Metrics ─────────────────────────────────────── */}
          <TabsContent value="growth">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="Growth Metrics"
                description="New customer acquisition, retention cohorts, and repeat purchase behaviour."
              />

              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "MoM Customer Growth", value: "24%", color: GREEN },
                  { label: "Day-30 Retention", value: "44%", color: GREEN },
                  { label: "Monthly Churn Rate", value: "8.2%", color: RED },
                  { label: "Referral Contribution", value: "31%", color: TEAL },
                ].map((kpi, i) => (
                  <div
                    key={String(i)}
                    className="rounded-xl p-4"
                    style={{
                      background: NAVY_MID,
                      border: `1px solid ${NAVY_BORDER}`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: kpi.color }}
                    >
                      {kpi.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: SLATE }}>
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* New Customers Chart */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Monthly New Customers
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={newCustomerData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: SLATE, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: SLATE, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip {...ChartTooltipStyle} />
                      <Bar
                        dataKey="customers"
                        fill={TEAL}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Repeat Rate Line */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Repeat Order Rate Trend (%)
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={repeatRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: SLATE, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: SLATE, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[20, 50]}
                      />
                      <Tooltip
                        {...ChartTooltipStyle}
                        formatter={(v: number) => [`${v}%`, "Repeat Rate"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke={GREEN}
                        strokeWidth={2}
                        dot={{ fill: GREEN, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Retention Cohort Table */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: NAVY_MID,
                  border: `1px solid ${NAVY_BORDER}`,
                }}
                data-ocid="investor_mis.growth.table"
              >
                <div
                  className="px-5 py-3 border-b"
                  style={{ borderColor: NAVY_BORDER }}
                >
                  <h3 className="text-sm font-semibold text-white">
                    Retention Cohort Analysis
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: SLATE }}>
                    % of cohort still ordering at each time interval
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: NAVY_BORDER }}>
                      {["Cohort", "Day 0", "Day 30", "Day 60", "Day 90"].map(
                        (h) => (
                          <TableHead
                            key={h}
                            className="text-xs"
                            style={{ color: SLATE }}
                          >
                            {h}
                          </TableHead>
                        ),
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cohortData.map((row, i) => (
                      <TableRow
                        key={String(i)}
                        style={{ borderColor: NAVY_BORDER }}
                        data-ocid={"investor_mis.growth.row"}
                      >
                        <TableCell className="text-xs font-medium text-white">
                          {row.cohort} 2025
                        </TableCell>
                        <TableCell>
                          <span
                            style={{ color: GREEN }}
                            className="text-xs font-semibold"
                          >
                            {row.day0}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span style={{ color: TEAL }} className="text-xs">
                            {row.day30}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span style={{ color: GOLD }} className="text-xs">
                            {row.day60}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span style={{ color: SLATE }} className="text-xs">
                            {row.day90}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Tab 5: Chef Network ───────────────────────────────────────── */}
          <TabsContent value="chefs">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="Chef Network"
                description="Aunty onboarding funnel, performance leaders, and category distribution."
              />

              {/* KPI Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Active Aunties", value: "124", color: GREEN },
                  { label: "Pending Verification", value: "38", color: GOLD },
                  { label: "Total Applications", value: "312", color: TEAL },
                  {
                    label: "Avg Monthly Earnings",
                    value: "₹8,400",
                    color: GREEN,
                  },
                ].map((kpi, i) => (
                  <div
                    key={String(i)}
                    className="rounded-xl p-4"
                    style={{
                      background: NAVY_MID,
                      border: `1px solid ${NAVY_BORDER}`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: kpi.color }}
                    >
                      {kpi.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: SLATE }}>
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Onboarding Funnel */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Onboarding Funnel
                  </h3>
                  <div className="space-y-3">
                    {[
                      { stage: "Applied", count: 312, pct: 100 },
                      { stage: "Verified", count: 198, pct: 63 },
                      { stage: "First Batch", count: 156, pct: 50 },
                      { stage: "Repeat Seller", count: 124, pct: 40 },
                    ].map((s, i) => (
                      <div key={String(i)}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">{s.stage}</span>
                          <span style={{ color: GOLD }}>{s.count}</span>
                        </div>
                        <Progress
                          value={s.pct}
                          className="h-2"
                          style={{ background: "rgba(255,255,255,0.1)" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-4 pt-3"
                    style={{ borderTop: `1px solid ${NAVY_BORDER}` }}
                  >
                    <div className="text-xs" style={{ color: SLATE }}>
                      Aunty retention rate
                    </div>
                    <div className="text-lg font-bold" style={{ color: GREEN }}>
                      89% MoM
                    </div>
                  </div>
                </div>

                {/* Category Pie */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    GMV by Category
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((_, i) => (
                          <Cell
                            key={String(i)}
                            fill={CHART_COLORS[i % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        {...ChartTooltipStyle}
                        formatter={(v: number) => [`${v}%`, "Share"]}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={7}
                        wrapperStyle={{ fontSize: 10, color: SLATE }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Aunty retention note */}
                <div
                  className="rounded-xl p-5 flex flex-col justify-between"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-3">
                    Platform Quality
                  </h3>
                  {[
                    { label: "Avg Rating", value: "4.78 / 5", color: GOLD },
                    { label: "Orders Fulfilled", value: "98.2%", color: GREEN },
                    { label: "On-time Dispatch", value: "94.6%", color: GREEN },
                    { label: "FSSAI Compliant", value: "87%", color: TEAL },
                  ].map((m, i) => (
                    <div
                      key={String(i)}
                      className="flex items-center justify-between py-2"
                      style={{
                        borderBottom:
                          i < 3 ? `1px solid ${NAVY_BORDER}` : undefined,
                      }}
                    >
                      <span className="text-xs" style={{ color: SLATE }}>
                        {m.label}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: m.color }}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Aunties Table */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: NAVY_MID,
                  border: `1px solid ${NAVY_BORDER}`,
                }}
                data-ocid="investor_mis.chefs.table"
              >
                <div
                  className="px-5 py-3 border-b"
                  style={{ borderColor: NAVY_BORDER }}
                >
                  <h3 className="text-sm font-semibold text-white">
                    Top 10 Aunties by GMV
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: NAVY_BORDER }}>
                      {[
                        "#",
                        "Name",
                        "State",
                        "Category",
                        "Monthly GMV",
                        "Orders",
                        "Rating",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className="text-xs"
                          style={{ color: SLATE }}
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topAunties.map((a, i) => (
                      <TableRow
                        key={String(i)}
                        style={{ borderColor: NAVY_BORDER }}
                        data-ocid={`investor_mis.chefs.item.${i + 1}`}
                      >
                        <TableCell className="text-xs" style={{ color: SLATE }}>
                          {i + 1}
                        </TableCell>
                        <TableCell className="text-xs font-medium text-white">
                          {a.name}
                        </TableCell>
                        <TableCell className="text-xs" style={{ color: SLATE }}>
                          {a.state}
                        </TableCell>
                        <TableCell className="text-xs text-white">
                          {a.category}
                        </TableCell>
                        <TableCell
                          className="text-xs font-semibold"
                          style={{ color: GOLD_LIGHT }}
                        >
                          {a.gmv}
                        </TableCell>
                        <TableCell className="text-xs text-white">
                          {a.orders}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs flex items-center gap-1">
                            <Star className="w-3 h-3" style={{ color: GOLD }} />
                            <span style={{ color: GREEN }}>{a.rating}</span>
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Tab 6: State Expansion ────────────────────────────────────── */}
          <TabsContent value="expansion">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="State Expansion"
                description="Live markets, pipeline states, and geographic growth strategy."
              />

              {/* Live States */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: GREEN }} />
                  Live Markets
                </h3>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                  data-ocid="investor_mis.expansion.table"
                >
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderColor: NAVY_BORDER }}>
                        {[
                          "State",
                          "Launch Date",
                          "Active Aunties",
                          "Total GMV",
                          "Cities",
                          "Status",
                        ].map((h) => (
                          <TableHead
                            key={h}
                            className="text-xs"
                            style={{ color: SLATE }}
                          >
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        style={{ borderColor: NAVY_BORDER }}
                        data-ocid="investor_mis.expansion.item.1"
                      >
                        <TableCell className="text-xs font-semibold text-white">
                          🏞️ Bihar
                        </TableCell>
                        <TableCell className="text-xs" style={{ color: SLATE }}>
                          Jan 2026
                        </TableCell>
                        <TableCell className="text-xs" style={{ color: GREEN }}>
                          124
                        </TableCell>
                        <TableCell
                          className="text-xs font-semibold"
                          style={{ color: GOLD_LIGHT }}
                        >
                          ₹28.4L
                        </TableCell>
                        <TableCell className="text-xs text-white">3</TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs"
                            style={{
                              background: "rgba(34,197,94,0.2)",
                              color: GREEN,
                              border: "1px solid rgba(34,197,94,0.4)",
                            }}
                          >
                            LIVE
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Bihar Deep Dive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Bihar Deep Dive
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs mb-2" style={{ color: SLATE }}>
                        Top Dishes
                      </div>
                      {[
                        "Sattu Paratha",
                        "Mango Pickle (Aam ka Achar)",
                        "Tilkut",
                      ].map((d, i) => (
                        <div
                          key={String(i)}
                          className="flex items-center gap-2 text-xs text-white py-1"
                        >
                          <ChevronRight
                            className="w-3 h-3"
                            style={{ color: GOLD }}
                          />
                          {d}
                        </div>
                      ))}
                    </div>
                    <Separator style={{ background: NAVY_BORDER }} />
                    <div>
                      <div className="text-xs mb-2" style={{ color: SLATE }}>
                        City Distribution
                      </div>
                      {[
                        { city: "Patna", pct: 68 },
                        { city: "Gaya", pct: 19 },
                        { city: "Muzaffarpur", pct: 13 },
                      ].map((c, i) => (
                        <div key={String(i)} className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white">{c.city}</span>
                            <span style={{ color: GOLD }}>{c.pct}%</span>
                          </div>
                          <Progress
                            value={c.pct}
                            className="h-1.5"
                            style={{ background: "rgba(255,255,255,0.1)" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pipeline */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: NAVY_MID,
                    border: `1px solid ${NAVY_BORDER}`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: GOLD }} />
                    Expansion Pipeline
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        state: "Uttar Pradesh",
                        timeline: "Q2 2026",
                        waitlist: 45,
                        demand: "₹12L demand signal",
                        readiness: 74,
                        color: TEAL,
                      },
                      {
                        state: "West Bengal",
                        timeline: "Q3 2026",
                        waitlist: 28,
                        demand: "₹7.2L demand signal",
                        readiness: 61,
                        color: GOLD,
                      },
                      {
                        state: "Rajasthan",
                        timeline: "Q4 2026",
                        waitlist: 19,
                        demand: "₹4.8L demand signal",
                        readiness: 48,
                        color: SLATE,
                      },
                    ].map((s, i) => (
                      <div
                        key={String(i)}
                        className="pb-4"
                        style={{
                          borderBottom:
                            i < 2 ? `1px solid ${NAVY_BORDER}` : undefined,
                        }}
                        data-ocid={`investor_mis.expansion.item.${i + 2}`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {s.state}
                            </div>
                            <div className="text-xs" style={{ color: SLATE }}>
                              {s.timeline} · {s.waitlist} aunties waitlisted
                            </div>
                          </div>
                          <Badge
                            className="text-xs"
                            style={{
                              background: "rgba(100,116,139,0.2)",
                              color: SLATE,
                              border: "1px solid rgba(100,116,139,0.3)",
                            }}
                          >
                            Pipeline
                          </Badge>
                        </div>
                        <div className="text-xs mb-2" style={{ color: TEAL }}>
                          {s.demand}
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={s.readiness}
                            className="flex-1 h-1.5"
                            style={{ background: "rgba(255,255,255,0.1)" }}
                          />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: s.color }}
                          >
                            {s.readiness}% ready
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Tab 7: Appendix ───────────────────────────────────────────── */}
          <TabsContent value="appendix">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeader
                title="Appendix"
                description="Metric definitions, reporting period notes, and contact information."
              />

              {/* Reporting note */}
              <div
                className="rounded-xl p-4 mb-6"
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
              >
                <p className="text-sm" style={{ color: SLATE }}>
                  📋 <strong className="text-white">Reporting Period:</strong>{" "}
                  Data as of March 2026. All figures in INR. Financial metrics
                  are management estimates based on platform transaction data.
                </p>
              </div>

              {/* Metric Definitions */}
              <div
                className="rounded-xl overflow-hidden mb-6"
                style={{
                  background: NAVY_MID,
                  border: `1px solid ${NAVY_BORDER}`,
                }}
                data-ocid="investor_mis.appendix.table"
              >
                <div
                  className="px-5 py-3 border-b"
                  style={{ borderColor: NAVY_BORDER }}
                >
                  <h3 className="text-sm font-semibold text-white">
                    Metric Definitions
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: NAVY_BORDER }}>
                      <TableHead
                        className="text-xs w-40"
                        style={{ color: SLATE }}
                      >
                        Metric
                      </TableHead>
                      <TableHead className="text-xs" style={{ color: SLATE }}>
                        Definition
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metricDefinitions.map((m, i) => (
                      <TableRow
                        key={String(i)}
                        style={{ borderColor: NAVY_BORDER }}
                        data-ocid={"investor_mis.appendix.row"}
                      >
                        <TableCell
                          className="text-xs font-semibold"
                          style={{ color: GOLD_LIGHT }}
                        >
                          {m.metric}
                        </TableCell>
                        <TableCell className="text-xs" style={{ color: SLATE }}>
                          {m.definition}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Contact */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: NAVY_MID,
                  border: `1px solid ${NAVY_BORDER}`,
                }}
              >
                <h3 className="text-sm font-semibold text-white mb-3">
                  Platform Contact
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: SLATE }}>Email:</span>
                    <a
                      href="mailto:kaisehoaunty@gmail.com"
                      className="text-white hover:underline"
                    >
                      kaisehoaunty@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: SLATE }}>WhatsApp:</span>
                    <span className="text-white">+91 9883140470</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: SLATE }}>Platform:</span>
                    <a
                      href="https://choudhary-aunty-7gi.caffeine.xyz/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:underline"
                    >
                      choudhary-aunty-7gi.caffeine.xyz
                    </a>
                  </div>
                </div>
              </div>

              {/* Download */}
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => toast.info("Report download coming soon")}
                  className="flex items-center gap-2"
                  style={{ background: GOLD, color: NAVY }}
                  data-ocid="investor_mis.appendix.download_button"
                >
                  <Download className="w-4 h-4" />
                  Download Full Report (PDF)
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// ─── Page Entry ───────────────────────────────────────────────────────────────

export default function InvestorMISPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="gate" exit={{ opacity: 0 }}>
          <PasswordGate onSuccess={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <InvestorDashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
