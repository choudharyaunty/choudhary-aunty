import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Edit2,
  Lock,
  Percent,
  Save,
  Shield,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

const PASSWORD = "amar2026";

const INITIAL_SLABS = [
  {
    id: 1,
    category: "Achar & Pickles",
    rate: 15,
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: 2,
    category: "Sweets & Laddoo",
    rate: 20,
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: 3,
    category: "Namkeen & Snacks",
    rate: 15,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: 4,
    category: "Masala & Spices",
    rate: 20,
    color: "bg-red-100 text-red-800",
  },
  {
    id: 5,
    category: "Premium / Specialty",
    rate: 25,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 6,
    category: "Festival Hampers",
    rate: 25,
    color: "bg-yellow-100 text-yellow-800",
  },
];

const AUNTY_DATA = [
  {
    id: 1,
    name: "Anju Devi",
    tier: "Platinum",
    daysOnPlatform: 210,
    ytdEarnings: 38500,
    ytdCommission: 7700,
    tds: 385,
    status: "Active",
    aisScore: 91,
  },
  {
    id: 2,
    name: "Priya Sharma",
    tier: "Gold",
    daysOnPlatform: 145,
    ytdEarnings: 24200,
    ytdCommission: 4840,
    tds: 242,
    status: "Active",
    aisScore: 78,
  },
  {
    id: 3,
    name: "Sunita Yadav",
    tier: "Silver",
    daysOnPlatform: 62,
    ytdEarnings: 9800,
    ytdCommission: 1960,
    tds: 0,
    status: "Holiday",
    aisScore: 65,
  },
  {
    id: 4,
    name: "Rekha Joshi",
    tier: "New",
    daysOnPlatform: 18,
    ytdEarnings: 3200,
    ytdCommission: 320,
    tds: 0,
    status: "Active",
    aisScore: 52,
  },
  {
    id: 5,
    name: "Meena Kumari",
    tier: "Gold",
    daysOnPlatform: 189,
    ytdEarnings: 31600,
    ytdCommission: 6320,
    tds: 316,
    status: "Active",
    aisScore: 84,
  },
  {
    id: 6,
    name: "Kamla Devi",
    tier: "Silver",
    daysOnPlatform: 78,
    ytdEarnings: 14100,
    ytdCommission: 2820,
    tds: 0,
    status: "Active",
    aisScore: 71,
  },
];

const TIER_DISCOUNTS: Record<string, number> = {
  Platinum: 4,
  Gold: 2,
  Silver: 0,
  New: 0,
};

const TDS_THRESHOLD = 30000;
const COMMISSION_CAP = 800;
const HOLIDAY_RATE = 10;
const HOLIDAY_DAYS = 90;
const GST_ON_COMMISSION = 18;

function calcEffectiveRate(
  baseRate: number,
  tier: string,
  daysOnPlatform: number,
) {
  if (daysOnPlatform <= HOLIDAY_DAYS) return HOLIDAY_RATE;
  return Math.max(baseRate - (TIER_DISCOUNTS[tier] ?? 0), 5);
}

function calcOrderBreakdown(
  orderValue: number,
  baseRate: number,
  tier: string,
  daysOnPlatform: number,
) {
  const effectiveRate = calcEffectiveRate(baseRate, tier, daysOnPlatform);
  const rawCommission = (orderValue * effectiveRate) / 100;
  const commission = Math.min(rawCommission, COMMISSION_CAP);
  const gstOnCommission = (commission * GST_ON_COMMISSION) / 100;
  const auntyNet = orderValue - commission - gstOnCommission;
  return { effectiveRate, commission, gstOnCommission, auntyNet };
}

