// src/components/admin/DataTable.tsx
"use client";

import type { ReactNode } from "react";

/**
 * Cột cho DataTable
 * - Hỗ trợ cả tên cũ (header/field) và tên mới (label/key)
 */
export type DataTableColumn<T> = {
  // Text hiển thị trên header
  label?: string;
  header?: string; // alias

  // Tên trường trong row dùng để lấy value mặc định
  key?: keyof T | string;
  field?: keyof T; // alias

  /**
   * Render custom cho ô – nhận đủ cả row.
   * Ví dụ:
   *   render: (row) => row.type === "percent" ? "Theo %" : "Giảm thẳng"
   */
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];

  // Có thể truyền data hoặc rows – dùng cái nào cũng được
  data?: T[];
  rows?: T[];

  getRowKey?: (row: T, index: number) => React.Key;

  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export function DataTable<T>({
  columns,
  data,
  rows,
  getRowKey,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  // Luôn đảm bảo là mảng, tránh lỗi data.map undefined
  const safeRows: T[] = (data ?? rows ?? []) as T[];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5 text-xs uppercase text-white/60">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left whitespace-nowrap"
              >
                {col.label ?? col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-center whitespace-nowrap">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {safeRows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-4 py-4 text-center text-xs text-white/60"
              >
                Không có dữ liệu.
              </td>
            </tr>
          )}

          {safeRows.map((row, idx) => (
            <tr
              key={getRowKey ? getRowKey(row, idx) : idx}
              className="border-t border-white/5 hover:bg-white/5"
            >
              {columns.map((col, cIdx) => {
                const fieldKey =
                  (col.key as keyof T | undefined) ??
                  (col.field as keyof T | undefined);

                const value =
                  fieldKey !== undefined
                    ? (row as any)[fieldKey]
                    : undefined;

                const content = col.render
                  ? col.render(row)
                  : (value as ReactNode);

                return (
                  <td key={cIdx} className="px-4 py-3 align-middle">
                    {content}
                  </td>
                );
              })}

              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-center text-xs whitespace-nowrap">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="mr-3 text-emerald-400 hover:text-emerald-300 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="text-red-400 hover:text-red-300 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Cho phép import theo cả 2 kiểu:
// import DataTable from "...";
// import { DataTable } from "...";
export default DataTable;












