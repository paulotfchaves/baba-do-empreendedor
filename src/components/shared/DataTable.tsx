import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GroupingFilter from "./GroupingFilter";
import DateRangePicker from "./DateRangePicker";
import { startOfMonth, endOfMonth } from "date-fns";

interface DataTableProps {
  data: any[];
  columns: {
    key: string;
    header: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }[];
  groupBy?: {
    value: "day" | "week" | "month";
    onChange: (value: "day" | "week" | "month") => void;
  };
}

export default function DataTable({ data, columns, groupBy }: DataTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Filter data based on date range
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= dateRange.start && itemDate <= dateRange.end;
  });

  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div>
      {groupBy && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Histórico</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <DateRangePicker
                startDate={dateRange.start}
                endDate={dateRange.end}
                onChange={setDateRange}
                className="min-w-[260px]"
              />
              <GroupingFilter
                value={groupBy.value}
                onChange={groupBy.onChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render
                      ? column.render(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="rounded-lg border-gray-300 shadow-sm focus:border-[#FF66B2] focus:ring-[#FF66B2]"
          >
            <option value={10}>10 linhas</option>
            <option value={25}>25 linhas</option>
            <option value={50}>50 linhas</option>
            <option value={100}>100 linhas</option>
          </select>
          <span className="text-sm text-gray-700 text-center sm:text-left">
            Mostrando {startIndex + 1} até{" "}
            {Math.min(endIndex, filteredData.length)} de {filteredData.length}{" "}
            registros
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
