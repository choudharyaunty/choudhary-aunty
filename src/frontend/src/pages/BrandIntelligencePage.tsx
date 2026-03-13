import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  BarChart2,
  Bell,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Flame,
  Info,
  Lock,
  MessageCircle,
  MessageSquare,
  Minus,
  Radio,
  ShieldAlert,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  Triangle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiReddit, SiX, SiYoutube } from "react-icons/si";
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

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

const AUTH_KEY = "brand_intelligence_auth";
const CORRECT_PASSWORD = "amar2026";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_SCORE = 74;
const BRAND_SUB_SCORES = [
  { name: "Review Sentiment", score: 81, icon: "💬" },
  { name: "Rating Trend", score: 78, icon: "⭐" },
  { name: "Community Engagement", score: 69, icon: "🤝" },
  { name: "Content Reach", score: 72, icon: "📡" },
  { name: "Crisis Index", score: 68, icon: "🛡️" },
];

const BRAND_WEEKLY_TREND = [
  { week: "W1", score: 64 },
  { week: "W2", score: 67 },
  { week: "W3", score: 65 },
  { week: "W4", score: 70 },
  { week: "W5", score: 71 },
  { week: "W6", score: 69 },
  { week: "W7", score: 72 },
  { week: "W8", score: 74 },
];

const BRAND_INSIGHTS = [
  {
    type: "improving",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    title: "Review sentiment rising",
    detail:
      "Positive review rate improved from 71% to 81% over last 3 weeks. Coconut Laddoo and Namakpara getting consistent 5-star mentions.",
  },
  {
    type: "attention",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "Crisis Index needs monitoring",
    detail:
      "Delivery complaints are recurring more than expected. 5 packaging issues flagged in last 48 hours. Resolve before it affects brand perception.",
  },
  {
    type: "action",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    title: "Boost community engagement",
    detail:
      "Post 2 aunty story reels this week on Instagram. Salah-Mashwara activity is 18% below target — schedule a festival recipe session.",
  },
];

const SOCIAL_MENTIONS = [
  {
    id: 1,
    platform: "instagram",
    user: "@foodie_priya_delhi",
    text: "Just received my Coconut Laddoo from Choudhary Aunty — absolutely divine! Priya Devi's version is 10/10 🙏",
    sentiment: "positive",
    time: "2h ago",
    tags: ["Choudhary Aunty", "Coconut Laddoo", "Priya Devi"],
  },
  {
    id: 2,
    platform: "reddit",
    user: "u/homemade_food_india",
    text: "Anyone tried Bihar ki Rasoi? Been ordering Namakpara from there, quality is consistent every batch.",
    sentiment: "positive",
    time: "4h ago",
    tags: ["Bihar ki Rasoi", "Namakpara"],
  },
  {
    id: 3,
    platform: "twitter",
    user: "@KumarSanjeev91",
    text: "My delivery from Choudhary Aunty was delayed by 2 days. No communication from the team. A bit frustrated.",
    sentiment: "negative",
    time: "5h ago",
    tags: ["Choudhary Aunty", "delivery"],
  },
  {
    id: 4,
    platform: "youtube",
    user: "Homemade India Reviews",
    text: "Video review: Ordered Gulab Khaja from Choudhary Aunty. The taste is authentic but packaging could be improved.",
    sentiment: "neutral",
    time: "8h ago",
    tags: ["Choudhary Aunty", "Gulab Khaja", "packaging"],
  },
  {
    id: 5,
    platform: "instagram",
    user: "@ritu_bites",
    text: "Kamla Singh's Chura Bhunja is sold out again 😭 I keep missing the batch. Please open more slots!",
    sentiment: "positive",
    time: "10h ago",
    tags: ["Kamla Singh", "Chura Bhunja"],
  },
  {
    id: 6,
    platform: "reddit",
    user: "u/indian_homecook_fan",
    text: "Found Choudhary Aunty mentioned alongside TiffinBox and HomeFoodHub. Their aunty selection feature is unique.",
    sentiment: "positive",
    time: "12h ago",
    tags: ["Choudhary Aunty", "competitor comparison"],
  },
  {
    id: 7,
    platform: "twitter",
    user: "@Meera_Kulkarni",
    text: "The Namakpara from Choudhary Aunty arrived a bit soggy. The packaging was not airtight. Please fix this!",
    sentiment: "negative",
    time: "14h ago",
    tags: ["Choudhary Aunty", "Namakpara", "packaging"],
  },
  {
    id: 8,
    platform: "instagram",
    user: "@biharkikhushbu",
    text: "So proud to support Bihar ki Rasoi! This platform is doing something truly special for our state's food culture.",
    sentiment: "positive",
    time: "1d ago",
    tags: ["Bihar ki Rasoi", "homemade food"],
  },
  {
    id: 9,
    platform: "youtube",
    user: "Desi Foodie Diaries",
    text: "Trying all Mithila special sweets from Choudhary Aunty — Anarsa tasted exactly like what I had at my nani's place.",
    sentiment: "positive",
    time: "1d ago",
    tags: ["Choudhary Aunty", "homemade food", "Anarsa"],
  },
  {
    id: 10,
    platform: "twitter",
    user: "@PrakashN_Patna",
    text: "Ordered 2kg Guddamma batch. Price seems a bit high for the quantity. Expected more for ₹450.",
    sentiment: "negative",
    time: "1d ago",
    tags: ["Choudhary Aunty", "Guddamma", "pricing"],
  },
  {
    id: 11,
    platform: "instagram",
    user: "@momof2_noida",
    text: "Ordered for my kids' snack box — Namakpara and Chura Bhunja. Both loved it. Will definitely reorder!",
    sentiment: "positive",
    time: "2d ago",
    tags: ["Choudhary Aunty", "Namakpara", "Chura Bhunja"],
  },
  {
    id: 12,
    platform: "reddit",
    user: "u/FestiveFoodie2026",
    text: "Choudhary Aunty is preparing Holi specials — anyone placed an order yet? Is the batch system easy to use?",
    sentiment: "neutral",
    time: "2d ago",
    tags: ["Choudhary Aunty", "homemade food"],
  },
  {
    id: 13,
    platform: "instagram",
    user: "@preethi_eats",
    text: "Sunita Verma's Meethapara is INCREDIBLE. I've reordered 3 times already. Choudhary Aunty is my go-to now.",
    sentiment: "positive",
    time: "2d ago",
    tags: ["Choudhary Aunty", "Sunita Verma", "Meethapara"],
  },
  {
    id: 14,
    platform: "youtube",
    user: "IndianFoodReviewer",
    text: "Unboxing Choudhary Aunty's festive pack — the packaging needs upgrading. Content is 5 stars, box is 2 stars.",
    sentiment: "neutral",
    time: "3d ago",
    tags: ["Choudhary Aunty", "packaging"],
  },
  {
    id: 15,
    platform: "twitter",
    user: "@AnjaliSFoodie",
    text: "Tried homemade food from multiple platforms — Choudhary Aunty's aunty selection feature is genius. Real emotional connect.",
    sentiment: "positive",
    time: "3d ago",
    tags: ["Choudhary Aunty", "homemade food"],
  },
];

