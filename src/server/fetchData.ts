import axios from "axios";

export const fetchTeamData = async (slugId: string) => {
  const response = await axios.get(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams`
  );
  return response.data.sports[0].leagues[0];
};
