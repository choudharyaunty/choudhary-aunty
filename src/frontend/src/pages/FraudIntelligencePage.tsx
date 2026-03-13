import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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
  Activity,
  AlertCircle,
  AlertTriangle,
  Ban,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  Globe,
  IndianRupee,
  Lock,
  Network,
  Settings,
  Shield,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Users,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

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
    <main className="min-h-screen flex items-center justify-center bg-[#0a0d14]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-4"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800/50 mb-4">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Fraud Intelligence
          </h1>
          <p className="text-slate-400 text-sm">
            Restricted access — admin only
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-slate-300 text-sm mb-2 block">
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
              className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-red-500"
              data-ocid="fraud.input"
            />
            {error && (
              <p
                className="text-red-400 text-xs mt-1"
                data-ocid="fraud.error_state"
              >
                Incorrect password. Try again.
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            data-ocid="fraud.submit_button"
          >
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Severity = "Critical" | "High" | "Medium" | "Low";
type FrsStatus = "Clean" | "Watch" | "Flagged" | "Suspended" | "Banned";

function frsBand(score: number): FrsStatus {
  if (score <= 30) return "Clean";
  if (score <= 59) return "Watch";
  if (score <= 79) return "Flagged";
  if (score <= 89) return "Suspended";
  return "Banned";
}

function FrsBadge({ score }: { score: number }) {
  const band = frsBand(score);
  const cls: Record<FrsStatus, string> = {
    Clean: "bg-emerald-900/60 text-emerald-300 border-emerald-700",
    Watch: "bg-yellow-900/60 text-yellow-300 border-yellow-700",
    Flagged: "bg-orange-900/60 text-orange-300 border-orange-700",
    Suspended: "bg-red-900/60 text-red-300 border-red-700",
    Banned: "bg-slate-900 text-red-200 border-red-900",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold border ${cls[band]}`}
    >
      {score} · {band}
    </span>
  );
}

function SeverityBadge({ level }: { level: Severity }) {
  const cls: Record<Severity, string> = {
    Critical: "bg-red-900/70 text-red-300 border-red-700",
    High: "bg-orange-900/70 text-orange-300 border-orange-700",
    Medium: "bg-yellow-900/70 text-yellow-300 border-yellow-700",
    Low: "bg-green-900/70 text-green-300 border-green-700",
  };
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border ${cls[level]}`}
    >
      {level}
    </span>
  );
}

// ─── Tab 1: Platform Overview ────────────────────────────────────────────────

const fraudPatterns = [
  {
    name: "Refund Farming",
    count: 23,
    severity: "High" as Severity,
    trend: "up",
  },
  {
    name: "Rating Manipulation",
    count: 18,
    severity: "High" as Severity,
    trend: "down",
  },
  {
    name: "Referral Ring",
    count: 12,
    severity: "Critical" as Severity,
    trend: "up",
  },
  {
    name: "Velocity Abuse",
    count: 9,
    severity: "Medium" as Severity,
    trend: "stable",
  },
  {
    name: "Payout Destination Cycling",
    count: 6,
    severity: "High" as Severity,
    trend: "down",
  },
];

const frsDistribution = [
  { label: "Clean (0–30)", count: 8420, color: "bg-emerald-500", pct: 82 },
  { label: "Watch (31–59)", count: 1240, color: "bg-yellow-400", pct: 12 },
  { label: "Flagged (60–79)", count: 312, color: "bg-orange-400", pct: 3 },
  { label: "Suspended (80–89)", count: 38, color: "bg-red-500", pct: 0.4 },
  { label: "Banned (90–100)", count: 14, color: "bg-red-900", pct: 0.1 },
];

// Generate fake 30-day data
const dailyEvents = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  events: Math.floor(12 + Math.random() * 18 + (i > 20 ? 10 : 0)),
}));

