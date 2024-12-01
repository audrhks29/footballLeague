import { memo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import CurrentSeasonStats from "./CurrentSeasonStats";
import ErrorCurrentSeasonStats from "./error/ErrorCurrentSeasonStats";

const PlayerInfo = memo(
  ({
    playerData,
    playerTeamData,
  }: {
    playerData: AthletesDataTypes;
    playerTeamData: {
      logos: {
        href: string;
        displayName: string;
      }[];
      shortDisplayName: string;
    };
  }) => {
    const logoImage = playerTeamData.logos[0];
    const height = isNaN(playerData.height)
      ? "-"
      : (playerData.height * 2.54).toFixed(1);

    const weight = isNaN(playerData.weight)
      ? "-"
      : (playerData.weight * 0.453592).toFixed(1);

    const playerName = playerData.displayName.split(" ");
    return (
      <section className="card border card-side h-48 py-3 px-5 overflow-hidden">
        {logoImage ? (
          <div>
            <img
              src={logoImage.href}
              alt={logoImage.displayName}
              title={logoImage.displayName}
              className="h-full"
            />
          </div>
        ) : (
          <i className="text-[96px]">
            <FaRegQuestionCircle />
          </i>
        )}

        <ul className="px-7 py-5 flex flex-col justify-around">
          <li className="text-[40px] leading-[44px]">
            <p>{playerName[0]}</p>
            <p>{playerName[1]}</p>
          </li>
          <li>
            {playerTeamData.shortDisplayName} / #{playerData.jersey} /{" "}
            {playerData.position.displayName}
          </li>
        </ul>

        <div className="flex flex-col justify-center px-7 w-[350px] text-[16px] gap-2">
          <div className="flex justify-between">
            <p className="w-[130px]">HT(cm) / WT(kg)</p>
            <span>
              {height} / {weight}
            </span>
          </div>
          <div className="flex justify-between">
            <p className="w-[130px]">BIRTHDATE</p>
            <span>
              {playerData.dateOfBirth.slice(0, 10)}({playerData.age})
            </span>
          </div>
          <div className="flex justify-between">
            <p className="w-[130px]">NATIONALITY</p>
            <span>{playerData.citizenship}</span>
          </div>
        </div>
        {playerData.statistics ? (
          <CurrentSeasonStats fetchUrl={playerData.statistics.$ref} />
        ) : (
          <ErrorCurrentSeasonStats />
        )}
      </section>
    );
  }
);

export default PlayerInfo;
