"use client";
import React from "react";
import { DataTable } from "./components/data-table";
import { useFoodData } from "../hooks/useFoodData";
import { columns } from "./components/columns";
import { findAll } from "../services/food";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Delete from "./components/delete";
import SkelettonDataTable from "./components/SkelettonDataTable";
import Header from "../components/Header";

export default function Dashboard() {
  const { data, isFetching } = useFoodData();
  return (
    <>
      <div className="w-full p-6 mx-auto flex flex-col items-center">
        <Header/>

        <div className="container mx-auto py-10">
          
          {isFetching && (
              <SkelettonDataTable />

          )}
          {!isFetching && <DataTable data={data} columns={columns} />}
        </div>
      </div>
    </>
  );
}
