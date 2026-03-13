import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  BadgeCheck,
  BanknoteIcon,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Lock,
  MessageCircle,
  Printer,
  Send,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const PASSWORD = "amar2026";

// ─── Sample Data ──────────────────────────────────────────────────────────────

const AUNTY_WALLETS = [
  {
    id: 1,
    name: "Priya Devi",
    location: "Patna",
    gross: 18400,
    commission: 3680,
    gstOnCommission: 662,
    tds: 184,
    tips: 350,
    bankStatus: "Verified",
    tier: "Gold",
    daysOnPlatform: 210,
    upiId: "priya.devi@upi",
    fssai: "10022031003623",
    fssaiExpiry: "2026-09-15",
  },
  {
    id: 2,
    name: "Savita Kumari",
    location: "Muzaffarpur",
    gross: 12600,
    commission: 2520,
    gstOnCommission: 454,
    tds: 0,
    tips: 120,
    bankStatus: "UPI Only",
    tier: "Silver",
    daysOnPlatform: 145,
    upiId: "savita.kumari@okaxis",
    fssai: "10021031002451",
    fssaiExpiry: "2025-04-30",
  },
  {
    id: 3,
    name: "Radha Singh",
    location: "Gaya",
    gross: 9800,
    commission: 1960,
    gstOnCommission: 353,
    tds: 0,
    tips: 80,
    bankStatus: "Pending Verification",
    tier: "Silver",
    daysOnPlatform: 88,
    upiId: "",
    fssai: "10020031001789",
    fssaiExpiry: "2026-12-01",
  },
  {
    id: 4,
    name: "Meera Devi",
    location: "Darbhanga",
    gross: 4200,
    commission: 420,
    gstOnCommission: 76,
    tds: 0,
    tips: 60,
    bankStatus: "Verified",
    tier: "New",
    daysOnPlatform: 45,
    upiId: "meera.devi@ybl",
    fssai: "",
    fssaiExpiry: "",
  },
  {
    id: 5,
    name: "Sunita Jha",
    location: "Patna",
    gross: 26800,
    commission: 5360,
    gstOnCommission: 965,
    tds: 268,
    tips: 420,
    bankStatus: "Verified",
    tier: "Platinum",
    daysOnPlatform: 320,
    upiId: "sunita.jha@paytm",
    fssai: "10022031004812",
    fssaiExpiry: "2026-07-10",
  },
  {
    id: 6,
    name: "Anita Sharma",
    location: "Bhagalpur",
    gross: 8100,
    commission: 1620,
    gstOnCommission: 292,
    tds: 0,
    tips: 95,
    bankStatus: "Verified",
    tier: "Silver",
    daysOnPlatform: 112,
    upiId: "anita.sharma@icici",
    fssai: "10025031003344",
    fssaiExpiry: "2026-11-20",
  },
  {
    id: 7,
    name: "Kavita Rani",
    location: "Nalanda",
    gross: 6900,
    commission: 1380,
    gstOnCommission: 248,
    tds: 0,
    tips: 50,
    bankStatus: "Pending Verification",
    tier: "Silver",
    daysOnPlatform: 95,
    upiId: "",
    fssai: "10019031002001",
    fssaiExpiry: "2025-06-30",
  },
  {
    id: 8,
    name: "Pushpa Devi",
    location: "Vaishali",
    gross: 15200,
    commission: 3040,
    gstOnCommission: 547,
    tds: 152,
    tips: 210,
    bankStatus: "Verified",
    tier: "Gold",
    daysOnPlatform: 198,
    upiId: "pushpa.devi@sbi",
    fssai: "10023031005112",
    fssaiExpiry: "2027-03-01",
  },
];

