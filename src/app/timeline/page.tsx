import { IconFileDescription, IconHash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { FC, PropsWithChildren, SVGProps } from "react";

export default function TimelineInfoPage() {
  return (
    <div className="mt-6 mb-8 flex flex-col items-center justify-center gap-4 md:my-10">
      <h1 className="text-balance text-center font-semibold text-4xl tracking-tight">Geologic Timeline Project</h1>
      <p className="max-w-7xl text-balance text-center">
        Deep time is a concept that is hard to wrap your head around, and when displayed it is often condensed like my
        own booth at{" "}
        <Link href="https://smithed.net/summit" target="_blank" className="link link-hover text-blue-600">
          Smithed Summit 2026
        </Link>
        .
      </p>
      <Section
        image={{
          src: "/timeline/2026-07-27_21.15.25-cropped.png",
          alt: "Gneiss Name standing in water next to a spider and crocodile",
        }}
      >
        To help really understand it, I&rsquo;m creating a vanilla Java Minecraft world where traveling 1 block equals 1
        million years. Seeing relationships at a 1 to 1 scale gives something more tangible to conceive of the distance
        between events.
        <br />
        <br />
        Alongside this scaled geologic timeline is a diorama that represents earth at that time. The timeline includes
        major events in earth's history, custom models and textures for plants and animals, and animated displays all
        based on real paleontological information.
      </Section>
      <Section
        image={{ src: "/timeline/2026-07-27_21.12.32.png", alt: "Wide shot of the Geologic Timeline Project" }}
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
        image={{ src: "/timeline/old-thumbnail.png", alt: "Thumbnail Image of the original geologic timeline video" }}
      >
        Creating a version of this was actually the original idea that got me thinking about using Minecraft to talk
        about geology and starting my youtube channel.
        <br />
        <br />
        After working on it for a few years with some contributors I&rsquo;m ready to devote more time and energy to
        complete it before the next real life geologic eon is upon us.
      </Section>
      <section className="hero mx-auto max-w-7xl text-balance px-4 py-12">
        <div className="hero-content w-full flex-col text-center">
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
      <h1 className="text-balance text-center font-semibold text-4xl tracking-tight">More details</h1>
      <h2 className="text-balance text-center font-medium text-2xl tracking-tight">World Building & Map Making</h2>
      <Section
        image={{
          src: "/timeline/2026-07-30_15.53.07.png",
          alt: "Wide shot of the middle ~600 million years of the Geologic Timeline, showing the simple terrain",
        }}
        reverse
      >
        The diorama is 4,567 blocks long, starting with the formation of earth and ending at present time. The goal is
        to only use materials that would be present in that time, no green wool as grass etc. When there is a need for
        something not in vanilla, we make it and add it to the resource pack.
        <br />
        <br />
        The initial layout was built using simple noise patterns and this needs to be refined for the middle 3 billion
        years by adding mountains, streams, sediment, etc.
      </Section>
      <Section
        image={{
          src: "/timeline/2026-07-30_15.53.48.png",
          alt: "Cretaceous dinosaurs in a small scene, showing the time period on the wall behind them",
        }}
      >
        The most recent ~600 million years has plants and animals of the time, constrained to their duration on earth.
        For example T-rex was around from 69-66 mya so it's only in 4 blocks of the diorama. These custom resources need
        to be added into the world to create little scenes and fit with the topography.
        <br />
        <br />
        To give you an idea of scale, we have over 300 animals and 100 plants already created and are looking to include
        more.
      </Section>
      <Section
        image={{
          src: "/timeline/2026-07-30_15.52.29.png",
          alt: "Inside the circular lobby of a museum, showing a model of the earth hung from the cieling and multiple levels of exhibit halls, with a GuideName NPC.",
        }}
        reverse
      >
        The spawn location and hub of the timeline is a museum which will contain an interactive map, orientation and
        explanation of how and why we are doing things the way we are. Things like, if a tree's canopy is 5 blocks wide,
        it doesn&rsquo;t mean the tree lived for 5 million years and other limitations that we have to concede to make
        the world work.
        <br />
        <br />
        In a future release the Museum will also have rooms for each time period. The final design for the interior and
        exterior of the museum needs to be decided on and built.
      </Section>
      <h2 className="text-balance text-center font-medium text-2xl tracking-tight">Resource Pack and Assets</h2>
      <Section
        image={{
          src: "/timeline/2026-07-30_15.55.10.png",
          alt: "Many dinosaurs lined up in a dev display of their stratigraphic range",
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
      <h2 className="text-balance text-center font-medium text-2xl tracking-tight">Datapack Work</h2>
      <Section
        image={{
          src: "/timeline/Timeline_Manual_Sample.png",
          alt: "Sample page from the Timeline Manual book showing species entries and information",
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
          src: "/timeline/2026-07-30_13.55.37.png",
          alt: "Map of the geologic timeline composed of a long export of the chunks making it up",
        }}
      >
        The timeline map will allow players to select what part of time you want to visit but it will also display
        information relative to geologic time. Events like rates of extinction, the average global temperature, or a
        simplified tree of life can be selected and displayed in relation to geologic time.
      </Section>
      <div className="divider" />
      <p className="max-w-7xl text-balance text-center">
        Beyond this, there is the need to keep everything behind the scenes organized. I would like to support this even
        after its release. There are a few future ideas that would be great to incorporate and I'm always willing to
        hear new ones too.
      </p>
      <div className="*:breadcrumbs flex flex-wrap justify-center gap-2 *:rounded-lg *:bg-base-200 *:p-4">
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
  <div>
    <ul>
      {entries.map((e) => (
        <li key={e.href}>
          <Link href={e.href} target="_blank">
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
  <Link href={href} target="_blank" rel="noopener noreferrer" className="btn h-full flex-col py-4">
    <b className="font-semibold">
      <Icon className="mr-2 inline size-5" />
      {title}
    </b>
    <p className="not-md:hidden text-base-content/60 text-sm">{description}</p>
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

const Section: FC<PropsWithChildren<{ image: { src: string; alt: string }; reverse?: boolean }>> = ({
  children,
  image,
  reverse,
}) => (
  <section className="hero">
    <div className="hero-content flex-col lg:flex-row data-[reversed=true]:lg:flex-row-reverse" data-reversed={reverse}>
      <Image
        src={image.src}
        alt={image.alt}
        className="max-w-sm not-sm:max-w-full rounded-lg shadow-2xl"
        width={384}
        height={384}
      />
      <p className="max-w-4xl rounded-lg bg-base-200 p-4">{children}</p>
    </div>
  </section>
);
