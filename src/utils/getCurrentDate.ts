// const month = String(today.getMonth() + 1).padStart(2, "0");
// const day = String(today.getDate()).padStart(2, "0");

export default function getCurrentYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const july31 = new Date(currentYear, 6, 31); // 6은 0부터 시작하므로 7월을 나타냄
  return today < july31 ? currentYear - 1 : currentYear;
}
