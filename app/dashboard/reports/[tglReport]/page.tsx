import fs from 'fs';
import path from 'path';
export default function DetailReports({
  params,
}: {
  params: { tglReport: string };
}) {
  const tglReport = params.tglReport;
  const filePath = path.join(process.cwd(), 'docs', `${tglReport}`);

  // Baca isi file HTML
  const html = fs.readFileSync(filePath, 'utf8');

  // Render file HTML sebagai JSX
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
