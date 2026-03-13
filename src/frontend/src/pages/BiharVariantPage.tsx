import {
  type AuntyBadge,
  type AuntyData,
  type AuntyVariantMapping,
  BADGE_COLORS,
  getAuntiesForVariant,
  getIngredientById,
  getVariantById,
} from "@/constants/biharData";
import { useActor } from "@/hooks/useActor";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChefHat,
  Clock,
  MapPin,
  MessageCircle,
  Package,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= Math.round(rating)
              ? "text-saffron fill-saffron"
              : "text-border"
          }`}
        />
      ))}
      <span className="text-xs font-body text-muted-foreground ml-1">
        {rating}
      </span>
    </div>
  );
}

// ─── Availability pill ────────────────────────────────────────────────────────
function AvailPill({ av }: { av: string }) {
  const map = {
    available: "bg-green-100 text-green-800 border-green-200",
    limited: "bg-yellow-100 text-yellow-800 border-yellow-200",
    unavailable: "bg-red-100 text-red-800 border-red-200",
  };
  const label = {
    available: "Available",
    limited: "Limited Slots",
    unavailable: "Unavailable",
  };
  return (
    <span
      className={`text-[10px] font-semibold font-body px-2.5 py-0.5 rounded-full border ${
        map[av as keyof typeof map] ?? "bg-muted"
      }`}
    >
      {label[av as keyof typeof label] ?? av}
    </span>
  );
}

// ─── Checkout Form State ───────────────────────────────────────────────────────
type CheckoutStatus = "idle" | "loading" | "success" | "error";

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  qty: number;
}

export default function BiharVariantPage() {
  const params = useParams({ strict: false });
  const variantId = params.variantId as string;
  const { actor } = useActor();

  const result = getVariantById(variantId);
  const [selectedAuntyId, setSelectedAuntyId] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
    qty: 2,
  });
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!result) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🧑‍🍳</div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Variant Not Found
          </h1>
          <Link
            to="/state/bihar"
            className="inline-flex items-center gap-2 bg-saffron text-cream font-semibold px-5 py-2.5 rounded-full font-body text-sm hover:bg-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Bihar
          </Link>
        </div>
      </main>
    );
  }

  const { variant, product } = result;
  const auntiesForVariant = getAuntiesForVariant(variantId);

  const selectedEntry = auntiesForVariant.find(
    (e) => e.aunty.aunty_id === selectedAuntyId,
  );

  const whatsappText = selectedEntry
    ? `Hi! I want to order ${product.product_name} - ${variant.variant_name} (${form.qty} kg) from you. Please confirm availability. Name: ${form.name || "[your name]"}, Phone: ${form.phone || "[phone]"}, Address: ${form.address || "[address]"}`.trim()
    : "";

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEntry || !actor) return;

    setCheckoutStatus("loading");
    setErrorMsg("");

    try {
      await actor.createOrder(
        BigInt(1),
        form.name,
        form.phone,
        form.address,
        form.qty,
        0,
        whatsappText,
        null,
      );
      setCheckoutStatus("success");
      // Open WhatsApp
      const waUrl = `https://wa.me/${selectedEntry.aunty.whatsapp.replace(
        /[^0-9]/g,
        "",
      )}?text=${encodeURIComponent(whatsappText)}`;
      window.open(waUrl, "_blank");
    } catch {
      setCheckoutStatus("error");
      setErrorMsg("Could not save order. Please try again.");
    }
  }

  function handleWhatsAppFallback() {
    if (!selectedEntry) return;
    const waUrl = `https://wa.me/${selectedEntry.aunty.whatsapp.replace(
      /[^0-9]/g,
      "",
    )}?text=${encodeURIComponent(
      `Hi! I want to order ${product.product_name} - ${variant.variant_name} (2 kg) from you. Please confirm availability.`,
    )}`;
    window.open(waUrl, "_blank");
  }

  function openCheckout() {
    setShowCheckout(true);
    setCheckoutStatus("idle");
    setErrorMsg("");
  }

  function closeCheckout() {
    setShowCheckout(false);
    setCheckoutStatus("idle");
    setErrorMsg("");
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      {/* ===== CHECKOUT MODAL ===== */}
      <AnimatePresence>
        {showCheckout && selectedEntry && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeCheckout}
            />

            {/* Slide-up modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl overflow-y-auto max-h-[92vh]"
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              <div className="px-5 pb-8 pt-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-display font-bold text-foreground text-xl">
                      Confirm Your Order
                    </h2>
                    <p className="text-muted-foreground font-body text-xs mt-0.5">
                      Ordering from <strong>{selectedEntry.aunty.name}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCheckout}
                    data-ocid="bihar.checkout.close_button"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-muted/70 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Order summary strip */}
                <div className="bg-saffron/8 border border-saffron/20 rounded-2xl p-4 mb-5 flex items-center justify-between">
                  <div className="text-sm font-body">
                    <p className="font-semibold text-foreground">
                      {product.product_name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {variant.variant_name}
                    </p>
                  </div>
                  <p className="font-bold text-saffron text-lg font-body">
                    ₹{selectedEntry.mapping.price_per_kg * form.qty}
                  </p>
                </div>

                {/* Success state */}
                {checkoutStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    data-ocid="bihar.checkout.success_state"
                    className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                    <p className="font-display font-bold text-green-800 text-lg">
                      Order Confirmed!
                    </p>
                    <p className="text-green-700 font-body text-sm mt-1">
                      Redirecting to WhatsApp…
                    </p>
                    <button
                      type="button"
                      onClick={closeCheckout}
                      className="mt-4 bg-green-600 text-white font-semibold font-body text-sm px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}

                {/* Error state */}
                {checkoutStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="bihar.checkout.error_state"
                    className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-4 flex items-start justify-between gap-3"
                  >
                    <p className="text-red-700 font-body text-sm">{errorMsg}</p>
                    <button
                      type="button"
                      onClick={handleWhatsAppFallback}
                      className="shrink-0 text-xs font-semibold text-red-700 underline underline-offset-2 font-body"
                    >
                      Use WhatsApp anyway
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {checkoutStatus !== "success" && (
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="checkout-name"
                        className="block font-body text-sm font-semibold text-foreground mb-1.5"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rohit Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        id="checkout-name"
                        data-ocid="bihar.checkout.name_input"
                        className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="checkout-phone"
                        className="block font-body text-sm font-semibold text-foreground mb-1.5"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            phone: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        id="checkout-phone"
                        data-ocid="bihar.checkout.phone_input"
                        className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors"
                      />
                    </div>

                    {/* Delivery address */}
                    <div>
                      <label
                        htmlFor="checkout-address"
                        className="block font-body text-sm font-semibold text-foreground mb-1.5"
                      >
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        placeholder="Full address with pin code"
                        rows={3}
                        value={form.address}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, address: e.target.value }))
                        }
                        id="checkout-address"
                        data-ocid="bihar.checkout.address_textarea"
                        className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors resize-none"
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label
                        htmlFor="checkout-qty"
                        className="block font-body text-sm font-semibold text-foreground mb-1.5"
                      >
                        Quantity (kg){" "}
                        <span className="text-muted-foreground font-normal">
                          — min 2 kg
                        </span>
                      </label>
                      <input
                        type="number"
                        min={2}
                        step={1}
                        required
                        value={form.qty}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            qty: Math.max(2, Number(e.target.value)),
                          }))
                        }
                        id="checkout-qty"
                        data-ocid="bihar.checkout.qty_input"
                        className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-colors"
                      />
                      <p className="text-muted-foreground font-body text-xs mt-1">
                        Total:{" "}
                        <strong className="text-saffron">
                          ₹{selectedEntry.mapping.price_per_kg * form.qty}
                        </strong>
                      </p>
                    </div>

                    {/* Loading state */}
                    {checkoutStatus === "loading" && (
                      <div
                        data-ocid="bihar.checkout.loading_state"
                        className="flex items-center gap-2 text-saffron font-body text-sm"
                      >
                        <svg
                          aria-hidden="true"
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Saving your order…
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={checkoutStatus === "loading"}
                      data-ocid="bihar.checkout.submit_button"
                      className="w-full flex items-center justify-center gap-2 bg-saffron hover:bg-terracotta disabled:opacity-60 disabled:cursor-not-allowed text-cream font-bold py-3.5 rounded-xl font-body transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {checkoutStatus === "loading"
                        ? "Placing Order…"
                        : "Confirm & Place Order via WhatsApp"}
                    </button>

                    <p className="text-muted-foreground font-body text-xs text-center">
                      Your details will be shared with the aunty via WhatsApp to
                      confirm your order.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== VARIANT HEADER ===== */}
      <section
        className="py-12 sm:py-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.03 72) 0%, oklch(0.93 0.05 65) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 text-xs font-body text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-saffron transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/state/bihar"
              className="hover:text-saffron transition-colors"
            >
              Bihar
            </Link>
            <span>/</span>
            <Link
              to="/bihar-product/$productId"
              params={{ productId: product.product_id }}
              className="hover:text-saffron transition-colors"
            >
              {product.product_name}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">
              {variant.variant_name}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-foreground text-3xl sm:text-4xl leading-tight mb-4">
              {product.product_name}{" "}
              <span className="text-saffron italic">
                — {variant.variant_name}
              </span>
            </h1>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1.5 bg-saffron/10 border border-saffron/20 rounded-full px-3 py-1">
                <span className="text-saffron font-bold text-sm font-body">
                  ₹{variant.price_per_kg}/kg
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-amber-800 text-xs font-semibold font-body">
                  {variant.shelf_life_days} days shelf life
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                <Package className="w-3.5 h-3.5 text-green-700" />
                <span className="text-green-800 text-xs font-semibold font-body">
                  2 kg batch
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-10 space-y-12">
        {/* ===== INGREDIENTS TABLE ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-foreground text-2xl mb-1">
            Ingredients (2 kg Batch)
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-5">
            Exact ingredients used by aunties for a standard 2 kg batch.
          </p>
          <div className="rounded-2xl overflow-hidden border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-saffron/10 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold font-body text-foreground text-xs">
                    Ingredient
                  </th>
                  <th className="text-right px-4 py-3 font-semibold font-body text-foreground text-xs">
                    Qty
                  </th>
                  <th className="text-left px-4 py-3 font-semibold font-body text-foreground text-xs">
                    Unit
                  </th>
                  <th className="text-left px-4 py-3 font-semibold font-body text-foreground text-xs hidden sm:table-cell">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {variant.ingredients.map((r, idx) => {
                  const ing = getIngredientById(r.ingredient_id);
                  return (
                    <tr
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable index list
                      key={idx}
                      className={idx % 2 === 0 ? "bg-background" : "bg-card"}
                    >
                      <td className="px-4 py-3 font-body text-foreground text-sm">
                        {ing?.ingredient_name ?? r.ingredient_id}
                      </td>
                      <td className="px-4 py-3 font-body text-saffron font-semibold text-sm text-right">
                        {r.quantity}
                      </td>
                      <td className="px-4 py-3 font-body text-muted-foreground text-sm">
                        {r.unit}
                      </td>
                      <td className="px-4 py-3 font-body text-muted-foreground text-xs hidden sm:table-cell">
                        {r.note ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ===== PREPARATION STEPS ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-foreground text-2xl mb-1">
            Preparation Method
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Step-by-step process followed in every home kitchen.
          </p>
          <div className="space-y-4">
            {variant.preparation_steps.map((step) => (
              <div key={step.step_number} className="flex gap-4">
                {/* Step circle */}
                <div className="shrink-0 w-9 h-9 rounded-full bg-saffron text-cream font-bold text-sm font-body flex items-center justify-center shadow-warm">
                  {step.step_number}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-foreground font-body text-sm leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.duration_minutes && (
                    <span className="inline-flex items-center gap-1 text-muted-foreground text-xs font-body mt-1">
                      <Clock className="w-3 h-3" /> {step.duration_minutes} min
                    </span>
                  )}
                  {step.tip && (
                    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-800 text-xs font-body">
                      💡 <strong>Tip:</strong> {step.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== HOME KITCHEN GUARANTEE ===== */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <ChefHat className="w-5 h-5 text-green-700 shrink-0" />
          <p className="text-green-800 font-body text-xs font-semibold">
            Made in Home Kitchen Only • Gas Stove • Kadhai • Tawa • Mixer
            Grinder
          </p>
        </div>

        {/* ===== AUNTY SELECTION ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-2">
            Prepared by {auntiesForVariant.length} Aunit
            {auntiesForVariant.length !== 1 ? "ies" : "y"} — Choose Your Aunty
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Compare aunties by experience, rating, and price. Pick who cooks
            your order.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {auntiesForVariant.map(({ aunty, mapping }, idx) => {
              const isSelected = selectedAuntyId === aunty.aunty_id;
              return (
                <motion.div
                  key={aunty.aunty_id}
                  whileHover={{ y: -2 }}
                  className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-saffron shadow-warm bg-saffron/5"
                      : "border-border bg-card hover:border-saffron/40"
                  }`}
                  data-ocid={`bihar.aunty.select.${idx + 1}`}
                  onClick={() =>
                    setSelectedAuntyId(isSelected ? null : aunty.aunty_id)
                  }
                >
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10">
                      <CheckCircle className="w-5 h-5 text-saffron fill-saffron/20" />
                    </div>
                  )}

                  {/* Photo */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={aunty.photo}
                      alt={aunty.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-display font-bold text-foreground text-base">
                      {aunty.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs font-body mb-2">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {aunty.district}
                    </div>

                    {/* Rating + experience */}
                    <div className="flex items-center justify-between mb-3">
                      <StarRating rating={aunty.rating} />
                      <span className="text-xs font-body text-amber-700 font-semibold">
                        {aunty.years_experience} yrs exp
                      </span>
                    </div>

                    {/* Price + availability */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-saffron font-bold text-lg font-body">
                        ₹{mapping.price_per_kg}/kg
                      </span>
                      <AvailPill av={mapping.availability} />
                    </div>

                    {/* Batch days */}
                    <p className="text-muted-foreground text-xs font-body mb-3">
                      🗓 Batches: {mapping.batch_days.join(", ")}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {aunty.badges.slice(0, 3).map((badge) => (
                        <span
                          key={badge}
                          className={`text-[10px] font-semibold font-body px-2 py-0.5 rounded-full border ${
                            BADGE_COLORS[badge as AuntyBadge]
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Personal note */}
                    <p className="text-muted-foreground text-xs font-body italic border-l-2 border-saffron/30 pl-2 mb-4">
                      "{mapping.personal_note}"
                    </p>

                    {/* Select button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAuntyId(isSelected ? null : aunty.aunty_id);
                      }}
                      data-ocid={`bihar.aunty.select_button.${idx + 1}`}
                      className={`w-full py-2.5 rounded-xl font-semibold font-body text-sm transition-colors ${
                        isSelected
                          ? "bg-saffron text-cream hover:bg-terracotta"
                          : "bg-background border border-border text-foreground hover:bg-saffron/5 hover:border-saffron/40"
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Select This Aunty"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order summary — appears after selection */}
          {selectedEntry && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-saffron/8 border-2 border-saffron rounded-2xl p-5"
              data-ocid="bihar.order.summary"
            >
              <h3 className="font-display font-bold text-foreground text-lg mb-3">
                🛒 Your Order Summary
              </h3>
              <div className="space-y-2 mb-5 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aunty</span>
                  <span className="font-semibold text-foreground">
                    {selectedEntry.aunty.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variant</span>
                  <span className="font-semibold text-foreground">
                    {variant.variant_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Batch Size</span>
                  <span className="font-semibold text-foreground">
                    2 kg (minimum)
                  </span>
                </div>
                <div className="flex justify-between border-t border-saffron/20 pt-2 mt-2">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-saffron text-lg">
                    ₹{selectedEntry.mapping.price_per_kg * 2}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                data-ocid="bihar.order.place_button"
                className="w-full flex items-center justify-center gap-2 bg-saffron hover:bg-terracotta text-cream font-bold py-3 rounded-xl font-body transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Confirm &amp; Place Order
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* Back link */}
        <div className="pb-4">
          <Link
            to="/bihar-product/$productId"
            params={{ productId: product.product_id }}
            data-ocid="bihar.variant.back_link"
            className="inline-flex items-center gap-2 text-saffron hover:text-terracotta font-semibold font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {product.product_name}
          </Link>
        </div>
      </div>
    </main>
  );
}
