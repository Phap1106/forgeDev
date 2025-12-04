"use client";

import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  header: string;
  field: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type Props<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5 text-xs uppercase text-white/60">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 text-left">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-center">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-t border-white/5 hover:bg-white/5"
            >
              {columns.map((col) => {
                const value = row[col.field];
                return (
                  <td key={String(col.field)} className="px-4 py-3">
                    {col.render ? col.render(value, row) : (value as ReactNode)}
                  </td>
                );
              })}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-center text-xs">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="mr-3 text-emerald-400 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-4 py-4 text-center text-xs text-white/60"
              >
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
