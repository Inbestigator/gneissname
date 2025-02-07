import Link from "next/link"

export default function DownloadsPage() {
  return (
    <div className="grid gap-4 pb-8 pt-6 sm:grid-cols-3 md:py-10">
      <h1 className="text-3xl font-extrabold sm:col-span-3">World downloads</h1>
      <Link
        className="card card-compact bg-base-200 transition-all hover:bg-base-300/80"
        href="https://drive.google.com/file/d/1J49OocbGO2ywWNVIyncsoPR--W7m3KEI"
        target="_blank"
      >
        <div className="card-body">
          <h2 className="card-title">
            Geology world
            <div className="badge badge-neutral ml-auto hidden md:flex">
              1.21.4 only
            </div>
          </h2>
          <p>
            The latest version of this world, has the original geologic timeline
            and exhibits from all of the geology episodes up to and including
            the &quot;why care about geology&quot; episode.
          </p>
        </div>
      </Link>
      <Link
        className="card card-compact bg-base-200 transition-all hover:bg-base-300/80"
        href="https://drive.google.com/file/d/1eVXjSoCqHQ8wm0zFyLlHc7-QrARpgn3X"
        target="_blank"
      >
        <div className="card-body">
          <h2 className="card-title">
            Color world
            <div className="badge badge-neutral ml-auto hidden md:flex">
              1.21.1+
            </div>
          </h2>
          <p>
            A super flat world that displays all blocks in Minecraft based on
            their colors and arranged by selections you make.
          </p>
        </div>
      </Link>
      <h1 className="text-3xl font-extrabold sm:col-span-3">Resource packs</h1>
      <Link
        className="card card-compact bg-base-200 transition-all hover:bg-base-300/80"
        href="https://drive.google.com/file/d/18zJp8MlPdZ8qK46Ge2sY8JEwFuzzF24j"
        target="_blank"
      >
        <div className="card-body">
          <h2 className="card-title">
            Gneissier
            <div className="badge badge-neutral ml-auto hidden md:flex">
              Version+
            </div>
          </h2>
          <p>
            Do you see my face everywhere but that&apos;s still not enough? Say
            no more rock lover. (Official resource pack of the Gneissmp)
          </p>
        </div>
      </Link>
      <Link
        className="card card-compact bg-base-200 transition-all hover:bg-base-300/80"
        href="https://drive.google.com/file/d/18zJp8MlPdZ8qK46Ge2sY8JEwFuzzF24j"
        target="_blank"
      >
        <div className="card-body">
          <h2 className="card-title">
            Snow layers
            <div className="badge badge-neutral ml-auto hidden md:flex">
              1.17.1+
            </div>
          </h2>
          <p>
            Helps with mob proofing in snow biomes. It highlights single layers
            of snow and adds a number to all non-full blocks.
          </p>
        </div>
      </Link>
      <Link
        className="card card-compact bg-base-200 transition-all hover:bg-base-300/80"
        href="https://drive.google.com/file/d/1U8uHwKdusophaO0Bt_X73fCIIl1wtgQ8"
        target="_blank"
      >
        <div className="card-body">
          <h2 className="card-title">
            Mean shift
            <div className="badge badge-neutral ml-auto hidden md:flex">
              1.21.4+
            </div>
          </h2>
          <p>
            Just an interesting visual pack. All block textures are mean shifted
            and close clusters merged. It basically recreates the barebone pack
            Mojang uses in promotional materials.
          </p>
        </div>
      </Link>
    </div>
  )
}
