import type { ReactNode } from "react";

type Social = {
  name: string;
  href: string;
  icon: ReactNode;
};

export const socials: Social[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1BrMupBfTj/",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#1877F2" />
        <path
          fill="#ffffff"
          d="M36.75 33.99h5.08l.8-6.05h-5.88v-3.86c0-1.75.5-2.94 3-2.94h3.2v-5.4c-.55-.08-2.46-.24-4.68-.24-4.63 0-7.8 2.83-7.8 8.01v4.43h-5.24v6.05h5.24V49.5h6.28V33.99z"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nuventureconstructions",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="ig-social-grad" cx="28%" cy="108%" r="140%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="18%" stopColor="#fdf497" />
            <stop offset="42%" stopColor="#fd5949" />
            <stop offset="62%" stopColor="#d6249f" />
            <stop offset="100%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="17" fill="url(#ig-social-grad)" />
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.3"
          d="M21.8 15.8h20.4c3.3 0 6 2.7 6 6v20.4c0 3.3-2.7 6-6 6H21.8c-3.3 0-6-2.7-6-6V21.8c0-3.3 2.7-6 6-6z"
        />
        <circle cx="32" cy="32" r="9.4" fill="none" stroke="#ffffff" strokeWidth="4.3" />
        <circle cx="43.4" cy="20.8" r="3.2" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@nuventure.constructions",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#050505" />
        <path
          fill="#25F4EE"
          d="M38.6 14.3c.8 4.4 3.6 7.1 8.2 7.4v7.1a17.2 17.2 0 0 1-8.1-2.2v12.2c0 7.1-5.7 12.9-12.9 12.9S13 45.9 13 38.8s5.7-12.9 12.8-12.9c.8 0 1.5.1 2.2.2v7.5a5.6 5.6 0 1 0 3.7 5.2V14.3h6.9z"
          opacity="0.96"
          transform="translate(-2 1.8)"
        />
        <path
          fill="#FE2C55"
          d="M38.6 14.3c.8 4.4 3.6 7.1 8.2 7.4v7.1a17.2 17.2 0 0 1-8.1-2.2v12.2c0 7.1-5.7 12.9-12.9 12.9S13 45.9 13 38.8s5.7-12.9 12.8-12.9c.8 0 1.5.1 2.2.2v7.5a5.6 5.6 0 1 0 3.7 5.2V14.3h6.9z"
          opacity="0.96"
          transform="translate(2 -1.4)"
        />
        <path
          fill="#ffffff"
          d="M38.6 14.3c.8 4.4 3.6 7.1 8.2 7.4v7.1a17.2 17.2 0 0 1-8.1-2.2v12.2c0 7.1-5.7 12.9-12.9 12.9S13 45.9 13 38.8s5.7-12.9 12.8-12.9c.8 0 1.5.1 2.2.2v7.5a5.6 5.6 0 1 0 3.7 5.2V14.3h6.9z"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@nuventureconstructions",
    icon: (
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#FF0000" />
        <path
          fill="#ffffff"
          d="M48.6 25.1a5.2 5.2 0 0 0-3.7-3.7C41.6 20.5 32 20.5 32 20.5s-9.6 0-12.9.9a5.2 5.2 0 0 0-3.7 3.7c-.9 3.3-.9 6.9-.9 6.9s0 3.7.9 6.9a5.2 5.2 0 0 0 3.7 3.7c3.3.9 12.9.9 12.9.9s9.6 0 12.9-.9a5.2 5.2 0 0 0 3.7-3.7c.9-3.3.9-6.9.9-6.9s0-3.7-.9-6.9z"
        />
        <path
          fill="#FF0000"
          d="M29.1 38.2V25.8L39.8 32 29.1 38.2z"
        />
      </svg>
    ),
  },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Nuventure on ${s.name}`}
          title={s.name}
          className="group inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground p-2 shadow-[0_18px_38px_-14px_color-mix(in_oklab,var(--accent)_55%,transparent)] ring-2 ring-accent/55 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:ring-accent"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
