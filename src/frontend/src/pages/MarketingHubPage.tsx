import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart2,
  Lock,
  Megaphone,
  MessageSquare,
  PlusCircle,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
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
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PASSWORD = "amar2026";

// ─── Sample Data ──────────────────────────────────────────────────────────────

const aovTrendData = [
  { month: "Aug", Achar: 320, Sweets: 580, Namkeen: 290, Premium: 780 },
  { month: "Sep", Achar: 345, Sweets: 610, Namkeen: 305, Premium: 820 },
  { month: "Oct", Achar: 410, Sweets: 720, Namkeen: 370, Premium: 950 },
  { month: "Nov", Achar: 490, Sweets: 860, Namkeen: 420, Premium: 1100 },
  { month: "Dec", Achar: 520, Sweets: 940, Namkeen: 440, Premium: 1180 },
  { month: "Jan", Achar: 485, Sweets: 890, Namkeen: 415, Premium: 1050 },
];

const aovByState = [
  { state: "Bihar", aov: 485, orders: 2840, growth: "+18%" },
  { state: "UP", aov: 420, orders: 1650, growth: "+12%" },
  { state: "Haryana", aov: 510, orders: 980, growth: "+24%" },
  { state: "Punjab", aov: 560, orders: 760, growth: "+31%" },
  { state: "Uttarakhand", aov: 445, orders: 430, growth: "+9%" },
];

const aovByOrderCount = [
  { label: "1st Order", aov: 320, customers: 3200 },
  { label: "2nd Order", aov: 385, customers: 2100 },
  { label: "5th Order", aov: 510, customers: 980 },
  { label: "10th+ Order", aov: 680, customers: 420 },
];

const ltvSegments = [
  { segment: "Champions", ltv: 5200, customers: 420, color: "#b45309" },
  { segment: "Loyal", ltv: 3800, customers: 980, color: "#d97706" },
  { segment: "New", ltv: 1200, customers: 3200, color: "#f59e0b" },
  { segment: "At-Risk", ltv: 800, customers: 640, color: "#ef4444" },
];

const seasonalityData = [
  { month: "Jan", index: 95 },
  { month: "Feb", index: 88 },
  { month: "Mar", index: 92 },
  { month: "Apr", index: 105 },
  { month: "May", index: 98 },
  { month: "Jun", index: 85 },
  { month: "Jul", index: 90 },
  { month: "Aug", index: 100 },
  { month: "Sep", index: 112 },
  { month: "Oct", index: 145 },
  { month: "Nov", index: 168 },
  { month: "Dec", index: 155 },
];

const npsTrendData = [
  { month: "Aug", nps: 48 },
  { month: "Sep", nps: 53 },
  { month: "Oct", nps: 57 },
  { month: "Nov", nps: 62 },
  { month: "Dec", nps: 65 },
  { month: "Jan", nps: 62 },
];

const npsDonutData = [
  { name: "Promoters", value: 62, fill: "#16a34a" },
  { name: "Passives", value: 22, fill: "#d97706" },
  { name: "Detractors", value: 16, fill: "#dc2626" },
];

const npsVerbatim = [
  {
    score: 10,
    comment:
      "Anju Devi's Mithila achar is exactly like my nani makes. Will never order from elsewhere.",
    date: "12 Jan",
    segment: "Champion",
  },
  {
    score: 9,
    comment:
      "Delivery was super fast, packaging excellent. Sweets arrived fresh!",
    date: "10 Jan",
    segment: "Loyal",
  },
  {
    score: 7,
    comment: "Good food, but the app could be more responsive on mobile.",
    date: "8 Jan",
    segment: "New",
  },
  {
    score: 4,
    comment: "Delivery was 2 days late. Expected better.",
    date: "5 Jan",
    segment: "At-Risk",
  },
  {
    score: 3,
    comment: "Achar quantity was less than expected for the price.",
    date: "3 Jan",
    segment: "At-Risk",
  },
  {
    score: 9,
    comment: "Love the story behind each aunty. Makes the food feel personal.",
    date: "1 Jan",
    segment: "Loyal",
  },
];

