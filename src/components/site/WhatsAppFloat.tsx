const PHONE = "923284734463";
const MESSAGE = "Hi Nuventure Constructions, I'd like a free 3D design consultation.";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

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
      className="fixed bottom-5 right-5 z-[200] flex items-center justify-center rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#20ba5a] hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 drop-shadow-[0_4px_12px_rgba(37,211,102,0.4)]"
    >
      WhatsApp
    </a>
  );
}
