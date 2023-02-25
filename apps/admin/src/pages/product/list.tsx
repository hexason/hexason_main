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

  const columns = [
    {
      title: 'Бүтээгдэхүүн нэр',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Үнэ',
      dataIndex: 'price',
      key: 'price',
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