const detractorThemes = [
  { theme: "Delivery delay", count: 42, pct: 38 },
  { theme: "Quantity mismatch", count: 28, pct: 25 },
  { theme: "Mobile UX issues", count: 19, pct: 17 },
  { theme: "Price vs quantity", count: 14, pct: 13 },
  { theme: "Aunty availability", count: 8, pct: 7 },
];

const channelData = [
  {
    channel: "WhatsApp Broadcast",
    reach: 18400,
    clicks: 3280,
    orders: 820,
    revenue: 397700,
    cac: 48,
    roas: 4.8,
    status: "Active",
  },
  {
    channel: "Instagram Reels",
    reach: 54000,
    clicks: 4860,
    orders: 680,
    revenue: 329800,
    cac: 62,
    roas: 3.9,
    status: "Active",
  },
  {
    channel: "Referral Program",
    reach: 8200,
    clicks: 2870,
    orders: 580,
    revenue: 281300,
    cac: 28,
    roas: 5.9,
    status: "Active",
  },
  {
    channel: "Sponsored Listings",
    reach: 12600,
    clicks: 1890,
    orders: 310,
    revenue: 150350,
    cac: 95,
    roas: 2.4,
    status: "Active",
  },
  {
    channel: "Email Newsletter",
    reach: 9800,
    clicks: 1470,
    orders: 220,
    revenue: 106700,
    cac: 38,
    roas: 3.2,
    status: "Active",
  },
  {
    channel: "Meta Ads",
    reach: 82000,
    clicks: 6560,
    orders: 420,
    revenue: 203700,
    cac: 110,
    roas: 2.2,
    status: "Paused",
  },
];

const channelMixData = [
  { name: "WhatsApp", value: 26, fill: "#25d366" },
  { name: "Instagram", value: 22, fill: "#e1306c" },
  { name: "Referral", value: 18, fill: "#b45309" },
  { name: "Sponsored", value: 10, fill: "#d97706" },
  { name: "Email", value: 7, fill: "#f59e0b" },
  { name: "Meta Ads", value: 13, fill: "#1877f2" },
  { name: "Organic", value: 4, fill: "#6b7280" },
];

const cacTrendData = [
  { month: "Nov", WhatsApp: 52, Instagram: 71, Referral: 35, Meta: 128 },
  { month: "Dec", WhatsApp: 49, Instagram: 65, Referral: 31, Meta: 118 },
  { month: "Jan", WhatsApp: 48, Instagram: 62, Referral: 28, Meta: 110 },
];

const campaigns = [
  {
    id: 1,
    name: "Diwali Special",
    type: "Festival Special",
    start: "1 Nov",
    end: "15 Nov",
    budget: 25000,
    spend: 24200,
    orders: 680,
    revenue: 329800,
    roi: "13.6x",
    status: "Completed",
  },
  {
    id: 2,
    name: "Bihar Launch Boost",
    type: "State Launch",
    start: "10 Dec",
    end: "31 Dec",
    budget: 15000,
    spend: 13800,
    orders: 420,
    revenue: 203700,
    roi: "14.8x",
    status: "Completed",
  },
  {
    id: 3,
    name: "First Order Offer",
    type: "New Customer",
    start: "1 Jan",
    end: "31 Jan",
    budget: 20000,
    spend: 11400,
    orders: 310,
    revenue: 150350,
    roi: "13.2x",
    status: "Active",
  },
  {
    id: 4,
    name: "Anju Devi Spotlight",
    type: "Aunty Spotlight",
    start: "5 Jan",
    end: "20 Jan",
    budget: 8000,
    spend: 4200,
    orders: 180,
    revenue: 87300,
    roi: "20.8x",
    status: "Active",
  },
  {
    id: 5,
    name: "Refer & Earn Drive",
    type: "Referral Drive",
    start: "15 Jan",
    end: "15 Feb",
    budget: 12000,
    spend: 2800,
    orders: 95,
    revenue: 46075,
    roi: "16.5x",
    status: "Active",
  },
];

