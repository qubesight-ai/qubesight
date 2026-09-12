import { useState, type ReactNode } from "react";
import {
  Bot,
  LayoutDashboard,
  LogOut,
  Menu,
  Mic2,
  PhoneCall,
  Radio,
  UserRound,
  X,
} from "lucide-react";
import type { DashboardSection } from "@/types/dashboard";

type Props = {
  section: DashboardSection;
  profileName: string;
  email: string;
  organizationName: string;
  onNavigate: (section: DashboardSection) => void;
  onSignOut: () => void | Promise<void>;
  children: ReactNode;
};

const nav: [DashboardSection, string, typeof LayoutDashboard][] = [
  ["overview", "Resumen", LayoutDashboard],
  ["agents", "Agentes de voz", Mic2],
  ["chatbots", "Chatbots", Bot],
  ["telephony", "Telefonía", Radio],
  ["calls", "Llamadas", PhoneCall],
  ["profile", "Perfil", UserRound],
];

export default function DashboardLayout({
  section,
  profileName,
  email,
  organizationName,
  onNavigate,
  onSignOut,
  children,
}: Props) {
  const [mobile, setMobile] = useState(false);

  const navigate = (target: DashboardSection) => {
    onNavigate(target);
    setMobile(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 flex">
      <aside className={`admin-sidebar ${mobile ? "open" : ""}`}>
        <div className="p-5 flex items-center justify-between">
          <span className="flex items-center gap-3 text-white font-semibold text-lg">
            <i className="w-9 h-9 rounded-xl bg-blue-500 grid place-items-center">
              <Mic2 size={18} />
            </i>
            QubeSight
          </span>

          <button className="md:hidden text-slate-400" onClick={() => setMobile(false)}>
            <X />
          </button>
        </div>

        <p className="px-6 mt-5 mb-2 text-[10px] tracking-[.2em] text-slate-500">
          AUTOMATION ADMIN
        </p>

        <nav className="px-3 space-y-1">
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={section === id ? "active" : ""}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 grid place-items-center text-xs font-bold">
              {(profileName || email || "U").slice(0, 2).toUpperCase()}
            </span>

            <span className="min-w-0">
              <strong className="block text-white text-xs truncate">
                {profileName || "Usuario"}
              </strong>
              <small className="text-slate-500 block truncate">{organizationName}</small>
            </span>
          </div>

          <button
            onClick={onSignOut}
            className="w-full text-slate-400 hover:text-white flex items-center gap-2 text-xs p-2"
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobile && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobile(false)}
        />
      )}

      <main className="flex-1 md:ml-60 min-w-0">
        <header className="h-20 bg-white border-b flex items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setMobile(true)}>
              <Menu />
            </button>

            <div>
              <p className="text-[10px] tracking-[.15em] text-slate-400">CENTRO DE OPERACIONES</p>
              <h1 className="text-xl font-semibold">
                {nav.find((item) => item[0] === section)?.[1]}
              </h1>
            </div>
          </div>

          <span className="hidden sm:flex items-center gap-2 text-xs text-slate-500 border rounded-full px-3 py-2">
            <i className="w-2 h-2 rounded-full bg-emerald-500" />
            Sistema disponible
          </span>
        </header>

        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}
