import { useFoodDataMutate } from "@/app/hooks/useFoodDataMutate";
import { FoodData } from "@/app/interface/FoodData";
import React, { useState } from "react";


interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label className="text-zinc-800 font-semibold mt-2 text-lg">
        {label}
      </label>
      <input
        className="p-2 border-2 border-solid border-gray-300 text-[rgba(0,0,0,0.9)] text-lg  leading-6 rounded-xl w-full mt-2"
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      />
    </>
  );
};
export default function FormModal() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const { mutate } = useFoodDataMutate();

  const submit = () => {
    const foodData: FoodData = {
      title,
      price,
      image,
    };
    mutate(foodData);
  };

  return (
    <div className="fixed inset-0 overflow-hidden h-full w-full flex items-center justify-center z-999">
      <div className="bg-white p-6 h-[60%] w-[60%]  flex items-start flex-col justify-between">
        <form className="w-[calc(100%-24px)]" action="">
          <Input label="title" value={title} updateValue={setTitle} />
          <Input label="price" value={price} updateValue={setPrice} />
          <Input label="image" value={image} updateValue={setImage} />
        </form>
        <button
          onSubmit={submit}
          className="transition-all py-1 px-3 bg-red-700 text-white rounded-md hover:bg-red-900"
        >
          Postar
        </button>
      </div>
    </div>
  );
}
