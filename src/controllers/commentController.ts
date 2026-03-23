import { Request, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment";

// Create Comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId as string;
    const { text } = req.body;

    const comment = new Comment({
      postId: new mongoose.Types.ObjectId(postId),
      text,
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment" });
  }
};

// Get Comments by Post
export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId as string;

    const comments = await Comment.find({
      postId: new mongoose.Types.ObjectId(postId),
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Update Comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId as string;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

// Delete Comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId as string;

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};