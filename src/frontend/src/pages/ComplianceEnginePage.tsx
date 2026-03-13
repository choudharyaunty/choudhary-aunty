import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  Download,
  Eye,
  FileText,
  Lock,
  Receipt,
  Search,
  Shield,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PASSWORD = "amar2026";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FSSAI_DATA = [
  {
    id: 1,
    name: "Anju Devi",
    fssaiNo: "21225000001234",
    type: "Basic",
    expiry: "2025-03-15",
    status: "expiring",
  },
  {
    id: 2,
    name: "Priya Sharma",
    fssaiNo: "21225000002345",
    type: "State",
    expiry: "2026-01-10",
    status: "active",
  },
  {
    id: 3,
    name: "Sunita Yadav",
    fssaiNo: "21225000003456",
    type: "Basic",
    expiry: "2024-12-05",
    status: "expired",
  },
  {
    id: 4,
    name: "Rekha Joshi",
    fssaiNo: "21225000004567",
    type: "Basic",
    expiry: "2025-02-20",
    status: "expiring",
  },
  {
    id: 5,
    name: "Meena Kumari",
    fssaiNo: "21225000005678",
    type: "State",
    expiry: "2025-09-30",
    status: "active",
  },
  {
    id: 6,
    name: "Kamla Devi",
    fssaiNo: "21225000006789",
    type: "Basic",
    expiry: "2025-08-14",
    status: "active",
  },
  {
    id: 7,
    name: "Savitri Singh",
    fssaiNo: "21225000007890",
    type: "Central",
    expiry: "2026-06-01",
    status: "active",
  },
  {
    id: 8,
    name: "Geeta Prasad",
    fssaiNo: "21225000008901",
    type: "Basic",
    expiry: "2024-11-10",
    status: "expired",
  },
];

const GST_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "2024-10-01",
    customer: "Rahul Mehta",
    aunty: "Anju Devi",
    value: 1200,
    gstRate: 5,
    invoiceNo: "INV-2024-001",
  },
  {
    id: "ORD-2024-002",
    date: "2024-10-03",
    customer: "Sneha Kapoor",
    aunty: "Priya Sharma",
    value: 850,
    gstRate: 5,
    invoiceNo: "INV-2024-002",
  },
  {
    id: "ORD-2024-003",
    date: "2024-10-05",
    customer: "Vikram Nair",
    aunty: "Meena Kumari",
    value: 2400,
    gstRate: 5,
    invoiceNo: "INV-2024-003",
  },
  {
    id: "ORD-2024-004",
    date: "2024-10-08",
    customer: "Pooja Iyer",
    aunty: "Anju Devi",
    value: 640,
    gstRate: 5,
    invoiceNo: "INV-2024-004",
  },
  {
    id: "ORD-2024-005",
    date: "2024-10-12",
    customer: "Arjun Gupta",
    aunty: "Kamla Devi",
    value: 1800,
    gstRate: 5,
    invoiceNo: "INV-2024-005",
  },
  {
    id: "ORD-2024-006",
    date: "2024-10-15",
    customer: "Divya Reddy",
    aunty: "Savitri Singh",
    value: 3200,
    gstRate: 5,
    invoiceNo: "INV-2024-006",
  },
  {
    id: "ORD-2024-007",
    date: "2024-10-18",
    customer: "Manish Tiwari",
    aunty: "Priya Sharma",
    value: 960,
    gstRate: 5,
    invoiceNo: "INV-2024-007",
  },
  {
    id: "ORD-2024-008",
    date: "2024-10-21",
    customer: "Kavita Joshi",
    aunty: "Rekha Joshi",
    value: 1440,
    gstRate: 5,
    invoiceNo: "INV-2024-008",
  },
  {
    id: "ORD-2024-009",
    date: "2024-10-24",
    customer: "Rohit Sinha",
    aunty: "Sunita Yadav",
    value: 760,
    gstRate: 5,
    invoiceNo: "INV-2024-009",
  },
  {
    id: "ORD-2024-010",
    date: "2024-10-28",
    customer: "Anita Bose",
    aunty: "Meena Kumari",
    value: 2100,
    gstRate: 5,
    invoiceNo: "INV-2024-010",
  },
];

