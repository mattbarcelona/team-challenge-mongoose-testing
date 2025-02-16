const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");

//CREATE post
router.post("/create", async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, completed: false });
    res.status(201).send({ message: "post successfully created", post });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to create a post", error });
  }
});

//GET postS

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was a problem trying to get the posts", error });
  }
});

//GET post BY ID

router.get("/id/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "There was a problem with the post with _id number: " + req.params._id,
    });
  }
});

//GET POST BY TITLE OPT 1

// router.get("/title/:title", async(req, res) => {
//         try {
//             if (req.params.title.length > 20) {
//                 return res.status(400).send('Búsqueda demasiado larga')
//             }

//             const title = new RegExp(req.params.title, "i");
//             const posts = await Post.find({ title });
//             res.send(posts);
//         } catch (error) {
//             console.log(error);
// res
// .status(500)
// .send({ message: "There was a problem trying to get the post", error });
//         }
//     }),
//GET POST BY TITLE OPT 2 POR ÍNDICE (Para que esto funcione le he añadido el índice en el modelo)

router.get("/title/:title", async (req, res) => {
  try {
    const posts = await Post.find({
      $text: {
        $search: req.params.title,
      },
    });
    res.send(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to get the post", error });
  }
}),
  //UPDATE post

  router.put("/id/:_id", async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "post successfully updated", post });
    } catch (error) {
      res
        .status(500)
        .send({
          message: "There was a problem trying to update the post",
          error,
        });
    }
  }),
  //DELETE post

  router.delete("/id/:_id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ message: "post deleted", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to delete the post" });
    }
  });

//** ENDPOINT EXTRA*/
router.get("/postsWithPagination", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to get the posts", error });
  }
});
module.exports = router;
