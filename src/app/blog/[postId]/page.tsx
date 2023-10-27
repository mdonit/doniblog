import { getFormattedDate } from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";

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
    <div>
      <h2>{title}</h2>
      <p>{pubDate}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
};

export default Post;
