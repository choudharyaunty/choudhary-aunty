import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Coins,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PASSWORD = "amar2026";

const MONTHLY_CHART_DATA = [
  { month: "Jun", issued: 48200, redeemed: 22100 },
  { month: "Jul", issued: 61400, redeemed: 28900 },
  { month: "Aug", issued: 72800, redeemed: 31400 },
  { month: "Sep", issued: 89300, redeemed: 35700 },
  { month: "Oct", issued: 1_04_200, redeemed: 38200 },
  { month: "Nov", issued: 1_18_500, redeemed: 42800 },
];

const EARN_RULES = [
  {
    trigger: "Place an order",
    coins: "10 per ₹100 spent",
    who: "Customer",
    active: true,
    notes: "Rounded down",
  },
  {
    trigger: "Write a verified review",
    coins: "25 coins",
    who: "Customer",
    active: true,
    notes: "1 per order only",
  },
  {
    trigger: "Referral (new user signs up)",
    coins: "100 coins",
    who: "Referrer",
    active: true,
    notes: "On signup",
  },
  {
    trigger: "Referred user's first order",
    coins: "150 coins",
    who: "Both parties",
    active: true,
    notes: "After payment confirmed",
  },
  {
    trigger: "Repeat order (5th+ order)",
    coins: "50 bonus coins",
    who: "Customer",
    active: true,
    notes: "Every 5th order",
  },
  {
    trigger: "Profile completion (100%)",
    coins: "200 coins",
    who: "Customer",
    active: true,
    notes: "One-time only",
  },
  {
    trigger: "Aunty: fulfillment rate >95%",
    coins: "500 coins/month",
    who: "Aunty",
    active: true,
    notes: "Monthly audit",
  },
  {
    trigger: "Aunty: timely delivery streak (10)",
    coins: "300 coins",
    who: "Aunty",
    active: true,
    notes: "Per streak",
  },
  {
    trigger: "Aunty: repeat customer earns",
    coins: "20 coins per repeat",
    who: "Aunty",
    active: true,
    notes: "Customer returns",
  },
  {
    trigger: "Aunty: profile + FSSAI complete",
    coins: "300 coins",
    who: "Aunty",
    active: true,
    notes: "One-time",
  },
  {
    trigger: "Double Coin Event (admin trigger)",
    coins: "2× multiplier",
    who: "Both",
    active: false,
    notes: "See Tab 6",
  },
];

const EXPIRY_COHORTS = [
  {
    range: "Within 7 days",
    customers: 142,
    coins: 3400,
    liability: 850,
    urgency: "critical",
  },
  {
    range: "8–30 days",
    customers: 387,
    coins: 9000,
    liability: 2250,
    urgency: "warning",
  },
  {
    range: "31–60 days",
    customers: 612,
    coins: 18600,
    liability: 4650,
    urgency: "monitor",
  },
  {
    range: "61–90 days",
    customers: 841,
    coins: 31200,
    liability: 7800,
    urgency: "monitor",
  },
];

const KYC_CUSTOMERS = [
  {
    name: "Amit Verma",
    phone: "+91 98765 43210",
    tier: 2,
    balance: 12400,
    coins: 8200,
    dailyUsed: 3500,
    status: "Active",
  },
  {
    name: "Priya Singh",
    phone: "+91 87654 32109",
    tier: 1,
    balance: 3200,
    coins: 1850,
    dailyUsed: 800,
    status: "Active",
  },
  {
    name: "Rahul Yadav",
    phone: "+91 76543 21098",
    tier: 1,
    balance: 4800,
    coins: 3100,
    dailyUsed: 2000,
    status: "Limit Reached",
  },
  {
    name: "Sunita Devi",
    phone: "+91 65432 10987",
    tier: 2,
    balance: 28900,
    coins: 15400,
    dailyUsed: 1200,
    status: "Active",
  },
  {
    name: "Mohan Lal",
    phone: "+91 54321 09876",
    tier: 1,
    balance: 1500,
    coins: 620,
    dailyUsed: 0,
    status: "KYC Pending",
  },
];

const PAST_EVENTS = [
  {
    name: "Holi 2024",
    dates: "Mar 24–25",
    multiplier: "2×",
    issued: 48200,
    status: "Completed",
  },
  {
    name: "Independence Day 2024",
    dates: "Aug 14–15",
    multiplier: "2×",
    issued: 61500,
    status: "Completed",
  },
  {
    name: "Raksha Bandhan 2024",
    dates: "Aug 19",
    multiplier: "3×",
    issued: 39800,
    status: "Completed",
  },
];

