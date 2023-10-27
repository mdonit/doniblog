import Link from "next/link";
import React from "react";
import Posts from "@/components/Posts";

const blogsList = [
  {
    id: "b-01",
    name: "Blog 01",
  },
  {
    id: "b-02",
    name: "Blog 02",
  },
];

const BlogsPage = () => {
  return (
    <>
      <div>
        <h2>List of Blogs</h2>
        {/* {blogsList.map((blog) => (
          <Link href={`blogs/${blog.id}`}>{blog.name}</Link>
        ))} */}
        <Posts />
      </div>
    </>
  );
};

export default BlogsPage;
