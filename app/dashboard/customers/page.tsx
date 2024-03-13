import { fetchCustomers, fetchTransactionCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';

export default async function CustomersPage() {
  const customers: any[] = await fetchTransactionCustomers();
  // console.log(customers);

  return (
    <div>
      <CustomersTable customers={customers}></CustomersTable>
    </div>
  );
}
