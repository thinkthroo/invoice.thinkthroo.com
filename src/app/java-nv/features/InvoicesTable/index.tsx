import { Payment, columns } from "./Columns"
import { DataTable } from "./DataTable"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default function InvoicesTable(props: {data: any}) {

  const {
    data
  } = props;

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
