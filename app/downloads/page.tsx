import Link from "next/link"

export default function DownloadsPage() {
  return (
    <div className="container grid grid-cols-2 gap-4 pb-8 pt-6 md:py-10">
      <Link className="btn btn-primary col-span-2" href="/gneissier.zip">
        Geology world
      </Link>
      <Link className="btn btn-primary" href="/gneissier.zip">
        Color world
      </Link>
      <Link className="btn btn-primary" href="/gneissier.zip">
        Gneissier
      </Link>
      <Link className="btn btn-primary" href="/gneissier.zip">
        Texture pack 1
      </Link>
      <Link className="btn btn-primary" href="/gneissier.zip">
        Texture pack 2
      </Link>
    </div>
  )
}
