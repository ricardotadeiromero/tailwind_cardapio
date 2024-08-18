"use client";
import { useFoodData } from "@/app/hooks/useFoodData";
import React from "react";
import SkelettonDataTable from "../components/SkelettonDataTable";
import { DataTable } from "../components/data-table";
import { columns } from "./components/columns";
import MainContainer from "../components/MainContainer";
import FormFood from "./components/FormFood";

export default function page() {
  const { data, isFetching } = useFoodData();
  return (
    <MainContainer>
      <div className="container py-10">
        {isFetching && <SkelettonDataTable />}
        {!isFetching && (
          <DataTable
            filter={{ filter: "title", name: "título" }}
            data={data}
            columns={columns}
            form={<FormFood />}
          />
        )}
      </div>
    </MainContainer>
  );
}
