import React from "react";

interface CurrencyFormatterProps {
  value: number;
}

export default function CurrencyFormatter({ value }: CurrencyFormatterProps) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
