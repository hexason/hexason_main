import useFetch from "@/hooks/useFetch";
import { Table } from "antd";
import { useEffect, useState } from "react";

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
  }
];
export default function ProductList() {
  const {response, loading} = useFetch({
    method: "get",
    url: "/product"
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(response) {
      setProducts(response.data.items.map((el:any) =>({
        ...el, 
        image: <img height={"50px"} alt={el.title} src={el.image} />
      })))
    }

  }, [response])

  if(loading) return "Loading..."
  return (
    <Table dataSource={products} columns={columns} />
  )
}