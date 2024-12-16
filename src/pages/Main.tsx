import React, { Suspense, memo, useState } from "react";

import Loading from "@/components/Loading";
import Index from "@/components/main/Index";

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
      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        {tabArrays.map((item) => (
          <React.Fragment key={item.id}>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab min-w-36"
              aria-label={item.name}
              onChange={() => setSlugId(item.slugId)}
              defaultChecked={item.id === 1}
            />

            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <Suspense fallback={<Loading />}>
                <Index slugId={slugId} />
              </Suspense>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default Main;
