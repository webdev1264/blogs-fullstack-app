const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((e) => logger.info(`Error connecting to MongoDB. Error ${e.message}`));

const blogSchema = mongoose.Schema({
  title: String,
  author: { type: String, required: true, minLength: 2 },
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