const FRAUD_RULES = [
  "Max 1 review per order — duplicate reviews are automatically blocked",
  "Referral validated only after referred user completes first paid order",
  "Self-referral detection: same device fingerprint or IP = blocked instantly",
  "Coin farming: >5 reviews in 24h flagged for manual review and hold",
  "Wallet top-up: max ₹10,000 per day per user regardless of KYC tier",
  "Suspicious redemption: >3 redemptions in 1 hour = temporary 24h hold",
  "New account protection: coins earned not redeemable until account age >48h",
];

const BLOCKED_TXN = [
  {
    id: "TXN-001",
    customer: "+91 98765...",
    trigger: "Referral Abuse",
    reason: "Self-referral detected",
    date: "Today",
    action: "Reviewed",
    severity: "high",
  },
  {
    id: "TXN-002",
    customer: "+91 87654...",
    trigger: "Review Farm",
    reason: "7 reviews in 2h",
    date: "Today",
    action: "Under Review",
    severity: "high",
  },
  {
    id: "TXN-003",
    customer: "+91 76543...",
    trigger: "Redemption Hold",
    reason: "4 redemptions in 45min",
    date: "Yesterday",
    action: "Released",
    severity: "medium",
  },
  {
    id: "TXN-004",
    customer: "+91 65432...",
    trigger: "KYC Mismatch",
    reason: "Name mismatch on wallet",
    date: "2 days ago",
    action: "Escalated",
    severity: "high",
  },
  {
    id: "TXN-005",
    customer: "+91 54321...",
    trigger: "Top-up Limit",
    reason: "₹12,000 attempted",
    date: "3 days ago",
    action: "Blocked",
    severity: "medium",
  },
];

