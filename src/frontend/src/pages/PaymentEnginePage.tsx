import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Download,
  FileText,
  IndianRupee,
  Key,
  Lock,
  Package,
  RefreshCw,
  RotateCcw,
  Settings,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Truck,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

const PASSWORD = "amar2026";

// ── Payment Methods ──────────────────────────────────────────────────────────
const UPI_APPS = [
  { id: "gpay", label: "Google Pay", emoji: "🟢" },
  { id: "phonepe", label: "PhonePe", emoji: "🟣" },
  { id: "paytm", label: "Paytm", emoji: "🔵" },
  { id: "bhim", label: "BHIM", emoji: "🟠" },
];

// ── Failure Log ───────────────────────────────────────────────────────────────
const FAILURE_LOG = [
  {
    orderId: "CA-2024-1047",
    customer: "Anika Sharma",
    amount: 840,
    reason: "Insufficient funds",
    retries: 2,
    status: "Recovered",
  },
  {
    orderId: "CA-2024-1051",
    customer: "Rohit Verma",
    amount: 1620,
    reason: "Network timeout",
    retries: 1,
    status: "Pending Retry",
  },
  {
    orderId: "CA-2024-1038",
    customer: "Deepika Nair",
    amount: 560,
    reason: "Bank declined",
    retries: 3,
    status: "Expired",
  },
  {
    orderId: "CA-2024-1059",
    customer: "Suresh Patel",
    amount: 2200,
    reason: "UPI limit exceeded",
    retries: 2,
    status: "Recovered",
  },
  {
    orderId: "CA-2024-1063",
    customer: "Meena Joshi",
    amount: 980,
    reason: "Session expired",
    retries: 1,
    status: "Pending Retry",
  },
];

// ── Refund Queue ──────────────────────────────────────────────────────────────
const REFUND_QUEUE = [
  {
    orderId: "CA-2024-1022",
    amount: 760,
    trigger: "Order cancelled by customer",
    destination: "Original Source",
    status: "Processed",
  },
  {
    orderId: "CA-2024-1031",
    amount: 1240,
    trigger: "Aunty unavailable",
    destination: "CA Wallet",
    status: "Pending",
  },
  {
    orderId: "CA-2024-1044",
    amount: 580,
    trigger: "Quality complaint approved",
    destination: "CA Wallet",
    status: "Processing",
  },
  {
    orderId: "CA-2024-1048",
    amount: 1900,
    trigger: "Batch merge rejected",
    destination: "Original Source",
    status: "Processed",
  },
];

