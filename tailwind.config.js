export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('./public/node.png')",
        "time-image": "url('./public/time.png')",
      },
    },
  },
  plugins: [],
};
