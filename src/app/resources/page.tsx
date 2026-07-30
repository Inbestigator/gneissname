import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Access world downloads and resource packs featured in videos",
};

const worldDownloads = [
  {
    title: "Gneiss Benchmark",
    version: "1.26.1",
    id: "1_GA8Quv2xf3ZqfO_5fC1w6jJQ_VeoocS",
    description: "A little benchmark world.",
  },
  {
    title: "Geology World",
    version: "1.21.4 only",
    id: "1J49OocbGO2ywWNVIyncsoPR--W7m3KEI",
    description:
      "The latest version of this world, has the original geologic timeline and exhibits from all of the geology episodes up to and including the 'why care about geology' episode.",
  },
  {
    title: "Color World",
    version: "1.21.1+",
    id: "1eVXjSoCqHQ8wm0zFyLlHc7-QrARpgn3X",
    description:
      "A super flat world that displays all blocks in Minecraft based on their colors and arranged by selections you make.",
  },
];

const resourcePacks = [
  {
    title: "Gneissier",
    version: "Version+",
    id: "/gneissier.zip",
    description:
      "Do you see my face everywhere but that's still not enough? Say no more rock lover. (Official resource pack of the Gneissmp)",
  },
  {
    title: "Snow Layers",
    version: "1.17.1+",
    id: "18zJp8MlPdZ8qK46Ge2sY8JEwFuzzF24j",
    description:
      "Helps with mob proofing in snow biomes. It highlights single layers of snow and adds a number to all non-full blocks.",
  },
  {
    title: "Mean Shift",
    version: "1.21.4+",
    id: "1U8uHwKdusophaO0Bt_X73fCIIl1wtgQ8",
    description:
      "Just an interesting visual pack. All block textures are mean shifted and close clusters merged. It basically recreates the barebone pack Mojang uses in promotional materials.",
  },
];

function Card({ item }: { item: (typeof worldDownloads)[number] }) {
  return (
    <Link
      className="card card-compact bg-base-200 transition-all hover:bg-base-300/80"
      href={item.id.startsWith("/") ? item.id : `https://drive.google.com/file/d/${item.id}`}
      target="_blank"
    >
      <div className="card-body">
        <h2 className="card-title">
          {item.title}
          <div className="badge badge-neutral ml-auto hidden md:flex">{item.version}</div>
        </h2>
        <p>{item.description}</p>
      </div>
    </Link>
  );
}

export default function DownloadsPage() {
  return (
    <div className="mt-6 mb-8 grid gap-4 sm:grid-cols-3 md:my-10">
      <h1 className="font-semibold text-4xl tracking-tight sm:col-span-3">World downloads</h1>
      {worldDownloads.map((item) => (
        <Card key={item.id} item={item} />
      ))}
      <h1 className="font-semibold text-4xl tracking-tight sm:col-span-3">Resource packs</h1>
      {resourcePacks.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
