/**
 * Export utility functions — replaces the vulnerable `xlsx` library.
 * Uses native browser APIs (Blob + URL) — zero dependencies, zero vulnerabilities.
 */

/**
 * Export data to a CSV file.
 * @param {string} filename - Output filename (without extension)
 * @param {Array<Object>} rows - Array of row objects
 * @param {Array<{Header: string, accessor: string}>} columns - Column definitions
 */
export function exportToCSV(filename, rows, columns) {
  if (!rows || rows.length === 0) return;

  const headers = columns.map((col) => `"${col.Header}"`).join(",");

  const csvRows = rows.map((row) =>
    columns
      .map((col) => {
        const val = row[col.accessor] ?? "N/A";
        // Escape double quotes inside values
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  const csvContent = [headers, ...csvRows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