function OverviewTab() {
  const maxEvents = Math.max(...dailyEvents.map((d) => d.events));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          {
            label: "Active Flags",
            value: "47",
            icon: AlertTriangle,
            color: "text-orange-400",
            bg: "bg-orange-950/40",
          },
          {
            label: "Critical Alerts",
            value: "3",
            icon: AlertCircle,
            color: "text-red-400",
            bg: "bg-red-950/40",
          },
          {
            label: "Financial Exposure",
            value: "₹1,24,500",
            icon: IndianRupee,
            color: "text-yellow-400",
            bg: "bg-yellow-950/40",
          },
          {
            label: "Avg Resolution",
            value: "18h",
            icon: Clock,
            color: "text-blue-400",
            bg: "bg-blue-950/40",
          },
          {
            label: "FRS >80 Accounts",
            value: "12",
            icon: Users,
            color: "text-red-300",
            bg: "bg-red-950/40",
          },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`${kpi.bg} border border-slate-700/50 rounded-xl p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              <span className="text-slate-400 text-xs">{kpi.label}</span>
            </div>
            <div className={`text-2xl font-bold font-mono ${kpi.color}`}>
              {kpi.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FRS Distribution */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> FRS Distribution
          </h3>
          <div className="space-y-3">
            {frsDistribution.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400 font-mono">
                    {item.count.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${Math.max(item.pct, 0.5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Events Chart */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-400" /> 30-Day Fraud
            Events
          </h3>
          <div className="flex items-end gap-[3px] h-32">
            {dailyEvents.map((d) => (
              <div
                key={d.day}
                className="flex-1 bg-orange-500/70 rounded-t hover:bg-orange-400 transition-colors"
                style={{ height: `${(d.events / maxEvents) * 100}%` }}
                title={`Day ${d.day}: ${d.events} events`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Day 1</span>
            <span>Day 30</span>
          </div>
        </div>
      </div>

      {/* Top 5 Fraud Patterns */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h3 className="text-white font-semibold">
            Top Active Fraud Patterns
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400">Pattern</TableHead>
              <TableHead className="text-slate-400">Count</TableHead>
              <TableHead className="text-slate-400">Severity</TableHead>
              <TableHead className="text-slate-400">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fraudPatterns.map((p, i) => (
              <TableRow
                key={p.name}
                className="border-slate-700/50 hover:bg-slate-700/20"
                data-ocid={`fraud.pattern.row.${i + 1}`}
              >
                <TableCell className="text-slate-200 font-medium">
                  {p.name}
                </TableCell>
                <TableCell className="font-mono text-slate-300">
                  {p.count}
                </TableCell>
                <TableCell>
                  <SeverityBadge level={p.severity} />
                </TableCell>
                <TableCell>
                  {p.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-red-400" />
                  ) : p.trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-green-400" />
                  ) : (
                    <span className="text-slate-500 text-xs">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Tab 2: Customer Risk Monitor ────────────────────────────────────────────

const flaggedCustomers = [
  {
    name: "Rahul M.",
    phone: "98****3210",
    frs: 84,
    type: "Refund Farming",
    status: "Suspended",
    lastActivity: "2h ago",
    state: "Bihar",
  },
  {
    name: "Priya S.",
    phone: "76****8821",
    frs: 72,
    type: "Coin Farming",
    status: "Flagged",
    lastActivity: "5h ago",
    state: "UP",
  },
  {
    name: "Account #3821",
    phone: "91****0012",
    frs: 93,
    type: "Referral Ring",
    status: "Banned",
    lastActivity: "1d ago",
    state: "Delhi",
  },
  {
    name: "Amit K.",
    phone: "87****4432",
    frs: 65,
    type: "Velocity Abuse",
    status: "Flagged",
    lastActivity: "30m ago",
    state: "Bihar",
  },
  {
    name: "Sunita R.",
    phone: "99****1122",
    frs: 38,
    type: "Ghost Account",
    status: "Watch",
    lastActivity: "3d ago",
    state: "MP",
  },
  {
    name: "Account #4455",
    phone: "70****5566",
    frs: 88,
    type: "Referral Ring",
    status: "Suspended",
    lastActivity: "4h ago",
    state: "Bihar",
  },
  {
    name: "Vikram N.",
    phone: "82****9900",
    frs: 61,
    type: "Refund Farming",
    status: "Flagged",
    lastActivity: "1h ago",
    state: "UP",
  },
  {
    name: "Meera D.",
    phone: "94****7733",
    frs: 55,
    type: "Coin Farming",
    status: "Watch",
    lastActivity: "6h ago",
    state: "Jharkhand",
  },
  {
    name: "Account #7741",
    phone: "78****3344",
    frs: 91,
    type: "Ghost Account",
    status: "Banned",
    lastActivity: "2d ago",
    state: "Delhi",
  },
  {
    name: "Ravi P.",
    phone: "65****6677",
    frs: 43,
    type: "Velocity Abuse",
    status: "Watch",
    lastActivity: "12h ago",
    state: "Bihar",
  },
];

function CustomerRiskTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filterRisk, setFilterRisk] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filtered = flaggedCustomers.filter((c) => {
    const band = frsBand(c.frs);
    if (filterRisk !== "all" && band.toLowerCase() !== filterRisk) return false;
    if (
      filterType !== "all" &&
      c.type.toLowerCase().replace(/ /g, "-") !== filterType
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3" data-ocid="fraud.filter.panel">
        <Select value={filterRisk} onValueChange={setFilterRisk}>
          <SelectTrigger
            className="w-40 bg-slate-800 border-slate-600 text-slate-200"
            data-ocid="fraud.risk.select"
          >
            <SelectValue placeholder="Risk Band" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Bands</SelectItem>
            <SelectItem value="watch">Watch</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger
            className="w-44 bg-slate-800 border-slate-600 text-slate-200"
            data-ocid="fraud.type.select"
          >
            <SelectValue placeholder="Fraud Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="refund-farming">Refund Farming</SelectItem>
            <SelectItem value="coin-farming">Coin Farming</SelectItem>
            <SelectItem value="referral-ring">Referral Ring</SelectItem>
            <SelectItem value="velocity-abuse">Velocity Abuse</SelectItem>
            <SelectItem value="ghost-account">Ghost Account</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400">Name</TableHead>
              <TableHead className="text-slate-400">Phone</TableHead>
              <TableHead className="text-slate-400">FRS</TableHead>
              <TableHead className="text-slate-400">Fraud Type</TableHead>
              <TableHead className="text-slate-400">Last Activity</TableHead>
              <TableHead className="text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c, i) => (
              <React.Fragment key={`customer-frag-${c.name}-${c.frs}`}>
                <TableRow
                  data-key={`customer-row-${c.name}-${i}`}
                  className="border-slate-700/50 hover:bg-slate-700/20 cursor-pointer"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  data-ocid={`fraud.customer.row.${i + 1}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {expanded === i ? (
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      )}
                      <span className="text-slate-200">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-slate-400">
                    {c.phone}
                  </TableCell>
                  <TableCell>
                    <FrsBadge score={c.frs} />
                  </TableCell>
                  <TableCell>
                    <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                      {c.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {c.lastActivity}
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex gap-1"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs border-yellow-700 text-yellow-300 hover:bg-yellow-900/30"
                        data-ocid={`fraud.customer.warn.${i + 1}`}
                      >
                        Warn
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs border-red-700 text-red-300 hover:bg-red-900/30"
                        data-ocid={`fraud.customer.delete_button.${i + 1}`}
                      >
                        Suspend
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <AnimatePresence>
                  {expanded === i && (
                    <TableRow
                      key={`expanded-row-${c.name}`}
                      className="border-slate-700/50"
                    >
                      <TableCell colSpan={6} className="bg-slate-900/60 p-4">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-slate-400 space-y-1"
                        >
                          <p className="font-semibold text-slate-300 mb-2">
                            Event Timeline
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            Order placed — ₹840 — 3 days ago
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                            Refund requested — ₹840 — 2 days ago
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            Order placed — ₹620 — 5 days ago
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                            Refund requested — ₹620 — 4 days ago
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                            Account created — {c.state} — 14 days ago
                          </div>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Tab 3: Maker Risk Monitor ───────────────────────────────────────────────

const flaggedMakers = [
  {
    name: "Sunita Devi",
    city: "Patna",
    frs: 87,
    type: "Fake Order Ring",
    payoutStatus: "Frozen",
    ratingIntegrity: 34,
  },
  {
    name: "Kamla Yadav",
    city: "Muzaffarpur",
    frs: 74,
    type: "Rating Manipulation",
    payoutStatus: "Active",
    ratingIntegrity: 52,
  },
  {
    name: "Anonymous M.",
    city: "Varanasi",
    frs: 92,
    type: "Commission Holiday Abuse",
    payoutStatus: "Frozen",
    ratingIntegrity: 18,
  },
  {
    name: "Rekha Sharma",
    city: "Allahabad",
    frs: 61,
    type: "Availability Gaming",
    payoutStatus: "Active",
    ratingIntegrity: 71,
  },
  {
    name: "Pushpa Gupta",
    city: "Ranchi",
    frs: 55,
    type: "Rating Manipulation",
    payoutStatus: "Active",
    ratingIntegrity: 63,
  },
  {
    name: "Unknown Maker",
    city: "Bhagalpur",
    frs: 88,
    type: "Fake Order Ring",
    payoutStatus: "Frozen",
    ratingIntegrity: 22,
  },
  {
    name: "Nirmala K.",
    city: "Gaya",
    frs: 44,
    type: "Batch Inflation",
    payoutStatus: "Active",
    ratingIntegrity: 78,
  },
  {
    name: "Saroj Mishra",
    city: "Darbhanga",
    frs: 38,
    type: "Payout Destination Cycling",
    payoutStatus: "Active",
    ratingIntegrity: 81,
  },
];

const frozenWallets = [
  { name: "Sunita Devi", amount: "₹12,400", daysFrozen: 8 },
  { name: "Anonymous M.", amount: "₹7,850", daysFrozen: 14 },
  { name: "Unknown Maker", amount: "₹5,200", daysFrozen: 3 },
];

function MakerRiskTab() {
  return (
    <div className="space-y-6">
      {/* Frozen Wallets Panel */}
      <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-5">
        <h3 className="text-red-300 font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4" /> Frozen Wallets — ₹25,450 Total at Risk
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frozenWallets.map((w, i) => (
            <div
              key={w.name}
              className="bg-slate-900/60 border border-red-900/50 rounded-lg p-4"
              data-ocid={`fraud.frozen.card.${i + 1}`}
            >
              <div className="font-medium text-slate-200">{w.name}</div>
              <div className="text-red-300 font-mono text-xl font-bold mt-1">
                {w.amount}
              </div>
              <div className="text-slate-400 text-xs mt-1">
                {w.daysFrozen} days frozen
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="h-6 text-xs bg-emerald-700 hover:bg-emerald-600"
                  data-ocid={`fraud.frozen.confirm_button.${i + 1}`}
                >
                  Release
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs border-red-700 text-red-300"
                  data-ocid={`fraud.frozen.delete_button.${i + 1}`}
                >
                  Escalate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maker Table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400">Maker Name</TableHead>
              <TableHead className="text-slate-400">City</TableHead>
              <TableHead className="text-slate-400">FRS</TableHead>
              <TableHead className="text-slate-400">Fraud Type</TableHead>
              <TableHead className="text-slate-400">Payout</TableHead>
              <TableHead className="text-slate-400">Rating Integrity</TableHead>
              <TableHead className="text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flaggedMakers.map((m, i) => (
              <TableRow
                key={`maker-row-${m.name}-${i}`}
                className="border-slate-700/50 hover:bg-slate-700/20"
                data-ocid={`fraud.maker.row.${i + 1}`}
              >
                <TableCell className="text-slate-200 font-medium">
                  {m.name}
                </TableCell>
                <TableCell className="text-slate-400">{m.city}</TableCell>
                <TableCell>
                  <FrsBadge score={m.frs} />
                </TableCell>
                <TableCell>
                  <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                    {m.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${m.payoutStatus === "Frozen" ? "bg-red-900/60 text-red-300" : "bg-emerald-900/60 text-emerald-300"}`}
                  >
                    {m.payoutStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full w-16">
                      <div
                        className={`h-full rounded-full ${m.ratingIntegrity >= 70 ? "bg-emerald-500" : m.ratingIntegrity >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${m.ratingIntegrity}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {m.ratingIntegrity}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs border-yellow-700 text-yellow-300 hover:bg-yellow-900/30"
                      data-ocid={`fraud.maker.edit_button.${i + 1}`}
                    >
                      Review
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs border-red-700 text-red-300 hover:bg-red-900/30"
                      data-ocid={`fraud.maker.delete_button.${i + 1}`}
                    >
                      Suspend
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Tab 4: Device & Network Intelligence ────────────────────────────────────

const ipClusters = [
  {
    range: "103.21.x.x",
    accounts: 14,
    type: "Referral Ring",
    risk: "Critical" as Severity,
  },
  {
    range: "49.34.x.x",
    accounts: 8,
    type: "Coin Farming",
    risk: "High" as Severity,
  },
  {
    range: "182.74.x.x",
    accounts: 6,
    type: "Fake Order Ring",
    risk: "High" as Severity,
  },
  {
    range: "157.48.x.x",
    accounts: 4,
    type: "Velocity Abuse",
    risk: "Medium" as Severity,
  },
  {
    range: "27.109.x.x",
    accounts: 3,
    type: "Ghost Accounts",
    risk: "Low" as Severity,
  },
];

const deviceClusters = [
  {
    fingerprint: "FP-A3X9",
    accounts: 9,
    suspicion: "Referral ring — all from same Chrome build",
  },
  {
    fingerprint: "FP-B7K2",
    accounts: 6,
    suspicion: "Coin farming — review timing pattern",
  },
  {
    fingerprint: "FP-C1M4",
    accounts: 4,
    suspicion: "Fake order ring — maker cluster",
  },
  {
    fingerprint: "FP-D5Q8",
    accounts: 3,
    suspicion: "Ghost accounts — created same hour",
  },
];

const suspiciousIPs = [
  { ip: "45.142.212.x", type: "VPN", country: "Netherlands", blocked: true },
  { ip: "185.220.101.x", type: "Tor Exit", country: "Germany", blocked: true },
  { ip: "103.88.45.x", type: "Proxy", country: "Singapore", blocked: false },
  { ip: "91.108.56.x", type: "VPN", country: "Russia", blocked: true },
  { ip: "104.21.33.x", type: "Proxy", country: "USA", blocked: false },
  { ip: "198.54.117.x", type: "VPN", country: "Canada", blocked: false },
  { ip: "176.10.104.x", type: "Tor Exit", country: "Austria", blocked: true },
  { ip: "45.33.32.x", type: "Proxy", country: "Japan", blocked: false },
];

const geoAnomalies = [
  {
    account: "Rahul M.",
    registered: "Patna, Bihar",
    accessedFrom: "Moscow, Russia",
    flagTime: "2h ago",
  },
  {
    account: "Account #4455",
    registered: "Delhi",
    accessedFrom: "London, UK",
    flagTime: "6h ago",
  },
  {
    account: "Vikram N.",
    registered: "Lucknow, UP",
    accessedFrom: "Berlin, Germany",
    flagTime: "1d ago",
  },
];

function DeviceNetworkTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IP Clusters */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-400" /> IP Clusters
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">IP Range</TableHead>
                <TableHead className="text-slate-400">Accounts</TableHead>
                <TableHead className="text-slate-400">Type</TableHead>
                <TableHead className="text-slate-400">Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipClusters.map((c, i) => (
                <TableRow
                  key={c.range}
                  className="border-slate-700/50 hover:bg-slate-700/20"
                  data-ocid={`fraud.ip.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-slate-300 text-sm">
                    {c.range}
                  </TableCell>
                  <TableCell className="text-slate-300">{c.accounts}</TableCell>
                  <TableCell className="text-slate-400 text-xs">
                    {c.type}
                  </TableCell>
                  <TableCell>
                    <SeverityBadge level={c.risk} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Device Fingerprints */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-400" /> Device
              Fingerprint Clusters
            </h3>
          </div>
          <div className="divide-y divide-slate-700/50">
            {deviceClusters.map((d, i) => (
              <div
                key={d.fingerprint}
                className="px-5 py-3"
                data-ocid={`fraud.device.row.${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-purple-300 text-sm">
                    {d.fingerprint}
                  </span>
                  <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                    {d.accounts} accounts
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{d.suspicion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suspicious IPs */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4 text-red-400" /> Suspicious IPs
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">IP</TableHead>
                <TableHead className="text-slate-400">Type</TableHead>
                <TableHead className="text-slate-400">Country</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suspiciousIPs.map((ip, i) => (
                <TableRow
                  key={ip.ip}
                  className="border-slate-700/50 hover:bg-slate-700/20"
                  data-ocid={`fraud.suspicious-ip.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-slate-300 text-xs">
                    {ip.ip}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${ip.type === "Tor Exit" ? "bg-red-900/60 text-red-300" : ip.type === "VPN" ? "bg-orange-900/60 text-orange-300" : "bg-yellow-900/60 text-yellow-300"}`}
                    >
                      {ip.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {ip.country}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold ${ip.blocked ? "text-red-400" : "text-slate-400"}`}
                    >
                      {ip.blocked ? "🚫 Blocked" : "Monitoring"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Geographic Anomalies */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4 text-yellow-400" /> Geographic Anomalies
            </h3>
          </div>
          <div className="divide-y divide-slate-700/50">
            {geoAnomalies.map((g, i) => (
              <div
                key={g.account}
                className="px-5 py-4"
                data-ocid={`fraud.geo.row.${i + 1}`}
              >
                <div className="font-medium text-slate-200 mb-1">
                  {g.account}
                </div>
                <div className="text-xs text-slate-400">
                  Registered:{" "}
                  <span className="text-emerald-400">{g.registered}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Accessed from:{" "}
                  <span className="text-red-400">{g.accessedFrom}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{g.flagTime}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 5: Ring Detection ────────────────────────────────────────────────────

const rings = [
  {
    id: "RING-001",
    type: "Referral Ring",
    accounts: 9,
    valueAtRisk: "₹18,400",
    status: "Active",
  },
  {
    id: "RING-002",
    type: "Fake Order Ring",
    accounts: 6,
    valueAtRisk: "₹12,800",
    status: "Under Review",
  },
  {
    id: "RING-003",
    type: "Coin Farm Ring",
    accounts: 3,
    valueAtRisk: "₹4,200",
    status: "Resolved",
  },
];

function RingGraph() {
  // Ring 1: Referral Ring (root + 8 dormant leaves)
  const cx = 160;
  const cy = 100;
  const radius = 70;
  const leaves = 8;
  const leafAngles = Array.from(
    { length: leaves },
    (_, i) => (i * 2 * Math.PI) / leaves,
  );

  // Ring 2: Fake Order Ring (maker + 5 customers)
  const mx = 420;
  const my = 100;
  const mkLeaves = 5;
  const mkAngles = Array.from(
    { length: mkLeaves },
    (_, i) => (i * 2 * Math.PI) / mkLeaves,
  );

  // Ring 3: Coin Farm (3 nodes in triangle)
  const triNodes = [
    { x: 620, y: 60 },
    { x: 580, y: 140 },
    { x: 660, y: 140 },
  ];

  return (
    <svg
      viewBox="0 0 760 200"
      className="w-full h-48 bg-slate-900/60 rounded-xl border border-slate-700/50"
      data-ocid="fraud.canvas_target"
      role="img"
      aria-label="Fraud ring detection graph showing referral, fake order, and coin farm rings"
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" opacity="0.7" />
        </marker>
      </defs>

      {/* Ring 1 Labels */}
      <text x={cx} y={20} textAnchor="middle" fill="#94a3b8" fontSize="10">
        Ring 1 — Referral
      </text>
      {leafAngles.map((angle, i) => {
        const lx = cx + radius * Math.cos(angle);
        const ly = cy + radius * Math.sin(angle);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: SVG angles have no stable id
          <g key={`ring1-${i}`}>
            <line
              x1={cx}
              y1={cy}
              x2={lx}
              y2={ly}
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4,3"
              opacity="0.6"
            />
            <circle
              cx={lx}
              cy={ly}
              r={8}
              fill="#1e3a5f"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
          </g>
        );
      })}
      <circle
        cx={cx}
        cy={cy}
        r={14}
        fill="#7c2d12"
        stroke="#f97316"
        strokeWidth="2"
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill="#fed7aa"
        fontSize="8"
        fontWeight="bold"
      >
        ROOT
      </text>

      {/* Ring 2 Labels */}
      <text x={mx} y={20} textAnchor="middle" fill="#94a3b8" fontSize="10">
        Ring 2 — Fake Orders
      </text>
      {mkAngles.map((angle, i) => {
        const lx = mx + 55 * Math.cos(angle);
        const ly = my + 55 * Math.sin(angle);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: SVG angles have no stable id
          <g key={`ring2-${i}`}>
            <line
              x1={mx}
              y1={my}
              x2={lx}
              y2={ly}
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4,3"
              opacity="0.6"
            />
            <circle
              cx={lx}
              cy={ly}
              r={8}
              fill="#1e3a5f"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            <text
              x={lx}
              y={ly + 4}
              textAnchor="middle"
              fill="#93c5fd"
              fontSize="6"
            >
              C{i + 1}
            </text>
          </g>
        );
      })}
      <circle
        cx={mx}
        cy={my}
        r={14}
        fill="#431407"
        stroke="#f97316"
        strokeWidth="2"
      />
      <text
        x={mx}
        y={my + 4}
        textAnchor="middle"
        fill="#fed7aa"
        fontSize="7"
        fontWeight="bold"
      >
        MAKER
      </text>

      {/* Ring 3 */}
      <text x={620} y={20} textAnchor="middle" fill="#94a3b8" fontSize="10">
        Ring 3 — Coin Farm
      </text>
      {triNodes.map((n, i) => (
        <g key={`trinode-${n.x}-${n.y}`}>
          {triNodes
            .filter((_, j) => j !== i)
            .map((other) => (
              <line
                key={`edge-${n.x}-${other.x}-${other.y}`}
                x1={n.x}
                y1={n.y}
                x2={other.x}
                y2={other.y}
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity="0.5"
              />
            ))}
          <circle
            cx={n.x}
            cy={n.y}
            r={10}
            fill="#312e81"
            stroke="#818cf8"
            strokeWidth="1.5"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill="#c7d2fe"
            fontSize="7"
          >
            A{i + 1}
          </text>
        </g>
      ))}

      {/* Legend */}
      <g transform="translate(20,175)">
        <circle
          cx={6}
          cy={6}
          r={5}
          fill="#7c2d12"
          stroke="#f97316"
          strokeWidth="1.5"
        />
        <text x={15} y={10} fill="#94a3b8" fontSize="8">
          Root/Maker Node
        </text>
        <circle
          cx={90}
          cy={6}
          r={5}
          fill="#1e3a5f"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x={99} y={10} fill="#94a3b8" fontSize="8">
          Customer Node
        </text>
        <line
          x1={170}
          y1={6}
          x2={190}
          y2={6}
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />
        <text x={195} y={10} fill="#94a3b8" fontSize="8">
          Suspicious Link
        </text>
      </g>
    </svg>
  );
}

function RingDetectionTab() {
  return (
    <div className="space-y-6">
      <RingGraph />

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h3 className="text-white font-semibold">Detected Rings Summary</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400">Ring ID</TableHead>
              <TableHead className="text-slate-400">Type</TableHead>
              <TableHead className="text-slate-400">Accounts</TableHead>
              <TableHead className="text-slate-400">Value at Risk</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rings.map((r, i) => (
              <TableRow
                key={r.id}
                className="border-slate-700/50 hover:bg-slate-700/20"
                data-ocid={`fraud.ring.row.${i + 1}`}
              >
                <TableCell className="font-mono text-orange-300 text-sm">
                  {r.id}
                </TableCell>
                <TableCell className="text-slate-300">{r.type}</TableCell>
                <TableCell className="font-mono text-slate-300">
                  {r.accounts}
                </TableCell>
                <TableCell className="font-mono text-red-300">
                  {r.valueAtRisk}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      r.status === "Active"
                        ? "bg-red-900/60 text-red-300"
                        : r.status === "Under Review"
                          ? "bg-yellow-900/60 text-yellow-300"
                          : "bg-emerald-900/60 text-emerald-300"
                    }`}
                  >
                    {r.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-xs border-slate-600 text-slate-300"
                    data-ocid={`fraud.ring.edit_button.${i + 1}`}
                  >
                    Investigate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Coin Flow Map */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">
          Asharfi Coin Flow — Ring 1
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            "Platform Issues 50 coins",
            "→ Root Account (earns ref bonus)",
            "→ 8 Dormant Accounts (each ordered once)",
            "→ Coins redeemed on Root Account",
          ].map((step, i) => (
            <div
              key={step}
              className={`px-3 py-2 rounded-lg text-xs font-medium ${
                i === 0
                  ? "bg-blue-900/60 text-blue-300 border border-blue-700"
                  : i === 3
                    ? "bg-red-900/60 text-red-300 border border-red-700"
                    : "bg-slate-700/60 text-slate-300 border border-slate-600"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 6: Alert Feed ────────────────────────────────────────────────────────

type AlertStatus = "New" | "Under Review" | "Resolved" | "Escalated";

const alertFeed: {
  id: string;
  time: string;
  type: string;
  entity: string;
  severity: Severity;
  status: AlertStatus;
  pastSLA: boolean;
  detail: string;
}[] = [
  {
    id: "ALT-091",
    time: "2 min ago",
    type: "Credential Stuffing",
    entity: "IP 103.21.44.x",
    severity: "Critical",
    status: "New",
    pastSLA: false,
    detail:
      "52 failed login attempts from one IP in under 8 minutes. Possibly a botnet.",
  },
  {
    id: "ALT-090",
    time: "18 min ago",
    type: "Refund Farming",
    entity: "Rahul M.",
    severity: "High",
    status: "Under Review",
    pastSLA: false,
    detail: "3rd refund request in 7 days. Refund-to-order ratio: 75%.",
  },
  {
    id: "ALT-089",
    time: "1h ago",
    type: "Ring Detected",
    entity: "RING-001",
    severity: "Critical",
    status: "New",
    pastSLA: false,
    detail:
      "Referral ring of 9 accounts detected. All leaf accounts ordered once.",
  },
  {
    id: "ALT-088",
    time: "2h ago",
    type: "Rating Manipulation",
    entity: "Kamla Yadav",
    severity: "High",
    status: "Under Review",
    pastSLA: false,
    detail:
      "12 five-star reviews in 4 hours from new accounts with same device fingerprint.",
  },
  {
    id: "ALT-087",
    time: "3h ago",
    type: "Geographic Anomaly",
    entity: "Account #4455",
    severity: "Medium",
    status: "New",
    pastSLA: false,
    detail:
      "Account registered in Delhi accessed from London 3h after last Delhi activity.",
  },
  {
    id: "ALT-086",
    time: "5h ago",
    type: "Velocity Abuse",
    entity: "Amit K.",
    severity: "Medium",
    status: "New",
    pastSLA: false,
    detail: "7 orders placed in 45 minutes from same session.",
  },
  {
    id: "ALT-085",
    time: "7h ago",
    type: "Payout Destination Cycling",
    entity: "Rekha Sharma",
    severity: "High",
    status: "Under Review",
    pastSLA: false,
    detail: "Third bank account change in 30 days. Payout of ₹8,200 pending.",
  },
  {
    id: "ALT-084",
    time: "9h ago",
    type: "Coin Farm",
    entity: "FP-B7K2 cluster",
    severity: "High",
    status: "Under Review",
    pastSLA: false,
    detail:
      "6 accounts sharing fingerprint all wrote reviews within 20 min of order delivery.",
  },
  {
    id: "ALT-083",
    time: "11h ago",
    type: "OTP Bombing",
    entity: "Phone 98****4433",
    severity: "Medium",
    status: "Escalated",
    pastSLA: false,
    detail: "14 OTP requests in 10 minutes. Possible account takeover attempt.",
  },
  {
    id: "ALT-082",
    time: "14h ago",
    type: "Commission Holiday Abuse",
    entity: "Anonymous M.",
    severity: "High",
    status: "Under Review",
    pastSLA: false,
    detail:
      "Second maker account created using same FSSAI number as first account.",
  },
  {
    id: "ALT-081",
    time: "16h ago",
    type: "Ghost Account",
    entity: "Account #7741",
    severity: "Medium",
    status: "New",
    pastSLA: true,
    detail:
      "Account created and first order placed within 4 minutes. No profile completion.",
  },
  {
    id: "ALT-080",
    time: "20h ago",
    type: "Wallet Drain",
    entity: "Account #3821",
    severity: "Critical",
    status: "Escalated",
    pastSLA: true,
    detail:
      "Rapid coin top-up followed by full redemption attempt across 3 orders in 10 min.",
  },
  {
    id: "ALT-079",
    time: "22h ago",
    type: "Refund Farming",
    entity: "Vikram N.",
    severity: "High",
    status: "New",
    pastSLA: true,
    detail: "5th refund request. Amount: ₹620.",
  },
  {
    id: "ALT-078",
    time: "1d ago",
    type: "Bot Registration",
    entity: "IP 49.34.x.x",
    severity: "Critical",
    status: "Resolved",
    pastSLA: false,
    detail:
      "18 accounts created from same IP range in under 2 hours. Honeypot field triggered.",
  },
  {
    id: "ALT-077",
    time: "1d ago",
    type: "Admin Panel Probe",
    entity: "IP 182.74.x.x",
    severity: "High",
    status: "Resolved",
    pastSLA: false,
    detail: "22 401/403 errors against protected admin routes in 5 minutes.",
  },
];

function AlertFeedTab() {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = alertFeed.filter((a) => {
    if (filterSeverity !== "all" && a.severity.toLowerCase() !== filterSeverity)
      return false;
    if (
      filterStatus !== "all" &&
      a.status.toLowerCase().replace(/ /g, "-") !== filterStatus
    )
      return false;
    return true;
  });

  const statusColor: Record<AlertStatus, string> = {
    New: "bg-blue-900/60 text-blue-300 border-blue-700",
    "Under Review": "bg-yellow-900/60 text-yellow-300 border-yellow-700",
    Resolved: "bg-emerald-900/60 text-emerald-300 border-emerald-700",
    Escalated: "bg-red-900/60 text-red-300 border-red-700",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger
            className="w-36 bg-slate-800 border-slate-600 text-slate-200"
            data-ocid="fraud.alert.severity.select"
          >
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger
            className="w-40 bg-slate-800 border-slate-600 text-slate-200"
            data-ocid="fraud.alert.status.select"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`bg-slate-800/50 border rounded-lg overflow-hidden ${
              alert.pastSLA ? "border-red-800/60" : "border-slate-700/50"
            }`}
            data-ocid={`fraud.alert.row.${i + 1}`}
          >
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-700/20 text-left"
              onClick={() =>
                setExpanded(expanded === alert.id ? null : alert.id)
              }
            >
              {alert.pastSLA && (
                <span
                  className="w-1.5 h-6 bg-red-500 rounded-full flex-shrink-0"
                  title="Past SLA"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-slate-500">
                    {alert.id}
                  </span>
                  <span className="text-slate-200 text-sm font-medium">
                    {alert.type}
                  </span>
                  <SeverityBadge level={alert.severity} />
                  <span
                    className={`text-xs px-2 py-0.5 rounded border ${statusColor[alert.status]}`}
                  >
                    {alert.status}
                  </span>
                  {alert.pastSLA && (
                    <span className="text-xs text-red-400 font-semibold">
                      ⚠ Past SLA
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  {alert.entity} · {alert.time}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${expanded === alert.id ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {expanded === alert.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-700/50 bg-slate-900/40 px-4 py-3"
                >
                  <p className="text-slate-300 text-sm mb-3">{alert.detail}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-yellow-700 hover:bg-yellow-600"
                      data-ocid={`fraud.alert.warn.${i + 1}`}
                    >
                      Warn
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-red-700 hover:bg-red-600"
                      data-ocid={`fraud.alert.delete_button.${i + 1}`}
                    >
                      Suspend
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-slate-600 text-slate-300"
                      data-ocid={`fraud.alert.secondary_button.${i + 1}`}
                    >
                      Escalate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-emerald-700 text-emerald-300"
                      data-ocid={`fraud.alert.confirm_button.${i + 1}`}
                    >
                      Clear
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 7: Configuration ─────────────────────────────────────────────────────

const auditLog = [
  {
    admin: "admin@choudhary",
    time: "2h ago",
    change: "Velocity threshold: orders/hr changed from 5 to 4",
  },
  {
    admin: "admin@choudhary",
    time: "5h ago",
    change: "FRS weight: Refund Rate increased from 20% to 25%",
  },
  {
    admin: "admin@choudhary",
    time: "1d ago",
    change: "Auto-action: FRS>85 changed from 'Flag' to 'Suspend'",
  },
  {
    admin: "admin@choudhary",
    time: "2d ago",
    change: "Whitelist: Added test account #TEST-003",
  },
  {
    admin: "admin@choudhary",
    time: "3d ago",
    change: "Velocity threshold: OTP requests/min changed from 5 to 3",
  },
];

const whitelist = [
  {
    id: "TEST-001",
    name: "Internal Test Account A",
    addedBy: "admin@choudhary",
  },
  { id: "TEST-002", name: "QA Testing Account B", addedBy: "admin@choudhary" },
  { id: "TEST-003", name: "Dev Testing Account C", addedBy: "admin@choudhary" },
];

function ConfigTab() {
  const [weights, setWeights] = useState({
    velocity: 20,
    refundRate: 25,
    deviceDiversity: 15,
    reviewTiming: 15,
    addressDiversity: 10,
    referralQuality: 10,
    paymentPattern: 5,
  });

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  const autoActions = [
    { frs: "60–79", action: "Flag (silent monitor)", editable: false },
    { frs: "80–84", action: "Block new orders", editable: false },
    { frs: "85–89", action: "Suspend account", editable: false },
    { frs: "90–100", action: "Ban + freeze wallet", editable: false },
  ];

  return (
    <div className="space-y-6">
      {/* FRS Weights */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">FRS Signal Weights</h3>
          <span
            className={`text-sm font-mono font-bold px-3 py-1 rounded ${total === 100 ? "bg-emerald-900/60 text-emerald-300" : "bg-red-900/60 text-red-300"}`}
          >
            Total: {total}% {total !== 100 ? "⚠ Must = 100%" : "✓"}
          </span>
        </div>
        <div className="space-y-4">
          {(Object.entries(weights) as [keyof typeof weights, number][]).map(
            ([key, val]) => {
              const labels: Record<keyof typeof weights, string> = {
                velocity: "Velocity Abuse",
                refundRate: "Refund Rate",
                deviceDiversity: "Device Diversity",
                reviewTiming: "Review Timing",
                addressDiversity: "Address Diversity",
                referralQuality: "Referral Quality",
                paymentPattern: "Payment Pattern",
              };
              return (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <span className="text-slate-300 text-sm">{labels[key]}</span>
                  <Slider
                    value={[val]}
                    min={0}
                    max={40}
                    step={1}
                    onValueChange={([v]) =>
                      setWeights((prev) => ({ ...prev, [key]: v }))
                    }
                    className="col-span-1"
                    data-ocid={`fraud.weight.${key}.toggle`}
                  />
                  <span className="text-right font-mono text-slate-300 text-sm">
                    {val}%
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Velocity Thresholds */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Velocity Thresholds</h3>
          <div className="space-y-3">
            {[
              { label: "Orders per hour", val: "4" },
              { label: "Login attempts (10 min)", val: "5" },
              { label: "OTP requests (10 min)", val: "3" },
              { label: "Refunds per month", val: "2" },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">{t.label}</span>
                <Input
                  defaultValue={t.val}
                  className="w-20 h-8 text-center bg-slate-700 border-slate-600 text-white text-sm"
                  data-ocid="fraud.threshold.input"
                />
              </div>
            ))}
          </div>
          <Button
            className="mt-4 bg-slate-700 hover:bg-slate-600 text-sm"
            data-ocid="fraud.threshold.save_button"
          >
            Save Thresholds
          </Button>
        </div>

        {/* Auto-Action Rules */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h3 className="text-white font-semibold">Auto-Action Rules</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">FRS Range</TableHead>
                <TableHead className="text-slate-400">Auto Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {autoActions.map((a, i) => (
                <TableRow
                  key={a.frs}
                  className="border-slate-700/50"
                  data-ocid={`fraud.autaction.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-slate-300">
                    {a.frs}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {a.action}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Whitelist */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Whitelisted Accounts</h3>
          <Button
            size="sm"
            className="bg-slate-700 hover:bg-slate-600 text-xs"
            data-ocid="fraud.whitelist.primary_button"
          >
            + Add Account
          </Button>
        </div>
        <div className="space-y-2">
          {whitelist.map((w, i) => (
            <div
              key={w.id}
              className="flex items-center justify-between bg-slate-900/40 px-4 py-2.5 rounded-lg"
              data-ocid={`fraud.whitelist.row.${i + 1}`}
            >
              <div>
                <div className="text-slate-200 text-sm font-medium">
                  {w.name}
                </div>
                <div className="text-slate-500 text-xs">
                  ID: {w.id} · Added by {w.addedBy}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-red-700 text-red-300 hover:bg-red-900/30"
                data-ocid={`fraud.whitelist.delete_button.${i + 1}`}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h3 className="text-white font-semibold">Configuration Audit Log</h3>
        </div>
        <div className="divide-y divide-slate-700/50">
          {auditLog.map((entry, i) => (
            <div
              key={entry.time}
              className="px-5 py-3 flex items-start gap-3"
              data-ocid={`fraud.audit.row.${i + 1}`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-slate-300 text-sm">{entry.change}</div>
                <div className="text-slate-500 text-xs mt-0.5">
                  {entry.admin} · {entry.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FraudIntelligencePage() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <main className="min-h-screen bg-[#080b12] pt-16" data-ocid="fraud.page">
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-slate-900/80 backdrop-blur sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-950/70 border border-red-800/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">
                Fraud Intelligence
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                AI-powered fraud detection & prevention
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/50 text-red-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              3 Critical Alerts
            </span>
            <Badge
              variant="outline"
              className="border-slate-600 text-slate-400 text-xs"
            >
              Live
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900/60 border border-slate-700/50 p-1 flex flex-wrap h-auto gap-1">
            {[
              { value: "overview", label: "Platform Overview", icon: Activity },
              { value: "customers", label: "Customer Risk", icon: Users },
              { value: "makers", label: "Maker Risk", icon: AlertTriangle },
              { value: "network", label: "Device & Network", icon: Wifi },
              { value: "rings", label: "Ring Detection", icon: Network },
              { value: "alerts", label: "Alert Feed", icon: AlertCircle },
              { value: "config", label: "Configuration", icon: Settings },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 flex items-center gap-1.5 px-3 py-2"
                data-ocid={`fraud.${tab.value}.tab`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="customers">
            <CustomerRiskTab />
          </TabsContent>
          <TabsContent value="makers">
            <MakerRiskTab />
          </TabsContent>
          <TabsContent value="network">
            <DeviceNetworkTab />
          </TabsContent>
          <TabsContent value="rings">
            <RingDetectionTab />
          </TabsContent>
          <TabsContent value="alerts">
            <AlertFeedTab />
          </TabsContent>
          <TabsContent value="config">
            <ConfigTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
