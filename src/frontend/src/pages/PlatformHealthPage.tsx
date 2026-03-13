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
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  Lock,
  Plus,
  RefreshCw,
  Server,
  Shield,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
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
    if (pw === "amar2026") onSuccess();
    else {
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-950/60 border border-green-800/50 mb-4">
            <Server className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Platform Health Monitor
          </h1>
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
              data-ocid="platform-health.input"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect password
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-white"
            data-ocid="platform-health.submit_button"
          >
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

const services = [
  { name: "Frontend App", status: "Operational", latency: "120ms" },
  { name: "Backend Canister", status: "Operational", latency: "85ms" },
  { name: "Order API", status: "Operational", latency: "95ms" },
  { name: "Authentication", status: "Operational", latency: "60ms" },
  {
    name: "Payment Gateway (Razorpay)",
    status: "Operational",
    latency: "210ms",
  },
  { name: "WhatsApp Integration", status: "Degraded", latency: "1240ms" },
  { name: "Shiprocket Logistics", status: "Operational", latency: "155ms" },
  { name: "SMS Gateway", status: "Operational", latency: "78ms" },
];

const uptimeData = [
  { service: "Frontend App", jan: 99.98, feb: 100, mar: 99.9 },
  { service: "Backend Canister", jan: 99.95, feb: 99.87, mar: 99.92 },
  { service: "Order API", jan: 99.9, feb: 99.8, mar: 99.88 },
  { service: "Authentication", jan: 100, feb: 100, mar: 99.97 },
  { service: "Razorpay", jan: 99.8, feb: 98.9, mar: 99.7 },
  { service: "WhatsApp", jan: 98.5, feb: 97.2, mar: 95.4 },
  { service: "Shiprocket", jan: 99.6, feb: 99.2, mar: 99.1 },
  { service: "SMS Gateway", jan: 99.99, feb: 99.95, mar: 99.98 },
];

const incidentsByMonth = [
  { month: "Oct", count: 1 },
  { month: "Nov", count: 0 },
  { month: "Dec", count: 2 },
  { month: "Jan", count: 1 },
  { month: "Feb", count: 3 },
  { month: "Mar", count: 1 },
];

const apiMetrics = [
  {
    endpoint: "POST /orders",
    avg: 95,
    p95: 210,
    p99: 480,
    calls: 3840,
    errorRate: "0.2%",
  },
  {
    endpoint: "GET /products",
    avg: 42,
    p95: 120,
    p99: 230,
    calls: 12400,
    errorRate: "0.0%",
  },
  {
    endpoint: "GET /makers",
    avg: 55,
    p95: 140,
    p99: 290,
    calls: 9800,
    errorRate: "0.0%",
  },
  {
    endpoint: "POST /auth/login",
    avg: 68,
    p95: 180,
    p99: 350,
    calls: 2100,
    errorRate: "0.4%",
  },
  {
    endpoint: "GET /orders/:id",
    avg: 35,
    p95: 90,
    p99: 160,
    calls: 5600,
    errorRate: "0.1%",
  },
];

const respTimeTrend = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  orders: 85 + Math.round(Math.random() * 30),
  products: 38 + Math.round(Math.random() * 20),
  auth: 60 + Math.round(Math.random() * 25),
  makers: 48 + Math.round(Math.random() * 20),
}));

const errorLog = [
  {
    time: "2026-03-13 09:12",
    service: "WhatsApp",
    code: "408",
    message: "Connection timeout to Meta API",
    freq: 14,
    status: "Active",
  },
  {
    time: "2026-03-12 22:44",
    service: "Razorpay",
    code: "502",
    message: "Bad gateway on payment capture",
    freq: 3,
    status: "Active",
  },
  {
    time: "2026-03-12 18:30",
    service: "SMS Gateway",
    code: "429",
    message: "Rate limit exceeded",
    freq: 8,
    status: "Resolved",
  },
  {
    time: "2026-03-11 14:55",
    service: "Order API",
    code: "500",
    message: "Internal error on order update",
    freq: 1,
    status: "Resolved",
  },
];

const alertRules = [
  {
    metric: "Error Rate",
    operator: ">",
    threshold: "1%",
    current: "0.2%",
    status: "Active",
  },
  {
    metric: "Response Time",
    operator: ">",
    threshold: "500ms",
    current: "95ms",
    status: "Active",
  },
  {
    metric: "Uptime",
    operator: "<",
    threshold: "99%",
    current: "99.6%",
    status: "Paused",
  },
  {
    metric: "Failed OTPs",
    operator: ">",
    threshold: "50/hr",
    current: "14/hr",
    status: "Active",
  },
];

