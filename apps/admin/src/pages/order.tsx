import { useAuth } from "@/hooks/useAuth";
import { useCurrencyFormat } from "@/hooks/userCurrencyFormatter";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState<any>({
    items: []
  });
  const formatter = useCurrencyFormat()
  const columns = [
    {
      title: "Захиалгын дугаар",
      dataIndex: "shortId",
      key: "id"
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (record: string) => {
        return <Tag color="processing">
          {record}
        </Tag>
      },
    },
    {
      title: "Төлбөр",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (record: string) => formatter(+record)
    },
    {
      title: "Захиалга шинэчлэгдсэн огноо",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (record:string) => new Date(Date.parse(record)).toLocaleString(),
      sorter: (a:any, b:any) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt) 
    },
    {
      title: "Захиалга үүссэн огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record:string) => new Date(Date.parse(record)).toLocaleString(),
      sorter: (a:any, b:any) => Date.parse(a.createdAt) - Date.parse(b.createdAt) 
    },
    {
      title: "Бараанууд",
      render: (record: any) => {
        return <Button type="primary" onClick={() => showModal(record)}>
          Барааны жагсаалт
        </Button>
      }
    },
  ];

  const showModal = (value: any) => {
    setOrder(value);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "get",
      url: "/admin/orders",
      headers: {
        Authorization: "Bearer " + user?.access_token
      }
    }).then(({ data }) => {
      setOrders(data.orders);
    }).catch(err => message.error(err.message))
  }, [isModalOpen])

  const statusChanger = (id:string, status:string) => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "put",
      url: "/order/"+id+"/status",
      data: {
        status
      },
      headers: {
        Authorization: "Bearer " + user?.access_token
      }
    }).then(({}) => {
      setIsModalOpen(false);
    }).catch(err => message.error(err.message)) 
  }

  return (<>
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      Утасны дугаар: {order?.user?.phone}
      <br />
      <Space>
        <Button onClick={() => statusChanger(order?.id, "pending")}>pending</Button>
        <Button onClick={() => statusChanger(order?.id, "paid")}>paid</Button>
        <Button onClick={() => statusChanger(order?.id, "cancel")}>cancel</Button>
        <Button onClick={() => statusChanger(order?.id, "done")}>done</Button>
      </Space>
      {order.items.map((el: any) => <div key={el.id}>
        <h1>{el.product.title}</h1>
        <img width="100%" src={el.product.image} alt={el.product.title} />
      </div>)}
    </Modal>
    <Table
      dataSource={orders}
      columns={columns}
    >
    </Table>
  </>)
}