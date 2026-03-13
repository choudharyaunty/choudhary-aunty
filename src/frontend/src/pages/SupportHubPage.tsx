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
import { Progress } from "@/components/ui/progress";
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
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Filter,
  Headphones,
  Lock,
  Plus,
  ShieldAlert,
  Star,
  TicketCheck,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const SUPPORT_PASSWORD = "amar2026";

// ============================================
// SAMPLE DATA
// ============================================

const customerTickets = [
  {
    id: "TKT-001",
    customer: "Priya Sharma",
    phone: "9876543210",
    orderId: "ORD-2847",
    category: "quality",
    status: "open",
    priority: "high",
    created: "2026-03-10",
    slaStatus: "breach",
    assignedTo: "Rahul K.",
    description:
      "Dal makhani was too watery and lacked taste. Expected the same quality as before.",
  },
  {
    id: "TKT-002",
    customer: "Amit Verma",
    phone: "9845612300",
    orderId: "ORD-2801",
    category: "delivery",
    status: "in-progress",
    priority: "medium",
    created: "2026-03-11",
    slaStatus: "ok",
    assignedTo: "Sneha R.",
    description:
      "Package arrived 2 days late. Food quality was affected due to delay.",
  },
  {
    id: "TKT-003",
    customer: "Kavita Singh",
    phone: "9912345678",
    orderId: "ORD-2756",
    category: "refund",
    status: "resolved",
    priority: "high",
    created: "2026-03-08",
    slaStatus: "ok",
    assignedTo: "Rahul K.",
    description:
      "Wrong item delivered. Ordered Mithila Achar but received Bhojpuri Chutney.",
  },
  {
    id: "TKT-004",
    customer: "Deepak Jha",
    phone: "9700001234",
    orderId: "ORD-2790",
    category: "wrong-item",
    status: "open",
    priority: "urgent",
    created: "2026-03-12",
    slaStatus: "breach",
    assignedTo: "Unassigned",
    description:
      "Received completely wrong order. Items belong to another customer.",
  },
  {
    id: "TKT-005",
    customer: "Meena Patel",
    phone: "9654321098",
    orderId: "ORD-2712",
    category: "quality",
    status: "closed",
    priority: "low",
    created: "2026-03-05",
    slaStatus: "ok",
    assignedTo: "Sneha R.",
    description: "Laddoos were slightly dry. Minor issue, easily manageable.",
  },
  {
    id: "TKT-006",
    customer: "Rajan Mishra",
    phone: "9898765432",
    orderId: "ORD-2834",
    category: "delivery",
    status: "in-progress",
    priority: "high",
    created: "2026-03-11",
    slaStatus: "ok",
    assignedTo: "Arjun M.",
    description: "Tracking shows delivered but I never received the package.",
  },
  {
    id: "TKT-007",
    customer: "Sunita Devi",
    phone: "9123456789",
    orderId: "ORD-2798",
    category: "refund",
    status: "open",
    priority: "medium",
    created: "2026-03-12",
    slaStatus: "ok",
    assignedTo: "Rahul K.",
    description: "Cancelled order but refund not received after 5 days.",
  },
  {
    id: "TKT-008",
    customer: "Vikram Chauhan",
    phone: "9567890123",
    orderId: "ORD-2823",
    category: "other",
    status: "resolved",
    priority: "low",
    created: "2026-03-09",
    slaStatus: "ok",
    assignedTo: "Sneha R.",
    description: "Want to change delivery address after placing order.",
  },
  {
    id: "TKT-009",
    customer: "Ananya Roy",
    phone: "9345678901",
    orderId: "ORD-2851",
    category: "quality",
    status: "open",
    priority: "high",
    created: "2026-03-12",
    slaStatus: "ok",
    assignedTo: "Arjun M.",
    description:
      "Packaging was torn on arrival. Some items may have been contaminated.",
  },
  {
    id: "TKT-010",
    customer: "Suresh Gupta",
    phone: "9234567890",
    orderId: "ORD-2762",
    category: "delivery",
    status: "closed",
    priority: "medium",
    created: "2026-03-06",
    slaStatus: "ok",
    assignedTo: "Rahul K.",
    description:
      "Delivery slot was not honoured. Package arrived in the evening instead of morning.",
  },
];

