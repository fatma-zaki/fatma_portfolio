import type { ReactNode } from "react";
import Image from "next/image";
import { ShoppingBag, Hexagon, Triangle } from "lucide-react";
import type { Project, ProjectVisual } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Coded product mockups for the Featured Projects panels.
 *
 * They show structure, not data: navigation named after the features each
 * project actually has, skeleton rows where content would be. No figures, no
 * invented metrics. Screens keep a fixed dark palette in both themes — they
 * are pictures of a product, not part of the page's own surface.
 */

/* ------------------------------------------------------------------ atoms */

function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-[4px] rounded-full bg-white/[0.09]", className)} style={{ width: w }} />;
}

function Dot({ className }: { className?: string }) {
  return <span className={cn("block h-[5px] w-[5px] rounded-full", className)} />;
}

/** A deterministic QR-style matrix — decoration, encodes nothing. */
function QrMark({ className }: { className?: string }) {
  const n = 21;
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      if (((x * 7 + y * 13 + x * y) % 5) < 2) cells.push([x, y]);
    }
  }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <>
      <rect x={x + 0.5} y={y + 0.5} width={6} height={6} fill="none" stroke="currentColor" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className={className} shapeRendering="crispEdges">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={n - 7} y={0} />
      <Finder x={0} y={n - 7} />
    </svg>
  );
}

function BrowserFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px] border border-white/[0.09] bg-[#0A0F1E]",
        "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(212,175,55,0.05)]",
        className
      )}
    >
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-[5px]">
        <Dot className="bg-white/15" />
        <Dot className="bg-white/15" />
        <Dot className="bg-white/15" />
        <span className="ml-2 h-[7px] w-[28%] rounded-full bg-white/[0.05]" />
      </div>
      {children}
    </div>
  );
}

function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-white/[0.14] bg-[#05080F] p-[3px]",
        "shadow-[0_28px_50px_-22px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,175,55,0.08)]",
        className
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[13px] bg-[#0A0F1E]">
        <span className="absolute left-1/2 top-[4px] h-[5px] w-[30%] -translate-x-1/2 rounded-full bg-black/80" />
        <div className="h-full pt-3">{children}</div>
      </div>
    </div>
  );
}

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-[3px] px-1.5 py-[3px] text-[6.5px] tracking-wide",
        active ? "bg-[#D4AF37]/[0.12] text-[#F2C268]" : "text-[#A7B0C0]/70"
      )}
    >
      <span className={cn("h-[5px] w-[5px] rounded-[1px] border", active ? "border-[#D4AF37]" : "border-white/20")} />
      {label}
    </div>
  );
}

/* --------------------------------------------------------------- GoLink */

