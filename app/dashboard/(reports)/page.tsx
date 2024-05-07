import fs from 'fs';
import { CalendarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
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
export default function ReportsPage() {
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
  // Render file HTML sebagai JSX
  return (
    <main>
      <div>
        <div className="flex w-full flex-col md:col-span-4">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Reports
          </h2>
          <section>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
              {/* NOTE: comment in this code when you get to this point in the course */}
              <div>
                <h3>Result API</h3>
              </div>
              <div className="bg-white px-6">
                {latestReports.api.map((reports, i) => {
                  return (
                    <div
                      key={reports}
                      className={clsx(
                        'flex flex-row items-center justify-between py-4',
                        {
                          'border-t': i !== 0,
                        },
                      )}
                    >
                      <div className="flex items-center">
                        <div className="min-w-0">
                          <Link href={'reports/' + reports}>
                            <p className="truncate text-sm font-semibold md:text-base">
                              {reports}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center pb-2 pt-6">
                <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                <h3 className="ml-2 text-sm text-gray-500 ">
                  Updated just now
                </h3>
              </div>
            </div>
          </section>
          <br />
          <section>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
              {/* NOTE: comment in this code when you get to this point in the course */}
              <div>
                <h3>Result UI</h3>
              </div>
              <div className="bg-white px-6">
                {latestReports.ui.map((reports, i) => {
                  return (
                    <div
                      key={reports}
                      className={clsx(
                        'flex flex-row items-center justify-between py-4',
                        {
                          'border-t': i !== 0,
                        },
                      )}
                    >
                      <div className="flex items-center">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold md:text-base">
                            {reports}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center pb-2 pt-6">
                <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                <h3 className="ml-2 text-sm text-gray-500 ">
                  Updated just now
                </h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
