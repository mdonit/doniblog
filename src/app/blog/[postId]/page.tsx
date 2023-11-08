import { getFormattedDate } from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import styles from "@/styles/blog.module.css";

export const generateStaticParams = () => {
  const posts = getSortedPostsData(); //deduped!

  return posts.map((post) => ({
    postId: post.id,
  }));
};

export const generateMetadata = ({ params }: { params: { postId: string } }) => {
  const posts = getSortedPostsData(); //deduped!
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
  };
};

const Post = async ({ params }: { params: { postId: string } }) => {
  const posts = getSortedPostsData(); //deduped!
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) {
    return notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedDate(date);

  return (
    <div className={styles.blog}>
      <h2 className={styles["blog-post__title"]}>{title}</h2>
      <p className={styles["blog-post__date"]}>{pubDate}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} className={styles["blog-post__details"]} />
    </div>
  );
};

export default Post;
