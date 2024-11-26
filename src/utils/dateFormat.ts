export default function dateFormat(matchDate: string) {
  const date = new Date(matchDate);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const outputDateString = date.toLocaleDateString("en-US", options);

  return outputDateString;
}
