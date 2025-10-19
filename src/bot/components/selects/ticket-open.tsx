import type { APIUser } from "discord-api-types/v10";
import { addThreadMember, createThread } from "dressed";
import {
  ActionRow,
  Button,
  Container,
  createMessage,
  MessageComponentInteraction,
  SelectMenu,
  SelectMenuOption,
  TextDisplay,
} from "@dressed/react";
import { isMessageComponentSelectMenuInteraction } from "discord-api-types/utils/v10";

export async function openTicket(
  ticketName: string,
  message = "Our staff will be with you shortly, in the meantime please state your issue.",
  relevantStaff = ["&1225973068141297757"],
  user: APIUser,
) {
  const thread = await createThread("1225971091344982128", {
    name: `[${ticketName}] ${user.username}`,
    type: "Private",
  });
  addThreadMember(thread.id, user.id);
  createMessage(
    thread.id,
    <Container>
      ## Ticket opened
      <TextDisplay>{message}</TextDisplay>
      <ActionRow>
        <Button
          custom_id="ticket-close"
          label="Close"
          emoji={{ name: "🔒" }}
          style="Danger"
        />
      </ActionRow>
      -# {`<@${user.id}>`}{" "}
      {relevantStaff
        .filter(Boolean)
        .map((s) => `<@${s}>`)
        .join(" ")}
    </Container>,
  );
  return thread;
}

export default async function openTicketSelect(
  interaction: MessageComponentInteraction<"StringSelect">,
) {
  let ticketName;
  let relevantStaff = undefined;
  let message;
  switch (interaction.getValues()[0]) {
    case "Suggestion": {
      await interaction.reply(
        <ActionRow>
          <SelectMenu
            type="String"
            custom_id="suggest-type"
            placeholder="What are you suggesting?"
          >
            <SelectMenuOption
              label="Video idea"
              value="Video idea"
              description="If you have a video idea"
              emoji={{ name: "📺" }}
            />
            <SelectMenuOption
              label="Discord suggestion"
              value="Discord suggestion"
              description="If you have a suggestion for the Discord server"
              emoji={{ name: "💬" }}
            />
            <SelectMenuOption
              label="Other"
              value="Suggestion"
              description="For anything else"
              emoji={{ name: "❓" }}
            />
          </SelectMenu>
        </ActionRow>,
        { ephemeral: true },
      );
      return;
    }
    case "Mc server": {
      ticketName = "Mc server";
      relevantStaff = ["&1232903620421484575"];
      message =
        "If you're opening this ticket to try and get whitelisted, please close the ticket. We have a social credit system where you can gain credits by talking with the community and interacting in events like /trivia. Once you have 3000 credits you can do /shop to access the shop and purchase a whitelist.\n\nFor staff member issues, please dm a trusted staff member who can bring it up securely.\n\nOur staff will be with you shortly, in the meantime please state your issue.";
      break;
    }
    default: {
      ticketName = interaction.data.values[0];
      break;
    }
  }

  const thread = await openTicket(
    ticketName ?? "Unknown",
    message ?? undefined,
    relevantStaff,
    interaction.user,
  );
  await interaction.reply(`<#${thread.id}>`, { ephemeral: true });
}
