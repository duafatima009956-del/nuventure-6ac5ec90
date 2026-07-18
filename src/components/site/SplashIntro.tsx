import { useEffect, useRef, useState } from "react";

const TOTAL_MS = 6200;
const FADE_MS = 650;

export function SplashIntro({ onDone }: { onDone?: () => void }) {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = "hidden";
    const leaveTimer = window.setTimeout(() => setLeaving(true), TOTAL_MS - FADE_MS);
    const endTimer = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("nv-splash-done"));
      onDoneRef.current?.();
    }, TOTAL_MS);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(endTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      data-nv-splash="true"
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] overflow-hidden bg-transparent transition-opacity duration-500 ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ willChange: "opacity" }}
    >
      <div className="nv-splash-stage">
        <div className="nv-splash-mark">
          <img
            src="/nuventure-logo-splash-centered.png"
            alt="Nuventure Constructions"
            draggable={false}
            className="nv-splash-logo select-none"
          />
        </div>
      </div>

      <style>{`
        .nv-splash-stage {
          position: fixed;
          inset: 0;
          padding: clamp(24px, 5vw, 72px);
          pointer-events: none;
          overflow: hidden;
        }
        .nv-splash-mark {
          position: fixed;
          left: 50%;
          top: 50%;
          width: min(76vw, 760px);
          height: min(76vw, 760px);
          max-width: calc(100vw - clamp(48px, 10vw, 144px));
          max-height: calc(100vh - clamp(64px, 12vh, 160px));
          aspect-ratio: 1 / 1;
          transform-origin: center center;
          transform-box: border-box;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(-50%, -50%, 0) scale(0.001);
          animation: nvLogoZoom 5500ms cubic-bezier(0.16, 0.82, 0.24, 1) both;
          contain: layout paint;
        }
        .nv-splash-logo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: transparent;
          border-radius: 0 !important;
          transform: translate3d(0, 0, 0);
          opacity: 0;
          will-change: opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: nvLogoReveal 700ms ease-out 60ms both;
        }
        @keyframes nvLogoZoom {
          0% {
            transform: translate3d(-50%, -50%, 0) scale(0.001);
          }
          18% {
            transform: translate3d(-50%, -50%, 0) scale(0.012);
          }
          44% {
            transform: translate3d(-50%, -50%, 0) scale(0.12);
          }
          76% {
            transform: translate3d(-50%, -50%, 0) scale(0.68);
          }
          100% {
            transform: translate3d(-50%, -50%, 0) scale(0.98);
          }
        }
        @keyframes nvLogoReveal {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @media (max-width: 640px) {
          .nv-splash-mark {
            width: min(82vw, 560px);
            height: min(82vw, 560px);
            max-width: calc(100vw - 40px);
            max-height: calc(100vh - 96px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .nv-splash-mark,
          .nv-splash-logo {
            animation: none;
          }
          .nv-splash-mark {
            transform: translate3d(-50%, -50%, 0) scale(0.98);
          }
          .nv-splash-logo {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
