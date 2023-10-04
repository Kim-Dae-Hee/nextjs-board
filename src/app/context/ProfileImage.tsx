type ProfileSize = "small" | "large";

type Props = {
  image?: string;
  size?: ProfileSize;
};

export default function ProfileImage({ image, size = "small" }: Props) {
  return (
    <div className={getProfileImageSize(size)}>
      {/* next js에서 제공하는 <Imgae />를 사용하면 최적화에 좋으나 
     외부 URL은 next.config에 사용할 이미지의 URL을 추가해야 한다.
     어떤 도메인이 넘어올지 모르므로 img 태그 사용 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full"
        src={image ?? undefined}
        alt="google image"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getProfileImageSize(size: ProfileSize) {
  switch (size) {
    case "small":
      return "w-12 h-12";
    case "large":
      return "w-18 h-18";
    default:
      throw new Error("사이즈 타입이 맞지 않습니다.");
  }
}
