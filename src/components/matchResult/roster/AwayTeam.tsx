import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { memo } from "react";

interface Props {
  data: Rosters;
}

const AwayTeam = memo(({ data }: Props) => {
  const hideGKTh = ["FC", "FA", "OG", "G", "SH", "A", "ST", "SUB"];
  const hideFieldTh = ["FC", "FA", "OG", "SHF", "SUB", "GA", "OF", "SV"];

  return (
    <div className="">
      <Table className="text-center">
        <colgroup>
          <col width={45} />
          <col width={32} />
          <col width={140} />
          {data.roster[1].stats && (
            <>
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
            </>
          )}
        </colgroup>

        <TableHeader>
          <TableRow>
            <TableHead title="position">POS</TableHead>
            <TableHead title="jersey">NO</TableHead>
            <TableHead className="text-center">Name</TableHead>
            {data.roster[0].stats &&
              data.roster[0].stats.map((item, index) =>
                hideGKTh.includes(item.abbreviation) ? (
                  ""
                ) : (
                  <TableHead title={item.displayName} key={index}>
                    {item.abbreviation}
                  </TableHead>
                )
              )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.roster.map((item, index) => {
            if (item.position.abbreviation === "G")
              return (
                <TableRow key={index}>
                  <TableCell>{item.position.abbreviation}</TableCell>
                  <TableCell>{item.jersey}</TableCell>
                  <TableCell>{item.athlete.fullName}</TableCell>
                  {item.stats &&
                    item.stats.map((stat, idx) =>
                      hideGKTh.includes(stat.abbreviation) ? (
                        ""
                      ) : (
                        <TableCell key={idx}>{stat.value}</TableCell>
                      )
                    )}
                </TableRow>
              );
          })}
        </TableBody>
      </Table>

      <Table className="text-center">
        <colgroup>
          <col width={45} />
          <col width={32} />
          <col width={140} />
          {data.roster[1].stats && (
            <>
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
            </>
          )}
        </colgroup>

        <TableHeader>
          <TableRow>
            <TableHead title="position">POS</TableHead>
            <TableHead title="jersey">NO</TableHead>
            <TableHead className="text-center">Name</TableHead>
            {data.roster[1].stats &&
              data.roster[1].stats.map((item, index) =>
                hideFieldTh.includes(item.abbreviation) ? (
                  ""
                ) : (
                  <TableHead title={item.displayName} key={index}>
                    {item.abbreviation}
                  </TableHead>
                )
              )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.roster.map((item, index) => {
            if (item.position.abbreviation !== "G")
              return (
                <TableRow
                  key={index}
                  className="border-b h-7 border-tableBorderColor"
                >
                  <TableCell>{item.position.abbreviation}</TableCell>
                  <TableCell>{item.jersey}</TableCell>
                  <TableCell>{item.athlete.fullName}</TableCell>
                  {item.stats &&
                    item.stats.map((stat, idx) =>
                      hideFieldTh.includes(stat.abbreviation) ? (
                        ""
                      ) : (
                        <TableCell key={idx}>{stat.value}</TableCell>
                      )
                    )}
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export default AwayTeam;
