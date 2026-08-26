import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Inbox, Loader2, RefreshCw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Lead = {
  id: string;
  name: string | null;
  company: string | null;
  contact: string | null;
  interest: string;
  language: string | null;
  source: string | null;
  notified_at: string | null;
  created_at: string;
};

const RANGES = [
  { key: "7", label: "7 días" },
  { key: "30", label: "30 días" },
  { key: "90", label: "90 días" },
  { key: "all", label: "Todo" },
] as const;

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState("all");
  const [range, setRange] = useState<string>("30");

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("leads")
      .select("id,name,company,contact,interest,language,source,notified_at,created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) return toast.error("No se pudieron cargar los leads");
    setLeads((data ?? []) as Lead[]);
  };

  useEffect(() => {
    void load();
  }, []);

  const interests = useMemo(
    () => Array.from(new Set(leads.map((l) => l.interest))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const since =
      range === "all" ? 0 : Date.now() - Number(range) * 24 * 60 * 60 * 1000;
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (new Date(l.created_at).getTime() < since) return false;
      if (interest !== "all" && l.interest !== interest) return false;
      if (!q) return true;
      return [l.name, l.company, l.contact, l.interest]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [leads, query, interest, range]);

  const exportCsv = () => {
    const head = ["Fecha", "Nombre", "Empresa", "Contacto", "Interés", "Idioma", "Origen"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toISOString(),
      l.name ?? "",
      l.company ?? "",
      l.contact ?? "",
      l.interest,
      l.language ?? "",
      l.source ?? "",
    ]);
    const csv = [head, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-qubesight-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/dashboard"
              className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={15} /> Volver al panel
            </Link>
            <h1 className="font-display text-3xl font-bold">Leads recibidos</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} de {leads.length} registros
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => void load()}>
              <RefreshCw size={15} className="mr-1.5" /> Actualizar
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}>
              <Download size={15} className="mr-1.5" /> CSV
            </Button>
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nombre, empresa o contacto"
              className="pl-9 bg-white/[0.03] border-white/10"
            />
          </div>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="h-10 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm"
          >
            <option value="all">Todos los intereses</option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <div className="flex gap-1 rounded-md border border-white/10 bg-white/[0.03] p-1">
            {RANGES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`flex-1 rounded px-2 py-1.5 text-xs transition ${
                  range === r.key ? "bg-primary/20 text-primary" : "text-muted-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card overflow-x-auto rounded-2xl">
          {loading ? (
            <div className="grid place-items-center py-20">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="grid place-items-center gap-2 py-20 text-muted-foreground">
              <Inbox />
              <p className="text-sm">Sin leads para este filtro.</p>
            </div>
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/10">
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Empresa</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Interés</th>
                  <th className="p-4">Aviso</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-white/5 last:border-0">
                    <td className="whitespace-nowrap p-4 text-muted-foreground">
                      {new Date(l.created_at).toLocaleString("es-CR")}
                    </td>
                    <td className="p-4">{l.name ?? "—"}</td>
                    <td className="p-4">{l.company ?? "—"}</td>
                    <td className="p-4">
                      {l.contact ? (
                        <a
                          className="text-primary hover:underline"
                          href={
                            l.contact.includes("@")
                              ? `mailto:${l.contact}`
                              : `https://wa.me/${l.contact.replace(/\D/g, "")}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.contact}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-4">
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                        {l.interest}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">
                      {l.notified_at ? "Enviado" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
