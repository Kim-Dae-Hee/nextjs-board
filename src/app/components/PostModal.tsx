"use client";

import CloseIcon from "./icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className="fixed inset-0 flex flex-col justify-center items-center w-full h-full bg-gray-600/70 z-50"
      onClick={handleClose}
    >
      <button className="fixed top-0 right-0 p-6 text-white" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="bg-neutral-100 border-4 rounded-lg w-4/5 h-4/5 max-w-3xl">
        {children}
      </div>
    </section>
  );
}
