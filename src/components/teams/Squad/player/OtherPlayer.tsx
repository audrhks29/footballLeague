import { memo } from "react";

import { Link, useParams } from "react-router-dom";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchSquadData } from "@/services/fetchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OtherPlayer = memo(() => {
  const { slugId, teamId, playerId } = useParams();

  const { data: otherPlayerData } = useSuspenseQuery({
    queryKey: ["otherPlayerData", playerId],
    queryFn: () => fetchSquadData(slugId, teamId),
    select: (data: AthletesDataTypes[]) =>
      data.filter((item) => item.id !== playerId),
  });

  return (
    <Card className="w-[300px] row-span-4">
      <CardHeader>
        <CardTitle className="text-center">Same Position Player</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-2">
        {otherPlayerData.map((item) => (
          <div key={item.id}>
            <Link
              to={`/teams/${slugId}/${teamId}/player/${item.id}`}
              className="flex justify-between items-center h-8 hover:bg-hoverColor"
            >
              <span>{item.displayName}</span>
              <span>#{item.jersey}</span>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
});

export default OtherPlayer;
