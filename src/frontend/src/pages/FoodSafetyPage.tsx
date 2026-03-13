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
  CheckCircle,
  Clock,
  Download,
  FileText,
  Lock,
  Shield,
  Upload,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
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
import { toast } from "sonner";

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
          <h1 className="text-2xl font-bold text-white mb-1">Food Safety</h1>
          <p className="text-slate-400 text-sm">
            Restricted access — admin only
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              type="password"
              placeholder="Enter access password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
              data-ocid="food-safety.input"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect password
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-600 text-white"
            data-ocid="food-safety.submit_button"
          >
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

const severityColor: Record<string, string> = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-green-100 text-green-800 border-green-200",
};

const statusColor: Record<string, string> = {
  Reported: "bg-slate-100 text-slate-800",
  Investigating: "bg-blue-100 text-blue-800",
  Escalated: "bg-red-100 text-red-800",
  Resolved: "bg-green-100 text-green-800",
};

const incidents = [
  {
    id: "INC-001",
    date: "2026-03-10",
    customer: "Priya Sharma",
    aunty: "Meena Devi",
    product: "Aloo Paratha",
    severity: "Critical",
    status: "Escalated",
    description: "Suspected food poisoning after consuming product",
  },
  {
    id: "INC-002",
    date: "2026-03-08",
    customer: "Rahul Gupta",
    aunty: "Sunita Yadav",
    product: "Mango Pickle",
    severity: "Medium",
    status: "Investigating",
    description: "Foreign object found in packaging",
  },
  {
    id: "INC-003",
    date: "2026-03-05",
    customer: "Anjali Singh",
    aunty: "Rekha Verma",
    product: "Kheer",
    severity: "Low",
    status: "Reported",
    description: "Product smell unusual on opening",
  },
  {
    id: "INC-004",
    date: "2026-03-01",
    customer: "Vikram Patel",
    aunty: "Geeta Kumari",
    product: "Bihari Litti",
    severity: "High",
    status: "Investigating",
    description: "Allergic reaction reported",
  },
];

const resolvedIncidents = [
  {
    id: "INC-000",
    date: "2026-02-20",
    customer: "Sonal Mehta",
    aunty: "Asha Bai",
    product: "Dal Baati",
    severity: "High",
    outcome: "Aunty Reinstated",
    compensation: "₹500",
  },
  {
    id: "INC-REJ",
    date: "2026-02-10",
    customer: "Deepak Joshi",
    aunty: "Kamla Devi",
    product: "Gond Ladoo",
    severity: "Critical",
    outcome: "Aunty Removed",
    compensation: "₹1,200",
  },
  {
    id: "INC-NA",
    date: "2026-01-28",
    customer: "Ritu Agarwal",
    aunty: "Parvati Singh",
    product: "Sattu Drink",
    severity: "Low",
    outcome: "No Action",
    compensation: "—",
  },
];

const monthlyData = [
  { month: "Oct", incidents: 2 },
  { month: "Nov", incidents: 1 },
  { month: "Dec", incidents: 3 },
  { month: "Jan", incidents: 2 },
  { month: "Feb", incidents: 4 },
  { month: "Mar", incidents: 3 },
];

const escalationSteps = [
  {
    step: 1,
    title: "Incident Reported",
    desc: "Auto-acknowledge within 2 hours",
    owner: "System",
    sla: "2h",
    done: true,
  },
  {
    step: 2,
    title: "Initial Assessment",
    desc: "Ops reviews and classifies severity",
    owner: "Ops Team",
    sla: "4h",
    done: true,
  },
  {
    step: 3,
    title: "Aunty Notified & Suspended",
    desc: "Temporary suspension, batch hold placed",
    owner: "Ops Team",
    sla: "6h",
    done: true,
  },
  {
    step: 4,
    title: "Evidence Collection",
    desc: "Photos, customer statement, batch records",
    owner: "Ops + Customer",
    sla: "24h",
    done: false,
  },
  {
    step: 5,
    title: "Health Authority Notification",
    desc: "If Critical — FSSAI/local food authority",
    owner: "Compliance Team",
    sla: "48h",
    done: false,
  },
  {
    step: 6,
    title: "Investigation & Lab Test",
    desc: "Lab analysis if required",
    owner: "External Lab",
    sla: "72h",
    done: false,
  },
  {
    step: 7,
    title: "Resolution",
    desc: "Aunty reinstated or removed, customer compensated",
    owner: "Admin",
    sla: "96h",
    done: false,
  },
];