const ADVANCE_REQUESTS = [
  {
    id: 1,
    auntyName: "Anita Sharma",
    amount: 2000,
    reason: "Medical emergency – mother hospitalised in Bhagalpur",
    requestDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: 2,
    auntyName: "Savita Kumari",
    amount: 1500,
    reason: "School fee payment due for daughter",
    requestDate: "2026-03-08",
    status: "Approved",
  },
  {
    id: 3,
    auntyName: "Radha Singh",
    amount: 3000,
    reason: "Home repair after storm damage",
    requestDate: "2026-03-05",
    status: "Rejected",
  },
];

const RECENT_ACTIVITY = [
  { aunty: "Priya Devi", amount: 13224, date: "2026-03-01", status: "Success" },
  { aunty: "Sunita Jha", amount: 19727, date: "2026-03-01", status: "Success" },
  {
    aunty: "Pushpa Devi",
    amount: 11261,
    date: "2026-03-01",
    status: "Success",
  },
  { aunty: "Kavita Rani", amount: 5022, date: "2026-02-15", status: "Failed" },
  { aunty: "Meera Devi", amount: 3664, date: "2026-02-15", status: "Success" },
];

const PAYOUT_CYCLES = [
  {
    date: "2026-03-15",
    label: "15 March 2026",
    aunties: 6,
    total: 58420,
    status: "Scheduled",
  },
  {
    date: "2026-04-01",
    label: "1 April 2026",
    aunties: 8,
    total: 72800,
    status: "Scheduled",
  },
  {
    date: "2026-04-15",
    label: "15 April 2026",
    aunties: 7,
    total: 61500,
    status: "Scheduled",
  },
  {
    date: "2026-05-01",
    label: "1 May 2026",
    aunties: 9,
    total: 84200,
    status: "Scheduled",
  },
];

