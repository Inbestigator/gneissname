'use client';

import {useEffect} from "react";
import Link from "next/link";
import {IconBrandDiscord, IconArrowUpRight} from "@tabler/icons-react";

export default function TimelineInfoPage() {
    useEffect(() => {
        console.log("HELLO THERE FOOL")
        document.documentElement.style.overflowX = "hidden";
    }, []);

    return (
        <>
            <section className="mt-4 mb-8 flex flex-col gap-6" style={{margin: 'auto auto 20px auto'}}>
                <header className="flex w-full flex-col items-center gap-2 text-center">
                    <h1 className="font-extrabold text-4xl tracking-tighter sm:text-7xl">Geologic Timeline Project</h1>
                    {/*<p className="max-w-full text-lg text-muted-foreground md:max-w-200 md:text-xl">*/}
                    {/*    */}
                    {/*</p>*/}
                </header>
                {/*<Link href="https://shop.gneiss.name" className="btn btn-dash group relative mx-auto w-fit">*/}
                {/*    Check out the Gneiss shop! <IconArrowUpRight className="ml-2" />*/}
                {/*    <div className="absolute -top-4 -right-4 size-8 rounded-full bg-[radial-gradient(white_30%,transparent_100%)] group-hover:hidden" />*/}
                {/*    <div className="absolute -top-2 -right-2 size-4 animate-ping rounded-full bg-red-100 p-1 group-hover:hidden">*/}
                {/*        <div className="size-full rounded-full bg-red-600" />*/}
                {/*    </div>*/}
                {/*</Link>*/}
            </section>

            <div style={{textAlign: 'center', fontSize: '1.3rem', margin: 'auto auto 20px auto'}}>
                For the last few years I&apos;ve been working on the Geologic Timeline Project.
                Deep time is a concept that is hard to wrap your head around and it&apos;s often displayed in some
                condensed format.
                Including my own booth at Smithed Summit 2026.
            </div>

            <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3" style={{margin: "30px 0 30px 0"}}>
                {/*<div style={{ border: '2px solid black', height: '100vh'}}> </div>*/}
                <div className="relative h-full min-h-0 w-full">
                    <img
                        src={"timeline/2026-07-27_21.15.25.png"}
                        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                        className="absolute inset-0 h-full object-cover mx-auto"
                        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                </div>
                <div className="md:col-span-2"
                     style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "30px 20px"}}>
                    <p style={{justifyContent: 'center'}}>
                        I’m creating a geologic world for vanilla java Minecraft where traveling 1 block equals 1
                        million years. Seeing relationships at a 1 to 1 scale gives something more tangible to
                        conceive of the distance between events and help understand relationships. Alongside this
                        scaled geologic timeline is a diorama that represents earth at the same time. The timeline
                        includes major events in earth's history such as the creation of the Atlantic ocean, the
                        first land plants, etc. Some of these events are explained with animated displays like
                        I use in my videos. There are custom models and textures for plants, and animals, all
                        based on real paleontological information and scaled to the correct size where possible.
                        Players can walk amongst them in the diorama and learn more about what was going on at that
                        time.<br/>
                    </p>
                </div>
            </section>

            <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3" style={{margin: "30px 0 30px 0"}}>
                {/*<div style={{ border: '2px solid black', height: '100vh'}}> </div>*/}
                <div className="md:col-span-2"
                     style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "30px 20px"}}>
                    <p style={{textAlign: 'right'}}>
                        So why do this in vanilla, and not with mods or even in some other game engine?
                        Well, I like a challenge, but ultimately it's about accessibility.
                        I want anyone to be able to just own Minecraft, download the world, and it works.
                        My target audience is anyone that is interested in earth's history but my aim is to
                        have it accurate enough to be used by teachers and include references to more details.
                        Minecraft is very approachable and it's one of the reasons why it's a good platform for
                        education.
                    </p>
                </div>
                <div className="relative h-full min-h-0 w-full">
                    <img
                        src={"timeline/2026-07-27_21.12.32.png"}
                        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                        className="absolute inset-0 h-full object-cover mx-auto"
                        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                </div>
            </section>

            <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3" style={{margin: "30px 0 30px 0"}}>
                {/*<div style={{ border: '2px solid black', height: '100vh'}}> </div>*/}
                <div className="relative h-full min-h-0 w-full">
                    <img
                        src={"timeline/old-thumbnail.png"}
                        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                        className="absolute inset-0 h-full object-cover mx-auto"
                        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                </div>

                <div className="md:col-span-2"
                     style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "30px 20px"}}>
                    <p>
                        Creating a version of this was actually the original idea that got me thinking about
                        using Minecraft to talk about geology and starting my youtube channel.
                        Since then my skills have improved and I think that I can do a project like this justice.
                        I have been working on it for a few years in my spare time with a few contributors.
                        Now I’m ready to devote more time and energy to it and try to get it completed before the
                        next geologic eon is upon us in real life.
                    </p>
                </div>

            </section>

            {/*break out of container for this shadow*/}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] p-4 h-10 shadow-lg bg-transparent" style={{overflowX: 'clip'}}></div>

            <div style={{
                textAlign: 'center',
                fontSize: '1.3rem',
                margin: '30px auto 20px auto',
            }}>
                To make this a reality I am looking for people with skills in resource packs, datapacks, map making, and
                blockbench. There is also room for people to help with modeling, pixel art, graphic design and even just
                organizing resources. If you are interested in helping, the link below will take you to a discord
                channel with more details.
            </div>


            <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-1">
                <Link href="https://discord.gg/e4sCCCzpkB" className="btn group relative mx-auto w-1/5 bg-[#5865f2] hover:bg-[#384094] text-gray-200">
                    Join The Discord <IconBrandDiscord className="ml-2" />
                    <div className="absolute -top-4 -right-4 size-8 rounded-full group-hover:hidden" />
                    {/*<div className="absolute -top-2 -right-2 size-4 animate-ping rounded-full bg-red-100 p-1 group-hover:hidden">*/}
                    {/*    <div className="size-full rounded-full bg-red-600" />*/}
                    {/*</div>*/}
                </Link>

            </div>

            <div style={{textAlign: 'center', fontSize: '1.1rem', margin: '5px auto 5px auto'}}>
                <p>
                    Or, if you've already joined
                </p>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-1">
                <Link href="https://discord.com/channels/750062409364013159/1293942024323596423" className="btn group relative mx-auto w-1/5 bg-[#5865f2] hover:bg-[#384094] text-gray-200">
                    Jump To The Channel <IconArrowUpRight className="ml-2" />
                    <div className="absolute -top-4 -right-4 size-8 rounded-full group-hover:hidden" />
                    {/*<div className="absolute -top-2 -right-2 size-4 animate-ping rounded-full bg-red-100 p-1 group-hover:hidden">*/}
                    {/*    <div className="size-full rounded-full bg-red-600" />*/}
                    {/*</div>*/}
                </Link>

            </div>


            {/*Creating a version of this was actually the original idea that got me thinking about using Minecraft to talk about geology and starting my youtube channel. Since then my skills have improved and I think that I can do a project like this justice. I have been working on it for a few years in my spare time with a few contributors. Now I’m ready to devote more time and energy to it and try to get it completed before the next geologic eon is upon us in real life.<br/><br/>*/}

            {/*To make this a reality I am looking for people with skills in resource packs, datapacks, map making, and blockbench. There is also room for people to help with modeling, pixel art, graphic design and even just organizing resources. If you are interested in helping, the link below will take you to a discord channel with more details.<br/><br/>*/}
        </>
    )
}