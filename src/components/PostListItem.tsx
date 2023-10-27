import { getFormattedDate } from "@/lib/getFormattedDate";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export const PostListItem = ({ post }: Props) => {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);
  return (
    <li>
      <Link href={`/blog/${id}`}>{title}</Link>
      <br />
      <p>{formattedDate}</p>
    </li>
  );
};