const auntyTickets = [
  {
    id: "ATK-001",
    aunty: "Kamla Devi (Bihar)",
    phone: "9876501234",
    category: "payment",
    status: "open",
    priority: "urgent",
    created: "2026-03-11",
    slaStatus: "breach",
    assignedTo: "Priti A.",
    description:
      "February payout not received. Bank details are correct. Please check Razorpay settlement.",
  },
  {
    id: "ATK-002",
    aunty: "Savitri Jha (Mithila)",
    phone: "9845067890",
    category: "order-dispute",
    status: "in-progress",
    priority: "high",
    created: "2026-03-10",
    slaStatus: "ok",
    assignedTo: "Priti A.",
    description:
      "Customer left a 1-star review falsely claiming food was spoiled. I have dispatch photos.",
  },
  {
    id: "ATK-003",
    aunty: "Rekha Singh (Magadh)",
    phone: "9712345670",
    category: "platform-bug",
    status: "resolved",
    priority: "medium",
    created: "2026-03-08",
    slaStatus: "ok",
    assignedTo: "Dev Team",
    description:
      "Cannot update product availability from the Maker Dashboard. Toggle is not saving.",
  },
  {
    id: "ATK-004",
    aunty: "Poonam Kumari (Bhojpur)",
    phone: "9601234560",
    category: "onboarding",
    status: "open",
    priority: "medium",
    created: "2026-03-12",
    slaStatus: "ok",
    assignedTo: "Unassigned",
    description:
      "FSSAI registration document upload not working. File size is under 5MB as required.",
  },
  {
    id: "ATK-005",
    aunty: "Usha Rani (Bihar)",
    phone: "9534567891",
    category: "payout-query",
    status: "closed",
    priority: "low",
    created: "2026-03-07",
    slaStatus: "ok",
    assignedTo: "Priti A.",
    description:
      "Commission deduction seems higher than the stated 20% for sweets. Please share breakdown.",
  },
  {
    id: "ATK-006",
    aunty: "Bimla Devi (Mithila)",
    phone: "9412345612",
    category: "platform-bug",
    status: "in-progress",
    priority: "high",
    created: "2026-03-11",
    slaStatus: "ok",
    assignedTo: "Dev Team",
    description:
      "Order notifications are not coming through WhatsApp. Missed 3 orders last week.",
  },
];

const ticketsByCategory = [
  { category: "Quality", count: 18 },
  { category: "Delivery", count: 24 },
  { category: "Refund", count: 12 },
  { category: "Platform Bug", count: 8 },
  { category: "Payment", count: 6 },
  { category: "Other", count: 9 },
];

const resolutionTrend = [
  { week: "W1 Feb", avgHours: 38 },
  { week: "W2 Feb", avgHours: 32 },
  { week: "W3 Feb", avgHours: 28 },
  { week: "W4 Feb", avgHours: 22 },
  { week: "W1 Mar", avgHours: 19 },
  { week: "W2 Mar", avgHours: 16 },
];

const csatDistribution = [
  { rating: "5 ★", count: 62, color: "#22c55e" },
  { rating: "4 ★", count: 28, color: "#86efac" },
  { rating: "3 ★", count: 14, color: "#fbbf24" },
  { rating: "2 ★", count: 6, color: "#fb923c" },
  { rating: "1 ★", count: 4, color: "#ef4444" },
];

const agentPerformance = [
  { agent: "Rahul K.", resolved: 48, avgTime: "18h", csat: 4.7, breach: 2 },
  { agent: "Sneha R.", resolved: 39, avgTime: "22h", csat: 4.5, breach: 3 },
  { agent: "Arjun M.", resolved: 31, avgTime: "26h", csat: 4.3, breach: 5 },
  { agent: "Priti A.", resolved: 27, avgTime: "20h", csat: 4.6, breach: 1 },
];

const slaRules = [
  {
    category: "Quality Complaints",
    target: "24h",
    current: "19h",
    status: "ok",
  },
  { category: "Delivery Issues", target: "24h", current: "21h", status: "ok" },
  { category: "Payment Issues", target: "48h", current: "44h", status: "ok" },
  {
    category: "Platform Bugs",
    target: "72h",
    current: "68h",
    status: "warning",
  },
  {
    category: "Onboarding Help",
    target: "48h",
    current: "52h",
    status: "breach",
  },
  { category: "Refund Requests", target: "48h", current: "38h", status: "ok" },
];

