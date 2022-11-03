/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        estatery: {
          primary: "#7164F0",
          secondary: "#EAE7FB",
          accent: "#C149AD",
          neutral: "#021431",
          "base-100": "#F8F7FD",
          info: "#93E6FB",
          success: "#80CED1",
          warning: "#EFD8BD",
          error: "#E58B8B",
        },
      },
    ],
  },
};
