"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    signIn("discord");
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="card w-fit bg-base-200">
        <div className="card-body">
          <div className="card-title">Starting login process...</div>
        </div>
      </div>
    </div>
  );
}
