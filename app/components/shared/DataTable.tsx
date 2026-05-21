import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { DataTableProps } from "./types";

export function DataTable<T>({
  title,
  subtitle,
  actionLabel,
  onActionClick,
  columns,
  data,
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm overflow-hidden`}>
      <div className="p-6 border-b border-outline/8 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-[22px] font-semibold text-burgundy">
            {title}
          </h3>
          {subtitle && (
            <p className="text-surface-variant text-[13px] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {actionLabel && (
          <button
            onClick={onActionClick}
            className="px-5 py-2.5 border border-outline/15 rounded-sm text-[11px] uppercase tracking-[0.18em] font-medium text-surface-variant hover:border-burgundy/30 hover:text-burgundy transition-all"
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-outline/8 bg-warmgray/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={keyExtractor(row)}
                className={`border-b border-outline/5 hover:bg-warmgray/30 transition-colors ${
                  i === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3.5 px-6 ${col.className ?? ""}`}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
