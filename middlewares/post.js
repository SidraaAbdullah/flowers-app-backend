import { Post } from "../models";
import { CustomErrorHandler } from "../services";

export const canEditAndDeletePost = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (_id != post.postedBy) {
      return next(
        CustomErrorHandler.unAuthorized(
          "you don't have access to update / delete this post"
        )
      );
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
};
