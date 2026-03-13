import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
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
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Lock,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
// PASSWORD GATE
// ─────────────────────────────────────────────
const CORRECT_PASSWORD = "amar2026";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-warm text-center"
      >
        <div className="text-4xl mb-4">📚</div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Learning Centre
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-6">
          Enter your access password to continue
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            data-ocid="learning.input"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
          />
          {error && (
            <p
              data-ocid="learning.error_state"
              className="text-destructive text-xs font-body"
            >
              Incorrect password. Try again.
            </p>
          )}
          <Button
            data-ocid="learning.submit_button"
            type="submit"
            className="bg-saffron hover:bg-terracotta text-cream w-full font-body font-semibold"
          >
            Unlock
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  youtubeId: string;
  mandatory: boolean;
  icon: string;
  tip: string;
}

const MANDATORY_MODULES: Module[] = [
  {
    id: "fssai-basics",
    title: "FSSAI Compliance Basics",
    description:
      "Understand food safety regulations and how to get your FSSAI registration. Watch this before you accept your first order.",
    duration: "12 min",
    youtubeId: "dQw4w9WgXcQ",
    mandatory: true,
    icon: "🏛️",
    tip: "Complete this to activate your first batch.",
  },
  {
    id: "packaging-hygiene",
    title: "Packaging & Hygiene Standards",
    description:
      "Learn how to package food safely for delivery. Covers labelling, eco-friendly packaging, and hygiene checklists.",
    duration: "9 min",
    youtubeId: "9bZkp7q19f0",
    mandatory: true,
    icon: "📦",
    tip: "Required before your kitchen approval.",
  },
  {
    id: "order-management",
    title: "Order Management Dashboard",
    description:
      "How to update order status, manage availability, and communicate with customers. Watch before updating your first order status.",
    duration: "8 min",
    youtubeId: "M7lc1UVf-VE",
    mandatory: true,
    icon: "📋",
    tip: "How to update order status — watch before you mark your first order.",
  },
  {
    id: "food-safety",
    title: "Food Safety & Incident Protocol",
    description:
      "What to do if a customer reports a food quality issue. Covers reporting, evidence collection, and escalation steps.",
    duration: "10 min",
    youtubeId: "LXb3EKWsInQ",
    mandatory: true,
    icon: "🛡️",
    tip: "Must-complete before your first dispatch.",
  },
];

const OPTIONAL_MODULES: Module[] = [
  {
    id: "customer-handling",
    title: "Handling Customer Queries",
    description:
      "Best practices for responding to customer messages, handling complaints gracefully, and building trust.",
    duration: "7 min",
    youtubeId: "dQw4w9WgXcQ",
    mandatory: false,
    icon: "💬",
    tip: "Boost your ratings with great communication.",
  },
  {
    id: "grow-orders",
    title: "Growing Your Orders",
    description:
      "Tips to optimize your dish photos, improve your profile, run seasonal promotions, and reach more customers.",
    duration: "11 min",
    youtubeId: "9bZkp7q19f0",
    mandatory: false,
    icon: "📈",
    tip: "How to upload images — watch before you upload your first dish photo.",
  },
  {
    id: "seasonal-menu",
    title: "Seasonal Menu Planning",
    description:
      "Plan your menu around festivals, seasons, and regional preferences to maximize earnings during peak periods.",
    duration: "6 min",
    youtubeId: "M7lc1UVf-VE",
    mandatory: false,
    icon: "🌸",
    tip: "Earn more during Navratri, Diwali & Holi.",
  },
];

