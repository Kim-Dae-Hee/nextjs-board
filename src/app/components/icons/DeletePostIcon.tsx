import { FaRegTrashCan } from "react-icons/fa6";

type Props = {
  modal?: boolean;
  deletePost: () => void;
};

export default function DeletePostIcon({ modal = false, deletePost }: Props) {
  return (
    <FaRegTrashCan
      className={getDeletePostSize(modal) + " hover:scale-110 transition-all cursor-pointer"}
      onClick={deletePost}
    />
  );
}

const getDeletePostSize = (modal: boolean): string => {
  if (!modal) {
    return "w-4 h-4";
  } else {
    return "w-10 h-10";
  }
};