const TODAY = new Date();
const NEXT_PAYOUT =
  TODAY.getDate() < 15
    ? `${TODAY.toLocaleString("default", { month: "long" })} 15`
    : `1 ${new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 1).toLocaleString("default", { month: "long" })}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function netPayable(a: (typeof AUNTY_WALLETS)[0]) {
  return a.gross - a.commission - a.gstOnCommission - a.tds + a.tips;
}

function bankBadge(status: string) {
  if (status === "Verified")
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
        <CheckCircle className="w-3 h-3 mr-1" /> Verified
      </Badge>
    );
  if (status === "UPI Only")
    return (
      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
        <Wallet className="w-3 h-3 mr-1" /> UPI Only
      </Badge>
    );
  if (status === "Pending Verification")
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
        <Clock className="w-3 h-3 mr-1" /> Pending
      </Badge>
    );
  return (
    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
      <XCircle className="w-3 h-3 mr-1" /> Not Added
    </Badge>
  );
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Scheduled: "bg-blue-100 text-blue-700",
    Processing: "bg-amber-100 text-amber-700",
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Success: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
        map[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

const TABS = [
  "Overview",
  "Earnings Wallets",
  "Payout Schedule",
  "Advance Requests",
  "Statements",
  "TDS & Compliance",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PayoutManagerPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cycleStatuses, setCycleStatuses] = useState<Record<number, string>>(
    () => Object.fromEntries(PAYOUT_CYCLES.map((_, i) => [i, "Scheduled"])),
  );
  const [advanceStatuses, setAdvanceStatuses] = useState<
    Record<number, string>
  >(() => Object.fromEntries(ADVANCE_REQUESTS.map((r) => [r.id, r.status])));
  const [confirmingAdvance, setConfirmingAdvance] = useState<{
    id: number;
    action: string;
  } | null>(null);
  const [stmtAunty, setStmtAunty] = useState(1);
  const [stmtMonth, setStmtMonth] = useState("March 2026");

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  const totalPending = AUNTY_WALLETS.reduce(
    (s, a) =>
      a.bankStatus === "Verified" || a.bankStatus === "UPI Only"
        ? s + netPayable(a)
        : s,
    0,
  );
  const totalPaidYTD = 312480;
  const activeWithPending = AUNTY_WALLETS.filter(
    (a) => netPayable(a) > 0,
  ).length;
  const failedPayouts = RECENT_ACTIVITY.filter(
    (a) => a.status === "Failed",
  ).length;
  const verifiedBanks = AUNTY_WALLETS.filter(
    (a) => a.bankStatus === "Verified" || a.bankStatus === "UPI Only",
  ).length;
  const bankHealthPct = Math.round(
    (verifiedBanks / AUNTY_WALLETS.length) * 100,
  );

  if (!authed) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="font-display text-xl">
              Payout Manager
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Internal access only · Aunty payouts & compliance
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setPwError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              data-ocid="payout.password_input"
              className={`w-full h-10 border rounded-md px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                pwError ? "border-red-400" : "border-input"
              }`}
            />
            {pwError && (
              <p className="text-red-500 text-xs">Incorrect password</p>
            )}
            <Button
              className="w-full bg-amber-800 hover:bg-amber-900 text-white"
              onClick={handleLogin}
              data-ocid="payout.login_button"
            >
              Access Payout Manager
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-800 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Payout Manager
              </h1>
              <p className="text-sm text-muted-foreground">
                Aunty earnings · Bimonthly payouts · TDS · Compliance
              </p>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 flex-wrap mb-6 bg-white/70 rounded-xl p-1 shadow-sm">
          {TABS.map((tab, i) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(i)}
              data-ocid={`payout.tab.${i + 1}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === i
                  ? "bg-amber-800 text-white shadow"
                  : "text-muted-foreground hover:text-foreground hover:bg-amber-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab 1: Overview ───────────────────────────────────────────── */}
        {activeTab === 0 && (
          <div className="space-y-6" data-ocid="payout.overview_section">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  label: "Total Pending Payout",
                  value: `₹${totalPending.toLocaleString()}`,
                  icon: BanknoteIcon,
                  color: "text-amber-700",
                  bg: "bg-amber-50",
                },
                {
                  label: "Next Payout Date",
                  value: NEXT_PAYOUT,
                  icon: Calendar,
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                },
                {
                  label: "Total Paid YTD",
                  value: `₹${totalPaidYTD.toLocaleString()}`,
                  icon: TrendingUp,
                  color: "text-green-700",
                  bg: "bg-green-50",
                },
                {
                  label: "Active Aunties w/ Balance",
                  value: String(activeWithPending),
                  icon: Users,
                  color: "text-purple-700",
                  bg: "bg-purple-50",
                },
                {
                  label: "Failed Payouts",
                  value: String(failedPayouts),
                  icon: XCircle,
                  color: "text-red-600",
                  bg: "bg-red-50",
                },
              ].map((k) => (
                <Card key={k.label} className="shadow-sm">
                  <CardContent className="pt-4 pb-3">
                    <div
                      className={`w-8 h-8 ${k.bg} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <k.icon className={`w-4 h-4 ${k.color}`} />
                    </div>
                    <p className="text-lg font-bold font-display">{k.value}</p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {k.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bank Health Bar */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Bank Account Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${bankHealthPct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-700">
                    {bankHealthPct}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {verifiedBanks} of {AUNTY_WALLETS.length} aunties have
                  verified bank accounts or UPI linked
                </p>
                {bankHealthPct < 80 && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {AUNTY_WALLETS.length - verifiedBanks} aunties cannot
                    receive payouts until bank details are verified
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700" /> Recent Payout
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2" data-ocid="payout.activity_list">
                  {RECENT_ACTIVITY.map((a, i) => (
                    <div
                      key={a.aunty + a.date}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                      data-ocid={`payout.activity.item.${i + 1}`}
                    >
                      <div>
                        <p className="text-sm font-medium">{a.aunty}</p>
                        <p className="text-xs text-muted-foreground">
                          {a.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm">
                          ₹{a.amount.toLocaleString()}
                        </span>
                        {statusBadge(a.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Tab 2: Earnings Wallets ───────────────────────────────────── */}
        {activeTab === 1 && (
          <Card className="shadow-sm" data-ocid="payout.wallets_section">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-700" /> Aunty Earnings
                Wallets
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Net Payable = Gross − Commission − GST on Commission − TDS +
                Tips
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table
                  className="w-full text-xs sm:text-sm"
                  data-ocid="payout.wallets_table"
                >
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="text-left pb-2 font-medium">Aunty</th>
                      <th className="text-right pb-2 font-medium">Gross (₹)</th>
                      <th className="text-right pb-2 font-medium">
                        Commission (₹)
                      </th>
                      <th className="text-right pb-2 font-medium">
                        GST 18% (₹)
                      </th>
                      <th className="text-right pb-2 font-medium">TDS (₹)</th>
                      <th className="text-right pb-2 font-medium">Tips (₹)</th>
                      <th className="text-right pb-2 font-medium">
                        Net Payable (₹)
                      </th>
                      <th className="text-center pb-2 font-medium">
                        Bank Status
                      </th>
                      <th className="text-center pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {AUNTY_WALLETS.map((a, i) => {
                      const net = netPayable(a);
                      const canPay =
                        a.bankStatus === "Verified" ||
                        a.bankStatus === "UPI Only";
                      return (
                        <tr
                          key={a.id}
                          data-ocid={`payout.wallet.item.${i + 1}`}
                        >
                          <td className="py-2">
                            <div className="font-medium">{a.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {a.location}
                            </div>
                          </td>
                          <td className="py-2 text-right">
                            {a.gross.toLocaleString()}
                          </td>
                          <td className="py-2 text-right text-red-600">
                            {a.commission.toLocaleString()}
                          </td>
                          <td className="py-2 text-right text-red-500">
                            {a.gstOnCommission.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">
                            {a.tds > 0 ? a.tds.toLocaleString() : "—"}
                          </td>
                          <td className="py-2 text-right text-green-700">
                            +{a.tips}
                          </td>
                          <td className="py-2 text-right font-bold text-green-700">
                            {net.toLocaleString()}
                          </td>
                          <td className="py-2 text-center">
                            {bankBadge(a.bankStatus)}
                          </td>
                          <td className="py-2 text-center">
                            {canPay ? (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-amber-700 hover:bg-amber-800 text-white"
                                data-ocid={`payout.wallet.initiate_button.${i + 1}`}
                              >
                                Initiate Payout
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-amber-400 text-amber-700"
                                data-ocid={`payout.wallet.verify_button.${i + 1}`}
                              >
                                Verify Bank
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="border-t">
                    <tr>
                      <td className="pt-2 font-semibold text-xs text-muted-foreground">
                        TOTALS
                      </td>
                      <td className="pt-2 text-right font-bold">
                        {AUNTY_WALLETS.reduce(
                          (s, a) => s + a.gross,
                          0,
                        ).toLocaleString()}
                      </td>
                      <td className="pt-2 text-right font-bold text-red-600">
                        {AUNTY_WALLETS.reduce(
                          (s, a) => s + a.commission,
                          0,
                        ).toLocaleString()}
                      </td>
                      <td className="pt-2 text-right font-bold text-red-500">
                        {AUNTY_WALLETS.reduce(
                          (s, a) => s + a.gstOnCommission,
                          0,
                        ).toLocaleString()}
                      </td>
                      <td className="pt-2 text-right font-bold">
                        {AUNTY_WALLETS.reduce(
                          (s, a) => s + a.tds,
                          0,
                        ).toLocaleString()}
                      </td>
                      <td className="pt-2 text-right font-bold text-green-700">
                        +
                        {AUNTY_WALLETS.reduce(
                          (s, a) => s + a.tips,
                          0,
                        ).toLocaleString()}
                      </td>
                      <td className="pt-2 text-right font-bold text-green-700">
                        ₹
                        {AUNTY_WALLETS.reduce(
                          (s, a) => s + netPayable(a),
                          0,
                        ).toLocaleString()}
                      </td>
                      <td colSpan={2} />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Tab 3: Payout Schedule ────────────────────────────────────── */}
        {activeTab === 2 && (
          <div className="space-y-4" data-ocid="payout.schedule_section">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              Payouts processed on the{" "}
              <strong className="text-blue-700">1st and 15th</strong> of every
              month via Razorpay Bulk Payout API
            </div>
            {PAYOUT_CYCLES.map((cycle, i) => (
              <Card
                key={cycle.date}
                className="shadow-sm"
                data-ocid={`payout.cycle.item.${i + 1}`}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-amber-700" />
                        <span className="font-display font-bold text-base">
                          {cycle.label}
                        </span>
                        {statusBadge(cycleStatuses[i])}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {cycle.aunties} aunties · ₹
                        {cycle.total.toLocaleString()} total
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          setCycleStatuses((p) => ({ ...p, [i]: "Completed" }))
                        }
                        data-ocid={`payout.cycle.approve_button.${i + 1}`}
                        disabled={cycleStatuses[i] === "Completed"}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" /> Approve Cycle
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() =>
                          setCycleStatuses((p) => ({ ...p, [i]: "On Hold" }))
                        }
                        data-ocid={`payout.cycle.hold_button.${i + 1}`}
                      >
                        <X className="w-3 h-3 mr-1" /> Put on Hold
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        data-ocid={`payout.cycle.download_button.${i + 1}`}
                      >
                        <Download className="w-3 h-3 mr-1" /> Download CSV
                      </Button>
                    </div>
                  </div>
                  {/* Included Aunties Preview */}
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Aunties included in this cycle:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {AUNTY_WALLETS.slice(0, cycle.aunties).map((a) => (
                        <span
                          key={a.id}
                          className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Tab 4: Advance Payout Requests ───────────────────────────── */}
        {activeTab === 3 && (
          <div className="space-y-4" data-ocid="payout.advance_section">
            <div className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>
                Advance payouts are processed within <strong>24 hours</strong>{" "}
                of admin approval via Razorpay Payout API. Maximum advance: 80%
                of pending balance.
              </span>
            </div>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">
                  Advance Payout Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="payout.advance_table"
                  >
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Aunty</th>
                        <th className="text-right pb-2 font-medium">
                          Amount (₹)
                        </th>
                        <th className="text-left pb-2 font-medium">Reason</th>
                        <th className="text-center pb-2 font-medium">Date</th>
                        <th className="text-center pb-2 font-medium">Status</th>
                        <th className="text-center pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {ADVANCE_REQUESTS.map((r, i) => (
                        <tr
                          key={r.id}
                          data-ocid={`payout.advance.item.${i + 1}`}
                        >
                          <td className="py-3 font-medium">{r.auntyName}</td>
                          <td className="py-3 text-right font-bold">
                            ₹{r.amount.toLocaleString()}
                          </td>
                          <td className="py-3 text-xs text-muted-foreground max-w-[200px]">
                            {r.reason}
                          </td>
                          <td className="py-3 text-center text-xs">
                            {r.requestDate}
                          </td>
                          <td className="py-3 text-center">
                            {statusBadge(advanceStatuses[r.id])}
                          </td>
                          <td className="py-3 text-center">
                            {advanceStatuses[r.id] === "Pending" ? (
                              <div className="flex gap-1.5 justify-center">
                                <Button
                                  size="sm"
                                  className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() =>
                                    setConfirmingAdvance({
                                      id: r.id,
                                      action: "Approve",
                                    })
                                  }
                                  data-ocid={`payout.advance.approve_button.${i + 1}`}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs border-red-300 text-red-600"
                                  onClick={() =>
                                    setConfirmingAdvance({
                                      id: r.id,
                                      action: "Reject",
                                    })
                                  }
                                  data-ocid={`payout.advance.delete_button.${i + 1}`}
                                >
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Resolved
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

            {/* Confirmation Dialog */}
            {confirmingAdvance && (
              <div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                data-ocid="payout.advance.dialog"
              >
                <Card className="w-80 shadow-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {confirmingAdvance.action} Advance Request?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to{" "}
                      <strong>{confirmingAdvance.action.toLowerCase()}</strong>{" "}
                      this advance payout request?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className={`flex-1 text-sm ${
                          confirmingAdvance.action === "Approve"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        } text-white`}
                        onClick={() => {
                          setAdvanceStatuses((p) => ({
                            ...p,
                            [confirmingAdvance.id]:
                              confirmingAdvance.action === "Approve"
                                ? "Approved"
                                : "Rejected",
                          }));
                          setConfirmingAdvance(null);
                        }}
                        data-ocid="payout.advance.confirm_button"
                      >
                        {confirmingAdvance.action}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-sm"
                        onClick={() => setConfirmingAdvance(null)}
                        data-ocid="payout.advance.cancel_button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 5: Earnings Statements ────────────────────────────────── */}
        {activeTab === 4 && (
          <div className="space-y-4" data-ocid="payout.statements_section">
            {/* Filters */}
            <Card className="shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="stmt-aunty"
                      className="text-xs font-medium text-muted-foreground block mb-1"
                    >
                      Select Aunty
                    </label>
                    <select
                      id="stmt-aunty"
                      className="w-full h-9 border rounded-md px-3 text-sm bg-background"
                      value={stmtAunty}
                      onChange={(e) => setStmtAunty(Number(e.target.value))}
                      data-ocid="payout.statement.aunty_select"
                    >
                      {AUNTY_WALLETS.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} · {a.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="stmt-month"
                      className="text-xs font-medium text-muted-foreground block mb-1"
                    >
                      Month
                    </label>
                    <select
                      id="stmt-month"
                      className="w-full h-9 border rounded-md px-3 text-sm bg-background"
                      value={stmtMonth}
                      onChange={(e) => setStmtMonth(e.target.value)}
                      data-ocid="payout.statement.month_select"
                    >
                      {[
                        "March 2026",
                        "February 2026",
                        "January 2026",
                        "December 2025",
                      ].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statement Preview */}
            {(() => {
              const a =
                AUNTY_WALLETS.find((x) => x.id === stmtAunty) ??
                AUNTY_WALLETS[0];
              const net = netPayable(a);
              return (
                <Card
                  className="shadow-sm border-2 border-amber-200"
                  data-ocid="payout.statement.card"
                >
                  <CardHeader className="pb-2 bg-amber-800 text-white rounded-t-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs opacity-80">
                          Choudhary Aunty Platform
                        </p>
                        <CardTitle className="text-lg font-display mt-0.5">
                          Earnings Statement
                        </CardTitle>
                        <p className="text-xs opacity-80 mt-0.5">
                          {a.name} · {a.location} · {stmtMonth}
                        </p>
                      </div>
                      <BadgeCheck className="w-8 h-8 opacity-60" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        { label: "Total Orders", value: "24" },
                        { label: "Tier", value: a.tier },
                        {
                          label: "Days on Platform",
                          value: String(a.daysOnPlatform),
                        },
                        {
                          label: "FSSAI Number",
                          value: a.fssai || "Not Registered",
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="bg-muted/30 rounded-lg p-2"
                        >
                          <p className="text-xs text-muted-foreground">
                            {row.label}
                          </p>
                          <p className="font-semibold text-sm">{row.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody className="divide-y">
                          {[
                            {
                              label: "Gross Earnings",
                              value: `₹${a.gross.toLocaleString()}`,
                              bold: false,
                            },
                            {
                              label: "Platform Commission",
                              value: `-₹${a.commission.toLocaleString()}`,
                              bold: false,
                              red: true,
                            },
                            {
                              label: "GST on Commission (18%)",
                              value: `-₹${a.gstOnCommission.toLocaleString()}`,
                              bold: false,
                              red: true,
                            },
                            {
                              label: "TDS Deducted (Sec 194C)",
                              value:
                                a.tds > 0 ? `-₹${a.tds.toLocaleString()}` : "—",
                              bold: false,
                            },
                            {
                              label: "Tips Received",
                              value: `+₹${a.tips.toLocaleString()}`,
                              bold: false,
                              green: true,
                            },
                          ].map((row) => (
                            <tr key={row.label}>
                              <td className="px-3 py-2 text-muted-foreground text-xs">
                                {row.label}
                              </td>
                              <td
                                className={`px-3 py-2 text-right text-xs font-medium ${
                                  row.red
                                    ? "text-red-600"
                                    : row.green
                                      ? "text-green-700"
                                      : ""
                                }`}
                              >
                                {row.value}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-green-50">
                            <td className="px-3 py-2.5 font-bold text-sm">
                              Net Amount Paid
                            </td>
                            <td className="px-3 py-2.5 text-right font-bold text-green-700">
                              ₹{net.toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        className="flex-1 bg-amber-800 hover:bg-amber-900 text-white text-sm"
                        onClick={() => window.print()}
                        data-ocid="payout.statement.print_button"
                      >
                        <Printer className="w-4 h-4 mr-2" /> Generate PDF
                        Statement
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-green-400 text-green-700 hover:bg-green-50 text-sm"
                        onClick={() => {
                          const msg = `Namaste ${a.name} ji, your Choudhary Aunty earnings statement for ${stmtMonth}: Gross ₹${a.gross}, Net Paid ₹${net}. For details visit your Maker Dashboard.`;
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(msg)}`,
                            "_blank",
                          );
                        }}
                        data-ocid="payout.statement.whatsapp_button"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" /> Send on
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        )}

        {/* ── Tab 6: TDS & Compliance ───────────────────────────────────── */}
        {activeTab === 5 && (
          <div className="space-y-6" data-ocid="payout.compliance_section">
            {/* TDS Tracker */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" /> TDS Tracker
                  (Section 194C)
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  1% TDS deducted when annual earnings exceed ₹30,000. Form 16A
                  generated at year end.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="payout.tds_table"
                  >
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Aunty</th>
                        <th className="text-right pb-2 font-medium">
                          YTD Earnings (₹)
                        </th>
                        <th className="text-right pb-2 font-medium">
                          YTD Commission (₹)
                        </th>
                        <th className="text-center pb-2 font-medium">
                          TDS Applicable
                        </th>
                        <th className="text-right pb-2 font-medium">
                          TDS Deducted (₹)
                        </th>
                        <th className="text-center pb-2 font-medium">Status</th>
                        <th className="text-center pb-2 font-medium">
                          Form 16A
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {AUNTY_WALLETS.map((a, i) => {
                        const applicable = a.gross >= 30000;
                        const nearThreshold =
                          a.gross >= 25000 && a.gross < 30000;
                        return (
                          <tr key={a.id} data-ocid={`payout.tds.item.${i + 1}`}>
                            <td className="py-2">
                              <div className="font-medium">{a.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {a.tier}
                              </div>
                            </td>
                            <td className="py-2 text-right">
                              ₹{a.gross.toLocaleString()}
                              {nearThreshold && (
                                <span className="ml-1.5 text-xs bg-amber-100 text-amber-700 px-1 py-0.5 rounded-full">
                                  <AlertTriangle className="w-3 h-3 inline" />{" "}
                                  Near
                                </span>
                              )}
                            </td>
                            <td className="py-2 text-right">
                              ₹{a.commission.toLocaleString()}
                            </td>
                            <td className="py-2 text-center">
                              {applicable ? (
                                <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="py-2 text-right">
                              {a.tds > 0 ? `₹${a.tds.toLocaleString()}` : "—"}
                            </td>
                            <td className="py-2 text-center">
                              {applicable ? (
                                <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                                  Active
                                </span>
                              ) : nearThreshold ? (
                                <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                                  Watch
                                </span>
                              ) : (
                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                  Clear
                                </span>
                              )}
                            </td>
                            <td className="py-2 text-center">
                              {applicable ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => window.print()}
                                  data-ocid={`payout.tds.form16a_button.${i + 1}`}
                                >
                                  <Printer className="w-3 h-3 mr-1" /> Form 16A
                                </Button>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  Not yet applicable
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                  TDS threshold: ₹30,000 annual earnings (Sec 194C). Aunties
                  within ₹5,000 of threshold are flagged for monitoring. Form
                  16A issued at financial year end (April).
                </div>
              </CardContent>
            </Card>

            {/* FSSAI Status */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-600" /> FSSAI
                  Compliance Status
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  All active aunties must hold a valid FSSAI Basic Registration.
                  Renewal required annually.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="payout.fssai_table"
                  >
                    <thead>
                      <tr className="border-b text-xs text-muted-foreground">
                        <th className="text-left pb-2 font-medium">Aunty</th>
                        <th className="text-left pb-2 font-medium">
                          FSSAI Number
                        </th>
                        <th className="text-center pb-2 font-medium">
                          Expiry Date
                        </th>
                        <th className="text-center pb-2 font-medium">Status</th>
                        <th className="text-center pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {AUNTY_WALLETS.map((a, i) => {
                        const hasFssai = !!a.fssai;
                        const isExpiringSoon =
                          hasFssai &&
                          new Date(a.fssaiExpiry) <
                            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
                        const isExpired =
                          hasFssai && new Date(a.fssaiExpiry) < new Date();
                        const fssaiStatus = !hasFssai
                          ? "Missing"
                          : isExpired
                            ? "Expired"
                            : isExpiringSoon
                              ? "Expiring Soon"
                              : "Valid";
                        const fssaiColor: Record<string, string> = {
                          Valid: "bg-green-100 text-green-700",
                          "Expiring Soon": "bg-amber-100 text-amber-700",
                          Expired: "bg-red-100 text-red-700",
                          Missing: "bg-red-100 text-red-700",
                        };
                        return (
                          <tr
                            key={a.id}
                            data-ocid={`payout.fssai.item.${i + 1}`}
                          >
                            <td className="py-2">
                              <div className="font-medium">{a.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {a.location}
                              </div>
                            </td>
                            <td className="py-2 font-mono text-xs">
                              {a.fssai || (
                                <span className="text-red-500">
                                  Not registered
                                </span>
                              )}
                            </td>
                            <td className="py-2 text-center text-xs">
                              {a.fssaiExpiry || "—"}
                            </td>
                            <td className="py-2 text-center">
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${fssaiColor[fssaiStatus]}`}
                              >
                                {fssaiStatus}
                              </span>
                            </td>
                            <td className="py-2 text-center">
                              {fssaiStatus === "Missing" ||
                              fssaiStatus === "Expiring Soon" ||
                              fssaiStatus === "Expired" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs border-amber-400 text-amber-700 hover:bg-amber-50"
                                  onClick={() => {
                                    const msg = `Namaste ${a.name} ji, your FSSAI registration ${
                                      fssaiStatus === "Missing"
                                        ? "is missing"
                                        : "is expiring soon"
                                    }. Please renew/register at https://foscos.fssai.gov.in to continue selling on Choudhary Aunty.`;
                                    window.open(
                                      `https://wa.me/?text=${encodeURIComponent(msg)}`,
                                      "_blank",
                                    );
                                  }}
                                  data-ocid={`payout.fssai.remind_button.${i + 1}`}
                                >
                                  <Send className="w-3 h-3 mr-1" /> Remind Aunty
                                </Button>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  No action needed
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
