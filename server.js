const app = require("./app");
const connectDataBase = require("./config/db");
const { port } = require("./secret");

app.listen(port, () => {
  console.log("server is running on port", port);
  connectDataBase();
});
