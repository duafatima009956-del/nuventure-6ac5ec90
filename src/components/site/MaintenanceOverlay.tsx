import type { FC } from "react";

export const MaintenanceOverlay: FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1117] px-4 py-6">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center">
        <img
          src="/error/error.jpeg"
          alt="Maintenance mode"
          className="h-auto w-full max-w-[500px] max-h-[calc(100vh-4rem)] rounded-2xl object-contain shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
          loading="eager"
        />
      </div>
    </div>
  );
};
