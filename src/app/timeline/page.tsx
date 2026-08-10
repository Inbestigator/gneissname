import { IconFileDescription, IconHash } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC, PropsWithChildren, SVGProps } from "react";

export const metadata: Metadata = {
  title: "Geologic Timeline Project",
  description:
    "A vanilla Minecraft world where each block represents one million years of Earth's history, with geological events, prehistoric life, custom assets, and interactive exhibits.",
};

export default function TimelineInfoPage() {
  return (
    <div className="mt-6 mb-8 flex flex-col items-center justify-center gap-4 text-balance text-center md:my-10">
      <h1>Geologic Timeline Project</h1>
      <p className="text-pretty">
        Deep time is a concept that is hard to wrap your head around, and when displayed it is often condensed. Such as
        in my booth at{" "}
        <Link href="https://smithed.net/summit" target="_blank" className="link link-hover text-[revert]">
          Smithed Summit 2026
        </Link>
        .
      </p>
      <Section
        image={{
          src: "/timeline/next-to-critters.png",
          alt: "Gneiss Name standing in water next to a spider and crocodile",
          height: 224,
        }}
      >
        To help really understand it, I&rsquo;m creating a vanilla Java Minecraft world where traveling one block equals
        one million years. Seeing relationships at a 1:1 scale gives something more tangible to conceive of the distance
        between events.
        <br />
        <br />
        Alongside this scaled geologic timeline is a diorama that represents earth at that time. The timeline includes
        major events in earth's history, custom models and textures for plants and animals, and animated displays all
        based on real paleontological information.
      </Section>
      <Section
        image={{ src: "/timeline/wide-shot.png", alt: "Wide shot of the Geologic Timeline Project", height: 216 }}
        reverse
      >
        So why do this in vanilla, and not with mods? Because I want anyone to be able to just own Minecraft, download
        the world, and use it without knowledge of mods.
        <br />
        <br />
        Minecraft is very approachable and it's one of the reasons why it's a good platform for education. My target
        audience is anyone that is interested in earth's history but my aim is to have it accurate enough to be used by
        educators.
      </Section>
      <Section
        image={{
          src: "/timeline/old-thumbnail.png",
          alt: "Thumbnail Image of the original geologic timeline video",
          height: 294,
        }}
      >
        Creating a version of this was actually the original idea that got me thinking about using Minecraft to talk
        about geology and starting my youtube channel.
        <br />
        <br />
        After working on it for a few years with some contributors I&rsquo;m ready to devote more time and energy to
        complete it before the next real life geologic eon is upon us.
      </Section>
      <section className="hero text-pretty">
        <div className="hero-content flex-col px-0">
          <p className="mt-4">
            <span className="text-lg">
              I&apos;m looking for contributors skilled in resource packs, datapacks, map making, Blockbench, modeling,
              or pixel art.
            </span>
            <br />
            <br />
            Interested in collaborating? Fill out the application and join the Discord to stay up to date.
          </p>
          <div className="mt-6 grid w-full gap-3 sm:grid-cols-3">
            <ActionCard
              href="https://forms.gle/62mHkKNtHoZ3kqoS6"
              Icon={IconFileDescription}
              title="Apply to collaborate"
              description="Submit your application"
            />
            <ActionCard
              href="https://discord.gg/gneiss-server-750062409364013159"
              Icon={IconDiscordLogo}
              title="Discord server"
              description="Join the community"
            />
            <ActionCard
              href="https://discord.com/channels/750062409364013159/1293942024323596423"
              Icon={IconHash}
              title="Timeline channel"
              description="Follow project progress"
            />
          </div>
        </div>
      </section>
      <div className="divider" />
      <h1>More details</h1>
      <h2>World Building & Map Making</h2>
      <Section
        image={{
          src: "/timeline/wide-shot-middle-600.png",
          alt: "Wide shot of the middle ~600 million years of the Geologic Timeline, showing the simple terrain",
          height: 216,
        }}
        reverse
      >
        The diorama is 4,567 blocks long, starting with the formation of earth and ending at present time. The goal is
        to only use materials that would be present in that time, no green wool as grass etc. When there is a need for
        something not in vanilla, we make it and add it to the resource pack.
        <br />
        <br />
        The initial layout was built using simple noise patterns and this needs to be refined for the middle three
        billion years by adding mountains, streams, sediment, etc.
      </Section>
      <Section
        image={{
          src: "/timeline/cretaceous-dinos.png",
          alt: "Cretaceous dinosaurs in a small scene, showing the time period on the wall behind them",
          height: 216,
        }}
      >
        The most recent ~600 million years has plants and animals of the time, constrained to their duration on earth.
        For example T-rex was around from 69-66 mya so it's only in four blocks of the diorama. These custom resources
        need to be added into the world to create little scenes and fit with the topography.
        <br />
        <br />
        To give you an idea of scale, we have over 300 animals and 100 plants already created and are looking to include
        more.
      </Section>
      <Section
        image={{
          src: "/timeline/museum-lobby.png",
          alt: "Inside the circular lobby of a museum, showing a model of the earth hung from the cieling and multiple levels of exhibit halls, with a GuideName NPC.",
          height: 216,
        }}
        reverse
      >
        The spawn location and hub of the timeline is a museum which will contain an interactive map, orientation and
        explanation of how and why we are doing things the way we are. Things like, if a tree's canopy is five blocks
        wide, it doesn&rsquo;t mean the tree lived for five million years and other limitations that we have to concede
        to make the world work.
        <br />
        <br />
        In a future release the Museum will also have rooms for each time period. The final design for the interior and
        exterior of the museum needs to be decided on and built.
      </Section>
      <h2>Resource Pack and Assets</h2>
      <Section
        image={{
          src: "/timeline/dino-lineup.png",
          alt: "Many dinosaurs lined up in a dev display of their stratigraphic range",
          height: 216,
        }}
      >
        Most of the custom models we are using are from the Prehistoric Fauna Mod. We have partnered with them and
        besides using resources they have created for the mod, they have also created assets from other times for us to
        use.
        <br />
        <br />
        The art direction goal is to keep things looking like it would fit in Minecraft. There are additional models
        needed and we are really lacking animals specifically in the permian and cenozoic. A platypus is required.
      </Section>
      <h2>Datapack Work</h2>
      <Section
        image={{
          src: "/timeline/manual-excerpt.png",
          alt: "Sample page from the Timeline Manual book showing species entries and information",
          height: 213,
        }}
        reverse
      >
        Each player will be given a book which will use the dialog system (which I don&rsquo;t know anything about).
        While on the timeline or in the diorama the player can open the book and it will display information for the
        time period. This book will also basically act as a Pokedex. Plants and animals of each period will have grey
        silhouettes in the book and once they are found in the world, an entry unlocks and gives more information. An
        advancement is made once you find everything in a time period and I would like to add some more gameplay
        elements to help facilitate exploration.
      </Section>
      <Section
        image={{
          src: "/timeline/map-wall.png",
          alt: "Map of the geologic timeline composed of a long export of the chunks making it up",
          height: 216,
        }}
      >
        The timeline map will allow players to select what part of time you want to visit but it will also display
        information relative to geologic time. Events like rates of extinction, the average global temperature, or a
        simplified tree of life can be selected and displayed in relation to geologic time.
      </Section>
      <div className="divider" />
      <p className="text-pretty">
        Beyond this, there is the need to keep everything behind the scenes organized. I would like to support this even
        after its release.
        <br />
        There are a few future ideas that would be great to incorporate and I'm always willing to hear new ones too.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <BreadCrumbs
          entries={[
            {
              href: "https://forms.gle/62mHkKNtHoZ3kqoS6",
              Icon: IconFileDescription,
              title: "Collaborator application",
            },
          ]}
        />
        <BreadCrumbs
          entries={[
            {
              href: "https://discord.gg/gneiss-server-750062409364013159",
              Icon: IconDiscordLogo,
              title: "Discord server",
            },
            {
              href: "https://discord.com/channels/750062409364013159/1293942024323596423",
              Icon: IconHash,
              title: "Timeline channel",
            },
          ]}
        />
      </div>
    </div>
  );
}

