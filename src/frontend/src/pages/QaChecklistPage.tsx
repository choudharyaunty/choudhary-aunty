import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CheckCircle,
  CheckSquare,
  Download,
  Lock,
  MessageCircle,
  RefreshCw,
  Shield,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-800/50 mb-4">
            <CheckSquare className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">QA Checklist</h1>
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
              data-ocid="qa-checklist.input"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect password
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-600 text-white"
            data-ocid="qa-checklist.submit_button"
          >
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

interface ChecklistItem {
  criterion: string;
  pts: number;
  passed: boolean;
}

const checklistTemplate: {
  category: string;
  pts: number;
  items: { criterion: string; pts: number }[];
}[] = [
  {
    category: "Kitchen & Hygiene",
    pts: 30,
    items: [
      { criterion: "Kitchen photos uploaded (clear, well-lit)", pts: 10 },
      { criterion: "Clean workspace visible in photos", pts: 10 },
      { criterion: "No pets or children visible in food prep area", pts: 10 },
    ],
  },
  {
    category: "Compliance",
    pts: 25,
    items: [
      { criterion: "FSSAI registration number verified", pts: 15 },
      { criterion: "FSSAI certificate uploaded and valid", pts: 10 },
    ],
  },
  {
    category: "Profile Completeness",
    pts: 20,
    items: [
      { criterion: "Bio written (min 50 words)", pts: 5 },
      { criterion: "Profile photo uploaded", pts: 5 },
      { criterion: "Phone verified", pts: 5 },
      { criterion: "Bank account verified", pts: 5 },
    ],
  },
  {
    category: "Product Quality",
    pts: 25,
    items: [
      { criterion: "Minimum 1 product listed", pts: 5 },
      { criterion: "Each product has minimum 2 photos", pts: 10 },
      { criterion: "Product descriptions complete", pts: 5 },
      { criterion: "Pricing set (not zero)", pts: 5 },
    ],
  },
];

const pendingAunties = [
  {
    name: "Kavita Mishra",
    state: "Bihar",
    products: 4,
    submitted: "2026-03-10",
    score: 72,
  },
  {
    name: "Savita Pandey",
    state: "UP",
    products: 2,
    submitted: "2026-03-09",
    score: 55,
  },
  {
    name: "Leela Sharma",
    state: "Bihar",
    products: 6,
    submitted: "2026-03-08",
    score: 88,
  },
  {
    name: "Jamna Devi",
    state: "Rajasthan",
    products: 3,
    submitted: "2026-03-07",
    score: 61,
  },
];

const approvedAunties = [
  {
    name: "Meena Devi",
    state: "Bihar",
    score: 92,
    approvedDate: "2026-03-01",
    reviewer: "Admin Amar",
  },
  {
    name: "Sunita Yadav",
    state: "UP",
    score: 85,
    approvedDate: "2026-02-28",
    reviewer: "Admin Priya",
  },
  {
    name: "Rekha Verma",
    state: "Bihar",
    score: 78,
    approvedDate: "2026-02-25",
    reviewer: "Admin Amar",
  },
  {
    name: "Geeta Kumari",
    state: "MP",
    score: 90,
    approvedDate: "2026-02-20",
    reviewer: "Admin Priya",
  },
];

const rejectedAunties = [
  {
    name: "Rita Singh",
    state: "Bihar",
    score: 42,
    reason: "FSSAI certificate not uploaded. Kitchen photos blurry.",
    deadline: "2026-03-27",
    status: "Resubmit",
  },
  {
    name: "Sarita Gupta",
    state: "UP",
    score: 30,
    reason: "No products listed. Profile photo missing. No bank account.",
    deadline: "2026-03-25",
    status: "Rejected",
  },
  {
    name: "Bimla Devi",
    state: "Bihar",
    score: 58,
    reason: "FSSAI number unverifiable. Only 1 product photo uploaded.",
    deadline: "2026-03-28",
    status: "Resubmit",
  },
];

