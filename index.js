import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const blogPostsContent = [];

//Render main page index.ejs
app.get("/", (req, res) => {
  res.render("index.ejs", { blogPostsContent: blogPostsContent });
});

//Render newPost page with input form to create new post
app.post("/newPost", (req, res) => {
  res.render("newPost.ejs");
});

//Submit new post and render main page listing all posts
app.post("/newPostSubmit", (req, res) => {
  const newPost = req.body.newPost;
  blogPostsContent.push(newPost);
  res.render("index.ejs", { blogPostsContent: blogPostsContent });
});

//Delete particular post and render main page with remaining posts
app.post("/delete", (req, res) => {
  const index = req.body.delete;
  blogPostsContent.splice(index, 1);
  res.render("index.ejs", { blogPostsContent: blogPostsContent });
});

//Edit particular post
app.post("/editPost", (req, res) => {
  console.log(req.body);
  const index = req.body.edit;
  console.log(index);
  console.log(blogPostsContent[index]);
  res.render("editPost.ejs", {
    index: index,
    blogPostsContent: blogPostsContent,
  });
});

//Submit edited post and render main page with updated posts
app.post("/editPostSubmit", (req, res) => {
  const index = req.body.updatePost[1];
  const updatedPost = req.body.updatePost[0];
  blogPostsContent[index] = updatedPost;
  res.render("index.ejs", { blogPostsContent: blogPostsContent });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
