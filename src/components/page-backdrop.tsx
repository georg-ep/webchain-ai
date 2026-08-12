/**
 * A single fixed backdrop for the whole page: slow aurora, a masked grid and
 * film grain. Because it is fixed rather than per-section, the background
 * stays continuous as the visitor scrolls and the sections read as one
 * surface rather than a stack of slabs.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-surface-0">
      <div className="absolute inset-0 grid-lines opacity-60" />

      <div className="absolute -left-[15%] top-[-10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.10),transparent_65%)] blur-3xl animate-drift" />
      <div className="absolute right-[-15%] top-[20%] h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.09),transparent_65%)] blur-3xl animate-drift [animation-delay:-11s]" />
      <div className="absolute bottom-[-20%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.06),transparent_65%)] blur-3xl animate-drift [animation-delay:-19s]" />

      <div className="noise absolute inset-0" />
    </div>
  );
}
