const mongodbURL = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;
const jsonAccessKey = process.env.VITE_ACCESS_TOKEN;

module.exports = {
  mongodbURL,
  port,
  jsonAccessKey,
};
