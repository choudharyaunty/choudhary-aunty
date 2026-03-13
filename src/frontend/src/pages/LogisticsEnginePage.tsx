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
import {
  AlertTriangle,
  Box,
  CheckCircle,
  Clock,
  Edit,
  GitBranch,
  Lock,
  MapPin,
  Package,
  Plus,
  Search,
  Shield,
  Truck,
  XCircle,
  Zap,
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

// ── Pincode Data ─────────────────────────────────────────────────────────────

type PincodeResult = {
  pincode: string;
  serviceable: boolean;
  edd: string;
  cod: boolean;
  bestCourier: string;
  couriers: string[];
};

const PINCODE_DB: Record<string, PincodeResult> = {
  "110001": {
    pincode: "110001",
    serviceable: true,
    edd: "2-3 days",
    cod: true,
    bestCourier: "Delhivery",
    couriers: ["Delhivery", "BlueDart", "Ecom Express"],
  },
  "400001": {
    pincode: "400001",
    serviceable: true,
    edd: "3-4 days",
    cod: true,
    bestCourier: "BlueDart",
    couriers: ["BlueDart", "Delhivery", "DTDC"],
  },
  "700001": {
    pincode: "700001",
    serviceable: true,
    edd: "2-4 days",
    cod: true,
    bestCourier: "Ecom Express",
    couriers: ["Ecom Express", "Delhivery", "DTDC"],
  },
  "600001": {
    pincode: "600001",
    serviceable: true,
    edd: "3-5 days",
    cod: false,
    bestCourier: "BlueDart",
    couriers: ["BlueDart", "Delhivery"],
  },
  "500001": {
    pincode: "500001",
    serviceable: true,
    edd: "2-3 days",
    cod: true,
    bestCourier: "Delhivery",
    couriers: ["Delhivery", "Ecom Express", "DTDC"],
  },
  "800001": {
    pincode: "800001",
    serviceable: true,
    edd: "3-4 days",
    cod: true,
    bestCourier: "DTDC",
    couriers: ["DTDC", "Delhivery"],
  },
  "560001": {
    pincode: "560001",
    serviceable: true,
    edd: "2-3 days",
    cod: true,
    bestCourier: "BlueDart",
    couriers: ["BlueDart", "Delhivery", "Ecom Express", "DTDC"],
  },
  "380001": {
    pincode: "380001",
    serviceable: true,
    edd: "3-4 days",
    cod: true,
    bestCourier: "Delhivery",
    couriers: ["Delhivery", "DTDC"],
  },
  "999999": {
    pincode: "999999",
    serviceable: false,
    edd: "N/A",
    cod: false,
    bestCourier: "N/A",
    couriers: [],
  },
};

function lookupPincode(pin: string): PincodeResult {
  const found = PINCODE_DB[pin.trim()];
  if (found) return found;
  // simulate: pincodes starting with 1-8 are serviceable
  const first = pin.trim()[0];
  if (first && Number.parseInt(first) >= 1 && Number.parseInt(first) <= 8) {
    return {
      pincode: pin.trim(),
      serviceable: true,
      edd: "4-6 days",
      cod: Number.parseInt(first) % 2 === 0,
      bestCourier: "Delhivery",
      couriers: ["Delhivery", "DTDC"],
    };
  }
  return {
    pincode: pin.trim(),
    serviceable: false,
    edd: "N/A",
    cod: false,
    bestCourier: "N/A",
    couriers: [],
  };
}

const RECENT_PINCODES = [
  "110001",
  "400001",
  "700001",
  "560001",
  "600001",
  "500001",
  "800001",
  "380001",
  "302001",
  "226001",
];

// ── EDD Calculator Data ───────────────────────────────────────────────────────

const CATEGORY_PACKAGING: Record<string, string> = {
  Achar: "Oil-proof inner pouch + rigid outer box",
  Sweets: "Moisture-proof food-grade box + cushioning",
  Namkeen: "Airtight sealed pouch + corrugated outer",
  Premium: "Rigid gift box + ribbon + tissue wrap",
  Other: "Standard corrugated box + bubble wrap",
};

const BATCH_EDD_SAMPLES = [
  {
    batchId: "BCH-2847",
    product: "Coconut Laddoo (Premium)",
    auntyCity: "Patna",
    customerCity: "Delhi",
    weight: "1.2 kg",
    edd: "Dec 16",
    courier: "BlueDart",
    cost: "₹98",
  },
  {
    batchId: "BCH-2848",
    product: "Mango Achar",
    auntyCity: "Muzaffarpur",
    customerCity: "Mumbai",
    weight: "0.6 kg",
    edd: "Dec 17",
    courier: "Delhivery",
    cost: "₹85",
  },
  {
    batchId: "BCH-2849",
    product: "Namakpara Mix",
    auntyCity: "Gaya",
    customerCity: "Bengaluru",
    weight: "0.5 kg",
    edd: "Dec 18",
    courier: "Ecom Express",
    cost: "₹92",
  },
  {
    batchId: "BCH-2850",
    product: "Gulab Khaja",
    auntyCity: "Bhagalpur",
    customerCity: "Hyderabad",
    weight: "1.0 kg",
    edd: "Dec 17",
    courier: "Delhivery",
    cost: "₹89",
  },
  {
    batchId: "BCH-2851",
    product: "Sattu Laddoo (Meva)",
    auntyCity: "Darbhanga",
    customerCity: "Kolkata",
    weight: "1.5 kg",
    edd: "Dec 15",
    courier: "DTDC",
    cost: "₹76",
  },
];

// ── Packaging Profiles Data ───────────────────────────────────────────────────

type PackagingProfile = {
  id: string;
  category: string;
  icon: string;
  innerPacking: string;
  outerPacking: string;
  maxWeight: string;
  dims: string;
  packedWeight: string;
  active: boolean;
  synced: boolean;
};

const PACKAGING_PROFILES_INIT: PackagingProfile[] = [
  {
    id: "1",
    category: "Achar (Pickles)",
    icon: "🫙",
    innerPacking: "Oil-proof inner pouch",
    outerPacking: "Rigid outer box",
    maxWeight: "500g per unit",
    dims: "15×10×8 cm",
    packedWeight: "0.6 kg",
    active: true,
    synced: true,
  },
  {
    id: "2",
    category: "Sweets / Laddoo",
    icon: "🍬",
    innerPacking: "Moisture-proof food-grade box",
    outerPacking: "Cushioned corrugated",
    maxWeight: "1 kg per unit",
    dims: "20×15×10 cm",
    packedWeight: "1.2 kg",
    active: true,
    synced: true,
  },
  {
    id: "3",
    category: "Namkeen",
    icon: "🥜",
    innerPacking: "Airtight sealed pouch",
    outerPacking: "Corrugated outer",
    maxWeight: "500g per unit",
    dims: "18×12×6 cm",
    packedWeight: "0.6 kg",
    active: true,
    synced: false,
  },
  {
    id: "4",
    category: "Premium / Gift",
    icon: "🎁",
    innerPacking: "Premium rigid box + ribbon + tissue",
    outerPacking: "Heavy corrugated + fragile stickers",
    maxWeight: "2 kg per unit",
    dims: "30×25×15 cm",
    packedWeight: "2.5 kg",
    active: true,
    synced: true,
  },
  {
    id: "5",
    category: "Beverages / Sherbets",
    icon: "🫗",
    innerPacking: "Leak-proof bottle cap seal",
    outerPacking: "Bubble wrap + corrugated",
    maxWeight: "1L per unit",
    dims: "25×10×10 cm",
    packedWeight: "1.3 kg",
    active: false,
    synced: false,
  },
];

// ── Split Shipments Data ──────────────────────────────────────────────────────

const SPLIT_ORDERS = [
  {
    orderId: "ORD-7821",
    customer: "Priya Sharma",
    legs: 2,
    auntyLocations: "Patna, Muzaffarpur",
    statusA: "Dispatched",
    statusB: "Preparing",
    totalCost: "₹183",
    saved: "₹34 vs separate orders",
  },
  {
    orderId: "ORD-7834",
    customer: "Rahul Verma",
    legs: 2,
    auntyLocations: "Gaya, Bhagalpur",
    statusA: "In Transit",
    statusB: "Dispatched",
    totalCost: "₹201",
    saved: "₹28 vs separate orders",
  },
  {
    orderId: "ORD-7856",
    customer: "Meera Gupta",
    legs: 2,
    auntyLocations: "Darbhanga, Patna",
    statusA: "Delivered",
    statusB: "In Transit",
    totalCost: "₹168",
    saved: "₹41 vs separate orders",
  },
];

// ── SLA Data ─────────────────────────────────────────────────────────────────

const SLA_RULES = [
  {
    category: "Achar",
    dispatchSLA: "24h",
    deliverySLA: "3-5 days",
    penalty: "₹50 credit to customer",
  },
  {
    category: "Sweets / Laddoo",
    dispatchSLA: "12h",
    deliverySLA: "2-4 days",
    penalty: "₹75 credit + escalation",
  },
  {
    category: "Namkeen",
    dispatchSLA: "24h",
    deliverySLA: "3-5 days",
    penalty: "₹50 credit to customer",
  },
  {
    category: "Premium / Gift",
    dispatchSLA: "6h",
    deliverySLA: "1-3 days",
    penalty: "₹150 credit + full review",
  },
];

type SLAOrder = {
  orderId: string;
  aunty: string;
  product: string;
  batchClose: string;
  hoursRemaining: number;
  status: "On Track" | "At Risk" | "Breached";
};

const AT_RISK_ORDERS: SLAOrder[] = [
  {
    orderId: "ORD-7841",
    aunty: "Sunita Devi",
    product: "Coconut Laddoo",
    batchClose: "Dec 13, 10:00 AM",
    hoursRemaining: 8,
    status: "On Track",
  },
  {
    orderId: "ORD-7842",
    aunty: "Priya Singh",
    product: "Mango Achar",
    batchClose: "Dec 13, 8:00 AM",
    hoursRemaining: 3,
    status: "At Risk",
  },
  {
    orderId: "ORD-7843",
    aunty: "Kamla Devi",
    product: "Premium Gift Box",
    batchClose: "Dec 13, 6:00 AM",
    hoursRemaining: -2,
    status: "Breached",
  },
  {
    orderId: "ORD-7844",
    aunty: "Reena Jha",
    product: "Namakpara",
    batchClose: "Dec 13, 12:00 PM",
    hoursRemaining: 18,
    status: "On Track",
  },
  {
    orderId: "ORD-7845",
    aunty: "Meena Kumari",
    product: "Sattu Laddoo",
    batchClose: "Dec 13, 9:00 AM",
    hoursRemaining: 5,
    status: "At Risk",
  },
  {
    orderId: "ORD-7846",
    aunty: "Anju Choudhary",
    product: "Coconut Laddoo",
    batchClose: "Dec 13, 2:00 PM",
    hoursRemaining: 22,
    status: "On Track",
  },
  {
    orderId: "ORD-7847",
    aunty: "Savita Rani",
    product: "Gulab Khaja",
    batchClose: "Dec 13, 11:00 AM",
    hoursRemaining: 14,
    status: "On Track",
  },
  {
    orderId: "ORD-7848",
    aunty: "Usha Devi",
    product: "Mango Achar",
    batchClose: "Dec 13, 7:00 AM",
    hoursRemaining: 11,
    status: "On Track",
  },
];

const BREACH_CHART_DATA = [
  { week: "Nov W1", breaches: 3 },
  { week: "Nov W2", breaches: 1 },
  { week: "Nov W3", breaches: 5 },
  { week: "Nov W4", breaches: 2 },
  { week: "Dec W1", breaches: 4 },
  { week: "Dec W2", breaches: 2 },
];

// ── Password Gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (val === PASSWORD) {
      onSuccess();
    } else {
      setErr(true);
      setVal("");
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0f1115 0%, #1a1f2e 50%, #0f1115 100%)",
      }}
    >
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
          >
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Logistics Engine
          </h1>
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            Shiprocket operations &amp; SLA monitoring
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#64748b" }}
            />
            <Input
              type="password"
              placeholder="Enter access password"
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
                setErr(false);
              }}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
              data-ocid="logistics.input"
            />
          </div>
          {err && (
            <p
              className="text-xs text-red-400"
              data-ocid="logistics.error_state"
            >
              Incorrect password. Try amar2026.
            </p>
          )}
          <Button
            type="submit"
            className="w-full font-semibold"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#fff",
            }}
            data-ocid="logistics.submit_button"
          >
            Access Logistics Engine
          </Button>
        </form>
      </div>
    </main>
  );
}