const MENTION_VOLUME = [
  { day: "Mon", positive: 4, neutral: 2, negative: 1 },
  { day: "Tue", positive: 6, neutral: 1, negative: 2 },
  { day: "Wed", positive: 3, neutral: 3, negative: 0 },
  { day: "Thu", positive: 7, neutral: 2, negative: 1 },
  { day: "Fri", positive: 5, neutral: 1, negative: 2 },
  { day: "Sat", positive: 4, neutral: 0, negative: 0 },
  { day: "Sun", positive: 2, neutral: 1, negative: 0 },
];

const CONTENT_LOG = [
  {
    id: 1,
    type: "Reel",
    platform: "Instagram",
    title: "Priya Devi making Coconut Laddoo at her home kitchen",
    date: "Mar 09",
    reach: 5400,
    engagement: 312,
  },
  {
    id: 2,
    type: "Blog",
    platform: "Website",
    title: "The story of Gulab Khaja — Bihar's festival sweet",
    date: "Mar 07",
    reach: 1200,
    engagement: 87,
  },
  {
    id: 3,
    type: "Post",
    platform: "Instagram",
    title: "Bihar ki Rasoi — Now Live! Customer testimonials collage",
    date: "Mar 06",
    reach: 3800,
    engagement: 228,
  },
  {
    id: 4,
    type: "WhatsApp Blast",
    platform: "WhatsApp",
    title: "Holi Special Batch — Coconut Laddoo & Namakpara now open",
    date: "Mar 05",
    reach: 2100,
    engagement: 156,
  },
  {
    id: 5,
    type: "Reel",
    platform: "Instagram",
    title: "Kamla Singh's Chura Bhunja — 42 years of tradition",
    date: "Mar 03",
    reach: 6200,
    engagement: 445,
  },
  {
    id: 6,
    type: "Story",
    platform: "Instagram",
    title: "Behind the kitchen: packaging day at Sunita ji's home",
    date: "Mar 01",
    reach: 1800,
    engagement: 94,
  },
  {
    id: 7,
    type: "Blog",
    platform: "Website",
    title: "Why home kitchens make better food than restaurants",
    date: "Feb 27",
    reach: 2400,
    engagement: 143,
  },
  {
    id: 8,
    type: "Reel",
    platform: "YouTube",
    title: "Full day in the life of Meena Sharma — Bihar home chef",
    date: "Feb 24",
    reach: 4100,
    engagement: 267,
  },
];

const REACH_BY_TYPE = [
  { type: "Reels", reach: 15700 },
  { type: "Posts", reach: 3800 },
  { type: "Stories", reach: 1800 },
  { type: "Blog", reach: 3600 },
  { type: "WhatsApp", reach: 2100 },
];

const FEEDBACK_ITEMS = [
  {
    id: 1,
    customer: "Kavita Sharma",
    product: "Namakpara (Patla Diamond Cut)",
    rating: 2,
    text: "The namakpara arrived soggy. The packaging was not sealed properly. Very disappointed.",
    tag: "Packaging",
    aunty: "Priya Devi",
    region: "Mithila",
    date: "Mar 10",
  },
  {
    id: 2,
    customer: "Rahul Verma",
    product: "Coconut Laddoo – Meva Premium",
    rating: 5,
    text: "Absolutely heavenly! The laddoos were fresh, perfectly sized, and tasted exactly like my nani used to make.",
    tag: "Taste",
    aunty: "Kamla Singh",
    region: "Magadh",
    date: "Mar 09",
  },
  {
    id: 3,
    customer: "Sunita Patel",
    product: "Gulab Khaja",
    rating: 3,
    text: "Delivery took 4 days instead of 2. The khaja was stale by the time it arrived.",
    tag: "Delivery",
    aunty: "Meena Sharma",
    region: "Bhojpur",
    date: "Mar 09",
  },
  {
    id: 4,
    customer: "Deepak Mishra",
    product: "Chura Bhunja – Premium",
    rating: 4,
    text: "Great taste and texture. The quantity felt slightly less than 2kg. Maybe check the weighing.",
    tag: "Quantity",
    aunty: "Kamla Singh",
    region: "Magadh",
    date: "Mar 08",
  },
  {
    id: 5,
    customer: "Priya Agarwal",
    product: "Namakpara (Mota Diamond Cut)",
    rating: 2,
    text: "Second time the namakpara packaging leaked oil. Please use better oil-proof packaging.",
    tag: "Packaging",
    aunty: "Sunita Verma",
    region: "Mithila",
    date: "Mar 08",
  },
  {
    id: 6,
    customer: "Vikram Singh",
    product: "Guddamma (Sweet Mango Jaggery)",
    rating: 5,
    text: "This is the taste of childhood! Exactly the way my mother made it in Patna. Will order every month.",
    tag: "Taste",
    aunty: "Priya Devi",
    region: "Mithila",
    date: "Mar 07",
  },
  {
    id: 7,
    customer: "Anita Joshi",
    product: "Meethapara",
    rating: 4,
    text: "Loved the taste but the transit damaged some pieces. The sweet broke in transit.",
    tag: "Delivery",
    aunty: "Sunita Verma",
    region: "Mithila",
    date: "Mar 07",
  },
  {
    id: 8,
    customer: "Mohan Tripathi",
    product: "Coconut Laddoo – Basic",
    rating: 5,
    text: "Fresh, delicious, and so authentic. Priya Devi is a treasure. Already recommended to 5 friends.",
    tag: "Taste",
    aunty: "Priya Devi",
    region: "Mithila",
    date: "Mar 06",
  },
  {
    id: 9,
    customer: "Ritu Gupta",
    product: "Namakpara (Patla Diamond Cut)",
    rating: 2,
    text: "Third time ordering and third time the namakpara is not crispy. Something wrong with the packaging.",
    tag: "Packaging",
    aunty: "Kamla Singh",
    region: "Magadh",
    date: "Mar 06",
  },
  {
    id: 10,
    customer: "Suresh Pandey",
    product: "Chura Bhunja – Basic",
    rating: 3,
    text: "Delivery was delayed by 3 days. No update on WhatsApp. Please improve communication.",
    tag: "Delivery",
    aunty: "Meena Sharma",
    region: "Bhojpur",
    date: "Mar 05",
  },
  {
    id: 11,
    customer: "Nita Srivastava",
    product: "Coconut Laddoo – Meva & Dry Fruits",
    rating: 5,
    text: "This was a gift for my mother-in-law — she cried with joy. Exactly like her mother used to make.",
    tag: "Taste",
    aunty: "Kamla Singh",
    region: "Magadh",
    date: "Mar 04",
  },
  {
    id: 12,
    customer: "Ashok Kumar",
    product: "Gulab Khaja",
    rating: 3,
    text: "Quality was good but quantity was less than advertised. Weighed it — only 1.8kg instead of 2kg.",
    tag: "Quantity",
    aunty: "Meena Sharma",
    region: "Bhojpur",
    date: "Mar 03",
  },
];

