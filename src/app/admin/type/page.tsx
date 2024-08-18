"use client";
import React from "react";
import SkelettonDataTable from "../components/SkelettonDataTable";
import { DataTable } from "../components/data-table";
import MainContainer from "../components/MainContainer";
import { useTypeData } from "@/app/hooks/type/useTypeData";
import FormType from "./components/FormType";
import { columns } from "./components/columns";

export default function page() {
  const { data, isFetching } = useTypeData();
  return (
    <MainContainer>
      <div className="container py-10">
        {isFetching && <SkelettonDataTable />}
        {!isFetching && (
          <DataTable filter={{ filter: "name", name: "nome" }} data={data} columns={columns} form={<FormType />} />
        )}
      </div>
    </MainContainer>
  );
}
