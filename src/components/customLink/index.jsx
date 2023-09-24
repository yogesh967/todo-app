import { Link } from "@mui/material";

const CustomLink = (props) => {
  const { href, text } = props;
  return (
    <div>
      <Link href={href}>{text}</Link>
    </div>
  );
};

export default CustomLink;
