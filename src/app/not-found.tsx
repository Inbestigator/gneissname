import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mt-6 mb-8 flex flex-col items-center justify-center gap-4 text-center md:my-10">
      <h1 className="font-semibold text-4xl tracking-tight">There's gnothing here!</h1>
      <Link href="/" className="link link-hover btn btn-primary">
        Go home
      </Link>
    </div>
  );
}