const ISSUE_FREQUENCY = [
  { issue: "Packaging", count: 4, color: "#f59e0b" },
  { issue: "Delivery", count: 3, color: "#ef4444" },
  { issue: "Taste", count: 3, color: "#22c55e" },
  { issue: "Quantity", count: 2, color: "#8b5cf6" },
];

const SENTIMENT_DONUT = [
  { name: "Positive", value: 5, color: "#22c55e" },
  { name: "Neutral", value: 2, color: "#94a3b8" },
  { name: "Negative", value: 5, color: "#ef4444" },
];

const CHAT_PATTERNS = [
  {
    pattern: "Reorder intent expressed",
    count: 12,
    trend: "up",
    color: "green",
  },
  { pattern: "Delivery delay complaint", count: 8, trend: "up", color: "red" },
  {
    pattern: "Packaging quality complaint",
    count: 5,
    trend: "up",
    color: "amber",
  },
  {
    pattern: "Quantity discrepancy raised",
    count: 3,
    trend: "neutral",
    color: "purple",
  },
];

const UNRESOLVED_CHATS = [
  {
    id: 1,
    customer: "Suresh Pandey",
    issue: "Delivery delay — 3 days, no WhatsApp update",
    date: "Mar 05",
  },
  {
    id: 2,
    customer: "Ashok Kumar",
    issue: "Quantity short — only 1.8kg of 2kg ordered",
    date: "Mar 03",
  },
  {
    id: 3,
    customer: "Priya Agarwal",
    issue: "Repeated packaging failure — 2nd time in same month",
    date: "Mar 08",
  },
];

const CRISIS_ALERTS = [
  {
    id: 1,
    level: "critical" as const,
    title: "Negative mention spike",
    message:
      "6 negative mentions in last 4 hours about delivery — customers posting on Twitter/X.",
    time: "4h ago",
    resolved: false,
  },
  {
    id: 2,
    level: "warning" as const,
    title: "Rating drop detected",
    message:
      "Priya Devi's Coconut Laddoo rating dropped from 4.8 to 4.3 this week. Investigate cause.",
    time: "8h ago",
    resolved: false,
  },
  {
    id: 3,
    level: "warning" as const,
    title: "Complaint volume above threshold",
    message:
      "5 packaging complaints in 48 hours — exceeds warning threshold of 3. Review aunty packaging protocols.",
    time: "12h ago",
    resolved: false,
  },
  {
    id: 4,
    level: "info" as const,
    title: "Competitor mentioned alongside brand",
    message:
      "Choudhary Aunty mentioned alongside TiffinBox and HomeFoodHub on r/homemade_food_india. Positive context.",
    time: "1d ago",
    resolved: false,
  },
];

const ALERT_HISTORY = [
  {
    id: 1,
    type: "Critical",
    message: "GMV decline alert — delivery zone Patna",
    time: "Mar 08 14:22",
    status: "Resolved",
  },
  {
    id: 2,
    type: "Warning",
    message: "Aunty churn risk — Babita Tai inactive for 7 days",
    time: "Mar 07 09:15",
    status: "Resolved",
  },
  {
    id: 3,
    type: "Critical",
    message: "Batch failure — CA-BIO-2026-003 closed unfilled",
    time: "Mar 06 18:00",
    status: "Resolved",
  },
  {
    id: 4,
    type: "Warning",
    message: "Packaging complaint spike — 3 in 24 hours",
    time: "Mar 05 11:30",
    status: "Resolved",
  },
  {
    id: 5,
    type: "Info",
    message: "Holi batch demand projection — 40% above last festival",
    time: "Mar 04 10:00",
    status: "Active",
  },
  {
    id: 6,
    type: "Warning",
    message: "Quality drift — Meena Sharma rating trend down",
    time: "Mar 03 16:45",
    status: "Resolved",
  },
  {
    id: 7,
    type: "Critical",
    message: "Social media negative spike — delivery complaints",
    time: "Mar 01 08:22",
    status: "Resolved",
  },
  {
    id: 8,
    type: "Warning",
    message: "Customer reorder rate below target — Bhojpur region",
    time: "Feb 28 13:10",
    status: "Resolved",
  },
  {
    id: 9,
    type: "Info",
    message: "Community Hunter found 3 new relevant YouTube channels",
    time: "Feb 27 09:00",
    status: "Active",
  },
  {
    id: 10,
    type: "Warning",
    message: "Batch fill rate below 80% for Chura Bhunja",
    time: "Feb 26 17:30",
    status: "Resolved",
  },
];