function FoodSafetyDashboard() {
  const [reportForm, setReportForm] = useState({
    customerName: "",
    phone: "",
    orderId: "",
    auntyName: "",
    product: "",
    incidentDate: "",
    description: "",
    severity: "",
  });

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Incident reported successfully. Ops team notified.");
    setReportForm({
      customerName: "",
      phone: "",
      orderId: "",
      auntyName: "",
      product: "",
      incidentDate: "",
      description: "",
      severity: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-orange-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Food Safety Incident Manager
            </h1>
            <p className="text-sm text-slate-500">
              Track, investigate and resolve food safety incidents
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Open Incidents",
              value: "3",
              icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
              color: "text-orange-600",
            },
            {
              label: "Critical",
              value: "1",
              icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
              color: "text-red-600",
            },
            {
              label: "Avg Resolution",
              value: "18h",
              icon: <Clock className="w-5 h-5 text-blue-500" />,
              color: "text-blue-600",
            },
            {
              label: "Aunties Suspended",
              value: "1",
              icon: <Users className="w-5 h-5 text-purple-500" />,
              color: "text-purple-600",
            },
          ].map(
            (
              kpi,
              i, // biome-ignore lint/suspicious/noArrayIndexKey: static list
            ) => (
              <Card
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
                className="border-0 shadow-sm"
                data-ocid={`food-safety.card.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {kpi.icon}
                    <span className="text-xs text-slate-500">{kpi.label}</span>
                  </div>
                  <p className={`text-2xl font-bold ${kpi.color}`}>
                    {kpi.value}
                  </p>
                </CardContent>
              </Card>
            ),
          )}
        </div>

        <Tabs defaultValue="incidents">
          <TabsList className="bg-orange-50 border border-orange-100 mb-4 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="incidents"
              data-ocid="food-safety.incidents.tab"
            >
              Active Incidents
            </TabsTrigger>
            <TabsTrigger value="report" data-ocid="food-safety.report.tab">
              Report Incident
            </TabsTrigger>
            <TabsTrigger value="protocol" data-ocid="food-safety.protocol.tab">
              Escalation Protocol
            </TabsTrigger>
            <TabsTrigger value="history" data-ocid="food-safety.history.tab">
              Incident History
            </TabsTrigger>
            <TabsTrigger
              value="compliance"
              data-ocid="food-safety.compliance.tab"
            >
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 — Active Incidents */}
          <TabsContent value="incidents">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Active Incidents</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="food-safety.incidents.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Aunty</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((inc, i) => (
                      <TableRow
                        key={inc.id}
                        data-ocid={`food-safety.incidents.row.${i + 1}`}
                      >
                        <TableCell className="font-mono text-xs">
                          {inc.id}
                        </TableCell>
                        <TableCell className="text-sm">{inc.date}</TableCell>
                        <TableCell className="text-sm">
                          {inc.customer}
                        </TableCell>
                        <TableCell className="text-sm">{inc.aunty}</TableCell>
                        <TableCell className="text-sm">{inc.product}</TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs border ${severityColor[inc.severity]}`}
                          >
                            {inc.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${statusColor[inc.status]}`}
                          >
                            {inc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              data-ocid={`food-safety.incidents.edit_button.${i + 1}`}
                            >
                              View
                            </Button>
                            {inc.status !== "Resolved" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white"
                                data-ocid={`food-safety.incidents.primary_button.${i + 1}`}
                              >
                                Escalate
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
          </TabsContent>

          {/* Tab 2 — Report Incident */}
          <TabsContent value="report">
            <Card className="border-0 shadow-sm max-w-2xl">
              <CardHeader>
                <CardTitle className="text-base">Report New Incident</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReport} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Customer Name</Label>
                      <Input
                        value={reportForm.customerName}
                        onChange={(e) =>
                          setReportForm((p) => ({
                            ...p,
                            customerName: e.target.value,
                          }))
                        }
                        placeholder="Full name"
                        data-ocid="food-safety.report.input"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Phone Number</Label>
                      <Input
                        value={reportForm.phone}
                        onChange={(e) =>
                          setReportForm((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+91 98xxx"
                        data-ocid="food-safety.phone.input"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Order ID</Label>
                      <Input
                        value={reportForm.orderId}
                        onChange={(e) =>
                          setReportForm((p) => ({
                            ...p,
                            orderId: e.target.value,
                          }))
                        }
                        placeholder="ORD-XXXX"
                        data-ocid="food-safety.orderid.input"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Aunty Name</Label>
                      <Input
                        value={reportForm.auntyName}
                        onChange={(e) =>
                          setReportForm((p) => ({
                            ...p,
                            auntyName: e.target.value,
                          }))
                        }
                        placeholder="Chef name"
                        data-ocid="food-safety.auntyname.input"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Product</Label>
                      <Input
                        value={reportForm.product}
                        onChange={(e) =>
                          setReportForm((p) => ({
                            ...p,
                            product: e.target.value,
                          }))
                        }
                        placeholder="Product name"
                        data-ocid="food-safety.product.input"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Incident Date</Label>
                      <Input
                        type="date"
                        value={reportForm.incidentDate}
                        onChange={(e) =>
                          setReportForm((p) => ({
                            ...p,
                            incidentDate: e.target.value,
                          }))
                        }
                        data-ocid="food-safety.date.input"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Description</Label>
                    <Textarea
                      value={reportForm.description}
                      onChange={(e) =>
                        setReportForm((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe the incident in detail..."
                      rows={4}
                      data-ocid="food-safety.description.textarea"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Severity</Label>
                      <Select
                        value={reportForm.severity}
                        onValueChange={(v) =>
                          setReportForm((p) => ({ ...p, severity: v }))
                        }
                      >
                        <SelectTrigger data-ocid="food-safety.severity.select">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">
                            Critical — Possible poisoning
                          </SelectItem>
                          <SelectItem value="High">
                            High — Allergic reaction
                          </SelectItem>
                          <SelectItem value="Medium">
                            Medium — Foreign object
                          </SelectItem>
                          <SelectItem value="Low">
                            Low — Quality issue
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Evidence (photos/documents)</Label>
                      <div
                        className="border-2 border-dashed border-slate-200 rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:border-orange-300 transition-colors"
                        data-ocid="food-safety.evidence.dropzone"
                      >
                        <Upload className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-500">
                          Click to upload files
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-red-700 hover:bg-red-600 text-white"
                    data-ocid="food-safety.report.submit_button"
                  >
                    Submit Incident Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3 — Escalation Protocol */}
          <TabsContent value="protocol">
            <Card className="border-0 shadow-sm max-w-3xl">
              <CardHeader>
                <CardTitle className="text-base">Escalation Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {escalationSteps.map((step, i) => (
                    <div
                      key={step.step}
                      className="flex gap-4 pb-8 relative"
                      data-ocid={`food-safety.protocol.item.${i + 1}`}
                    >
                      {i < escalationSteps.length - 1 && (
                        <div className="absolute left-5 top-10 w-0.5 h-full bg-slate-200" />
                      )}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                          step.done ? "bg-green-500" : "bg-slate-200"
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-sm font-bold text-slate-600">
                            {step.step}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {step.title}
                            </h3>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {step.desc}
                            </p>
                            <div className="flex gap-4 mt-2">
                              <span className="text-xs text-slate-400">
                                Owner:{" "}
                                <span className="text-slate-600">
                                  {step.owner}
                                </span>
                              </span>
                              <span className="text-xs text-slate-400">
                                SLA:{" "}
                                <span className="text-slate-600">
                                  {step.sla}
                                </span>
                              </span>
                            </div>
                          </div>
                          {!step.done && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 flex-shrink-0"
                              data-ocid={`food-safety.protocol.secondary_button.${i + 1}`}
                            >
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4 — Incident History */}
          <TabsContent value="history">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Resolved Incidents</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-ocid="food-safety.history.primary_button"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </Button>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="food-safety.history.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Aunty</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Outcome</TableHead>
                      <TableHead>Compensation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resolvedIncidents.map((inc, i) => (
                      <TableRow
                        key={inc.id}
                        data-ocid={`food-safety.history.row.${i + 1}`}
                      >
                        <TableCell className="font-mono text-xs">
                          {inc.id}
                        </TableCell>
                        <TableCell className="text-sm">{inc.date}</TableCell>
                        <TableCell className="text-sm">
                          {inc.customer}
                        </TableCell>
                        <TableCell className="text-sm">{inc.aunty}</TableCell>
                        <TableCell className="text-sm">{inc.product}</TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs border ${severityColor[inc.severity]}`}
                          >
                            {inc.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {inc.outcome}
                        </TableCell>
                        <TableCell className="text-sm">
                          {inc.compensation}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5 — Compliance */}
          <TabsContent value="compliance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Monthly Incident Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar
                        dataKey="incidents"
                        fill="#dc2626"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    FSSAI Reporting Obligations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      rule: "Critical incidents must be reported to FSSAI within 48 hours",
                      met: true,
                    },
                    {
                      rule: "Monthly summary report to local food authority",
                      met: true,
                    },
                    { rule: "Maintain incident log for 3 years", met: true },
                    {
                      rule: "Lab test results to be filed if illness suspected",
                      met: false,
                    },
                  ].map((item, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.met ? "bg-green-100" : "bg-orange-100"}`}
                      >
                        {item.met ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-orange-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-700">{item.rule}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">
                    Auto-Generated Incident Report — March 2026
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    data-ocid="food-safety.compliance.primary_button"
                  >
                    <FileText className="w-4 h-4" /> Download PDF
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 space-y-2 border border-slate-200">
                    <p className="font-semibold">
                      Choudhary Aunty Platform — Food Safety Incident Report
                    </p>
                    <p>Period: 01 March 2026 – 13 March 2026</p>
                    <p>Total Incidents Reported: 4</p>
                    <p>Critical: 1 | High: 1 | Medium: 1 | Low: 1</p>
                    <p>Aunties Temporarily Suspended: 1</p>
                    <p>Escalated to FSSAI: 1 (INC-001)</p>
                    <p>Customer Compensation Issued: ₹0 (pending)</p>
                    <p className="text-slate-400 italic">
                      Report generated automatically. Subject to ops review
                      before submission.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function FoodSafetyPage() {
  const [authenticated, setAuthenticated] = useState(false);
  if (!authenticated)
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  return <FoodSafetyDashboard />;
}
