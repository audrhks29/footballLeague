const today = new Date();
const year = today.getFullYear().toString();
// const month = String(today.getMonth() + 1).padStart(2, "0");
// const day = String(today.getDate()).padStart(2, "0");

export default function getCurrentYear() {
  return year;
}