// ── Tab 1: Pincode Check ──────────────────────────────────────────────────────

function PincodeTab() {
  const [single, setSingle] = useState("");
  const [singleResult, setSingleResult] = useState<PincodeResult | null>(null);
  const [bulkInput, setBulkInput] = useState("");
  const [bulkResults, setBulkResults] = useState<PincodeResult[]>([]);
  const [recentList] = useState<string[]>(RECENT_PINCODES);

  function checkSingle() {
    if (single.length >= 5) setSingleResult(lookupPincode(single));
  }

  function checkBulk() {
    const pins = bulkInput
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length >= 5);
    setBulkResults(pins.map(lookupPincode));
  }

  const serviceableCount = recentList.filter(
    (p) => lookupPincode(p).serviceable,
  ).length;
  const codCount = recentList.filter((p) => lookupPincode(p).cod).length;

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {
            label: "Serviceable (Recent 10)",
            value: `${serviceableCount}/10`,
            icon: (
              <CheckCircle className="w-4 h-4" style={{ color: "#22c55e" }} />
            ),
          },
          {
            label: "COD Coverage",
            value: `${Math.round((codCount / 10) * 100)}%`,
            icon: <Shield className="w-4 h-4" style={{ color: "#f59e0b" }} />,
          },
          {
            label: "Avg Delivery Days",
            value: "3.2",
            icon: <Clock className="w-4 h-4" style={{ color: "#60a5fa" }} />,
          },
        ].map((s) => (
          <Card
            key={s.label}
            className="border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                {s.icon}
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  {s.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Single check */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <MapPin className="w-4 h-4" style={{ color: "#f59e0b" }} />
            Single Pincode Check
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter 6-digit pincode (e.g. 110001)"
              value={single}
              onChange={(e) => setSingle(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              maxLength={6}
              data-ocid="pincode.input"
            />
            <Button
              onClick={checkSingle}
              style={{ background: "#f59e0b", color: "#000" }}
              className="font-semibold shrink-0"
              data-ocid="pincode.primary_button"
            >
              <Search className="w-4 h-4 mr-1" />
              Check
            </Button>
          </div>
          {singleResult && (
            <div
              className="rounded-xl p-4 border"
              style={{
                background: singleResult.serviceable
                  ? "rgba(34,197,94,0.08)"
                  : "rgba(239,68,68,0.08)",
                borderColor: singleResult.serviceable
                  ? "rgba(34,197,94,0.2)"
                  : "rgba(239,68,68,0.2)",
              }}
              data-ocid="pincode.success_state"
            >
              <div className="flex items-center gap-2 mb-3">
                {singleResult.serviceable ? (
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: "#22c55e" }}
                  />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                )}
                <span className="font-bold text-white text-lg">
                  {singleResult.pincode}
                </span>
                <Badge
                  className="ml-1"
                  style={{
                    background: singleResult.serviceable
                      ? "#15803d"
                      : "#991b1b",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {singleResult.serviceable ? "Serviceable" : "Not Serviceable"}
                </Badge>
              </div>
              {singleResult.serviceable && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <div className="text-xs" style={{ color: "#94a3b8" }}>
                      EDD
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {singleResult.edd}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#94a3b8" }}>
                      COD
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{
                        color: singleResult.cod ? "#22c55e" : "#f87171",
                      }}
                    >
                      {singleResult.cod ? "Available" : "Prepaid Only"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#94a3b8" }}>
                      Best Courier
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {singleResult.bestCourier}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#94a3b8" }}>
                      Partners
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {singleResult.couriers.length}
                    </div>
                  </div>
                </div>
              )}
              {singleResult.serviceable && singleResult.couriers.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {singleResult.couriers.map((c) => (
                    <Badge
                      key={c}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: "rgba(245,158,11,0.4)",
                        color: "#fbbf24",
                      }}
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk check */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <Package className="w-4 h-4" style={{ color: "#f59e0b" }} />
            Bulk Pincode Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="110001, 400001, 700001, ..."
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              data-ocid="pincode.search_input"
            />
            <Button
              onClick={checkBulk}
              variant="outline"
              className="shrink-0 border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
              data-ocid="pincode.secondary_button"
            >
              Run Check
            </Button>
          </div>
          {bulkResults.length > 0 && (
            <div className="overflow-x-auto" data-ocid="pincode.table">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    {["Pincode", "Status", "EDD", "COD", "Best Courier"].map(
                      (h) => (
                        <TableHead
                          key={h}
                          className="text-xs font-semibold"
                          style={{ color: "#94a3b8" }}
                        >
                          {h}
                        </TableHead>
                      ),
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bulkResults.map((r, i) => (
                    <TableRow
                      key={r.pincode}
                      className="border-white/5"
                      data-ocid={`pincode.item.${i + 1}`}
                    >
                      <TableCell className="text-white font-mono text-sm">
                        {r.pincode}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            background: r.serviceable ? "#15803d" : "#991b1b",
                            color: "#fff",
                            border: "none",
                          }}
                          className="text-xs"
                        >
                          {r.serviceable
                            ? "✓ Serviceable"
                            : "✗ Not Serviceable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white text-sm">
                        {r.edd}
                      </TableCell>
                      <TableCell
                        style={{ color: r.cod ? "#22c55e" : "#f87171" }}
                        className="text-sm"
                      >
                        {r.cod ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="text-white text-sm">
                        {r.bestCourier}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recently checked */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">
            Recently Checked Pincodes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recentList.map((p) => {
              const r = lookupPincode(p);
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => {
                    setSingle(p);
                    setSingleResult(r);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: r.serviceable ? "#86efac" : "#fca5a5",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`pincode.toggle.${recentList.indexOf(p) + 1}`}
                >
                  {r.serviceable ? "●" : "○"} {p}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab 2: EDD Calculator ─────────────────────────────────────────────────────

function EddTab() {
  const [src, setSrc] = useState("");
  const [dst, setDst] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("Sweets");
  const [result, setResult] = useState<null | {
    date: string;
    window: string;
    courier: string;
    cost: string;
    packaging: string;
  }>(null);

  function calculate() {
    const w = Number.parseFloat(weight) || 1;
    const baseDays = src[0] === dst[0] ? 2 : 4;
    const cost = Math.round(60 + w * 25 + baseDays * 5);
    const today = new Date();
    today.setDate(today.getDate() + baseDays + 1);
    const dateStr = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    setResult({
      date: dateStr,
      window: `${baseDays}-${baseDays + 2} working days`,
      courier: cost > 150 ? "BlueDart" : "Delhivery",
      cost: `₹${cost}`,
      packaging: CATEGORY_PACKAGING[category] ?? CATEGORY_PACKAGING.Other,
    });
  }

  return (
    <div className="space-y-6">
      {/* Note banner */}
      <div
        className="flex items-start gap-3 rounded-xl p-4 border"
        style={{
          background: "rgba(96,165,250,0.08)",
          borderColor: "rgba(96,165,250,0.2)",
        }}
      >
        <Zap className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#60a5fa" }} />
        <p className="text-sm" style={{ color: "#93c5fd" }}>
          <span className="font-semibold text-white">
            EDD shown to customer at checkout
          </span>{" "}
          is based on{" "}
          <strong>batch close date + prep time (2-4h) + transit time</strong>.
          This calculator estimates transit time only.
        </p>
      </div>

      {/* Form */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <Clock className="w-4 h-4" style={{ color: "#f59e0b" }} />
            EDD Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#94a3b8" }}>
                Source Pincode (Aunty Location)
              </Label>
              <Input
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="800001 (Patna)"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                maxLength={6}
                data-ocid="edd.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#94a3b8" }}>
                Destination Pincode (Customer)
              </Label>
              <Input
                value={dst}
                onChange={(e) => setDst(e.target.value)}
                placeholder="110001 (Delhi)"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                maxLength={6}
                data-ocid="edd.search_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#94a3b8" }}>
                Weight (kg)
              </Label>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="1.2"
                type="number"
                min="0.1"
                step="0.1"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                data-ocid="edd.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#94a3b8" }}>
                Product Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className="bg-white/5 border-white/10 text-white"
                  data-ocid="edd.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Achar", "Sweets", "Namkeen", "Premium", "Other"].map(
                    (c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={calculate}
            style={{ background: "#f59e0b", color: "#000" }}
            className="font-semibold"
            data-ocid="edd.primary_button"
          >
            Calculate EDD
          </Button>
          {result && (
            <div
              className="rounded-xl p-4 mt-2 border"
              style={{
                background: "rgba(245,158,11,0.08)",
                borderColor: "rgba(245,158,11,0.2)",
              }}
              data-ocid="edd.success_state"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>
                    Estimated Delivery
                  </div>
                  <div className="text-lg font-bold text-white">
                    {result.date}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>
                    Delivery Window
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {result.window}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>
                    Recommended Courier
                  </div>
                  <div className="text-sm font-semibold text-amber-400">
                    {result.courier}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>
                    Est. Shipping Cost
                  </div>
                  <div className="text-lg font-bold text-white">
                    {result.cost}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-3 border-t border-white/10">
                <Box
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "#f59e0b" }}
                />
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>
                    Packaging Recommendation
                  </div>
                  <div className="text-sm text-white">{result.packaging}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch EDD table */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base">
            Upcoming Batch EDDs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" data-ocid="edd.table">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  {[
                    "Batch ID",
                    "Product",
                    "Aunty City",
                    "Customer City",
                    "Weight",
                    "EDD",
                    "Courier",
                    "Cost",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-xs"
                      style={{ color: "#94a3b8" }}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {BATCH_EDD_SAMPLES.map((b, i) => (
                  <TableRow
                    key={b.batchId}
                    className="border-white/5"
                    data-ocid={`edd.item.${i + 1}`}
                  >
                    <TableCell className="text-white font-mono text-xs">
                      {b.batchId}
                    </TableCell>
                    <TableCell className="text-white text-xs">
                      {b.product}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {b.auntyCity}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {b.customerCity}
                    </TableCell>
                    <TableCell className="text-white text-xs">
                      {b.weight}
                    </TableCell>
                    <TableCell className="font-semibold text-amber-400 text-xs">
                      {b.edd}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {b.courier}
                    </TableCell>
                    <TableCell className="text-white text-xs">
                      {b.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab 3: Packaging Profiles ─────────────────────────────────────────────────

function PackagingTab() {
  const [profiles, setProfiles] = useState<PackagingProfile[]>(
    PACKAGING_PROFILES_INIT,
  );
  const [editProfile, setEditProfile] = useState<PackagingProfile | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newProfile, setNewProfile] = useState({
    category: "",
    innerPacking: "",
    outerPacking: "",
    maxWeight: "",
    dims: "",
    packedWeight: "",
  });

  function toggleActive(id: string) {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  }

  function saveEdit() {
    if (!editProfile) return;
    setProfiles((prev) =>
      prev.map((p) => (p.id === editProfile.id ? editProfile : p)),
    );
    setEditProfile(null);
  }

  function addProfile() {
    const id = String(profiles.length + 1);
    setProfiles((prev) => [
      ...prev,
      { id, icon: "📦", active: true, synced: false, ...newProfile },
    ]);
    setNewProfile({
      category: "",
      innerPacking: "",
      outerPacking: "",
      maxWeight: "",
      dims: "",
      packedWeight: "",
    });
    setShowAdd(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          Packaging specs per product category — synced to Shiprocket shipment
          creation.
        </p>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button
              style={{ background: "#f59e0b", color: "#000" }}
              className="font-semibold text-sm"
              data-ocid="packaging.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Profile
            </Button>
          </DialogTrigger>
          <DialogContent
            style={{
              background: "#1a1f2e",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            data-ocid="packaging.dialog"
          >
            <DialogHeader>
              <DialogTitle className="text-white">
                Add Packaging Profile
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {[
                {
                  label: "Category Name",
                  key: "category",
                  placeholder: "e.g. Dry Fruits",
                },
                {
                  label: "Inner Packing",
                  key: "innerPacking",
                  placeholder: "e.g. Zip-lock pouch",
                },
                {
                  label: "Outer Packing",
                  key: "outerPacking",
                  placeholder: "e.g. Corrugated box",
                },
                {
                  label: "Max Weight",
                  key: "maxWeight",
                  placeholder: "e.g. 750g per unit",
                },
                {
                  label: "Dimensions",
                  key: "dims",
                  placeholder: "e.g. 20×15×8 cm",
                },
                {
                  label: "Packed Weight",
                  key: "packedWeight",
                  placeholder: "e.g. 0.9 kg",
                },
              ].map((f) => (
                <div key={f.key} className="space-y-1">
                  <Label className="text-xs" style={{ color: "#94a3b8" }}>
                    {f.label}
                  </Label>
                  <Input
                    value={(newProfile as Record<string, string>)[f.key]}
                    onChange={(e) =>
                      setNewProfile((prev) => ({
                        ...prev,
                        [f.key]: e.target.value,
                      }))
                    }
                    placeholder={f.placeholder}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                    data-ocid="packaging.input"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setShowAdd(false)}
                className="text-white/60"
                data-ocid="packaging.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={addProfile}
                style={{ background: "#f59e0b", color: "#000" }}
                data-ocid="packaging.confirm_button"
              >
                Add Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((p, i) => (
          <Card
            key={p.id}
            className="border-white/10"
            style={{
              background: "rgba(255,255,255,0.04)",
              opacity: p.active ? 1 : 0.5,
            }}
            data-ocid={`packaging.item.${i + 1}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <CardTitle className="text-white text-sm">
                      {p.category}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge
                        className="text-[10px] px-1.5 py-0"
                        style={{
                          background: p.synced
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(239,68,68,0.15)",
                          color: p.synced ? "#86efac" : "#fca5a5",
                          border: `1px solid ${p.synced ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                        }}
                      >
                        {p.synced ? "✓ Synced" : "⚠ Sync Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={p.active}
                    onCheckedChange={() => toggleActive(p.id)}
                    data-ocid={`packaging.switch.${i + 1}`}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-white h-7 w-7 p-0"
                        onClick={() => setEditProfile({ ...p })}
                        data-ocid={`packaging.edit_button.${i + 1}`}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      style={{
                        background: "#1a1f2e",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      data-ocid="packaging.dialog"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          Edit Packaging Profile
                        </DialogTitle>
                      </DialogHeader>
                      {editProfile && (
                        <div className="space-y-3">
                          {[
                            { label: "Inner Packing", key: "innerPacking" },
                            { label: "Outer Packing", key: "outerPacking" },
                            { label: "Max Weight", key: "maxWeight" },
                            { label: "Dimensions", key: "dims" },
                            { label: "Packed Weight", key: "packedWeight" },
                          ].map((f) => (
                            <div key={f.key} className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: "#94a3b8" }}
                              >
                                {f.label}
                              </Label>
                              <Input
                                value={
                                  (
                                    editProfile as unknown as Record<
                                      string,
                                      string
                                    >
                                  )[f.key]
                                }
                                onChange={(e) =>
                                  setEditProfile((prev) =>
                                    prev
                                      ? { ...prev, [f.key]: e.target.value }
                                      : prev,
                                  )
                                }
                                className="bg-white/5 border-white/10 text-white text-sm"
                                data-ocid="packaging.input"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="ghost"
                          onClick={() => setEditProfile(null)}
                          className="text-white/60"
                          data-ocid="packaging.cancel_button"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={saveEdit}
                          style={{ background: "#f59e0b", color: "#000" }}
                          data-ocid="packaging.save_button"
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                <div>
                  <span style={{ color: "#64748b" }}>Inner: </span>
                  <span style={{ color: "#cbd5e1" }}>{p.innerPacking}</span>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Outer: </span>
                  <span style={{ color: "#cbd5e1" }}>{p.outerPacking}</span>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Max: </span>
                  <span style={{ color: "#cbd5e1" }}>{p.maxWeight}</span>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Dims: </span>
                  <span style={{ color: "#cbd5e1" }}>{p.dims}</span>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Packed: </span>
                  <span style={{ color: "#cbd5e1" }}>{p.packedWeight}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Tab 4: Split Shipments ────────────────────────────────────────────────────

function SplitShipmentsTab() {
  const [autoSplitCities, setAutoSplitCities] = useState("2");
  const [maxConsignments, setMaxConsignments] = useState("3");
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [consolidate, setConsolidate] = useState(true);

  return (
    <div className="space-y-6">
      {/* Explanation banner */}
      <div
        className="flex items-start gap-3 rounded-xl p-4 border"
        style={{
          background: "rgba(167,139,250,0.08)",
          borderColor: "rgba(167,139,250,0.2)",
        }}
      >
        <GitBranch
          className="w-4 h-4 mt-0.5 shrink-0"
          style={{ color: "#a78bfa" }}
        />
        <p className="text-sm" style={{ color: "#c4b5fd" }}>
          <span className="font-semibold text-white">Auto-split logic:</span>{" "}
          When a customer orders from 2+ aunties in different cities, the order
          is automatically split into separate consignments — each tracked
          independently with its own Shiprocket shipment ID.
        </p>
      </div>

      {/* Active split orders */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <GitBranch className="w-4 h-4" style={{ color: "#f59e0b" }} />
            Active Split Shipments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" data-ocid="split.table">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  {[
                    "Order ID",
                    "Customer",
                    "Legs",
                    "Aunty Locations",
                    "Leg A Status",
                    "Leg B Status",
                    "Total Cost",
                    "Savings",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-xs"
                      style={{ color: "#94a3b8" }}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {SPLIT_ORDERS.map((o, i) => (
                  <TableRow
                    key={o.orderId}
                    className="border-white/5"
                    data-ocid={`split.item.${i + 1}`}
                  >
                    <TableCell className="text-white font-mono text-xs">
                      {o.orderId}
                    </TableCell>
                    <TableCell className="text-white text-xs">
                      {o.customer}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: "rgba(167,139,250,0.15)",
                          color: "#c4b5fd",
                          border: "1px solid rgba(167,139,250,0.3)",
                        }}
                        className="text-xs"
                      >
                        {o.legs} legs
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {o.auntyLocations}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        style={{
                          background:
                            o.statusA === "Dispatched"
                              ? "rgba(34,197,94,0.15)"
                              : o.statusA === "In Transit"
                                ? "rgba(96,165,250,0.15)"
                                : "rgba(245,158,11,0.15)",
                          color:
                            o.statusA === "Dispatched"
                              ? "#86efac"
                              : o.statusA === "In Transit"
                                ? "#93c5fd"
                                : "#fcd34d",
                          border: "none",
                        }}
                      >
                        {o.statusA}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        style={{
                          background:
                            o.statusB === "Dispatched"
                              ? "rgba(34,197,94,0.15)"
                              : o.statusB === "In Transit"
                                ? "rgba(96,165,250,0.15)"
                                : "rgba(245,158,11,0.15)",
                          color:
                            o.statusB === "Dispatched"
                              ? "#86efac"
                              : o.statusB === "In Transit"
                                ? "#93c5fd"
                                : "#fcd34d",
                          border: "none",
                        }}
                      >
                        {o.statusB}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-white text-xs">
                      {o.totalCost}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#86efac" }}>
                      {o.saved}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Config + cost breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className="border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base">
              Split Rules Config
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#94a3b8" }}>
                Auto-split threshold (cities)
              </Label>
              <Input
                value={autoSplitCities}
                onChange={(e) => setAutoSplitCities(e.target.value)}
                type="number"
                min="2"
                className="bg-white/5 border-white/10 text-white"
                data-ocid="split.input"
              />
              <p className="text-[11px]" style={{ color: "#64748b" }}>
                Split when order spans more than this many cities
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#94a3b8" }}>
                Max consignments per order
              </Label>
              <Input
                value={maxConsignments}
                onChange={(e) => setMaxConsignments(e.target.value)}
                type="number"
                min="2"
                className="bg-white/5 border-white/10 text-white"
                data-ocid="split.search_input"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-white/10">
              <div>
                <div className="text-sm text-white">
                  Notify customer on split
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  WhatsApp message when order is split
                </div>
              </div>
              <Switch
                checked={notifyCustomer}
                onCheckedChange={setNotifyCustomer}
                data-ocid="split.switch"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-white/10">
              <div>
                <div className="text-sm text-white">Consolidation attempt</div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  Try nearby aunties before splitting
                </div>
              </div>
              <Switch
                checked={consolidate}
                onCheckedChange={setConsolidate}
                data-ocid="split.toggle"
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base">
              Cost Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div
              className="rounded-lg p-3 space-y-2"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div
                className="font-semibold text-white text-xs uppercase tracking-wider mb-2"
                style={{ color: "#94a3b8" }}
              >
                Single Shipment (same city)
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94a3b8" }}>Base charge</span>
                <span className="text-white">₹60</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94a3b8" }}>Per 500g additional</span>
                <span className="text-white">₹20</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
                <span style={{ color: "#94a3b8" }}>Typical 1kg order</span>
                <span className="text-amber-400">~₹80</span>
              </div>
            </div>
            <div
              className="rounded-lg p-3 space-y-2"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div
                className="font-semibold text-xs uppercase tracking-wider mb-2"
                style={{ color: "#94a3b8" }}
              >
                Split Shipment (2 cities)
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94a3b8" }}>Leg A (0.6kg)</span>
                <span className="text-white">₹72</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94a3b8" }}>Leg B (0.8kg)</span>
                <span className="text-white">₹84</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94a3b8" }}>
                  Platform split discount
                </span>
                <span style={{ color: "#86efac" }}>-₹20</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
                <span style={{ color: "#94a3b8" }}>Net to customer</span>
                <span className="text-amber-400">~₹136</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Tab 5: SLA Monitoring ─────────────────────────────────────────────────────

function SlaTab() {
  const [escalateToggle, setEscalateToggle] = useState(true);
  const [whatsappAlert, setWhatsappAlert] = useState(true);
  const [autoHold, setAutoHold] = useState(false);

  const onTime = AT_RISK_ORDERS.filter((o) => o.status === "On Track").length;
  const atRisk = AT_RISK_ORDERS.filter((o) => o.status === "At Risk").length;
  const breached = AT_RISK_ORDERS.filter((o) => o.status === "Breached").length;

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Dispatched On Time",
            value: "87%",
            color: "#22c55e",
            icon: <CheckCircle className="w-4 h-4" />,
          },
          {
            label: "Delivered On Time",
            value: "82%",
            color: "#60a5fa",
            icon: <Truck className="w-4 h-4" />,
          },
          {
            label: "Avg Dispatch Time",
            value: "14h",
            color: "#f59e0b",
            icon: <Clock className="w-4 h-4" />,
          },
          {
            label: "Breach Alerts (Week)",
            value: String(breached + atRisk),
            color: "#f87171",
            icon: <AlertTriangle className="w-4 h-4" />,
          },
        ].map((k) => (
          <Card
            key={k.label}
            className="border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <CardContent className="pt-4 pb-3 px-4">
              <div
                className="flex items-center gap-1.5 mb-1"
                style={{ color: k.color }}
              >
                {k.icon}
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  {k.label}
                </span>
              </div>
              <div className="text-2xl font-bold" style={{ color: k.color }}>
                {k.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SLA Rules */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base">
            SLA Rules by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" data-ocid="sla.table">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  {[
                    "Category",
                    "Batch Close → Dispatch",
                    "Dispatch → Delivery",
                    "Breach Penalty",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-xs"
                      style={{ color: "#94a3b8" }}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {SLA_RULES.map((r, i) => (
                  <TableRow
                    key={r.category}
                    className="border-white/5"
                    data-ocid={`sla.item.${i + 1}`}
                  >
                    <TableCell className="text-white text-sm font-medium">
                      {r.category}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: "rgba(245,158,11,0.15)",
                          color: "#fcd34d",
                          border: "1px solid rgba(245,158,11,0.3)",
                        }}
                        className="text-xs"
                      >
                        {r.dispatchSLA}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: "rgba(96,165,250,0.15)",
                          color: "#93c5fd",
                          border: "1px solid rgba(96,165,250,0.3)",
                        }}
                        className="text-xs"
                      >
                        {r.deliverySLA}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {r.penalty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* At-risk orders */}
      <Card
        className="border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-base">
              Order SLA Status
            </CardTitle>
            <div className="flex gap-2">
              <Badge
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#86efac",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
                className="text-xs"
              >
                {onTime} On Track
              </Badge>
              <Badge
                style={{
                  background: "rgba(245,158,11,0.15)",
                  color: "#fcd34d",
                  border: "1px solid rgba(245,158,11,0.3)",
                }}
                className="text-xs"
              >
                {atRisk} At Risk
              </Badge>
              <Badge
                style={{
                  background: "rgba(239,68,68,0.15)",
                  color: "#fca5a5",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
                className="text-xs"
              >
                {breached} Breached
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" data-ocid="sla.list">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  {[
                    "Order ID",
                    "Aunty",
                    "Product",
                    "Batch Close",
                    "Hours to Dispatch",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-xs"
                      style={{ color: "#94a3b8" }}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {AT_RISK_ORDERS.map((o, i) => (
                  <TableRow
                    key={o.orderId}
                    className="border-white/5"
                    data-ocid={`sla.row.${i + 1}`}
                  >
                    <TableCell className="text-white font-mono text-xs">
                      {o.orderId}
                    </TableCell>
                    <TableCell className="text-white text-xs">
                      {o.aunty}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {o.product}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: "#94a3b8" }}>
                      {o.batchClose}
                    </TableCell>
                    <TableCell
                      className="text-xs"
                      style={{
                        color:
                          o.hoursRemaining < 0
                            ? "#f87171"
                            : o.hoursRemaining < 6
                              ? "#fcd34d"
                              : "#86efac",
                        fontWeight: 600,
                      }}
                    >
                      {o.hoursRemaining < 0
                        ? `${Math.abs(o.hoursRemaining)}h overdue`
                        : `${o.hoursRemaining}h left`}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        style={{
                          background:
                            o.status === "On Track"
                              ? "rgba(34,197,94,0.15)"
                              : o.status === "At Risk"
                                ? "rgba(245,158,11,0.15)"
                                : "rgba(239,68,68,0.15)",
                          color:
                            o.status === "On Track"
                              ? "#86efac"
                              : o.status === "At Risk"
                                ? "#fcd34d"
                                : "#fca5a5",
                          border: "none",
                        }}
                      >
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {o.status !== "On Track" && (
                        <Button
                          size="sm"
                          className="h-6 text-xs px-2"
                          style={{
                            background:
                              o.status === "Breached"
                                ? "rgba(239,68,68,0.2)"
                                : "rgba(245,158,11,0.2)",
                            color:
                              o.status === "Breached" ? "#fca5a5" : "#fcd34d",
                            border: "none",
                          }}
                          data-ocid={`sla.button.${i + 1}`}
                        >
                          {o.status === "Breached" ? "Escalate" : "Nudge"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Breach chart + escalation rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className="border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base">
              Breach History (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={BREACH_CHART_DATA}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#94a3b8" }}
                  itemStyle={{ color: "#f87171" }}
                />
                <Bar
                  dataKey="breaches"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  name="Breaches"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          className="border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base">
              Auto-Escalation Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div>
                <div className="text-sm text-white">
                  Escalate to admin if dispatch delayed &gt;6h
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  Creates high-priority alert in admin panel
                </div>
              </div>
              <Switch
                checked={escalateToggle}
                onCheckedChange={setEscalateToggle}
                data-ocid="sla.switch"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div>
                <div className="text-sm text-white">
                  WhatsApp alert to aunty at 2h warning
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  "Your batch closes in 2h — please prepare for pickup"
                </div>
              </div>
              <Switch
                checked={whatsappAlert}
                onCheckedChange={setWhatsappAlert}
                data-ocid="sla.toggle"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm text-white">
                  Auto-hold new orders on breach
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  Pause aunty's listing until breach is resolved
                </div>
              </div>
              <Switch
                checked={autoHold}
                onCheckedChange={setAutoHold}
                data-ocid="sla.checkbox"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LogisticsEnginePage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("pincode");

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <main
      className="min-h-screen pt-16"
      style={{
        background:
          "linear-gradient(135deg, #0f1115 0%, #1a1f2e 60%, #0f1115 100%)",
      }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
              }}
            >
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">
                  Logistics Engine
                </h1>
                <Badge
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "#fbbf24",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                  className="text-xs"
                >
                  Shiprocket Integration
                </Badge>
                <Badge
                  style={{
                    background: "rgba(34,197,94,0.12)",
                    color: "#86efac",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                  className="text-xs"
                >
                  ● Live
                </Badge>
              </div>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Pincode serviceability · EDD calculator · Packaging profiles ·
                Split shipments · SLA monitoring
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="flex flex-wrap gap-1 h-auto mb-8 p-1.5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              {
                value: "pincode",
                label: "Pincode Check",
                icon: <MapPin className="w-3.5 h-3.5" />,
              },
              {
                value: "edd",
                label: "EDD Calculator",
                icon: <Clock className="w-3.5 h-3.5" />,
              },
              {
                value: "packaging",
                label: "Packaging Profiles",
                icon: <Box className="w-3.5 h-3.5" />,
              },
              {
                value: "split",
                label: "Split Shipments",
                icon: <GitBranch className="w-3.5 h-3.5" />,
              },
              {
                value: "sla",
                label: "SLA Monitoring",
                icon: <Shield className="w-3.5 h-3.5" />,
              },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg data-[state=active]:text-black"
                style={{ color: activeTab === t.value ? "#000" : "#94a3b8" }}
                data-ocid={`logistics.${t.value}.tab`}
              >
                {t.icon}
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="pincode">
            <PincodeTab />
          </TabsContent>
          <TabsContent value="edd">
            <EddTab />
          </TabsContent>
          <TabsContent value="packaging">
            <PackagingTab />
          </TabsContent>
          <TabsContent value="split">
            <SplitShipmentsTab />
          </TabsContent>
          <TabsContent value="sla">
            <SlaTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
