"user client";

type Props = {
  text: string;
  btnClick: () => void;
};

export default function LoginAndOutButton({ text, btnClick }: Props) {
  return (
    <div className="bg-gray-200 rounded-md hover:scale-110 transition-all">
      <button className="text-xl font-bold px-5 py-4" onClick={btnClick}>{text}</button>
    </div>
  );
}