const BreadCrumbs: FC<{ entries: { title: string; href: string; Icon: React.FC<{ className: string }> }[] }> = ({
  entries,
}) => (
  <div className="breadcrumbs p-0">
    <ul className="group">
      {entries.map((e) => (
        <li
          key={e.href}
          className="not-last:*:rounded-r-none not-first:*:rounded-l-none not-group-hover:not-last:*:border-r-transparent not-group-hover:not-first:*:border-l-transparent before:absolute before:-translate-x-3 not-group-hover:before:transition-opacity group-hover:before:opacity-0 group-hover:before:duration-200 group-hover:before:ease-out"
        >
          <Link href={e.href} role="link" target="_blank" className="btn btn-neutral link link-hover btn-soft">
            <e.Icon className="size-5" />
            {e.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ActionCard: FC<{ title: string; description: string; href: string; Icon: React.FC<{ className: string }> }> = ({
  description,
  href,
  Icon,
  title,
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-soft btn-neutral block h-full p-0 text-start"
  >
    <div className="card card-compact h-full flex-row items-center">
      <div className="card-body pr-0">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="ml-auto p-6 pl-0">
        <Icon className="size-8" />
      </div>
    </div>
  </Link>
);

const IconDiscordLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 256 199" preserveAspectRatio="xMidYMid" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"
    />
  </svg>
);

const Section: FC<PropsWithChildren<{ image: { src: string; alt: string; height: number }; reverse?: boolean }>> = ({
  children,
  image,
  reverse,
}) => (
  <section className="hero text-pretty text-start">
    <div
      className="hero-content flex-col px-0 lg:flex-row data-[reversed=true]:lg:flex-row-reverse"
      data-reversed={reverse}
    >
      <Image className="max-w-full shrink-0 rounded-box shadow-2xl" width={384} {...image} />
      <p className="max-w-4xl rounded-box bg-base-200/25 p-4">{children}</p>
    </div>
  </section>
);