const campaignSpendVsRevenue = campaigns.map((c) => ({
  name: c.name,
  Spend: c.spend,
  Revenue: c.revenue / 10,
}));

const perfChannels = [
  {
    channel: "Meta Ads",
    impressions: 82000,
    cpm: 48,
    ctr: "2.8%",
    cpc: 18,
    conversions: 420,
    cpa: 110,
    roas: 2.2,
  },
  {
    channel: "Google Ads",
    impressions: 34000,
    cpm: 62,
    ctr: "3.4%",
    cpc: 24,
    conversions: 180,
    cpa: 98,
    roas: 2.8,
  },
  {
    channel: "WhatsApp Broadcast",
    impressions: 18400,
    cpm: 12,
    ctr: "17.8%",
    cpc: 4,
    conversions: 820,
    cpa: 48,
    roas: 4.8,
  },
];

const weeklyBurnData = [
  { week: "W1 Dec", Meta: 4800, Google: 2200, WhatsApp: 1400 },
  { week: "W2 Dec", Meta: 5100, Google: 2800, WhatsApp: 1600 },
  { week: "W3 Dec", Meta: 4600, Google: 2100, WhatsApp: 2200 },
  { week: "W4 Dec", Meta: 3200, Google: 1800, WhatsApp: 1800 },
  { week: "W1 Jan", Meta: 0, Google: 1900, WhatsApp: 2400 },
  { week: "W2 Jan", Meta: 0, Google: 2100, WhatsApp: 2600 },
];

const aiSuggestions = [
  {
    icon: "🎯",
    title: "Increase WhatsApp Budget",
    desc: "WhatsApp has the best ROAS (4.8x) and lowest CAC (₹48). Reallocating ₹5,000 from Meta here could yield ~100 additional orders.",
    impact: "High",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: "⚡",
    title: "Referral Programme Underinvested",
    desc: "Referral CAC is ₹28 — cheapest of all channels. Doubling the referral reward budget from ₹12k to ₹24k projects 580 → 1,100 orders.",
    impact: "High",
    color: "bg-amber-50 border-amber-200",
  },
  {
    icon: "⏸️",
    title: "Pause Meta Ads Temporarily",
    desc: "Meta ROAS 2.2x is below break-even threshold of 2.5x. Pause and redirect to WhatsApp + Referral until creative is refreshed.",
    impact: "Medium",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: "📅",
    title: "Festival Calendar Prep",
    desc: "Holi falls in March. Historical data shows 68% spike in sweets. Pre-build Holi campaign budget of ₹30k with 30-day lead time.",
    impact: "Medium",
    color: "bg-blue-50 border-blue-200",
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  change,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}) {
  const isPositive = change.startsWith("+");
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {change}
          </span>
        </div>
        <p className="text-xl font-bold font-display">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  );
}