function QaDashboard() {
  const [selectedAunty, setSelectedAunty] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    checklistTemplate.flatMap((cat) =>
      cat.items.map((item) => ({
        criterion: item.criterion,
        pts: item.pts,
        passed: false,
      })),
    ),
  );
  const [reviewNotes, setReviewNotes] = useState("");

  const totalScore = checklist
    .filter((c) => c.passed)
    .reduce((acc, c) => acc + c.pts, 0);

  const toggleItem = (i: number) => {
    setChecklist((prev) =>
      prev.map((item, idx) =>
        idx === i ? { ...item, passed: !item.passed } : item,
      ),
    );
  };

  const handleApprove = () => {
    if (totalScore < 70) {
      toast.error("Score below 70 — cannot approve");
      return;
    }
    toast.success(`${selectedAunty} approved! QA score: ${totalScore}/100`);
    setSelectedAunty("");
    setChecklist((prev) => prev.map((item) => ({ ...item, passed: false })));
    setReviewNotes("");
  };

  const handleReject = () => {
    toast.success(`${selectedAunty} marked for rejection. Reason saved.`);
    setSelectedAunty("");
  };

  const handleResubmit = () => {
    toast.success(`${selectedAunty} asked to resubmit.`);
    setSelectedAunty("");
  };

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-amber-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Quality Assurance Checklist
            </h1>
            <p className="text-sm text-slate-500">
              Pre-launch review system for all aunties before going live
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pending QA", value: "12", color: "text-orange-600" },
            { label: "Approved", value: "47", color: "text-green-600" },
            { label: "Rejected", value: "3", color: "text-red-600" },
            { label: "Avg QA Score", value: "84/100", color: "text-blue-600" },
          ].map((kpi, i) => (
            <Card
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              key={i}
              className="border-0 shadow-sm"
              data-ocid={`qa-checklist.kpi.card.${i + 1}`}
            >
              <CardContent className="p-4">
                <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-2">
            47 of 62 aunties QA approved
          </p>
          <Progress value={75} className="h-2" />
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="bg-amber-50 border border-amber-100 mb-4 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="overview" data-ocid="qa-checklist.overview.tab">
              Overview
            </TabsTrigger>
            <TabsTrigger value="template" data-ocid="qa-checklist.template.tab">
              Checklist Template
            </TabsTrigger>
            <TabsTrigger value="review" data-ocid="qa-checklist.review.tab">
              Review Aunty
            </TabsTrigger>
            <TabsTrigger value="approved" data-ocid="qa-checklist.approved.tab">
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected" data-ocid="qa-checklist.rejected.tab">
              Rejected / Resubmit
            </TabsTrigger>
          </TabsList>

          {/* Tab 1 — Overview */}
          <TabsContent value="overview">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">
                  Aunties Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="qa-checklist.pending.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aunty Name</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Auto Score</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAunties.map((a, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        data-ocid={`qa-checklist.pending.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {a.name}
                        </TableCell>
                        <TableCell className="text-sm">{a.state}</TableCell>
                        <TableCell className="text-sm">{a.products}</TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {a.submitted}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold text-sm ${a.score >= 70 ? "text-green-700" : "text-orange-700"}`}
                          >
                            {a.score}/100
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white"
                            data-ocid={`qa-checklist.pending.primary_button.${i + 1}`}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2 — Checklist Template */}
          <TabsContent value="template">
            <Card className="border-0 shadow-sm max-w-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">
                  Master QA Checklist (100 pts total)
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-ocid="qa-checklist.template.primary_button"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {checklistTemplate.map((cat, ci) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={ci}
                    data-ocid={`qa-checklist.template.panel.${ci + 1}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800">
                        {cat.category}
                      </h3>
                      <Badge className="bg-amber-100 text-amber-800 text-xs">
                        {cat.pts} pts
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {cat.items.map((item, ii) => (
                        <div
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          key={ii}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                            <span className="text-sm text-slate-700">
                              {item.criterion}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 flex-shrink-0 ml-4">
                            {item.pts} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3 — Review Aunty */}
          <TabsContent value="review">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Select Aunty to Review
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={selectedAunty}
                      onValueChange={(v) => {
                        setSelectedAunty(v);
                        setChecklist((prev) =>
                          prev.map((item) => ({ ...item, passed: false })),
                        );
                      }}
                    >
                      <SelectTrigger data-ocid="qa-checklist.review.select">
                        <SelectValue placeholder="Choose a pending aunty" />
                      </SelectTrigger>
                      <SelectContent>
                        {pendingAunties.map((a) => (
                          <SelectItem key={a.name} value={a.name}>
                            {a.name} — {a.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {selectedAunty && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Profile Preview — {selectedAunty}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="w-full h-32 bg-gradient-to-br from-amber-100 to-orange-50 rounded-lg flex items-center justify-center border border-amber-200">
                        <span className="text-amber-400 text-sm">
                          Kitchen photo placeholder
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-500">FSSAI No:</span>{" "}
                          <span className="font-medium">
                            FSSAI-BH-{Math.floor(Math.random() * 90000) + 10000}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">State:</span>{" "}
                          <span className="font-medium">
                            {
                              pendingAunties.find(
                                (a) => a.name === selectedAunty,
                              )?.state
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Products:</span>{" "}
                          <span className="font-medium">
                            {
                              pendingAunties.find(
                                (a) => a.name === selectedAunty,
                              )?.products
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Phone:</span>{" "}
                          <span className="font-medium">Verified ✓</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {selectedAunty && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Scoring Panel</CardTitle>
                      <div
                        className={`text-2xl font-bold ${totalScore >= 70 ? "text-green-700" : "text-orange-700"}`}
                      >
                        {totalScore}/100
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {checklistTemplate.map((cat, ci) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      <div key={ci}>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                          {cat.category}
                        </p>
                        {cat.items.map((item, ii) => {
                          const globalIdx =
                            checklistTemplate
                              .slice(0, ci)
                              .reduce((acc, c) => acc + c.items.length, 0) + ii;
                          return (
                            <button
                              type="button"
                              // biome-ignore lint/suspicious/noArrayIndexKey: static list
                              key={ii}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer w-full text-left"
                              onClick={() => toggleItem(globalIdx)}
                              data-ocid={`qa-checklist.scoring.toggle.${globalIdx + 1}`}
                            >
                              <div className="flex items-center gap-2">
                                {checklist[globalIdx]?.passed ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-slate-300" />
                                )}
                                <span className="text-sm text-slate-700">
                                  {item.criterion}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">
                                {item.pts} pts
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                    <div className="space-y-1 pt-2">
                      <Label className="text-xs">Reviewer Notes</Label>
                      <Textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add notes for this review..."
                        rows={3}
                        data-ocid="qa-checklist.review.textarea"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        className="bg-green-700 hover:bg-green-600 text-white flex-1"
                        onClick={handleApprove}
                        disabled={totalScore < 70}
                        data-ocid="qa-checklist.review.confirm_button"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-orange-700 border-orange-300 hover:bg-orange-50"
                        onClick={handleResubmit}
                        data-ocid="qa-checklist.review.secondary_button"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" /> Request Resubmit
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-700 border-red-300 hover:bg-red-50"
                        onClick={handleReject}
                        data-ocid="qa-checklist.review.delete_button"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                    {totalScore < 70 && (
                      <p className="text-xs text-orange-600">
                        Minimum score of 70 required to approve.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Tab 4 — Approved Aunties */}
          <TabsContent value="approved">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Approved Aunties</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-ocid="qa-checklist.approved.primary_button"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </Button>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="qa-checklist.approved.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aunty Name</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>QA Score</TableHead>
                      <TableHead>Approved Date</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedAunties.map((a, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        data-ocid={`qa-checklist.approved.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {a.name}
                        </TableCell>
                        <TableCell className="text-sm">{a.state}</TableCell>
                        <TableCell className="font-semibold text-green-700">
                          {a.score}/100
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {a.approvedDate}
                        </TableCell>
                        <TableCell className="text-sm">{a.reviewer}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            QA Approved
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1"
                            onClick={() =>
                              toast.success(`${a.name} moved back to pending`)
                            }
                            data-ocid={`qa-checklist.approved.edit_button.${i + 1}`}
                          >
                            <RefreshCw className="w-3 h-3" /> Re-audit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5 — Rejected / Resubmission */}
          <TabsContent value="rejected">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">
                  Rejected & Resubmission Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table data-ocid="qa-checklist.rejected.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aunty Name</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Rejection Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedAunties.map((a, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        data-ocid={`qa-checklist.rejected.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {a.name}
                        </TableCell>
                        <TableCell className="text-sm">{a.state}</TableCell>
                        <TableCell className="text-red-600 font-semibold text-sm">
                          {a.score}/100
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 max-w-xs">
                          {a.reason}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${a.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"}`}
                          >
                            {a.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {a.deadline}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="h-7 text-xs gap-1 bg-green-700 hover:bg-green-600 text-white"
                            onClick={() => {
                              const msg = encodeURIComponent(
                                `Hi ${a.name}, your Choudhary Aunty profile needs some updates before we can approve you. Reason: ${a.reason}. Please resubmit by ${a.deadline}.`,
                              );
                              window.open(
                                `https://wa.me/?text=${msg}`,
                                "_blank",
                              );
                            }}
                            data-ocid={`qa-checklist.rejected.primary_button.${i + 1}`}
                          >
                            <MessageCircle className="w-3 h-3" /> WhatsApp
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function QaChecklistPage() {
  const [authenticated, setAuthenticated] = useState(false);
  if (!authenticated)
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  return <QaDashboard />;
}