const TDS_DATA = [
  {
    id: 1,
    name: "Anju Devi",
    pan: "ABCPA1234A",
    grossYTD: 38500,
    tdsDeducted: 385,
    netPaid: 38115,
    status: "Filed",
  },
  {
    id: 2,
    name: "Priya Sharma",
    pan: "BCDPB2345B",
    grossYTD: 24200,
    tdsDeducted: 242,
    netPaid: 23958,
    status: "Pending",
  },
  {
    id: 3,
    name: "Meena Kumari",
    pan: "CDEME3456C",
    grossYTD: 31600,
    tdsDeducted: 316,
    netPaid: 31284,
    status: "Filed",
  },
  {
    id: 4,
    name: "Savitri Singh",
    pan: "DEFSD4567D",
    grossYTD: 42100,
    tdsDeducted: 421,
    netPaid: 41679,
    status: "Pending",
  },
];

const MONTHLY_PL = [
  {
    month: "May 2024",
    gmv: 185000,
    commission: 31450,
    gstOnCommission: 5661,
    tdsDeducted: 943,
    payouts: 148000,
    coinLiability: 2100,
    netRevenue: 25746,
  },
  {
    month: "Jun 2024",
    gmv: 210000,
    commission: 35700,
    gstOnCommission: 6426,
    tdsDeducted: 1071,
    payouts: 167000,
    coinLiability: 2400,
    netRevenue: 29274,
  },
  {
    month: "Jul 2024",
    gmv: 248000,
    commission: 42160,
    gstOnCommission: 7589,
    tdsDeducted: 1265,
    payouts: 196000,
    coinLiability: 2800,
    netRevenue: 34571,
  },
  {
    month: "Aug 2024",
    gmv: 192000,
    commission: 32640,
    gstOnCommission: 5875,
    tdsDeducted: 979,
    payouts: 151000,
    coinLiability: 2200,
    netRevenue: 26765,
  },
  {
    month: "Sep 2024",
    gmv: 275000,
    commission: 46750,
    gstOnCommission: 8415,
    tdsDeducted: 1403,
    payouts: 218000,
    coinLiability: 3100,
    netRevenue: 38335,
  },
  {
    month: "Oct 2024",
    gmv: 310000,
    commission: 52700,
    gstOnCommission: 9486,
    tdsDeducted: 1581,
    payouts: 245000,
    coinLiability: 3500,
    netRevenue: 43214,
  },
];

const COMPLIANCE_EVENTS = [
  {
    date: "2024-11-07",
    type: "TDS Deposit",
    description: "TDS deposit for October 2024",
    urgency: "overdue",
  },
  {
    date: "2024-11-10",
    type: "FSSAI Renewal",
    description: "Geeta Prasad FSSAI expired — renewal required",
    urgency: "overdue",
  },
  {
    date: "2024-11-15",
    type: "FSSAI Renewal",
    description: "Sunita Yadav FSSAI expired — renewal required",
    urgency: "overdue",
  },
  {
    date: "2024-11-20",
    type: "GST Filing",
    description: "GSTR-3B filing for October 2024",
    urgency: "upcoming",
  },
  {
    date: "2024-12-05",
    type: "FSSAI Renewal",
    description: "Rekha Joshi FSSAI expiring in 30 days",
    urgency: "soon",
  },
  {
    date: "2024-12-07",
    type: "TDS Deposit",
    description: "TDS deposit for November 2024",
    urgency: "upcoming",
  },
  {
    date: "2024-12-15",
    type: "FSSAI Renewal",
    description: "Anju Devi FSSAI expiring in 30 days",
    urgency: "soon",
  },
  {
    date: "2024-12-20",
    type: "GST Filing",
    description: "GSTR-3B filing for November 2024",
    urgency: "upcoming",
  },
  {
    date: "2025-01-07",
    type: "TDS Deposit",
    description: "TDS deposit for December 2024",
    urgency: "upcoming",
  },
  {
    date: "2025-01-20",
    type: "GST Filing",
    description: "GSTR-3B filing for December 2024",
    urgency: "upcoming",
  },
  {
    date: "2025-01-31",
    type: "TDS Return",
    description: "Quarterly TDS return Q3 (Oct-Dec 2024)",
    urgency: "upcoming",
  },
  {
    date: "2025-02-07",
    type: "TDS Deposit",
    description: "TDS deposit for January 2025",
    urgency: "upcoming",
  },
];

