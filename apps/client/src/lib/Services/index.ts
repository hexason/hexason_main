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
        items {
          id,
          price,
          variations {
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
