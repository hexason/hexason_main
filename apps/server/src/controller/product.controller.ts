import { Controller, Get } from "@nestjs/common";

@Controller("product")
export class ProductController {
  constructor() {}

  @Get("")
  async getProducts() {
    return {
      count: 1,
      items: [
        {
          id: '1',
          title: 'Zero 2 Figure ',
          image: "https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937",
          brand: "Brand 1",
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
          price: 3200000,
          oldPrice: 4000000,
          sold: 10,
          quantity: 10,
          status: 'available',
          airedAt: new Date().toLocaleString(),
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        },
        {
          id: '2',
          title: 'Zero 2 Figure ',
          image: "https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937",
          brand: "Brand 1",
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
          price: 32000,
          oldPrice: 40000,
          sold: 10,
          quantity: 10,
          status: 'available',
          airedAt: new Date().toLocaleString(),
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        },
        {
          id: '3',
          title: 'Zero 2 Figure ',
          image: "https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937",
          brand: "Brand 1",
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
          price: 32000,
          oldPrice: 40000,
          sold: 10,
          quantity: 10,
          status: 'available',
          airedAt: new Date().toLocaleString(),
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        },
        {
          id: '4',
          title: 'Zero 2 Figure ',
          image: "https://cdn.shopify.com/s/files/1/0014/2648/9388/products/ultra-tokyo-connection-pvc-scale-figures-chainsaw-man-power-prize-figure-32504714756140_360x.jpg?v=1669223937",
          brand: "Brand 1",
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
          price: 32000,
          oldPrice: 40000,
          sold: 10,
          quantity: 10,
          status: 'available',
          airedAt: new Date().toLocaleString(),
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        },
      ]
    }
  }
}