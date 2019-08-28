module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "transform-imports",
      {
        vuetify: {
          transform: "vuetify/es5/components/${member}",
          /* change the preventFullImport property to false */
          preventFullImport: false
        }
      }
    ]
  ]
};
