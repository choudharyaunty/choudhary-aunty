import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  CheckCircle,
  ChevronRight,
  Edit,
  Gift,
  Lock,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PASSWORD = "amar2026";

// ── Data ────────────────────────────────────────────────────────────

const REFERRAL_MONTHLY = [
  { month: "Jun", sent: 142, converted: 38 },
  { month: "Jul", sent: 189, converted: 54 },
  { month: "Aug", sent: 224, converted: 71 },
  { month: "Sep", sent: 267, converted: 89 },
  { month: "Oct", sent: 312, converted: 108 },
  { month: "Nov", sent: 358, converted: 127 },
];

const REFERRAL_LEADERBOARD = [
  {
    name: "Priya Sharma",
    type: "Customer",
    sent: 18,
    converted: 12,
    coins: 1800,
    status: "Active",
  },
  {
    name: "Anju Devi",
    type: "Aunty",
    sent: 15,
    converted: 9,
    coins: 1500,
    status: "Active",
  },
  {
    name: "Sunita Gupta",
    type: "Customer",
    sent: 14,
    converted: 8,
    coins: 1400,
    status: "Active",
  },
  {
    name: "Rekha Mishra",
    type: "Aunty",
    sent: 11,
    converted: 6,
    coins: 1100,
    status: "Active",
  },
  {
    name: "Meena Patel",
    type: "Customer",
    sent: 9,
    converted: 4,
    coins: 900,
    status: "Inactive",
  },
  {
    name: "Kavita Singh",
    type: "Customer",
    sent: 7,
    converted: 3,
    coins: 700,
    status: "Active",
  },
];

const REFERRAL_ACTIVITY = [
  {
    time: "2 min ago",
    event: "Priya Sharma's referral (Rohit Kumar) placed first order",
    type: "success",
  },
  {
    time: "18 min ago",
    event: "New referral link clicked by unknown user from Patna",
    type: "info",
  },
  {
    time: "1 hr ago",
    event: "Anju Devi earned 50 Asharfi coins — referral converted",
    type: "success",
  },
  {
    time: "3 hrs ago",
    event: "Sunita Gupta sent referral to 3 new contacts via WhatsApp",
    type: "info",
  },
  {
    time: "5 hrs ago",
    event:
      "Kavita Singh's referral (Ananya Roy) registered — awaiting first order",
    type: "pending",
  },
  {
    time: "Yesterday",
    event: "Meena Patel's referral link expired — 2 unregistered clicks",
    type: "warning",
  },
];

const DISCOUNT_CODES = [
  {
    code: "WELCOME20",
    type: "percent",
    value: 20,
    used: 312,
    max: 500,
    expiry: "31 Mar 2026",
    status: "Active",
    categories: "All",
  },
  {
    code: "FIRSTBITE50",
    type: "flat",
    value: 50,
    used: 187,
    max: 200,
    expiry: "28 Feb 2026",
    status: "Active",
    categories: "All",
  },
  {
    code: "BIHAR10",
    type: "percent",
    value: 10,
    used: 89,
    max: 300,
    expiry: "30 Apr 2026",
    status: "Active",
    categories: "Bihar Products",
  },
  {
    code: "DIWALI25",
    type: "percent",
    value: 25,
    used: 420,
    max: 420,
    expiry: "15 Nov 2025",
    status: "Expired",
    categories: "Sweets",
  },
];

const REDEMPTION_DAILY = [
  { day: "Mon", redemptions: 28 },
  { day: "Tue", redemptions: 34 },
  { day: "Wed", redemptions: 41 },
  { day: "Thu", redemptions: 38 },
  { day: "Fri", redemptions: 52 },
  { day: "Sat", redemptions: 67 },
  { day: "Sun", redemptions: 73 },
];

