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
import { Switch } from "@/components/ui/switch";
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
  AlertCircle,
  CheckCircle,
  Download,
  IndianRupee,
  Lock,
  MessageSquare,
  Plus,
  RefreshCw,
  Save,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-950/60 border border-blue-800/50 mb-4">
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            SMS / OTP Gateway
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
              data-ocid="sms-gateway.input"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect password
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white"
            data-ocid="sms-gateway.submit_button"
          >
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

const deliveryRateData = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 1}`,
  rate: 94 + Math.round(Math.random() * 5),
}));

const failureReasons = [
  { name: "Invalid number", value: 45, fill: "#ef4444" },
  { name: "DND registered", value: 28, fill: "#f97316" },
  { name: "Network timeout", value: 18, fill: "#eab308" },
  { name: "Operator rejection", value: 9, fill: "#8b5cf6" },
];

const otpByPage = [
  { page: "Login", count: 620 },
  { page: "Checkout", count: 340 },
  { page: "Profile", count: 180 },
  { page: "Password reset", count: 107 },
];

const campaigns = [
  {
    name: "Holi Festival Promo",
    audience: 5400,
    sent: 5400,
    delivered: 5292,
    failed: 108,
    date: "2026-03-08",
  },
  {
    name: "Win-Back — Inactive 30d",
    audience: 820,
    sent: 820,
    delivered: 789,
    failed: 31,
    date: "2026-03-01",
  },
  {
    name: "Diwali Bundle Reminder",
    audience: 12000,
    sent: 12000,
    delivered: 11520,
    failed: 480,
    date: "2026-02-20",
  },
];

const failedOtps = [
  {
    phone: "+91 98***4521",
    reason: "DND registered",
    time: "09:23 AM",
    retry: "Pending",
  },
  {
    phone: "+91 77***9902",
    reason: "Invalid number",
    time: "10:05 AM",
    retry: "Failed",
  },
  {
    phone: "+91 63***1184",
    reason: "Network timeout",
    time: "11:47 AM",
    retry: "Retried",
  },
  {
    phone: "+91 85***3370",
    reason: "Operator rejection",
    time: "01:12 PM",
    retry: "Pending",
  },
];

const monthlySpend = [
  { month: "Oct", spend: 2100 },
  { month: "Nov", spend: 2450 },
  { month: "Dec", spend: 3900 },
  { month: "Jan", spend: 3100 },
  { month: "Feb", spend: 3500 },
  { month: "Mar", spend: 3840 },
];

const templates = [
  {
    name: "Order Confirmed",
    text: "Hi {name}, your order #{id} is confirmed! Estimated delivery: {date}. — Choudhary Aunty",
  },
  {
    name: "Dispatch Update",
    text: "🚚 Your order #{id} has been dispatched. Track here: {link}",
  },
  {
    name: "Batch Reminder",
    text: "Hi {name}, your batch closes in 2 hours. Order now to secure your slot!",
  },
  {
    name: "Festival Promo",
    text: "🎉 Happy {festival}! Special discount: Use code {code} for 15% off. Valid till {date}",
  },
  {
    name: "Win-back",
    text: "We miss you, {name}! It's been a while. Come back and enjoy ₹50 off your next order.",
  },
  {
    name: "Payout Alert",
    text: "✅ Aunty {name}, your payout of ₹{amount} has been processed to your bank.",
  },
];

function SmsDashboard() {
  const [autoRetry, setAutoRetry] = useState(true);
  const [campaignOpen, setCampaignOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-blue-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              SMS / OTP Gateway Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              MSG91 primary · 2Factor backup · Textlocal tertiary
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            {
              label: "OTPs Sent Today",
              value: "1,247",
              icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
            },
            {
              label: "Delivery Rate",
              value: "97.3%",
              icon: <CheckCircle className="w-4 h-4 text-green-500" />,
            },
            {
              label: "Failed",
              value: "34",
              icon: <AlertCircle className="w-4 h-4 text-red-500" />,
            },
            {
              label: "Avg Delivery",
              value: "2.1s",
              icon: <Zap className="w-4 h-4 text-yellow-500" />,
            },
            {
              label: "Monthly Cost",
              value: "₹3,840",
              icon: <IndianRupee className="w-4 h-4 text-purple-500" />,
            },
            {
              label: "Provider Health",
              value: "Healthy",
              icon: <Shield className="w-4 h-4 text-green-500" />,
            },
          ].map((kpi, i) => (
            <Card
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              key={i}
              className="border-0 shadow-sm"
              data-ocid={`sms-gateway.kpi.card.${i + 1}`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  {kpi.icon}
                </div>
                <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
                <p className="text-xs text-slate-500">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="bg-blue-50 border border-blue-100 mb-4 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="overview" data-ocid="sms-gateway.overview.tab">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              data-ocid="sms-gateway.analytics.tab"
            >
              OTP Analytics
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              data-ocid="sms-gateway.campaigns.tab"
            >
              Campaign SMS
            </TabsTrigger>
            <TabsTrigger value="failures" data-ocid="sms-gateway.failures.tab">
              Failure Analysis
            </TabsTrigger>
            <TabsTrigger value="billing" data-ocid="sms-gateway.billing.tab">
              Cost & Billing
            </TabsTrigger>
            <TabsTrigger value="config" data-ocid="sms-gateway.config.tab">
              Configuration
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 — Overview */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    OTP Delivery Rate — Last 14 Days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={deliveryRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Provider Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      name: "MSG91",
                      role: "Primary",
                      status: "Healthy",
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      name: "2Factor",
                      role: "Backup",
                      status: "Standby",
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      name: "Textlocal",
                      role: "Tertiary",
                      status: "Inactive",
                      color: "bg-slate-100 text-slate-600",
                    },
                  ].map((p, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={i}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.role}</p>
                      </div>
                      <Badge className={`text-xs ${p.color}`}>{p.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2 — OTP Analytics */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Failure Reason Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={failureReasons}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {failureReasons.map((entry, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">
                    OTP Requests by Page
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={otpByPage}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="page" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 3 — Campaign SMS */}
          <TabsContent value="campaigns">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">SMS Campaigns</CardTitle>
                <Dialog open={campaignOpen} onOpenChange={setCampaignOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="gap-2 bg-blue-700 hover:bg-blue-600 text-white"
                      data-ocid="sms-gateway.campaigns.open_modal_button"
                    >
                      <Plus className="w-4 h-4" /> Create Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-ocid="sms-gateway.campaigns.dialog">
                    <DialogHeader>
                      <DialogTitle>New SMS Campaign</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <Label>Campaign Name</Label>
                        <Input
                          placeholder="e.g. Holi Festival Promo"
                          data-ocid="sms-gateway.campaign.input"
                        />
                      </div>
                      <div>
                        <Label>Template</Label>
                        <Select>
                          <SelectTrigger data-ocid="sms-gateway.template.select">
                            <SelectValue placeholder="Pick template" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map((t) => (
                              <SelectItem key={t.name} value={t.name}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Message</Label>
                        <Textarea
                          rows={3}
                          placeholder="Compose or paste template"
                          data-ocid="sms-gateway.message.textarea"
                        />
                      </div>
                      <div>
                        <Label>Schedule</Label>
                        <Input
                          type="datetime-local"
                          data-ocid="sms-gateway.schedule.input"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setCampaignOpen(false)}
                        data-ocid="sms-gateway.campaign.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-blue-700 hover:bg-blue-600 text-white"
                        onClick={() => {
                          toast.success("Campaign scheduled!");
                          setCampaignOpen(false);
                        }}
                        data-ocid="sms-gateway.campaign.confirm_button"
                      >
                        Schedule
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="sms-gateway.campaigns.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Delivered</TableHead>
                      <TableHead>Failed</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((c, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        data-ocid={`sms-gateway.campaigns.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {c.name}
                        </TableCell>
                        <TableCell>{c.audience.toLocaleString()}</TableCell>
                        <TableCell>{c.sent.toLocaleString()}</TableCell>
                        <TableCell className="text-green-700">
                          {c.delivered.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {c.failed}
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {c.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Template Library</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-3">
                {templates.map((t, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={i}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                    data-ocid={`sms-gateway.templates.card.${i + 1}`}
                  >
                    <p className="font-semibold text-sm mb-1">{t.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4 — Failure Analysis */}
          <TabsContent value="failures">
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Failed OTPs</CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Auto-retry</span>
                    <Switch
                      checked={autoRetry}
                      onCheckedChange={setAutoRetry}
                      data-ocid="sms-gateway.autoretry.switch"
                    />
                  </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table data-ocid="sms-gateway.failures.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Phone</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Retry Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {failedOtps.map((f, i) => (
                        <TableRow
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          key={i}
                          data-ocid={`sms-gateway.failures.row.${i + 1}`}
                        >
                          <TableCell className="font-mono text-sm">
                            {f.phone}
                          </TableCell>
                          <TableCell className="text-sm">{f.reason}</TableCell>
                          <TableCell className="text-sm text-slate-500">
                            {f.time}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${f.retry === "Retried" ? "bg-green-100 text-green-800" : f.retry === "Failed" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                            >
                              {f.retry}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs gap-1"
                              data-ocid={`sms-gateway.failures.secondary_button.${i + 1}`}
                            >
                              <RefreshCw className="w-3 h-3" /> Retry
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 5 — Cost & Billing */}
          <TabsContent value="billing">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Monthly Spend (₹)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlySpend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => [`₹${v}`, "Spend"]} />
                      <Bar
                        dataKey="spend"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Invoice History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    {
                      month: "March 2026",
                      amount: "₹3,840",
                      status: "Current",
                    },
                    {
                      month: "February 2026",
                      amount: "₹3,500",
                      status: "Paid",
                    },
                    { month: "January 2026", amount: "₹3,100", status: "Paid" },
                  ].map((inv, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={i}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">{inv.month}</p>
                        <p className="text-xs text-slate-500">{inv.amount}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${inv.status === "Paid" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {inv.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1"
                          data-ocid={`sms-gateway.invoice.primary_button.${i + 1}`}
                        >
                          <Download className="w-3 h-3" /> PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 6 — Configuration */}
          <TabsContent value="config">
            <Card className="border-0 shadow-sm max-w-xl">
              <CardHeader>
                <CardTitle className="text-sm">Gateway Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1">
                  <Label>OTP Expiry Time</Label>
                  <Select defaultValue="10">
                    <SelectTrigger data-ocid="sms-gateway.expiry.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Max OTP Attempts</Label>
                  <Input
                    type="number"
                    defaultValue="3"
                    min="1"
                    max="5"
                    data-ocid="sms-gateway.maxattempts.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Sender ID</Label>
                  <Input
                    defaultValue="CHAUAU"
                    data-ocid="sms-gateway.senderid.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Webhook URL for Delivery Receipts</Label>
                  <Input
                    placeholder="https://api.choudharyaunty.com/sms/webhook"
                    data-ocid="sms-gateway.webhook.input"
                  />
                </div>
                <Button
                  className="gap-2 bg-blue-700 hover:bg-blue-600 text-white"
                  onClick={() => toast.success("Settings saved!")}
                  data-ocid="sms-gateway.config.save_button"
                >
                  <Save className="w-4 h-4" /> Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function SmsGatewayPage() {
  const [authenticated, setAuthenticated] = useState(false);
  if (!authenticated)
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  return <SmsDashboard />;
}
