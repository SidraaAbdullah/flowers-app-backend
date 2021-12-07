import joi from "joi";
import cloudinary from "cloudinary";

import { Post } from "../models";
import { CustomErrorHandler } from "../services";
import { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const createPost = async (req, res, next) => {
  const { content, image } = req.body;
  const { _id } = req.user;

  const createPostSchema = joi.object({
    content: joi.string().required(),
    image: joi.object({
      url: joi.string().required(),
      public_id: joi.string().required(),
    }),
  });

  const { error } = createPostSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    const post = new Post({ content, image, postedBy: _id });
    await post.save();

    res.json({
      messgae: "Post successfully created",
      data: post,
    });
  } catch (error) {
    return next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    const { secure_url, public_id } = result;
    res.json({
      message: "Image successfully uploaded",
      url: secure_url,
      public_id: public_id,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    // const posts = await Post.find({ postedBy: _id })
    const posts = await Post.find()
      .populate("postedBy", "_id name photo")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(posts);
  } catch (error) {
    return next(err);
  }
};

export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    return next(
      CustomErrorHandler.notFound("No any post found associated with this id")
    );
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "Post successfully updated",
      data: post,
    });
  } catch (error) {}
  res.json({});
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);

    //remove the image from cloudinary
    if (post.image && post.image.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }
    res.json({
      message: "Post successfully deleted.",
    });
  } catch (error) {
    return next(error);
  }
};
