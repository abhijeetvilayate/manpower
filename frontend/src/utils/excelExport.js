import * as XLSX from 'xlsx';

/**
 * Utility helper to export JavaScript data into genuine binary .xlsx spreadsheets
 */
export function downloadXlsxFile(filename, sheetName, headers, dataRows) {
  // Combine headers and rows
  const aoa = [headers, ...dataRows];

  // Create worksheet & workbook
  const worksheet = XLSX.utils.aoa_to_sheet(aoa);

  // Set column widths automatically
  const colWidths = headers.map((h, i) => {
    let maxLen = String(h).length;
    dataRows.forEach(row => {
      if (row[i] !== undefined && row[i] !== null) {
        maxLen = Math.max(maxLen, String(row[i]).length);
      }
    });
    return { wch: Math.min(Math.max(maxLen + 3, 12), 60) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1');

  // Write binary file and trigger download
  const cleanFilename = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  XLSX.writeFile(workbook, cleanFilename);
}
