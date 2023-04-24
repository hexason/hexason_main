export interface Result {
  Items: {
    Items: {
      Content: Content[];
    };
  };
}

export interface Content {
  Id: string;
  ErrorCode: string;
  HasError: boolean;
  ProviderType: string;
  UpdatedTime: string;
  Title: string;
  OriginalTitle: string;
  CategoryId: string;
  ExternalCategoryId: string;
  VendorId: string;
  VendorName: string;
  VendorDisplayName: string;
  VendorScore: number;
  BrandId: string;
  BrandName: string;
  TaobaoItemUrl: string;
  ExternalItemUrl: string;
  MainPictureUrl: string;
  StuffStatus: string;
  Volume: number;
  Price: {
    OriginalPrice: number;
    MarginPrice: number;
    OriginalCurrencyCode: string;
    ConvertedPriceList: {
      Internal: {
        Price: number;
        Sign: string;
        Code: string;
      };
      DisplayedMoneys: {
        Price: number;
        Sign: string;
        Code: string;
      }[];
    };
    ConvertedPrice: string;
    ConvertedPriceWithoutSign: string;
    CurrencySign: string;
    CurrencyName: string;
    IsDeliverable: boolean;
    DeliveryPrice: {
      OriginalPrice: number;
      MarginPrice: number;
      OriginalCurrencyCode: string;
      ConvertedPriceList: {
        Internal: {
          Price: number;
          Sign: string;
          Code: string;
        };
        DisplayedMoneys: {
          Price: number;
          Sign: string;
          Code: string;
        }[];
      };
    };
    OneItemDeliveryPrice: {
      OriginalPrice: number;
      MarginPrice: number;
      OriginalCurrencyCode: string;
      ConvertedPriceList: {
        Internal: {
          Price: number;
          Sign: string;
          Code: string;
        };
        DisplayedMoneys: {
          Price: number;
          Sign: string;
          Code: string;
        }[];
      };
    };
    PriceWithoutDelivery: {
      OriginalPrice: number;
      MarginPrice: number;
      OriginalCurrencyCode: string;
      ConvertedPriceList: {
        Internal: {
          Price: number;
          Sign: string;
          Code: string;
        };
        DisplayedMoneys: {
          Price: number;
          Sign: string;
          Code: string;
        }[];
      };
    };
    OneItemPriceWithoutDelivery: {
      OriginalPrice: number;
      MarginPrice: number;
      OriginalCurrencyCode: string;
      ConvertedPriceList: {
        Internal: {
          Price: number;
          Sign: string;
          Code: string;
        };
        DisplayedMoneys: {
          Price: number;
          Sign: string;
          Code: string;
        }[];
      };
    };
  };
  MasterQuantity: number;
  Pictures: any[]; // type not specified in provided data
  SaleMode: any; // type not specified in provided data
}

export interface Response {
  ErrorCode: string;
  SubErrorCode: any;
  RequestId: string;
  RequestTime: number;
  Result: Result;
}
