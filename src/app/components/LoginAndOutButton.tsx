"user client";

type Props = {
  text: string;
  btnClick: () => void;
};

export default function LoginAndOutButton({ text, btnClick }: Props) {
  return (
    <div className="bg-gray-200 rounded-lg hover:scale-110 transition-all">
      <button className="mx-2 my-2 lg:mx-4 lg:my-4 sm:text-[0.3rem] md:text-xl font-bold first-letter" onClick={btnClick}>{text}</button>
    </div>
  );
}
