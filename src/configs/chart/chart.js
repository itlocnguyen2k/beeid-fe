export const chartCircle = {
  type: "radialBar",
  height: 30,
  width: 30,
  options: {
    grid: {
      show: false,
      padding: {
        left: -15,
        right: -15,
        top: -12,
        bottom: -15,
      },
    },
    colors: ["#28c76f"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "20%",
        },
        track: {
          background: "#b8c2cc",
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
  },
};
