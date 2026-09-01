import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Loader2, Phone, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  connectTwilio,
  disconnectTwilio,
  getTelephonyState,
  refreshTwilioNumbers,
  selectTwilioNumber,
  TelephonyState,
} from "@/lib/telephony";

const emptyState: TelephonyState = { connection: null, numbers: [] };

export default function TelephonySettings() {
  const [state, setState] = useState<TelephonyState>(emptyState);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [accountSid, setAccountSid] = useState("");
  const [apiKeySid, setApiKeySid] = useState("");
  const [apiKeySecret, setApiKeySecret] = useState("");

  useEffect(() => {
    getTelephonyState()
      .then(setState)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  const connect = async (event: FormEvent) => {
    event.preventDefault();
    setBusy("connect");
    try {
      const next = await connectTwilio(accountSid, apiKeySid, apiKeySecret);
      setState(next);
      setApiKeySecret("");
      toast.success("Cuenta Twilio verificada y conectada.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo conectar Twilio.");
    } finally {
      setBusy(null);
    }
  };

  const refresh = async () => {
    setBusy("refresh");
    try {
      setState(await refreshTwilioNumbers());
      toast.success("Números actualizados.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudieron actualizar los números.");
    } finally {
      setBusy(null);
    }
  };

  const selectNumber = async (sid: string) => {
    setBusy(sid);
    try {
      setState(await selectTwilioNumber(sid));
      toast.success("Número seleccionado.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo seleccionar el número.");
    } finally {
      setBusy(null);
    }
  };

  const disconnect = async () => {
    if (!window.confirm("¿Desconectar Twilio y eliminar la credencial cifrada?")) return;
    setBusy("disconnect");
    try {
      setState(await disconnectTwilio());
      setAccountSid("");
      setApiKeySid("");
      setApiKeySecret("");
      toast.success("Twilio fue desconectado.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo desconectar Twilio.");
    } finally {
      setBusy(null);
    }
  };

  if (loading) {
    return <div className="admin-panel p-10 grid place-items-center"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  if (!state.connection) {
    return <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-6">
      <form onSubmit={connect} className="admin-panel p-6">
        <p className="text-[10px] tracking-[.18em] text-blue-600">CONEXIÓN SEGURA</p>
        <h2 className="text-xl font-semibold mt-1">Conecta tu cuenta Twilio</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Usa una API Key revocable. El Secret se envía una sola vez al backend y se cifra en Vault.
        </p>
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-600">
            Account SID
            <input className="auth-input font-mono" value={accountSid} onChange={(e) => setAccountSid(e.target.value)} placeholder="AC••••••••••••••••••••••••••••••••" autoComplete="off" required />
          </label>
          <label className="block text-xs font-semibold text-slate-600">
            API Key SID
            <input className="auth-input font-mono" value={apiKeySid} onChange={(e) => setApiKeySid(e.target.value)} placeholder="SK••••••••••••••••••••••••••••••••" autoComplete="off" required />
          </label>
          <label className="block text-xs font-semibold text-slate-600">
            API Key Secret
            <input className="auth-input font-mono" type="password" value={apiKeySecret} onChange={(e) => setApiKeySecret(e.target.value)} autoComplete="new-password" required />
          </label>
        </div>
        <button className="admin-primary mt-6" disabled={busy === "connect"}>
          {busy === "connect" ? <Loader2 className="animate-spin" size={16} /> : <KeyRound size={16} />}
          Verificar y conectar
        </button>
      </form>
      <aside className="admin-panel p-6">
        <ShieldCheck className="text-emerald-600 mb-4" size={32} />
        <h3 className="font-semibold">La credencial no se guarda en el navegador</h3>
        <ul className="text-sm text-slate-500 mt-3 space-y-2 list-disc pl-5">
          <li>No se almacena en LocalStorage ni variables Vite.</li>
          <li>No vuelve a mostrarse después de guardarla.</li>
          <li>Puedes revocarla desde Twilio y desconectarla aquí.</li>
          <li>Esta fase no compra números ni modifica webhooks.</li>
        </ul>
      </aside>
    </div>;
  }

  return <div className="space-y-6">
    <section className="admin-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <span className="status-pill"><CheckCircle2 size={13} /> Verificada</span>
        <h2 className="text-xl font-semibold mt-3">Cuenta Twilio conectada</h2>
        <p className="text-sm text-slate-500 mt-1">
          {state.connection.account_sid_masked} · API Key {state.connection.api_key_sid_masked}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="admin-primary" onClick={refresh} disabled={busy === "refresh"}>
          {busy === "refresh" ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
          Actualizar números
        </button>
        <button className="border rounded-xl px-4 py-2 text-sm text-red-600 flex items-center gap-2" onClick={disconnect} disabled={busy === "disconnect"}>
          {busy === "disconnect" ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
          Desconectar
        </button>
      </div>
    </section>

    <section className="admin-panel">
      <div className="panel-head">
        <div>
          <h2>Números existentes</h2>
          <p>Selecciona el número que se asignará en una fase posterior al agente.</p>
        </div>
      </div>
      {state.numbers.length === 0 ? (
        <div className="py-16 text-center">
          <Phone className="mx-auto text-slate-300 mb-3" size={36} />
          <h3 className="font-semibold">Esta cuenta no tiene números</h3>
          <p className="text-sm text-slate-400">QubeSight no comprará números durante esta fase.</p>
        </div>
      ) : (
        <div className="divide-y">
          {state.numbers.map((number) => (
            <article key={number.provider_number_sid} className="agent-row">
              <span className="agent-icon"><Phone /></span>
              <div>
                <span className={number.selected ? "status-pill" : "status-pill inactive"}>
                  {number.selected ? "Seleccionado" : "Disponible"}
                </span>
                <h3>{number.phone_number}</h3>
                <p>{number.friendly_name || "Número Twilio"}</p>
              </div>
              <div className="hidden lg:block">
                <small className="text-[9px] tracking-wider text-slate-400 block">VOZ</small>
                <strong className="text-xs">{number.capabilities?.voice ? "Compatible" : "No indicada"}</strong>
              </div>
              <div className="hidden lg:block">
                <small className="text-[9px] tracking-wider text-slate-400 block">WEBHOOK ACTUAL</small>
                <strong className="text-xs">{number.current_voice_url ? "Ya configurado" : "Sin configurar"}</strong>
              </div>
              <button
                className="admin-primary"
                onClick={() => selectNumber(number.provider_number_sid)}
                disabled={number.selected || busy === number.provider_number_sid}
              >
                {busy === number.provider_number_sid && <Loader2 className="animate-spin" size={15} />}
                {number.selected ? "Elegido" : "Seleccionar"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  </div>;
}
