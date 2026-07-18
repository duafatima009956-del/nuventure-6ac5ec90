const PHONE = "923284734463";
const MESSAGE = "Hi Nuventure Constructions, I'd like a free 3D design consultation.";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="#25D366"
        d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.57 2.15 8L.5 31.5l7.68-2.01A15.5 15.5 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5z"
      />
      <path
        fill="#fff"
        d="M23.47 19.6c-.32-.16-1.9-.94-2.19-1.04-.3-.11-.51-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58a9.68 9.68 0 0 1-1.79-2.22c-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.63-.53-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.09 1.31 3.3.16.21 2.26 3.45 5.48 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"
      />
    </svg>
  );
}

export function WhatsAppFloat() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const top = window.top ?? window;
      top.location.href = WHATSAPP_URL;
    } catch {
      const win = window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = WHATSAPP_URL;
    }
  };

  return (
    <a
      href={WHATSAPP_URL}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nuventure Constructions on WhatsApp"
      className="group fixed bottom-5 right-5 z-[200] flex h-14 w-14 items-center justify-center transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none absolute inset-1 animate-ping rounded-full bg-[#25D366]/40" />
      <WhatsAppGlyph className="relative h-14 w-14 drop-shadow-[0_4px_12px_rgba(37,211,102,0.5)]" />
    </a>
  );
}