const TDS_QUARTERS = [
  { q: "Q1 Apr–Jun", due: "Jul 31", status: "filed", amount: 2279 },
  { q: "Q2 Jul–Sep", due: "Oct 31", status: "filed", amount: 3647 },
  { q: "Q3 Oct–Dec", due: "Jan 31", status: "pending", amount: 0 },
  { q: "Q4 Jan–Mar", due: "May 31", status: "upcoming", amount: 0 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gstAmount(value: number, rate: number) {
  return Math.round((value * rate) / 100);
}
function cgst(value: number) {
  return Math.round((value * 2.5) / 100);
}
function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
function urgencyColor(u: string) {
  if (u === "overdue") return "bg-red-100 text-red-700 border-red-200";
  if (u === "soon") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-green-50 text-green-700 border-green-200";
}
function urgencyBadge(u: string) {
  if (u === "overdue") return "destructive";
  if (u === "soon") return "secondary";
  return "outline";
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  function handleLogin() {
    if (pw === PASSWORD) {
      onSuccess();
    } else {
      setError(true);
    }
  }
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-7 h-7 text-amber-700" />
          </div>
          <CardTitle className="font-display text-xl">
            Compliance & Accounting
          </CardTitle>
          <p className="text-sm text-muted-foreground">Internal access only</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            data-ocid="compliance.input"
            className={error ? "border-red-400" : ""}
          />
          {error && <p className="text-red-500 text-xs">Incorrect password</p>}
          <Button
            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
            onClick={handleLogin}
            data-ocid="compliance.primary_button"
          >
            Access Dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

// ─── Tab 1: FSSAI Tracker ─────────────────────────────────────────────────────

function FssaiTracker() {
  const [reminderDays, setReminderDays] = useState("30");
  const [alertSent, setAlertSent] = useState(false);

  const active = FSSAI_DATA.filter((a) => a.status === "active").length;
  const expiring = FSSAI_DATA.filter((a) => a.status === "expiring").length;
  const expired = FSSAI_DATA.filter((a) => a.status === "expired").length;

  const statusBadge = (s: string) => {
    if (s === "active")
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Active
        </Badge>
      );
    if (s === "expiring")
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          Expiring Soon
        </Badge>
      );
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Expired
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Aunties",
            value: FSSAI_DATA.length,
            icon: Shield,
            color: "text-amber-700",
          },
          {
            label: "Active FSSAI",
            value: active,
            icon: CheckCircle,
            color: "text-green-600",
          },
          {
            label: "Expiring in 30 Days",
            value: expiring,
            icon: AlertTriangle,
            color: "text-amber-600",
          },
          {
            label: "Expired",
            value: expired,
            icon: XCircle,
            color: "text-red-600",
          },
        ].map((k) => (
          <Card key={k.label} className="shadow-sm">
            <CardContent className="pt-4 pb-3">
              <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
              <p className="text-2xl font-bold font-display">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-700" /> FSSAI Registration
            Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="compliance.table">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Aunty Name</th>
                  <th className="text-left pb-2 font-medium">FSSAI Number</th>
                  <th className="text-left pb-2 font-medium">Type</th>
                  <th className="text-left pb-2 font-medium">Expiry Date</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {FSSAI_DATA.map((a, i) => (
                  <tr key={a.id} data-ocid={`compliance.row.${i + 1}`}>
                    <td className="py-2.5 font-medium">{a.name}</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">
                      {a.fssaiNo}
                    </td>
                    <td className="py-2.5">
                      <Badge variant="outline" className="text-xs">
                        {a.type}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-sm">{a.expiry}</td>
                    <td className="py-2.5">{statusBadge(a.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Alert + Config */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-700" /> Bulk Renewal Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Send renewal reminder to all {expiring + expired} aunties with
              expiring or expired FSSAI registrations.
            </p>
            {alertSent && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5" /> Reminders sent to{" "}
                {expiring + expired} aunties
              </div>
            )}
            <Button
              className="w-full bg-amber-700 hover:bg-amber-800 text-white text-sm"
              onClick={() => setAlertSent(true)}
              data-ocid="compliance.primary_button"
            >
              <Bell className="w-3.5 h-3.5 mr-2" /> Send Renewal Reminders
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display">
              Reminder Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label
                htmlFor="reminder-days"
                className="text-xs font-medium text-muted-foreground block mb-1"
              >
                Days Before Expiry to Trigger Reminder
              </label>
              <Input
                id="reminder-days"
                type="number"
                value={reminderDays}
                onChange={(e) => setReminderDays(e.target.value)}
                className="h-8 text-sm w-32"
                data-ocid="compliance.input"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Currently set to {reminderDays} days. System sends WhatsApp +
              email reminders.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              data-ocid="compliance.save_button"
            >
              Save Config
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Tab 2: GST Invoice Export ────────────────────────────────────────────────

function GstInvoiceExport() {
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof GST_ORDERS)[0] | null
  >(null);

  const filtered = GST_ORDERS.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.aunty.toLowerCase().includes(search.toLowerCase()),
  );

  function downloadCSV() {
    const header =
      "Order ID,Date,Customer,Aunty,Order Value,GST Rate,GST Amount,Invoice No";
    const rows = GST_ORDERS.map(
      (o) =>
        `${o.id},${o.date},${o.customer},${o.aunty},${o.value},${o.gstRate}%,${gstAmount(o.value, o.gstRate)},${o.invoiceNo}`,
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gst-invoices-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Order ID, Customer or Aunty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
                data-ocid="compliance.search_input"
              />
            </div>
            <Input
              type="date"
              className="h-9 text-sm w-40"
              data-ocid="compliance.input"
            />
            <Input
              type="date"
              className="h-9 text-sm w-40"
              data-ocid="compliance.input"
            />
            <Button
              className="bg-amber-700 hover:bg-amber-800 text-white text-sm h-9 shrink-0"
              onClick={downloadCSV}
              data-ocid="compliance.export_button"
            >
              <Download className="w-3.5 h-3.5 mr-2" /> Download All CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Receipt className="w-4 h-4 text-amber-700" /> GST Invoices (
            {filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="compliance.table">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Order ID</th>
                  <th className="text-left pb-2 font-medium">Date</th>
                  <th className="text-left pb-2 font-medium">Customer</th>
                  <th className="text-left pb-2 font-medium">Aunty</th>
                  <th className="text-right pb-2 font-medium">Order Value</th>
                  <th className="text-right pb-2 font-medium">GST (5%)</th>
                  <th className="text-left pb-2 font-medium">Invoice No</th>
                  <th className="text-center pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((o, i) => (
                  <tr key={o.id} data-ocid={`compliance.row.${i + 1}`}>
                    <td className="py-2 font-mono text-xs">{o.id}</td>
                    <td className="py-2 text-xs text-muted-foreground">
                      {o.date}
                    </td>
                    <td className="py-2">{o.customer}</td>
                    <td className="py-2 text-muted-foreground">{o.aunty}</td>
                    <td className="py-2 text-right font-medium">
                      {formatCurrency(o.value)}
                    </td>
                    <td className="py-2 text-right text-amber-700">
                      {formatCurrency(gstAmount(o.value, o.gstRate))}
                    </td>
                    <td className="py-2 font-mono text-xs">{o.invoiceNo}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs"
                          onClick={() => setSelectedInvoice(o)}
                          data-ocid="compliance.secondary_button"
                        >
                          <Eye className="w-3 h-3 mr-1" /> Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs"
                          data-ocid="compliance.secondary_button"
                        >
                          <Download className="w-3 h-3 mr-1" /> PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Preview Modal */}
      <Dialog
        open={!!selectedInvoice}
        onOpenChange={() => setSelectedInvoice(null)}
      >
        <DialogContent className="max-w-md" data-ocid="compliance.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              GST Invoice Preview
            </DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 text-sm">
              <div className="border rounded-lg p-4 bg-amber-50 space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice No</span>
                  <span className="font-mono font-semibold">
                    {selectedInvoice.invoiceNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{selectedInvoice.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">
                    {selectedInvoice.customer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aunty</span>
                  <span>{selectedInvoice.aunty}</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-1 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>GSTIN (Platform)</span>
                  <span className="font-mono">22AAAAA0000A1Z5</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>HSN Code</span>
                  <span className="font-mono">2106</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Amount</span>
                  <span>{formatCurrency(selectedInvoice.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CGST @ 2.5%</span>
                  <span className="text-amber-700">
                    {formatCurrency(cgst(selectedInvoice.value))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SGST @ 2.5%</span>
                  <span className="text-amber-700">
                    {formatCurrency(cgst(selectedInvoice.value))}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total (incl. GST)</span>
                  <span>
                    {formatCurrency(
                      selectedInvoice.value + cgst(selectedInvoice.value) * 2,
                    )}
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => setSelectedInvoice(null)}
                data-ocid="compliance.close_button"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Tab 3: TDS Reporting ─────────────────────────────────────────────────────

function TdsReporting() {
  const [form16AUnity, setForm16AUnity] = useState<(typeof TDS_DATA)[0] | null>(
    null,
  );

  const totalTDS = TDS_DATA.reduce((s, a) => s + a.tdsDeducted, 0);
  const pendingTDS = TDS_DATA.filter((a) => a.status === "Pending").reduce(
    (s, a) => s + a.tdsDeducted,
    0,
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Aunties Above Threshold",
            value: TDS_DATA.length,
            icon: Shield,
            color: "text-amber-700",
          },
          {
            label: "Total TDS Deducted YTD",
            value: formatCurrency(totalTDS),
            icon: TrendingDown,
            color: "text-red-600",
          },
          {
            label: "Pending TDS Deposit",
            value: formatCurrency(pendingTDS),
            icon: AlertTriangle,
            color: "text-amber-600",
          },
          {
            label: "Next Filing Deadline",
            value: "Jan 31, 2025",
            icon: Calendar,
            color: "text-blue-600",
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

      {/* Aunty TDS Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base font-display">
              Aunty TDS Register
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              data-ocid="compliance.export_button"
            >
              <Download className="w-3 h-3 mr-1" /> Form 26Q Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="compliance.table">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Aunty Name</th>
                  <th className="text-left pb-2 font-medium">PAN</th>
                  <th className="text-right pb-2 font-medium">Gross YTD</th>
                  <th className="text-right pb-2 font-medium">TDS (1%)</th>
                  <th className="text-right pb-2 font-medium">Net Paid</th>
                  <th className="text-center pb-2 font-medium">Status</th>
                  <th className="text-center pb-2 font-medium">Form 16A</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {TDS_DATA.map((a, i) => (
                  <tr key={a.id} data-ocid={`compliance.row.${i + 1}`}>
                    <td className="py-2.5 font-medium">{a.name}</td>
                    <td className="py-2.5 font-mono text-xs">{a.pan}</td>
                    <td className="py-2.5 text-right">
                      {formatCurrency(a.grossYTD)}
                    </td>
                    <td className="py-2.5 text-right text-red-600 font-medium">
                      {formatCurrency(a.tdsDeducted)}
                    </td>
                    <td className="py-2.5 text-right text-green-700">
                      {formatCurrency(a.netPaid)}
                    </td>
                    <td className="py-2.5 text-center">
                      <Badge
                        className={
                          a.status === "Filed"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        {a.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => setForm16AUnity(a)}
                        data-ocid="compliance.secondary_button"
                      >
                        <FileText className="w-3 h-3 mr-1" /> Generate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Filing Calendar */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" /> Quarterly TDS Filing
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TDS_QUARTERS.map((q) => (
              <div
                key={q.q}
                className={`rounded-lg border p-3 ${
                  q.status === "filed"
                    ? "bg-green-50 border-green-200"
                    : q.status === "pending"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-gray-50 border-gray-200"
                }`}
              >
                <p className="text-xs font-semibold">{q.q}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Due: {q.due}
                </p>
                {q.amount > 0 && (
                  <p className="text-sm font-bold mt-1">
                    {formatCurrency(q.amount)}
                  </p>
                )}
                <Badge
                  className={`mt-2 text-xs ${
                    q.status === "filed"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : q.status === "pending"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {q.status === "filed"
                    ? "Filed"
                    : q.status === "pending"
                      ? "Pending"
                      : "Upcoming"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form 16A Modal */}
      <Dialog open={!!form16AUnity} onOpenChange={() => setForm16AUnity(null)}>
        <DialogContent className="max-w-md" data-ocid="compliance.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Form 16A — TDS Certificate
            </DialogTitle>
          </DialogHeader>
          {form16AUnity && (
            <div className="space-y-4 text-sm">
              <div className="border rounded-lg p-4 bg-amber-50 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deductee</span>
                  <span className="font-semibold">{form16AUnity.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PAN</span>
                  <span className="font-mono">{form16AUnity.pan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Financial Year</span>
                  <span>2024–25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Section</span>
                  <span>194C</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Earnings</span>
                  <span className="font-semibold">
                    {formatCurrency(form16AUnity.grossYTD)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TDS Rate</span>
                  <span>1%</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>TDS Deducted</span>
                  <span className="text-red-600">
                    {formatCurrency(form16AUnity.tdsDeducted)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  data-ocid="compliance.secondary_button"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
                </Button>
                <Button
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white"
                  onClick={() => setForm16AUnity(null)}
                  data-ocid="compliance.close_button"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Tab 4: Accounting Export ─────────────────────────────────────────────────

function AccountingExport() {
  const totalGMV = MONTHLY_PL.reduce((s, m) => s + m.gmv, 0);
  const totalCommission = MONTHLY_PL.reduce((s, m) => s + m.commission, 0);
  const totalGST = MONTHLY_PL.reduce((s, m) => s + m.gstOnCommission, 0);
  const totalNet = MONTHLY_PL.reduce((s, m) => s + m.netRevenue, 0);

  function exportCSV() {
    const header =
      "Month,GMV,Platform Commission,GST on Commission (18%),TDS Deducted,Payouts Made,Coin Liability Change,Net Platform Revenue";
    const rows = MONTHLY_PL.map(
      (m) =>
        `${m.month},${m.gmv},${m.commission},${m.gstOnCommission},${m.tdsDeducted},${m.payouts},${m.coinLiability},${m.netRevenue}`,
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "choudhary-aunty-accounting-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const reconciliationChecks = [
    {
      label: "Orders vs Payments matched",
      status: "ok",
      detail: "1,842 orders reconciled",
    },
    {
      label: "Payouts vs Earnings matched",
      status: "ok",
      detail: "All aunty payouts verified",
    },
    {
      label: "GST liability reconciled",
      status: "warning",
      detail: "Oct filing pending review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total GMV YTD",
            value: formatCurrency(totalGMV),
            icon: TrendingUp,
            color: "text-amber-700",
          },
          {
            label: "Commission Earned",
            value: formatCurrency(totalCommission),
            icon: Receipt,
            color: "text-blue-600",
          },
          {
            label: "Total GST Collected",
            value: formatCurrency(totalGST),
            icon: FileText,
            color: "text-purple-600",
          },
          {
            label: "Net Platform Revenue",
            value: formatCurrency(totalNet),
            icon: CheckCircle,
            color: "text-green-600",
          },
        ].map((k) => (
          <Card key={k.label} className="shadow-sm">
            <CardContent className="pt-4 pb-3">
              <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
              <p className="text-base font-bold font-display">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base font-display">
              Monthly Revenue Breakdown
            </CardTitle>
            <Button
              className="bg-amber-700 hover:bg-amber-800 text-white text-sm"
              onClick={exportCSV}
              data-ocid="compliance.export_button"
            >
              <Download className="w-3.5 h-3.5 mr-2" /> Export CSV for CA
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-56 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_PL}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => v.split(" ")[0]}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar
                  dataKey="commission"
                  name="Commission"
                  fill="#b45309"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="netRevenue"
                  name="Net Revenue"
                  fill="#16a34a"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* P&L Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs" data-ocid="compliance.table">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Month</th>
                  <th className="text-right pb-2 font-medium">GMV</th>
                  <th className="text-right pb-2 font-medium">Commission</th>
                  <th className="text-right pb-2 font-medium">GST on Comm</th>
                  <th className="text-right pb-2 font-medium">TDS</th>
                  <th className="text-right pb-2 font-medium">Payouts</th>
                  <th className="text-right pb-2 font-medium">Coin Δ</th>
                  <th className="text-right pb-2 font-medium">Net Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MONTHLY_PL.map((m, i) => (
                  <tr key={m.month} data-ocid={`compliance.row.${i + 1}`}>
                    <td className="py-2 font-medium">{m.month}</td>
                    <td className="py-2 text-right">{formatCurrency(m.gmv)}</td>
                    <td className="py-2 text-right text-amber-700">
                      {formatCurrency(m.commission)}
                    </td>
                    <td className="py-2 text-right text-purple-600">
                      {formatCurrency(m.gstOnCommission)}
                    </td>
                    <td className="py-2 text-right text-red-500">
                      {formatCurrency(m.tdsDeducted)}
                    </td>
                    <td className="py-2 text-right">
                      {formatCurrency(m.payouts)}
                    </td>
                    <td className="py-2 text-right text-muted-foreground">
                      {formatCurrency(m.coinLiability)}
                    </td>
                    <td className="py-2 text-right font-semibold text-green-700">
                      {formatCurrency(m.netRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t">
                <tr>
                  <td className="pt-2 font-bold text-xs">Total</td>
                  <td className="pt-2 text-right font-bold">
                    {formatCurrency(totalGMV)}
                  </td>
                  <td className="pt-2 text-right font-bold text-amber-700">
                    {formatCurrency(totalCommission)}
                  </td>
                  <td className="pt-2 text-right font-bold text-purple-600">
                    {formatCurrency(totalGST)}
                  </td>
                  <td colSpan={3} />
                  <td className="pt-2 text-right font-bold text-green-700">
                    {formatCurrency(totalNet)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Health */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">
            Reconciliation Health Check
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reconciliationChecks.map((c, i) => (
            <div
              key={c.label}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              data-ocid={`compliance.row.${i + 1}`}
            >
              <div className="flex items-center gap-3">
                {c.status === "ok" ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <div>
                  <p className="text-sm font-medium">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.detail}</p>
                </div>
              </div>
              <Badge
                className={
                  c.status === "ok"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                }
              >
                {c.status === "ok" ? "Matched" : "Review"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab 5: Compliance Calendar ───────────────────────────────────────────────

function ComplianceCalendar() {
  const [view, setView] = useState<"calendar" | "list">("list");

  const typeIcon = (type: string) => {
    if (type === "GST Filing") return <Receipt className="w-3.5 h-3.5" />;
    if (type === "TDS Deposit") return <TrendingDown className="w-3.5 h-3.5" />;
    if (type === "TDS Return") return <FileText className="w-3.5 h-3.5" />;
    return <Shield className="w-3.5 h-3.5" />;
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-base">
          Next 90 Days — Compliance Events
        </h3>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            type="button"
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              view === "list"
                ? "bg-white shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setView("list")}
            data-ocid="compliance.toggle"
          >
            List
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              view === "calendar"
                ? "bg-white shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setView("calendar")}
            data-ocid="compliance.toggle"
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {[
          { label: "Overdue", color: "bg-red-400" },
          { label: "Due within 7 days", color: "bg-amber-400" },
          { label: "Upcoming", color: "bg-green-400" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className="text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Events */}
      <div className="space-y-3">
        {COMPLIANCE_EVENTS.map((ev, i) => (
          <div
            key={`${ev.date}-${i}`}
            className={`flex items-start gap-3 p-3 rounded-lg border ${urgencyColor(ev.urgency)}`}
            data-ocid={`compliance.row.${i + 1}`}
          >
            <div className="flex items-center gap-2 shrink-0">
              {ev.urgency === "overdue" ? (
                <XCircle className="w-4 h-4" />
              ) : ev.urgency === "soon" ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant={
                    urgencyBadge(ev.urgency) as
                      | "destructive"
                      | "secondary"
                      | "outline"
                  }
                  className="text-xs"
                >
                  {ev.type}
                </Badge>
                <span className="text-xs font-medium">{ev.date}</span>
              </div>
              <p className="text-sm mt-1">{ev.description}</p>
            </div>
            {typeIcon(ev.type)}
          </div>
        ))}
      </div>

      {/* Summary */}
      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              {
                label: "Overdue",
                count: COMPLIANCE_EVENTS.filter((e) => e.urgency === "overdue")
                  .length,
                color: "text-red-600",
              },
              {
                label: "Due Soon",
                count: COMPLIANCE_EVENTS.filter((e) => e.urgency === "soon")
                  .length,
                color: "text-amber-600",
              },
              {
                label: "Upcoming",
                count: COMPLIANCE_EVENTS.filter((e) => e.urgency === "upcoming")
                  .length,
                color: "text-green-600",
              },
            ].map((s) => (
              <div key={s.label}>
                <p className={`text-2xl font-bold font-display ${s.color}`}>
                  {s.count}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ComplianceEnginePage() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Compliance & Accounting
              </h1>
              <p className="text-sm text-muted-foreground">
                FSSAI tracking · GST invoices · TDS reporting · CA export
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="fssai">
          <TabsList
            className="mb-6 flex flex-wrap h-auto gap-1"
            data-ocid="compliance.tab"
          >
            <TabsTrigger value="fssai" data-ocid="compliance.tab">
              FSSAI Tracker
            </TabsTrigger>
            <TabsTrigger value="gst" data-ocid="compliance.tab">
              GST Invoices
            </TabsTrigger>
            <TabsTrigger value="tds" data-ocid="compliance.tab">
              TDS Reporting
            </TabsTrigger>
            <TabsTrigger value="accounting" data-ocid="compliance.tab">
              Accounting Export
            </TabsTrigger>
            <TabsTrigger value="calendar" data-ocid="compliance.tab">
              Compliance Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fssai">
            <FssaiTracker />
          </TabsContent>
          <TabsContent value="gst">
            <GstInvoiceExport />
          </TabsContent>
          <TabsContent value="tds">
            <TdsReporting />
          </TabsContent>
          <TabsContent value="accounting">
            <AccountingExport />
          </TabsContent>
          <TabsContent value="calendar">
            <ComplianceCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
