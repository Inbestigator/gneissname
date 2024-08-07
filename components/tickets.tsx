"use client"

import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"

export default function Tickets({
  updateTicket,
  deleteTicket,
}: {
  updateTicket: (data: FormData) => Promise<void>
  deleteTicket: (data: FormData) => Promise<void>
}) {
  const [selectedTab, setSelectedTab] = useState("")

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  })

  async function fetchTickets() {
    const data: any[] = await (await fetch("/api/tickets")).json()
    setSelectedTab(data[0].id)
    return data
  }

  if (isPending) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Tickets</h2>
          <span>Loading tickets...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Tickets</h2>
          <span>Error: {error.message}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body overflow-x-scroll">
        <h2 className="card-title">Tickets</h2>
        <div role="tablist" className="tabs-boxed tabs flex flex-wrap">
          {data?.map((ticket: any) => (
            <a
              role="tab"
              key={ticket.id}
              onClick={() => setSelectedTab(ticket.id)}
              className={cn("tab", selectedTab == ticket.id && "tab-active")}
            >
              {ticket.name.replace(/\[.*?\]/g, "")}
            </a>
          ))}
        </div>
        <EditTicket
          ticket={data?.find((ticket: any) => ticket.id == selectedTab)}
          updateTicket={updateTicket}
          deleteTicket={deleteTicket}
        />
      </div>
    </div>
  )
}

const extractBracketContents = (text: string) => {
  const matches = text.match(/\[(.*?)\]/g)

  return matches ? matches.map((match) => match.slice(1, -1)) : []
}

function EditTicket({
  ticket,
  updateTicket,
  deleteTicket,
}: {
  ticket: any
  updateTicket: (data: FormData) => Promise<void>
  deleteTicket: (data: FormData) => Promise<void>
}) {
  const [tags, setTags] = useState(extractBracketContents(ticket.name))

  useEffect(() => {
    if (ticket) {
      setTags(extractBracketContents(ticket.name))
    }
  }, [ticket])

  const queryClient = useQueryClient()

  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h3 className="text-lg">
          {tags.map((tag) => `[${tag}] `)}
          {ticket.name.replace(/\[.*?\]/g, "")}
        </h3>
        <form
          className="space-x-2"
          action={async (f) => {
            await updateTicket(f)
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
          }}
        >
          <label className="label">Tags</label>
          <input
            type="text"
            id="tags"
            placeholder="List tags here, separated by commas"
            value={tags.join(",")}
            onChange={(e) => setTags(e.target.value.split(/,[ ]*/))}
            className="input w-full max-w-xs"
          />
          <input
            type="hidden"
            name="tags"
            value={tags.map((tag) => `[${tag}] `).join("")}
          />
          <input type="hidden" name="ticketId" value={ticket.id} />
          <input
            type="hidden"
            name="user"
            value={ticket.name.replace(/\[.*?\][ ]*/g, "")}
          />
          <button className="btn btn-primary mt-2" type="submit">
            Submit
          </button>
        </form>
        <form
          action={async (f) => {
            if (confirm("Are you sure you want to delete this ticket?")) {
              await deleteTicket(f)
              queryClient.invalidateQueries({ queryKey: ["tickets"] })
            }
          }}
        >
          <button type="submit" className="btn btn-outline btn-error">
            Delete
          </button>
          <input type="hidden" name="ticketId" value={ticket.id} />
          <input
            type="hidden"
            name="name"
            value={ticket.name}
          />
        </form>
      </div>
    </div>
  )
}
