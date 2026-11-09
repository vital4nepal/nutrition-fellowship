module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    colors: {
      transparent: "transparent", current: "currentColor", inherit: "inherit",
      paper: "#F6F4EE", surface: "#FCFBF8", ink: "#1D2420", muted: "#545B55",
      line: "#D8D3C7", "line-strong": "#8A877E",
      green: "#265728", deep: "#183A1B", accent: "#B8561B",
    },
    borderRadius: { none: "0px", DEFAULT: "0px" },
    boxShadow: { none: "none" },
    fontFamily: {
      sans: ['"Public Sans Variable"', "system-ui", "sans-serif"],
      serif: ['"Source Serif 4 Variable"', "Georgia", "serif"],
    },
    extend: {
      fontSize: {
        title: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "title-sm": ["1.625rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        sub: ["1.375rem", { lineHeight: "1.3" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        meta: ["0.875rem", { lineHeight: "1.5" }],
      },
      maxWidth: { content: "77.5rem", form: "35rem" },
      transitionDuration: { DEFAULT: "180ms" },
      transitionTimingFunction: { DEFAULT: "cubic-bezier(0.2, 0, 0, 1)" },
    },
  },
  plugins: [],
};
