import dynamic from 'next/dynamic';

const ClipLoader = dynamic(
  () => import('react-spinners').then(lib => lib.ClipLoader),
  {
    ssr: false,
  }
) 

type Props ={
  color?: string;
}

export default function LoadingSpinner({ color = "green" }: Props) {
  return <ClipLoader size={200} color={color}></ClipLoader>;
}
