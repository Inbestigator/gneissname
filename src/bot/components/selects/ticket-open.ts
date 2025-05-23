import { APIUser, MessageFlags } from "discord-api-types/v10";
import {
  ActionRow,
  addThreadMember,
  Button,
  Container,
  createMessage,
  createThread,
  MessageComponentInteraction,
  SelectMenu,
  SelectMenuOption,
  TextDisplay,
} from "dressed";

export async function openTicket(
  ticketName: string,
  message = "Our staff will be with you shortly, in the meantime please state your issue.",
  relevantStaff = "<@&1225973068141297757>",
  user: APIUser,
) {
  const thread = await createThread("1225971091344982128", {
    name: `[${ticketName}] ${user.username}`,
    type: "Private",
  });
  addThreadMember(thread.id, user.id);
  createMessage(thread.id, {
    flags: MessageFlags.IsComponentsV2,
    components: [
      Container(
        TextDisplay("## Ticket opened"),
        TextDisplay(message),
        ActionRow(
          Button({
            custom_id: "ticket-close",
            label: "Close",
            emoji: {
              name: "🔒",
            },
            style: "Danger",
          }),
        ),
        TextDisplay(`-# <@${user.id}> ${relevantStaff}`),
      ),
    ],
  });
  return thread;
}

export default async function openTicketSelect(
  interaction: MessageComponentInteraction,
) {
  if (interaction.data.component_type !== 3) return;
  let ticketName;
  let relevantStaff;
  let message;
  switch (interaction.data.values[0]) {
    case "Suggestion": {
      await interaction.reply({
        ephemeral: true,
        components: [
          ActionRow(
            SelectMenu({
              type: "String",
              custom_id: "suggest-type",
              placeholder: "What are you suggesting?",
              options: [
                SelectMenuOption("Video idea", "Video idea", {
                  description: "If you have a video idea",
                  emoji: { name: "📺" },
                }),
                SelectMenuOption("Discord suggestion", "Discord suggestion", {
                  description:
                    "If you have a suggestion for the Discord server",
                  emoji: { name: "💬" },
                }),
                SelectMenuOption("Other", "Suggestion", {
                  description: "For anything else",
                  emoji: { name: "❓" },
                }),
              ],
            }),
          ),
        ],
      });
      return;
    }
    case "Mc server": {
      ticketName = "Mc server";
      relevantStaff = "<@&1232903620421484575>";
      message =
        "If you're opening this ticket to try and get whitelisted, please close the ticket. We have a social credit system where you can gain credits by talking with the community and interacting in events like /trivia. Once you have 3000 credits you can do /shop to access the shop and purchase a whitelist.\n\nFor staff member issues, please dm a trusted staff member who can bring it up securely.\n\nOur staff will be with you shortly, in the meantime please state your issue.";
      break;
    }
    default: {
      ticketName = interaction.data.values[0];
      relevantStaff = "<@&1225973068141297757>";
      break;
    }
  }

  const thread = await openTicket(
    ticketName ?? "Unknown",
    message ?? undefined,
    relevantStaff,
    interaction.user,
  );
  await interaction.reply({ content: `<#${thread.id}>`, ephemeral: true });
}
