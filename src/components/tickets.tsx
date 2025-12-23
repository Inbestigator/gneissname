"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  name: string;
}

export default function Tickets({
  updateTicket,
  deleteTicket,
}: Readonly<{
  updateTicket: (data: FormData) => Promise<void>;
  deleteTicket: (data: FormData) => Promise<void>;
}>) {
  const [selectedTab, setSelectedTab] = useState("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });

  async function fetchTickets() {
    const data: Ticket[] = await (await fetch("/api/tickets")).json();
    data[0] && setSelectedTab(data[0].id);
    return data;
  }

  if (isPending) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Tickets</h2>
          <span>Loading tickets...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Tickets</h2>
          <span>Error: {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body overflow-x-scroll">
        <h2 className="card-title">Tickets</h2>
        <div role="tablist" className="tabs-boxed tabs flex flex-wrap">
          {data.map((ticket) => (
            <button
              type="button"
              key={ticket.id}
              onClick={() => setSelectedTab(ticket.id)}
              className={cn("tab", selectedTab === ticket.id && "tab-active")}
            >
              {ticket.name.replaceAll(/\[.*?\]/g, "")}
            </button>
          ))}
        </div>
        {selectedTab && (
          <EditTicket
            ticket={data.find((ticket) => ticket.id === selectedTab) as Ticket}
            updateTicket={updateTicket}
            deleteTicket={deleteTicket}
          />
        )}
      </div>
    </div>
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
    if (ticket) {
      setTags(extractBracketContents(ticket.name));
    }
  }, [ticket]);

  const queryClient = useQueryClient();

  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h3 className="text-lg">
          {tags.map((tag) => `[${tag}] `)}
          {ticket.name.replaceAll(/\[.*?\]/g, "")}
        </h3>
        <form
          className="space-x-2"
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
            className="input w-full max-w-xs"
          />
          <input type="hidden" name="tags" value={tags.map((tag) => `[${tag}] `).join("")} />
          <input type="hidden" name="ticketId" value={ticket.id} />
          <input type="hidden" name="user" value={ticket.name.replaceAll(/\[.*?\]\s*/g, "")} />
          <button className="btn btn-primary mt-2" type="submit">
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
          <button type="submit" className="btn btn-outline btn-error">
            Delete
          </button>
          <input type="hidden" name="ticketId" value={ticket.id} />
          <input type="hidden" name="name" value={ticket.name} />
        </form>
      </div>
    </div>
  );
}
