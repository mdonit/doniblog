import React from "react";
import { getSortedPostsData } from "@/lib/posts";
import { PostListItem } from "./PostListItem";

const Posts = () => {
  const posts = getSortedPostsData();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;
