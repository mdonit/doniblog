import { getFormattedDate } from "@/lib/getFormattedDate";
import Link from "next/link";
import styles from "@/styles/blog.module.css";

type Props = {
  post: BlogPost;
};

export const PostListItem = ({ post }: Props) => {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);
  return (
    <li>
      <h2 className={styles["blog-post__title"]}>
        <Link href={`/blog/${id}`}>{title}</Link>
      </h2>
      <p className={styles["blog-post__date"]}>{formattedDate}</p>
    </li>
  );
};
