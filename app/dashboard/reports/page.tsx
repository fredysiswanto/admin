import fs from 'fs';
import Link from 'next/link';
export default function ReportsPage() {
  const directoryReport = fs.readdirSync('./docs');
  console.log(directoryReport);

  // Render file HTML sebagai JSX
  return (
    <div>
      {directoryReport?.map((dirReport) => (
        <div key={dirReport} className="pt-4 text-sm">
          <Link href={`${dirReport}`}>{dirReport}</Link>
        </div>
      ))}
    </div>
  );
}
