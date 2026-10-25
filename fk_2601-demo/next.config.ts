import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // スマホ実機（同じ Wi-Fi）から開発サーバーを開けるようにする
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
