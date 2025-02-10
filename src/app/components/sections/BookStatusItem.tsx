import clsx from "clsx";

export default function BookStatusItem({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          "w-3 h-3 rounded-full",
          status === "Não lido" && "bg-red-600",
          status === "Lendo" && "bg-blue-500",
          status === "Lido" && "bg-green-500"
        )}
      ></div>
      <p className="text-zinc-200">{status}</p>
    </div>
  );
}
