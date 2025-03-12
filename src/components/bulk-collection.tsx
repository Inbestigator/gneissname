"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function BulkCollection({
  opt,
}: {
  opt: (data: FormData) => Promise<void>;
}) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["opted"],
    queryFn: fetchOpted,
  });

  const queryClient = useQueryClient();

  async function fetchOpted() {
    const data: boolean = await (await fetch("/api/bulkcollect/opted")).json();
    return data;
  }

  if (isError || isPending) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Bulk collection</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body overflow-x-scroll">
        <h2 className="card-title">Bulk collection</h2>
        {data && (
          <form
            action={async (f) => {
              await opt(f);
              queryClient.invalidateQueries({ queryKey: ["opted"] });
            }}
          >
            <input type="submit" value="Opt in" className="btn btn-success" />
          </form>
        )}
        {!data && (
          <form
            action={async (f) => {
              if (confirm("Are you sure you want to opt out?")) {
                await opt(f);
                queryClient.invalidateQueries({ queryKey: ["opted"] });
              }
            }}
          >
            <input
              type="submit"
              value="Opt out"
              className="btn btn-outline btn-error"
            />
          </form>
        )}
      </div>
    </div>
  );
}
