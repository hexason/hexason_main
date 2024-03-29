import { gql } from "@apollo/client";

export const getPaymentMethods = gql`
  query GetPaymentMethods {
    getPaymentMethods {
      id
      method
      image
      bank_name
      bank_account
      bank_reciver
    }
  }
`;
export const searchProducts = gql`
  query GetHighestViewedProduct($data: SearchArg!) {
    searchProducts(data: $data) {
      count
      items {
        id
        image
        discount
        price
        sold
        title
      }
    }
  }
`;
export const getHighestViewedProductGQL = gql`
  query GetHighestViewedProduct {
    getHighestViewedProduct {
      id
      image
    }
  }
`;

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
        vendorId,
        vendorName,
        vendorDisplayName,
        vendorScore,
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
          mainImage,
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

export const getFavProducts = gql`
  {
    getFavoriteProducts {
      id
      image
      price
      title
    }
  }
`;

export const addToFav = gql`
  mutation UpdateFavoriteProducts($ids: [String!]!) {
    updateFavoriteProducts(data: { ids: $ids }) {
      id
      image
      title
      price
    }
  }
`;
