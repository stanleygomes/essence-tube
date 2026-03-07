"use client";

import Image from "next/image";

export interface IImage {
  srcLight: string;
  srcDark: string;
  alt?: string;
  width?: number;
  height?: number;
  classNameLight?: string;
  classNameDark?: string;
}

export default function ImageByTheme({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  classNameLight,
  classNameDark,
}: IImage) {
  return (
    <>
      {/* Imagem para modo claro */}
      <Image
        src={srcLight}
        alt={alt || ""}
        width={width}
        height={height}
        className={classNameLight}
        priority
      />
      {/* Imagem para modo escuro */}
      <Image
        src={srcDark}
        alt={alt || ""}
        width={width}
        height={height}
        className={classNameDark}
        priority
      />
    </>
  );
}
