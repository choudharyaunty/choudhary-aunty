import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Globe2,
  Handshake,
  Heart,
  Leaf,
  MapPin,
  Share2,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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
        <div className="text-4xl mb-4">🌿</div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Impact Dashboard
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-6">
          Enter your access password to continue
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            data-ocid="impact.input"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
          />
          {error && (
            <p
              data-ocid="impact.error_state"
              className="text-destructive text-xs font-body"
            >
              Incorrect password. Try again.
            </p>
          )}
          <Button
            data-ocid="impact.submit_button"
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
// HELPERS
// ─────────────────────────────────────────────
function KpiCard({
  icon,
  value,
  label,
  sub,
  accent = false,
}: {
  icon: string;
  value: string;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-5 flex flex-col gap-1 ${
        accent
          ? "bg-gradient-to-br from-emerald-800 to-emerald-600 text-white border-0"
          : "bg-card border border-border"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <div
        className={`font-display text-3xl font-bold ${
          accent ? "text-white" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div
        className={`font-body text-sm font-semibold ${
          accent ? "text-emerald-100" : "text-foreground"
        }`}
      >
        {label}
      </div>
      {sub && (
        <div
          className={`font-body text-xs ${
            accent ? "text-emerald-200" : "text-muted-foreground"
          }`}
        >
          {sub}
        </div>
      )}
    </motion.div>
  );
}

function ProgressGoal({
  label,
  current,
  target,
  pct,
  index,
}: {
  label: string;
  current: string;
  target: string;
  pct: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-body text-sm font-semibold text-foreground">
            {label}
          </div>
          <div className="font-body text-xs text-muted-foreground mt-0.5">
            Target: {target}
          </div>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-body text-xs">
          {pct.toFixed(1)}%
        </Badge>
      </div>
      <Progress value={pct} className="h-2.5 mb-2" />
      <div className="flex justify-between">
        <span className="font-body text-xs text-muted-foreground">
          Current:{" "}
          <span className="font-semibold text-foreground">{current}</span>
        </span>
        <span className="font-body text-xs text-muted-foreground">
          Goal: {target}
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function ImpactDashboardPage() {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem("ca_impact_unlocked") === "1";
  });

  const handleUnlock = () => {
    setUnlocked(true);
    localStorage.setItem("ca_impact_unlocked", "1");
  };

  if (!unlocked) return <PasswordGate onUnlock={handleUnlock} />;

  const stateData = [
    { state: "Bihar", meals: 8420, color: "bg-emerald-600" },
    { state: "Uttar Pradesh", meals: 5230, color: "bg-emerald-500" },
    { state: "West Bengal", meals: 3940, color: "bg-emerald-400" },
    { state: "Rajasthan", meals: 2860, color: "bg-emerald-300" },
    { state: "Jharkhand", meals: 1750, color: "bg-emerald-200" },
    { state: "Others", meals: 1200, color: "bg-muted" },
  ];
  const maxMeals = Math.max(...stateData.map((s) => s.meals));

  const heritageRecipes = [
    {
      name: "Litti Chokha",
      state: "Bihar",
      region: "Bhojpur",
      tag: "Heritage",
    },
    { name: "Sattu Paratha", state: "Bihar", region: "Patna", tag: "Heritage" },
    { name: "Thekua", state: "Bihar", region: "Darbhanga", tag: "Festival" },
    { name: "Dal Pitha", state: "Bihar", region: "Mithila", tag: "Heritage" },
    { name: "Khaja", state: "Bihar", region: "Silao", tag: "GI Tagged" },
    { name: "Malpua", state: "Rajasthan", region: "Pushkar", tag: "Heritage" },
    { name: "Pitha", state: "West Bengal", region: "Kolkata", tag: "Festival" },
    { name: "Shahi Tukda", state: "UP", region: "Lucknow", tag: "Royal" },
    { name: "Baati", state: "Rajasthan", region: "Jodhpur", tag: "Heritage" },
  ];

  const testimonials = [
    {
      name: "Savita Devi",
      location: "Patna, Bihar",
      quote:
        "Before joining Choudhary Aunty, I earned ₹3,000 a month doing odd jobs. Now I make ₹18,000 every month from my kitchen. My daughter is in college because of this.",
      before: "₹3,000/mo",
      after: "₹18,000/mo",
      emoji: "👩‍🍳",
    },
    {
      name: "Rekha Sharma",
      location: "Muzaffarpur, Bihar",
      quote:
        "I never thought my mango pickle recipe could reach customers across India. Now I have 200 regular customers and I feel proud every single day.",
      before: "No income",
      after: "₹14,500/mo",
      emoji: "🥒",
    },
    {
      name: "Anita Kumari",
      location: "Gaya, Bihar",
      quote:
        "The platform helped me get FSSAI certified. I started with 5 orders a week. Now I do 40+ orders and have hired my neighbour to help me pack.",
      before: "₹1,200/mo",
      after: "₹22,000/mo",
      emoji: "🍱",
    },
  ];

  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 space-y-16">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/8 via-transparent to-saffron/5 rounded-3xl pointer-events-none" />
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-body text-xs mb-4 px-3 py-1">
            🌿 Social Impact Report 2025
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            Real Women.
            <br />
            <span className="text-emerald-700">Real Impact.</span>
          </h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Choudhary Aunty is India's first home-chef-first food marketplace
            dedicated to empowering women through the power of authentic
            regional cooking.
          </p>
        </motion.section>

        {/* Hero KPI Strip */}
        <section data-ocid="impact.section">
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-600" /> Impact at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <KpiCard
              icon="👩"
              value="847"
              label="Women Empowered"
              sub="Home chefs across 12 states"
              accent
            />
            <KpiCard
              icon="💰"
              value="₹2.4 Cr"
              label="Income Generated"
              sub="Total earnings paid to chefs"
            />
            <KpiCard
              icon="🗺️"
              value="12"
              label="States Covered"
              sub="Bihar, UP, WB, RJ & more"
            />
            <KpiCard
              icon="🍱"
              value="23,400"
              label="Meals Delivered"
              sub="Authentic home-cooked meals"
            />
            <KpiCard
              icon="📜"
              value="156"
              label="Regional Recipes Preserved"
              sub="Unique heritage dishes"
              accent
            />
            <KpiCard
              icon="🏡"
              value="94%"
              label="Aunties from Rural Areas"
              sub="Empowering tier-2/3 towns"
            />
          </div>
        </section>

        {/* Women Empowerment Story */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" /> Women Empowerment
            Story
          </h2>

          {/* Income chart */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h3 className="font-body font-semibold text-foreground mb-4">
              Average Monthly Earnings by Aunty Tier
            </h3>
            <div className="space-y-3">
              {[
                { tier: "Starter (0–3 months)", earnings: 4200, max: 22000 },
                {
                  tier: "Rising Star (3–12 months)",
                  earnings: 9800,
                  max: 22000,
                },
                {
                  tier: "Established (1–2 years)",
                  earnings: 15600,
                  max: 22000,
                },
                { tier: "Master Chef (2+ years)", earnings: 22000, max: 22000 },
              ].map((row, i) => (
                <div key={row.tier} className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted-foreground w-44 flex-shrink-0">
                    {row.tier}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(row.earnings / row.max) * 100}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    />
                  </div>
                  <span className="font-body text-xs font-semibold text-emerald-700 w-20 text-right">
                    ₹{row.earnings.toLocaleString()}/mo
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="font-body text-sm font-semibold text-red-700 mb-1">
                Before Joining
              </div>
              <div className="font-display text-2xl font-bold text-red-600 mb-1">
                ₹2,400
              </div>
              <div className="font-body text-xs text-red-500">
                Average household monthly income
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="font-body text-sm font-semibold text-emerald-700 mb-1">
                After Joining
              </div>
              <div className="font-display text-2xl font-bold text-emerald-600 mb-1">
                ₹11,800
              </div>
              <div className="font-body text-xs text-emerald-500">
                Average household monthly income (+392%)
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`impact.card.${i + 1}`}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                    {t.emoji}
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="font-body text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {t.location}
                    </div>
                  </div>
                </div>
                <blockquote className="font-body text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex gap-2 mt-auto">
                  <span className="bg-red-50 border border-red-100 text-red-600 text-xs font-body px-2 py-1 rounded-lg">
                    Before: {t.before}
                  </span>
                  <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-body px-2 py-1 rounded-lg">
                    Now: {t.after}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Impact Metrics */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-emerald-600" /> Social Impact
            Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meals by state */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-foreground mb-4">
                Meals Delivered by State
              </h3>
              <div className="space-y-3">
                {stateData.map((s, i) => (
                  <div key={s.state} className="flex items-center gap-3">
                    <span className="font-body text-xs text-muted-foreground w-24 flex-shrink-0">
                      {s.state}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(s.meals / maxMeals) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08 }}
                        className={`h-full ${s.color} rounded-full`}
                      />
                    </div>
                    <span className="font-body text-xs font-semibold text-foreground w-14 text-right">
                      {s.meals.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment stats */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="font-body text-xs text-muted-foreground mb-1">
                  Families Supported
                </div>
                <div className="font-display text-3xl font-bold text-foreground">
                  847
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  Direct household beneficiaries
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="font-body text-xs text-muted-foreground mb-1">
                  Direct Employment Created
                </div>
                <div className="font-display text-3xl font-bold text-emerald-600">
                  847
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  Home chefs actively earning
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="font-body text-xs text-muted-foreground mb-1">
                  Indirect Employment
                </div>
                <div className="font-display text-3xl font-bold text-foreground">
                  2,400+
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  Packaging, delivery & support ecosystem
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Cuisine Preservation */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Star className="w-6 h-6 text-gold" /> Regional Cuisine Preservation
          </h2>
          <p className="font-body text-muted-foreground text-sm mb-5">
            156 unique regional recipes preserved · 9 languages represented · 12
            culinary traditions active
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {heritageRecipes.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`impact.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="font-body text-sm font-semibold text-foreground mb-1">
                  {r.name}
                </div>
                <div className="font-body text-xs text-muted-foreground mb-2">
                  {r.region}, {r.state}
                </div>
                <Badge
                  className={`text-xs font-body ${
                    r.tag === "Heritage"
                      ? "bg-saffron/20 text-terracotta border-saffron/30"
                      : r.tag === "GI Tagged"
                        ? "bg-gold/20 text-warmBrown border-gold/30"
                        : r.tag === "Royal"
                          ? "bg-burgundy/10 text-burgundy border-burgundy/20"
                          : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {r.tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Environmental Impact */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-600" /> Environmental Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">♻️</div>
              <div className="font-display text-2xl font-bold text-emerald-700">
                4.2 Tonnes
              </div>
              <div className="font-body text-sm text-emerald-600 font-semibold">
                Plastic Packaging Avoided
              </div>
              <div className="font-body text-xs text-emerald-500 mt-1">
                vs. equivalent restaurant orders
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🌾</div>
              <div className="font-display text-2xl font-bold text-emerald-700">
                78%
              </div>
              <div className="font-body text-sm text-emerald-600 font-semibold">
                Local Sourcing Rate
              </div>
              <div className="font-body text-xs text-emerald-500 mt-1">
                Ingredients sourced within 50km
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🌍</div>
              <div className="font-display text-2xl font-bold text-emerald-700">
                -32%
              </div>
              <div className="font-body text-sm text-emerald-600 font-semibold">
                Carbon vs. Restaurant
              </div>
              <div className="font-body text-xs text-emerald-500 mt-1">
                Lower food miles & no commercial kitchen
              </div>
            </div>
          </div>
        </section>

        {/* Goals & Progress */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" /> Goals & Progress
            Toward 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProgressGoal
              label="Women Chefs Onboarded"
              current="847"
              target="10,000"
              pct={8.47}
              index={0}
            />
            <ProgressGoal
              label="Monthly GMV"
              current="₹48L"
              target="₹10 Cr"
              pct={4.8}
              index={1}
            />
            <ProgressGoal
              label="States Covered"
              current="12"
              target="25"
              pct={48}
              index={2}
            />
            <ProgressGoal
              label="Monthly Meals Delivered"
              current="23,400"
              target="1,00,000"
              pct={23.4}
              index={3}
            />
          </div>
        </section>

        {/* CSR / Shareable Section */}
        <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🌿</div>
          <h2 className="font-display text-2xl font-bold mb-2">
            Partner With Our Mission
          </h2>
          <p className="font-body text-emerald-100 text-sm max-w-lg mx-auto mb-6">
            Join us in empowering India's home chefs and preserving regional
            culinary heritage. We welcome CSR partnerships, impact investors,
            government collaborations, and media coverage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              data-ocid="impact.primary_button"
              onClick={() => alert("Generating Impact Report PDF... (demo)")}
              className="bg-white text-emerald-800 hover:bg-emerald-50 font-body font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Impact Report (PDF)
            </Button>
            <Button
              data-ocid="impact.secondary_button"
              variant="outline"
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(
                  "Choudhary Aunty is empowering 847 women home chefs across India. Check out the impact dashboard!",
                );
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
                  "_blank",
                );
              }}
              className="border-white/40 text-white hover:bg-white/10 font-body font-semibold flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Share on LinkedIn
            </Button>
            <a
              data-ocid="impact.link"
              href="mailto:kaisehoaunty@gmail.com?subject=Partnership Enquiry - Choudhary Aunty Impact"
              className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 px-4 py-2 rounded-lg font-body text-sm font-semibold transition-colors"
            >
              <Handshake className="w-4 h-4" /> Partnership Enquiry
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
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
