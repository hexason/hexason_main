import useFetch from "@/hooks/useFetch";
import { Button, Space, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function ProductList() {
  const { response, loading } = useFetch({
    method: "get",
    url: "/product"
  });
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const columns: any = [
    {
      title: 'Бүтээгдэхүүн нэр',
      dataIndex: 'title',
      key: 'title',
      filters: products.map((el: any) => ({
        text: el.title,
        value: el.title,
      })),
      filterMode: 'search',
      onFilter: (value: string, record: any) => record.title.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Тоо ширхэг',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: any, b: any) => a.quantity - b.quantity,

    },
    {
      title: 'Үнэ',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price - b.price,

    },
    {
      title: "Үндсэн үнэ",
      dataIndex: "oldPrice",
      key: "oldPrice"
    },
    {
      title: "Зураг",
      dataIndex: "image",
      key: "image"
    },
    {
      title: "Бараа оруулсан огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) => new Date(Date.parse(record.createdAt)).toLocaleString(),
      sorter: (a: any, b: any) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => router.push("/product/edit/" + record.id)}>ЗАСАХ</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (response) {
      setProducts(response.data.items.map((el: any) => ({
        ...el,
        image: <img height={"50px"} alt={el.title} src={el.image} />
      })))
    }

  }, [response])

  if (loading) return "Loading..."
  return (<div>
    <Button onClick={() => { router.push("/product/add") }}>Бүтээгдэхүүн нэмэх</Button>
    <Table dataSource={products} columns={columns} />
  </div>
  )
}