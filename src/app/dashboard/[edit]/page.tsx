"use client";
import React from "react";
import MainContainer from "../components/MainContainer";
import { getFoodData } from "@/app/hooks/getFoodData";
import Main from "@/app/components/Main";

export default function Edit({ params }: { params: { edit: string } }) {
  console.log(params);
  const { data } = getFoodData(params.edit);
  console.log(data);
  return (
    <Main>
      <MainContainer foodData={data} />
    </Main>
  );
}
