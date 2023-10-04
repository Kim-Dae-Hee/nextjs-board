import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function PostModalPortal({ children }: Props) {
  if (typeof window === "undefined") { // 브라우저 환경이 아니면
    return null;
  }

  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node);
}
