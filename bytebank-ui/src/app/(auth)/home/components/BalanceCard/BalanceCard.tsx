"use client";

import { formatDisplayDate } from "@/utils/date/formatDisplayDate";
import { maskCardNumber } from "@/utils/string/maskCardNumber";

import IconCreditCard from "@/assets/icons/icon-creditcard.svg";
import IconEye from "@/assets/icons/icon-eye.svg";
import { useState } from "react";

interface BalanceCardProps {
  accountType: string;
  cardNumber: string;
  expirationDate: string;
  balance: number;
  currency?: string;
}

export default function BalanceCard({
  accountType,
  cardNumber,
  expirationDate,
  balance,
  currency = "BRL",
}: BalanceCardProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const formattedBalance = balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });

  const displayCardNumber = maskCardNumber(cardNumber);
  const formattedExpirationDate = formatDisplayDate(expirationDate, "MM/YY");

  return (
    <div className="flex aspect-[1.75/1] w-full rounded-2xl bg-[#2D2A31] p-6 text-white transition-all duration-300 hover:shadow-lg sm:p-8 md:h-[336px]">
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <IconCreditCard className="h-7 w-7 stroke-current stroke-[1.5px] opacity-90 sm:h-8 sm:w-8" />
          <div className="flex flex-col items-end space-y-0.5">
            <p className="font-medium tracking-wider">{displayCardNumber}</p>
            <p className="text-xs tracking-wider opacity-70">
              {formattedExpirationDate}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="">
            <div className="relative h-8 w-12 sm:h-10 sm:w-14">
              <div className="absolute right-0 h-8 w-8 rounded-full bg-[#9747FF] sm:h-10 sm:w-10" />
              <div className="absolute left-0 h-8 w-8 rounded-full bg-[#F21439] sm:h-10 sm:w-10" />
            </div>
          </div>
          <div>
            <div className="group flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
              >
                <IconEye />
              </button>
              <p className="text-lg font-medium tracking-wider sm:text-xl">
                {isBalanceVisible ? formattedBalance : "R$ ••••••"}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="mt-1 text-sm tracking-wide opacity-70 sm:text-base">
                {accountType}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
