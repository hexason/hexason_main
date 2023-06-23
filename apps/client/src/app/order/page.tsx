import { OrderList } from "@/components/build/Order";

export default function Page() {
  const dummy: any = {
    getOrders: [
      {
        id: "0c5a2d63-d9ac-4bac-a03a-386675bfec15",
        shortId: "0114108",
        userId: "700937bd-e130-4055-969f-6a1725fa572b",
        username: "john_doe",
        address_city: "New York",
        address_district: "Manhattan",
        address_street: "123 Main Street",
        address_info: "Lorem ipsum dolor sit amet",
        contact_phone: "555-1234",
        contact_email: "john@example.com",
        additional_info: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        status: 0,
        totalProductPrice: 2080800,
        totalDeliveryPrice: 0,
        totalPrice: 2080800,
        paymentStatus: 0,
        paidAt: null,
        createdAt: "1686176272453",
        updatedAt: "1686176272453",
        goods: [
          {
            id: "13",
            productId: "6479a0345446ee3dc5d80509",
            productImage:
              "https://img.alicdn.com/imgextra/i3/2207354634667/O1CN01p5qAcm1kLXHeBZzzs_!!0-item_pic.jpg",
            SKU: "ot-s-682880851284-1",
            productTitle:
              "Lenovo, гэрэл, гэрчилгээ нь тоглоом, 2023 цуглуулга, шинэ тоглоом, шинэ тоглоомын зөөвөртэй зөөврийн компьютер, Оюутны цуглуулга, бизнес, бизнесийн хувилбар",
            productPrice: 1040400,
            productQuantity: 2,
            productDetail:
              '[{"configId":"20105","valueId":"41420","configName":"Санах ойшил","value":"8GB","_id":"6481234a971b58f9e1a4dcec"},{"configId":"20122","valueId":"3222910","configName":"Хатуу дискний хүчин чадал","value":"128G Хатуу муж улсын хатуу диск","_id":"6481234a971b58f9e1a4dced"},{"configId":"1627207","valueId":"13276273632","configName":"Өнгө","value":"【Дээд хэмжээ】Xing yaohei","icon":"https://img.alicdn.com/imgextra/i2/2207354634667/O1CN017S6o1G1kLXAJbDFNu_!!2207354634667.jpg_100x100q90.jpg","mainImage":"https://img.alicdn.com/imgextra/i2/2207354634667/O1CN017S6o1G1kLXAJbDFNu_!!2207354634667.jpg","_id":"6481234a971b58f9e1a4dcee"},{"configId":"5919063","valueId":"6536025","configName":"Багц","value":"Стандарт","_id":"6481234a971b58f9e1a4dcef"}]',
            productUrl: null,
            totalPrice: "2080800",
            status: 0,
          },
        ],
      },
      {
        id: "e4e319fc-99df-4662-8ec6-823e7c4d55bb",
        shortId: "0124108",
        userId: "700937bd-e130-4055-969f-6a1725fa572b",
        username: "john_doe",
        address_city: "New York",
        address_district: "Manhattan",
        address_street: "123 Main Street",
        address_info: "Lorem ipsum dolor sit amet",
        contact_phone: "555-1234",
        contact_email: "john@example.com",
        additional_info: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        status: 0,
        totalProductPrice: 2080800,
        totalDeliveryPrice: 0,
        totalPrice: 2080800,
        paymentStatus: 0,
        paidAt: null,
        createdAt: "1686248427330",
        updatedAt: "1686248427330",
        goods: [
          {
            id: "14",
            productId: "6479a0345446ee3dc5d80509",
            productImage:
              "https://img.alicdn.com/imgextra/i3/2207354634667/O1CN01p5qAcm1kLXHeBZzzs_!!0-item_pic.jpg",
            SKU: "ot-s-682880851284-1",
            productTitle:
              "Lenovo, гэрэл, гэрчилгээ нь тоглоом, 2023 цуглуулга, шинэ тоглоом, шинэ тоглоомын зөөвөртэй зөөврийн компьютер, Оюутны цуглуулга, бизнес, бизнесийн хувилбар",
            productPrice: 1040400,
            productQuantity: 2,
            productDetail:
              '[{"configId":"20105","valueId":"41420","configName":"Санах ойшил","value":"8GB","_id":"6481234a971b58f9e1a4dcec"},{"configId":"20122","valueId":"3222910","configName":"Хатуу дискний хүчин чадал","value":"128G Хатуу муж улсын хатуу диск","_id":"6481234a971b58f9e1a4dced"},{"configId":"1627207","valueId":"13276273632","configName":"Өнгө","value":"【Дээд хэмжээ】Xing yaohei","icon":"https://img.alicdn.com/imgextra/i2/2207354634667/O1CN017S6o1G1kLXAJbDFNu_!!2207354634667.jpg_100x100q90.jpg","mainImage":"https://img.alicdn.com/imgextra/i2/2207354634667/O1CN017S6o1G1kLXAJbDFNu_!!2207354634667.jpg","_id":"6481234a971b58f9e1a4dcee"},{"configId":"5919063","valueId":"6536025","configName":"Багц","value":"Стандарт","_id":"6481234a971b58f9e1a4dcef"}]',
            productUrl: null,
            totalPrice: "2080800",
            status: 0,
          },
        ],
      },
    ],
  };
  return <OrderList data={dummy} />;
}
