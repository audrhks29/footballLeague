import Loading from "@/components/Loading";
import Index from "@/components/main/Index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Suspense, memo, useState } from "react";

const tabArrays = [
  {
    id: 1,
    slugId: "eng.1",
    name: "EPL",
  },
  {
    id: 2,
    slugId: "esp.1",
    name: "Laliga",
  },
  {
    id: 3,
    slugId: "ger.1",
    name: "Bundesliga",
  },
  {
    id: 4,
    slugId: "fra.1",
    name: "Ligue 1",
  },
  {
    id: 5,
    slugId: "ita.1",
    name: "Serie A",
  },
];

const Main = memo(() => {
  const [slugId, setSlugId] = useState("eng.1");

  return (
    <div className="inner">
      <Tabs defaultValue="eng.1" onValueChange={setSlugId}>
        <TabsList className="w-[600px] grid grid-cols-5">
          {tabArrays.map((item) => (
            <TabsTrigger value={item.slugId}>{item.name}</TabsTrigger>
          ))}
        </TabsList>

        <Suspense fallback={<Loading />}>
          <TabsContent value={slugId}>
            <Index slugId={slugId} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
});

export default Main;
