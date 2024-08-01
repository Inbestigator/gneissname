"use client"

import { useEffect } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  useEffect(() => {
    signIn("discord")
  }, [])

  return (
    <div className="flex h-[calc(100dvh-6rem)] md:h-[calc(100dvh-12rem)] items-center justify-center">
      <div className="card bg-base-200 w-fit">
        <div className="card-body">
          <div className="card-title">Starting login process...</div>
        </div>
      </div>
    </div>
  )
}
