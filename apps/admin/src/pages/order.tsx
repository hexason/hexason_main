import { Table } from "antd";



export default function Order() {
  const columns = [
    {
      title: "Захиалгын дугаар",
      dataIndex: "id",
      key: "id"
    }
  ]

  return (<>
    <Table
      columns={columns}
    >

    </Table>
  </>)
}