const WA_TRIGGERS = [
  {
    stage: "order_created",
    label: "Order Created",
    template:
      "Hi {customer_name}! 🎉 Your order #{order_id} is confirmed. We're assigning you an Aunty right away!",
    active: true,
    sent: 1842,
    delivered: 1798,
    read: 1654,
    clicked: 421,
  },
  {
    stage: "payment_confirmed",
    label: "Payment Confirmed",
    template:
      "Payment of ₹{amount} received for order #{order_id}. Your Aunty is being notified now! 🙏",
    active: true,
    sent: 1731,
    delivered: 1698,
    read: 1542,
    clicked: 287,
  },
  {
    stage: "chef_acceptance",
    label: "Chef Accepted",
    template:
      "Great news! {aunty_name} has accepted your order #{order_id}. She'll start preparing your food with love soon! ❤️",
    active: true,
    sent: 1689,
    delivered: 1672,
    read: 1589,
    clicked: 312,
  },
  {
    stage: "food_preparation",
    label: "Food Preparation",
    template:
      "Your food is being lovingly prepared by {aunty_name} right now! 👩‍🍳 We'll notify you when it's ready.",
    active: true,
    sent: 1634,
    delivered: 1621,
    read: 1487,
    clicked: 198,
  },
  {
    stage: "ready_for_pickup",
    label: "Ready for Pickup",
    template:
      "Your order #{order_id} is ready! 📦 Dispatch/pickup will happen very soon. Stay tuned!",
    active: true,
    sent: 1612,
    delivered: 1601,
    read: 1512,
    clicked: 334,
  },
  {
    stage: "out_for_delivery",
    label: "Out for Delivery",
    template:
      "Your order is on the way! 🚚 Track here: {tracking_link} — Estimated delivery today!",
    active: true,
    sent: 1589,
    delivered: 1576,
    read: 1489,
    clicked: 876,
  },
  {
    stage: "delivered",
    label: "Delivered",
    template:
      "Delivered! 🎊 How was {aunty_name}'s food? Leave a review and earn 10 Asharfi coins: {tracking_link}",
    active: true,
    sent: 1543,
    delivered: 1531,
    read: 1398,
    clicked: 654,
  },
];

const ABANDONED_SESSIONS = [
  {
    customer: "Amit Kumar",
    product: "Coconut Laddoo (1kg)",
    value: 420,
    abandonedAt: "Today, 11:23 AM",
    elapsed: "2h 15m",
    status: "Pending",
  },
  {
    customer: "Shalini Verma",
    product: "Mango Achar (500g)",
    value: 280,
    abandonedAt: "Today, 09:41 AM",
    elapsed: "4h 02m",
    status: "Nudged",
  },
  {
    customer: "Rahul Jha",
    product: "Namakpara (2kg)",
    value: 560,
    abandonedAt: "Yesterday, 06:15 PM",
    elapsed: "17h 28m",
    status: "Recovered",
  },
  {
    customer: "Pooja Devi",
    product: "Gulab Khaja (500g)",
    value: 340,
    abandonedAt: "Yesterday, 03:50 PM",
    elapsed: "19h 53m",
    status: "Nudged",
  },
  {
    customer: "Vikas Mishra",
    product: "Sattu Ladoo (1kg)",
    value: 380,
    abandonedAt: "Yesterday, 01:20 PM",
    elapsed: "22h 23m",
    status: "Expired",
  },
  {
    customer: "Deepa Sharma",
    product: "Coconut Laddoo (2kg)",
    value: 720,
    abandonedAt: "2 days ago",
    elapsed: "44h+",
    status: "Recovered",
  },
  {
    customer: "Ankit Roy",
    product: "Mango Achar (1kg)",
    value: 490,
    abandonedAt: "2 days ago",
    elapsed: "43h+",
    status: "Expired",
  },
  {
    customer: "Nisha Pandey",
    product: "Namakpara (1kg)",
    value: 310,
    abandonedAt: "3 days ago",
    elapsed: "68h+",
    status: "Recovered",
  },
];

