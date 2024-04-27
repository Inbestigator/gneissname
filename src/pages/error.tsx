import Head from "next/head";
import type { NextApiResponse } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  return (
    <>
      <Head>
        <title>{statusCode.toString()}</title>
        <meta name="og:title" content={statusCode.toString()} />
        <meta name="theme-color" content="#ff0000" />
      </Head>
      <main className="flex flex-col items-center justify-between container mx-auto p-4 md:p-6 lg:p-8">
        <Card className="w-full m-4">
          <CardHeader>
            <CardTitle>
              {statusCode
                ? `An error ${statusCode} occurred on server`
                : "An error occurred on client"}
            </CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
        </Card>
      </main>
    </>
  );
}

Error.getInitialProps = ({ res, err }: { res: NextApiResponse; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err?.message ?? "";
  return { statusCode, message };
};
