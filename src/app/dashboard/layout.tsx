import { Suspense } from "react";

export default function DashboardLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