// ── Reconciliation Rows ───────────────────────────────────────────────────────
const RECON_ROWS = [
  {
    orderId: "CA-2024-1071",
    rpId: "pay_OA9Xk3mN7pQr",
    amount: 1240,
    method: "UPI",
    status: "Matched",
    settlement: "12 Mar 2026",
  },
  {
    orderId: "CA-2024-1072",
    rpId: "pay_OA9Xk4nP8sRt",
    amount: 860,
    method: "Card",
    status: "Matched",
    settlement: "12 Mar 2026",
  },
  {
    orderId: "CA-2024-1073",
    rpId: "pay_OA9Xk5qS2uVw",
    amount: 2100,
    method: "UPI",
    status: "Pending",
    settlement: "—",
  },
  {
    orderId: "CA-2024-1074",
    rpId: "pay_OA9Xk6tT3vXy",
    amount: 540,
    method: "Net Banking",
    status: "Unmatched",
    settlement: "—",
  },
  {
    orderId: "CA-2024-1075",
    rpId: "pay_OA9Xk7uU4wYz",
    amount: 1780,
    method: "UPI",
    status: "Matched",
    settlement: "12 Mar 2026",
  },
  {
    orderId: "CA-2024-1076",
    rpId: "pay_OA9Xk8vV5xZa",
    amount: 920,
    method: "Card",
    status: "Matched",
    settlement: "12 Mar 2026",
  },
  {
    orderId: "CA-2024-1077",
    rpId: "pay_OA9Xk9wW6yAb",
    amount: 3400,
    method: "UPI",
    status: "Matched",
    settlement: "13 Mar 2026",
  },
  {
    orderId: "CA-2024-1078",
    rpId: "pay_OA9XkAxX7zBc",
    amount: 1620,
    method: "EMI",
    status: "Unmatched",
    settlement: "—",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Matched: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Unmatched: "bg-red-100 text-red-700",
    "Pending Retry": "bg-amber-100 text-amber-700",
    Recovered: "bg-green-100 text-green-700",
    Expired: "bg-red-100 text-red-700",
    Processed: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

export default function PaymentEnginePage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  // Payment method toggles
  const [upiEnabled, setUpiEnabled] = useState(true);
  const [upiApps, setUpiApps] = useState<Record<string, boolean>>({
    gpay: true,
    phonepe: true,
    paytm: true,
    bhim: false,
  });
  const [cardsEnabled, setCardsEnabled] = useState(true);
  const [netBankingEnabled, setNetBankingEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [codFee, setCodFee] = useState("20");
  const [emiEnabled, setEmiEnabled] = useState(true);
  const [emiThreshold, setEmiThreshold] = useState("1500");

  // Advance booking
  const [advanceEnabled, setAdvanceEnabled] = useState(true);
  const [advanceType, setAdvanceType] = useState<"fixed" | "percent">("fixed");
  const [fixedAmount, setFixedAmount] = useState("100");
  const [holdDuration, setHoldDuration] = useState("15");
  const [balanceTrigger, setBalanceTrigger] = useState("2days");

  // Failure & retry
  const [maxRetries, setMaxRetries] = useState("3");
  const [holdMin, setHoldMin] = useState("15");
  const [waEnabled, setWaEnabled] = useState(true);

  // Refund triggers
  const [refundRules, setRefundRules] = useState([
    {
      id: 1,
      label: "Order cancelled by customer",
      dest: "source",
      enabled: true,
      timing: "Instant",
    },
    {
      id: 2,
      label: "Aunty unavailable before batch close",
      dest: "wallet",
      enabled: true,
      timing: "2 hours",
    },
    {
      id: 3,
      label: "Quality complaint approved",
      dest: "wallet",
      enabled: true,
      timing: "24 hours",
    },
    {
      id: 4,
      label: "Batch merge rejected by customer",
      dest: "source",
      enabled: true,
      timing: "Instant",
    },
  ]);

  // GST config
  const [gstin, setGstin] = useState("");
  const [autoGst, setAutoGst] = useState(true);
  const [emailGst, setEmailGst] = useState(true);

  // Recon filter
  const [reconFilter, setReconFilter] = useState("All");

  // Integration
  const [testMode, setTestMode] = useState(true);
  const [autoShipment, setAutoShipment] = useState(true);

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  function toggleRefundRule(id: number) {
    setRefundRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  }

  const filteredRecon =
    reconFilter === "All"
      ? RECON_ROWS
      : RECON_ROWS.filter((r) => r.status === reconFilter);

  const kpis = [
    {
      label: "Transactions Today",
      value: "47",
      icon: TrendingUp,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      label: "Payments via UPI",
      value: "68%",
      icon: Smartphone,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "COD Orders",
      value: "12",
      icon: Package,
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      label: "Pending Refunds",
      value: "3",
      icon: RotateCcw,
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      label: "Failed Payments",
      value: "5",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "GST Invoices Today",
      value: "44",
      icon: FileText,
      color: "text-green-700",
      bg: "bg-green-50",
    },
  ];

  // Integration health checks
  const healthChecks = [
    { ok: true, label: "Razorpay test key configured" },
    { ok: true, label: "Webhook endpoint active" },
    { ok: false, label: "Razorpay live key not set", warn: true },
    { ok: true, label: "Shiprocket token configured" },
    { ok: false, label: "Pickup address not set", warn: true },
    { ok: true, label: "Auto-shipment on batch close enabled" },
  ];

  if (!authed) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-amber-700" />
            </div>
            <CardTitle className="font-display text-xl">
              Payment Engine
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
              data-ocid="payment.password_input"
              className={pwError ? "border-red-400" : ""}
            />
            {pwError && (
              <p className="text-red-500 text-xs">Incorrect password</p>
            )}
            <Button
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              onClick={handleLogin}
              data-ocid="payment.login_button"
            >
              Access Engine
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Payment Infrastructure
            </h1>
            <p className="text-sm text-muted-foreground">
              Razorpay · Shiprocket · GST · Refunds · Reconciliation
            </p>
          </div>
          <Badge className="ml-auto bg-amber-100 text-amber-800 border-amber-200">
            Step 2 of Modularisation
          </Badge>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {kpis.map((k) => (
            <Card key={k.label} className="shadow-sm">
              <CardContent className="pt-4 pb-3">
                <div
                  className={`w-8 h-8 ${k.bg} rounded-lg flex items-center justify-center mb-2`}
                >
                  <k.icon className={`w-4 h-4 ${k.color}`} />
                </div>
                <p className="text-xl font-bold font-display">{k.value}</p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {k.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs
          defaultValue="methods"
          className="space-y-4"
          data-ocid="payment.section"
        >
          <TabsList className="flex flex-wrap h-auto gap-1 bg-white/70 border border-amber-200 p-1 rounded-xl">
            <TabsTrigger
              value="methods"
              className="text-xs"
              data-ocid="payment.methods.tab"
            >
              💳 Methods
            </TabsTrigger>
            <TabsTrigger
              value="advance"
              className="text-xs"
              data-ocid="payment.advance.tab"
            >
              🔖 Advance Booking
            </TabsTrigger>
            <TabsTrigger
              value="failures"
              className="text-xs"
              data-ocid="payment.failures.tab"
            >
              ⚠️ Failures & Retry
            </TabsTrigger>
            <TabsTrigger
              value="refunds"
              className="text-xs"
              data-ocid="payment.refunds.tab"
            >
              ↩️ Refunds
            </TabsTrigger>
            <TabsTrigger
              value="gst"
              className="text-xs"
              data-ocid="payment.gst.tab"
            >
              📄 GST Invoices
            </TabsTrigger>
            <TabsTrigger
              value="recon"
              className="text-xs"
              data-ocid="payment.recon.tab"
            >
              🔁 Reconciliation
            </TabsTrigger>
            <TabsTrigger
              value="integration"
              className="text-xs"
              data-ocid="payment.integration.tab"
            >
              🔌 Integration
            </TabsTrigger>
          </TabsList>

          {/* ── Tab 1: Payment Methods ── */}
          <TabsContent value="methods" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* UPI */}
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-display flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-600" /> UPI
                      Payments
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Primary
                      </Badge>
                    </CardTitle>
                    <Switch
                      checked={upiEnabled}
                      onCheckedChange={setUpiEnabled}
                      data-ocid="payment.upi.toggle"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    70%+ Indian transactions use UPI
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {UPI_APPS.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/40"
                    >
                      <span className="text-sm">
                        {app.emoji} {app.label}
                      </span>
                      <Switch
                        checked={upiApps[app.id] ?? false}
                        onCheckedChange={(v) =>
                          setUpiApps((prev) => ({ ...prev, [app.id]: v }))
                        }
                        disabled={!upiEnabled}
                        data-ocid={`payment.upi_app_${app.id}.toggle`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cards & Net Banking */}
              <div className="space-y-4">
                <Card className="shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm font-semibold">
                            Cards (Credit / Debit)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Visa, Mastercard, RuPay
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={cardsEnabled}
                        onCheckedChange={setCardsEnabled}
                        data-ocid="payment.cards.toggle"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="text-sm font-semibold">Net Banking</p>
                          <p className="text-xs text-muted-foreground">
                            All major Indian banks
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={netBankingEnabled}
                        onCheckedChange={setNetBankingEnabled}
                        data-ocid="payment.netbanking.toggle"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* COD */}
                <Card className="shadow-sm">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-sm font-semibold">
                            Pay on Delivery (COD)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Builds trust with new customers
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={codEnabled}
                        onCheckedChange={setCodEnabled}
                        data-ocid="payment.cod.toggle"
                      />
                    </div>
                    {codEnabled && (
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground whitespace-nowrap">
                          COD handling fee (₹)
                        </Label>
                        <Input
                          className="h-7 w-20 text-sm text-center"
                          value={codFee}
                          onChange={(e) => setCodFee(e.target.value)}
                          data-ocid="payment.cod_fee.input"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* EMI */}
                <Card className="shadow-sm">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <div>
                          <p className="text-sm font-semibold">EMI</p>
                          <p className="text-xs text-muted-foreground">
                            No-cost EMI via Razorpay
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={emiEnabled}
                        onCheckedChange={setEmiEnabled}
                        data-ocid="payment.emi.toggle"
                      />
                    </div>
                    {emiEnabled && (
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground whitespace-nowrap">
                          Show EMI above (₹)
                        </Label>
                        <Input
                          className="h-7 w-24 text-sm text-center"
                          value={emiThreshold}
                          onChange={(e) => setEmiThreshold(e.target.value)}
                          data-ocid="payment.emi_threshold.input"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── Tab 2: Advance Booking ── */}
          <TabsContent value="advance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-display">
                      🔖 Advance / Token Booking
                    </CardTitle>
                    <Switch
                      checked={advanceEnabled}
                      onCheckedChange={setAdvanceEnabled}
                      data-ocid="payment.advance.toggle"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Customer pays a small advance to reserve their batch slot
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Amount type */}
                  <div>
                    <Label className="text-xs font-semibold">
                      Advance Type
                    </Label>
                    <div className="flex gap-2 mt-1.5">
                      {(["fixed", "percent"] as const).map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setAdvanceType(t)}
                          className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                            advanceType === t
                              ? "bg-amber-700 text-white border-amber-700"
                              : "bg-white border-border text-foreground hover:border-amber-400"
                          }`}
                          data-ocid={`payment.advance_type_${t}.toggle`}
                        >
                          {t === "fixed" ? "Fixed Amount" : "Percentage"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {advanceType === "fixed" ? (
                    <div>
                      <Label className="text-xs font-semibold">
                        Fixed Amount (₹)
                      </Label>
                      <div className="flex gap-2 mt-1.5">
                        {["50", "100", "200"].map((v) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setFixedAmount(v)}
                            className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                              fixedAmount === v
                                ? "bg-amber-700 text-white border-amber-700"
                                : "bg-white border-border hover:border-amber-400"
                            }`}
                            data-ocid={`payment.advance_fixed_${v}.toggle`}
                          >
                            ₹{v}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-xs font-semibold">
                        Percentage of Order
                      </Label>
                      <div className="flex gap-2 mt-1.5">
                        {["10", "15", "20"].map((v) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setFixedAmount(v)}
                            className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                              fixedAmount === v
                                ? "bg-amber-700 text-white border-amber-700"
                                : "bg-white border-border hover:border-amber-400"
                            }`}
                            data-ocid={`payment.advance_pct_${v}.toggle`}
                          >
                            {v}%
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hold duration */}
                  <div>
                    <Label className="text-xs font-semibold">
                      Slot Hold Duration
                    </Label>
                    <div className="flex gap-2 mt-1.5">
                      {["15", "30", "60"].map((v) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => setHoldDuration(v)}
                          className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                            holdDuration === v
                              ? "bg-amber-700 text-white border-amber-700"
                              : "bg-white border-border hover:border-amber-400"
                          }`}
                          data-ocid={`payment.hold_${v}min.toggle`}
                        >
                          {v} min
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Balance trigger */}
                  <div>
                    <Label className="text-xs font-semibold">
                      Balance Payment Reminder
                    </Label>
                    <div className="flex flex-col gap-1.5 mt-1.5">
                      {[
                        { val: "2days", label: "2 days before batch closes" },
                        { val: "1day", label: "1 day before dispatch" },
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.val}
                          onClick={() => setBalanceTrigger(opt.val)}
                          className={`w-full py-1.5 text-xs rounded-lg border text-left px-3 transition-colors ${
                            balanceTrigger === opt.val
                              ? "bg-amber-700 text-white border-amber-700"
                              : "bg-white border-border hover:border-amber-400"
                          }`}
                          data-ocid={`payment.balance_trigger_${opt.val}.toggle`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flow diagram */}
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display">
                    Advance Booking Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    {[
                      {
                        step: "Customer",
                        desc: "Selects product & aunty",
                        icon: "👩‍💼",
                        color: "bg-blue-50 border-blue-200 text-blue-700",
                      },
                      {
                        step: "Pays Advance",
                        desc: `₹${fixedAmount}${advanceType === "percent" ? "% of order" : ""} via Razorpay`,
                        icon: "💳",
                        color: "bg-amber-50 border-amber-200 text-amber-700",
                      },
                      {
                        step: "Slot Reserved",
                        desc: `Held for ${holdDuration} minutes`,
                        icon: "🔒",
                        color: "bg-green-50 border-green-200 text-green-700",
                      },
                      {
                        step: "Balance Reminder",
                        desc:
                          balanceTrigger === "2days"
                            ? "2 days before batch closes"
                            : "1 day before dispatch",
                        icon: "🔔",
                        color: "bg-purple-50 border-purple-200 text-purple-700",
                      },
                      {
                        step: "Balance Paid",
                        desc: "Full order amount settled",
                        icon: "✅",
                        color: "bg-orange-50 border-orange-200 text-orange-700",
                      },
                      {
                        step: "Order Confirmed",
                        desc: "Aunty begins preparation",
                        icon: "🍱",
                        color: "bg-pink-50 border-pink-200 text-pink-700",
                      },
                    ].map((s, i, arr) => (
                      <div key={s.step}>
                        <div
                          className={`flex items-start gap-3 p-3 rounded-lg border ${s.color}`}
                        >
                          <span className="text-lg">{s.icon}</span>
                          <div>
                            <p className="text-xs font-bold">{s.step}</p>
                            <p className="text-xs opacity-80">{s.desc}</p>
                          </div>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="flex justify-center py-0.5">
                            <div className="w-0.5 h-4 bg-amber-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Tab 3: Failures & Retry ── */}
          <TabsContent value="failures" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display">
                    ⚙️ Retry Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold">
                        Max Retries
                      </Label>
                      <Input
                        className="h-8 text-sm mt-1"
                        value={maxRetries}
                        onChange={(e) => setMaxRetries(e.target.value)}
                        data-ocid="payment.max_retries.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">
                        Hold Duration (min)
                      </Label>
                      <Input
                        className="h-8 text-sm mt-1"
                        value={holdMin}
                        onChange={(e) => setHoldMin(e.target.value)}
                        data-ocid="payment.hold_duration.input"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold">
                        WhatsApp Payment Link
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Send recovery link on failure
                      </p>
                    </div>
                    <Switch
                      checked={waEnabled}
                      onCheckedChange={setWaEnabled}
                      data-ocid="payment.whatsapp_retry.toggle"
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs space-y-1">
                    <p className="font-semibold text-amber-800">How it works</p>
                    <p className="text-amber-700">
                      On payment failure → auto-retry up to {maxRetries}x over{" "}
                      {holdMin} min → if still failed, send WhatsApp link →
                      order held for {holdMin} min total → released if not paid
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" /> Failure Log
                    (Today)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-2"
                    data-ocid="payment.failure_log.table"
                  >
                    {FAILURE_LOG.map((row, idx) => (
                      <div
                        key={row.orderId}
                        className="p-2.5 rounded-lg bg-muted/40 text-xs"
                        data-ocid={`payment.failure_log.item.${idx + 1}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground">
                            {row.orderId}
                          </span>
                          <StatusBadge status={row.status} />
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span>
                            {row.customer} · ₹{row.amount}
                          </span>
                          <span>{row.reason}</span>
                        </div>
                        <div className="text-muted-foreground mt-0.5">
                          Retries: {row.retries}/{maxRetries}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Tab 4: Refunds ── */}
          <TabsContent value="refunds" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display">
                    Auto-Refund Trigger Rules
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Toggle each rule to enable/disable automatic refund
                    processing
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {refundRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-3 rounded-lg border bg-white flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-semibold">{rule.label}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">
                            →{" "}
                            {rule.dest === "source"
                              ? "Original Source"
                              : "CA Wallet"}
                          </span>
                          <span className="text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded-full">
                            ⏱ {rule.timing}
                          </span>
                        </div>
                      </div>
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRefundRule(rule.id)}
                        data-ocid={`payment.refund_rule_${rule.id}.toggle`}
                      />
                    </div>
                  ))}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                    <strong>Refund destination default:</strong> If customer has
                    CA wallet, offer wallet refund (faster) as the default.
                    Original source always available.
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-purple-600" /> Refund
                    Queue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-2"
                    data-ocid="payment.refund_queue.table"
                  >
                    {REFUND_QUEUE.map((row, idx) => (
                      <div
                        key={row.orderId}
                        className="p-2.5 rounded-lg bg-muted/40 text-xs"
                        data-ocid={`payment.refund_queue.item.${idx + 1}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">
                            {row.orderId} · ₹{row.amount}
                          </span>
                          <StatusBadge status={row.status} />
                        </div>
                        <p className="text-muted-foreground">{row.trigger}</p>
                        <p className="text-muted-foreground mt-0.5">
                          → {row.destination}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="font-bold text-green-700 text-base">2</p>
                      <p className="text-xs text-muted-foreground">Processed</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <p className="font-bold text-blue-700 text-base">1</p>
                      <p className="text-xs text-muted-foreground">
                        Processing
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                      <p className="font-bold text-amber-700 text-base">1</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Tab 5: GST Invoices ── */}
          <TabsContent value="gst" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-display">
                      GST Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs font-semibold">GSTIN</Label>
                      <Input
                        className="h-8 text-sm mt-1 font-mono"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        placeholder="22AAAAA0000A1Z5"
                        data-ocid="payment.gstin.input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-semibold">
                          HSN Code
                        </Label>
                        <Input
                          className="h-8 text-sm mt-1 font-mono"
                          defaultValue="0401"
                          readOnly
                        />
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Food products
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">
                          GST Rate
                        </Label>
                        <Input
                          className="h-8 text-sm mt-1"
                          defaultValue="5%"
                          readOnly
                        />
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Packaged food
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-muted/40 rounded-lg">
                        <div>
                          <p className="text-xs font-semibold">
                            Auto-generate on payment confirmation
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Instantly creates invoice PDF
                          </p>
                        </div>
                        <Switch
                          checked={autoGst}
                          onCheckedChange={setAutoGst}
                          data-ocid="payment.auto_gst.toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-muted/40 rounded-lg">
                        <div>
                          <p className="text-xs font-semibold">
                            Send to customer email
                          </p>
                          <p className="text-xs text-muted-foreground">
                            With order confirmation
                          </p>
                        </div>
                        <Switch
                          checked={emailGst}
                          onCheckedChange={setEmailGst}
                          data-ocid="payment.email_gst.toggle"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* GST Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "This Month",
                      value: "312",
                      color: "text-green-700",
                      bg: "bg-green-50 border-green-200",
                    },
                    {
                      label: "Pending",
                      value: "8",
                      color: "text-amber-700",
                      bg: "bg-amber-50 border-amber-200",
                    },
                    {
                      label: "Failed",
                      value: "2",
                      color: "text-red-600",
                      bg: "bg-red-50 border-red-200",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`${s.bg} border rounded-lg p-3 text-center`}
                    >
                      <p
                        className={`text-xl font-bold font-display ${s.color}`}
                      >
                        {s.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Invoice */}
              <Card className="shadow-sm border-2 border-dashed border-amber-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display">
                    📄 Sample Invoice Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-xs space-y-3">
                    {/* Invoice Header */}
                    <div className="flex items-start justify-between border-b pb-3">
                      <div>
                        <p className="font-display text-sm font-bold text-amber-800">
                          Choudhary Aunty
                        </p>
                        <p className="text-muted-foreground">
                          www.choudharyaunty.com
                        </p>
                        <p className="text-muted-foreground">
                          GSTIN: {gstin || "22AAAAA0000A1Z5"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-base">GST Invoice</p>
                        <p className="text-muted-foreground">#CA-2024-0047</p>
                        <p className="text-muted-foreground">12 Mar 2026</p>
                      </div>
                    </div>
                    {/* Customer */}
                    <div>
                      <p className="font-semibold">Billed To:</p>
                      <p className="text-muted-foreground">Anika Sharma</p>
                      <p className="text-muted-foreground">anika@email.com</p>
                    </div>
                    {/* Items */}
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-amber-50 text-left">
                          <th className="p-1 font-semibold">Item</th>
                          <th className="p-1 font-semibold text-right">Qty</th>
                          <th className="p-1 font-semibold text-right">Rate</th>
                          <th className="p-1 font-semibold text-right">
                            GST 5%
                          </th>
                          <th className="p-1 font-semibold text-right">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-1">Coconut Laddoo (500g)</td>
                          <td className="p-1 text-right">2</td>
                          <td className="p-1 text-right">₹380</td>
                          <td className="p-1 text-right">₹38</td>
                          <td className="p-1 text-right font-semibold">₹798</td>
                        </tr>
                        <tr>
                          <td className="p-1">Mango Achar (250g)</td>
                          <td className="p-1 text-right">1</td>
                          <td className="p-1 text-right">₹160</td>
                          <td className="p-1 text-right">₹8</td>
                          <td className="p-1 text-right font-semibold">₹168</td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Tax summary */}
                    <div className="border-t pt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹920</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          GST 5% (HSN: 0401)
                        </span>
                        <span>₹46</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-1">
                        <span>Total</span>
                        <span className="text-amber-800">₹966</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs border-amber-400 text-amber-700 hover:bg-amber-50"
                      data-ocid="payment.download_invoice.button"
                    >
                      <Download className="w-3 h-3 mr-1.5" /> Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Tab 6: Reconciliation ── */}
          <TabsContent value="recon" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-sm font-display flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-600" /> Payment
                    Reconciliation
                  </CardTitle>
                  <div className="flex gap-2">
                    {["All", "Matched", "Unmatched", "Pending"].map((f) => (
                      <button
                        type="button"
                        key={f}
                        onClick={() => setReconFilter(f)}
                        className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                          reconFilter === f
                            ? "bg-amber-700 text-white border-amber-700"
                            : "bg-white border-border hover:border-amber-400"
                        }`}
                        data-ocid={`payment.recon_filter_${f.toLowerCase()}.toggle`}
                      >
                        {f}
                      </button>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-green-400 text-green-700 hover:bg-green-50"
                      data-ocid="payment.export_csv.button"
                    >
                      <Download className="w-3 h-3 mr-1" /> Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  {[
                    { label: "Total", value: "47", color: "text-foreground" },
                    { label: "Matched", value: "44", color: "text-green-700" },
                    { label: "Unmatched", value: "2", color: "text-red-600" },
                    { label: "Pending", value: "1", color: "text-amber-700" },
                    {
                      label: "Settlement",
                      value: "₹54,820",
                      color: "text-blue-700",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-muted/40 rounded-lg p-2.5 text-center"
                    >
                      <p
                        className={`text-base font-bold font-display ${s.color}`}
                      >
                        {s.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="overflow-x-auto"
                  data-ocid="payment.recon.table"
                >
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Order ID</th>
                        <th className="text-left pb-2 font-medium">
                          Razorpay ID
                        </th>
                        <th className="text-right pb-2 font-medium">Amount</th>
                        <th className="text-left pb-2 font-medium">Method</th>
                        <th className="text-left pb-2 font-medium">Status</th>
                        <th className="text-left pb-2 font-medium">
                          Settlement
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredRecon.map((row, idx) => (
                        <tr
                          key={row.orderId}
                          data-ocid={`payment.recon.item.${idx + 1}`}
                        >
                          <td className="py-2 font-mono font-semibold">
                            {row.orderId}
                          </td>
                          <td className="py-2 font-mono text-muted-foreground">
                            {row.rpId}
                          </td>
                          <td className="py-2 text-right font-semibold">
                            ₹{row.amount.toLocaleString()}
                          </td>
                          <td className="py-2">
                            <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">
                              {row.method}
                            </span>
                          </td>
                          <td className="py-2">
                            <StatusBadge status={row.status} />
                          </td>
                          <td className="py-2 text-muted-foreground">
                            {row.settlement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Tab 7: Integration ── */}
          <TabsContent value="integration" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Razorpay */}
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-blue-600" /> Razorpay
                    Integration
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Connected
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold">
                      API Key (Test)
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        className="h-8 text-sm font-mono flex-1"
                        type="password"
                        defaultValue="rzp_test_placeholder"
                        readOnly
                        data-ocid="payment.razorpay_key.input"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        data-ocid="payment.update_razorpay_key.button"
                      >
                        <Key className="w-3 h-3 mr-1" /> Update Key
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Webhook URL</Label>
                    <Input
                      className="h-8 text-xs font-mono mt-1"
                      defaultValue="https://choudharyaunty.com/api/razorpay-webhook"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold">Test Mode</p>
                      <p className="text-xs text-muted-foreground">
                        Switch to Live when ready
                      </p>
                    </div>
                    <Switch
                      checked={testMode}
                      onCheckedChange={setTestMode}
                      data-ocid="payment.test_mode.toggle"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shiprocket */}
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-display flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-600" /> Shiprocket
                    Integration
                    <Badge className="bg-amber-100 text-amber-700 text-xs">
                      Partial
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold">API Token</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        className="h-8 text-sm font-mono flex-1"
                        type="password"
                        defaultValue="sr_token_placeholder"
                        readOnly
                        data-ocid="payment.shiprocket_token.input"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        data-ocid="payment.update_shiprocket_token.button"
                      >
                        <Key className="w-3 h-3 mr-1" /> Update
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">
                      Pickup Address
                    </Label>
                    <Input
                      className="h-8 text-sm mt-1"
                      placeholder="Enter pickup address..."
                      data-ocid="payment.pickup_address.input"
                    />
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Required to create
                      shipments
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold">
                        Auto-create shipment on batch close
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Triggers Shiprocket AWB generation
                      </p>
                    </div>
                    <Switch
                      checked={autoShipment}
                      onCheckedChange={setAutoShipment}
                      data-ocid="payment.auto_shipment.toggle"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Checklist */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> Integration
                  Health Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  data-ocid="payment.health_checklist.table"
                >
                  {healthChecks.map((h, idx) => (
                    <div
                      key={h.label}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border ${
                        h.ok
                          ? "bg-green-50 border-green-200"
                          : "bg-amber-50 border-amber-200"
                      }`}
                      data-ocid={`payment.health_check.item.${idx + 1}`}
                    >
                      {h.ok ? (
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <span
                        className={`text-xs font-medium ${h.ok ? "text-green-800" : "text-amber-800"}`}
                      >
                        {h.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                  <strong>Next steps:</strong> Add Razorpay live key and set
                  Shiprocket pickup address to complete integration. Switch Test
                  Mode off only when ready for live payments.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
