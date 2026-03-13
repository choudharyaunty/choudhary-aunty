import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
  AlertTriangle,
  BarChart2,
  Bot,
  Brain,
  Calendar,
  CheckCircle,
  ChevronUp,
  Clock,
  IndianRupee,
  Info,
  Layers,
  Lightbulb,
  Lock,
  Power,
  RefreshCw,
  Scan,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import {
  Area,
  AreaChart,
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

// ─── Password Gate ───────────────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "amar2026") {
      localStorage.setItem("pricing_auth", "amar2026");
      onSuccess();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-4"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-800/60 border border-amber-600/50 mb-4">
            <IndianRupee className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Pricing Intelligence
          </h1>
          <p className="text-amber-200/70 text-sm">
            Restricted access — admin only
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-amber-200 text-sm mb-2 block">
              Access Password
            </Label>
            <Input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className="bg-amber-900/60 border-amber-700 text-white placeholder:text-amber-400/50 focus:border-amber-400"
              data-ocid="pricing.input"
            />
            {error && (
              <p
                className="text-red-400 text-xs mt-1"
                data-ocid="pricing.error_state"
              >
                Incorrect password. Try again.
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            data-ocid="pricing.submit_button"
          >
            <Lock className="w-4 h-4 mr-2" />
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DISHES = [
  "Mango Pickle",
  "Dal Pitha",
  "Sattu Laddoo",
  "Til Barfi",
  "Chura Matar",
  "Thekua",
];

const competitorData = [
  {
    platform: "Swiggy Instamart",
    dish: "Mango Pickle",
    ourPrice: 220,
    compPrice: 199,
    delivery: 30,
    discount: "10% off",
    diff: 21,
    status: "above",
  },
  {
    platform: "Blinkit",
    dish: "Dal Pitha",
    ourPrice: 180,
    compPrice: 190,
    delivery: 25,
    discount: "—",
    diff: -10,
    status: "below",
  },
  {
    platform: "BigBasket",
    dish: "Sattu Laddoo",
    ourPrice: 240,
    compPrice: 235,
    delivery: 0,
    discount: "5% off",
    diff: 5,
    status: "at",
  },
  {
    platform: "Meesho",
    dish: "Til Barfi",
    ourPrice: 160,
    compPrice: 145,
    delivery: 40,
    discount: "—",
    diff: 15,
    status: "above",
  },
  {
    platform: "Amazon Pantry",
    dish: "Chura Matar",
    ourPrice: 195,
    compPrice: 210,
    delivery: 0,
    discount: "15% off",
    diff: -15,
    status: "below",
  },
  {
    platform: "Local Marketplace",
    dish: "Thekua",
    ourPrice: 130,
    compPrice: 120,
    delivery: 20,
    discount: "—",
    diff: 10,
    status: "above",
  },
  {
    platform: "Swiggy Instamart",
    dish: "Sattu Laddoo",
    ourPrice: 240,
    compPrice: 250,
    delivery: 30,
    discount: "—",
    diff: -10,
    status: "below",
  },
  {
    platform: "Blinkit",
    dish: "Mango Pickle",
    ourPrice: 220,
    compPrice: 205,
    delivery: 25,
    discount: "12% off",
    diff: 15,
    status: "above",
  },
];

const parityData = [
  {
    dish: "Mango Pickle",
    ourPrice: 220,
    marketAvg: 202,
    diffPct: 8.9,
    status: "warning",
  },
  {
    dish: "Dal Pitha",
    ourPrice: 180,
    marketAvg: 152,
    diffPct: 18.4,
    status: "critical",
  },
  {
    dish: "Sattu Laddoo",
    ourPrice: 240,
    marketAvg: 238,
    diffPct: 0.8,
    status: "ok",
  },
  {
    dish: "Til Barfi",
    ourPrice: 160,
    marketAvg: 138,
    diffPct: 15.9,
    status: "critical",
  },
  {
    dish: "Chura Matar",
    ourPrice: 195,
    marketAvg: 200,
    diffPct: -2.5,
    status: "ok",
  },
  {
    dish: "Thekua",
    ourPrice: 130,
    marketAvg: 118,
    diffPct: 10.2,
    status: "warning",
  },
];

const parityTrend = [
  { day: "Mon", score: 82 },
  { day: "Tue", score: 79 },
  { day: "Wed", score: 81 },
  { day: "Thu", score: 76 },
  { day: "Fri", score: 78 },
  { day: "Sat", score: 74 },
  { day: "Sun", score: 78 },
];

const dishProfitData = [
  { name: "Mango Pickle", margin: 38 },
  { name: "Thekua", margin: 34 },
  { name: "Til Barfi", margin: 31 },
  { name: "Chura Matar", margin: 28 },
  { name: "Sattu Laddoo", margin: 24 },
  { name: "Dal Pitha", margin: 19 },
  { name: "Achar Mix", margin: 35 },
  { name: "Khaja", margin: 22 },
];

const chefData = [
  {
    name: "Sunita Devi",
    dishes: 4,
    revenue: 48200,
    profit: 17352,
    margin: 36,
    trend: "up",
  },
  {
    name: "Meera Singh",
    dishes: 3,
    revenue: 36800,
    profit: 12880,
    margin: 35,
    trend: "up",
  },
  {
    name: "Kavita Jha",
    dishes: 5,
    revenue: 54100,
    profit: 16230,
    margin: 30,
    trend: "stable",
  },
  {
    name: "Pushpa Yadav",
    dishes: 2,
    revenue: 22400,
    profit: 6272,
    margin: 28,
    trend: "down",
  },
  {
    name: "Renu Kumari",
    dishes: 6,
    revenue: 61500,
    profit: 15375,
    margin: 25,
    trend: "up",
  },
];

const batchData = [
  {
    id: "B-2024-089",
    dish: "Mango Pickle",
    fill: 92,
    revenue: 8800,
    cost: 5280,
    profit: 3520,
  },
  {
    id: "B-2024-090",
    dish: "Dal Pitha",
    fill: 58,
    revenue: 4320,
    cost: 3110,
    profit: 1210,
  },
  {
    id: "B-2024-091",
    dish: "Sattu Laddoo",
    fill: 85,
    revenue: 9600,
    cost: 6240,
    profit: 3360,
  },
  {
    id: "B-2024-092",
    dish: "Til Barfi",
    fill: 71,
    revenue: 5920,
    cost: 4142,
    profit: 1778,
  },
];

const demandForecast = [
  { day: "D+1", pickle: 42, laddoo: 28, pitha: 18 },
  { day: "D+2", pickle: 45, laddoo: 31, pitha: 15 },
  { day: "D+3", pickle: 38, laddoo: 27, pitha: 22 },
  { day: "D+4", pickle: 51, laddoo: 35, pitha: 19 },
  { day: "D+5", pickle: 48, laddoo: 30, pitha: 16 },
  { day: "D+6", pickle: 55, laddoo: 38, pitha: 24 },
  { day: "D+7", pickle: 60, laddoo: 42, pitha: 20 },
  { day: "D+8", pickle: 58, laddoo: 45, pitha: 25 },
  { day: "D+9", pickle: 65, laddoo: 48, pitha: 28 },
  { day: "D+10", pickle: 70, laddoo: 52, pitha: 22 },
  { day: "D+11", pickle: 68, laddoo: 49, pitha: 30 },
  { day: "D+12", pickle: 75, laddoo: 55, pitha: 26 },
  { day: "D+13", pickle: 80, laddoo: 58, pitha: 32 },
  { day: "D+14", pickle: 85, laddoo: 62, pitha: 35 },
];

const elasticityData = [
  { dish: "Mango Pickle", coeff: 0.42, sensitivity: "Low", room: "+12%" },
  { dish: "Dal Pitha", coeff: 1.18, sensitivity: "High", room: "-8%" },
  { dish: "Sattu Laddoo", coeff: 0.75, sensitivity: "Medium", room: "+5%" },
  { dish: "Til Barfi", coeff: 0.95, sensitivity: "Medium", room: "-3%" },
  { dish: "Chura Matar", coeff: 0.33, sensitivity: "Low", room: "+15%" },
  { dish: "Thekua", coeff: 0.61, sensitivity: "Low", room: "+8%" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function KPICard({
  title,
  value,
  sub,
  icon: Icon,
  accent = "amber",
  trend,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent?: string;
  trend?: "up" | "down";
}) {
  const colors: Record<string, string> = {
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    green: "bg-green-50 border-green-200 text-green-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };
  const iconBg: Record<string, string> = {
    amber: "bg-amber-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    red: "bg-red-100",
  };
  return (
    <Card className={`border ${colors[accent] ?? colors.amber} shadow-sm`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium opacity-70 uppercase tracking-wide mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs mt-1 opacity-80 flex items-center gap-1">
              {trend === "up" && <TrendingUp className="w-3 h-3" />}
              {trend === "down" && <TrendingDown className="w-3 h-3" />}
              {sub}
            </p>
          </div>
          <div className={`p-2 rounded-lg ${iconBg[accent] ?? iconBg.amber}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Tab 1: Overview ─────────────────────────────────────────────────────────

const alerts = [
  {
    id: 1,
    severity: "critical",
    message: "Dal Pitha is 18% above market price — risk of reduced orders",
    action: "Review pricing",
  },
  {
    id: 2,
    severity: "critical",
    message: "Til Barfi priced 15.9% above similar listings on Meesho",
    action: "Create discount",
  },
  {
    id: 3,
    severity: "warning",
    message:
      "Mango Pickle batch fill rate at 62% — offer discount to accelerate",
    action: "Add promotion",
  },
  {
    id: 4,
    severity: "info",
    message:
      "Sattu Laddoo has high demand signals — consider 8% price increase",
    action: "Adjust price",
  },
  {
    id: 5,
    severity: "info",
    message:
      "Chura Matar: unique regional dish — no direct competitor found, premium pricing feasible",
    action: "Explore",
  },
];

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Platform Avg Margin"
          value="34.2%"
          sub="+2.1% vs last month"
          icon={TrendingUp}
          accent="green"
          trend="up"
        />
        <KPICard
          title="Price Parity Score"
          value="78/100"
          sub="12 dishes need attention"
          icon={ShieldCheck}
          accent="amber"
        />
        <KPICard
          title="Competitor Delta"
          value="-8.5%"
          sub="Below market avg"
          icon={TrendingDown}
          accent="red"
          trend="down"
        />
        <KPICard
          title="Most Profitable Dish"
          value="Mango Pickle"
          sub="₹72/unit margin"
          icon={IndianRupee}
          accent="blue"
        />
      </div>

      <Card className="border-amber-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-amber-800">
            <Zap className="w-4 h-4" /> AI Alert Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                a.severity === "critical"
                  ? "bg-red-50 border-red-200"
                  : a.severity === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-blue-50 border-blue-200"
              }`}
              data-ocid={`pricing.alert.item.${i + 1}`}
            >
              {a.severity === "critical" && (
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              )}
              {a.severity === "warning" && (
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              )}
              {a.severity === "info" && (
                <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{a.message}</p>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 text-xs ${
                  a.severity === "critical"
                    ? "border-red-400 text-red-700"
                    : a.severity === "warning"
                      ? "border-amber-400 text-amber-700"
                      : "border-blue-400 text-blue-700"
                }`}
              >
                {a.severity === "critical"
                  ? "Critical"
                  : a.severity === "warning"
                    ? "Warning"
                    : "Info"}
              </Badge>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Dishes Monitored", value: "24", icon: Layers },
          {
            label: "Dishes Above Parity Threshold",
            value: "4",
            icon: AlertTriangle,
          },
          { label: "Avg Competitor Gap", value: "₹12", icon: Target },
        ].map((s) => (
          <Card key={s.label} className="text-center border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <s.icon className="w-6 h-6 mx-auto mb-2 text-amber-600" />
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 2: Pricing Intelligence Engine ──────────────────────────────────────

function PricingEngineTab() {
  const [selectedDish, setSelectedDish] = useState("Mango Pickle");
  const [ingredient, setIngredient] = useState(80);
  const [labor, setLabor] = useState(30);
  const [packaging, setPackaging] = useState(15);
  const [delivery, setDelivery] = useState(25);
  const [commission, setCommission] = useState(10);
  const [marketing, setMarketing] = useState(10);
  const [demand, setDemand] = useState("High");
  const [fillRate, setFillRate] = useState([78]);
  const [sensitivity, setSensitivity] = useState("Medium");
  const [computed, setComputed] = useState(false);

  const totalCost = ingredient + labor + packaging + delivery + marketing;
  const commissionAmt = Math.round((220 * commission) / 100);
  const recommended = Math.round(
    totalCost * 1.45 +
      (demand === "Very High"
        ? 15
        : demand === "High"
          ? 10
          : demand === "Low"
            ? -5
            : 0),
  );
  const minPrice = Math.round((totalCost / (1 - commission / 100)) * 1.05);
  const marketPrice = Math.round(recommended * 0.955);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">
              Dish & Cost Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">
                Select Dish
              </Label>
              <Select value={selectedDish} onValueChange={setSelectedDish}>
                <SelectTrigger
                  data-ocid="pricing.engine.select"
                  className="w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DISHES.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {[
              {
                label: "Ingredient Cost (₹)",
                value: ingredient,
                set: setIngredient,
                ocid: "pricing.engine.ingredient_input",
              },
              {
                label: "Labor Cost (₹)",
                value: labor,
                set: setLabor,
                ocid: "pricing.engine.labor_input",
              },
              {
                label: "Packaging Cost (₹)",
                value: packaging,
                set: setPackaging,
                ocid: "pricing.engine.packaging_input",
              },
              {
                label: "Delivery Cost (₹)",
                value: delivery,
                set: setDelivery,
                ocid: "pricing.engine.delivery_input",
              },
              {
                label: "Marketing Cost (₹)",
                value: marketing,
                set: setMarketing,
                ocid: "pricing.engine.marketing_input",
              },
            ].map(({ label, value, set, ocid }) => (
              <div key={label}>
                <Label className="text-xs font-medium text-gray-600 mb-1 block">
                  {label}
                </Label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => set(Number(e.target.value))}
                  className="h-9"
                  data-ocid={ocid}
                />
              </div>
            ))}

            <div>
              <Label className="text-xs font-medium text-gray-600 mb-1 block">
                Platform Commission (%)
              </Label>
              <Input
                type="number"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="h-9"
                data-ocid="pricing.engine.commission_input"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">
              Demand Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Demand Signal
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {["Low", "Medium", "High", "Very High"].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDemand(d)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                      demand === d
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-amber-300"
                    }`}
                    data-ocid="pricing.demand.toggle"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Batch Fill Rate — {fillRate[0]}%
              </Label>
              <Slider
                value={fillRate}
                onValueChange={setFillRate}
                min={0}
                max={100}
                step={1}
                className="mt-2"
                data-ocid="pricing.fillrate.toggle"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Customer Price Sensitivity
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {["Low", "Medium", "High"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSensitivity(s)}
                    className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                      sensitivity === s
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-amber-300"
                    }`}
                    data-ocid="pricing.sensitivity.toggle"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => setComputed(true)}
              data-ocid="pricing.engine.primary_button"
            >
              <Brain className="w-4 h-4 mr-2" /> Calculate Optimal Price
            </Button>
          </CardContent>
        </Card>
      </div>

      {computed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-amber-400 bg-amber-50 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-amber-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Pricing Recommendation —{" "}
                {selectedDish}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {[
                  {
                    label: "Recommended Price",
                    value: `₹${recommended}`,
                    highlight: true,
                  },
                  {
                    label: "Minimum Profitable",
                    value: `₹${minPrice}`,
                    highlight: false,
                  },
                  {
                    label: "Competitive Market",
                    value: `₹${marketPrice}`,
                    highlight: false,
                  },
                  {
                    label: "Price Range",
                    value: `₹${minPrice}–₹${recommended + 15}`,
                    highlight: false,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`p-3 rounded-xl text-center ${
                      item.highlight
                        ? "bg-amber-500 text-white"
                        : "bg-white border border-amber-200"
                    }`}
                  >
                    <p
                      className={`text-lg font-bold ${item.highlight ? "text-white" : "text-amber-800"}`}
                    >
                      {item.value}
                    </p>
                    <p
                      className={`text-xs mt-1 ${item.highlight ? "text-amber-100" : "text-gray-500"}`}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-amber-700 font-medium">
                  Confidence Score
                </span>
                <span className="text-sm font-bold text-amber-800">87%</span>
              </div>
              <Progress value={87} className="h-2 mb-4" />
              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-sm text-gray-700 flex items-start gap-2">
                  <Bot className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  Based on <strong>{demand} demand signals</strong> and{" "}
                  <strong>{fillRate[0]}% batch fill rate</strong>, pricing at ₹
                  {recommended} positions {selectedDish}{" "}
                  {recommended > marketPrice
                    ? `${(((recommended - marketPrice) / marketPrice) * 100).toFixed(1)}% above`
                    : "at"}{" "}
                  market while maintaining strong profitability. Commission
                  impact: ₹{commissionAmt}. Total cost base: ₹{totalCost}.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// ─── Tab 3: Unit Economics Calculator ────────────────────────────────────────

function UnitEconomicsTab() {
  const [inputs, setInputs] = useState({
    selling: 220,
    ingredient: 80,
    labor: 30,
    packaging: 15,
    delivery: 25,
    commission: 10,
    marketing: 10,
  });

  const set =
    (k: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputs((prev) => ({ ...prev, [k]: Number(e.target.value) }));

  const totalCost =
    inputs.ingredient +
    inputs.labor +
    inputs.packaging +
    inputs.delivery +
    inputs.marketing;
  const commAmt = Math.round((inputs.selling * inputs.commission) / 100);
  const chefEarnings = inputs.selling - totalCost - commAmt;
  const grossMargin = Math.round(
    ((inputs.selling - totalCost) / inputs.selling) * 100,
  );
  const netProfit = chefEarnings;

  const profitabilityLevel =
    grossMargin >= 25 ? "green" : grossMargin >= 10 ? "amber" : "red";
  const profitabilityLabel =
    grossMargin >= 25
      ? "Healthy Margin"
      : grossMargin >= 10
        ? "Moderate Margin"
        : "Low Margin — Action Needed";

  const barSegments = [
    { label: "Ingredient", value: inputs.ingredient, color: "bg-amber-500" },
    { label: "Labor", value: inputs.labor, color: "bg-orange-400" },
    { label: "Packaging", value: inputs.packaging, color: "bg-yellow-400" },
    { label: "Delivery", value: inputs.delivery, color: "bg-red-400" },
    { label: "Marketing", value: inputs.marketing, color: "bg-pink-400" },
    { label: "Commission", value: commAmt, color: "bg-purple-400" },
    {
      label: "Chef Profit",
      value: Math.max(0, netProfit),
      color: "bg-green-500",
    },
  ];
  const total = barSegments.reduce((s, b) => s + b.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">
              Cost Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(
              [
                ["Selling Price (₹)", "selling"],
                ["Ingredient Cost (₹)", "ingredient"],
                ["Labor Cost (₹)", "labor"],
                ["Packaging Cost (₹)", "packaging"],
                ["Delivery Cost (₹)", "delivery"],
                ["Platform Commission (%)", "commission"],
                ["Marketing Cost (₹)", "marketing"],
              ] as [string, keyof typeof inputs][]
            ).map(([label, key]) => (
              <div key={key}>
                <Label className="text-xs font-medium text-gray-600 mb-1 block">
                  {label}
                </Label>
                <Input
                  type="number"
                  value={inputs[key]}
                  onChange={set(key)}
                  className="h-9"
                  data-ocid={`pricing.calc.${key}_input`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card
            className={`border shadow-sm ${
              profitabilityLevel === "green"
                ? "border-green-300 bg-green-50"
                : profitabilityLevel === "amber"
                  ? "border-amber-300 bg-amber-50"
                  : "border-red-300 bg-red-50"
            }`}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                {profitabilityLevel === "green" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {profitabilityLevel === "amber" && (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                )}
                {profitabilityLevel === "red" && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`font-semibold text-sm ${
                    profitabilityLevel === "green"
                      ? "text-green-700"
                      : profitabilityLevel === "amber"
                        ? "text-amber-700"
                        : "text-red-700"
                  }`}
                >
                  {profitabilityLabel}
                </span>
              </div>

              {[
                { label: "Total Cost per Unit", value: `₹${totalCost}` },
                { label: "Platform Commission", value: `₹${commAmt}` },
                {
                  label: "Chef Earnings",
                  value: `₹${chefEarnings}`,
                  highlight: true,
                },
                { label: "Gross Margin", value: `${grossMargin}%` },
                {
                  label: "Net Profit",
                  value: `₹${netProfit}`,
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-1 border-b border-white/60"
                >
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span
                    className={`text-sm font-bold ${item.highlight ? "text-green-700 text-base" : "text-gray-800"}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-700">
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-6 rounded-lg overflow-hidden mb-3">
                {barSegments.map((seg) => (
                  <div
                    key={seg.label}
                    className={`${seg.color} transition-all`}
                    style={{ width: `${(seg.value / total) * 100}%` }}
                    title={`${seg.label}: ₹${seg.value}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {barSegments.map((seg) => (
                  <div
                    key={seg.label}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span
                      className={`w-3 h-3 rounded-sm ${seg.color} shrink-0`}
                    />
                    {seg.label}: ₹{seg.value}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 4: Competitor Price Scanner ─────────────────────────────────────────

function CompetitorScannerTab() {
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Pickles", "Sweets", "Snacks", "Grains"];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const statusBadge = (status: string) => {
    if (status === "below")
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300">
          Below Market
        </Badge>
      );
    if (status === "at")
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-300">
          At Market
        </Badge>
      );
    return (
      <Badge className="bg-orange-100 text-orange-700 border-orange-300">
        Above Market
      </Badge>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex flex-wrap gap-6 text-sm">
          <span className="text-gray-600">
            Avg Market Price <strong className="text-amber-800">₹210</strong>
          </span>
          <span className="text-gray-600">
            Lowest <strong className="text-green-700">₹190</strong>
          </span>
          <span className="text-gray-600">
            Highest <strong className="text-red-700">₹260</strong>
          </span>
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Last scanned 2 hours ago
          </span>
        </div>
        <Button
          onClick={handleScan}
          disabled={scanning}
          className="bg-amber-500 hover:bg-amber-600 text-white"
          data-ocid="pricing.scanner.primary_button"
        >
          {scanning ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Scan className="w-4 h-4 mr-2" />
          )}
          {scanning ? "Scanning..." : "Scan Now"}
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filter === c
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
            }`}
            data-ocid="pricing.scanner.tab"
          >
            {c}
          </button>
        ))}
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table data-ocid="pricing.scanner.table">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Platform</TableHead>
                <TableHead>Dish</TableHead>
                <TableHead className="text-right">Our Price</TableHead>
                <TableHead className="text-right">Comp Price</TableHead>
                <TableHead className="text-right">Delivery</TableHead>
                <TableHead>Discounts</TableHead>
                <TableHead className="text-right">Difference</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorData.map((row, i) => (
                <TableRow
                  key={`${row.platform}-${row.dish}`}
                  data-ocid={`pricing.scanner.row.${i + 1}`}
                >
                  <TableCell className="font-medium text-sm">
                    {row.platform}
                  </TableCell>
                  <TableCell className="text-sm">{row.dish}</TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{row.ourPrice}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{row.compPrice}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{row.delivery}
                  </TableCell>
                  <TableCell className="text-sm">{row.discount}</TableCell>
                  <TableCell
                    className={`text-right text-sm font-medium ${
                      row.diff > 0 ? "text-orange-600" : "text-green-600"
                    }`}
                  >
                    {row.diff > 0 ? "+" : ""}
                    {row.diff}
                  </TableCell>
                  <TableCell>{statusBadge(row.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

// ─── Tab 5: Price Parity Monitor ─────────────────────────────────────────────

function ParityMonitorTab() {
  const [threshold, setThreshold] = useState([10]);
  const [actions, setActions] = useState<Record<string, string>>({});

  const setAction = (dish: string, action: string) =>
    setActions((prev) => ({ ...prev, [dish]: action }));

  return (
    <div className="space-y-6">
      <Card className="border-amber-200 bg-amber-50 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium text-amber-800 shrink-0">
              Alert Threshold: {threshold[0]}%
            </Label>
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              min={5}
              max={30}
              step={1}
              className="flex-1"
              data-ocid="pricing.parity.toggle"
            />
            <span className="text-sm text-amber-700 shrink-0 font-semibold">
              {threshold[0]}%
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {parityData
          .filter((p) => p.status === "critical")
          .map((p, i) => (
            <motion.div
              key={p.dish}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border-2 border-red-300 bg-red-50"
              data-ocid={`pricing.parity.item.${i + 1}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-red-800">{p.dish}</p>
                  <p className="text-sm text-red-600 mt-0.5">
                    Our price ₹{p.ourPrice} vs market avg ₹{p.marketAvg} —{" "}
                    <strong>{p.diffPct.toFixed(1)}% above</strong>
                  </p>
                </div>
                <Badge className="bg-red-200 text-red-800 border-red-400">
                  Critical — &gt;{threshold[0]}%
                </Badge>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {["Reduce Price", "Create Discount", "Bundle Promotion"].map(
                  (action) => (
                    <Button
                      key={action}
                      size="sm"
                      variant={
                        actions[p.dish] === action ? "default" : "outline"
                      }
                      className={
                        actions[p.dish] === action
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : ""
                      }
                      onClick={() => setAction(p.dish, action)}
                      data-ocid="pricing.parity.secondary_button"
                    >
                      {action}
                    </Button>
                  ),
                )}
              </div>
            </motion.div>
          ))}
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-gray-800">
            Parity Status — All Dishes
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table data-ocid="pricing.parity.table">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Dish</TableHead>
                <TableHead className="text-right">Our Price</TableHead>
                <TableHead className="text-right">Market Avg</TableHead>
                <TableHead className="text-right">Diff %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parityData.map((row, i) => (
                <TableRow
                  key={row.dish}
                  data-ocid={`pricing.parity.row.${i + 1}`}
                >
                  <TableCell className="font-medium text-sm">
                    {row.dish}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{row.ourPrice}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{row.marketAvg}
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm font-medium ${
                      row.diffPct > threshold[0]
                        ? "text-red-600"
                        : row.diffPct > 0
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {row.diffPct > 0 ? "+" : ""}
                    {row.diffPct.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {row.status === "critical" && (
                      <Badge className="bg-red-100 text-red-700">
                        Critical
                      </Badge>
                    )}
                    {row.status === "warning" && (
                      <Badge className="bg-amber-100 text-amber-700">
                        Warning
                      </Badge>
                    )}
                    {row.status === "ok" && (
                      <Badge className="bg-green-100 text-green-700">
                        Healthy
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {row.status === "ok" ? (
                      "—"
                    ) : (
                      <span className="text-amber-700 text-xs cursor-pointer hover:underline">
                        Review
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-gray-800">
            7-Day Parity Score Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={parityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#F59E0B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab 6: Profitability Analytics ──────────────────────────────────────────

function ProfitabilityTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Platform Margin"
          value="₹1,24,500"
          sub="This month"
          icon={IndianRupee}
          accent="green"
        />
        <KPICard
          title="Avg Chef Profit/Order"
          value="₹48"
          sub="+₹5 vs last month"
          icon={TrendingUp}
          accent="amber"
          trend="up"
        />
        <KPICard
          title="Most Profitable Category"
          value="Pickles"
          sub="38% avg margin"
          icon={BarChart2}
          accent="blue"
        />
        <KPICard
          title="Customer Acquisition Cost"
          value="₹85"
          sub="-₹12 vs last month"
          icon={Target}
          accent="green"
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">
              Per-Dish Profit Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dishProfitData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  horizontal={false}
                />
                <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  width={90}
                />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="margin" radius={[0, 4, 4, 0]}>
                  {dishProfitData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        entry.margin >= 30
                          ? "#10B981"
                          : entry.margin >= 20
                            ? "#F59E0B"
                            : "#EF4444"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">
              Per-Chef Revenue
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table data-ocid="pricing.profit.table">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Chef</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chefData.map((chef, i) => (
                  <TableRow
                    key={chef.name}
                    data-ocid={`pricing.profit.row.${i + 1}`}
                  >
                    <TableCell className="text-sm font-medium">
                      {chef.name}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      ₹{chef.revenue.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right text-sm text-green-700 font-medium">
                      ₹{chef.profit.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {chef.margin}%
                    </TableCell>
                    <TableCell>
                      {chef.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      )}
                      {chef.trend === "down" && (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      {chef.trend === "stable" && (
                        <ChevronUp className="w-4 h-4 text-gray-400 rotate-90" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-gray-800">
            Batch Profitability
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table data-ocid="pricing.batch.table">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Batch ID</TableHead>
                <TableHead>Dish</TableHead>
                <TableHead className="text-right">Fill Rate</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchData.map((batch, i) => (
                <TableRow
                  key={batch.id}
                  data-ocid={`pricing.batch.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-xs">
                    {batch.id}
                  </TableCell>
                  <TableCell className="text-sm">{batch.dish}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={batch.fill} className="w-16 h-2" />
                      <span
                        className={`text-xs font-medium ${batch.fill >= 80 ? "text-green-600" : batch.fill >= 60 ? "text-amber-600" : "text-red-600"}`}
                      >
                        {batch.fill}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{batch.revenue.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    ₹{batch.cost.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-green-700">
                    ₹{batch.profit.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="border-red-200 bg-red-50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-red-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Low Margin Alerts (&lt;15%)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            {
              dish: "Dal Pitha",
              margin: 12,
              rec: "Review ingredient sourcing or adjust pricing by ₹15",
            },
            {
              dish: "Khaja",
              margin: 11,
              rec: "Increase batch size to reduce per-unit packaging cost",
            },
          ].map((item, i) => (
            <div
              key={item.dish}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200"
              data-ocid={`pricing.alert.item.${i + 1}`}
            >
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800">
                  {item.dish} — {item.margin}% margin
                </p>
                <p className="text-xs text-gray-600 mt-0.5">{item.rec}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab 7: AI Optimization Engine ───────────────────────────────────────────

const suggestions = [
  {
    title: "Increase Mango Pickle price by 8%",
    icon: TrendingUp,
    color: "green",
    reasoning:
      "High demand detected (3.2x normal), 87% batch fill rate. Current price leaves margin on the table.",
    impact: "+₹18 profit/unit | +₹1,440 per batch",
    action: "Apply Increase",
  },
  {
    title: "Reduce Sattu Laddoo batch size from 50 to 35",
    icon: Layers,
    color: "amber",
    reasoning:
      "Current fill rate 58%. Smaller batches will improve fill rate and reduce waste.",
    impact: "+12% fill rate | Reduce waste by ₹600/batch",
    action: "Adjust Batch",
  },
  {
    title: "Offer 12% discount on Dal Pitha",
    icon: Zap,
    color: "blue",
    reasoning:
      "8 units remaining, batch closes in 6 hours. Discount accelerates completion.",
    impact: "Clear batch, save ₹400 in waste",
    action: "Create Discount",
  },
  {
    title: "Source Mango from Darbhanga supplier",
    icon: Target,
    color: "purple",
    reasoning:
      "Darbhanga supplier offers same-quality Mango at 23% lower cost vs current Patna supplier.",
    impact: "₹14 savings/unit | ₹1,120/batch",
    action: "Explore Supplier",
  },
  {
    title: "Launch Navratri bundle: Til Barfi + Thekua",
    icon: Sparkles,
    color: "orange",
    reasoning:
      "Cultural calendar spike in 8 days. Bundle pricing increases perceived value and order volume.",
    impact: "+40% order volume during festival window",
    action: "Create Bundle",
  },
  {
    title: "Premium pricing for Chura Matar",
    icon: Lightbulb,
    color: "teal",
    reasoning:
      "Unique regional dish with no direct competitor found on any platform. Premium positioning justified.",
    impact: "15% price increase feasible without demand impact",
    action: "Update Price",
  },
];

const accentColors: Record<string, string> = {
  green: "border-green-300 bg-green-50",
  amber: "border-amber-300 bg-amber-50",
  blue: "border-blue-300 bg-blue-50",
  purple: "border-purple-300 bg-purple-50",
  orange: "border-orange-300 bg-orange-50",
  teal: "border-teal-300 bg-teal-50",
};
const iconColors: Record<string, string> = {
  green: "text-green-600",
  amber: "text-amber-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  teal: "text-teal-600",
};
const btnColors: Record<string, string> = {
  green: "bg-green-500 hover:bg-green-600",
  amber: "bg-amber-500 hover:bg-amber-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  teal: "bg-teal-500 hover:bg-teal-600",
};

function AIOptimizationTab() {
  const [applied, setApplied] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {suggestions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card
              className={`border-2 shadow-sm h-full ${accentColors[s.color]}`}
              data-ocid={`pricing.ai.card.${i + 1}`}
            >
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg border border-white/80 shadow-sm shrink-0">
                    <s.icon className={`w-4 h-4 ${iconColors[s.color]}`} />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm leading-snug">
                    {s.title}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mb-3 flex-1">
                  {s.reasoning}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/60">
                  <span className="text-xs font-medium text-gray-700">
                    📈 {s.impact}
                  </span>
                  <Button
                    size="sm"
                    className={`${btnColors[s.color]} text-white text-xs ${
                      applied.has(i) ? "opacity-70" : ""
                    }`}
                    onClick={() => setApplied((prev) => new Set([...prev, i]))}
                    data-ocid={`pricing.ai.primary_button.${i + 1}`}
                  >
                    {applied.has(i) ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : null}
                    {applied.has(i) ? "Applied" : s.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-600" /> Price Elasticity
              Index
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table data-ocid="pricing.elasticity.table">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Dish</TableHead>
                  <TableHead className="text-right">Elasticity</TableHead>
                  <TableHead>Sensitivity</TableHead>
                  <TableHead>Pricing Room</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {elasticityData.map((row, i) => (
                  <TableRow
                    key={row.dish}
                    data-ocid={`pricing.elasticity.row.${i + 1}`}
                  >
                    <TableCell className="text-sm font-medium">
                      {row.dish}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {row.coeff}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          row.sensitivity === "Low"
                            ? "bg-green-100 text-green-700"
                            : row.sensitivity === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {row.sensitivity}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-sm font-semibold ${
                        row.room.startsWith("+")
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {row.room}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800 flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-600" /> 14-Day Demand
              Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={demandForecast}>
                <defs>
                  <linearGradient id="gPickle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLaddoo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPitha" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="pickle"
                  stroke="#F59E0B"
                  fill="url(#gPickle)"
                  strokeWidth={2}
                  name="Mango Pickle"
                />
                <Area
                  type="monotone"
                  dataKey="laddoo"
                  stroke="#10B981"
                  fill="url(#gLaddoo)"
                  strokeWidth={2}
                  name="Sattu Laddoo"
                />
                <Area
                  type="monotone"
                  dataKey="pitha"
                  stroke="#6366F1"
                  fill="url(#gPitha)"
                  strokeWidth={2}
                  name="Dal Pitha"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              {[
                { name: "Mango Pickle", color: "bg-amber-400" },
                { name: "Sattu Laddoo", color: "bg-emerald-400" },
                { name: "Dal Pitha", color: "bg-indigo-400" },
              ].map((l) => (
                <span
                  key={l.name}
                  className="flex items-center gap-1 text-xs text-gray-600"
                >
                  <span className={`w-3 h-3 rounded-sm ${l.color}`} /> {l.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Demand Elasticity AI Tab ─────────────────────────────────────────────────

const ELASTICITY_DISHES = [
  "Mango Pickle",
  "Litti Chokha",
  "Sattu Paratha",
  "Thekua",
];

const ELASTICITY_DATA: Record<
  string,
  {
    coefficient: number;
    scenarios: {
      change: string;
      demand: string;
      revenue: string;
      revenueVal: number;
    }[];
    demandCurve: { price: number; demand: number }[];
  }
> = {
  "Mango Pickle": {
    coefficient: -2.5,
    scenarios: [
      { change: "-20%", demand: "+50%", revenue: "+20%", revenueVal: 20 },
      { change: "-10%", demand: "+25%", revenue: "+12.5%", revenueVal: 12.5 },
      { change: "0%", demand: "0%", revenue: "0%", revenueVal: 0 },
      { change: "+10%", demand: "-25%", revenue: "-17.5%", revenueVal: -17.5 },
      { change: "+20%", demand: "-50%", revenue: "-40%", revenueVal: -40 },
    ],
    demandCurve: [
      { price: 160, demand: 145 },
      { price: 180, demand: 128 },
      { price: 200, demand: 110 },
      { price: 220, demand: 90 },
      { price: 240, demand: 68 },
      { price: 260, demand: 45 },
    ],
  },
  "Litti Chokha": {
    coefficient: -1.2,
    scenarios: [
      { change: "-20%", demand: "+24%", revenue: "-0.8%", revenueVal: -0.8 },
      { change: "-10%", demand: "+12%", revenue: "+0.8%", revenueVal: 0.8 },
      { change: "0%", demand: "0%", revenue: "0%", revenueVal: 0 },
      { change: "+10%", demand: "-12%", revenue: "-3.2%", revenueVal: -3.2 },
      { change: "+20%", demand: "-24%", revenue: "-8.8%", revenueVal: -8.8 },
    ],
    demandCurve: [
      { price: 100, demand: 138 },
      { price: 120, demand: 124 },
      { price: 140, demand: 110 },
      { price: 160, demand: 96 },
      { price: 180, demand: 82 },
      { price: 200, demand: 68 },
    ],
  },
  "Sattu Paratha": {
    coefficient: -0.8,
    scenarios: [
      { change: "-20%", demand: "+16%", revenue: "-7.2%", revenueVal: -7.2 },
      { change: "-10%", demand: "+8%", revenue: "-2.8%", revenueVal: -2.8 },
      { change: "0%", demand: "0%", revenue: "0%", revenueVal: 0 },
      { change: "+10%", demand: "-8%", revenue: "+1.2%", revenueVal: 1.2 },
      { change: "+20%", demand: "-16%", revenue: "+0.8%", revenueVal: 0.8 },
    ],
    demandCurve: [
      { price: 80, demand: 130 },
      { price: 100, demand: 119 },
      { price: 120, demand: 108 },
      { price: 140, demand: 97 },
      { price: 160, demand: 86 },
      { price: 180, demand: 75 },
    ],
  },
  Thekua: {
    coefficient: -1.0,
    scenarios: [
      { change: "-20%", demand: "+20%", revenue: "-4%", revenueVal: -4 },
      { change: "-10%", demand: "+10%", revenue: "-1%", revenueVal: -1 },
      { change: "0%", demand: "0%", revenue: "0%", revenueVal: 0 },
      { change: "+10%", demand: "-10%", revenue: "-1%", revenueVal: -1 },
      { change: "+20%", demand: "-20%", revenue: "-4%", revenueVal: -4 },
    ],
    demandCurve: [
      { price: 60, demand: 140 },
      { price: 80, demand: 120 },
      { price: 100, demand: 100 },
      { price: 120, demand: 80 },
      { price: 140, demand: 60 },
      { price: 160, demand: 40 },
    ],
  },
};

function DemandElasticityTab() {
  const [selectedDish, setSelectedDish] = useState("Mango Pickle");
  const data = ELASTICITY_DATA[selectedDish];
  const coef = data.coefficient;
  const elasticityType =
    Math.abs(coef) > 1
      ? "Elastic"
      : Math.abs(coef) < 1
        ? "Inelastic"
        : "Unitary";
  const elasticityColor =
    elasticityType === "Elastic"
      ? "bg-orange-100 text-orange-700 border-orange-300"
      : elasticityType === "Inelastic"
        ? "bg-blue-100 text-blue-700 border-blue-300"
        : "bg-purple-100 text-purple-700 border-purple-300";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-600" /> Demand Elasticity AI
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Predict how demand changes when price changes
          </p>
        </div>
        <Select value={selectedDish} onValueChange={setSelectedDish}>
          <SelectTrigger
            className="w-48 border-amber-300"
            data-ocid="elasticity.dish.select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ELASTICITY_DISHES.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              Elasticity Coefficient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900">{coef}</div>
            <p className="text-xs text-gray-500 mt-1">PED value</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              Classification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={`text-sm px-3 py-1 ${elasticityColor}`}>
              {elasticityType}
            </Badge>
            <p className="text-xs text-gray-500 mt-2">
              {elasticityType === "Elastic"
                ? "Demand changes significantly with price"
                : elasticityType === "Inelastic"
                  ? "Demand relatively stable despite price changes"
                  : "Demand changes proportionally with price"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700 font-medium flex items-center gap-1">
              <Lightbulb className="w-4 h-4" /> Key Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-800 font-medium">
              Reducing price by 10% may increase demand by 25%
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Net revenue impact:{" "}
              <span className="font-bold text-green-700">+12.5%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              Price-Demand Scenario Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price Change</TableHead>
                  <TableHead>Demand Change</TableHead>
                  <TableHead>Revenue Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.scenarios.map((row) => (
                  <TableRow
                    key={row.change}
                    className={row.change === "0%" ? "bg-amber-50" : ""}
                    data-ocid={`elasticity.scenario.item.${data.scenarios.indexOf(row) + 1}`}
                  >
                    <TableCell className="font-medium">{row.change}</TableCell>
                    <TableCell
                      className={
                        row.demand.startsWith("+")
                          ? "text-green-600 font-medium"
                          : row.demand === "0%"
                            ? "text-gray-500"
                            : "text-red-500 font-medium"
                      }
                    >
                      {row.demand}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.revenueVal > 0
                            ? "bg-green-100 text-green-700 border-green-200"
                            : row.revenueVal === 0
                              ? "bg-gray-100 text-gray-600 border-gray-200"
                              : "bg-red-100 text-red-600 border-red-200"
                        }
                      >
                        {row.revenue}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              Demand Curve — {selectedDish}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={data.demandCurve}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8c8" />
                <XAxis
                  dataKey="price"
                  tickFormatter={(v) => `\u20b9${v}`}
                  tick={{ fontSize: 11 }}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v: number) => [v, "Demand Index"]}
                  labelFormatter={(l) => `Price: \u20b9${l}`}
                />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ fill: "#f59e0b", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Batch Profit Optimizer Tab ───────────────────────────────────────────────

const BATCH_PROFIT_DATA = [
  { fill: 40, profit: -120 },
  { fill: 50, profit: 80 },
  { fill: 60, profit: 280 },
  { fill: 70, profit: 480 },
  { fill: 80, profit: 680 },
  { fill: 90, profit: 880 },
  { fill: 100, profit: 1080 },
];

function BatchProfitOptimizerTab() {
  const [currentFill, setCurrentFill] = useState(60);
  const [discount, setDiscount] = useState(15);

  const projectedFill = Math.min(100, currentFill + discount * 1.4);
  const currentProfit = Math.round(-500 + currentFill * 13);
  const projectedProfit = Math.round(-500 + projectedFill * 13 - discount * 3);
  const profitChange = projectedProfit - currentProfit;
  const fillColor =
    currentFill < 50
      ? "text-red-600"
      : currentFill < 75
        ? "text-amber-600"
        : "text-green-600";
  const fillBg =
    currentFill < 50
      ? "bg-red-50 border-red-200"
      : currentFill < 75
        ? "bg-amber-50 border-amber-200"
        : "bg-green-50 border-green-200";
  const efficiencyScore = Math.round(
    (currentFill / 100) * 40 +
      (projectedFill / 100) * 30 +
      (profitChange > 0 ? 30 : 10),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" /> Batch Profit Optimizer
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Optimize discount strategy to maximize batch profitability
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`border-2 ${fillBg}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              Current Batch Fill Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${fillColor}`}>
              {currentFill}%
            </div>
            <Progress value={currentFill} className="mt-2 h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {currentFill < 50
                ? "\ud83d\udd34 Critical \u2014 below break-even"
                : currentFill < 75
                  ? "\ud83d\udfe1 Moderate \u2014 room to improve"
                  : "\ud83d\udfe2 Good \u2014 near capacity"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              Break-Even Fill Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-700">55%</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-1.5 flex-1 bg-red-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "55%" }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must exceed 55% to cover fixed costs
            </p>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Batch Efficiency
              Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-600">
              {efficiencyScore}
              <span className="text-lg text-gray-400">/100</span>
            </div>
            <Progress value={efficiencyScore} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              Profit vs. Fill Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={BATCH_PROFIT_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8c8" />
                <XAxis
                  dataKey="fill"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `\u20b9${v}`}
                />
                <Tooltip
                  formatter={(v: number) => [`\u20b9${v}`, "Batch Profit"]}
                  labelFormatter={(l) => `Fill Rate: ${l}%`}
                />
                <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                  {BATCH_PROFIT_DATA.map((entry) => (
                    <Cell
                      key={entry.fill}
                      fill={
                        entry.profit < 0
                          ? "#ef4444"
                          : entry.fill <= 60
                            ? "#f59e0b"
                            : "#22c55e"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              Discount Simulator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm text-gray-600">
                  Current Fill Rate
                </Label>
                <span className="text-sm font-bold text-gray-800">
                  {currentFill}%
                </span>
              </div>
              <Slider
                value={[currentFill]}
                onValueChange={([v]) => setCurrentFill(v)}
                min={20}
                max={100}
                step={5}
                className="mb-1"
                data-ocid="batch.fill.toggle"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm text-gray-600">
                  Early-Bird Discount
                </Label>
                <span className="text-sm font-bold text-amber-600">
                  \u20b9{discount}
                </span>
              </div>
              <Slider
                value={[discount]}
                onValueChange={([v]) => setDiscount(v)}
                min={0}
                max={50}
                step={5}
                className="mb-1"
                data-ocid="batch.discount.toggle"
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Projected Fill Rate</span>
                <span className="font-bold text-green-600">
                  {Math.round(projectedFill)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Batch Profit</span>
                <span
                  className={`font-bold ${currentProfit < 0 ? "text-red-600" : "text-gray-800"}`}
                >
                  \u20b9{currentProfit}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Projected Batch Profit</span>
                <span
                  className={`font-bold ${projectedProfit < 0 ? "text-red-600" : "text-green-600"}`}
                >
                  \u20b9{projectedProfit}
                </span>
              </div>
              <div className="border-t border-amber-200 pt-2 flex justify-between text-sm">
                <span className="text-gray-700 font-medium">
                  Net Profit Change
                </span>
                <Badge
                  className={
                    profitChange >= 0
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-600 border-red-200"
                  }
                >
                  {profitChange >= 0 ? "+" : ""}\u20b9{profitChange}
                </Badge>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 font-medium flex items-start gap-1.5">
                <Bot className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Batch at {currentFill}% fill. Offer \u20b9{discount} early-bird
                discount to reach ~{Math.round(projectedFill)}% fill \u2014
                projected profit change:{" "}
                <span
                  className={
                    profitChange >= 0
                      ? "text-green-700 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  \u20b9{profitChange}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Ingredient Cost Forecasting Tab ─────────────────────────────────────────

const INGREDIENTS_DATA = [
  {
    name: "Mustard Oil",
    unit: "per litre",
    current: 180,
    trend: 8.2,
    forecast: "up",
    risk: "High",
    alert: true,
    history: [155, 158, 162, 168, 173, 180],
  },
  {
    name: "Atta / Wheat Flour",
    unit: "per kg",
    current: 45,
    trend: 3.1,
    forecast: "up",
    risk: "Medium",
    alert: false,
    history: [39, 40, 41, 42, 43, 45],
  },
  {
    name: "Tomatoes",
    unit: "per kg",
    current: 28,
    trend: -12.5,
    forecast: "down",
    risk: "Low",
    alert: false,
    history: [38, 35, 30, 34, 32, 28],
  },
  {
    name: "Onions",
    unit: "per kg",
    current: 35,
    trend: 5.7,
    forecast: "up",
    risk: "Medium",
    alert: false,
    history: [28, 30, 31, 32, 33, 35],
  },
  {
    name: "Spices Mix",
    unit: "per 100g",
    current: 65,
    trend: 2.0,
    forecast: "flat",
    risk: "Low",
    alert: false,
    history: [60, 61, 63, 63, 64, 65],
  },
  {
    name: "Packaging Material",
    unit: "per unit",
    current: 12,
    trend: 6.5,
    forecast: "up",
    risk: "Medium",
    alert: false,
    history: [9, 10, 10, 11, 11, 12],
  },
];

const MONTHS_HISTORY = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

function IngredientCostForecastingTab() {
  const [selectedIngredient, setSelectedIngredient] = useState("Mustard Oil");
  const ing = INGREDIENTS_DATA.find((i) => i.name === selectedIngredient)!;
  const historyData = ing.history.map((price, idx) => ({
    month: MONTHS_HISTORY[idx],
    price,
  }));
  const overallRisk = Math.round(
    INGREDIENTS_DATA.reduce(
      (sum, i) =>
        sum + (i.risk === "High" ? 80 : i.risk === "Medium" ? 50 : 20),
      0,
    ) / INGREDIENTS_DATA.length,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" /> Ingredient Cost
            Forecasting
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            AI monitors ingredient price trends and suggests price adjustments
          </p>
        </div>
        <Card className="border-amber-300 bg-amber-50 px-4 py-2 flex items-center gap-3">
          <div>
            <p className="text-xs text-amber-600 font-medium">
              Overall Cost Risk Score
            </p>
            <Progress value={overallRisk} className="w-32 h-2 mt-1" />
          </div>
          <span className="text-xl font-bold text-amber-700">
            {overallRisk}/100
          </span>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">
            AI Recommendation
          </p>
          <p className="text-sm text-amber-700 mt-0.5">
            Mustard oil prices rising (+8.2% in 30 days).{" "}
            <strong>
              Suggested price adjustment: +6% on dishes using mustard oil.
            </strong>{" "}
            Consider bulk purchasing before further increase.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INGREDIENTS_DATA.map((item) => (
          <Card
            key={item.name}
            className={`cursor-pointer transition-all border-2 ${item.alert ? "border-amber-400 bg-amber-50" : selectedIngredient === item.name ? "border-amber-300 bg-white" : "border-gray-200 hover:border-amber-200"}`}
            onClick={() => setSelectedIngredient(item.name)}
            data-ocid={`ingredient.item.${INGREDIENTS_DATA.indexOf(item) + 1}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  {item.name}
                </p>
                <Badge
                  className={
                    item.risk === "High"
                      ? "bg-red-100 text-red-700 border-red-200 text-xs"
                      : item.risk === "Medium"
                        ? "bg-amber-100 text-amber-700 border-amber-200 text-xs"
                        : "bg-green-100 text-green-700 border-green-200 text-xs"
                  }
                >
                  {item.risk} Risk
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mb-1">{item.unit}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  \u20b9{item.current}
                </span>
                <div className="flex items-center gap-1">
                  {item.forecast === "up" ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : item.forecast === "down" ? (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  ) : (
                    <span className="w-4 h-0.5 bg-gray-400 inline-block" />
                  )}
                  <span
                    className={`text-sm font-medium ${item.trend > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.trend > 0 ? "+" : ""}
                    {item.trend}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              6-Month Price Trend \u2014 {selectedIngredient}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={historyData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8c8" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `\u20b9${v}`}
                />
                <Tooltip formatter={(v: number) => [`\u20b9${v}`, "Price"]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ fill: "#f59e0b", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              3-Month Cost Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Apr</TableHead>
                  <TableHead>May</TableHead>
                  <TableHead>Jun</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INGREDIENTS_DATA.map((item) => {
                  const apr = Math.round(
                    item.current * (1 + (item.trend / 100) * 0.5),
                  );
                  const may = Math.round(apr * (1 + (item.trend / 100) * 0.4));
                  const jun = Math.round(may * (1 + (item.trend / 100) * 0.3));
                  return (
                    <TableRow
                      key={item.name}
                      data-ocid={`forecast.row.item.${INGREDIENTS_DATA.indexOf(item) + 1}`}
                    >
                      <TableCell className="text-xs font-medium">
                        {item.name.split(" ")[0]}
                      </TableCell>
                      <TableCell className="text-xs">\u20b9{apr}</TableCell>
                      <TableCell className="text-xs">\u20b9{may}</TableCell>
                      <TableCell
                        className={`text-xs font-medium ${jun > item.current ? "text-red-600" : "text-green-600"}`}
                      >
                        \u20b9{jun}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Promotion Profit Analyzer Tab ───────────────────────────────────────────

function PromotionProfitAnalyzerTab() {
  const [basePrice, setBasePrice] = useState(220);
  const [discountAmt, setDiscountAmt] = useState(20);
  const [demandIncrease, setDemandIncrease] = useState(35);
  const [batchFill, setBatchFill] = useState(60);

  const postPrice = basePrice - discountAmt;
  const baseCost = Math.round(basePrice * 0.68);
  const baseProfit = basePrice - baseCost;
  const promoProfit = postPrice - baseCost;
  const demandMultiplier = 1 + demandIncrease / 100;
  const revenueChange =
    ((postPrice * demandMultiplier - basePrice) / basePrice) * 100;
  const profitChange =
    ((promoProfit * demandMultiplier - baseProfit) / baseProfit) * 100;
  const breakEvenDemandIncrease = Math.max(
    0,
    Math.round((discountAmt / promoProfit) * 100),
  );
  const batchTimeReduction = Math.round((demandIncrease / 100) * 2.5);
  const isProfitable = profitChange > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-600" /> Promotion Profit
          Analyzer
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Not all discounts increase profit \u2014 simulate before every
          promotion
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">
          Adjust inputs below to simulate promotion scenarios. Results update in
          real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-gray-700">
              Simulation Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Current Price (\u20b9)
                </Label>
                <Input
                  type="number"
                  value={basePrice}
                  onChange={(e) =>
                    setBasePrice(Math.max(50, Number(e.target.value)))
                  }
                  className="border-amber-300"
                  data-ocid="promo.price.input"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Discount Amount (\u20b9)
                </Label>
                <Input
                  type="number"
                  value={discountAmt}
                  onChange={(e) =>
                    setDiscountAmt(
                      Math.max(
                        0,
                        Math.min(basePrice - 10, Number(e.target.value)),
                      ),
                    )
                  }
                  className="border-amber-300"
                  data-ocid="promo.discount.input"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-xs text-gray-600">
                  Expected Demand Increase
                </Label>
                <span className="text-sm font-bold text-amber-600">
                  +{demandIncrease}%
                </span>
              </div>
              <Slider
                value={[demandIncrease]}
                onValueChange={([v]) => setDemandIncrease(v)}
                min={0}
                max={100}
                step={5}
                data-ocid="promo.demand.toggle"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-xs text-gray-600">
                  Batch Fill Rate Before Promo
                </Label>
                <span className="text-sm font-bold text-gray-700">
                  {batchFill}%
                </span>
              </div>
              <Slider
                value={[batchFill]}
                onValueChange={([v]) => setBatchFill(v)}
                min={10}
                max={100}
                step={5}
                data-ocid="promo.batch.toggle"
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`border-2 ${isProfitable ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-700">
                Analysis Results
              </CardTitle>
              <Badge
                className={
                  isProfitable
                    ? "bg-green-500 text-white text-sm px-3 py-1"
                    : "bg-red-500 text-white text-sm px-3 py-1"
                }
                data-ocid="promo.result.toggle"
              >
                {isProfitable
                  ? "\u2713 Run Promotion"
                  : "\u2717 Not Profitable"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Post-Promo Price",
                  value: `\u20b9${postPrice}`,
                  color: "text-gray-900",
                },
                {
                  label: "Revenue/Unit Change",
                  value: `-\u20b9${discountAmt}`,
                  color: "text-red-600",
                },
                {
                  label: "Demand Multiplier",
                  value: `${demandMultiplier.toFixed(2)}x`,
                  color: "text-blue-700",
                },
                {
                  label: "Net Profit Change",
                  value: `${profitChange >= 0 ? "+" : ""}${profitChange.toFixed(1)}%`,
                  color: isProfitable ? "text-green-700" : "text-red-600",
                },
                {
                  label: "Break-Even Demand Inc.",
                  value: `${breakEvenDemandIncrease}%`,
                  color: "text-amber-700",
                },
                {
                  label: "Batch Time Reduction",
                  value: `-${batchTimeReduction} days`,
                  color: "text-green-700",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-lg p-3 border border-gray-200"
                >
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className={`text-lg font-bold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-gray-700">
            Before / After P&amp;L Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Before Promotion</TableHead>
                <TableHead>After Promotion</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  metric: "Selling Price",
                  before: `\u20b9${basePrice}`,
                  after: `\u20b9${postPrice}`,
                  delta: `-\u20b9${discountAmt}`,
                  neg: true,
                },
                {
                  metric: "Units Sold (est.)",
                  before: "100",
                  after: `${Math.round(100 * demandMultiplier)}`,
                  delta: `+${Math.round(100 * demandMultiplier - 100)}`,
                  neg: false,
                },
                {
                  metric: "Revenue (est.)",
                  before: `\u20b9${basePrice * 100}`,
                  after: `\u20b9${Math.round(postPrice * 100 * demandMultiplier)}`,
                  delta: `${revenueChange >= 0 ? "+" : ""}${revenueChange.toFixed(1)}%`,
                  neg: revenueChange < 0,
                },
                {
                  metric: "Cost per Unit",
                  before: `\u20b9${baseCost}`,
                  after: `\u20b9${baseCost}`,
                  delta: "\u2014",
                  neg: false,
                },
                {
                  metric: "Gross Profit per Unit",
                  before: `\u20b9${baseProfit}`,
                  after: `\u20b9${promoProfit}`,
                  delta: `-\u20b9${baseProfit - promoProfit}`,
                  neg: true,
                },
                {
                  metric: "Total Gross Profit",
                  before: `\u20b9${baseProfit * 100}`,
                  after: `\u20b9${Math.round(promoProfit * 100 * demandMultiplier)}`,
                  delta: `${profitChange >= 0 ? "+" : ""}${profitChange.toFixed(1)}%`,
                  neg: profitChange < 0,
                },
                {
                  metric: "Batch Fill Rate",
                  before: `${batchFill}%`,
                  after: `${Math.min(100, Math.round(batchFill * demandMultiplier))}%`,
                  delta: `+${Math.min(100 - batchFill, Math.round(batchFill * (demandMultiplier - 1)))}%`,
                  neg: false,
                },
              ].map((row, i) => (
                <TableRow key={row.metric} data-ocid={`promo.pl.item.${i + 1}`}>
                  <TableCell className="text-sm font-medium text-gray-700">
                    {row.metric}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {row.before}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {row.after}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-medium ${row.delta === "\u2014" ? "text-gray-400" : row.neg ? "text-red-600" : "text-green-600"}`}
                    >
                      {row.delta}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Not all discounts increase profit. Use this simulator before every
            promotion to avoid margin erosion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Implementation Roadmap Tab ───────────────────────────────────────────────

// ─── Dynamic Pricing Engine Tab ──────────────────────────────────────────────

const LIVE_PRICE_FEED = [
  {
    dish: "Mango Pickle",
    base: 220,
    current: 235,
    trigger: "High demand surge",
    status: "active",
  },
  {
    dish: "Litti Chokha",
    base: 180,
    current: 165,
    trigger: "Batch 40% fill, incentive",
    status: "active",
  },
  {
    dish: "Sattu Paratha",
    base: 150,
    current: 150,
    trigger: "Stable demand",
    status: "active",
  },
  {
    dish: "Thekua",
    base: 80,
    current: 88,
    trigger: "Festival season spike",
    status: "active",
  },
  {
    dish: "Aloo Chokha",
    base: 120,
    current: 108,
    trigger: "Batch 35% fill, discount",
    status: "active",
  },
  {
    dish: "Khaja Sweets",
    base: 200,
    current: 224,
    trigger: "Weekend demand peak",
    status: "paused",
  },
  {
    dish: "Chura Matar",
    base: 160,
    current: 160,
    trigger: "Stable demand",
    status: "active",
  },
];

const PRICING_RULES = [
  {
    id: 1,
    rule: "If batch fill < 50% for 2h → reduce price by 8–12%",
    enabled: true,
    category: "Batch",
  },
  {
    id: 2,
    rule: "If demand velocity > 200% baseline → increase price up to 15%",
    enabled: true,
    category: "Demand",
  },
  {
    id: 3,
    rule: "If competitor price drops > 10% → match within ₹5",
    enabled: true,
    category: "Competitor",
  },
  {
    id: 4,
    rule: "Festival calendar trigger → +5–20% premium pricing",
    enabled: true,
    category: "Festival",
  },
  {
    id: 5,
    rule: "Ingredient cost spike > 8% → auto-adjust price +5%",
    enabled: false,
    category: "Cost",
  },
];

const PRICE_BOUNDS = [
  { category: "Pickles & Chutneys", floor: 80, ceiling: 350 },
  { category: "Main Dishes", floor: 120, ceiling: 450 },
  { category: "Sweets & Snacks", floor: 60, ceiling: 300 },
  { category: "Beverages", floor: 40, ceiling: 200 },
];

const AUDIT_LOG = [
  {
    time: "Today, 2:14 PM",
    dish: "Thekua",
    old: 80,
    updated: 88,
    reason: "Dussehra festival trigger activated",
  },
  {
    time: "Today, 11:30 AM",
    dish: "Litti Chokha",
    old: 180,
    updated: 165,
    reason: "Batch fill dropped to 38%",
  },
  {
    time: "Today, 9:05 AM",
    dish: "Mango Pickle",
    old: 220,
    updated: 235,
    reason: "Demand 240% of baseline",
  },
  {
    time: "Yesterday, 6:40 PM",
    dish: "Khaja Sweets",
    old: 200,
    updated: 218,
    reason: "Weekend peak surge",
  },
  {
    time: "Yesterday, 3:12 PM",
    dish: "Aloo Chokha",
    old: 120,
    updated: 108,
    reason: "Batch fill 35% for 3h",
  },
  {
    time: "Yesterday, 1:00 PM",
    dish: "Sattu Paratha",
    old: 155,
    updated: 150,
    reason: "Competitor matched — Zomato at ₹148",
  },
  {
    time: "Oct 10, 8:22 AM",
    dish: "Chura Matar",
    old: 165,
    updated: 160,
    reason: "Low demand period — Sunday morning",
  },
  {
    time: "Oct 9, 5:45 PM",
    dish: "Mango Pickle",
    old: 205,
    updated: 220,
    reason: "Demand surge — Navratri day 3",
  },
  {
    time: "Oct 8, 12:00 PM",
    dish: "Thekua",
    old: 75,
    updated: 80,
    reason: "New base price effective",
  },
  {
    time: "Oct 7, 9:00 AM",
    dish: "Litti Chokha",
    old: 190,
    updated: 180,
    reason: "Post-weekend demand normalization",
  },
];

function DynamicPricingTab() {
  const [autonomousOn, setAutonomousOn] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [rules, setRules] = useState(PRICING_RULES);
  const [bounds, setBounds] = useState(PRICE_BOUNDS);

  const toggleRule = (id: number) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  };

  const handleAutonomousToggle = (val: boolean) => {
    if (val) {
      setShowConfirmDialog(true);
    } else {
      setAutonomousOn(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Power className="w-5 h-5 text-amber-600" /> Dynamic Pricing Engine
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Fully autonomous AI-driven price management
          </p>
        </div>
        <Badge
          className={
            autonomousOn
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-gray-100 text-gray-500 border-gray-200"
          }
        >
          Phase 4 {autonomousOn ? "ACTIVE" : "STANDBY"}
        </Badge>
      </div>

      {/* Master Toggle */}
      <Card
        className={`border-2 ${autonomousOn ? "border-amber-400 bg-amber-50" : "border-gray-200 bg-white"}`}
      >
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl ${autonomousOn ? "bg-amber-100" : "bg-gray-100"}`}
              >
                <Bot
                  className={`w-6 h-6 ${autonomousOn ? "text-amber-700" : "text-gray-500"}`}
                />
              </div>
              <div>
                <p className="font-bold text-gray-900">Autonomous Pricing</p>
                <p className="text-sm text-gray-500">
                  AI manages prices within your configured guardrails
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-semibold ${autonomousOn ? "text-amber-700" : "text-gray-400"}`}
              >
                {autonomousOn ? "ON" : "OFF"}
              </span>
              <Switch
                checked={autonomousOn}
                onCheckedChange={handleAutonomousToggle}
                data-ocid="dynamic.autonomous.switch"
              />
            </div>
          </div>
          {autonomousOn && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 p-3 bg-amber-100 rounded-lg border border-amber-300"
            >
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <p className="text-sm text-amber-800 font-medium">
                ⚠️ AI is actively managing prices — changes are applied
                automatically to live listings
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent data-ocid="dynamic.confirm.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Enable Autonomous Pricing?
            </DialogTitle>
            <DialogDescription>
              The AI will begin adjusting dish prices automatically based on
              demand, batch fill, competitor signals, and festival triggers. All
              changes will stay within your configured price bounds.
            </DialogDescription>
          </DialogHeader>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            <strong>What will happen:</strong> Prices may change multiple times
            per day. You can review the audit log at any time and turn off
            autonomous pricing instantly.
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              data-ocid="dynamic.confirm.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => {
                setAutonomousOn(true);
                setShowConfirmDialog(false);
              }}
              data-ocid="dynamic.confirm.confirm_button"
            >
              Enable Autonomous Pricing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revenue Impact */}
      <Card className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <TrendingUp className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue Impact This Month</p>
            <p className="text-2xl font-bold text-green-700">+₹12,400</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Autonomous pricing vs. manual baseline — 8.4% revenue lift
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-gray-500">Avg Price Optimization</p>
            <p className="text-lg font-bold text-amber-700">+4.2%</p>
            <p className="text-xs text-gray-500">Per dish vs. static pricing</p>
          </div>
        </CardContent>
      </Card>

      {/* Live Price Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Live Price Feed
            {autonomousOn && (
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs">Dish Name</TableHead>
                <TableHead className="text-xs">Base Price</TableHead>
                <TableHead className="text-xs">AI Price</TableHead>
                <TableHead className="text-xs">Change</TableHead>
                <TableHead className="text-xs">Trigger Reason</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LIVE_PRICE_FEED.map((row, i) => {
                const pct = (
                  ((row.current - row.base) / row.base) *
                  100
                ).toFixed(1);
                const isUp = row.current > row.base;
                const isDown = row.current < row.base;
                return (
                  <TableRow
                    key={row.dish}
                    data-ocid={`dynamic.price.row.${i + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      {row.dish}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      ₹{row.base}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      ₹{row.current}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${isUp ? "text-green-600" : isDown ? "text-red-500" : "text-gray-400"}`}
                      >
                        {isUp ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : isDown ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : null}
                        {isUp ? "+" : ""}
                        {pct}%
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {row.trigger}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.status === "active"
                            ? "bg-green-100 text-green-700 border-green-300 text-xs"
                            : "bg-gray-100 text-gray-500 border-gray-200 text-xs"
                        }
                      >
                        {row.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Rules Engine */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" /> Pricing Rules Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
              >
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={() => toggleRule(rule.id)}
                  data-ocid={`dynamic.rule.switch.${rule.id}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{rule.rule}</p>
                  <Badge className="mt-1 text-xs bg-purple-50 text-purple-700 border-purple-200">
                    {rule.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Price Bounds Config */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" /> Price Bounds Guardrails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bounds.map((b, i) => (
              <div
                key={b.category}
                className="p-3 border border-gray-100 rounded-lg"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {b.category}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500">Floor (₹)</Label>
                    <Input
                      type="number"
                      value={b.floor}
                      onChange={(e) =>
                        setBounds((prev) =>
                          prev.map((x, j) =>
                            j === i
                              ? { ...x, floor: Number(e.target.value) }
                              : x,
                          ),
                        )
                      }
                      className="h-8 text-sm mt-1"
                      data-ocid={`dynamic.bounds.floor.${i + 1}`}
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500">Ceiling (₹)</Label>
                    <Input
                      type="number"
                      value={b.ceiling}
                      onChange={(e) =>
                        setBounds((prev) =>
                          prev.map((x, j) =>
                            j === i
                              ? { ...x, ceiling: Number(e.target.value) }
                              : x,
                          ),
                        )
                      }
                      className="h-8 text-sm mt-1"
                      data-ocid={`dynamic.bounds.ceiling.${i + 1}`}
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                  <span>
                    AI operates within ₹{b.floor} — ₹{b.ceiling}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" /> AI Price Change Audit
            Log
            <Badge className="ml-auto text-xs bg-gray-100 text-gray-600 border-gray-200">
              Last 10 changes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs">Time</TableHead>
                <TableHead className="text-xs">Dish</TableHead>
                <TableHead className="text-xs">Old Price</TableHead>
                <TableHead className="text-xs">New Price</TableHead>
                <TableHead className="text-xs">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AUDIT_LOG.map((entry, i) => (
                <TableRow
                  key={entry.time + entry.dish}
                  data-ocid={`dynamic.audit.row.${i + 1}`}
                >
                  <TableCell className="text-xs text-gray-400 whitespace-nowrap">
                    {entry.time}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {entry.dish}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    ₹{entry.old}
                  </TableCell>
                  <TableCell className="text-sm font-semibold">
                    <span
                      className={
                        entry.updated > entry.old
                          ? "text-green-600"
                          : entry.updated < entry.old
                            ? "text-red-500"
                            : "text-gray-500"
                      }
                    >
                      ₹{entry.updated}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {entry.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Promotion Optimization Engine Tab ───────────────────────────────────────

const PROMO_SUGGESTIONS = [
  {
    id: 1,
    title: "₹15 discount on Litti Chokha — Sunday Special",
    dish: "Litti Chokha",
    type: "Flash Sale",
    discount: "₹15 off",
    projectedOrders: 45,
    netProfit: 890,
    confidence: 87,
    day: "Sunday",
  },
  {
    id: 2,
    title: "Bundle: Sattu Paratha + Mango Pickle — ₹280 combo",
    dish: "Sattu Paratha + Mango Pickle",
    type: "Bundle Offer",
    discount: "₹40 bundle saving",
    projectedOrders: 38,
    netProfit: 1240,
    confidence: 92,
    attachRate: "62%",
    day: "Any",
  },
  {
    id: 3,
    title: "Early-bird 10% off — Orders before 10am",
    dish: "All Dishes",
    type: "Time-based",
    discount: "10% before 10am",
    projectedOrders: 29,
    netProfit: 1200,
    confidence: 78,
    weeklyProfit: "₹1,200",
    day: "Weekdays",
  },
  {
    id: 4,
    title: "Festival Box — Diwali Pickle Set ₹499",
    dish: "Pickle Bundle",
    type: "Festival Special",
    discount: "₹120 bundle saving",
    projectedOrders: 62,
    netProfit: 3100,
    confidence: 95,
    day: "Diwali Week",
  },
];

const ACTIVE_PROMOS = [
  {
    name: "Navratri Thekua Special",
    type: "Festival",
    discount: "8%",
    orders: 84,
    revenue: 7392,
    profitImpact: "+₹1,240",
    roi: 180,
    status: "active",
  },
  {
    name: "Litti Combo Monday",
    type: "Bundle",
    discount: "₹30",
    orders: 42,
    revenue: 5460,
    profitImpact: "+₹680",
    roi: 145,
    status: "active",
  },
  {
    name: "Morning Fresh 10%",
    type: "Time-based",
    discount: "10%",
    orders: 23,
    revenue: 2484,
    profitImpact: "+₹312",
    roi: 122,
    status: "paused",
  },
];

const PROMO_ROI_DATA = [
  { name: "Navratri Sale", roi: 180 },
  { name: "Bundle Monday", roi: 145 },
  { name: "Morning 10%", roi: 122 },
  { name: "Bulk Buy ₹50", roi: 98 },
  { name: "Referral ₹20", roi: 210 },
  { name: "Flash ₹15", roi: 165 },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PROMO_CALENDAR: Record<
  string,
  { label: string; type: string; color: string }[]
> = {
  Mon: [
    {
      label: "Morning 10% Early-Bird",
      type: "time",
      color: "bg-blue-100 text-blue-700",
    },
  ],
  Tue: [],
  Wed: [
    {
      label: "Mid-week Bundle",
      type: "bundle",
      color: "bg-purple-100 text-purple-700",
    },
  ],
  Thu: [],
  Fri: [
    {
      label: "Pre-Weekend Flash",
      type: "flash",
      color: "bg-red-100 text-red-700",
    },
  ],
  Sat: [
    {
      label: "Weekend Special",
      type: "festival",
      color: "bg-amber-100 text-amber-700",
    },
  ],
  Sun: [
    {
      label: "Sunday Litti ₹15 off",
      type: "flash",
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Bundle Combo ₹280",
      type: "bundle",
      color: "bg-purple-100 text-purple-700",
    },
  ],
};

function PromoOptimizationTab() {
  const [suggestions, setSuggestions] = useState(
    PROMO_SUGGESTIONS.map((s) => ({
      ...s,
      decision: "" as "accepted" | "rejected" | "",
    })),
  );
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [showAutoDialog, setShowAutoDialog] = useState(false);
  const budgetTotal = 5000;
  const budgetUsed = 2340;

  const handleDecision = (id: number, decision: "accepted" | "rejected") => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, decision } : s)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-600" /> Promotion Optimization
            Engine
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            AI-designed promotions that maximize profit, not just orders
          </p>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-amber-300">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1 animate-pulse inline-block" />
          Phase 4 Active
        </Badge>
      </div>

      {/* Budget Gauge */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-900 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-600" /> Monthly
              Promotion Budget
            </p>
            <span className="text-sm text-gray-500">
              ₹{budgetUsed.toLocaleString()} of ₹{budgetTotal.toLocaleString()}{" "}
              used
            </span>
          </div>
          <Progress
            value={(budgetUsed / budgetTotal) * 100}
            className="h-3"
            data-ocid="promo.budget.progress"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className="text-green-600 font-medium">
              ₹{(budgetTotal - budgetUsed).toLocaleString()} remaining
            </span>
            <span>
              {Math.round((budgetUsed / budgetTotal) * 100)}% utilized
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Promotion Calendar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" /> Promotion Calendar —
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {WEEK_DAYS.map((day) => (
              <div
                key={day}
                className="min-h-[80px]"
                data-ocid={`promo.calendar.${day.toLowerCase()}.panel`}
              >
                <p className="text-xs font-bold text-gray-500 mb-2 text-center">
                  {day}
                </p>
                <div className="space-y-1">
                  {PROMO_CALENDAR[day]?.length > 0 ? (
                    PROMO_CALENDAR[day].map((p) => (
                      <div
                        key={p.label}
                        className={`text-xs p-1.5 rounded text-center font-medium ${p.color}`}
                      >
                        {p.label}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-300 text-xs pt-4">
                      —
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100">
            {[
              { label: "Flash Sale", color: "bg-red-100 text-red-700" },
              { label: "Bundle Offer", color: "bg-purple-100 text-purple-700" },
              { label: "Time-based", color: "bg-blue-100 text-blue-700" },
              {
                label: "Festival Special",
                color: "bg-amber-100 text-amber-700",
              },
            ].map((leg) => (
              <div
                key={leg.label}
                className="flex items-center gap-1.5 text-xs"
              >
                <span
                  className={`w-3 h-3 rounded ${leg.color.split(" ")[0]}`}
                />
                <span className="text-gray-500">{leg.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Promotion Suggestions */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> AI Promotion
          Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s) => (
            <Card
              key={s.id}
              className={`border-2 transition-all ${s.decision === "accepted" ? "border-green-300 bg-green-50" : s.decision === "rejected" ? "border-red-200 bg-red-50 opacity-60" : "border-amber-200 bg-amber-50"}`}
              data-ocid={`promo.suggestion.card.${s.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <Badge
                      className={`text-xs mb-2 ${s.type === "Flash Sale" ? "bg-red-100 text-red-700 border-red-200" : s.type === "Bundle Offer" ? "bg-purple-100 text-purple-700 border-purple-200" : s.type === "Festival Special" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-blue-100 text-blue-700 border-blue-200"}`}
                    >
                      {s.type}
                    </Badge>
                    <p className="text-sm font-semibold text-gray-900">
                      {s.title}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">Confidence</p>
                    <p className="text-lg font-bold text-amber-600">
                      {s.confidence}%
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">Discount</p>
                    <p className="text-sm font-bold text-gray-800">
                      {s.discount}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">+Orders</p>
                    <p className="text-sm font-bold text-blue-600">
                      +{s.projectedOrders}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400">Net Profit</p>
                    <p className="text-sm font-bold text-green-600">
                      +₹{s.netProfit}
                    </p>
                  </div>
                </div>
                {s.decision === "" ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs h-8"
                      onClick={() => handleDecision(s.id, "accepted")}
                      data-ocid={`promo.suggestion.confirm_button.${s.id}`}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 text-xs h-8"
                      data-ocid={`promo.suggestion.edit_button.${s.id}`}
                    >
                      Modify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-red-200 text-red-500 hover:bg-red-50 text-xs h-8"
                      onClick={() => handleDecision(s.id, "rejected")}
                      data-ocid={`promo.suggestion.delete_button.${s.id}`}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`text-center py-2 rounded-lg text-sm font-semibold ${s.decision === "accepted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}
                  >
                    {s.decision === "accepted"
                      ? "✓ Accepted — Scheduled"
                      : "✗ Rejected"}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Promotions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Active Promotions — Live
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs">Promotion</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Discount</TableHead>
                <TableHead className="text-xs">Orders</TableHead>
                <TableHead className="text-xs">Revenue</TableHead>
                <TableHead className="text-xs">Profit Impact</TableHead>
                <TableHead className="text-xs">ROI %</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ACTIVE_PROMOS.map((p, i) => (
                <TableRow key={p.name} data-ocid={`promo.active.row.${i + 1}`}>
                  <TableCell className="text-sm font-medium">
                    {p.name}
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs bg-gray-100 text-gray-600 border-gray-200">
                      {p.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{p.discount}</TableCell>
                  <TableCell className="text-sm font-semibold">
                    {p.orders}
                  </TableCell>
                  <TableCell className="text-sm">
                    ₹{p.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-green-600">
                    {p.profitImpact}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-amber-600">
                    {p.roi}%
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        p.status === "active"
                          ? "bg-green-100 text-green-700 border-green-300 text-xs"
                          : "bg-gray-100 text-gray-500 border-gray-200 text-xs"
                      }
                    >
                      {p.status === "active" ? "Live" : "Paused"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ROI Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-green-500" /> Promotion ROI
            Analyzer — Last 6 Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={PROMO_ROI_DATA}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" />
              <Tooltip
                formatter={(v: number) => [`${v}%`, "ROI"]}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="roi" radius={[4, 4, 0, 0]}>
                {PROMO_ROI_DATA.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.roi >= 150
                        ? "#22c55e"
                        : entry.roi >= 120
                          ? "#f59e0b"
                          : "#ef4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-500 inline-block" />{" "}
              ≥150% ROI
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" />{" "}
              120–149% ROI
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-500 inline-block" />{" "}
              &lt;120% ROI
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Auto-scheduling */}
      <Card
        className={`border-2 ${autoSchedule ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}
      >
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                Auto-Activate Promotions
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                Allow AI to automatically launch promotions when batch fill
                drops below 55%
              </p>
            </div>
            <Switch
              checked={autoSchedule}
              onCheckedChange={(val) =>
                val ? setShowAutoDialog(true) : setAutoSchedule(false)
              }
              data-ocid="promo.autoschedule.switch"
            />
          </div>
          {autoSchedule && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-amber-100 rounded-lg border border-amber-200 text-sm text-amber-800"
            >
              ✓ Auto-scheduling enabled — AI will activate best-matching
              promotion when batch fill &lt; 55%
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAutoDialog} onOpenChange={setShowAutoDialog}>
        <DialogContent data-ocid="promo.autoschedule.dialog">
          <DialogHeader>
            <DialogTitle>Enable Auto-Scheduling?</DialogTitle>
            <DialogDescription>
              The AI will automatically activate promotions from your approved
              list when any batch fill rate drops below 55%. This helps complete
              batches faster and reduce kitchen idle time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAutoDialog(false)}
              data-ocid="promo.autoschedule.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => {
                setAutoSchedule(true);
                setShowAutoDialog(false);
              }}
              data-ocid="promo.autoschedule.confirm_button"
            >
              Enable Auto-Scheduling
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ROADMAP_PHASES = [
  {
    phase: 1,
    title: "Basic Pricing Engine",
    status: "completed",
    goal: "Chefs understand real cost structure",
    features: [
      "Unit economics calculator",
      "Dish profitability dashboard",
      "Manual price editing",
    ],
  },
  {
    phase: 2,
    title: "Competitor Intelligence",
    status: "completed",
    goal: "Stay competitive",
    features: [
      "Competitor price scanning",
      "Price parity alerts",
      "Market price dashboard",
    ],
  },
  {
    phase: 3,
    title: "AI Pricing Suggestions",
    status: "completed",
    goal: "Automated pricing decisions",
    features: [
      "Demand prediction",
      "Price recommendations",
      "Batch completion incentives",
    ],
  },
  {
    phase: 4,
    title: "Fully Autonomous Pricing",
    status: "active",
    goal: "Maximize platform profitability",
    features: [
      "Dynamic pricing",
      "Promotion optimization",
      "Ingredient cost forecasting",
    ],
  },
];

function ImplementationRoadmapTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" /> Phase-Wise
          Implementation Roadmap
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Strategic build plan for pricing intelligence maturity
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div className="h-full bg-amber-400" style={{ width: "62.5%" }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {ROADMAP_PHASES.map((phase) => {
            const isCompleted = phase.status === "completed";
            const isActive = phase.status === "active";
            return (
              <Card
                key={phase.phase}
                className={`border-2 transition-all ${isCompleted ? "border-green-300 bg-green-50" : isActive ? "border-amber-400 bg-amber-50 shadow-lg" : "border-gray-200 bg-gray-50"}`}
                data-ocid={`roadmap.phase.item.${phase.phase}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? "bg-green-500 text-white" : isActive ? "bg-amber-500 text-white" : "bg-gray-300 text-gray-600"}`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        phase.phase
                      )}
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                        Completed
                      </Badge>
                    )}
                    {isActive && (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1 animate-pulse inline-block" />
                        Active
                      </Badge>
                    )}
                    {phase.status === "upcoming" && (
                      <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-xs">
                        Upcoming
                      </Badge>
                    )}
                  </div>
                  <CardTitle
                    className={`text-sm font-bold ${isCompleted ? "text-green-800" : isActive ? "text-amber-800" : "text-gray-500"}`}
                  >
                    Phase {phase.phase} \u2014 {phase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p
                    className={`text-xs mb-3 font-medium ${isCompleted ? "text-green-600" : isActive ? "text-amber-600" : "text-gray-400"}`}
                  >
                    Goal: {phase.goal}
                  </p>
                  <ul className="space-y-1.5">
                    {phase.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-1.5 text-xs text-gray-600"
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        ) : isActive ? (
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0 mt-0.5" />
                        )}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-xl shrink-0">
              <Brain className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Strategic
                Insight
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                A strong pricing intelligence system becomes the{" "}
                <strong>economic brain of the marketplace</strong>. Platforms
                like <strong>Amazon</strong> and <strong>Uber</strong> use
                AI-driven pricing and margin intelligence to maximize profit and
                liquidity. Building this early gives your marketplace a{" "}
                <strong>significant operational advantage</strong> \u2014
                turning price decisions from guesswork into a competitive moat.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Amazon", "Uber", "Swiggy", "Zomato"].map((platform) => (
                  <Badge
                    key={platform}
                    className="bg-white border-amber-200 text-amber-700 text-xs"
                  >
                    {platform} uses dynamic pricing
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: ShieldCheck,
            title: "Current Maturity",
            value: "Phase 4 Active",
            desc: "Autonomous Pricing live",
            color: "text-amber-600",
            bg: "bg-amber-50 border-amber-200",
          },
          {
            icon: BarChart2,
            title: "Modules Live",
            value: "14 Tabs",
            desc: "Engine, Calculator, Scanner, Dynamic Pricing, Promo Optimizer + more",
            color: "text-green-600",
            bg: "bg-green-50 border-green-200",
          },
          {
            icon: Zap,
            title: "Next Milestone",
            value: "Phase 4 LIVE",
            desc: "Dynamic Pricing + Promo Optimization now active",
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-200",
          },
        ].map((item) => (
          <Card key={item.title} className={`border ${item.bg}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bg}`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className={`text-sm font-bold ${item.color}`}>
                  {item.value}
                </p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function PricingDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-amber-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl">
              <IndianRupee className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Pricing Intelligence & Profitability System
              </h1>
              <p className="text-xs text-gray-500">
                Choudhary Aunty · Real-time pricing analytics & AI-driven
                optimization
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-300 hidden sm:flex">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap gap-1 h-auto mb-6 bg-amber-50 border border-amber-200 p-1 rounded-xl">
            {[
              ["overview", "Overview"],
              ["engine", "Pricing Engine"],
              ["calculator", "Unit Economics"],
              ["scanner", "Competitor Scanner"],
              ["parity", "Parity Monitor"],
              ["profitability", "Profitability"],
              ["ai", "AI Optimizer"],
              ["elasticity", "Demand Elasticity"],
              ["batch", "Batch Optimizer"],
              ["ingredients", "Cost Forecasting"],
              ["promotion", "Promo Analyzer"],
              ["dynamic", "🤖 Dynamic Pricing"],
              ["promo-optimizer", "🎯 Promo Optimizer"],
              ["roadmap", "Roadmap"],
            ].map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg px-3 py-1.5"
                data-ocid={`pricing.${value}.tab`}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="engine">
            <PricingEngineTab />
          </TabsContent>
          <TabsContent value="calculator">
            <UnitEconomicsTab />
          </TabsContent>
          <TabsContent value="scanner">
            <CompetitorScannerTab />
          </TabsContent>
          <TabsContent value="parity">
            <ParityMonitorTab />
          </TabsContent>
          <TabsContent value="profitability">
            <ProfitabilityTab />
          </TabsContent>
          <TabsContent value="ai">
            <AIOptimizationTab />
          </TabsContent>
          <TabsContent value="elasticity">
            <DemandElasticityTab />
          </TabsContent>
          <TabsContent value="batch">
            <BatchProfitOptimizerTab />
          </TabsContent>
          <TabsContent value="ingredients">
            <IngredientCostForecastingTab />
          </TabsContent>
          <TabsContent value="promotion">
            <PromotionProfitAnalyzerTab />
          </TabsContent>
          <TabsContent value="dynamic">
            <DynamicPricingTab />
          </TabsContent>
          <TabsContent value="promo-optimizer">
            <PromoOptimizationTab />
          </TabsContent>
          <TabsContent value="roadmap">
            <ImplementationRoadmapTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ─── Page Entry ────────────────────────────────────────────────────────────────────────────────

export default function PricingIntelligencePage() {
  const [authed, setAuthed] = useState(
    () => localStorage.getItem("pricing_auth") === "amar2026",
  );

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;
  return <PricingDashboard />;
}