const pastIncidents = [
  {
    date: "2026-02-28",
    service: "Razorpay",
    duration: "23 min",
    severity: "High",
    cause: "Razorpay API downtime",
    resolution: "Failover to manual confirmation",
  },
  {
    date: "2026-02-14",
    service: "WhatsApp",
    duration: "1h 10min",
    severity: "Critical",
    cause: "Meta outage in SEA region",
    resolution: "Queued messages auto-sent on restore",
  },
  {
    date: "2026-01-05",
    service: "Backend Canister",
    duration: "8 min",
    severity: "Medium",
    cause: "ICP subnet upgrade",
    resolution: "Auto-recovered on upgrade completion",
  },
];

function HealthDashboard() {
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState("Just now");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState(errorLog);

  const runCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setLastChecked(new Date().toLocaleTimeString());
      toast.success("Health check complete — all systems nominal");
    }, 2000);
  };

  const resolveError = (i: number) => {
    setErrors((prev) =>
      prev.map((e, idx) => (idx === i ? { ...e, status: "Resolved" } : e)),
    );
    toast.success("Error marked as resolved");
  };

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-green-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Platform Health Monitor
            </h1>
            <p className="text-sm text-slate-500">
              Real-time uptime, API performance & incident tracking
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="live">
          <TabsList className="bg-green-50 border border-green-100 mb-4 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="live" data-ocid="platform-health.live.tab">
              Live Status
            </TabsTrigger>
            <TabsTrigger value="uptime" data-ocid="platform-health.uptime.tab">
              Uptime
            </TabsTrigger>
            <TabsTrigger value="api" data-ocid="platform-health.api.tab">
              API Performance
            </TabsTrigger>
            <TabsTrigger value="errors" data-ocid="platform-health.errors.tab">
              Error Log
            </TabsTrigger>
            <TabsTrigger value="alerts" data-ocid="platform-health.alerts.tab">
              Alert Config
            </TabsTrigger>
            <TabsTrigger
              value="history"
              data-ocid="platform-health.history.tab"
            >
              Incident History
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 — Live Status */}
          <TabsContent value="live">
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">
                    All Systems Operational
                  </p>
                  <p className="text-sm text-green-700">
                    1 service degraded — WhatsApp Integration
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  Last checked: {lastChecked}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={runCheck}
                  disabled={checking}
                  className="gap-2"
                  data-ocid="platform-health.live.primary_button"
                >
                  {checking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {checking ? "Checking..." : "Run Health Check"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map((svc, i) => (
                <Card
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  key={i}
                  className="border-0 shadow-sm"
                  data-ocid={`platform-health.services.card.${i + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-800">
                        {svc.name}
                      </p>
                      {svc.status === "Operational" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <Badge
                      className={`text-xs ${svc.status === "Operational" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {svc.status}
                    </Badge>
                    <p className="text-xs text-slate-400 mt-1">
                      Latency: {svc.latency}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 2 — Uptime */}
          <TabsContent value="uptime">
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Monthly Uptime % by Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table data-ocid="platform-health.uptime.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>January</TableHead>
                        <TableHead>February</TableHead>
                        <TableHead>March</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uptimeData.map((row, i) => {
                        const getColor = (v: number) =>
                          v >= 99.5
                            ? "text-green-700 font-semibold"
                            : v >= 98
                              ? "text-yellow-700 font-semibold"
                              : "text-red-700 font-semibold";
                        return (
                          <TableRow
                            // biome-ignore lint/suspicious/noArrayIndexKey: static list
                            key={i}
                            data-ocid={`platform-health.uptime.row.${i + 1}`}
                          >
                            <TableCell className="font-medium text-sm">
                              {row.service}
                            </TableCell>
                            <TableCell
                              className={`text-sm ${getColor(row.jan)}`}
                            >
                              {row.jan}%
                            </TableCell>
                            <TableCell
                              className={`text-sm ${getColor(row.feb)}`}
                            >
                              {row.feb}%
                            </TableCell>
                            <TableCell
                              className={`text-sm ${getColor(row.mar)}`}
                            >
                              {row.mar}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Incident Count by Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={incidentsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#f97316"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 3 — API Performance */}
          <TabsContent value="api">
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">API Response Times</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table data-ocid="platform-health.api.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Avg (ms)</TableHead>
                        <TableHead>p95 (ms)</TableHead>
                        <TableHead>p99 (ms)</TableHead>
                        <TableHead>Calls/24h</TableHead>
                        <TableHead>Error Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiMetrics.map((row, i) => (
                        <TableRow
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          key={i}
                          data-ocid={`platform-health.api.row.${i + 1}`}
                        >
                          <TableCell className="font-mono text-xs">
                            {row.endpoint}
                          </TableCell>
                          <TableCell className="text-sm">{row.avg}</TableCell>
                          <TableCell className="text-sm">{row.p95}</TableCell>
                          <TableCell className="text-sm">{row.p99}</TableCell>
                          <TableCell className="text-sm">
                            {row.calls.toLocaleString()}
                          </TableCell>
                          <TableCell
                            className={`text-sm ${Number.parseFloat(row.errorRate) > 0.3 ? "text-orange-600 font-medium" : "text-green-600"}`}
                          >
                            {row.errorRate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Response Time Trend — Last 7 Days (ms)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={respTimeTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                        name="Orders"
                      />
                      <Line
                        type="monotone"
                        dataKey="products"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                        name="Products"
                      />
                      <Line
                        type="monotone"
                        dataKey="auth"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="Auth"
                      />
                      <Line
                        type="monotone"
                        dataKey="makers"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                        name="Makers"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 4 — Error Log */}
          <TabsContent value="errors">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Error Feed</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="platform-health.errors.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Freq</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errors.map((err, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        data-ocid={`platform-health.errors.row.${i + 1}`}
                      >
                        <TableCell className="text-xs font-mono">
                          {err.time}
                        </TableCell>
                        <TableCell className="text-sm">{err.service}</TableCell>
                        <TableCell>
                          <Badge className="text-xs bg-red-100 text-red-800">
                            {err.code}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm max-w-xs truncate">
                          {err.message}
                        </TableCell>
                        <TableCell className="text-sm">{err.freq}</TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${err.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {err.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {err.status === "Active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => resolveError(i)}
                              data-ocid={`platform-health.errors.secondary_button.${i + 1}`}
                            >
                              Resolve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5 — Alert Config */}
          <TabsContent value="alerts">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Alert Rules</CardTitle>
                <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="gap-2 bg-green-700 hover:bg-green-600 text-white"
                      data-ocid="platform-health.alerts.open_modal_button"
                    >
                      <Plus className="w-4 h-4" /> Add Alert Rule
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-ocid="platform-health.alerts.dialog">
                    <DialogHeader>
                      <DialogTitle>Add Alert Rule</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <Label>Metric</Label>
                        <Select>
                          <SelectTrigger data-ocid="platform-health.alert.select">
                            <SelectValue placeholder="Select metric" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="error_rate">
                              Error Rate
                            </SelectItem>
                            <SelectItem value="response_time">
                              Response Time
                            </SelectItem>
                            <SelectItem value="uptime">Uptime</SelectItem>
                            <SelectItem value="failed_otps">
                              Failed OTPs
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Threshold</Label>
                        <Input
                          placeholder="e.g. 500ms or 1%"
                          data-ocid="platform-health.alert.input"
                        />
                      </div>
                      <div>
                        <Label>Notify via</Label>
                        <Select>
                          <SelectTrigger data-ocid="platform-health.channel.select">
                            <SelectValue placeholder="Notification channel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setAlertOpen(false)}
                        data-ocid="platform-health.alert.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-green-700 hover:bg-green-600 text-white"
                        onClick={() => {
                          toast.success("Alert rule added!");
                          setAlertOpen(false);
                        }}
                        data-ocid="platform-health.alert.confirm_button"
                      >
                        Save Rule
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="platform-health.alertrules.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertRules.map((rule, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        data-ocid={`platform-health.alertrules.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {rule.metric}
                        </TableCell>
                        <TableCell className="text-sm">
                          {rule.operator}
                        </TableCell>
                        <TableCell className="text-sm">
                          {rule.threshold}
                        </TableCell>
                        <TableCell className="text-sm text-green-700">
                          {rule.current}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${rule.status === "Active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}`}
                          >
                            {rule.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              data-ocid={`platform-health.alertrules.edit_button.${i + 1}`}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs text-red-600 hover:text-red-700"
                              data-ocid={`platform-health.alertrules.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 6 — Incident History */}
          <TabsContent value="history">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {[
                {
                  label: "Total Incidents (6mo)",
                  value: "7",
                  icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
                },
                {
                  label: "MTTR",
                  value: "31 min",
                  icon: <Clock className="w-5 h-5 text-blue-500" />,
                },
                {
                  label: "Severity: Critical",
                  value: "1",
                  icon: <XCircle className="w-5 h-5 text-red-500" />,
                },
              ].map((kpi, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {kpi.icon}
                      <span className="text-xs text-slate-500">
                        {kpi.label}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {kpi.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">
                  Past Incidents Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastIncidents.map((inc, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={i}
                      className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
                      data-ocid={`platform-health.history.item.${i + 1}`}
                    >
                      <div
                        className={`w-2 rounded-full flex-shrink-0 ${
                          inc.severity === "Critical"
                            ? "bg-red-500"
                            : inc.severity === "High"
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-sm">
                              {inc.service}
                            </p>
                            <p className="text-xs text-slate-500">
                              {inc.date} · Duration: {inc.duration}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs flex-shrink-0 ${
                              inc.severity === "Critical"
                                ? "bg-red-100 text-red-800"
                                : inc.severity === "High"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {inc.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          <span className="font-medium">Root cause:</span>{" "}
                          {inc.cause}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Resolution:</span>{" "}
                          {inc.resolution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function PlatformHealthPage() {
  const [authenticated, setAuthenticated] = useState(false);
  if (!authenticated)
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  return <HealthDashboard />;
}