const RECOVERY_CHART = [
  { day: "1", abandoned: 18, recovered: 6 },
  { day: "5", abandoned: 22, recovered: 9 },
  { day: "10", abandoned: 19, recovered: 7 },
  { day: "15", abandoned: 25, recovered: 11 },
  { day: "20", abandoned: 21, recovered: 8 },
  { day: "25", abandoned: 28, recovered: 13 },
  { day: "30", abandoned: 24, recovered: 10 },
];

// ── Helpers ──────────────────────────────────────────────────────────

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Inactive: "bg-gray-100 text-gray-500",
    Expired: "bg-red-100 text-red-600",
    Pending: "bg-amber-100 text-amber-700",
    Nudged: "bg-blue-100 text-blue-700",
    Recovered: "bg-emerald-100 text-emerald-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-500";
}

// ── Sub-components ───────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <Card className="border-amber-200/60 bg-white/80">
      <CardContent className="pt-5 pb-4">
        <div
          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-xs text-stone-500 font-medium uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-2xl font-bold text-stone-800">{value}</p>
        <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}

// ── Password Gate ────────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  function attempt() {
    if (pwd === PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPwd("");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm border-amber-200 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-7 h-7 text-amber-700" />
          </div>
          <CardTitle className="text-stone-800 text-xl">
            Growth Engine
          </CardTitle>
          <p className="text-stone-500 text-sm mt-1">
            Internal team access only
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="growth-pwd" className="text-stone-600 text-sm">
              Password
            </Label>
            <Input
              id="growth-pwd"
              type="password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              placeholder="Enter access password"
              className={`mt-1 border-amber-200 focus:ring-amber-400 ${error ? "border-red-400" : ""}`}
              data-ocid="growth.input"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">Incorrect password</p>
            )}
          </div>
          <Button
            onClick={attempt}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            data-ocid="growth.submit_button"
          >
            Access Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────

