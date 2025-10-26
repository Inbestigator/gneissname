"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    signIn("discord");
  }, []);

  return (
    <div className="flex h-[calc(100dvh-6rem)] items-center justify-center md:h-[calc(100dvh-12rem)]">
      <div className="card w-fit bg-base-200">
        <div className="card-body">
          <div className="card-title">Starting login process...</div>
        </div>
      </div>
    </div>
  );
}
