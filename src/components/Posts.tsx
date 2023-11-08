import React from "react";
import { getSortedPostsData } from "@/lib/posts";
import { PostListItem } from "./PostListItem";
import styles from "@/styles/blog.module.css";

const Posts = () => {
  const posts = getSortedPostsData();

  return (
    <div className={styles["blog-list"]}>
      <ul>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;
