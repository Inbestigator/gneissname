'use client';

import {useEffect} from "react";
import Link from "next/link";
import {IconHash, IconFileDescription} from "@tabler/icons-react";

export default function TimelineInfoPage() {
    // This allows the shadow line to not show a horizontal scroll bar
    useEffect(() => {
        document.documentElement.style.overflowX = "hidden";
    }, []);

    return (
        <>
            <section className="mt-4 mb-8 flex flex-col gap-6" style={{margin: 'auto auto 20px auto'}}>
                <header className="flex w-full flex-col items-center gap-2 text-center">
                    <h1 className="font-extrabold text-4xl tracking-tighter sm:text-6xl">Geologic Timeline Project</h1>
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

            <div className="max-w-4xl"
                 style={{textAlign: 'center', fontSize: '1.25rem', margin: 'auto auto 20px auto'}}>
                Deep time is a concept that is hard to wrap your head around, and when displayed it is often condensed
                like my own booth at Smithed Summit 2026.

            </div>

            <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3" style={{margin: "30px 0 30px 0"}}>
                {/*<div style={{ border: '2px solid black', height: '100vh'}}> </div>*/}{/*style={{maxHeight: "100%", maxWidth: "100%"}}*/}
                <div className="relative h-full min-h-0 w-full hidden sm:block">
                    <img
                        src={"timeline/2026-07-27_21.15.25-cropped.png"}
                        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                        className="absolute inset-0 h-full object-cover mx-auto"
                        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                </div>
                <div className="md:col-span-2 sm:col-span-1 rounded-lg bg-base-200 p-4"
                     style={{
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         margin: "10px 0px",
                         padding: "26px 26px"
                     }}>
                    <p style={{justifyContent: 'center'}}>
                        To help really understand it, I’m creating a vanilla Java Minecraft world where traveling 1
                        block equals 1 million years. Seeing relationships at a 1 to 1 scale gives something more
                        tangible to conceive of the distance between events.<br/><br/>

                        Alongside this scaled geologic timeline is a diorama that represents earth at that time. The
                        timeline includes major events in earth's history, custom models and textures for plants and
                        animals, and animated displays all based on real paleontological information.

                        {/*To help really understand it, I’m creating a vanilla Java Minecraft world where traveling 1*/}
                        {/*block equals 1 million years. Seeing relationships at a 1 to 1 scale gives something more*/}
                        {/*tangible to conceive of the distance between events. <br/><br/>*/}

                        {/*Alongside this scaled geologic timeline is a diorama that represents earth at that time. The*/}
                        {/*timeline includes major events in earth's history, custom models and textures for plants and*/}
                        {/*animals, and animated displays all based on real paleontological information.*/}

                        {/*I’m creating a geologic world for vanilla java Minecraft where traveling 1 block equals 1*/}
                        {/*million years. Seeing relationships at a 1 to 1 scale gives something more tangible to*/}
                        {/*conceive of the distance between events and help understand relationships. Alongside this*/}
                        {/*scaled geologic timeline is a diorama that represents earth at the same time. The timeline*/}
                        {/*includes major events in earth's history such as the creation of the Atlantic ocean, the*/}
                        {/*first land plants, etc. Some of these events are explained with animated displays like*/}
                        {/*I use in my videos. There are custom models and textures for plants, and animals, all*/}
                        {/*based on real paleontological information and scaled to the correct size where possible.*/}
                        {/*Players can walk amongst them in the diorama and learn more about what was going on at that*/}
                        {/*time.<br/>*/}
                    </p>
                </div>

                <div className="relative h-full min-h-0 w-full block sm:hidden">
                    <img
                        src={"timeline/2026-07-27_21.15.25-cropped.png"}
                        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                        className="absolute inset-0 h-full object-cover mx-auto"
                        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                </div>
                {/*<div className="block md:hidden" style={{maxHeight: "10px", maxWidth:"10px"}}>*/}
                {/*    <img*/}
                {/*        src={"timeline/2026-07-27_21.15.25-cropped.png"}*/}
                {/*        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}*/}
                {/*        className="absolute inset-0 h-full object-cover mx-auto"*/}
                {/*        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>*/}
                {/*</div>*/}
            </section>

            <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3" style={{margin: "30px 0 30px 0"}}>
                {/*<div style={{ border: '2px solid black', height: '100vh'}}> </div>*/}
                <div className="md:col-span-2 sm:rounded-lg bg-base-200 p-4"
                     style={{
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         margin: "10px 0px",
                         padding: "26px 26px"
                     }}>
                    <p style={{}}>

                        So why do this in vanilla, and not with mods? Because I want anyone to be able to just own
                        Minecraft, download the world, and use it without knowledge of mods. <br/><br/>

                        Minecraft is very approachable and it's one of the reasons why it's a good platform for
                        education. My target audience is anyone that is interested in earth's history but my aim is to
                        have it accurate enough to be used by educators.

                        {/*So why do this in vanilla, and not with mods? Because I want anyone to be able to just own*/}
                        {/*Minecraft, download the world, and use it without knowledge of mods.<br/><br/>*/}

                        {/*Minecraft is very approachable and it's one of the reasons why it's a good platform for*/}
                        {/*education. My target audience is anyone that is interested in earth's history but my aim is to*/}
                        {/*have it accurate enough to be used by educators.*/}

                        {/*So why do this in vanilla, and not with mods or even in some other game engine?*/}
                        {/*Well, I like a challenge, but ultimately it's about accessibility.*/}
                        {/*I want anyone to be able to just own Minecraft, download the world, and it works.*/}
                        {/*My target audience is anyone that is interested in earth's history but my aim is to*/}
                        {/*have it accurate enough to be used by teachers and include references to more details.*/}
                        {/*Minecraft is very approachable and it's one of the reasons why it's a good platform for*/}
                        {/*education.*/}
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

            <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-1 sm:grid-rows-2"
                     style={{margin: "30px 0 30px 0"}}>
                {/*<div style={{ border: '2px solid black', height: '100vh'}}> </div>*/}
                <div className="relative h-full min-h-0 w-full">
                    <img
                        src={"timeline/old-thumbnail.png"}
                        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                        className="absolute inset-0 h-full object-cover mx-auto"
                        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                </div>

                <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                     style={{
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         margin: "10px 0px",
                         padding: "26px 26px"
                     }}>
                    <p>
                        Creating a version of this was actually the original idea that got me thinking about using
                        Minecraft to talk about geology and starting my youtube channel. <br/><br/>

                        After working on it for a few years with some contributors I’m ready to devote more time and
                        energy to complete it before the next real life geologic eon is upon us.

                        {/*Creating a version of this was actually the original idea that got me thinking about*/}
                        {/*using Minecraft to talk about geology and starting my youtube channel.*/}
                        {/*Since then my skills have improved and I think that I can do a project like this justice.*/}
                        {/*I have been working on it for a few years in my spare time with a few contributors.*/}
                        {/*Now I’m ready to devote more time and energy to it and try to get it completed before the*/}
                        {/*next geologic eon is upon us in real life.*/}
                    </p>
                </div>

            </section>


            <section className="hero max-w-4xl text-balance text-center" style={{margin: "auto"}}>
                <div className="hero-content flex-col">
                    <p style={{fontSize: '1.15rem',}}>
                        {/*To make this a reality I am looking for people with skills in resource packs, datapacks, map making, and*/}
                        {/*blockbench. There is also room for people to help with modeling, pixel art, graphic design and even just*/}
                        {/*organizing resources. If you are interested in helping, the link below will take you to a discord*/}
                        {/*channel with more details.*/}
                        {/*To make this a reality we are looking for people to join us with skills in resource packs, datapacks,*/}
                        {/*map making, and blockbench. There is also room for people to help with modeling, pixel art, graphic*/}
                        {/*design and even just organizing resources. So even if you don’t know anything about Minecraft but know*/}
                        {/*earth history, there might be something you can contribute.*/}
                        To make this a reality I am actively looking for contributors skilled in<br/>
                        resource packs, datapacks, map making, Blockbench, modeling and pixel art.<br/>
                        A fondness for geology is a plus.<br/><br/>


                    </p>

                    <p style={{margin: "-2% 0px -1% 0px"}}>
                        If you are interested in becoming a collaborator, please complete this form and we will get back
                        to you.
                    </p>
                    <div className="breadcrumbs rounded-lg bg-base-200 p-4">
                        <ul>
                            <li>
                                <Link href="https://forms.gle/62mHkKNtHoZ3kqoS6"
                                      target="_blank" style={{textAlign: "center"}}>
                                    <IconFileDescription stroke={2}/>
                                    {/*<img style={{maxHeight: "2.5%", maxWidth: "2.5%"}} alt="Google Forms Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_Forms_icon_%282026%29.svg/960px-Google_Forms_icon_%282026%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260523123713"/>*/}
                                    Collaborator Application
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <p style={{margin: "0px 0px -1% 0px"}}>
                        Keep scrolling for more information, and there is also a public channel about the project on my
                        discord if you have questions or want to talk about anything.
                    </p>
                    <div className="breadcrumbs rounded-lg bg-base-200 p-4">
                        <ul>
                            <li>
                                <Link href="https://discord.com/servers/gneiss-server-750062409364013159"
                                      target="_blank">
                                    <svg viewBox="0 0 256 199" preserveAspectRatio="xMidYMid"
                                         className="size-5 fill-current">
                                        <title>Discord Logo</title>
                                        <path
                                            d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"/>
                                    </svg>
                                    Discord server
                                </Link>
                            </li>
                            <li>
                                <Link href="https://discord.com/channels/750062409364013159/1293942024323596423"
                                      target="_blank">
                                    <IconHash className="size-5"/>
                                    Timeline channel
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            {/*break out of container for this shadow*/}
            <div
                className="w-screen relative left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] p-4 h-10 shadow-lg bg-transparent"
                style={{overflowX: 'clip'}}
            />


            <div className="font-extrabold text-4xl tracking-tighter sm:text-5xl"
                 style={{textAlign: 'center', margin: '40px 0 30px 0'}}>
                More details for those that want them
            </div>

            <div style={{margin: "0px 0px 5% 0px"}}>

                <div className="text-3xl font-bold" style={{margin: "5px 0px 5px 3%"}}>
                    World Building & Map Making
                </div>
                <hr className="border-gray-300" style={{margin: "5px 1% 5px 1%"}}/>

                <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3">

                    <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: "10px 0px",
                             padding: "26px 26px"
                         }}>
                        The diorama is 4,567 blocks long, starting with the formation of earth and ending at present
                        time. The goal is to only use materials that would be present in that time, no green wool as
                        grass etc. When there is a need for something not in vanilla, we make it and add it to the
                        resource pack. <br/> <br/>

                        The initial layout was built using simple noise patterns and this needs to be refined for the
                        middle 3 billion years by adding mountains, streams, sediment, etc.

                        {/*The diorama is 4,567 blocks long, starting with the formation of earth and ending at the present*/}
                        {/*time. The goal is to only use materials that would be present in that time, so no green wool as*/}
                        {/*grass, or cyan terracotta as land. When there is a need for something not in vanilla Minecraft*/}
                        {/*we make it and add it to the resource pack. <br/><br/>*/}

                        {/*The initial layout was built using simple noise patterns and this needs to be refined for the*/}
                        {/*middle 3 billion years by adding mountains, rivers, sediment, etc.*/}
                    </div>

                    <div className="relative h-full min-h-0 w-full">
                        <img
                            src={"timeline/2026-07-30_15.53.07.png"}
                            alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                            className="absolute inset-0 h-full object-cover mx-auto"
                            style={{borderRadius: '5px', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.5))'}}/>
                    </div>

                    <div className="relative h-full min-h-0 w-full">
                        <img
                            src={"timeline/2026-07-30_15.53.48.png"}
                            alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                            className="absolute inset-0 h-full object-cover mx-auto"
                            style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                    </div>

                    <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: "10px 0px",
                             padding: "26px 26px"
                         }}>

                        The most recent ~600 million years has plants and animals of the time, constrained to their
                        duration on earth. For example T-rex was around from 69-66 mya so it's only in 4 blocks of the
                        diorama. These custom resources need to be added into the world to create little scenes and fit
                        with the topography.<br/><br/>

                        To give you an idea of scale, we have over 300 animals and 100 plants already created and are
                        looking to include more.

                        {/*The most recent ~600 million years has plants and animals of the time, constrained to their*/}
                        {/*duration on earth. For example T-rex was around from 69-66 mya so it's only in 4 blocks of the*/}
                        {/*diorama.<br/>*/}
                        {/*Horseshoe crabs have been around for about 250 mya so they can be anywhere from*/}
                        {/*modern to 250 blocks from modern, grasses only the last ~100 million years.*/}
                    </div>

                    {/*<div className="md:col-span-2 rounded-lg bg-base-200 p-4"*/}
                    {/*     style={{*/}
                    {/*         display: 'flex',*/}
                    {/*         alignItems: 'center',*/}
                    {/*         justifyContent: 'center',*/}
                    {/*         margin: "10px 0px",*/}
                    {/*         padding: "26px 26px"*/}
                    {/*     }}>*/}
                    {/*    The spawn location and hub of the timeline is a museum which will contain an interactive map,*/}
                    {/*    orientation and explanation of how and why we are doing things the way we are. Things like, if a*/}
                    {/*    tree's canopy is 5 blocks wide, it doesn’t mean the tree lived for 5 million years and other*/}
                    {/*    limitations that we have to concede to make the world work. In a future release the Museum will*/}
                    {/*    also have rooms for each time period. The final design for the interior and exterior of the*/}
                    {/*    museum needs to be decided on and built.*/}


                    {/*    /!*These custom resources need to be added into the world to create little scenes and fit with the*!/*/}
                    {/*    /!*topography. We would love to use animated java to bring some life to the animals but we need*!/*/}
                    {/*    /!*people that are experienced in blockbench with animated java to do that. <br/> <br/> To give you*!/*/}
                    {/*    /!*an idea of scale, we have over 300 animals and 100 plants already created and are looking to*!/*/}
                    {/*    /!*include more.<br/>*!/*/}
                    {/*</div>*/}

                    {/*<div className="relative h-full min-h-0 w-full">*/}
                    {/*    <img*/}
                    {/*        src={"timeline/2026-07-27T21_28_18.png"}*/}
                    {/*        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}*/}
                    {/*        className="absolute inset-0 h-full object-cover mx-auto"*/}
                    {/*        style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>*/}
                    {/*</div>*/}


                    <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: "10px 0px",
                             padding: "26px 26px"
                         }}>
                        The spawn location and hub of the timeline is a museum which will contain an interactive map,
                        orientation and explanation of how and why we are doing things the way we are. Things like, if a
                        tree's canopy is 5 blocks wide, it doesn’t mean the tree lived for 5 million years and other
                        limitations that we have to concede to make the world work.<br/><br/>

                        In a future release the Museum will also have rooms for each time period. The final design for
                        the interior and exterior of the museum needs to be decided on and built.

                        {/*The spawn location and hub of the timeline is a museum which will contain an interactive map,*/}
                        {/*orientation and explanation of how and why we are doing things the way we are. <br/>*/}
                        {/*<br/> Things like, if a*/}
                        {/*tree's canopy is 5 blocks wide, it doesn’t mean the tree lived for 5 million years and other*/}
                        {/*limitations that we have to concede to make the world work.*/}
                        {/*In a future release the Museum will also have rooms foreach time period.*/}
                    </div>

                    <div className="relative h-full min-h-0 w-full">
                        <img
                            src={"timeline/2026-07-30_15.52.29.png"}
                            alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                            className="absolute inset-0 h-full object-cover mx-auto"
                            style={{borderRadius: '5px', filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))'}}/>
                    </div>
                </section>
            </div>

            <div style={{margin: "0px 0px 5% 0px"}}>

                <div className="text-3xl font-bold" style={{margin: "5px 0px 5px 3%"}}>
                    Resource Pack and Assets
                </div>
                <hr className="border-gray-300" style={{margin: "5px 1% 5px 1%"}}/>


                <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3">

                    <div className="relative h-full min-h-0 w-full">
                        <img
                            src={"timeline/2026-07-30_15.55.10.png"}
                            alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                            className="absolute inset-0 h-full object-cover mx-auto"
                            style={{borderRadius: '5px', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.5))'}}/>
                    </div>


                    <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: "10px 0px",
                             padding: "26px 26px"
                         }}>
                        Most of the custom models we are using are from the Prehistoric Fauna Mod. We have partnered
                        with them and besides using resources they have created for the mod, they have also created
                        assets from other times for us to use.<br/><br/>

                        The art direction goal is to keep things looking like it would fit in Minecraft. There are
                        additional models needed and we are really lacking animals specifically in the permian and
                        cenozoic. A platypus is required.

                    </div>

                    {/*<div className="md:col-span-2 rounded-lg bg-base-200 p-4"*/}
                    {/*     style={{*/}
                    {/*         display: 'flex',*/}
                    {/*         alignItems: 'center',*/}
                    {/*         justifyContent: 'center',*/}
                    {/*         margin: "10px 0px",*/}
                    {/*         padding: "26px 26px"*/}
                    {/*     }}>*/}
                    {/*    Doing this all within vanilla means we need to be creative with how we do many things.<br/>*/}
                    {/*    <br/> Plants and*/}
                    {/*    topography are all being done though block state substitutions and the animals are all item*/}
                    {/*    displays of*/}
                    {/*    custom models. <br/>*/}
                    {/*</div>*/}

                    {/*<div className="relative h-full min-h-0 w-full">*/}
                    {/*    <img*/}
                    {/*        src={"timeline/2026-07-30_22.14.49.png"}*/}
                    {/*        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}*/}
                    {/*        className="absolute inset-0 h-full object-cover mx-auto"*/}
                    {/*        style={{borderRadius: '5px', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.5))'}}/>*/}
                    {/*</div>*/}

                    {/*<div className="md:col-span-2 rounded-lg bg-base-200 p-4"*/}
                    {/*     style={{*/}
                    {/*         display: 'flex',*/}
                    {/*         alignItems: 'center',*/}
                    {/*         justifyContent: 'center',*/}
                    {/*         margin: "40px 0px",*/}
                    {/*         padding: "36px 26px"*/}
                    {/*     }}>*/}

                    {/*    Each time period has its own custom biome and I would like to explore shaders as well to*/}
                    {/*    accomplish some*/}
                    {/*    things like custom sun and moon sizes depending on your place in history.<br/>*/}
                    {/*</div>*/}
                    {/*<div className="relative h-full min-h-0 w-full">*/}
                    {/*    <img*/}
                    {/*        src={"timeline/2026-07-28_21.50.11.png"}*/}
                    {/*        alt={"Wide shot of the Geologic Timeline Project (todo alts)"}*/}
                    {/*        className="absolute inset-0 h-full object-cover mx-auto"*/}
                    {/*        style={{borderRadius: '5px', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.5))'}}/>*/}
                    {/*</div>*/}
                </section>
            </div>

            <div>
                <div className="text-3xl font-bold" style={{margin: "5px 0px 5px 3%"}}>
                    Datapack Work
                </div>
                <hr className="border-gray-300" style={{margin: "5px 1% 5px 1%"}}/>

                <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3">


                    <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: "10px 0px",
                             padding: "26px 26px"
                         }}>
                        Each player will be given a book which will use the dialog system (which I don’t know anything
                        about). While on the timeline or in the diorama the player can open the book and it will display
                        information for the time period. This book will also basically act as a Pokedex. Plants and
                        animals of each period will have grey silhouettes in the book and once they are found in the
                        world, an entry unlocks and gives more information. An advancement is made once you find
                        everything in a time period and I would like to add some more gameplay elements to help
                        facilitate exploration.
                    </div>

                    <div className="relative h-full min-h-0 w-full">
                        <img
                            src={"timeline/2026-07-30_13.55.37.png"}
                            alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                            className="absolute inset-0 h-full object-cover mx-auto"
                            style={{borderRadius: '5px', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.5))'}}/>
                    </div>

                    <div className="relative h-full min-h-0 w-full">
                        <img
                            src={"timeline/Timeline_Manual_Sample.png"}
                            alt={"Wide shot of the Geologic Timeline Project (todo alts)"}
                            className="absolute inset-0 h-full object-cover mx-auto"
                            style={{borderRadius: '5px', filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.5))'}}/>
                    </div>

                    <div className="md:col-span-2 rounded-lg bg-base-200 p-4"
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             margin: "30px 0px",
                             padding: "36px 26px"
                         }}>
                        The timeline map will allow players to select what part of time you want to visit but it will
                        also display information relative to geologic time. Events like rates of extinction, the average
                        global temperature, or a simplified tree of life can be selected and displayed in relation to
                        geologic time.

                    </div>


                </section>
            </div>

            <hr className="border-gray-300" style={{margin: "2.5% 1% 1% 1%"}}/>

            <section className="hero max-w-4xl text-balance text-center" style={{margin: "auto"}}>
                <div className="hero-content flex-col">
                    <p style={{fontSize: '1.15rem',}}>

                        Beyond this, there is the need to keep everything behind the scenes organized. I would like to
                        support this even after its release. There are a few future ideas that would be great to
                        incorporate and I'm always willing to hear new ones too.

                        {/*If you are interested in helping please*/}
                        {/*fill out the google form at this link and we will get back to you. There is also a public*/}
                        {/*channel about the project on my discord if you have questions or want to talk about anything.*/}

                        {/*<br/><br/>*/}
                    </p>

                    {/*<p style={{margin: "-2% 0px -1% 0px"}}>*/}
                    {/*    If you are interested in helping, again please fill out the google form at this link and we will*/}
                    {/*    get*/}
                    {/*    back to you.*/}
                    {/*</p>*/}

                    <div className="breadcrumbs rounded-lg bg-base-200 p-4">
                        <ul>
                            <li>
                                <Link href="https://forms.gle/62mHkKNtHoZ3kqoS6"
                                      target="_blank" style={{textAlign: "center"}}>
                                    <IconFileDescription stroke={2}/>
                                    {/*<img style={{maxHeight: "2.5%", maxWidth: "2.5%"}} alt="Google Forms Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_Forms_icon_%282026%29.svg/960px-Google_Forms_icon_%282026%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260523123713"/>*/}
                                    Collaborator Application
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/*<p style={{margin: "0px 0px -1% 0px"}}>*/}
                    {/*    There is also a public channel about the project on my discord if you have*/}
                    {/*    questions or want to talk about anything.*/}
                    {/*</p>*/}

                    <div className="breadcrumbs rounded-lg bg-base-200 p-4">
                        <ul>
                            <li>
                                <Link href="https://discord.com/servers/gneiss-server-750062409364013159"
                                      target="_blank">
                                    <svg viewBox="0 0 256 199" preserveAspectRatio="xMidYMid"
                                         className="size-5 fill-current">
                                        <title>Discord Logo</title>
                                        <path
                                            d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"/>
                                    </svg>
                                    Discord server
                                </Link>
                            </li>
                            <li>
                                <Link href="https://discord.com/channels/750062409364013159/1293942024323596423"
                                      target="_blank">
                                    <IconHash className="size-5"/>
                                    Timeline channel
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            {/*<div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-1">*/}
            {/*    <Link href="https://discord.gg/e4sCCCzpkB" className="btn group relative mx-auto w-1/5 bg-[#5865f2] hover:bg-[#384094] text-gray-200">*/}
            {/*        Join The Discord <IconBrandDiscord className="ml-2" />*/}
            {/*        <div className="absolute -top-4 -right-4 size-8 rounded-full group-hover:hidden" />*/}
            {/*        /!*<div className="absolute -top-2 -right-2 size-4 animate-ping rounded-full bg-red-100 p-1 group-hover:hidden">*!/*/}
            {/*        /!*    <div className="size-full rounded-full bg-red-600" />*!/*/}
            {/*        /!*</div>*!/*/}
            {/*    </Link>*/}

            {/*</div>*/}

            {/*<div style={{textAlign: 'center', fontSize: '1.1rem', margin: '5px auto 5px auto'}}>*/}
            {/*    <p>*/}
            {/*        Or, if you've already joined*/}
            {/*    </p>*/}
            {/*</div>*/}

            {/*<div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-1">*/}
            {/*    <Link href="https://discord.com/channels/750062409364013159/1293942024323596423" className="btn group relative mx-auto w-1/5 bg-[#5865f2] hover:bg-[#384094] text-gray-200">*/}
            {/*        Jump To The Channel <IconArrowUpRight className="ml-2" />*/}
            {/*        <div className="absolute -top-4 -right-4 size-8 rounded-full group-hover:hidden" />*/}
            {/*        /!*<div className="absolute -top-2 -right-2 size-4 animate-ping rounded-full bg-red-100 p-1 group-hover:hidden">*!/*/}
            {/*        /!*    <div className="size-full rounded-full bg-red-600" />*!/*/}
            {/*        /!*</div>*!/*/}
            {/*    </Link>*/}

            {/*</div>*/}


            {/*Creating a version of this was actually the original idea that got me thinking about using Minecraft to talk about geology and starting my youtube channel. Since then my skills have improved and I think that I can do a project like this justice. I have been working on it for a few years in my spare time with a few contributors. Now I’m ready to devote more time and energy to it and try to get it completed before the next geologic eon is upon us in real life.<br/><br/>*/}

            {/*To make this a reality I am looking for people with skills in resource packs, datapacks, map making, and blockbench. There is also room for people to help with modeling, pixel art, graphic design and even just organizing resources. If you are interested in helping, the link below will take you to a discord channel with more details.<br/><br/>*/}
        </>
    )
}