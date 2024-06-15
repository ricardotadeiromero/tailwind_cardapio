import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  price: number;
  image: string;
}

export default function Card({ title, price, image }: CardProps) {
  return (
    <div className="flex flex-col shadow-md ease-in-out transition-all items-center gap-3 p-4 w-60 h-80 rounded-md bg-orange-100 hover:bg-orange-200  hover:-translate-y-1">
      <Image
        src={image}
        alt="food-image"
        className="rounded-md"
        width={250}
        height={200}
      />
      <h2 className="font-bold text-xl">{title}</h2>
      <p className="flex items-center gap-3 mt-auto">
        <span>R$: {price}</span>
        <button className="px-4 py-2 text-zinc hover:text-zinc-300 font-semibold rounded-md shadow hover:bg-orange-600 transition-colors duration-300">
          Comprar
        </button>
      </p>
    </div>
  );
}
