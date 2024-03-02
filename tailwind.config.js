/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      hoverColor: "#575757",
      tableBorderColor: "#717171"
    },
    extend: {},
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".pagination_list": {
          "@apply w-[30px] h-[30px] text-center cursor-pointer leading-[30px] hover:font-semibold":
            "",
        },
        ".pagination_arrow": {
          "@apply text-[18px] cursor-pointer hover:text-[20px] w-[30px] h-[30px] flex items-center justify-center": ""
        }
      })
    }
  ],
}

