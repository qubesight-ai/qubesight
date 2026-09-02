import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  description: string;
  planId?: string;
}

// Country codes supported by dLocal Go (subset most relevant for LatAm + US/EU)
const COUNTRIES = [
  { code: "CR", name: "Costa Rica", currency: "USD" },
  { code: "MX", name: "México", currency: "USD" },
  { code: "AR", name: "Argentina", currency: "USD" },
  { code: "BR", name: "Brasil", currency: "USD" },
  { code: "CL", name: "Chile", currency: "USD" },
  { code: "CO", name: "Colombia", currency: "USD" },
  { code: "PE", name: "Perú", currency: "USD" },
  { code: "UY", name: "Uruguay", currency: "USD" },
  { code: "EC", name: "Ecuador", currency: "USD" },
  { code: "GT", name: "Guatemala", currency: "USD" },
  { code: "PA", name: "Panamá", currency: "USD" },
  { code: "DO", name: "Rep. Dominicana", currency: "USD" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "ES", name: "España", currency: "USD" },
];

const CheckoutDialog = ({
  open,
  onOpenChange,
  amount,
  description,
  planId,
}: CheckoutDialogProps) => {
  const { language } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("CR");
  const [loading, setLoading] = useState(false);

  // Auto-detect country by IP
  useEffect(() => {
    if (!open) return;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const code = (d?.country_code as string | undefined)?.toUpperCase();
        if (code && COUNTRIES.some((c) => c.code === code)) setCountry(code);
      })
      .catch(() => {});
  }, [open]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error(
        language === "es" ? "Nombre y email son obligatorios" : "Name and email are required",
      );
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("dlocalgo-create-payment", {
        body: {
          amount,
          currency: "USD",
          country,
          description: description.slice(0, 100),
          order_id: planId ? `${planId}_${Date.now()}` : undefined,
          payer: { name: name.trim(), email: email.trim(), phone: phone.trim() || undefined },
        },
      });
      if (error) throw error;
      const url = (data as { redirect_url?: string })?.redirect_url;
      if (!url) throw new Error("No redirect URL returned");
      window.location.href = url;
    } catch (err) {
      console.error("dLocal Go payment failed:", err);
      toast.error(
        language === "es"
          ? "No se pudo iniciar el pago. Intenta de nuevo o contáctanos por WhatsApp."
          : "Could not start the payment. Please try again or contact us on WhatsApp.",
      );
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            {language === "es" ? "Completar pago" : "Complete payment"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {description} — <span className="text-foreground font-bold">${amount} USD</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlePay} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="dl-name">{language === "es" ? "Nombre completo" : "Full name"}</Label>
            <Input
              id="dl-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              maxLength={100}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dl-email">Email</Label>
            <Input
              id="dl-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              maxLength={100}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="dl-phone">
                {language === "es" ? "Teléfono (opcional)" : "Phone (optional)"}
              </Label>
              <Input
                id="dl-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                maxLength={30}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dl-country">{language === "es" ? "País" : "Country"}</Label>
              <select
                id="dl-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full min-h-[48px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {language === "es" ? "Redirigiendo…" : "Redirecting…"}
              </>
            ) : (
              <>{language === "es" ? `Pagar $${amount} USD` : `Pay $${amount} USD`}</>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {language === "es"
              ? "Pago procesado de forma segura por dLocal Go"
              : "Payment securely processed by dLocal Go"}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