export default function WalletEnginePage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  // Redemption calculator
  const [calcOrder, setCalcOrder] = useState("500");
  const [calcCoins, setCalcCoins] = useState("400");

  // Extension modal
  const [extCustomer, setExtCustomer] = useState("");
  const [extCoins, setExtCoins] = useState("");
  const [extDate, setExtDate] = useState("");
  const [extReason, setExtReason] = useState("");
  const [extOpen, setExtOpen] = useState(false);
  const [extSuccess, setExtSuccess] = useState(false);

  // Double coin event modal
  const [eventOpen, setEventOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventMult, setEventMult] = useState("2x");
  const [eventCat, setEventCat] = useState("All");
  const [eventBudget, setEventBudget] = useState("");
  const [eventSuccess, setEventSuccess] = useState(false);

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  const orderVal = Number.parseFloat(calcOrder) || 0;
  const coinBal = Number.parseFloat(calcCoins) || 0;
  const maxRedeemRupees = orderVal * 0.1;
  const maxRedeemCoins = Math.floor(maxRedeemRupees / 0.25);
  const actualCoins = Math.min(coinBal, maxRedeemCoins);
  const actualRupees = actualCoins * 0.25;
  const remaining = orderVal - actualRupees;

  if (!authed) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <Card className="w-full max-w-sm shadow-xl border-amber-200">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Coins className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="font-display text-xl text-amber-900">
              Wallet & Coins Engine
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
              data-ocid="wallet.input"
              className={pwError ? "border-red-400" : "border-amber-200"}
            />
            {pwError && (
              <p className="text-red-500 text-xs">Incorrect password</p>
            )}
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
              onClick={handleLogin}
              data-ocid="wallet.primary_button"
            >
              <Lock className="w-4 h-4 mr-2" />
              Access Engine
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-24 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-md shrink-0">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-amber-900">
              Wallet & Coins Engine
            </h1>
            <p className="text-sm text-amber-700/70 mt-0.5">
              Asharfi Coin System — Earn, Redeem, Expire, Control
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" data-ocid="wallet.tab">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-amber-100/80 p-1 rounded-xl w-full justify-start">
            {[
              { value: "overview", label: "Overview" },
              { value: "earn", label: "Earn Rules" },
              { value: "redeem", label: "Redeem Rules" },
              { value: "expiry", label: "Coin Expiry" },
              { value: "kyc", label: "KYC & Limits" },
              { value: "events", label: "Double Coin" },
              { value: "fraud", label: "Fraud Prevention" },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="text-xs sm:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white rounded-lg"
                data-ocid={`wallet.${t.value}.tab`}
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ─────────────────────── TAB 1: OVERVIEW ─────────────────────── */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Total Active Wallets",
                  value: "2,847",
                  icon: Wallet,
                  color: "text-amber-700",
                  bg: "bg-amber-50",
                },
                {
                  label: "Asharfi in Circulation",
                  value: "4,28,500",
                  sub: "₹1,07,125 liability",
                  icon: Coins,
                  color: "text-yellow-700",
                  bg: "bg-yellow-50",
                },
                {
                  label: "Coins Redeemed (Month)",
                  value: "38,200",
                  icon: TrendingUp,
                  color: "text-green-700",
                  bg: "bg-green-50",
                },
                {
                  label: "Coins Expiring in 30 Days",
                  value: "12,400",
                  sub: "₹3,100 at risk",
                  icon: Timer,
                  color: "text-orange-700",
                  bg: "bg-orange-50",
                },
                {
                  label: "Wallet Top-ups (Month)",
                  value: "₹1,84,000",
                  icon: Zap,
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                },
                {
                  label: "Fraud Blocked (Month)",
                  value: "23 txns",
                  icon: ShieldAlert,
                  color: "text-red-700",
                  bg: "bg-red-50",
                },
              ].map((k) => (
                <Card key={k.label} className="shadow-sm border-amber-100">
                  <CardContent className="pt-4 pb-3">
                    <div
                      className={`w-8 h-8 ${k.bg} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <k.icon className={`w-4 h-4 ${k.color}`} />
                    </div>
                    <p className="text-xl font-bold font-display text-amber-900">
                      {k.value}
                    </p>
                    {k.sub && (
                      <p className="text-xs text-muted-foreground">{k.sub}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {k.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display text-amber-900">
                  Monthly Coin Issuance vs Redemption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={MONTHLY_CHART_DATA}
                    margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) =>
                        v >= 100000
                          ? `${(v / 100000).toFixed(1)}L`
                          : v >= 1000
                            ? `${(v / 1000).toFixed(0)}K`
                            : String(v)
                      }
                    />
                    <Tooltip
                      formatter={(val: number) => [
                        val.toLocaleString(),
                        undefined,
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="issued"
                      name="Coins Issued"
                      fill="#d97706"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="redeemed"
                      name="Coins Redeemed"
                      fill="#f59e0b"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─────────────────────── TAB 2: EARN RULES ─────────────────────── */}
          <TabsContent value="earn" className="space-y-4">
            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" /> Coin Earning
                  Triggers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="wallet.earn.table"
                  >
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="text-left pb-2 font-medium pr-3">
                          Trigger
                        </th>
                        <th className="text-left pb-2 font-medium pr-3">
                          Coins Earned
                        </th>
                        <th className="text-left pb-2 font-medium pr-3">
                          Applicable To
                        </th>
                        <th className="text-left pb-2 font-medium pr-3">
                          Status
                        </th>
                        <th className="text-left pb-2 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {EARN_RULES.map((rule, i) => (
                        <tr
                          key={rule.trigger}
                          className="hover:bg-amber-50/50"
                          data-ocid={`wallet.earn.item.${i + 1}`}
                        >
                          <td className="py-2 pr-3 font-medium text-xs">
                            {rule.trigger}
                          </td>
                          <td className="py-2 pr-3">
                            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                              {rule.coins}
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-xs">
                            <Badge
                              variant="outline"
                              className="text-[10px] border-amber-200"
                            >
                              {rule.who}
                            </Badge>
                          </td>
                          <td className="py-2 pr-3">
                            {rule.active ? (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                                Active
                              </span>
                            ) : (
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                                Configurable
                              </span>
                            )}
                          </td>
                          <td className="py-2 text-xs text-muted-foreground">
                            {rule.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                  <Coins className="w-4 h-4 text-amber-600 inline mr-2" />
                  <strong className="text-amber-900">1 Asharfi = ₹0.25</strong>
                  <span className="text-amber-700 ml-2">
                    · Coins valid for 180 days from earning date
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─────────────────────── TAB 3: REDEEM RULES ─────────────────────── */}
          <TabsContent value="redeem" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="shadow-sm border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display text-amber-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-600" /> Redemption Cap
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Max{" "}
                    <strong className="text-amber-900">
                      10% of any order value
                    </strong>{" "}
                    can be paid using Asharfi coins.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-2.5 text-xs text-amber-800">
                    <strong>Example:</strong> ₹500 order → max ₹50 (200 coins)
                    redeemable
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Minimum coins to redeem: <strong>50 coins (₹12.50)</strong>
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display text-amber-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" /> Redemption
                    Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Order Value (₹)
                      </Label>
                      <Input
                        value={calcOrder}
                        onChange={(e) => setCalcOrder(e.target.value)}
                        className="h-8 text-sm mt-1 border-amber-200"
                        data-ocid="wallet.redeem.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Coin Balance
                      </Label>
                      <Input
                        value={calcCoins}
                        onChange={(e) => setCalcCoins(e.target.value)}
                        className="h-8 text-sm mt-1 border-amber-200"
                        data-ocid="wallet.redeem_coins.input"
                      />
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2.5 space-y-1.5 text-xs border border-amber-200">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Max Redeemable Coins
                      </span>
                      <span className="font-bold text-amber-800">
                        {actualCoins.toLocaleString()} coins
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rupee Value</span>
                      <span className="font-bold text-green-700">
                        ₹{actualRupees.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-amber-200 pt-1.5">
                      <span className="font-semibold">Remaining Payable</span>
                      <span className="font-bold text-amber-900">
                        ₹{remaining.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display text-amber-900 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-600" /> Wallet Top-up
                    Redemption
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1.5">
                  <p>
                    Customers can use{" "}
                    <strong className="text-amber-900">
                      wallet balance (cash)
                    </strong>{" "}
                    for payment.
                  </p>
                  <p>
                    Wallet balance has <strong>no cap restriction</strong> —
                    only coin redemption is capped at 10%.
                  </p>
                  <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-2 text-blue-800">
                    💡 Cash wallet + coin wallet are separate buckets
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-600" /> Tip
                    Redemption
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1.5">
                  <p>
                    Tips to aunties go{" "}
                    <strong className="text-amber-900">
                      100% to aunty wallet
                    </strong>
                    .
                  </p>
                  <p>
                    Tips earn customer{" "}
                    <strong className="text-amber-900">
                      50 bonus Asharfi coins
                    </strong>
                    .
                  </p>
                  <div className="text-xs bg-pink-50 border border-pink-200 rounded-lg p-2 text-pink-800">
                    No cap on tip amount. No commission deducted on tips.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ─────────────────────── TAB 4: EXPIRY ─────────────────────── */}
          <TabsContent value="expiry" className="space-y-4">
            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display text-amber-900 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-orange-600" /> Coins Expiring
                  by Cohort
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="wallet.expiry.table"
                  >
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="text-left pb-2 font-medium">
                          Expiry Window
                        </th>
                        <th className="text-right pb-2 font-medium">
                          Customers
                        </th>
                        <th className="text-right pb-2 font-medium">
                          Coins at Risk
                        </th>
                        <th className="text-right pb-2 font-medium">
                          ₹ Liability
                        </th>
                        <th className="text-center pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {EXPIRY_COHORTS.map((row, i) => (
                        <tr
                          key={row.range}
                          className="hover:bg-amber-50/50"
                          data-ocid={`wallet.expiry.item.${i + 1}`}
                        >
                          <td className="py-2.5 font-medium text-sm">
                            {row.range}
                          </td>
                          <td className="py-2.5 text-right">{row.customers}</td>
                          <td className="py-2.5 text-right font-semibold text-amber-800">
                            {row.coins.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-right text-red-700 font-semibold">
                            ₹{row.liability.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-center">
                            {row.urgency === "critical" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white"
                                data-ocid={`wallet.expiry.send_reminder.button.${i + 1}`}
                              >
                                <Bell className="w-3 h-3 mr-1" /> Send Reminder
                              </Button>
                            )}
                            {row.urgency === "warning" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-orange-300 text-orange-700"
                                data-ocid={`wallet.expiry.schedule_reminder.button.${i + 1}`}
                              >
                                Schedule Reminder
                              </Button>
                            )}
                            {row.urgency === "monitor" && (
                              <span className="text-xs text-muted-foreground">
                                Monitor
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display text-amber-900">
                  Expiry Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Coins earn date + 180 days = expiry date",
                  "Warning sent at 30 days before expiry (WhatsApp + in-app)",
                  "Final warning sent at 7 days before expiry",
                  "Expired coins are permanently forfeited — no reinstatement",
                  "Admin can issue a one-time coin extension (requires justification log)",
                ].map((rule) => (
                  <div key={rule} className="flex gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{rule}</span>
                  </div>
                ))}

                <div className="pt-2">
                  <Dialog open={extOpen} onOpenChange={setExtOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-amber-400 text-amber-800 hover:bg-amber-50"
                        data-ocid="wallet.expiry.open_modal_button"
                      >
                        <Coins className="w-4 h-4 mr-2" /> Issue Coin Extension
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-sm"
                      data-ocid="wallet.expiry.dialog"
                    >
                      <DialogHeader>
                        <DialogTitle className="font-display text-amber-900">
                          Issue Coin Extension
                        </DialogTitle>
                      </DialogHeader>
                      {extSuccess ? (
                        <div
                          className="text-center py-6"
                          data-ocid="wallet.expiry.success_state"
                        >
                          <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                          <p className="font-semibold text-green-800">
                            Extension issued successfully
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs">Customer Phone</Label>
                            <Input
                              placeholder="+91 XXXXX XXXXX"
                              value={extCustomer}
                              onChange={(e) => setExtCustomer(e.target.value)}
                              className="mt-1 border-amber-200"
                              data-ocid="wallet.expiry_customer.input"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Coins to Extend</Label>
                            <Input
                              type="number"
                              placeholder="e.g. 500"
                              value={extCoins}
                              onChange={(e) => setExtCoins(e.target.value)}
                              className="mt-1 border-amber-200"
                              data-ocid="wallet.expiry_coins.input"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">New Expiry Date</Label>
                            <Input
                              type="date"
                              value={extDate}
                              onChange={(e) => setExtDate(e.target.value)}
                              className="mt-1 border-amber-200"
                              data-ocid="wallet.expiry_date.input"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Reason</Label>
                            <Input
                              placeholder="Justification for extension"
                              value={extReason}
                              onChange={(e) => setExtReason(e.target.value)}
                              className="mt-1 border-amber-200"
                              data-ocid="wallet.expiry_reason.input"
                            />
                          </div>
                        </div>
                      )}
                      {!extSuccess && (
                        <DialogFooter className="gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => setExtOpen(false)}
                            data-ocid="wallet.expiry.cancel_button"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={() => {
                              setExtSuccess(true);
                              setTimeout(() => {
                                setExtOpen(false);
                                setExtSuccess(false);
                                setExtCustomer("");
                                setExtCoins("");
                                setExtDate("");
                                setExtReason("");
                              }, 1500);
                            }}
                            data-ocid="wallet.expiry.confirm_button"
                          >
                            Confirm Extension
                          </Button>
                        </DialogFooter>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─────────────────────── TAB 5: KYC TIERS ─────────────────────── */}
          <TabsContent value="kyc" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-display">
                        Tier 1 — Phone Verified
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {[
                    ["Max wallet balance", "₹5,000"],
                    ["Max daily spend", "₹2,000"],
                    ["Coin redemption cap", "10% (standard)"],
                    ["Coin earning", "Full"],
                    ["Top-up limit", "₹5,000 total"],
                    ["Wallet-to-bank", "Not available"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-center py-1 border-b border-dashed border-gray-100 last:border-0"
                    >
                      <span className="text-muted-foreground text-xs">{k}</span>
                      <span className="font-semibold text-xs">{v}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-display text-amber-900">
                        Tier 2 — KYC Complete
                      </CardTitle>
                      <p className="text-[10px] text-amber-700">
                        Aadhaar/PAN verified
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {[
                    ["Max wallet balance", "₹50,000"],
                    ["Max daily spend", "₹10,000"],
                    ["Coin redemption cap", "10% (standard)"],
                    ["Coin earning", "Full + 10% bonus"],
                    ["Top-up limit", "₹50,000 total"],
                    ["Wallet-to-bank", "Min ₹100, 3–5 days"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-center py-1 border-b border-dashed border-amber-100 last:border-0"
                    >
                      <span className="text-muted-foreground text-xs">{k}</span>
                      <span className="font-semibold text-amber-900 text-xs">
                        {v}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display text-amber-900">
                  KYC Status — Sample Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-xs"
                    data-ocid="wallet.kyc.table"
                  >
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Customer</th>
                        <th className="text-left pb-2 font-medium">Phone</th>
                        <th className="text-center pb-2 font-medium">
                          KYC Tier
                        </th>
                        <th className="text-right pb-2 font-medium">
                          Wallet ₹
                        </th>
                        <th className="text-right pb-2 font-medium">Coins</th>
                        <th className="text-right pb-2 font-medium">
                          Daily Used
                        </th>
                        <th className="text-center pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {KYC_CUSTOMERS.map((c, i) => (
                        <tr
                          key={c.name}
                          className="hover:bg-amber-50/50"
                          data-ocid={`wallet.kyc.item.${i + 1}`}
                        >
                          <td className="py-2 font-medium">{c.name}</td>
                          <td className="py-2 text-muted-foreground">
                            {c.phone}
                          </td>
                          <td className="py-2 text-center">
                            <span
                              className={`px-1.5 py-0.5 rounded-full font-bold text-[10px] ${
                                c.tier === 2
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              Tier {c.tier}
                            </span>
                          </td>
                          <td className="py-2 text-right">
                            ₹{c.balance.toLocaleString()}
                          </td>
                          <td className="py-2 text-right text-amber-700">
                            {c.coins.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">
                            ₹{c.dailyUsed.toLocaleString()}
                          </td>
                          <td className="py-2 text-center">
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                c.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : c.status === "Limit Reached"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─────────────────────── TAB 6: DOUBLE COIN EVENTS ─────────────────────── */}
          <TabsContent value="events" className="space-y-4">
            <Card className="shadow-sm border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-display text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Active
                    Events
                  </CardTitle>
                  <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8"
                        data-ocid="wallet.events.open_modal_button"
                      >
                        + Create New Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-sm"
                      data-ocid="wallet.events.dialog"
                    >
                      <DialogHeader>
                        <DialogTitle className="font-display text-amber-900">
                          Create Double Coin Event
                        </DialogTitle>
                      </DialogHeader>
                      {eventSuccess ? (
                        <div
                          className="text-center py-6"
                          data-ocid="wallet.events.success_state"
                        >
                          <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                          <p className="font-semibold text-green-800">
                            Event created successfully!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs">Event Name</Label>
                            <Input
                              placeholder="e.g. Diwali Double Coins 2024"
                              value={eventName}
                              onChange={(e) => setEventName(e.target.value)}
                              className="mt-1 border-amber-200"
                              data-ocid="wallet.events_name.input"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">Start Date</Label>
                              <Input
                                type="date"
                                value={eventStart}
                                onChange={(e) => setEventStart(e.target.value)}
                                className="mt-1 border-amber-200"
                                data-ocid="wallet.events_start.input"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">End Date</Label>
                              <Input
                                type="date"
                                value={eventEnd}
                                onChange={(e) => setEventEnd(e.target.value)}
                                className="mt-1 border-amber-200"
                                data-ocid="wallet.events_end.input"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">Multiplier</Label>
                              <select
                                className="w-full h-9 text-sm border border-amber-200 rounded-md px-2 bg-background mt-1"
                                value={eventMult}
                                onChange={(e) => setEventMult(e.target.value)}
                                data-ocid="wallet.events_multiplier.select"
                              >
                                <option value="2x">2×</option>
                                <option value="3x">3×</option>
                              </select>
                            </div>
                            <div>
                              <Label className="text-xs">Category</Label>
                              <select
                                className="w-full h-9 text-sm border border-amber-200 rounded-md px-2 bg-background mt-1"
                                value={eventCat}
                                onChange={(e) => setEventCat(e.target.value)}
                                data-ocid="wallet.events_category.select"
                              >
                                <option>All</option>
                                <option>Sweets</option>
                                <option>Achar</option>
                                <option>Namkeen</option>
                                <option>Festival Hampers</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs">
                              Max Budget (total coins)
                            </Label>
                            <Input
                              type="number"
                              placeholder="e.g. 100000"
                              value={eventBudget}
                              onChange={(e) => setEventBudget(e.target.value)}
                              className="mt-1 border-amber-200"
                              data-ocid="wallet.events_budget.input"
                            />
                          </div>
                        </div>
                      )}
                      {!eventSuccess && (
                        <DialogFooter className="gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => setEventOpen(false)}
                            data-ocid="wallet.events.cancel_button"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={() => {
                              setEventSuccess(true);
                              setTimeout(() => {
                                setEventOpen(false);
                                setEventSuccess(false);
                                setEventName("");
                                setEventStart("");
                                setEventEnd("");
                                setEventBudget("");
                              }, 1500);
                            }}
                            data-ocid="wallet.events.confirm_button"
                          >
                            Create Event
                          </Button>
                        </DialogFooter>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-white/70 rounded-xl border border-amber-200 flex flex-wrap gap-4 items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Event Name</p>
                    <p className="font-bold text-amber-900 text-sm">
                      Diwali Double Coins 2024
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dates</p>
                    <p className="font-semibold text-sm">Oct 28 – Oct 30</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Multiplier</p>
                    <p className="font-bold text-amber-700 text-sm">2×</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Categories</p>
                    <p className="font-semibold text-sm">All</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                    Scheduled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display text-amber-900">
                  Past Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="wallet.events.table"
                  >
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Event</th>
                        <th className="text-left pb-2 font-medium">Dates</th>
                        <th className="text-center pb-2 font-medium">
                          Multiplier
                        </th>
                        <th className="text-right pb-2 font-medium">
                          Coins Issued
                        </th>
                        <th className="text-center pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {PAST_EVENTS.map((ev, i) => (
                        <tr
                          key={ev.name}
                          className="hover:bg-amber-50/50"
                          data-ocid={`wallet.events.item.${i + 1}`}
                        >
                          <td className="py-2 font-medium">{ev.name}</td>
                          <td className="py-2 text-muted-foreground text-xs">
                            {ev.dates}
                          </td>
                          <td className="py-2 text-center font-bold text-amber-700">
                            {ev.multiplier}
                          </td>
                          <td className="py-2 text-right">
                            {ev.issued.toLocaleString()}
                          </td>
                          <td className="py-2 text-center">
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              {ev.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─────────────────────── TAB 7: FRAUD PREVENTION ─────────────────────── */}
          <TabsContent value="fraud" className="space-y-4">
            <Card className="shadow-sm border-red-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display text-red-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600" /> Active Fraud
                  Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {FRAUD_RULES.map((rule, i) => (
                  <div
                    key={rule}
                    className="flex gap-3 p-2.5 bg-red-50/50 rounded-lg border border-red-100"
                    data-ocid={`wallet.fraud.item.${i + 1}`}
                  >
                    <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {rule}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" /> Blocked
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-xs"
                    data-ocid="wallet.fraud.table"
                  >
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Txn ID</th>
                        <th className="text-left pb-2 font-medium">Customer</th>
                        <th className="text-left pb-2 font-medium">Trigger</th>
                        <th className="text-left pb-2 font-medium">Reason</th>
                        <th className="text-left pb-2 font-medium">Date</th>
                        <th className="text-center pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {BLOCKED_TXN.map((txn, i) => (
                        <tr
                          key={txn.id}
                          className="hover:bg-red-50/30"
                          data-ocid={`wallet.fraud.item.${i + 1}`}
                        >
                          <td className="py-2 font-mono font-bold text-red-700">
                            {txn.id}
                          </td>
                          <td className="py-2 text-muted-foreground">
                            {txn.customer}
                          </td>
                          <td className="py-2">
                            <span
                              className={`px-1.5 py-0.5 rounded-full font-semibold text-[10px] ${
                                txn.severity === "high"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {txn.trigger}
                            </span>
                          </td>
                          <td className="py-2 text-muted-foreground">
                            {txn.reason}
                          </td>
                          <td className="py-2 text-muted-foreground">
                            {txn.date}
                          </td>
                          <td className="py-2 text-center">
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                txn.action === "Released" ||
                                txn.action === "Reviewed"
                                  ? "bg-green-100 text-green-700"
                                  : txn.action === "Under Review"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : txn.action === "Escalated"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {txn.action}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ─────────────── STICKY LIABILITY FOOTER BAR ─────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-amber-800 text-amber-50 border-t-2 border-amber-600 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap gap-x-6 gap-y-1 items-center justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-1 items-center">
            <div className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-medium">
                Liability: <strong className="text-amber-200">₹1,07,125</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-orange-300" />
              <span className="text-xs">
                Expiring this month: <strong>12,400 coins</strong> (₹3,100
                releases)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-green-300" />
              <span className="text-xs">
                Net after expiry: <strong>₹1,04,025</strong>
              </span>
            </div>
          </div>
          <Badge className="bg-green-500 text-white border-0 text-xs shrink-0">
            <CheckCircle className="w-3 h-3 mr-1" /> Healthy
          </Badge>
        </div>
      </div>
    </main>
  );
}
