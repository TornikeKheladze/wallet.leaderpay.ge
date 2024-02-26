import { Commission } from "../types/serviceTypes";

export default function calculate(
  amount: number,
  commissionData: Commission
): {
  commInGelValue: string | number;
  amountInGelValue: string | number;
} {
  const updateToNumbers: any = Object.fromEntries(
    Object.entries(commissionData).map(([key, value]) => [key, +value])
  );

  const {
    client_commission_fixed,
    client_commission_percent,
    max_client_commission,
    min_client_commission,
    rate,
  } = updateToNumbers;

  let genAmount: number = amount / ((100 - client_commission_percent) / 100);
  genAmount = genAmount + +client_commission_fixed;
  const difference: number = genAmount - amount;

  if (difference < min_client_commission && min_client_commission !== 0) {
    genAmount = genAmount + min_client_commission;
  }
  if (difference > max_client_commission && max_client_commission !== 0) {
    genAmount = genAmount + max_client_commission;
  }

  const commission: number = genAmount - amount;

  const commInGel: number = commission / rate;
  let amountInGel: number = genAmount / rate;

  amountInGel = parseFloat(amountInGel.toFixed(2));
  const roundedCommInGel: number = Math.round(commInGel * 100) / 100;
  const roundedAmountInGel: number = Math.round(amountInGel * 100) / 100;

  const commInGelValue: string | number = isNaN(roundedCommInGel)
    ? ""
    : roundedCommInGel;
  const amountInGelValue: string | number = isNaN(roundedAmountInGel)
    ? ""
    : roundedAmountInGel;

  return { commInGelValue, amountInGelValue };
}
