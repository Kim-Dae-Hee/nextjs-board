"user client";

type Props = {
  text: string;
  btnClick: () => void;
};

export default function LoginAndOutButton({ text, btnClick }: Props) {
  return (
    <div className="md:px-5 md:py-4 sm:px-4 sm:py-2 hover:scale-110 transition-all">
      <button className="sm:text-xs md:text-xl font-bold" onClick={btnClick}>{text}</button>
    </div>
  );
}