const CHART_COLORS = ["#b45309", "#d97706", "#f59e0b", "#fbbf24"];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function MarketingHubPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [attributionModel, setAttributionModel] = useState("Last Click");
  const [npsDays, setNpsDays] = useState("2");
  const [createOpen, setCreateOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Festival Special",
    channel: "WhatsApp",
    budget: "",
    start: "",
    end: "",
    segment: "All Customers",
    goal: "",
  });

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-amber-700" />
            </div>
            <CardTitle className="font-display text-xl">
              Marketing Hub
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Internal access only
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setPwError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              data-ocid="marketing.password_input"
              className={pwError ? "border-red-400" : ""}
            />
            {pwError && (
              <p className="text-red-500 text-xs">Incorrect password</p>
            )}
            <Button
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              onClick={handleLogin}
              data-ocid="marketing.login_button"
            >
              Access Hub
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Marketing Hub
              </h1>
              <p className="text-sm text-muted-foreground">
                AOV · LTV · NPS · Channel Performance · Campaigns · Paid Media
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" data-ocid="marketing.tab">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-amber-100/60 p-1">
            {[
              { value: "overview", label: "Overview" },
              { value: "aov-ltv", label: "AOV & LTV" },
              { value: "nps", label: "NPS & Sentiment" },
              { value: "channels", label: "Channels" },
              { value: "campaigns", label: "Campaigns" },
              { value: "performance", label: "Performance" },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                data-ocid={`marketing.${t.value.replace("-", "_")}.tab`}
                className="text-xs sm:text-sm data-[state=active]:bg-amber-700 data-[state=active]:text-white"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── TAB 1: OVERVIEW ── */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              <KpiCard
                label="Avg Order Value"
                value="₹485"
                change="+12%"
                icon={TrendingUp}
                color="bg-amber-100 text-amber-700"
              />
              <KpiCard
                label="Lifetime Value"
                value="₹2,840"
                change="+8%"
                icon={Users}
                color="bg-orange-100 text-orange-700"
              />
              <KpiCard
                label="NPS Score"
                value="62"
                change="+4 pts"
                icon={Star}
                color="bg-yellow-100 text-yellow-700"
              />
              <KpiCard
                label="Blended ROAS"
                value="3.2x"
                change="+0.4x"
                icon={BarChart2}
                color="bg-green-100 text-green-700"
              />
              <KpiCard
                label="Total Mktg Spend"
                value="₹56,200"
                change="+18%"
                icon={Target}
                color="bg-blue-100 text-blue-700"
              />
              <KpiCard
                label="Revenue from Mktg"
                value="₹7.8L"
                change="+22%"
                icon={Sparkles}
                color="bg-purple-100 text-purple-700"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    AOV Trend by Category (6 months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={aovTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => `₹${v}`} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      {["Achar", "Sweets", "Namkeen", "Premium"].map(
                        (key, i) => (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={CHART_COLORS[i]}
                            strokeWidth={2}
                            dot={false}
                          />
                        ),
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    Channel ROAS Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={channelData.filter((c) => c.status === "Active")}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis
                        dataKey="channel"
                        type="category"
                        tick={{ fontSize: 9 }}
                        width={100}
                      />
                      <Tooltip formatter={(v: number) => `${v}x`} />
                      <Bar
                        dataKey="roas"
                        fill="#b45309"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick nav cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { tab: "aov-ltv", emoji: "📈", label: "AOV & LTV Analysis" },
                { tab: "nps", emoji: "⭐", label: "NPS & Sentiment" },
                { tab: "channels", emoji: "📡", label: "Channel Performance" },
                { tab: "campaigns", emoji: "🚀", label: "Campaign Tracker" },
                { tab: "performance", emoji: "💰", label: "Performance Mktg" },
              ].map((item) => (
                <Card
                  key={item.tab}
                  className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="pt-4 pb-3 text-center">
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── TAB 2: AOV & LTV ── */}
          <TabsContent value="aov-ltv">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    AOV Trend by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={aovTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => `₹${v}`} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      {["Achar", "Sweets", "Namkeen", "Premium"].map(
                        (key, i) => (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={CHART_COLORS[i]}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        ),
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    AOV by Order Count (Progression)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={aovByOrderCount}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => `₹${v}`} />
                      <Bar dataKey="aov" fill="#d97706" radius={[4, 4, 0, 0]}>
                        {aovByOrderCount.map((entry, i) => (
                          <Cell key={entry.label} fill={CHART_COLORS[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    AOV by State
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="overflow-x-auto"
                    data-ocid="marketing.aov_state.table"
                  >
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-xs text-muted-foreground">
                          <th className="text-left pb-2 font-medium">State</th>
                          <th className="text-right pb-2 font-medium">
                            AOV (₹)
                          </th>
                          <th className="text-right pb-2 font-medium">
                            Orders
                          </th>
                          <th className="text-right pb-2 font-medium">
                            Growth
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {aovByState.map((row, i) => (
                          <tr
                            key={row.state}
                            data-ocid={`marketing.aov_state.item.${i + 1}`}
                          >
                            <td className="py-2 font-medium">{row.state}</td>
                            <td className="py-2 text-right font-bold">
                              ₹{row.aov}
                            </td>
                            <td className="py-2 text-right">
                              {row.orders.toLocaleString()}
                            </td>
                            <td className="py-2 text-right">
                              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                {row.growth}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    LTV by Customer Segment (12-month predicted)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ltvSegments.map((seg) => (
                    <div key={seg.segment}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{seg.segment}</span>
                        <span className="text-muted-foreground">
                          {seg.customers.toLocaleString()} customers ·{" "}
                          <strong>₹{seg.ltv.toLocaleString()} LTV</strong>
                        </span>
                      </div>
                      <Progress
                        value={(seg.ltv / 6000) * 100}
                        className="h-2"
                        style={
                          {
                            "--progress-color": seg.color,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  ))}
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800">
                      <strong>Blended LTV: ₹2,840</strong> — Champions drive
                      3.8x more LTV than New customers. Focus retention spend on
                      Loyal → Champion upgrade path.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display">
                  Seasonality Index (festival spikes)
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Base index = 100. Oct–Dec spike driven by Navratri, Diwali,
                  festivals.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={seasonalityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[60, 180]} />
                    <Tooltip />
                    <Bar dataKey="index" radius={[3, 3, 0, 0]}>
                      {seasonalityData.map((d, _i) => (
                        <Cell
                          key={d.month}
                          fill={
                            d.index >= 140
                              ? "#b45309"
                              : d.index >= 100
                                ? "#d97706"
                                : "#f59e0b"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 3: NPS & SENTIMENT ── */}
          <TabsContent value="nps">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {/* NPS Gauge */}
              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-display">
                    Current NPS Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={160}>
                    <RadialBarChart
                      cx="50%"
                      cy="70%"
                      innerRadius="60%"
                      outerRadius="80%"
                      data={[{ value: 62, fill: "#16a34a" }]}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        dataKey="value"
                        cornerRadius={8}
                        background={{ fill: "#f0fdf4" }}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="-mt-10 text-center">
                    <p className="text-4xl font-bold font-display text-green-700">
                      62
                    </p>
                    <p className="text-xs text-muted-foreground">out of 100</p>
                    <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">
                      Good
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Donut */}
              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-display">
                    Promoter / Passive / Detractor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={npsDonutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {npsDonutData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 text-xs mt-1">
                    {npsDonutData.map((d) => (
                      <span
                        key={d.name}
                        style={{ color: d.fill }}
                        className="font-semibold"
                      >
                        {d.value}% {d.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* NPS Trend */}
              <Card className="shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-display">
                    NPS Trend (6 months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={npsTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[40, 70]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="nps"
                        stroke="#16a34a"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#16a34a" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Survey config */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display">
                  Survey Trigger Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">
                      Trigger post-delivery after
                    </Label>
                    <Input
                      type="number"
                      className="w-16 h-8 text-sm text-center"
                      value={npsDays}
                      onChange={(e) => setNpsDays(e.target.value)}
                      data-ocid="marketing.nps_days_input"
                    />
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Channel:
                    </span>
                    <Badge variant="outline" className="text-xs">
                      WhatsApp
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Email
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 bg-amber-700 hover:bg-amber-800 text-white"
                    data-ocid="marketing.nps_save_button"
                  >
                    Save Config
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Verbatim table */}
              <Card className="shadow-sm lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    Recent NPS Responses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-2"
                    data-ocid="marketing.nps_responses.list"
                  >
                    {npsVerbatim.map((r, i) => (
                      <div
                        key={r.date + r.score}
                        className="flex gap-3 p-2.5 rounded-lg bg-muted/40"
                        data-ocid={`marketing.nps_responses.item.${i + 1}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                            r.score >= 9
                              ? "bg-green-100 text-green-700"
                              : r.score >= 7
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.score}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground leading-relaxed">
                            {r.comment}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-muted-foreground">
                              {r.date}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[10px] h-4 px-1"
                            >
                              {r.segment}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detractor themes */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    Top Detractor Themes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {detractorThemes.map((t) => (
                    <div key={t.theme}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{t.theme}</span>
                        <span className="text-muted-foreground">
                          {t.count} mentions ({t.pct}%)
                        </span>
                      </div>
                      <Progress value={t.pct} className="h-1.5" />
                    </div>
                  ))}
                  <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-700">
                      <strong>Action:</strong> Delivery delay is the #1
                      detractor driver. Shiprocket SLA monitoring is key to NPS
                      improvement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── TAB 4: CHANNEL PERFORMANCE ── */}
          <TabsContent value="channels">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <Card className="shadow-sm lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    ROAS by Channel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={channelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis dataKey="channel" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v: number) => `${v}x`} />
                      <Bar dataKey="roas" radius={[4, 4, 0, 0]}>
                        {channelData.map((d) => (
                          <Cell
                            key={d.channel}
                            fill={d.status === "Paused" ? "#9ca3af" : "#d97706"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    Channel Mix (% of orders)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={channelMixData}
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        dataKey="value"
                      >
                        {channelMixData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {channelMixData.map((d) => (
                      <span
                        key={d.name}
                        className="text-[10px] flex items-center gap-0.5"
                      >
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: d.fill }}
                        />
                        {d.name} {d.value}%
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Channel table */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display">
                  All Channels — Performance Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-x-auto"
                  data-ocid="marketing.channel.table"
                >
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Channel</th>
                        <th className="text-right pb-2 font-medium">Reach</th>
                        <th className="text-right pb-2 font-medium">Clicks</th>
                        <th className="text-right pb-2 font-medium">Orders</th>
                        <th className="text-right pb-2 font-medium">Revenue</th>
                        <th className="text-right pb-2 font-medium">CAC (₹)</th>
                        <th className="text-right pb-2 font-medium">ROAS</th>
                        <th className="text-center pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {channelData.map((row, i) => (
                        <tr
                          key={row.channel}
                          data-ocid={`marketing.channel.item.${i + 1}`}
                        >
                          <td className="py-2 font-medium">{row.channel}</td>
                          <td className="py-2 text-right">
                            {row.reach.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">
                            {row.clicks.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">{row.orders}</td>
                          <td className="py-2 text-right">
                            ₹{row.revenue.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">₹{row.cac}</td>
                          <td className="py-2 text-right font-bold">
                            {row.roas}x
                          </td>
                          <td className="py-2 text-center">
                            <Badge
                              className={`text-[10px] ${
                                row.status === "Active"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-600 border-gray-200"
                              }`}
                            >
                              {row.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* CAC trend */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display">
                  CAC Trend per Channel (3 months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={cacTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: number) => `₹${v}`} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    {["WhatsApp", "Instagram", "Referral", "Meta"].map(
                      (key, i) => (
                        <Line
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={CHART_COLORS[i]}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      ),
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 5: CAMPAIGNS ── */}
          <TabsContent value="campaigns">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display font-semibold text-base">
                Active & Past Campaigns
              </h2>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-amber-700 hover:bg-amber-800 text-white gap-1"
                    data-ocid="marketing.campaign_open_modal_button"
                  >
                    <PlusCircle className="w-4 h-4" /> Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-md"
                  data-ocid="marketing.campaign.dialog"
                >
                  <DialogHeader>
                    <DialogTitle className="font-display">
                      New Campaign
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <div>
                      <Label className="text-xs">Campaign Name</Label>
                      <Input
                        className="mt-1"
                        placeholder="e.g. Holi Sweets Special"
                        value={newCampaign.name}
                        onChange={(e) =>
                          setNewCampaign({
                            ...newCampaign,
                            name: e.target.value,
                          })
                        }
                        data-ocid="marketing.campaign_name.input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={newCampaign.type}
                          onValueChange={(v) =>
                            setNewCampaign({ ...newCampaign, type: v })
                          }
                        >
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="marketing.campaign_type.select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Festival Special",
                              "New Customer",
                              "Aunty Spotlight",
                              "State Launch",
                              "Referral Drive",
                            ].map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Channel</Label>
                        <Select
                          value={newCampaign.channel}
                          onValueChange={(v) =>
                            setNewCampaign({ ...newCampaign, channel: v })
                          }
                        >
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="marketing.campaign_channel.select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "WhatsApp",
                              "Instagram",
                              "Email",
                              "Meta Ads",
                              "All Channels",
                            ].map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Budget (₹)</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          placeholder="10000"
                          value={newCampaign.budget}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              budget: e.target.value,
                            })
                          }
                          data-ocid="marketing.campaign_budget.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Target Segment</Label>
                        <Select
                          value={newCampaign.segment}
                          onValueChange={(v) =>
                            setNewCampaign({ ...newCampaign, segment: v })
                          }
                        >
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="marketing.campaign_segment.select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "All Customers",
                              "New",
                              "Loyal",
                              "At-Risk",
                              "Champions",
                            ].map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Start Date</Label>
                        <Input
                          className="mt-1"
                          type="date"
                          value={newCampaign.start}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              start: e.target.value,
                            })
                          }
                          data-ocid="marketing.campaign_start.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">End Date</Label>
                        <Input
                          className="mt-1"
                          type="date"
                          value={newCampaign.end}
                          onChange={(e) =>
                            setNewCampaign({
                              ...newCampaign,
                              end: e.target.value,
                            })
                          }
                          data-ocid="marketing.campaign_end.input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Goal / KPI</Label>
                      <Input
                        className="mt-1"
                        placeholder="e.g. 200 orders, ₹1L revenue"
                        value={newCampaign.goal}
                        onChange={(e) =>
                          setNewCampaign({
                            ...newCampaign,
                            goal: e.target.value,
                          })
                        }
                        data-ocid="marketing.campaign_goal.input"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        className="flex-1 bg-amber-700 hover:bg-amber-800 text-white"
                        onClick={() => setCreateOpen(false)}
                        data-ocid="marketing.campaign_confirm_button"
                      >
                        Launch Campaign
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCreateOpen(false)}
                        data-ocid="marketing.campaign_cancel_button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="shadow-sm mb-4">
              <CardContent className="pt-4">
                <div
                  className="overflow-x-auto"
                  data-ocid="marketing.campaigns.table"
                >
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Campaign</th>
                        <th className="text-left pb-2 font-medium">Type</th>
                        <th className="text-right pb-2 font-medium">Budget</th>
                        <th className="text-right pb-2 font-medium">Spend</th>
                        <th className="text-right pb-2 font-medium">Orders</th>
                        <th className="text-right pb-2 font-medium">Revenue</th>
                        <th className="text-right pb-2 font-medium">ROI</th>
                        <th className="text-center pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {campaigns.map((c, i) => (
                        <tr
                          key={c.id}
                          data-ocid={`marketing.campaigns.item.${i + 1}`}
                        >
                          <td className="py-2">
                            <p className="font-medium">{c.name}</p>
                            <p className="text-muted-foreground">
                              {c.start} → {c.end}
                            </p>
                          </td>
                          <td className="py-2">
                            <Badge variant="outline" className="text-[10px]">
                              {c.type}
                            </Badge>
                          </td>
                          <td className="py-2 text-right">
                            ₹{c.budget.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">
                            ₹{c.spend.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">{c.orders}</td>
                          <td className="py-2 text-right">
                            ₹{c.revenue.toLocaleString()}
                          </td>
                          <td className="py-2 text-right font-bold text-green-700">
                            {c.roi}
                          </td>
                          <td className="py-2 text-center">
                            <Badge
                              className={`text-[10px] ${
                                c.status === "Active"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {c.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display">
                  Campaign Spend vs Revenue (₹ Revenue / 10 for scale)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={campaignSpendVsRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      formatter={(v: number, name: string) =>
                        name === "Revenue" ? `₹${v * 10}` : `₹${v}`
                      }
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Spend" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                    <Bar
                      dataKey="Revenue"
                      fill="#b45309"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 6: PERFORMANCE MARKETING ── */}
          <TabsContent value="performance">
            {/* Attribution model */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-700" />{" "}
                  Attribution Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {["Last Click", "First Click", "Linear"].map((model) => (
                    <Button
                      key={model}
                      size="sm"
                      variant={
                        attributionModel === model ? "default" : "outline"
                      }
                      className={
                        attributionModel === model
                          ? "bg-amber-700 hover:bg-amber-800 text-white"
                          : ""
                      }
                      onClick={() => setAttributionModel(model)}
                      data-ocid={`marketing.attribution_${model.toLowerCase().replace(" ", "_")}.toggle`}
                    >
                      {model}
                    </Button>
                  ))}
                  <p className="text-xs text-muted-foreground self-center ml-2">
                    Currently using: <strong>{attributionModel}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Paid channels */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display">
                  Paid Channel Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-x-auto"
                  data-ocid="marketing.perf_channels.table"
                >
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Channel</th>
                        <th className="text-right pb-2 font-medium">
                          Impressions
                        </th>
                        <th className="text-right pb-2 font-medium">CPM (₹)</th>
                        <th className="text-right pb-2 font-medium">CTR</th>
                        <th className="text-right pb-2 font-medium">CPC (₹)</th>
                        <th className="text-right pb-2 font-medium">
                          Conversions
                        </th>
                        <th className="text-right pb-2 font-medium">CPA (₹)</th>
                        <th className="text-right pb-2 font-medium">ROAS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {perfChannels.map((row, i) => (
                        <tr
                          key={row.channel}
                          data-ocid={`marketing.perf_channels.item.${i + 1}`}
                        >
                          <td className="py-2 font-medium">{row.channel}</td>
                          <td className="py-2 text-right">
                            {row.impressions.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">₹{row.cpm}</td>
                          <td className="py-2 text-right">{row.ctr}</td>
                          <td className="py-2 text-right">₹{row.cpc}</td>
                          <td className="py-2 text-right">{row.conversions}</td>
                          <td className="py-2 text-right">₹{row.cpa}</td>
                          <td className="py-2 text-right">
                            <span
                              className={`font-bold ${
                                row.roas >= 4
                                  ? "text-green-700"
                                  : row.roas >= 2.5
                                    ? "text-amber-700"
                                    : "text-red-600"
                              }`}
                            >
                              {row.roas}x
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Weekly burn + AI recommendations side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    Weekly Spend Burn Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyBurnData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8d0" />
                      <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        formatter={(v: number) => `₹${v.toLocaleString()}`}
                      />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Meta" stackId="a" fill="#1877f2" />
                      <Bar dataKey="Google" stackId="a" fill="#34a853" />
                      <Bar dataKey="WhatsApp" stackId="a" fill="#25d366" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> AI Budget
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {aiSuggestions.map((s) => (
                    <div
                      key={s.title}
                      className={`p-2.5 rounded-lg border ${s.color}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-base shrink-0">{s.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-xs font-semibold">{s.title}</p>
                            <Badge
                              className={`text-[10px] h-4 px-1 ${
                                s.impact === "High"
                                  ? "bg-amber-700 text-white"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {s.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
