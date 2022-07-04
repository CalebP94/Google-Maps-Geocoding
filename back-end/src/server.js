const { PORT = 5000 } = process.env;
console.log("PORT", PORT)
const app = require("./app");
const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);