import { gql } from "@apollo/client";

export const getAllAdressGQL = gql`
  query Query {
    getAllAddress {
      id
      username
      address_city
      address_district
      address_street
      address_info
      contact_phone
      contact_email
      createdAt
      updatedAt
    }
  }
`;

export const createAddressGQL = gql`
  mutation CreateAddress($data: AddressInputQL!) {
    createAddress(data: $data) {
      address_city
      address_district
      address_info
      contact_email
      contact_phone
      id
      createdAt
      updatedAt
      username
      address_street
    }
  }
`;

export const getProduct = gql`
  {
    getProducts {
      items {
        title
      }
    }
  }
`;

export const getBasketProducts = gql`
  {
    getBasketProducts {
      info {
        id
        title
        image
      }
      price
      quantity
    }
  }
`;

export const addToBasket = gql`
  mutation AddToBasket($productId: String!, $quantity: Float!) {
    addToBasket(data: { productId: $productId, quantity: $quantity }) {
      info {
        id
        title
        image
      }
      price
      quantity
    }
  }
`;

export const createOrderGQL = gql`
  mutation CreateOrder($data: OrderCreateArgument!) {
    createOrder(data: $data) {
      additional_info
      id
      goods {
        id
        SKU
      }
    }
  }
`;

export const getOrdersGQL = gql`
  {
    getOrders {
      id
      shortId
      userId
      username
      address_city
      address_district
      address_street
      address_info
      contact_phone
      contact_email
      additional_info
      description
      status
      totalProductPrice
      totalDeliveryPrice
      totalPrice
      paymentStatus
      paidAt
      createdAt
      updatedAt
      goods {
        id
        productId
        productImage
        SKU
        productTitle
        productPrice
        productQuantity
        productDetail
        productUrl
        totalPrice
        status
      }
    }
  }
`;
export const getProductById = (id: string) => gql`
    {
      getProductById (id: "${id}"){
        id,
        title,
        price,
        supplier {
          logo
        },
        images {
          url
        },
        image,
				variations {
					configId,
          valueId,
          configName,
					icon,
					value
				},
        items {
          id,
          price,
          SKU,
          variations {
            configId,
            valueId,
            configName,
            icon,
            value
          }
        }
      }
    }
  `;

export const getProducts = gql`
  {
    getProducts {
      items {
        id
        title
        price
        sold
        image
      }
    }
  }
`;

export const getCategoryTree = gql`
  {
    getCategoryTree {
      id
      icon
      title
      children {
        id
        icon
        title
        children {
          id
          icon
          title
        }
      }
    }
  }
`;
