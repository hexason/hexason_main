import { gql } from "@apollo/client";

export const getProduct = gql`
  {
    getProducts {
      items {
        title
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
