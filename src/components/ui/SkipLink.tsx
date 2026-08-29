export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-0 z-[100] -translate-y-full rounded-b-[var(--radius-md)] bg-accent px-6 py-3 text-body-sm font-bold text-white shadow-lg transition-transform duration-300 focus:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
    >
      Skip to main content
    </a>
  );
}
