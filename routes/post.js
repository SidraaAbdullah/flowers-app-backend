import express from "express";
import formidable from "express-formidable";

import { auth, canEditAndDeletePost } from "../middlewares";
import {
  createPost,
  uploadImage,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/create-post", auth, createPost);
router.post(
  "/upload-image",
  auth,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.put("/update-post/:id", auth, canEditAndDeletePost, updatePost);
router.delete("/delete-post/:id", auth, canEditAndDeletePost, deletePost);

export default router;
