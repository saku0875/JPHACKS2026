import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // スマホ実機（同じ Wi-Fi）から開発サーバーを開けるようにする
  allowedDevOrigins: ["192.168.*.*"],
  // デモ版：起動のたびに ちがう値にして、ローカル版のログインを 起動ごとに やりなおさせる（src/lib/backend/local.ts）
  env: { NEXT_PUBLIC_BOOT_ID: String(Date.now()) },
};

export default nextConfig;
