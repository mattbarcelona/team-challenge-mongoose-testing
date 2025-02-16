const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please write the title"],
    },
    body: {
      type: String,
      required: [true, "Please write the body"],
    },
  },
  { timestamps: true }
);

//Creamos el índice en el modelo para hacer busqueda por índice
PostSchema.index({
  title: "text",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
