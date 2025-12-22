import type { Params } from "@dressed/matcher";
import { ActionRow, Button, Container, type MessageComponentInteraction, TextDisplay } from "@dressed/react";

export const pattern = "info-:page(rules|socials|smp)";

export default function infoPageButton(interaction: MessageComponentInteraction, args: Params<typeof pattern>) {
  switch (args.page) {
    case "rules":
      return interaction.reply(
        <Container>
          The following rules were created around [Discord's Terms of Service](https://discord.com/terms) and [Community
          Guidelines](https://discord.com/guidelines). Let's make this place the best it can be by abiding to them!
          <TextDisplay>
            **Please do:**
            {[
              "Show respect to all members",
              "Be Gneiss to everyone",
              "Use the correct channels for their purposes",
              "Keep explicit language to the minimum",
              "Assist members to the best of your ability",
              "Ask questions",
              "Make friends",
              "Enjoy yourself",
            ].map((r, i) => `\n${i + 1}. ${r}`)}
          </TextDisplay>
          <TextDisplay>
            **Please do not:**
            {[
              "Promote or participate in harassment",
              "Threaten to harm yourself or others",
              "Share sexually explicit content",
              "Share media depicting gore, excessive violence, or animal harm",
              "Share false or misleading information",
              "Spam, manipulate engagement or disrupt other members' experiences",
              "Use self-bots or user-bots",
            ].map((r, i) => `\n${i + 1}. ${r}`)}
          </TextDisplay>
          **TL;DR:**{"\n"}
          *I treat everyone like an adult and respect them, please do the same.*
        </Container>,
        { ephemeral: true },
      );
    case "socials":
      return interaction.reply(
        <ActionRow>
          <Button url="https://www.youtube.com/@gneissname" label="YouTube" />
          <Button url="https://bsky.app/profile/gneiss.name" label="Bluesky" />
          <Button url="https://gneiss.name" label="Website" />
          <Button url="https://www.reddit.com/user/gneiss-name" label="Reddit" />
          <Button url="https://www.twitch.tv/gneiss_name" label="Twitch" />
        </ActionRow>,
        { ephemeral: true },
      );
    case "smp":
      return interaction.reply(
        <>
          <Container>
            ## Gneissmp info
            <TextDisplay>Please do not open an `Mc server` ticket to gain access to the Gneissmp.</TextDisplay>
            We have a social credit system, you can gain credits by talking with the community and interacting in events
            like `/trivia`. Once you have **2000** credits you can do `/shop` to access the shop and purchase a
            whitelist.
          </Container>
          <Container>
            ### Application form
            <TextDisplay>Please be ready to submit this questionnaire when applying:</TextDisplay>
            {`
1. Minecraft username
2. Age
3. Time zone
> We don't really care about whether or not you use GMT or regional codes, this is just useful to get a sense of everyone's playing schedule!
4. How long have you played Minecraft, and how often do you login?
5. Would you like to receive Gneissmp community notifications?
> These will be used sparingly, for community projects and events! Only the Gneissmp staff can ping it!
6. What are you looking for in a server?
7. Do you have any Minecraft goals? Do you have any goals for the server?
> No need to have a full roadmap of what you want to accomplish before you join! This could be anything, from building a really cool base to helping out with community projects!
8. What has been your favourite MC project so far? Feel free to attach an image!
9. Tell us a funny story about yourself
10. Any hobbies other than Minecraft?
`}
          </Container>
        </>,
        { ephemeral: true },
      );
  }
}