export default function GrowthEnginePage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [waToggles, setWaToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(WA_TRIGGERS.map((t) => [t.stage, t.active])),
  );
  const [editingTrigger, setEditingTrigger] = useState<
    (typeof WA_TRIGGERS)[0] | null
  >(null);
  const [editTemplate, setEditTemplate] = useState("");
  const [nudge1, setNudge1] = useState("2");
  const [nudge2, setNudge2] = useState("24");
  const [discountToggle, setDiscountToggle] = useState(true);
  const [discountPct, setDiscountPct] = useState("5");
  const [showNewCode, setShowNewCode] = useState(false);
  const [broadcastSegment, setBroadcastSegment] = useState("all");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [abandonedStatuses, setAbandonedStatuses] = useState<
    Record<number, string>
  >(Object.fromEntries(ABANDONED_SESSIONS.map((s, i) => [i, s.status])));

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  function sendNudge(idx: number) {
    setAbandonedStatuses((prev) => ({ ...prev, [idx]: "Nudged" }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Growth Engine</h1>
              <p className="text-amber-200 text-sm">
                Referrals · Discounts · WhatsApp · Abandoned Checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-amber-200 mb-6 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="overview"
              data-ocid="growth.overview.tab"
              className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              data-ocid="growth.referrals.tab"
              className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs"
            >
              Referral Tracking
            </TabsTrigger>
            <TabsTrigger
              value="discounts"
              data-ocid="growth.discounts.tab"
              className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs"
            >
              First Order Discount
            </TabsTrigger>
            <TabsTrigger
              value="whatsapp"
              data-ocid="growth.whatsapp.tab"
              className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs"
            >
              WhatsApp Triggers
            </TabsTrigger>
            <TabsTrigger
              value="abandoned"
              data-ocid="growth.abandoned.tab"
              className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs"
            >
              Abandoned Checkout
            </TabsTrigger>
          </TabsList>

          {/* ── TAB 1: OVERVIEW ── */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <KpiCard
                icon={UserPlus}
                label="Referrals Sent"
                value="1,492"
                sub="+14% vs last month"
                color="bg-blue-100 text-blue-700"
              />
              <KpiCard
                icon={TrendingUp}
                label="Referral Conv. Rate"
                value="35.5%"
                sub="487 converted"
                color="bg-emerald-100 text-emerald-700"
              />
              <KpiCard
                icon={Tag}
                label="Discounts Redeemed"
                value="588"
                sub="WELCOME20 · FIRSTBITE50"
                color="bg-purple-100 text-purple-700"
              />
              <KpiCard
                icon={ShoppingCart}
                label="Cart Recovery Rate"
                value="41.2%"
                sub="From 68 nudged sessions"
                color="bg-amber-100 text-amber-700"
              />
              <KpiCard
                icon={MessageCircle}
                label="WhatsApp CTR"
                value="28.7%"
                sub="Across all triggers"
                color="bg-orange-100 text-orange-700"
              />
              <KpiCard
                icon={Sparkles}
                label="Revenue Attributed"
                value="₹2.4L"
                sub="Growth mechanics total"
                color="bg-rose-100 text-rose-700"
              />
            </div>

            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Monthly Referrals — Sent vs Converted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={REFERRAL_MONTHLY}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e8d8" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="sent"
                      name="Sent"
                      fill="#b45309"
                      radius={[3, 3, 0, 0]}
                    />
                    <Bar
                      dataKey="converted"
                      name="Converted"
                      fill="#10b981"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Referral Tracking", tab: "referrals", icon: Users },
                { label: "Discount Config", tab: "discounts", icon: Gift },
                { label: "WhatsApp Triggers", tab: "whatsapp", icon: Bell },
                {
                  label: "Abandoned Checkout",
                  tab: "abandoned",
                  icon: ShoppingCart,
                },
              ].map(({ label, tab, icon: Icon }) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`growth.${tab}.button`}
                  className="flex items-center justify-between p-3 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-medium text-stone-700">
                      {label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>
          </TabsContent>

          {/* ── TAB 2: REFERRAL TRACKING ── */}
          <TabsContent value="referrals" className="space-y-6">
            {/* Summary bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Referrers", value: "284" },
                { label: "Referred Users", value: "1,492" },
                { label: "Coins Awarded", value: "74,600" },
                { label: "Avg Referrals/User", value: "5.3" },
              ].map(({ label, value }) => (
                <Card
                  key={label}
                  className="border-amber-200/60 bg-white/80 text-center"
                >
                  <CardContent className="pt-4 pb-3">
                    <p className="text-2xl font-bold text-amber-800">{value}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leaderboard */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Referral Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-50">
                      <TableHead className="text-xs">#</TableHead>
                      <TableHead className="text-xs">Name</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Sent</TableHead>
                      <TableHead className="text-xs">Converted</TableHead>
                      <TableHead className="text-xs">Coins</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {REFERRAL_LEADERBOARD.map((row, i) => (
                      <TableRow
                        key={row.name}
                        data-ocid={`growth.referral.item.${i + 1}`}
                      >
                        <TableCell className="text-xs font-bold text-amber-700">
                          {i + 1}
                        </TableCell>
                        <TableCell className="text-xs font-medium">
                          {row.name}
                        </TableCell>
                        <TableCell className="text-xs">
                          <Badge variant="outline" className="text-[10px]">
                            {row.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{row.sent}</TableCell>
                        <TableCell className="text-xs">
                          {row.converted}
                        </TableCell>
                        <TableCell className="text-xs text-amber-700 font-semibold">
                          {row.coins.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge(row.status)}`}
                          >
                            {row.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Funnel */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Referral Funnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-center gap-4 py-4">
                  {[
                    {
                      label: "Sent",
                      value: 1492,
                      pct: 100,
                      color: "bg-amber-200",
                    },
                    {
                      label: "Clicked",
                      value: 891,
                      pct: 60,
                      color: "bg-amber-400",
                    },
                    {
                      label: "Registered",
                      value: 612,
                      pct: 41,
                      color: "bg-amber-600",
                    },
                    {
                      label: "First Order",
                      value: 487,
                      pct: 33,
                      color: "bg-amber-800",
                    },
                  ].map(({ label, value, pct, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className="text-sm font-bold text-stone-700">
                        {value.toLocaleString()}
                      </span>
                      <div
                        className={`w-16 ${color} rounded-t-sm transition-all`}
                        style={{ height: `${pct * 1.5}px` }}
                      />
                      <span className="text-[11px] text-stone-500 text-center">
                        {label}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-700">
                        {pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rules config */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Referral Rule Config
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-stone-600">
                      Coins for Referrer (on conversion)
                    </Label>
                    <Input
                      defaultValue="50"
                      className="mt-1 border-amber-200"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-stone-600">
                      Coins for Referred User (on first order)
                    </Label>
                    <Input
                      defaultValue="25"
                      className="mt-1 border-amber-200"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-stone-600">
                      Max Referrals per User
                    </Label>
                    <Input
                      defaultValue="20"
                      className="mt-1 border-amber-200"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-stone-600">
                      Validation Rule
                    </Label>
                    <Input
                      defaultValue="First order must be paid"
                      disabled
                      className="mt-1 border-amber-200 bg-amber-50"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-amber-700 hover:bg-amber-800 text-white"
                  data-ocid="growth.referral.save_button"
                >
                  Save Rules
                </Button>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Recent Referral Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {REFERRAL_ACTIVITY.map((item) => (
                  <div key={item.time} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                        item.type === "success"
                          ? "bg-emerald-400"
                          : item.type === "warning"
                            ? "bg-red-400"
                            : item.type === "pending"
                              ? "bg-amber-400"
                              : "bg-blue-400"
                      }`}
                    />
                    <div>
                      <p className="text-xs text-stone-700">{item.event}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 3: FIRST ORDER DISCOUNT ── */}
          <TabsContent value="discounts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-stone-700">
                Active Discount Codes
              </h2>
              <Button
                size="sm"
                className="bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => setShowNewCode(true)}
                data-ocid="growth.discount.open_modal_button"
              >
                + New Code
              </Button>
            </div>

            <Card className="border-amber-200/60 bg-white/80">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-50">
                      <TableHead className="text-xs">Code</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Value</TableHead>
                      <TableHead className="text-xs">Used / Max</TableHead>
                      <TableHead className="text-xs">Expiry</TableHead>
                      <TableHead className="text-xs">Categories</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DISCOUNT_CODES.map((row, i) => (
                      <TableRow
                        key={row.code}
                        data-ocid={`growth.discount.item.${i + 1}`}
                      >
                        <TableCell className="text-xs font-mono font-bold text-amber-800">
                          {row.code}
                        </TableCell>
                        <TableCell className="text-xs">
                          {row.type === "percent" ? "% Off" : "₹ Flat"}
                        </TableCell>
                        <TableCell className="text-xs">
                          {row.type === "percent"
                            ? `${row.value}%`
                            : `₹${row.value}`}
                        </TableCell>
                        <TableCell className="text-xs">
                          {row.used} / {row.max}
                        </TableCell>
                        <TableCell className="text-xs">{row.expiry}</TableCell>
                        <TableCell className="text-xs">
                          {row.categories}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge(row.status)}`}
                          >
                            {row.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-[10px] border-amber-200"
                              data-ocid={`growth.discount.edit_button.${i + 1}`}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            {row.status === "Active" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-[10px] border-red-200 text-red-600 hover:bg-red-50"
                                data-ocid={`growth.discount.delete_button.${i + 1}`}
                              >
                                Off
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Create New Code Modal */}
            <Dialog open={showNewCode} onOpenChange={setShowNewCode}>
              <DialogContent className="border-amber-200 max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-stone-800">
                    Create New Discount Code
                  </DialogTitle>
                </DialogHeader>
                <div
                  className="space-y-4 py-2"
                  data-ocid="growth.discount.dialog"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Code Name</Label>
                      <Input
                        placeholder="e.g. NEWUSER30"
                        className="mt-1 border-amber-200"
                        data-ocid="growth.code.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Discount Type</Label>
                      <Select>
                        <SelectTrigger
                          className="mt-1 border-amber-200"
                          data-ocid="growth.code.select"
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percent">% Percentage</SelectItem>
                          <SelectItem value="flat">₹ Flat Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Value</Label>
                      <Input
                        placeholder="e.g. 20"
                        className="mt-1 border-amber-200"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Min Order Value (₹)</Label>
                      <Input
                        placeholder="e.g. 200"
                        className="mt-1 border-amber-200"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Max Redemptions</Label>
                      <Input
                        placeholder="e.g. 500"
                        className="mt-1 border-amber-200"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Expiry Date</Label>
                      <Input type="date" className="mt-1 border-amber-200" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Applicable Categories</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["All", "Achar", "Sweets", "Namkeen", "Premium"].map(
                        (cat) => (
                          <label
                            key={cat}
                            className="flex items-center gap-1.5 text-xs cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={cat === "All"}
                              className="accent-amber-700"
                            />
                            {cat}
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-amber-200"
                    onClick={() => setShowNewCode(false)}
                    data-ocid="growth.code.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-amber-700 hover:bg-amber-800 text-white"
                    onClick={() => setShowNewCode(false)}
                    data-ocid="growth.code.confirm_button"
                  >
                    Create Code
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Redemption analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60 bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-stone-700 text-sm">
                    Redemptions This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      data={REDEMPTION_DAILY}
                      margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0e8d8" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar
                        dataKey="redemptions"
                        name="Redemptions"
                        fill="#b45309"
                        radius={[3, 3, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-amber-200/60 bg-white/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-stone-700 text-sm">
                    Avg Order Value Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {[
                    {
                      label: "With Discount Code",
                      value: 380,
                      max: 600,
                      color: "bg-amber-600",
                    },
                    {
                      label: "Without Discount Code",
                      value: 510,
                      max: 600,
                      color: "bg-stone-400",
                    },
                  ].map(({ label, value, max, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-stone-600">{label}</span>
                        <span className="font-bold text-stone-800">
                          ₹{value}
                        </span>
                      </div>
                      <div className="h-2 bg-amber-100 rounded-full">
                        <div
                          className={`h-2 ${color} rounded-full`}
                          style={{ width: `${(value / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-stone-500 pt-2">
                    Discount users spend 25% less per order but convert at 3×
                    higher rate
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── TAB 4: WHATSAPP TRIGGERS ── */}
          <TabsContent value="whatsapp" className="space-y-6">
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Order Lifecycle Triggers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-50">
                      <TableHead className="text-xs">Stage</TableHead>
                      <TableHead className="text-xs w-64">
                        Template Preview
                      </TableHead>
                      <TableHead className="text-xs">Sent</TableHead>
                      <TableHead className="text-xs">Read</TableHead>
                      <TableHead className="text-xs">Clicked</TableHead>
                      <TableHead className="text-xs">Active</TableHead>
                      <TableHead className="text-xs">Edit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {WA_TRIGGERS.map((trigger, i) => (
                      <TableRow
                        key={trigger.stage}
                        data-ocid={`growth.wa.item.${i + 1}`}
                      >
                        <TableCell className="text-xs font-medium text-stone-700">
                          {trigger.label}
                        </TableCell>
                        <TableCell className="text-[11px] text-stone-500 max-w-xs truncate">
                          {trigger.template}
                        </TableCell>
                        <TableCell className="text-xs">
                          {trigger.sent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs">
                          {trigger.read.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-amber-700 font-semibold">
                          {trigger.clicked.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={waToggles[trigger.stage]}
                            onCheckedChange={(val) =>
                              setWaToggles((p) => ({
                                ...p,
                                [trigger.stage]: val,
                              }))
                            }
                            data-ocid={`growth.wa.toggle.${i + 1}`}
                            className="data-[state=checked]:bg-amber-700"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-[10px] border-amber-200"
                            onClick={() => {
                              setEditingTrigger(trigger);
                              setEditTemplate(trigger.template);
                            }}
                            data-ocid={`growth.wa.edit_button.${i + 1}`}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Template Modal */}
            <Dialog
              open={!!editingTrigger}
              onOpenChange={(o) => !o && setEditingTrigger(null)}
            >
              <DialogContent
                className="border-amber-200 max-w-lg"
                data-ocid="growth.wa.dialog"
              >
                <DialogHeader>
                  <DialogTitle className="text-stone-800">
                    Edit Template — {editingTrigger?.label}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div>
                    <Label className="text-xs text-stone-600">
                      Message Template
                    </Label>
                    <Textarea
                      value={editTemplate}
                      onChange={(e) => setEditTemplate(e.target.value)}
                      rows={4}
                      className="mt-1 border-amber-200 text-sm"
                      data-ocid="growth.wa.textarea"
                    />
                    <p className="text-[10px] text-stone-400 mt-1">
                      {editTemplate.length} / 320 characters
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-600 mb-2">
                      Available Variables:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "{customer_name}",
                        "{aunty_name}",
                        "{order_id}",
                        "{tracking_link}",
                        "{amount}",
                      ].map((v) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => setEditTemplate((t) => `${t} ${v}`)}
                          className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-300 hover:bg-amber-200"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-amber-200"
                    onClick={() => setEditingTrigger(null)}
                    data-ocid="growth.wa.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-amber-700 hover:bg-amber-800 text-white"
                    onClick={() => setEditingTrigger(null)}
                    data-ocid="growth.wa.save_button"
                  >
                    Save Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Broadcast Panel */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Custom Broadcast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Target Segment</Label>
                    <Select
                      value={broadcastSegment}
                      onValueChange={setBroadcastSegment}
                    >
                      <SelectTrigger
                        className="mt-1 border-amber-200"
                        data-ocid="growth.broadcast.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="active">
                          Active Customers (30d)
                        </SelectItem>
                        <SelectItem value="inactive">Inactive 30d+</SelectItem>
                        <SelectItem value="bihar">Bihar Customers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <p className="text-xs text-stone-500">
                      Est. reach:{" "}
                      <span className="font-bold text-stone-700">
                        {broadcastSegment === "all"
                          ? "4,218"
                          : broadcastSegment === "active"
                            ? "1,842"
                            : broadcastSegment === "inactive"
                              ? "1,234"
                              : "892"}
                      </span>{" "}
                      recipients
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Message</Label>
                  <Textarea
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    rows={3}
                    placeholder="Type your broadcast message here…"
                    className="mt-1 border-amber-200 text-sm"
                    data-ocid="growth.broadcast.textarea"
                  />
                </div>
                <Button
                  size="sm"
                  className="bg-amber-700 hover:bg-amber-800 text-white"
                  data-ocid="growth.broadcast.primary_button"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" /> Send WhatsApp
                  Broadcast
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 5: ABANDONED CHECKOUT ── */}
          <TabsContent value="abandoned" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Abandoned Today", value: "12" },
                { label: "Abandoned This Week", value: "68" },
                { label: "Recovery Rate", value: "41.2%" },
                { label: "Revenue Recovered", value: "₹18,420" },
              ].map(({ label, value }) => (
                <Card
                  key={label}
                  className="border-amber-200/60 bg-white/80 text-center"
                >
                  <CardContent className="pt-4 pb-3">
                    <p className="text-2xl font-bold text-amber-800">{value}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sessions table */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Abandoned Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-50">
                      <TableHead className="text-xs">Customer</TableHead>
                      <TableHead className="text-xs">Product</TableHead>
                      <TableHead className="text-xs">Value</TableHead>
                      <TableHead className="text-xs">Abandoned At</TableHead>
                      <TableHead className="text-xs">Elapsed</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ABANDONED_SESSIONS.map((row, i) => {
                      const currentStatus = abandonedStatuses[i] ?? row.status;
                      return (
                        <TableRow
                          key={row.customer}
                          data-ocid={`growth.abandoned.item.${i + 1}`}
                        >
                          <TableCell className="text-xs font-medium">
                            {row.customer}
                          </TableCell>
                          <TableCell className="text-xs text-stone-500">
                            {row.product}
                          </TableCell>
                          <TableCell className="text-xs font-semibold">
                            ₹{row.value}
                          </TableCell>
                          <TableCell className="text-xs text-stone-500">
                            {row.abandonedAt}
                          </TableCell>
                          <TableCell className="text-xs">
                            {row.elapsed}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge(currentStatus)}`}
                            >
                              {currentStatus}
                            </span>
                          </TableCell>
                          <TableCell>
                            {currentStatus === "Pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-[10px] border-amber-300 text-amber-700"
                                onClick={() => sendNudge(i)}
                                data-ocid={`growth.abandoned.button.${i + 1}`}
                              >
                                <MessageCircle className="w-3 h-3 mr-1" /> Nudge
                              </Button>
                            )}
                            {currentStatus === "Nudged" && (
                              <span className="text-[10px] text-blue-500">
                                Nudge sent
                              </span>
                            )}
                            {(currentStatus === "Recovered" ||
                              currentStatus === "Expired") && (
                              <span className="text-[10px] text-stone-400">
                                {currentStatus}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recovery Config */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Recovery Config
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">
                      First Nudge — Hours After Abandonment
                    </Label>
                    <Input
                      type="number"
                      value={nudge1}
                      onChange={(e) => setNudge1(e.target.value)}
                      className="mt-1 border-amber-200 w-24"
                      data-ocid="growth.recovery.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">
                      Second Nudge — Hours After Abandonment
                    </Label>
                    <Input
                      type="number"
                      value={nudge2}
                      onChange={(e) => setNudge2(e.target.value)}
                      className="mt-1 border-amber-200 w-24"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Recovery Message Template</Label>
                  <Textarea
                    defaultValue="Hey {customer_name}! You left something behind 🛒 Your cart with {product_name} is still waiting. Complete your order here: {payment_link}"
                    rows={3}
                    className="mt-1 border-amber-200 text-sm"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={discountToggle}
                    onCheckedChange={setDiscountToggle}
                    className="data-[state=checked]:bg-amber-700"
                    data-ocid="growth.recovery.switch"
                  />
                  <Label className="text-xs">
                    Offer discount on recovery nudge
                  </Label>
                  {discountToggle && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={discountPct}
                        onChange={(e) => setDiscountPct(e.target.value)}
                        className="w-16 h-7 text-xs border-amber-200"
                      />
                      <span className="text-xs text-stone-600">% off</span>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  className="bg-amber-700 hover:bg-amber-800 text-white"
                  data-ocid="growth.recovery.save_button"
                >
                  Save Config
                </Button>
              </CardContent>
            </Card>

            {/* Recovery Chart */}
            <Card className="border-amber-200/60 bg-white/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-stone-700 text-base">
                  Recovery Rate — Last 30 Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={RECOVERY_CHART}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e8d8" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11 }}
                      label={{
                        value: "Day of month",
                        position: "insideBottom",
                        offset: -2,
                        fontSize: 10,
                      }}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="abandoned"
                      name="Abandoned"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="recovered"
                      name="Recovered"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
