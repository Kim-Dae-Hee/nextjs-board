import React from "react";

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
}: Props) {

  const handleClick = (e: React.MouseEvent) => {
    onToggle(!toggled);
    e.stopPropagation(); // 이벤트 버블링을 막음
  }

  return (
    <button
      className="hover:scale-110 transition-all"
      onClick={handleClick}
    >
      {toggled ? onIcon : offIcon}
    </button>
  );
}
