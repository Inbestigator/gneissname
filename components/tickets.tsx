"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"

export default function Tickets() {
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
        <div role="tablist" className="tabs tabs-boxed flex-wrap flex">
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
        <TicketData
          ticket={data?.find((ticket: any) => ticket.id == selectedTab)}
        />
      </div>
    </div>
  )
}

const extractBracketContents = (text: string) => {
  const matches = text.match(/\[(.*?)\]/g)

  return matches ? matches.map((match) => match.slice(1, -1)) : []
}

function TicketData({ ticket }: { ticket: any }) {
  const [tags, setTags] = useState(extractBracketContents(ticket.name))

  useEffect(() => {
    if (ticket) {
      setTags(extractBracketContents(ticket.name))
    }
  }, [ticket])

  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h3 className="text-lg">
          {tags.map((tag) => `[${tag}] `)}
          {ticket.name.replace(/\[.*?\]/g, "")}
        </h3>
        <input
          type="text"
          placeholder="List tags here, separated by commas"
          value={tags.join(",")}
          onChange={(e) => setTags(e.target.value.split(/,[ ]*/))}
          className="input w-full max-w-xs"
        />
      </div>
    </div>
  )
}
