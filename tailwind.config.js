module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    colors: {
      transparent: "transparent", current: "currentColor", inherit: "inherit",
      paper: "#F6F4EE", surface: "#FCFBF8", ink: "#1D2420", muted: "#545B55",
      line: "#D8D3C7", "line-strong": "#8A877E",
      green: "#265728", deep: "#183A1B", accent: "#B15219", meadow: "#A5CA8E",
      // Chart fills on the light surface: two greens, a neutral and two oranges.
      "chart-pos-strong": "#265728", "chart-pos": "#7DB56A", "chart-neutral": "#CFCBBE",
      "chart-neg": "#E8A46C", "chart-neg-strong": "#B8561B",
    },
    borderRadius: { none: "0px", DEFAULT: "0px" },
    boxShadow: { none: "none" },
    fontFamily: {
      sans: ['"Public Sans Variable"', "system-ui", "sans-serif"],
      serif: ['"Source Serif 4 Variable"', "Georgia", "serif"],
    },
    extend: {
      fontSize: {
        "title-sm": ["1.625rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        sub: ["1.375rem", { lineHeight: "1.3" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        meta: ["0.9375rem", { lineHeight: "1.5" }],
        display: ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        ui: ["0.9375rem", { lineHeight: "1.5" }],
      },
      maxWidth: { content: "77.5rem", form: "35rem" },
      transitionDuration: { DEFAULT: "180ms" },
      transitionTimingFunction: { DEFAULT: "cubic-bezier(0.2, 0, 0, 1)" },
      keyframes: {
        menu: { from: { opacity: "0", transform: "translate(-50%, -4px)" }, to: { opacity: "1", transform: "translate(-50%, 0)" } },
        rise: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        tile: { from: { opacity: "0", transform: "scale(1.06)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        menu: "menu 160ms cubic-bezier(0.2, 0, 0, 1)",
        rise: "rise 700ms cubic-bezier(0.2, 0, 0, 1) both",
        tile: "tile 900ms cubic-bezier(0.2, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};