function GoLinkVisual() {
  const modules = ["Registration", "Accreditation", "Ticketing", "Access Control"];
  return (
    <div className="relative h-full w-full">
      <BrowserFrame className="absolute left-0 top-[12%] w-[86%]">
        <div className="grid grid-cols-[23%_1fr]">
          <aside className="space-y-[3px] border-r border-white/[0.06] p-2">
            <div className="mb-2 flex items-center gap-1 text-[8px] font-semibold text-[#F5F5F5]">
              <span className="flex h-[10px] w-[10px] items-center justify-center rounded-[2px] bg-[#D4AF37] text-[6px] font-bold text-[#070B16]">
                G
              </span>
              GoLink
            </div>
            <NavItem label="Overview" active />
            {modules.map((m) => (
              <NavItem key={m} label={m} />
            ))}
            <div className="pt-3 space-y-1.5">
              <Bar w="70%" />
              <Bar w="50%" />
            </div>
          </aside>

          <main className="p-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold text-[#F5F5F5]">Event Overview</p>
              <span className="h-[8px] w-[22%] rounded-full border border-white/10" />
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {modules.map((m, i) => (
                <div key={m} className="rounded-[3px] border border-white/[0.07] bg-[#111A2E] p-1.5">
                  <p className="truncate text-[5.5px] uppercase tracking-[0.12em] text-[#A7B0C0]/70">{m}</p>
                  <Bar w={`${[62, 48, 70, 55][i]}%`} className="mt-1.5 h-[5px] bg-white/[0.14]" />
                  <Bar w="36%" className="mt-1 bg-[#D4AF37]/30" />
                </div>
              ))}
            </div>

            <div className="mt-1.5 grid grid-cols-[1fr_34%] gap-1.5">
              <div className="rounded-[3px] border border-white/[0.07] bg-[#111A2E] p-1.5">
                <Bar w="30%" />
                <svg viewBox="0 0 200 70" className="mt-1.5 w-full" fill="none">
                  {[18, 36, 54].map((y) => (
                    <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
                  ))}
                  <path
                    d="M0 58 L18 50 L34 54 L52 38 L70 44 L88 26 L104 34 L122 20 L140 30 L158 14 L176 24 L200 10"
                    stroke="#D4AF37"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M0 58 L18 50 L34 54 L52 38 L70 44 L88 26 L104 34 L122 20 L140 30 L158 14 L176 24 L200 10 V70 H0 Z"
                    fill="url(#gl-fill)"
                  />
                  <defs>
                    <linearGradient id="gl-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#D4AF37" stopOpacity="0.22" />
                      <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col items-center rounded-[3px] border border-white/[0.07] bg-[#111A2E] p-1.5">
                <p className="self-start text-[5.5px] uppercase tracking-[0.12em] text-[#A7B0C0]/70">Access</p>
                <QrMark className="mt-1 w-[58%] text-[#E9ECF2]" />
                <Bar w="60%" className="mt-1.5" />
              </div>
            </div>
          </main>
        </div>
      </BrowserFrame>

      <PhoneFrame className="absolute bottom-[4%] right-[1%] aspect-[9/19] w-[20%]">
        <div className="flex h-full flex-col px-2 pb-2">
          <p className="text-[6.5px] font-semibold text-[#F5F5F5]">Access Pass</p>
          <Bar w="55%" className="mt-1" />
          <div className="mx-auto mt-2 w-[82%] rounded-[4px] bg-[#E9ECF2] p-1">
            <QrMark className="w-full text-[#0A0F1E]" />
          </div>
          <div className="mt-2 flex flex-wrap gap-[3px]">
            {["QR", "RFID", "NFC", "Barcode"].map((t) => (
              <span key={t} className="rounded-[2px] border border-[#D4AF37]/30 px-[3px] text-[5px] text-[#D4AF37]">
                {t}
              </span>
            ))}
          </div>
          <span className="mt-auto block rounded-[3px] bg-[#D4AF37] py-[3px] text-center text-[6px] font-semibold text-[#070B16]">
            Check in
          </span>
        </div>
      </PhoneFrame>
    </div>
  );
}

/* --------------------------------------------------------- Back Of House */

function BohVisual() {
  return (
    <div className="relative h-full w-full">
      {/* brand screen */}
      <PhoneFrame className="absolute bottom-[-8%] left-[6%] aspect-[9/19] w-[28%] -rotate-[7deg] opacity-90">
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,175,55,0.14),transparent_65%)] px-2">
          <Hexagon size={22} strokeWidth={1.2} className="text-[#D4AF37]" />
          <p className="text-center font-display text-[6.5px] uppercase tracking-[0.2em] text-[#F2C268]">Back Of House</p>
          <Bar w="60%" />
        </div>
      </PhoneFrame>

      {/* opportunities */}
      <PhoneFrame className="absolute bottom-[-14%] left-1/2 z-10 aspect-[9/19] w-[31%] -translate-x-1/2">
        <div className="px-2">
          <p className="text-[7px] font-semibold text-[#F5F5F5]">Opportunities</p>
          <div className="mt-1.5 flex gap-1">
            {["Events", "Roles", "Companies"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-full px-1.5 py-[1px] text-[5px]",
                  i === 0 ? "bg-[#D4AF37] text-[#070B16]" : "border border-white/10 text-[#A7B0C0]/70"
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-[4px] border border-white/[0.07] bg-[#111A2E] p-1.5">
                <span className="h-[14px] w-[14px] shrink-0 rounded-full border border-[#D4AF37]/40 bg-[#18233A]" />
                <div className="flex-1 space-y-1">
                  <Bar w={`${[70, 58, 76, 64][i]}%`} className="bg-white/[0.14]" />
                  <Bar w="45%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>

      {/* profile / event */}
      <PhoneFrame className="absolute bottom-[-8%] right-[6%] aspect-[9/19] w-[28%] rotate-[7deg] opacity-90">
        <div className="px-2">
          <div className="h-[46px] rounded-[4px] bg-gradient-to-br from-[#18233A] to-[#0D1326]" />
          <div className="-mt-3 ml-1.5 h-[18px] w-[18px] rounded-full border border-[#D4AF37]/60 bg-[#111A2E]" />
          <div className="mt-1.5 space-y-1">
            <Bar w="62%" className="bg-white/[0.14]" />
            <Bar w="44%" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-[20px] rounded-[3px] border border-white/[0.07] bg-[#111A2E]" />
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ Awar */

function AwarVisual() {
  return (
    <div className="relative h-full w-full">
      <BrowserFrame className="absolute inset-x-[4%] top-[8%] bottom-[-10%]">
        <div className="grid h-full grid-cols-[24%_1fr]">
          <aside className="space-y-[3px] border-r border-white/[0.06] p-2">
            <div className="mb-2 flex items-center gap-1 text-[8px] font-semibold tracking-[0.12em] text-[#F5F5F5]">
              <Triangle size={8} className="fill-[#D4AF37] text-[#D4AF37]" />
              AWAR
            </div>
            <NavItem label="Dashboard" />
            <NavItem label="Staffing" active />
            <NavItem label="Projects" />
            <NavItem label="Payroll" />
          </aside>
          <main className="p-2">
            <div className="flex items-center justify-between">
              <p className="text-[7.5px] font-semibold text-[#F5F5F5]">Staffing</p>
              <span className="rounded-[2px] bg-[#D4AF37]/90 px-1.5 py-[1px] text-[5.5px] font-semibold text-[#070B16]">+ Assign</span>
            </div>
            <div className="mt-2 grid grid-cols-[1.4fr_1fr_1fr_0.7fr] gap-2 border-b border-white/[0.06] pb-1 text-[5px] uppercase tracking-[0.14em] text-[#A7B0C0]/60">
              <span>Staff</span>
              <span>Project</span>
              <span>Shift</span>
              <span>Status</span>
            </div>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] items-center gap-2 border-b border-white/[0.04] py-[5px]"
              >
                <div className="flex items-center gap-1">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#18233A] ring-1 ring-white/10" />
                  <Bar w={`${[70, 56, 64, 50, 60][i]}%`} className="bg-white/[0.13]" />
                </div>
                <Bar w={`${[60, 72, 48, 66, 54][i]}%`} />
                <Bar w={`${[44, 50, 58, 40, 52][i]}%`} />
                <span
                  className={cn(
                    "h-[6px] w-[80%] rounded-full",
                    i % 3 === 1 ? "bg-white/[0.08]" : "bg-[#D4AF37]/35"
                  )}
                />
              </div>
            ))}
          </main>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ------------------------------------------------------------ E-Commerce */

function CommerceVisual() {
  const shapes = [
    "rounded-full w-[46%] aspect-square",
    "rounded-[40%_40%_12px_12px] w-[40%] aspect-[3/4]",
    "rounded-[6px] w-[52%] aspect-[4/3]",
    "rounded-full w-[36%] aspect-[3/4]",
  ];
  return (
    <div className="relative h-full w-full">
      <BrowserFrame className="absolute left-[3%] top-[8%] bottom-[-10%] w-[76%] bg-[#E9ECF2]">
        <div className="flex items-center justify-between bg-[#F5F6F9] px-2 py-1.5">
          <span className="text-[7px] font-bold tracking-[0.14em] text-[#0D1326]">STORE</span>
          <div className="flex gap-1.5">
            <Bar w="18px" className="bg-[#0D1326]/15" />
            <Bar w="18px" className="bg-[#0D1326]/15" />
          </div>
          <ShoppingBag size={8} className="text-[#0D1326]" />
        </div>
        <div className="grid grid-cols-4 gap-1.5 p-2">
          {shapes.map((s, i) => (
            <div key={i} className="rounded-[3px] bg-white p-1 shadow-[0_2px_6px_rgba(13,19,38,0.08)]">
              <div className="flex aspect-square items-center justify-center rounded-[2px] bg-[#EEF1F6]">
                <span className={cn("block bg-gradient-to-br from-[#2A3855] to-[#0D1326]", s)} />
              </div>
              <span className="mt-1 block h-[3px] w-[70%] rounded-full bg-[#0D1326]/20" />
              <span className="mt-[3px] block h-[3px] w-[36%] rounded-full bg-[#9C741A]/60" />
            </div>
          ))}
        </div>
      </BrowserFrame>

      <PhoneFrame className="absolute bottom-[-6%] right-[3%] z-10 aspect-[9/19] w-[26%]">
        <div className="flex h-full flex-col bg-[#F5F6F9] px-1.5 pb-2">
          <div className="flex aspect-square items-center justify-center rounded-[4px] bg-[#EEF1F6]">
            <span className="block w-[50%] aspect-square rounded-full bg-gradient-to-br from-[#2A3855] to-[#0D1326]" />
          </div>
          <span className="mt-1.5 block h-[4px] w-[70%] rounded-full bg-[#0D1326]/25" />
          <span className="mt-1 block h-[4px] w-[40%] rounded-full bg-[#9C741A]/60" />
          <span className="mt-auto block rounded-[3px] bg-[#0D1326] py-[3px] text-center text-[5.5px] font-semibold text-[#F2C268]">
            Checkout
          </span>
        </div>
      </PhoneFrame>
    </div>
  );
}

/* ------------------------------------------------ fallback: the blueprint */

/**
 * For a project with neither a screenshot nor a mockup yet: an empty drafting
 * plate in the house geometry, so a new card never looks broken or generic.
 */
function BlueprintVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-[4px] border border-b-0 border-gold/[0.12] bg-[#070B16]">
      <div className="absolute inset-0 bg-circuit-grid opacity-60" />
      <svg viewBox="0 0 300 180" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="xMidYMid slice">
        <circle cx="150" cy="96" r="54" stroke="rgba(212,175,55,0.22)" />
        <circle cx="150" cy="96" r="34" stroke="rgba(212,175,55,0.14)" strokeDasharray="2 5" />
        <path d="M60 96 H116 M184 96 H240 M150 20 V62 M150 130 V180" stroke="rgba(212,175,55,0.18)" />
        <rect x="145" y="91" width="10" height="10" transform="rotate(45 150 96)" stroke="#D4AF37" strokeOpacity="0.7" />
        <circle cx="60" cy="96" r="2" fill="#D4AF37" fillOpacity="0.5" />
        <circle cx="240" cy="96" r="2" fill="#D4AF37" fillOpacity="0.5" />
      </svg>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-tech text-[8px] uppercase tracking-[0.3em] text-[#A7B0C0]/60">
        Preview in preparation
      </p>
    </div>
  );
}

const visuals: Record<ProjectVisual, () => JSX.Element> = {
  golink: GoLinkVisual,
  boh: BohVisual,
  awar: AwarVisual,
  commerce: CommerceVisual,
};

/* ------------------------------------------- real screenshots, composed */

/**
 * A project's own screenshots, cut out of their backgrounds: the desktop
 * window set back and to the left, the phone forward and to the right — the
 * same staging the coded mockups use, so real and drawn visuals sit alike.
 */
export function ShotComposition({
  title,
  shots,
  sizes,
}: {
  title: string;
  shots: NonNullable<Project["shots"]>;
  sizes: string;
}) {
  const { desktop, mobile } = shots;
  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2",
          mobile ? "w-[86%] -mt-[4%]" : "w-full"
        )}
      >
        <Image
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          sizes={sizes}
          alt={`${title} web app dashboard`}
          className="h-auto w-full rounded-[6px] ring-1 ring-white/10
                     shadow-[0_30px_60px_-28px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,175,55,0.06)]"
        />
      </div>
      {mobile && (
        <div className="absolute bottom-0 right-[1%] w-[21%]">
          <Image
            src={mobile.src}
            width={mobile.width}
            height={mobile.height}
            sizes="(max-width: 1024px) 22vw, 140px"
            alt={`${title} phone app`}
            className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.85)]"
          />
        </div>
      )}
    </div>
  );
}

export function ProjectMockup({ visual }: { visual?: ProjectVisual }) {
  const Visual = visual ? visuals[visual] : BlueprintVisual;
  return <Visual />;
}
