import NumberTicker from "@/components/ui/number-ticker";

export function NumberTickerBook({ value, fontColor }: {
    value: number,
    fontColor?: string
}) {
  return (
    <p className={`text-2xl sm:text-4xl font-bold bg-[#414141] py-3 px-12 rounded-md
        ${fontColor}`}>
      {value === 0 ? "0" : <NumberTicker value={value} />}
    </p>
  );
}
