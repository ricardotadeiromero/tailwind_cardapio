"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { useFoodData } from "../hooks/useFoodData";
import { columns } from "./food/components/columns";
import { findAll } from "../services/food";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../../../public/hamburguer.png";
import Delete from "./components/delete";
import SkelettonDataTable from "./components/SkelettonDataTable";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContainer from "./components/MainContainer";
import Image from "next/image";

export default function admin() {
  const { data, isFetching } = useFoodData();
  return (
    <>
      <MainContainer>
        <Image src={logo} alt="logo" />
      </MainContainer>
    </>
  );
}
