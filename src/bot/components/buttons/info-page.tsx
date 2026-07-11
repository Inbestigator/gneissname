import type { Params } from "@dressed/matcher";
import { ActionRow, Button, type ComponentInteraction, Container, TextDisplay } from "@dressed/react";

const pages = {
  rules: (
    <Container>
      The following rules were created around [Discord's Terms of Service](https://discord.com/terms) and [Community
      Guidelines](https://discord.com/guidelines). Let's make this place the best it can be by abiding to them!
      <TextDisplay>
        **Please do:**{"\n"}
        1. Show respect to all members{"\n"}
        2. Be Gneiss to everyone{"\n"}
        3. Use the correct channels for their purposes{"\n"}
        4. Keep explicit language to a minimum{"\n"}
        5. Assist members to the best of your ability{"\n"}
        6. Make friends{"\n"}
        7. Enjoy yourself{"\n"}
      </TextDisplay>
      <TextDisplay>
        **Please do not:**{"\n"}
        1. Promote or participate in harassment{"\n"}
        2. Threaten to harm yourself or others{"\n"}
        3. Share sexually explicit content{"\n"}
        4. Share media depicting gore, excessive violence, or animal harm{"\n"}
        5. Share false or misleading information{"\n"}
        6. Spam, manipulate engagement or disrupt other members' experiences{"\n"}
        7. Use self-bots or user-bots
      </TextDisplay>
      **TL;DR:**{"\n"}
      *I treat everyone like an adult and respect them, please do the same.*
    </Container>
  ),
  socials: (
    <ActionRow>
      <Button url="https://www.youtube.com/@gneissname" label="YouTube" />
      <Button url="https://bsky.app/profile/gneiss.name" label="Bluesky" />
      <Button url="https://gneiss.name" label="Website" />
      <Button url="https://www.reddit.com/user/gneiss-name" label="Reddit" />
      <Button url="https://www.twitch.tv/gneiss_name" label="Twitch" />
    </ActionRow>
  ),
  smp: (
    <>
      <Container>
        ## Gneissmp info
        <TextDisplay>Please do not open an `Mc server` ticket to gain access to the Gneissmp.</TextDisplay>
        We have a social credit system, you can gain credits by talking with the community and interacting in events
        like `/trivia`. Once you have **2000** credits you can do `/shop` to access the shop and purchase a whitelist.
      </Container>
      <Container>
        ### Application form
        <TextDisplay>Please be ready to submit this questionnaire when applying:</TextDisplay>
        1. Minecraft username{"\n"}
        2. Age{"\n"}
        3. Time zone{"\n"}
        &lt; We don't really care about whether or not you use GMT or regional codes, this is just useful to get a sense
        of everyone's playing schedule!{"\n"}
        4. How long have you played Minecraft, and how often do you login?{"\n"}
        5. Would you like to receive Gneissmp community notifications?{"\n"}
        &lt; These will be used sparingly, for community projects and events! Only the Gneissmp staff can ping it!{"\n"}
        6. What are you looking for in a server?{"\n"}
        7. Do you have any Minecraft goals? Do you have any goals for the server?{"\n"}
        &lt; No need to have a full roadmap of what you want to accomplish before you join! This could be anything, from
        building a really cool base to helping out with community projects!{"\n"}
        8. What has been your favourite MC project so far? Feel free to attach an image!{"\n"}
        9. Tell us a funny story about yourself{"\n"}
        10. Any hobbies other than Minecraft?
      </Container>
    </>
  ),
};

export const pattern = `info-:page(${Object.keys(pages).join("|") as keyof typeof pages})` as const;

export default function infoPageButton(interaction: ComponentInteraction, args: Params<typeof pattern>) {
  return interaction.reply(pages[args.page], { ephemeral: true });
}
