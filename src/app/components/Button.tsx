type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({ text, onClick, disabled = false }: Props) {
  return (
    <button
      className={`border-none rounded-b-lg px-8 py-4 text-white text-xl font-bold bg-gray-500 ${
        disabled && "opacity-60"
      }`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
