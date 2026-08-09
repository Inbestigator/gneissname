"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  name: string;
}

export default function Tickets({
  updateTicket,
  deleteTicket,
}: Readonly<{ updateTicket: (data: FormData) => Promise<void>; deleteTicket: (data: FormData) => Promise<void> }>) {
  const [selectedTab, setSelectedTab] = useState<string>();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tickets"],
    async queryFn() {
      const data: Ticket[] = await (await fetch("/api/tickets")).json();
      setSelectedTab((p) => (p ? p : data[0].id));
      return data;
    },
  });

  return (
    <>
      <h2 className="font-medium text-xl">Tickets</h2>
      {isPending && "Loading tickets..."}
      {isError && `Error: ${error.message}`}
      <div className="tabs tabs-lift px-4">
        {data?.map((ticket) => (
          <input
            key={ticket.id}
            type="radio"
            name="ticket-tabs"
            value={ticket.id}
            className="tab"
            aria-label={ticket.name.replaceAll(/\[.*?\]/g, "")}
            checked={ticket.id === selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
          />
        ))}
      </div>
      {selectedTab && (
        <EditTicket
          ticket={data?.find((ticket) => ticket.id === selectedTab) as Ticket}
          updateTicket={updateTicket}
          deleteTicket={deleteTicket}
        />
      )}
    </>
  );
}

const extractBracketContents = (text: string) => {
  const matches = text.match(/\[(.*?)\]/g);

  return matches ? matches.map((match) => match.slice(1, -1)) : [];
};

function EditTicket({
  ticket,
  updateTicket,
  deleteTicket,
}: Readonly<{
  ticket: Ticket;
  updateTicket: (data: FormData) => Promise<void>;
  deleteTicket: (data: FormData) => Promise<void>;
}>) {
  const [tags, setTags] = useState(extractBracketContents(ticket.name));

  useEffect(() => {
    if (ticket) setTags(extractBracketContents(ticket.name));
  }, [ticket]);

  const queryClient = useQueryClient();

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h3 className="text-lg">
          {tags.map((tag) => `[${tag}] `)}
          {ticket.name.replaceAll(/\[.*?\]/g, "")}
        </h3>
        <form
          className="sm:join flex flex-wrap not-sm:gap-2"
          action={async (f) => {
            await updateTicket(f);
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
          }}
        >
          <input
            type="text"
            id="tags"
            placeholder="List tags here, separated by commas"
            value={tags.join(",")}
            onChange={(e) => setTags(e.target.value.split(/,\s*/))}
            className="input sm:join-item"
          />
          <input type="hidden" name="tags" value={tags.map((tag) => `[${tag}] `).join("")} />
          <input type="hidden" name="ticketId" value={ticket.id} />
          <input type="hidden" name="user" value={ticket.name.replaceAll(/\[.*?\]\s*/g, "")} />
          <button className="btn btn-soft btn-active sm:join-item" type="submit">
            Submit tags
          </button>
        </form>
        <form
          action={async (f) => {
            if (confirm("Are you sure you want to delete this ticket?")) {
              await deleteTicket(f);
              queryClient.invalidateQueries({ queryKey: ["tickets"] });
            }
          }}
        >
          <button type="submit" className="btn btn-dash btn-error">
            Delete
          </button>
          <input type="hidden" name="ticketId" value={ticket.id} />
          <input type="hidden" name="name" value={ticket.name} />
        </form>
      </div>
    </div>
  );
}
