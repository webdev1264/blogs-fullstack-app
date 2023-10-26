const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((e) => logger.info(`Error connecting to MongoDB. Error ${e.message}`));

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true, minLength: 2 },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