const IMPROVEMENT_ITEMS = [
  {
    col: "immediate",
    title: "Fix Namakpara packaging",
    detail: "3 complaints in 7 days — oil-proof seal failing during transit",
    source: "Feedback",
    count: 3,
    priority: "High",
  },
  {
    col: "immediate",
    title: "Follow up with 2 unresolved delivery complaints",
    detail: "Suresh Pandey & Priya Agarwal — no resolution in 5+ days",
    source: "Chat",
    count: 2,
    priority: "High",
  },
  {
    col: "medium",
    title: "Introduce packaging QC before dispatch",
    detail:
      "Aunty self-check protocol for airtight seals before handing to courier",
    source: "Feedback",
    count: 5,
    priority: "Medium",
  },
  {
    col: "medium",
    title: "Add delivery tracking update for customers",
    detail:
      "Auto WhatsApp message when order is picked up, in-transit, and delivered",
    source: "Chat",
    count: 8,
    priority: "Medium",
  },
  {
    col: "process",
    title: "Standardise batch packing instructions",
    detail:
      "Create illustrated packing guide in Hindi/local language for all aunties",
    source: "Feedback",
    count: 4,
    priority: "Low",
  },
  {
    col: "process",
    title: "Delivery partner feedback loop",
    detail:
      "Collect per-delivery quality rating from customers + courier check",
    source: "Feedback",
    count: 3,
    priority: "Low",
  },
  {
    col: "communication",
    title: "Update WhatsApp order confirmation message",
    detail:
      "Include expected delivery timeline, tracking link, and support number",
    source: "Chat",
    count: 8,
    priority: "Low",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return <SiInstagram className="w-4 h-4 text-pink-500" />;
    case "youtube":
      return <SiYoutube className="w-4 h-4 text-red-500" />;
    case "reddit":
      return <SiReddit className="w-4 h-4 text-orange-500" />;
    case "twitter":
      return <SiX className="w-4 h-4 text-slate-700" />;
    default:
      return <MessageCircle className="w-4 h-4 text-slate-400" />;
  }
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  if (sentiment === "positive")
    return (
      <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5">
        <ThumbsUp className="w-2.5 h-2.5 mr-0.5" /> Positive
      </Badge>
    );
  if (sentiment === "negative")
    return (
      <Badge className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5">
        <ThumbsDown className="w-2.5 h-2.5 mr-0.5" /> Negative
      </Badge>
    );
  return (
    <Badge className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5">
      <Minus className="w-2.5 h-2.5 mr-0.5" /> Neutral
    </Badge>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${
            s <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-slate-100 text-slate-600",
  };
  return (
    <Badge className={`text-[10px] px-1.5 py-0.5 ${map[priority] ?? ""}`}>
      {priority}
    </Badge>
  );
}

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, string> = {
    Feedback: "bg-blue-100 text-blue-700",
    Chat: "bg-purple-100 text-purple-700",
    Social: "bg-pink-100 text-pink-700",
  };
  return (
    <Badge className={`text-[10px] px-1.5 py-0.5 ${map[source] ?? ""}`}>
      {source}
    </Badge>
  );
}

