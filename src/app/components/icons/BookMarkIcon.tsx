import { BsBookmark } from "react-icons/bs";

type Props = {
  modal?: boolean;
};

export default function BookMarkIcon({ modal = false }: Props) {
  return <BsBookmark className={getBookMarkSize(modal)} />;
}

const getBookMarkSize = (modal: boolean): string => {
  if (!modal) {
    return "w-6 h-6";
  } else {
    return "w-10 h-10";
  }
};
