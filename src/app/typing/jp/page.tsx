import { Metadata } from "next";

export const metadata: Metadata = {
  title: "点字タイピング練習",
  description:
    "点字タイピング練習は、パソコンのキーボードを使ってパーキンスブレーラーのタイピング練習が行えるWebアプリです。フリー入力とゲームを通して点字タイピングの腕を磨くことができます。",
};

export default function ENBraille() {
  return <div> hello world from jp braille</div>;
}