function ScoreGauge({
  score,
  size = "lg",
}: { score: number; size?: "sm" | "lg" }) {
  const color =
    score >= 75
      ? "text-green-600"
      : score >= 60
        ? "text-amber-500"
        : "text-red-500";
  const ring =
    score >= 75
      ? "stroke-green-400"
      : score >= 60
        ? "stroke-amber-400"
        : "stroke-red-400";
  const r = size === "lg" ? 52 : 30;
  const cx = size === "lg" ? 64 : 40;
  const circumference = 2 * Math.PI * r;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        role="img"
        aria-label="Brand score gauge"
        width={cx * 2}
        height={cx * 2}
        className="-rotate-90"
        viewBox={`0 0 ${cx * 2} ${cx * 2}`}
      >
        <title>Brand score gauge</title>
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={size === "lg" ? 8 : 6}
          className="text-slate-100"
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          strokeWidth={size === "lg" ? 8 : 6}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className={ring}
        />
      </svg>
      <span
        className={`absolute font-bold ${size === "lg" ? "text-3xl" : "text-base"} ${color}`}
      >
        {score}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD GATE
// ─────────────────────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwd === CORRECT_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="border-amber-200 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto mb-3">
              <Radio className="w-7 h-7 text-amber-600" />
            </div>
            <CardTitle className="font-display text-xl text-slate-800">
              Brand & Content Intelligence
            </CardTitle>
            <p className="text-sm text-slate-500 font-body">
              Internal access only — team members only
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="password"
                  placeholder="Enter access password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className={`pl-9 border-slate-200 focus:border-amber-400 ${
                    error ? "border-red-400 bg-red-50" : ""
                  }`}
                  data-ocid="brand.input"
                />
              </div>
              {error && (
                <p
                  className="text-red-500 text-xs text-center"
                  data-ocid="brand.error_state"
                >
                  Incorrect password. Please try again.
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                data-ocid="brand.submit_button"
              >
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: BRAND HEALTH SCORE
// ─────────────────────────────────────────────────────────────────────────────

function BrandHealthTab() {
  return (
    <div className="space-y-6">
      {/* Score + Sub-scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Main score */}
        <Card className="border-amber-200 bg-amber-50 flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
            Brand Health Score
          </p>
          <ScoreGauge score={BRAND_SCORE} size="lg" />
          <p className="text-xs text-slate-500">
            Composite score across 5 dimensions
          </p>
        </Card>
        {/* Sub-scores */}
        <div className="sm:col-span-1 lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BRAND_SUB_SCORES.map((sub) => (
            <Card key={sub.name} className="border-slate-100 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{sub.icon}</span>
                <span className="text-[11px] font-medium text-slate-600">
                  {sub.name}
                </span>
              </div>
              <Progress value={sub.score} className="h-2 mb-1" />
              <span
                className={`text-sm font-bold ${
                  sub.score >= 75
                    ? "text-green-600"
                    : sub.score >= 60
                      ? "text-amber-600"
                      : "text-red-600"
                }`}
              >
                {sub.score}/100
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly trend */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Brand Health Trend — Last 8 Weeks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={BRAND_WEEKLY_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[50, 100]}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#d97706"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#d97706" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BRAND_INSIGHTS.map((ins) => (
          <Card key={ins.type} className={`border ${ins.border} ${ins.bg}`}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-2 mb-1">
                <ins.icon className={`w-4 h-4 mt-0.5 shrink-0 ${ins.color}`} />
                <p className={`text-sm font-semibold ${ins.color}`}>
                  {ins.title}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ins.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: SOCIAL LISTENING
// ─────────────────────────────────────────────────────────────────────────────

function SocialListeningTab() {
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const filtered = SOCIAL_MENTIONS.filter((m) => {
    if (platformFilter !== "all" && m.platform !== platformFilter) return false;
    if (sentimentFilter !== "all" && m.sentiment !== sentimentFilter)
      return false;
    return true;
  });

  const total = SOCIAL_MENTIONS.length;
  const positive = SOCIAL_MENTIONS.filter(
    (m) => m.sentiment === "positive",
  ).length;
  const negative = SOCIAL_MENTIONS.filter(
    (m) => m.sentiment === "negative",
  ).length;
  const neutral = SOCIAL_MENTIONS.filter(
    (m) => m.sentiment === "neutral",
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Mentions", value: total, color: "text-slate-700" },
          { label: "Positive", value: positive, color: "text-green-600" },
          { label: "Negative", value: negative, color: "text-red-600" },
          { label: "Neutral", value: neutral, color: "text-slate-500" },
        ].map((s) => (
          <Card key={s.label} className="border-slate-100 p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Volume chart */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Mention Volume — Last 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={MENTION_VOLUME}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="positive" stackId="a" fill="#22c55e" />
              <Bar dataKey="neutral" stackId="a" fill="#94a3b8" />
              <Bar
                dataKey="negative"
                stackId="a"
                fill="#ef4444"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="w-4 h-4 text-slate-400" />
        {["all", "instagram", "youtube", "reddit", "twitter"].map((p) => (
          <button
            type="button"
            key={p}
            onClick={() => setPlatformFilter(p)}
            data-ocid="social.platform_filter.tab"
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize ${
              platformFilter === p
                ? "bg-amber-500 text-white border-amber-500"
                : "border-slate-200 text-slate-600 hover:border-amber-300"
            }`}
          >
            {p === "all" ? "All Platforms" : p}
          </button>
        ))}
        <span className="text-slate-300">|</span>
        {["all", "positive", "negative", "neutral"].map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setSentimentFilter(s)}
            data-ocid="social.sentiment_filter.tab"
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize ${
              sentimentFilter === s
                ? "bg-slate-700 text-white border-slate-700"
                : "border-slate-200 text-slate-600 hover:border-slate-400"
            }`}
          >
            {s === "all" ? "All Sentiment" : s}
          </button>
        ))}
      </div>

      {/* Mentions feed */}
      <div className="space-y-3" data-ocid="social.list">
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            data-ocid={`social.item.${i + 1}`}
          >
            <Card className="border-slate-100 hover:shadow-sm transition-shadow">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <PlatformIcon platform={m.platform} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold text-slate-700">
                        {m.user}
                      </span>
                      <SentimentBadge sentiment={m.sentiment} />
                      <span className="text-[10px] text-slate-400">
                        {m.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {m.text}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div
            className="text-center py-10 text-slate-400 text-sm"
            data-ocid="social.empty_state"
          >
            No mentions match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: CONTENT PRODUCTION TRACKER
// ─────────────────────────────────────────────────────────────────────────────

function ContentTrackerTab() {
  const [logs, setLogs] = useState(CONTENT_LOG);
  const [form, setForm] = useState({
    type: "Reel",
    platform: "Instagram",
    title: "",
    date: "",
    reach: "",
    engagement: "",
  });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.date) return;
    setLogs((prev) => [
      {
        id: prev.length + 1,
        type: form.type,
        platform: form.platform,
        title: form.title,
        date: form.date,
        reach: Number(form.reach) || 0,
        engagement: Number(form.engagement) || 0,
      },
      ...prev,
    ]);
    setForm({
      type: "Reel",
      platform: "Instagram",
      title: "",
      date: "",
      reach: "",
      engagement: "",
    });
  }

  const totalPieces = logs.length;
  const avgReach = Math.round(
    logs.reduce((s, l) => s + l.reach, 0) / logs.length,
  );

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Pieces", value: totalPieces, sub: "published" },
          {
            label: "Avg Reach",
            value: avgReach.toLocaleString(),
            sub: "per piece",
          },
          { label: "Top Platform", value: "Instagram", sub: "by reach" },
          { label: "Best Type", value: "Reels", sub: "highest avg reach" },
        ].map((k) => (
          <Card key={k.label} className="border-slate-100 p-3 text-center">
            <p className="text-xl font-bold text-slate-800">{k.value}</p>
            <p className="text-[11px] font-medium text-slate-600">{k.label}</p>
            <p className="text-[10px] text-slate-400">{k.sub}</p>
          </Card>
        ))}
      </div>

      {/* Reach by type chart */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Reach by Content Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={REACH_BY_TYPE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="type"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="reach" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Log content form */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-amber-800">
            Log New Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            <div>
              <label
                htmlFor="content-type"
                className="text-[11px] text-slate-600 font-medium"
              >
                Type
              </label>
              <select
                id="content-type"
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                className="w-full mt-0.5 text-xs border border-amber-200 bg-white rounded px-2 py-1.5"
                data-ocid="content.type_select"
              >
                {["Reel", "Post", "Story", "Blog", "WhatsApp Blast"].map(
                  (t) => (
                    <option key={t}>{t}</option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor="content-platform"
                className="text-[11px] text-slate-600 font-medium"
              >
                Platform
              </label>
              <select
                id="content-platform"
                value={form.platform}
                onChange={(e) =>
                  setForm((f) => ({ ...f, platform: e.target.value }))
                }
                className="w-full mt-0.5 text-xs border border-amber-200 bg-white rounded px-2 py-1.5"
                data-ocid="content.platform_select"
              >
                {["Instagram", "YouTube", "Website", "WhatsApp"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="content-date"
                className="text-[11px] text-slate-600 font-medium"
              >
                Date
              </label>
              <Input
                id="content-date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="mt-0.5 text-xs h-8 border-amber-200"
                data-ocid="content.date_input"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="content-title"
                className="text-[11px] text-slate-600 font-medium"
              >
                Title / Description
              </label>
              <Input
                id="content-title"
                placeholder="Content title..."
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-0.5 text-xs h-8 border-amber-200"
                data-ocid="content.title_input"
              />
            </div>
            <div>
              <label
                htmlFor="content-reach"
                className="text-[11px] text-slate-600 font-medium"
              >
                Reach
              </label>
              <Input
                id="content-reach"
                type="number"
                placeholder="e.g. 4200"
                value={form.reach}
                onChange={(e) =>
                  setForm((f) => ({ ...f, reach: e.target.value }))
                }
                className="mt-0.5 text-xs h-8 border-amber-200"
                data-ocid="content.reach_input"
              />
            </div>
            <div>
              <label
                htmlFor="content-engagement"
                className="text-[11px] text-slate-600 font-medium"
              >
                Engagement
              </label>
              <Input
                id="content-engagement"
                type="number"
                placeholder="e.g. 280"
                value={form.engagement}
                onChange={(e) =>
                  setForm((f) => ({ ...f, engagement: e.target.value }))
                }
                className="mt-0.5 text-xs h-8 border-amber-200"
                data-ocid="content.engagement_input"
              />
            </div>
            <div className="col-span-2 sm:col-span-3 flex justify-end">
              <Button
                type="submit"
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs"
                data-ocid="content.submit_button"
              >
                Log Content
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Content log table */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Content Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px]">Date</TableHead>
                <TableHead className="text-[11px]">Type</TableHead>
                <TableHead className="text-[11px]">Platform</TableHead>
                <TableHead className="text-[11px]">Title</TableHead>
                <TableHead className="text-[11px] text-right">Reach</TableHead>
                <TableHead className="text-[11px] text-right">
                  Engagement
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, i) => (
                <TableRow key={log.id} data-ocid={`content.item.${i + 1}`}>
                  <TableCell className="text-xs text-slate-500">
                    {log.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] px-1.5">
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {log.platform}
                  </TableCell>
                  <TableCell className="text-xs text-slate-700 max-w-[200px] truncate">
                    {log.title}
                  </TableCell>
                  <TableCell className="text-xs text-right font-medium">
                    {log.reach.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-right">
                    {log.engagement}
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

// ─────────────────────────────────────────────────────────────────────────────
// TAB: FEEDBACK ANALYSER
// ─────────────────────────────────────────────────────────────────────────────

function FeedbackAnalyserTab() {
  const [tagFilter, setTagFilter] = useState("All");
  const [auntyFilter, setAuntyFilter] = useState("All");

  const aunties = [
    "All",
    ...Array.from(new Set(FEEDBACK_ITEMS.map((f) => f.aunty))),
  ];
  const tags = ["All", "Quality", "Packaging", "Delivery", "Taste", "Quantity"];

  const filtered = FEEDBACK_ITEMS.filter((f) => {
    if (tagFilter !== "All" && f.tag !== tagFilter) return false;
    if (auntyFilter !== "All" && f.aunty !== auntyFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top insight */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="py-3 px-4 flex items-start gap-2">
          <Flame className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Top Insight:</span> 3 customers
            mentioned soggy packaging for Namakpara in last 7 days — requires
            immediate attention.
          </p>
        </CardContent>
      </Card>

      {/* Charts row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sentiment donut */}
        <Card className="border-slate-100">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Sentiment Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={SENTIMENT_DONUT}
                  cx={55}
                  cy={55}
                  innerRadius={30}
                  outerRadius={52}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {SENTIMENT_DONUT.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1">
              {SENTIMENT_DONUT.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-xs text-slate-600">
                    {d.name}: {d.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issue frequency */}
        <Card className="border-slate-100">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Issue Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[11px]">Issue Type</TableHead>
                  <TableHead className="text-[11px] text-right">
                    Count
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ISSUE_FREQUENCY.map((iss) => (
                  <TableRow key={iss.issue}>
                    <TableCell className="text-xs">{iss.issue}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className="text-xs font-bold"
                        style={{ color: iss.color }}
                      >
                        {iss.count}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-500 font-medium">Issue:</span>
        {tags.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => setTagFilter(t)}
            data-ocid="feedback.tag_filter.tab"
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              tagFilter === t
                ? "bg-amber-500 text-white border-amber-500"
                : "border-slate-200 text-slate-600 hover:border-amber-300"
            }`}
          >
            {t}
          </button>
        ))}
        <span className="text-slate-300">|</span>
        <span className="text-xs text-slate-500 font-medium">Aunty:</span>
        <select
          value={auntyFilter}
          onChange={(e) => setAuntyFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded px-2 py-1"
          data-ocid="feedback.aunty_select"
        >
          {aunties.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Feedback inbox */}
      <div className="space-y-3" data-ocid="feedback.list">
        {filtered.map((f, i) => (
          <Card
            key={f.id}
            className="border-slate-100 hover:shadow-sm transition-shadow"
            data-ocid={`feedback.item.${i + 1}`}
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-800">
                    {f.customer}
                  </span>
                  <StarRating rating={f.rating} />
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0.5"
                  >
                    {f.tag}
                  </Badge>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {f.date}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">
                {f.product} · {f.aunty} · {f.region}
              </p>
              <p className="text-sm text-slate-700">{f.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: CHAT ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

function ChatAnalysisTab() {
  const [chatText, setChatText] = useState("");
  const [analysis, setAnalysis] = useState<null | {
    issueType: string;
    sentiment: string;
    resolution: string;
    keyPhrases: string[];
    followUp: string;
  }>(null);

  function analyseChat() {
    if (!chatText.trim()) return;
    const text = chatText.toLowerCase();
    let issueType = "General Enquiry";
    let sentiment = "Neutral";
    let resolution = "Unresolved";
    const keyPhrases: string[] = [];
    let followUp = "Follow up with customer within 24 hours.";

    if (
      text.includes("delay") ||
      text.includes("late") ||
      text.includes("not received")
    ) {
      issueType = "Delivery Delay";
      sentiment = "Negative";
      keyPhrases.push("delivery delay");
      followUp =
        "Contact delivery partner immediately. Update customer with ETA via WhatsApp.";
    } else if (
      text.includes("packaging") ||
      text.includes("soggy") ||
      text.includes("leak")
    ) {
      issueType = "Packaging Complaint";
      sentiment = "Negative";
      keyPhrases.push("packaging issue");
      followUp =
        "Raise packaging issue with aunty. Offer replacement or refund.";
    } else if (
      text.includes("quality") ||
      text.includes("taste") ||
      text.includes("fresh")
    ) {
      issueType = "Product Quality";
      sentiment =
        text.includes("love") ||
        text.includes("amazing") ||
        text.includes("great")
          ? "Positive"
          : "Negative";
      keyPhrases.push("product quality");
      followUp =
        sentiment === "Positive"
          ? "Thank customer and encourage review."
          : "Escalate quality concern to aunty and admin.";
    } else if (
      text.includes("order") ||
      text.includes("buy") ||
      text.includes("reorder")
    ) {
      issueType = "Order Intent";
      sentiment = "Positive";
      keyPhrases.push("reorder intent");
      followUp = "Send order confirmation with batch dates and WhatsApp link.";
    }

    if (
      text.includes("resolved") ||
      text.includes("thank you") ||
      text.includes("sorted")
    ) {
      resolution = "Resolved";
    } else if (
      text.includes("escalate") ||
      text.includes("complaint") ||
      text.includes("refund")
    ) {
      resolution = "Escalated";
    }

    // Extract key phrases from text
    const words = chatText.split(/\s+/);
    const phrases = words.filter(
      (w) =>
        w.length > 5 &&
        !/^(and|the|for|with|that|this|from|your|have|will|they|them)$/i.test(
          w,
        ),
    );
    keyPhrases.push(
      ...phrases.slice(0, 5).map((w) => w.replace(/[^a-zA-Z]/g, "")),
    );

    setAnalysis({
      issueType,
      sentiment,
      resolution,
      keyPhrases: [...new Set(keyPhrases)].filter(Boolean).slice(0, 6),
      followUp,
    });
  }

  return (
    <div className="space-y-6">
      {/* Input area */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Paste Conversation Excerpt
          </CardTitle>
          <p className="text-xs text-slate-500">
            Paste a WhatsApp or chat conversation between your team and a
            customer or aunty.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Paste conversation excerpt here..."
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            rows={5}
            className="text-sm border-slate-200 resize-none"
            data-ocid="chat.textarea"
          />
          <Button
            onClick={analyseChat}
            disabled={!chatText.trim()}
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm"
            data-ocid="chat.submit_button"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Analyse Conversation
          </Button>
        </CardContent>
      </Card>

      {/* Analysis result */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            data-ocid="chat.success_state"
          >
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-blue-800">
                  Analysis Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                      Issue Type
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {analysis.issueType}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                      Sentiment
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        analysis.sentiment === "Positive"
                          ? "text-green-600"
                          : analysis.sentiment === "Negative"
                            ? "text-red-600"
                            : "text-slate-600"
                      }`}
                    >
                      {analysis.sentiment}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                      Resolution
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        analysis.resolution === "Resolved"
                          ? "text-green-600"
                          : analysis.resolution === "Escalated"
                            ? "text-red-600"
                            : "text-amber-600"
                      }`}
                    >
                      {analysis.resolution}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
                      Key Phrases Extracted
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.keyPhrases.map((p) => (
                        <span
                          key={p}
                          className="text-xs bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-blue-200 rounded-lg p-3">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">
                      Suggested Follow-Up Action
                    </p>
                    <p className="text-sm text-slate-700">
                      {analysis.followUp}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recurring patterns */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Recurring Patterns — Last 30 Chats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {CHAT_PATTERNS.map((p, i) => (
              <div
                key={p.pattern}
                className="flex items-center justify-between"
                data-ocid={`chat.item.${i + 1}`}
              >
                <div className="flex items-center gap-2">
                  {p.trend === "up" ? (
                    <TrendingUp
                      className={`w-4 h-4 ${
                        p.color === "green"
                          ? "text-green-500"
                          : p.color === "red"
                            ? "text-red-500"
                            : "text-amber-500"
                      }`}
                    />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-sm text-slate-700">{p.pattern}</span>
                </div>
                <Badge
                  className={`${
                    p.color === "green"
                      ? "bg-green-100 text-green-700"
                      : p.color === "red"
                        ? "bg-red-100 text-red-700"
                        : p.color === "amber"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-purple-100 text-purple-700"
                  } text-xs`}
                >
                  {p.count}×
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flagged unresolved */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-red-700 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            Flagged Unresolved ({UNRESOLVED_CHATS.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {UNRESOLVED_CHATS.map((u, i) => (
              <div
                key={u.id}
                className="bg-white border border-red-200 rounded-lg p-3 flex items-start justify-between gap-2"
                data-ocid={`chat.unresolved.item.${i + 1}`}
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    {u.customer}
                  </p>
                  <p className="text-xs text-slate-600">{u.issue}</p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {u.date}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: CRISIS ALERT ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function CrisisAlertTab() {
  const levelConfig = {
    critical: {
      bg: "bg-red-50",
      border: "border-red-300",
      badge: "bg-red-600 text-white",
      icon: Flame,
      iconColor: "text-red-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      badge: "bg-amber-500 text-white",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      badge: "bg-blue-500 text-white",
      icon: Info,
      iconColor: "text-blue-600",
    },
  };

  return (
    <div className="space-y-6">
      {/* Active alerts */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-amber-600" /> Active Alerts
        </h3>
        <div className="space-y-3" data-ocid="crisis.alerts_list">
          {CRISIS_ALERTS.map((alert, i) => {
            const cfg = levelConfig[alert.level];
            const Icon = cfg.icon;
            return (
              <Card
                key={alert.id}
                className={`${cfg.bg} ${cfg.border}`}
                data-ocid={`crisis.item.${i + 1}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <Icon
                      className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.iconColor}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                            cfg.badge
                          }`}
                        >
                          {alert.level}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {alert.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400">
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Thresholds */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Alert Trigger Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px]">Rule</TableHead>
                <TableHead className="text-[11px]">Threshold</TableHead>
                <TableHead className="text-[11px]">Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  rule: "Negative mentions",
                  threshold: "> 5 in 4h",
                  level: "Critical",
                },
                {
                  rule: "Rating drop per aunty",
                  threshold: "> 0.5 in 7 days",
                  level: "Warning",
                },
                {
                  rule: "Packaging complaints",
                  threshold: "> 3 in 48h",
                  level: "Warning",
                },
                {
                  rule: "Delivery complaints",
                  threshold: "> 4 in 24h",
                  level: "Critical",
                },
                {
                  rule: "Competitor mention",
                  threshold: "Any in 24h",
                  level: "Info",
                },
              ].map((r) => (
                <TableRow key={r.rule}>
                  <TableCell className="text-xs">{r.rule}</TableCell>
                  <TableCell className="text-xs font-mono">
                    {r.threshold}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[10px] px-1.5 py-0.5 ${
                        r.level === "Critical"
                          ? "bg-red-100 text-red-700"
                          : r.level === "Warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {r.level}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alert history */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Alert History — Last 10
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px]">Time</TableHead>
                <TableHead className="text-[11px]">Type</TableHead>
                <TableHead className="text-[11px]">Message</TableHead>
                <TableHead className="text-[11px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ALERT_HISTORY.map((a, i) => (
                <TableRow key={a.id} data-ocid={`crisis.history_item.${i + 1}`}>
                  <TableCell className="text-[10px] text-slate-400 whitespace-nowrap">
                    {a.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[10px] px-1.5 ${
                        a.type === "Critical"
                          ? "bg-red-100 text-red-700"
                          : a.type === "Warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {a.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-700 max-w-[200px]">
                    {a.message}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[10px] px-1.5 ${
                        a.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {a.status}
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

// ─────────────────────────────────────────────────────────────────────────────
// TAB: IMPROVEMENT MATRIX
// ─────────────────────────────────────────────────────────────────────────────

function ImprovementMatrixTab() {
  const columns = [
    {
      key: "immediate",
      label: "Immediate Action",
      color: "border-red-300",
      header: "bg-red-50",
      accent: "text-red-700",
    },
    {
      key: "medium",
      label: "Medium-Term",
      color: "border-amber-300",
      header: "bg-amber-50",
      accent: "text-amber-700",
    },
    {
      key: "process",
      label: "Process Change",
      color: "border-blue-200",
      header: "bg-blue-50",
      accent: "text-blue-700",
    },
    {
      key: "communication",
      label: "Communication Fix",
      color: "border-purple-200",
      header: "bg-purple-50",
      accent: "text-purple-700",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Auto-populated from Feedback Analyser, Chat Analysis, and Social
        Listening data. Sorted by frequency and business impact.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = IMPROVEMENT_ITEMS.filter((it) => it.col === col.key);
          return (
            <div
              key={col.key}
              className={`border-2 ${col.color} rounded-xl overflow-hidden`}
            >
              <div className={`${col.header} px-3 py-2`}>
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${col.accent}`}
                >
                  {col.label}
                </p>
                <p className="text-[10px] text-slate-500">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="p-2 space-y-2 min-h-[200px]">
                {items.map((item, i) => (
                  <Card
                    key={item.title}
                    className="border-slate-100 shadow-sm"
                    data-ocid={`matrix.${col.key}_item.${i + 1}`}
                  >
                    <CardContent className="py-2.5 px-3">
                      <p className="text-xs font-semibold text-slate-800 mb-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                        {item.detail}
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <PriorityBadge priority={item.priority} />
                        <SourceBadge source={item.source} />
                        <span className="text-[10px] text-slate-400">
                          ×{item.count}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BrandIntelligencePage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "true",
  );

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex items-center gap-3 py-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h1 className="font-display font-bold text-slate-800 text-base leading-tight">
                Brand & Content Intelligence Hub
              </h1>
              <p className="text-[11px] text-slate-500">
                Social listening · Content tracking · Feedback analysis · Crisis
                management
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700 text-[10px]">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 inline-block animate-pulse" />
                Live
              </Badge>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Last updated: just now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl mt-6">
        <Tabs defaultValue="brand-health" className="space-y-6">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex bg-white border border-slate-200 rounded-xl p-1 gap-0.5 min-w-max">
              {[
                {
                  value: "brand-health",
                  label: "Brand Health",
                  icon: BarChart2,
                },
                {
                  value: "social-listening",
                  label: "Social Listening",
                  icon: Radio,
                },
                {
                  value: "content-tracker",
                  label: "Content Tracker",
                  icon: FileText,
                },
                {
                  value: "feedback",
                  label: "Feedback Analyser",
                  icon: MessageSquare,
                },
                {
                  value: "chat-analysis",
                  label: "Chat Analysis",
                  icon: MessageCircle,
                },
                { value: "crisis", label: "Crisis Alerts", icon: ShieldAlert },
                {
                  value: "improvement",
                  label: "Improvement Matrix",
                  icon: BookOpen,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    data-ocid={`brand.${tab.value}.tab`}
                    className="text-xs px-3 py-1.5 flex items-center gap-1.5 data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg whitespace-nowrap"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <TabsContent value="brand-health">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BrandHealthTab />
            </motion.div>
          </TabsContent>

          <TabsContent value="social-listening">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SocialListeningTab />
            </motion.div>
          </TabsContent>

          <TabsContent value="content-tracker">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ContentTrackerTab />
            </motion.div>
          </TabsContent>

          <TabsContent value="feedback">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FeedbackAnalyserTab />
            </motion.div>
          </TabsContent>

          <TabsContent value="chat-analysis">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ChatAnalysisTab />
            </motion.div>
          </TabsContent>

          <TabsContent value="crisis">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CrisisAlertTab />
            </motion.div>
          </TabsContent>

          <TabsContent value="improvement">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ImprovementMatrixTab />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