const MOCK_AUNTIES = [
  {
    name: "Savita Devi",
    location: "Patna, Bihar",
    mandatory: 4,
    optional: 2,
    status: "complete",
  },
  {
    name: "Rekha Sharma",
    location: "Muzaffarpur",
    mandatory: 3,
    optional: 1,
    status: "pending",
  },
  {
    name: "Anita Kumari",
    location: "Gaya, Bihar",
    mandatory: 2,
    optional: 0,
    status: "pending",
  },
  {
    name: "Sunita Mishra",
    location: "Varanasi, UP",
    mandatory: 4,
    optional: 3,
    status: "complete",
  },
  {
    name: "Kiran Gupta",
    location: "Ranchi, JH",
    mandatory: 0,
    optional: 0,
    status: "not-started",
  },
  {
    name: "Meena Yadav",
    location: "Bhagalpur",
    mandatory: 1,
    optional: 0,
    status: "not-started",
  },
  {
    name: "Poonam Singh",
    location: "Darbhanga",
    mandatory: 4,
    optional: 1,
    status: "complete",
  },
  {
    name: "Lalita Tiwari",
    location: "Ara, Bihar",
    mandatory: 3,
    optional: 2,
    status: "pending",
  },
];

// ─────────────────────────────────────────────
// MODULE CARD
// ─────────────────────────────────────────────
function ModuleCard({
  module,
  completed,
  onComplete,
}: {
  module: Module;
  completed: boolean;
  onComplete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={`rounded-2xl border-2 transition-colors ${
        completed
          ? "border-green-400 bg-green-50"
          : module.mandatory
            ? "border-saffron/40 bg-card"
            : "border-border bg-card"
      } overflow-hidden`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <span className="text-3xl flex-shrink-0 mt-0.5">{module.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-display text-base font-bold text-foreground">
                {module.title}
              </h3>
              {module.mandatory && (
                <Badge className="bg-saffron/20 text-terracotta border-saffron/30 text-xs font-body">
                  Mandatory
                </Badge>
              )}
              {completed && (
                <Badge className="bg-green-100 text-green-700 border-green-300 text-xs font-body">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground font-body text-sm mb-2">
              {module.description}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-body mb-2">
              <span>⏱ {module.duration}</span>
            </div>
            {module.tip && (
              <div className="flex items-start gap-1.5 bg-saffron/10 rounded-lg px-3 py-2 mb-3">
                <span className="text-saffron text-xs">💡</span>
                <span className="text-xs font-body text-warmBrown">
                  {module.tip}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-1">
          <Button
            data-ocid="learning.module.button"
            size="sm"
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="font-body text-xs flex items-center gap-1.5 border-saffron/40 text-saffron hover:bg-saffron/10"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            {expanded ? "Hide Video" : "Watch Now"}
            {expanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>
          {!completed && (
            <Button
              data-ocid="learning.module.secondary_button"
              size="sm"
              onClick={() => onComplete(module.id)}
              className="font-body text-xs bg-saffron hover:bg-terracotta text-cream flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark Complete
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="p-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${module.youtubeId}?rel=0`}
                  title={module.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// ADMIN TABLE
// ─────────────────────────────────────────────
function AdminView() {
  const [filter, setFilter] = useState("all");
  const [overrideTarget, setOverrideTarget] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Set<string>>(new Set());

  const filtered = MOCK_AUNTIES.filter((a) => {
    if (filter === "complete")
      return a.mandatory === 4 || overrides.has(a.name);
    if (filter === "pending")
      return a.mandatory > 0 && a.mandatory < 4 && !overrides.has(a.name);
    if (filter === "not-started")
      return a.mandatory === 0 && !overrides.has(a.name);
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-display text-lg font-bold text-foreground">
          Aunty Training Progress
        </h3>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="bg-muted">
            <TabsTrigger
              data-ocid="learning.filter.tab"
              value="all"
              className="font-body text-xs"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              data-ocid="learning.filter.tab"
              value="complete"
              className="font-body text-xs"
            >
              Fully Trained
            </TabsTrigger>
            <TabsTrigger
              data-ocid="learning.filter.tab"
              value="pending"
              className="font-body text-xs"
            >
              Pending Mandatory
            </TabsTrigger>
            <TabsTrigger
              data-ocid="learning.filter.tab"
              value="not-started"
              className="font-body text-xs"
            >
              Not Started
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div
        className="rounded-xl border border-border overflow-hidden"
        data-ocid="learning.table"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="font-body font-semibold text-foreground">
                Aunty
              </TableHead>
              <TableHead className="font-body font-semibold text-foreground">
                Location
              </TableHead>
              <TableHead className="font-body font-semibold text-foreground">
                Mandatory
              </TableHead>
              <TableHead className="font-body font-semibold text-foreground">
                Optional
              </TableHead>
              <TableHead className="font-body font-semibold text-foreground">
                Status
              </TableHead>
              <TableHead className="font-body font-semibold text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((aunty, i) => {
              const isOverridden = overrides.has(aunty.name);
              const mandatoryCount = isOverridden ? 4 : aunty.mandatory;
              return (
                <TableRow
                  key={aunty.name}
                  data-ocid={`learning.row.${i + 1}`}
                  className="hover:bg-muted/20"
                >
                  <TableCell className="font-body font-medium text-foreground">
                    {aunty.name}
                  </TableCell>
                  <TableCell className="font-body text-muted-foreground text-sm">
                    {aunty.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-body text-sm font-semibold ${
                          mandatoryCount === 4
                            ? "text-green-600"
                            : "text-terracotta"
                        }`}
                      >
                        {mandatoryCount}/4
                      </span>
                      <Progress
                        value={(mandatoryCount / 4) * 100}
                        className="w-16 h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-sm text-muted-foreground">
                    {aunty.optional}/3
                  </TableCell>
                  <TableCell>
                    {mandatoryCount === 4 || isOverridden ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300 text-xs font-body">
                        Trained
                      </Badge>
                    ) : mandatoryCount > 0 ? (
                      <Badge className="bg-saffron/20 text-terracotta border-saffron/30 text-xs font-body">
                        In Progress
                      </Badge>
                    ) : (
                      <Badge className="bg-muted text-muted-foreground text-xs font-body">
                        Not Started
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!isOverridden && mandatoryCount < 4 && (
                      <Button
                        data-ocid={`learning.edit_button.${i + 1}`}
                        size="sm"
                        variant="outline"
                        onClick={() => setOverrideTarget(aunty.name)}
                        className="font-body text-xs flex items-center gap-1.5 border-saffron/30 text-saffron hover:bg-saffron/10"
                      >
                        <Eye className="w-3 h-3" /> Unlock Override
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Override Dialog */}
      <Dialog
        open={!!overrideTarget}
        onOpenChange={() => setOverrideTarget(null)}
      >
        <DialogContent data-ocid="learning.dialog" className="font-body">
          <DialogHeader>
            <DialogTitle className="font-display">
              Confirm Training Override
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            You are about to manually mark all mandatory training as complete
            for <strong>{overrideTarget}</strong>. This will allow their batch
            to go live. Are you sure?
          </p>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="learning.cancel_button"
              variant="outline"
              onClick={() => setOverrideTarget(null)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              data-ocid="learning.confirm_button"
              onClick={() => {
                if (overrideTarget) {
                  setOverrides((prev) => new Set([...prev, overrideTarget]));
                }
                setOverrideTarget(null);
              }}
              className="bg-saffron hover:bg-terracotta text-cream font-body"
            >
              Yes, Override
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function LearningCentrePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("ca_learning_completed");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem("ca_lc_unlocked");
    if (stored === "1") setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    localStorage.setItem("ca_lc_unlocked", "1");
  };

  const handleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set([...prev, id]);
      localStorage.setItem("ca_learning_completed", JSON.stringify([...next]));
      return next;
    });
  };

  const mandatoryCompleted = MANDATORY_MODULES.filter((m) =>
    completed.has(m.id),
  ).length;
  const allMandatoryDone = mandatoryCompleted === MANDATORY_MODULES.length;
  const totalCompleted = [...MANDATORY_MODULES, ...OPTIONAL_MODULES].filter(
    (m) => completed.has(m.id),
  ).length;
  const totalModules = MANDATORY_MODULES.length + OPTIONAL_MODULES.length;

  if (!unlocked) return <PasswordGate onUnlock={handleUnlock} />;

  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-6 h-6 text-saffron" />
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Learning Centre
                </h1>
              </div>
              <p className="text-muted-foreground font-body text-sm">
                Complete mandatory training to activate your kitchen on
                Choudhary Aunty
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-sm text-muted-foreground">
                Admin view?
              </span>
              <button
                type="button"
                data-ocid="learning.toggle"
                onClick={() => setIsAdmin(!isAdmin)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isAdmin ? "bg-saffron" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isAdmin ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Progress summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <div className="font-display text-2xl font-bold text-saffron">
                {mandatoryCompleted}/4
              </div>
              <div className="font-body text-xs text-muted-foreground">
                Mandatory
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <div className="font-display text-2xl font-bold text-foreground">
                {totalCompleted}/{totalModules}
              </div>
              <div className="font-body text-xs text-muted-foreground">
                Total Done
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-xs text-muted-foreground">
                  Overall progress
                </span>
                <span className="font-body text-xs font-semibold text-foreground">
                  {Math.round((totalCompleted / totalModules) * 100)}%
                </span>
              </div>
              <Progress
                value={(totalCompleted / totalModules) * 100}
                className="h-2"
              />
            </div>
          </div>

          {/* Mandatory training banner */}
          <AnimatePresence mode="wait">
            {!allMandatoryDone ? (
              <motion.div
                key="warning"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                data-ocid="learning.error_state"
                className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-red-700">
                    Complete mandatory training to go live
                  </p>
                  <p className="font-body text-xs text-red-500">
                    {4 - mandatoryCompleted} module
                    {4 - mandatoryCompleted !== 1 ? "s" : ""} remaining. Your
                    first batch cannot be approved until all 4 mandatory modules
                    are completed.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                data-ocid="learning.success_state"
                className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-green-700">
                    🎉 All mandatory training complete!
                  </p>
                  <p className="font-body text-xs text-green-600">
                    You are cleared to go live. Your first batch can now be
                    approved by admin.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Admin or Aunty View */}
        <AnimatePresence mode="wait">
          {isAdmin ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminView />
            </motion.div>
          ) : (
            <motion.div
              key="aunty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Mandatory */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-saffron" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Mandatory Training
                  </h2>
                  <Badge className="bg-red-100 text-red-600 border-red-200 font-body text-xs">
                    Required before going live
                  </Badge>
                </div>
                <div className="space-y-4">
                  {MANDATORY_MODULES.map((mod) => (
                    <ModuleCard
                      key={mod.id}
                      module={mod}
                      completed={completed.has(mod.id)}
                      onComplete={handleComplete}
                    />
                  ))}
                </div>
              </section>

              {/* Optional */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-gold" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Optional Modules
                  </h2>
                  <Badge className="bg-muted text-muted-foreground font-body text-xs">
                    Earn more • Build skills
                  </Badge>
                </div>
                <div className="space-y-4">
                  {OPTIONAL_MODULES.map((mod) => (
                    <ModuleCard
                      key={mod.id}
                      module={mod}
                      completed={completed.has(mod.id)}
                      onComplete={handleComplete}
                    />
                  ))}
                </div>
              </section>

              {/* Help banner */}
              <div className="bg-gradient-to-r from-saffron/10 to-terracotta/10 border border-saffron/20 rounded-2xl p-6 text-center">
                <Users className="w-8 h-8 text-saffron mx-auto mb-2" />
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  Need help?
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Reach out to our Aunty Support team on WhatsApp
                </p>
                <a
                  data-ocid="learning.primary_button"
                  href="https://wa.me/919883140470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-saffron hover:bg-terracotta text-cream px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-colors"
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=choudharyaunty"
              className="underline hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
