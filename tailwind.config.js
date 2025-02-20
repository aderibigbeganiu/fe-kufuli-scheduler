/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                fill: "stretch",
                "webkit-fill": "-webkit-stretch",
                "moz-fill": "-moz-stretch",
            },
            height: {
                fill: "stretch",
                "webkit-fill": "-webkit-stretch",
                "moz-fill": "-moz-stretch",
            },
        },
        screens: {
            mobile: "320px",
            // => @media (min-width: 320px) { ... }
            tablet: "640px",
            // => @media (min-width: 640px) { ... }

            laptop: "1024px",
            // => @media (min-width: 1024px) { ... }

            desktop: "1280px",
            // => @media (min-width: 1280px) { ... }
        },
    },
    plugins: [],
};
