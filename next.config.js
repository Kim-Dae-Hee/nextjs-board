/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // SSR 페이지 자동 업데이트에 필요
  },
  images: {
    domains: ["cdn.sanity.io"], // Next Image src 외부 URL로 사용하기 위해 필요
  },
};

module.exports = nextConfig;