const recentActivity = [
  { time: "2 min ago", text: "TKT-009 assigned to Arjun M.", type: "assign" },
  { time: "14 min ago", text: "ATK-006 escalated — SLA risk", type: "alert" },
  {
    time: "32 min ago",
    text: "TKT-003 marked Resolved by Rahul K.",
    type: "resolve",
  },
  { time: "1h ago", text: "TKT-007 raised by Sunita Devi", type: "new" },
  {
    time: "2h ago",
    text: "ATK-001 escalated — payment not received",
    type: "alert",
  },
  {
    time: "3h ago",
    text: "TKT-005 closed after no response (48h)",
    type: "close",
  },
];

// ============================================
// HELPER COMPONENTS
// ============================================

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open: "bg-red-100 text-red-700 border-red-200",
    "in-progress": "bg-amber-100 text-amber-700 border-amber-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
    closed: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const labels: Record<string, string> = {
    open: "Open",
    "in-progress": "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] || "bg-gray-100 text-gray-500"}`}
    >
      {labels[status] || status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    urgent: "bg-red-600 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-amber-400 text-amber-900",
    low: "bg-gray-200 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold capitalize ${map[priority] || ""}`}
    >
      {priority}
    </span>
  );
}

function SlaIndicator({ status }: { status: string }) {
  if (status === "breach") {
    return (
      <span className="flex items-center gap-1 text-xs text-red-600 font-semibold">
        <XCircle className="w-3.5 h-3.5" />
        Breached
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
      <CheckCircle2 className="w-3.5 h-3.5" />
      On Track
    </span>
  );
}

// ============================================
// TAB 1: OVERVIEW
// ============================================

function OverviewTab() {
  const kpis = [
    {
      label: "Open Tickets",
      value: "23",
      icon: TicketCheck,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Avg Resolution",
      value: "19h",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "SLA Breach Rate",
      value: "8.3%",
      icon: AlertTriangle,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "CSAT Score",
      value: "4.5 / 5",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Tickets Today",
      value: "7",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Escalated",
      value: "3",
      icon: ShieldAlert,
      color: "text-red-700",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        data-ocid="support.overview.section"
      >
        {kpis.map((k) => (
          <Card
            key={k.label}
            className="border-border/60 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div
                className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center mb-2`}
              >
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">
                {k.value}
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                {k.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold font-body">
                Tickets by Category (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={ticketsByCategory}
                  margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="count" fill="#d4721a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-body">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a) => {
              const dotColor =
                a.type === "alert"
                  ? "bg-red-500"
                  : a.type === "resolve"
                    ? "bg-green-500"
                    : a.type === "new"
                      ? "bg-blue-500"
                      : a.type === "close"
                        ? "bg-gray-400"
                        : "bg-amber-500";
              return (
                <div key={a.text} className="flex gap-2.5 items-start">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor}`}
                  />
                  <div>
                    <p className="text-xs text-foreground font-body leading-snug">
                      {a.text}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-body mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// TAB 2 & 3: TICKET TABLE
// ============================================

interface Ticket {
  id: string;
  customer?: string;
  aunty?: string;
  phone: string;
  orderId?: string;
  category: string;
  status: string;
  priority: string;
  created: string;
  slaStatus: string;
  assignedTo: string;
  description: string;
}

interface TicketTableProps {
  tickets: Ticket[];
  isAunty?: boolean;
  onCreateTicket: () => void;
}

function TicketTable({ tickets, isAunty, onCreateTicket }: TicketTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const filtered = tickets.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    return true;
  });

  const categories = isAunty
    ? ["payment", "order-dispute", "platform-bug", "onboarding", "payout-query"]
    : ["quality", "delivery", "wrong-item", "refund", "other"];

  const nameField = isAunty ? "aunty" : "customer";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div
          className="flex flex-wrap gap-2"
          data-ocid="support.tickets.section"
        >
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-36 h-8 text-xs"
              data-ocid="support.status.select"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger
              className="w-36 h-8 text-xs"
              data-ocid="support.category.select"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c.replace("-", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger
              className="w-36 h-8 text-xs"
              data-ocid="support.priority.select"
            >
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          className="bg-saffron hover:bg-terracotta text-cream font-semibold text-xs"
          onClick={onCreateTicket}
          data-ocid={
            isAunty
              ? "support.raise_ticket.button"
              : "support.create_ticket.button"
          }
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          {isAunty ? "Raise Ticket" : "Create Ticket"}
        </Button>
      </div>

      <div className="rounded-lg border border-border/60 overflow-hidden">
        <Table data-ocid="support.tickets.table">
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-xs font-semibold">Ticket ID</TableHead>
              <TableHead className="text-xs font-semibold">
                {isAunty ? "Aunty" : "Customer"}
              </TableHead>
              <TableHead className="text-xs font-semibold">Category</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">Priority</TableHead>
              <TableHead className="text-xs font-semibold">SLA</TableHead>
              <TableHead className="text-xs font-semibold">Assigned</TableHead>
              <TableHead className="text-xs font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((ticket, i) => (
              <TableRow
                key={ticket.id}
                className="hover:bg-muted/30 cursor-pointer"
                data-ocid={`support.tickets.item.${i + 1}`}
              >
                <TableCell className="font-mono text-xs font-semibold text-saffron">
                  {ticket.id}
                </TableCell>
                <TableCell className="text-xs font-body">
                  {ticket[nameField as keyof Ticket]}
                </TableCell>
                <TableCell className="text-xs capitalize font-body">
                  {(ticket.category as string).replace("-", " ")}
                </TableCell>
                <TableCell>
                  <StatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={ticket.priority} />
                </TableCell>
                <TableCell>
                  <SlaIndicator status={ticket.slaStatus} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-body">
                  {ticket.assignedTo}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setSelectedTicket(ticket)}
                    data-ocid={`support.ticket.edit_button.${i + 1}`}
                  >
                    View <ChevronRight className="w-3 h-3 ml-0.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-10 text-sm text-muted-foreground font-body"
                  data-ocid="support.tickets.empty_state"
                >
                  No tickets match the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog
        open={!!selectedTicket}
        onOpenChange={() => setSelectedTicket(null)}
      >
        <DialogContent className="max-w-md" data-ocid="support.ticket.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {selectedTicket?.id} —{" "}
              {isAunty ? selectedTicket?.aunty : selectedTicket?.customer}
            </DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-3 text-sm font-body">
              <div className="flex gap-2 flex-wrap">
                <StatusBadge status={selectedTicket.status} />
                <PriorityBadge priority={selectedTicket.priority} />
                <SlaIndicator status={selectedTicket.slaStatus} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Category:</span>{" "}
                  <span className="capitalize font-semibold">
                    {selectedTicket.category.replace("-", " ")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Assigned:</span>{" "}
                  <span className="font-semibold">
                    {selectedTicket.assignedTo}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>{" "}
                  <span>{selectedTicket.created}</span>
                </div>
                {selectedTicket.orderId && (
                  <div>
                    <span className="text-muted-foreground">Order:</span>{" "}
                    <span className="font-mono">{selectedTicket.orderId}</span>
                  </div>
                )}
              </div>
              <div className="bg-muted/40 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm">{selectedTicket.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  onClick={() => {
                    toast.success("Ticket resolved");
                    setSelectedTicket(null);
                  }}
                  data-ocid="support.ticket.confirm_button"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Mark Resolved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => setSelectedTicket(null)}
                  data-ocid="support.ticket.close_button"
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

// ============================================
// CREATE TICKET MODAL
// ============================================

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  isAunty?: boolean;
}

function CreateTicketModal({ open, onClose, isAunty }: CreateTicketModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    orderId: "",
    category: "",
    priority: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success(
      `Ticket raised successfully! ID: ${isAunty ? "ATK" : "TKT"}-${Math.floor(Math.random() * 900 + 100)}`,
    );
    setForm({
      name: "",
      phone: "",
      orderId: "",
      category: "",
      priority: "",
      description: "",
    });
    onClose();
  }

  const customerCategories = [
    "quality",
    "delivery",
    "wrong-item",
    "refund",
    "other",
  ];
  const auntyCategories = [
    "payment issue",
    "order dispute",
    "platform bug",
    "onboarding help",
    "payout query",
  ];
  const categories = isAunty ? auntyCategories : customerCategories;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md"
        data-ocid="support.create_ticket.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {isAunty ? "Raise Aunty Ticket" : "Create Customer Ticket"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-body mb-1 block">
                {isAunty ? "Aunty Name" : "Customer Name"}
              </Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                className="text-sm h-8"
                required
                data-ocid="support.ticket.name.input"
              />
            </div>
            <div>
              <Label className="text-xs font-body mb-1 block">Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="10-digit phone"
                className="text-sm h-8"
                required
                data-ocid="support.ticket.phone.input"
              />
            </div>
          </div>
          {!isAunty && (
            <div>
              <Label className="text-xs font-body mb-1 block">Order ID</Label>
              <Input
                value={form.orderId}
                onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                placeholder="ORD-XXXX"
                className="text-sm h-8"
                data-ocid="support.ticket.order_id.input"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-body mb-1 block">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="support.ticket.category.select"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem
                      key={c}
                      value={c}
                      className="text-xs capitalize"
                    >
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-body mb-1 block">Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(v) => setForm({ ...form, priority: v })}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="support.ticket.priority.select"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {["low", "medium", "high", "urgent"].map((p) => (
                    <SelectItem
                      key={p}
                      value={p}
                      className="text-xs capitalize"
                    >
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs font-body mb-1 block">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe the issue in detail..."
              rows={3}
              className="text-sm resize-none"
              required
              data-ocid="support.ticket.description.textarea"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="support.ticket.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-saffron hover:bg-terracotta text-cream font-semibold"
              data-ocid="support.ticket.submit_button"
            >
              Submit Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// TAB 4: SLA MONITOR
// ============================================

function SlaMonitorTab() {
  const atRisk = [...customerTickets, ...auntyTickets].filter(
    (t) => t.slaStatus === "breach" || t.priority === "urgent",
  );

  return (
    <div className="space-y-6" data-ocid="support.sla.section">
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-body">
            SLA Rules & Current Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-xs">Category</TableHead>
                <TableHead className="text-xs">Target</TableHead>
                <TableHead className="text-xs">Current Avg</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slaRules.map((rule, i) => (
                <TableRow
                  key={rule.category}
                  data-ocid={`support.sla.item.${i + 1}`}
                >
                  <TableCell className="text-sm font-body">
                    {rule.category}
                  </TableCell>
                  <TableCell className="text-sm font-mono font-semibold">
                    {rule.target}
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {rule.current}
                  </TableCell>
                  <TableCell>
                    {rule.status === "breach" && (
                      <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                        Breached
                      </Badge>
                    )}
                    {rule.status === "warning" && (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                        At Risk
                      </Badge>
                    )}
                    {rule.status === "ok" && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        Healthy
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="w-32">
                    <Progress
                      value={
                        rule.status === "breach"
                          ? 100
                          : rule.status === "warning"
                            ? 80
                            : 40
                      }
                      className="h-1.5"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-body flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Tickets at SLA Risk ({atRisk.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {atRisk.map((ticket, i) => (
            <div
              key={ticket.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${ticket.slaStatus === "breach" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}
              data-ocid={`support.at_risk.item.${i + 1}`}
            >
              <div>
                <span className="font-mono text-xs font-bold text-saffron">
                  {ticket.id}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {(ticket as { customer?: string; aunty?: string }).customer ||
                    (ticket as { customer?: string; aunty?: string }).aunty}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={ticket.priority} />
                <SlaIndicator status={ticket.slaStatus} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-body">
            Auto-Escalation Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              trigger: "Quality complaint unresolved > 20h",
              action: "Escalate to Senior Agent + WhatsApp alert to customer",
              active: true,
            },
            {
              trigger: "Urgent ticket unassigned > 2h",
              action: "Auto-assign to available agent + alert admin",
              active: true,
            },
            {
              trigger: "Payment issue unresolved > 36h",
              action: "Escalate to Finance Team + Razorpay check",
              active: true,
            },
            {
              trigger: "Aunty payout dispute > 24h",
              action: "Flag to Payout Manager + send acknowledgement to aunty",
              active: false,
            },
          ].map((rule, i) => (
            <div
              key={rule.trigger}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/40"
              data-ocid={`support.escalation.item.${i + 1}`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${rule.active ? "bg-green-500" : "bg-gray-300"}`}
              />
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground font-body">
                  {rule.trigger}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  → {rule.action}
                </p>
              </div>
              <Badge
                className={`text-[10px] ${rule.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
              >
                {rule.active ? "Active" : "Inactive"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// TAB 5: CSAT & ANALYTICS
// ============================================

function CsatAnalyticsTab() {
  const csatScore = 4.5;
  const totalRatings = csatDistribution.reduce((a, b) => a + b.count, 0);

  return (
    <div className="space-y-6" data-ocid="support.csat.section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CSAT Gauge */}
        <Card className="border-border/60 col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-body">
              CSAT Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full"
                role="img"
                aria-label="CSAT score gauge"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f5e8d8"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#d4721a"
                  strokeWidth="12"
                  strokeDasharray={`${(csatScore / 5) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-display text-saffron">
                  {csatScore}
                </span>
                <span className="text-xs text-muted-foreground font-body">
                  out of 5
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-body mt-2 text-center">
              {totalRatings} ratings collected
            </p>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="border-border/60 col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold font-body">
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {csatDistribution.map((r) => (
              <div key={r.rating} className="flex items-center gap-3">
                <span className="text-xs font-body w-8 text-right text-muted-foreground">
                  {r.rating}
                </span>
                <Progress
                  value={(r.count / totalRatings) * 100}
                  className="h-2 flex-1"
                />
                <span className="text-xs font-semibold font-body w-6 text-right">
                  {r.count}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Resolution Time Trend */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-body">
            Avg Resolution Time Trend (Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={resolutionTrend}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d3" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="avgHours"
                stroke="#d4721a"
                strokeWidth={2}
                dot={{ fill: "#d4721a", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold font-body">
            Agent Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-xs">Agent</TableHead>
                <TableHead className="text-xs">Tickets Resolved</TableHead>
                <TableHead className="text-xs">Avg Resolution</TableHead>
                <TableHead className="text-xs">CSAT</TableHead>
                <TableHead className="text-xs">SLA Breaches</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentPerformance.map((agent, i) => (
                <TableRow
                  key={agent.agent}
                  data-ocid={`support.agent.item.${i + 1}`}
                >
                  <TableCell className="text-sm font-semibold font-body">
                    {agent.agent}
                  </TableCell>
                  <TableCell className="text-sm font-body">
                    {agent.resolved}
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {agent.avgTime}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      {agent.csat}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs ${agent.breach <= 2 ? "bg-green-100 text-green-700" : agent.breach <= 4 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}
                    >
                      {agent.breach}
                    </Badge>
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

// ============================================
// MAIN PAGE
// ============================================

function SupportHubDashboard() {
  const [createOpen, setCreateOpen] = useState(false);
  const [createAuntyOpen, setCreateAuntyOpen] = useState(false);

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-saffron/15 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-saffron" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Support Hub
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Complaint ticketing, SLA monitoring & CSAT — Choudhary Aunty
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 h-auto bg-muted/40 p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="text-xs font-body"
              data-ocid="support.overview.tab"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="customer"
              className="text-xs font-body"
              data-ocid="support.customer_tickets.tab"
            >
              Customer Tickets
            </TabsTrigger>
            <TabsTrigger
              value="aunty"
              className="text-xs font-body"
              data-ocid="support.aunty_tickets.tab"
            >
              Aunty Tickets
            </TabsTrigger>
            <TabsTrigger
              value="sla"
              className="text-xs font-body"
              data-ocid="support.sla_monitor.tab"
            >
              SLA Monitor
            </TabsTrigger>
            <TabsTrigger
              value="csat"
              className="text-xs font-body"
              data-ocid="support.csat_analytics.tab"
            >
              CSAT & Analytics
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" key="overview" asChild>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <OverviewTab />
              </motion.div>
            </TabsContent>
            <TabsContent value="customer" key="customer" asChild>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TicketTable
                  tickets={customerTickets}
                  onCreateTicket={() => setCreateOpen(true)}
                />
              </motion.div>
            </TabsContent>
            <TabsContent value="aunty" key="aunty" asChild>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TicketTable
                  tickets={auntyTickets}
                  isAunty
                  onCreateTicket={() => setCreateAuntyOpen(true)}
                />
              </motion.div>
            </TabsContent>
            <TabsContent value="sla" key="sla" asChild>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SlaMonitorTab />
              </motion.div>
            </TabsContent>
            <TabsContent value="csat" key="csat" asChild>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CsatAnalyticsTab />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      <CreateTicketModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <CreateTicketModal
        open={createAuntyOpen}
        onClose={() => setCreateAuntyOpen(false)}
        isAunty
      />
    </main>
  );
}

// ============================================
// PASSWORD GATE + PAGE EXPORT
// ============================================

export default function SupportHubPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === SUPPORT_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-4"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-7 h-7 text-saffron" />
              </div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Support Hub
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Choudhary Aunty — Support Operations
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="font-body text-xs mb-1.5 block">
                  Access Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    className="font-body pr-10"
                    data-ocid="support.password.input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p
                    className="text-destructive text-xs font-body mt-1.5"
                    data-ocid="support.password.error_state"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-saffron hover:bg-terracotta text-cream font-semibold"
                data-ocid="support.password.submit_button"
              >
                <Lock className="w-4 h-4 mr-2" />
                Access Support Hub
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    );
  }

  return <SupportHubDashboard />;
}
