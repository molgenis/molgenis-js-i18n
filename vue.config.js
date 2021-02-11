/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  devServer: {
    before: function(app) {
      app.get("/api/v2/i18n/demo/en", function(req, res) {
        const localizedMessages = {
          hallo_label: "Good day",
          good_by_label: "By By",
        };
        res.json(localizedMessages);
      });

      app.get("/api/v2/i18n/other/en", function(req, res) {
        const localizedMessages = {
          turtle_label: "I like turtles",
        };
        res.json(localizedMessages);
      });
    },
  },
};
