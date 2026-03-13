import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  BarChart3,
  Building2,
  Calendar,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  IndianRupee,
  Lock,
  Package,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormatType = "CSV" | "PDF" | "Excel";

interface ReportRow {
  name: string;
  category: string;
  generatedOn: string;
  format: FormatType;
  generatedBy: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CORRECT_PASSWORD = "amar2026";

const REPORT_CATEGORIES = [
  {
    id: "financial",
    label: "Financial",
    icon: IndianRupee,
    count: 6,
    color: "text-emerald-600",
  },
  {
    id: "operations",
    label: "Operations",
    icon: Package,
    count: 6,
    color: "text-blue-600",
  },
  {
    id: "maker",
    label: "Aunty / Maker",
    icon: Users,
    count: 6,
    color: "text-purple-600",
  },
  {
    id: "customer",
    label: "Customer",
    icon: Building2,
    count: 6,
    color: "text-rose-600",
  },
  {
    id: "marketing",
    label: "Marketing & Intelligence",
    icon: TrendingUp,
    count: 6,
    color: "text-orange-600",
  },
  {
    id: "custom",
    label: "Custom Builder",
    icon: Zap,
    count: 0,
    color: "text-amber-600",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: FileText,
    count: 2,
    color: "text-slate-600",
  },
  {
    id: "scheduled",
    label: "Scheduled",
    icon: Clock,
    count: 2,
    color: "text-cyan-600",
  },
];

const FINANCIAL_REPORTS = [
  {
    name: "Monthly P&L Summary",
    desc: "Revenue, commissions, expenses, net margin",
  },
  {
    name: "Commission Earned by Category",
    desc: "Achar 15%, Sweets 20%, Premium 25% breakdown",
  },
  { name: "GST Filing Report", desc: "GSTIN, HSN codes, tax breakup for CA" },
  {
    name: "TDS Deduction Report",
    desc: "Section 194C compliance, per-aunty TDS",
  },
  {
    name: "Razorpay Payment Reconciliation",
    desc: "Order ID ↔ payment ID ↔ settlement",
  },
  {
    name: "Payout Settlement Statement",
    desc: "Bimonthly payout details per aunty",
  },
];

const OPERATIONS_REPORTS = [
  {
    name: "Order Fulfillment Report",
    desc: "All orders, status, fulfillment time",
  },
  {
    name: "Batch Performance Report",
    desc: "Batch fill rates, merges, rejections",
  },
  {
    name: "Logistics SLA Compliance Report",
    desc: "On-time vs SLA-breach shipments",
  },
  {
    name: "Delivery Success Rate by State",
    desc: "State-wise delivery success/failure",
  },
  { name: "Return & Refund Report", desc: "Returns, reasons, refund amounts" },
  {
    name: "Pincode Coverage Report",
    desc: "Serviceable vs non-serviceable pincodes",
  },
];

const MAKER_REPORTS = [
  {
    name: "Aunty Earnings Statement",
    desc: "Gross → Commission → TDS → Net per aunty",
  },
  {
    name: "Top Performing Aunties",
    desc: "Ranked by GMV, rating, repeat orders",
  },
  {
    name: "Aunty Onboarding Funnel Report",
    desc: "Applied → Approved → First order",
  },
  {
    name: "FSSAI Compliance Status Report",
    desc: "Verified, pending, expired aunties",
  },
  {
    name: "Aunty Churn Risk Report",
    desc: "At-risk aunties with inactivity signals",
  },
  {
    name: "Commission Holiday Tracker",
    desc: "New aunties in 90-day holiday window",
  },
];

const CUSTOMER_REPORTS = [
  {
    name: "Customer Cohort Retention Report",
    desc: "Day 7/30/60/90 retention curves",
  },
  {
    name: "Asharfi Coin Liability Report",
    desc: "Outstanding coins, rupee equivalent",
  },
  { name: "Wallet Balance Summary", desc: "Customer wallet balances, top-ups" },
  {
    name: "NPS Score Report",
    desc: "Promoters, passives, detractors breakdown",
  },
  { name: "Top Customers by LTV", desc: "Predicted 12-month value by segment" },
  {
    name: "Referral Attribution Report",
    desc: "Who referred whom, coin earned",
  },
];

const MARKETING_REPORTS = [
  {
    name: "Channel Performance Report",
    desc: "WhatsApp / Instagram / Referral / Ads",
  },
  {
    name: "Campaign ROI Report",
    desc: "Spend, reach, orders, ROAS per campaign",
  },
  { name: "AOV Trend Report", desc: "AOV by category, state, season" },
  {
    name: "Ads Impression & Conversion Report",
    desc: "CPM, CTR, conversion per ad",
  },
  {
    name: "Brand Health Score Report",
    desc: "Sentiment, mentions, share of voice",
  },
  { name: "GMV Forecast Report", desc: "Predictive GMV for next 30/60 days" },
];

const DOWNLOAD_HISTORY: ReportRow[] = [
  {
    name: "Monthly P&L Summary - Feb 2026",
    category: "Financial",
    generatedOn: "Mar 01, 2026",
    format: "PDF",
    generatedBy: "Admin",
  },
  {
    name: "Aunty Earnings Statement - Jan 2026",
    category: "Maker",
    generatedOn: "Feb 28, 2026",
    format: "Excel",
    generatedBy: "Admin",
  },
  {
    name: "GST Filing Report Q3 FY26",
    category: "Financial",
    generatedOn: "Feb 20, 2026",
    format: "CSV",
    generatedBy: "Admin",
  },
  {
    name: "Customer Cohort Retention - Jan 2026",
    category: "Customer",
    generatedOn: "Feb 15, 2026",
    format: "PDF",
    generatedBy: "Admin",
  },
  {
    name: "Channel Performance Report - Jan 2026",
    category: "Marketing",
    generatedOn: "Feb 10, 2026",
    format: "CSV",
    generatedBy: "Admin",
  },
  {
    name: "Order Fulfillment Report - Jan 2026",
    category: "Operations",
    generatedOn: "Feb 08, 2026",
    format: "Excel",
    generatedBy: "Admin",
  },
  {
    name: "TDS Deduction Report - Jan 2026",
    category: "Financial",
    generatedOn: "Feb 05, 2026",
    format: "PDF",
    generatedBy: "Admin",
  },
  {
    name: "Top Performing Aunties - Jan 2026",
    category: "Maker",
    generatedOn: "Feb 03, 2026",
    format: "CSV",
    generatedBy: "Admin",
  },
  {
    name: "NPS Score Report - Jan 2026",
    category: "Customer",
    generatedOn: "Feb 01, 2026",
    format: "PDF",
    generatedBy: "Admin",
  },
  {
    name: "Logistics SLA Compliance - Jan 2026",
    category: "Operations",
    generatedOn: "Jan 31, 2026",
    format: "Excel",
    generatedBy: "Admin",
  },
];

const AVAILABLE_MODULES = [
  "Financial",
  "Operations",
  "Aunty / Maker",
  "Customer",
  "Marketing",
  "Intelligence",
  "Compliance",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormatToggle({
  value,
  onChange,
}: {
  value: FormatType;
  onChange: (v: FormatType) => void;
}) {
  const formats: FormatType[] = ["CSV", "PDF", "Excel"];
  return (
    <div className="inline-flex rounded-md border border-border overflow-hidden">
      {formats.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className={`px-3 py-1 text-xs font-medium transition-colors ${
            value === f
              ? "bg-amber-500 text-white"
              : "bg-background text-muted-foreground hover:bg-muted"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function ReportListItem({
  report,
  index,
  scope,
}: {
  report: { name: string; desc: string };
  index: number;
  scope: string;
}) {
  const [fmt, setFmt] = useState<FormatType>("PDF");

  function handleDownload() {
    const blob = new Blob(
      [
        `Choudhary Aunty Platform\n${report.name}\nGenerated: ${new Date().toLocaleDateString("en-IN")}\n\nThis is a simulated export.`,
      ],
      { type: fmt === "CSV" ? "text/csv" : "application/pdf" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, "_")}.${fmt.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`"${report.name}" downloaded as ${fmt}`);
  }

  return (
    <div
      data-ocid={`${scope}.item.${index}`}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm">{report.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{report.desc}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <FormatToggle value={fmt} onChange={setFmt} />
        <Button
          size="sm"
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleDownload}
          data-ocid={`${scope}.download_button.${index}`}
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
}

function ReportSection({
  title,
  reports,
  scope,
}: {
  title: string;
  reports: { name: string; desc: string }[];
  scope: string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider text-amber-700">
        {title}
      </h3>
      <div className="space-y-2">
        {reports.map((r, i) => (
          <ReportListItem key={r.name} report={r} index={i + 1} scope={scope} />
        ))}
      </div>
    </div>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="w-full max-w-sm px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Lock className="h-7 w-7 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground text-center">
              Reports Hub
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Enter your access password to continue
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="reports-password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="reports-password"
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                className={`mt-1 ${error ? "border-red-500" : ""}`}
                autoFocus
                data-ocid="reports.input"
              />
              {error && (
                <p
                  className="text-xs text-red-500 mt-1"
                  data-ocid="reports.error_state"
                >
                  Incorrect password. Please try again.
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              data-ocid="reports.submit_button"
            >
              Unlock Reports Hub
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReportsHubPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [customModules, setCustomModules] = useState<string[]>([]);
  const [customFormat, setCustomFormat] = useState<FormatType>("PDF");
  const [customReportName, setCustomReportName] = useState("");
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");
  const [historyCategory, setHistoryCategory] = useState("all");
  const [historyRows, setHistoryRows] = useState<ReportRow[]>(DOWNLOAD_HISTORY);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function toggleModule(mod: string) {
    setCustomModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod],
    );
  }

  function handleGenerateCustomReport(e: React.FormEvent) {
    e.preventDefault();
    const name = customReportName.trim() || `Custom Report - ${today}`;
    const newRow: ReportRow = {
      name,
      category: customModules[0] ?? "Custom",
      generatedOn: today,
      format: customFormat,
      generatedBy: "Admin",
    };
    setHistoryRows((prev) => [newRow, ...prev]);
    toast.success("Report generated! Download will start shortly.");

    const blob = new Blob(
      [
        `Choudhary Aunty Platform\n${name}\nGenerated: ${today}\nModules: ${customModules.join(", ")}\n\nThis is a simulated custom export.`,
      ],
      { type: customFormat === "CSV" ? "text/csv" : "application/pdf" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "_")}.${customFormat.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredHistory =
    historyCategory === "all"
      ? historyRows
      : historyRows.filter(
          (r) => r.category.toLowerCase() === historyCategory.toLowerCase(),
        );

  const formatBadgeColor = (fmt: FormatType) => {
    if (fmt === "CSV") return "bg-emerald-100 text-emerald-700";
    if (fmt === "PDF") return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/50 to-background pt-20 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileSpreadsheet className="h-6 w-6 text-amber-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                Internal Tool
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Reports Hub
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Download, schedule, and build cross-module reports for the
              platform.
            </p>
          </div>
          <Badge className="self-start sm:self-auto bg-amber-100 text-amber-800 border-amber-200">
            {today}
          </Badge>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Reports Available", value: "28", icon: FileText },
            { label: "Downloads This Month", value: "47", icon: Download },
            { label: "Scheduled Reports", value: "5", icon: Calendar },
            { label: "Last Generated", value: today, icon: Clock },
          ].map((stat) => (
            <Card key={stat.label} className="border-amber-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <stat.icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-foreground leading-tight truncate">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList
            className="flex flex-wrap h-auto gap-1 bg-amber-50 border border-amber-200 p-1 rounded-xl mb-6"
            data-ocid="reports.tab"
          >
            {[
              { value: "overview", label: "Overview" },
              { value: "financial", label: "Financial" },
              { value: "operations", label: "Operations" },
              { value: "maker", label: "Maker" },
              { value: "customer", label: "Customer" },
              { value: "marketing", label: "Marketing" },
              { value: "custom", label: "Custom Builder" },
              { value: "history", label: "Download History" },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg"
                data-ocid={`reports.${t.value}.tab`}
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Overview ── */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REPORT_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Card
                    key={cat.id}
                    className="border-amber-100 hover:shadow-md transition-shadow cursor-default"
                    data-ocid={`reports.${cat.id}.card`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                          <Icon className={`h-5 w-5 ${cat.color}`} />
                        </div>
                        {cat.count > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {cat.count} reports
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-base font-semibold mb-3">
                        {cat.label}
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
                        data-ocid={`reports.${cat.id}.secondary_button`}
                      >
                        View Reports
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick stats */}
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                  Platform Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Financial", count: 6 },
                    { label: "Operations", count: 6 },
                    { label: "Maker", count: 6 },
                    { label: "Customer", count: 6 },
                    { label: "Marketing", count: 6 },
                    { label: "Custom", count: "∞" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="text-center p-3 rounded-lg bg-amber-50"
                    >
                      <p className="text-2xl font-bold text-amber-700">
                        {item.count}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Financial ── */}
          <TabsContent value="financial">
            <ReportSection
              title="Financial Reports"
              reports={FINANCIAL_REPORTS}
              scope="financial"
            />
          </TabsContent>

          {/* ── Operations ── */}
          <TabsContent value="operations">
            <ReportSection
              title="Operations Reports"
              reports={OPERATIONS_REPORTS}
              scope="operations"
            />
          </TabsContent>

          {/* ── Maker ── */}
          <TabsContent value="maker">
            <div className="space-y-6">
              {/* Aunty + Month picker */}
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Aunty Earnings Statement — Picker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Select data-ocid="maker.aunty.select">
                      <SelectTrigger className="w-full sm:w-56">
                        <SelectValue placeholder="Select Aunty" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Meena Devi",
                          "Savita Kumari",
                          "Radha Singh",
                          "Geeta Yadav",
                          "Sunita Devi",
                          "Poonam Jha",
                        ].map((a) => (
                          <SelectItem key={a} value={a}>
                            {a}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select data-ocid="maker.month.select">
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Mar 2026",
                          "Feb 2026",
                          "Jan 2026",
                          "Dec 2025",
                          "Nov 2025",
                        ].map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                      data-ocid="maker.statement.primary_button"
                      onClick={() =>
                        toast.success("Statement generated! Download starting.")
                      }
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Generate Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <ReportSection
                title="Maker Reports"
                reports={MAKER_REPORTS}
                scope="maker"
              />
            </div>
          </TabsContent>

          {/* ── Customer ── */}
          <TabsContent value="customer">
            <ReportSection
              title="Customer Reports"
              reports={CUSTOMER_REPORTS}
              scope="customer"
            />
          </TabsContent>

          {/* ── Marketing ── */}
          <TabsContent value="marketing">
            <ReportSection
              title="Marketing & Intelligence Reports"
              reports={MARKETING_REPORTS}
              scope="marketing"
            />
          </TabsContent>

          {/* ── Custom Builder ── */}
          <TabsContent value="custom">
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-600" />
                  Custom Report Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleGenerateCustomReport}
                  className="space-y-6"
                >
                  {/* Report Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="custom-report-name">Report Name</Label>
                    <Input
                      id="custom-report-name"
                      placeholder="e.g. Bihar Q1 Sales Summary"
                      value={customReportName}
                      onChange={(e) => setCustomReportName(e.target.value)}
                      data-ocid="custom.report_name.input"
                    />
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="date-from">Date From</Label>
                      <Input
                        id="date-from"
                        type="date"
                        value={customDateFrom}
                        onChange={(e) => setCustomDateFrom(e.target.value)}
                        data-ocid="custom.date_from.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="date-to">Date To</Label>
                      <Input
                        id="date-to"
                        type="date"
                        value={customDateTo}
                        onChange={(e) => setCustomDateTo(e.target.value)}
                        data-ocid="custom.date_to.input"
                      />
                    </div>
                  </div>

                  {/* Module Selector */}
                  <div className="space-y-2">
                    <Label>Modules (select one or more)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {AVAILABLE_MODULES.map((mod, idx) => (
                        <div
                          key={mod}
                          className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer"
                        >
                          <Checkbox
                            id={`mod-${mod}`}
                            checked={customModules.includes(mod)}
                            onCheckedChange={() => toggleModule(mod)}
                            data-ocid={`custom.module.checkbox.${idx + 1}`}
                          />
                          <Label
                            htmlFor={`mod-${mod}`}
                            className="text-sm cursor-pointer"
                          >
                            {mod}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Format */}
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <div className="flex gap-3">
                      {(["CSV", "PDF", "Excel"] as FormatType[]).map((f) => (
                        <label
                          key={f}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="format"
                            value={f}
                            checked={customFormat === f}
                            onChange={() => setCustomFormat(f)}
                            className="accent-amber-500"
                          />
                          <span className="text-sm font-medium">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    data-ocid="custom.generate.primary_button"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Download History ── */}
          <TabsContent value="history">
            <Card className="border-amber-100">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    Download History
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={historyCategory}
                      onValueChange={setHistoryCategory}
                    >
                      <SelectTrigger
                        className="w-40"
                        data-ocid="history.category.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="maker">Maker</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table data-ocid="history.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Generated On
                        </TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Generated By
                        </TableHead>
                        <TableHead className="text-right">Download</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-muted-foreground"
                            data-ocid="history.empty_state"
                          >
                            No reports found for this category.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredHistory.map((row, idx) => (
                          <TableRow
                            key={`${row.name}-${idx}`}
                            data-ocid={`history.row.${idx + 1}`}
                          >
                            <TableCell className="font-medium text-sm max-w-[200px] truncate">
                              {row.name}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant="outline" className="text-xs">
                                {row.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                              {row.generatedOn}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${formatBadgeColor(row.format)}`}
                              >
                                {row.format}
                              </span>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                              {row.generatedBy}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                onClick={() => {
                                  toast.success(
                                    `"${row.name}" download initiated.`,
                                  );
                                }}
                                data-ocid={`history.download_button.${idx + 1}`}
                              >
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