export default function CommissionEnginePage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [slabs, setSlabs] = useState(INITIAL_SLABS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editVal, setEditVal] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);
  // Order simulator
  const [simOrder, setSimOrder] = useState("1200");
  const [simCategory, setSimCategory] = useState(1);
  const [simAunty, setSimAunty] = useState(1);

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  function startEdit(id: number, rate: number) {
    setEditingId(id);
    setEditVal(String(rate));
  }

  function saveEdit(id: number) {
    const val = Number.parseInt(editVal);
    if (Number.isNaN(val) || val < 5 || val > 40) return;
    setSlabs(slabs.map((s) => (s.id === id ? { ...s, rate: val } : s)));
    setEditingId(null);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  const selectedSlab = slabs.find((s) => s.id === simCategory)!;
  const selectedAunty = AUNTY_DATA.find((a) => a.id === simAunty)!;
  const orderVal = Number.parseFloat(simOrder) || 0;
  const breakdown = calcOrderBreakdown(
    orderVal,
    selectedSlab.rate,
    selectedAunty.tier,
    selectedAunty.daysOnPlatform,
  );

  const totalCommission = AUNTY_DATA.reduce((s, a) => s + a.ytdCommission, 0);
  const totalTDS = AUNTY_DATA.reduce((s, a) => s + a.tds, 0);
  const tdsPending = AUNTY_DATA.filter(
    (a) => a.ytdEarnings > 20000 && a.ytdEarnings < TDS_THRESHOLD,
  );

  if (!authed) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-amber-700" />
            </div>
            <CardTitle className="font-display text-xl">
              Commission Engine
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
              data-ocid="commission.password_input"
              className={pwError ? "border-red-400" : ""}
            />
            {pwError && (
              <p className="text-red-500 text-xs">Incorrect password</p>
            )}
            <Button
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              onClick={handleLogin}
              data-ocid="commission.login_button"
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Commission Engine
              </h1>
              <p className="text-sm text-muted-foreground">
                Category slabs · Tier discounts · TDS · Payout breakdown
              </p>
            </div>
          </div>
          {savedMsg && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm mt-3">
              <CheckCircle className="w-4 h-4" /> Commission slab saved
              successfully
            </div>
          )}
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "YTD Platform Commission",
              value: `₹${totalCommission.toLocaleString()}`,
              icon: DollarSign,
              color: "text-amber-700",
            },
            {
              label: "Commission Cap / Order",
              value: `₹${COMMISSION_CAP}`,
              icon: Shield,
              color: "text-blue-700",
            },
            {
              label: "GST on Commission",
              value: `${GST_ON_COMMISSION}%`,
              icon: Percent,
              color: "text-purple-700",
            },
            {
              label: "YTD TDS Deducted",
              value: `₹${totalTDS.toLocaleString()}`,
              icon: TrendingDown,
              color: "text-red-600",
            },
          ].map((k) => (
            <Card key={k.label} className="shadow-sm">
              <CardContent className="pt-4 pb-3">
                <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
                <p className="text-lg font-bold font-display">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Commission Slabs */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-700" /> Category
                Commission Slabs
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Click the pencil icon to edit any slab (5–40%)
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {slabs.map((slab) => (
                <div
                  key={slab.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40"
                >
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${slab.color}`}
                  >
                    {slab.category}
                  </span>
                  {editingId === slab.id ? (
                    <div className="flex items-center gap-1.5">
                      <Input
                        className="w-16 h-7 text-sm text-center"
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                        data-ocid={`commission.slab_input.${slab.id}`}
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                      <Button
                        size="sm"
                        className="h-7 px-2 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => saveEdit(slab.id)}
                        data-ocid={`commission.slab_save.${slab.id}`}
                      >
                        <Save className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => setEditingId(null)}
                        data-ocid={`commission.slab_cancel.${slab.id}`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">{slab.rate}%</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => startEdit(slab.id, slab.rate)}
                        data-ocid={`commission.slab_edit.${slab.id}`}
                      >
                        <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Breakdown Simulator */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-700" /> Order Breakdown
                Simulator
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Simulate commission deduction for any order
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="sim-order"
                    className="text-xs font-medium text-muted-foreground block mb-1"
                  >
                    Order Value (₹)
                  </label>
                  <Input
                    id="sim-order"
                    value={simOrder}
                    onChange={(e) => setSimOrder(e.target.value)}
                    className="h-8 text-sm"
                    data-ocid="commission.sim_order_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sim-category"
                    className="text-xs font-medium text-muted-foreground block mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="sim-category"
                    className="w-full h-8 text-sm border rounded-md px-2 bg-background"
                    value={simCategory}
                    onChange={(e) => setSimCategory(Number(e.target.value))}
                    data-ocid="commission.sim_category_select"
                  >
                    {slabs.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="sim-aunty"
                  className="text-xs font-medium text-muted-foreground block mb-1"
                >
                  Aunty
                </label>
                <select
                  id="sim-aunty"
                  className="w-full h-8 text-sm border rounded-md px-2 bg-background"
                  value={simAunty}
                  onChange={(e) => setSimAunty(Number(e.target.value))}
                  data-ocid="commission.sim_aunty_select"
                >
                  {AUNTY_DATA.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.tier} · {a.daysOnPlatform}d)
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Gross Order Value
                  </span>
                  <span className="font-semibold">
                    ₹{orderVal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Effective Commission Rate
                  </span>
                  <span className="font-semibold text-amber-700">
                    {breakdown.effectiveRate}%
                    {selectedAunty.daysOnPlatform <= HOLIDAY_DAYS && (
                      <span className="ml-1 text-xs text-green-600">
                        (Holiday)
                      </span>
                    )}
                    {selectedAunty.tier !== "New" &&
                      selectedAunty.tier !== "Silver" &&
                      selectedAunty.daysOnPlatform > HOLIDAY_DAYS && (
                        <span className="ml-1 text-xs text-blue-600">
                          (-{TIER_DISCOUNTS[selectedAunty.tier]}%{" "}
                          {selectedAunty.tier})
                        </span>
                      )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Platform Commission
                  </span>
                  <span className="font-semibold text-red-600">
                    -₹{breakdown.commission.toFixed(0)}
                  </span>
                </div>
                {breakdown.commission >= COMMISSION_CAP && (
                  <div className="text-xs text-blue-600">
                    Cap applied (₹{COMMISSION_CAP} max)
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    GST on Commission (18%)
                  </span>
                  <span className="font-semibold text-red-500">
                    -₹{breakdown.gstOnCommission.toFixed(0)}
                  </span>
                </div>
                <div className="border-t border-amber-300 pt-1.5 flex justify-between">
                  <span className="font-semibold">Aunty Net Payout</span>
                  <span className="font-bold text-green-700">
                    ₹{breakdown.auntyNet.toFixed(0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tier Rules */}
        <Card className="shadow-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">
              Commission Rules by Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  tier: "New (0–90 days)",
                  rate: "10% flat",
                  benefit: "Commission Holiday",
                  color: "bg-green-50 border-green-200",
                  badge: "bg-green-100 text-green-800",
                },
                {
                  tier: "Silver",
                  rate: "Standard slab",
                  benefit: "No discount",
                  color: "bg-gray-50 border-gray-200",
                  badge: "bg-gray-100 text-gray-700",
                },
                {
                  tier: "Gold",
                  rate: "Slab − 2%",
                  benefit: "Loyalty discount",
                  color: "bg-yellow-50 border-yellow-200",
                  badge: "bg-yellow-100 text-yellow-800",
                },
                {
                  tier: "Platinum",
                  rate: "Slab − 4%",
                  benefit: "Top performer",
                  color: "bg-purple-50 border-purple-200",
                  badge: "bg-purple-100 text-purple-800",
                },
              ].map((t) => (
                <div
                  key={t.tier}
                  className={`rounded-lg border p-3 ${t.color}`}
                >
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.badge}`}
                  >
                    {t.tier}
                  </span>
                  <p className="text-base font-bold mt-2 font-display">
                    {t.rate}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.benefit}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
              <Shield className="w-3.5 h-3.5 inline mr-1" />
              Commission cap: max ₹{COMMISSION_CAP} per order regardless of
              order value or rate. GST of 18% is charged on platform commission
              (not on aunty earnings).
            </div>
          </CardContent>
        </Card>

        {/* Aunty Commission Table */}
        <Card className="shadow-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600" /> Aunty Commission
              & TDS Tracker (YTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                data-ocid="commission.aunty_table"
              >
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="text-left pb-2 font-medium">Aunty</th>
                    <th className="text-left pb-2 font-medium">Tier</th>
                    <th className="text-right pb-2 font-medium">
                      YTD Gross (₹)
                    </th>
                    <th className="text-right pb-2 font-medium">
                      Commission (₹)
                    </th>
                    <th className="text-right pb-2 font-medium">TDS (₹)</th>
                    <th className="text-right pb-2 font-medium">TDS Status</th>
                    <th className="text-right pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {AUNTY_DATA.map((a, idx) => {
                    const tdsAlert =
                      a.ytdEarnings > 20000 && a.ytdEarnings < TDS_THRESHOLD;
                    const tdsActive = a.ytdEarnings >= TDS_THRESHOLD;
                    return (
                      <tr
                        key={a.id}
                        className="py-1"
                        data-ocid={`commission.aunty_table.item.${idx + 1}`}
                      >
                        <td className="py-2 font-medium">{a.name}</td>
                        <td className="py-2">
                          <Badge variant="outline" className="text-xs">
                            {a.tier}
                          </Badge>
                        </td>
                        <td className="py-2 text-right">
                          ₹{a.ytdEarnings.toLocaleString()}
                        </td>
                        <td className="py-2 text-right text-red-600">
                          ₹{a.ytdCommission.toLocaleString()}
                        </td>
                        <td className="py-2 text-right">
                          {a.tds > 0 ? `₹${a.tds}` : "—"}
                        </td>
                        <td className="py-2 text-right">
                          {tdsActive && (
                            <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                          {tdsAlert && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Near limit
                            </span>
                          )}
                          {!tdsActive && !tdsAlert && (
                            <span className="text-xs text-muted-foreground">
                              Below threshold
                            </span>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded-full ${a.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t">
                  <tr>
                    <td
                      colSpan={2}
                      className="pt-2 text-xs font-semibold text-muted-foreground"
                    >
                      Totals
                    </td>
                    <td className="pt-2 text-right font-bold">
                      ₹
                      {AUNTY_DATA.reduce(
                        (s, a) => s + a.ytdEarnings,
                        0,
                      ).toLocaleString()}
                    </td>
                    <td className="pt-2 text-right font-bold text-red-600">
                      ₹{totalCommission.toLocaleString()}
                    </td>
                    <td className="pt-2 text-right font-bold">
                      ₹{totalTDS.toLocaleString()}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-3 text-xs text-muted-foreground bg-muted/40 rounded-lg p-2.5">
              TDS (1%) deducted under Sec 194C when annual earnings exceed
              ₹30,000. {tdsPending.length} aunty(s) approaching threshold —
              monitor closely.
            </div>
          </CardContent>
        </Card>

        {/* Policy Reference */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">
              Commission Policy Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                {
                  title: "New Aunty Holiday",
                  desc: `First ${HOLIDAY_DAYS} days on platform: flat ${HOLIDAY_RATE}% commission regardless of category. Incentivises early earning.`,
                },
                {
                  title: "Tier Discount",
                  desc: "Gold aunties get −2%, Platinum get −4% off standard slab. Rewards loyalty and performance.",
                },
                {
                  title: "Commission Cap",
                  desc: `Maximum ₹${COMMISSION_CAP} commission per order. Protects aunty earnings on large orders (₹5,000+).`,
                },
                {
                  title: "GST on Commission",
                  desc: "18% GST applies to platform commission (not aunty earnings). Shown separately in every payout breakdown.",
                },
                {
                  title: "TDS Sec 194C",
                  desc: "1% TDS deducted when cumulative annual earnings cross ₹30,000. Form 16A issued at year end.",
                },
                {
                  title: "Payout Cycle",
                  desc: "Bimonthly payouts via Razorpay. Aunty net = Gross − Commission − GST on Commission − TDS.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="flex gap-2.5 p-2.5 bg-muted/30 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-xs">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
