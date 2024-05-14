import fs, { link } from 'fs';
import { lusitana } from '@/app/ui/fonts';
import { ArrowPathIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface DataReport {
  api: string[];
  ui: string[];
}

function filterDataReport(dataReport: string[]) {
  const data: DataReport = { api: [], ui: [] };
  dataReport.filter((report) => {
    if (report.includes('api')) {
      data.api.unshift(report);
    }
    if (report.includes('ui')) {
      data.ui.unshift(report);
    }
  });

  return data;
}

export default function ReportPages() {
  const directoryReport = fs.readdirSync('./docs');
  const latestReports = filterDataReport(directoryReport);
  // console.log(directoryReport);
  const monthReport = ['January', 'February', 'Maret', 'April', 'Mei'];
  const linksMonthReport = [
    { name: 'January', href: '/dashboard/reports/january', icon: CalendarIcon },
    {
      name: 'February',
      href: '/dashboard/reports/february',
      icon: CalendarIcon,
    },
    {
      name: 'Maret',
      href: '/dashboard/reports/maret',
      icon: CalendarIcon,
    },
    {
      name: 'April',
      href: '/dashboard/reports/april',
      icon: CalendarIcon,
    },
  ];
  return (
    <main className="flex w-full flex-col md:col-span-4">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Reports
      </h1>

      <div className="flex grow columns-2 flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          <h2 className="text-xl">Report Api</h2>
          <br />
          <div className="flex items-center">
            <div className="min-w-0">
              {latestReports.api.map((report) => {
                return (
                  <Link
                    key={report}
                    href={'reports/' + report}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <p className="truncate text-sm font-semibold md:text-base">
                      {report}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
      <br />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          <h2 className="text-xl">Report UI</h2>
          <br />
          <div className="flex items-center">
            <div className="min-w-0">
              {latestReports.ui.map((report) => {
                return (
                  <Link
                    key={report}
                    href={'reports/' + report}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <p className="truncate text-sm font-semibold md:text-base">
                      {report}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </main>
  );
}
