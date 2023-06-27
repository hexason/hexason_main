import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class TaobaoService {
  apiUrl = 'http://otapi.net/service-json/';

  async fetchApi(
    urn: string,
    {
      params,
    }: {
      params: {
        [x: string]: string | number | boolean;
      };
    },
  ) {
    const query = Object.keys(params || {}).reduce((att, itt) => {
      att += `&${itt}=${params[itt]}`;
      return att;
    }, '');
    const uri = `${this.apiUrl}${urn}?language=khk&blockList=&instanceKey=${process.env.OTAPI_KEY}${query}`;
    const res = await fetch(uri, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  }

  async batchSearchItems(query: string, { page, limit }: { page: number; limit: number }) {
    const search = await this.fetchApi('SearchItemsFrame', {
      params: {
        xmlParameters: `<?xml version="1.0" encoding="UTF-8"?><SearchItemsParameters><Provider>Taobao</Provider><ItemTitle>${query}</ItemTitle></SearchItemsParameters>`,
        framePosition: page,
        frameSize: limit,
      },
    });
    return search.Result;
  }

  async getItemByTaoId(id: string) {
    if (isNaN(+id)) throw { code: '404', message: 'NOT_VALID_ID' };
    const data = await this.fetchApi('BatchGetItemFullInfo', {
      params: {
        itemId: id,
      },
    });
    if (data.ErrorCode !== 'Ok') return null;
    const description = await this.fetchApi('GetItemDescription', {
      params: {
        itemId: id,
      },
    });
    const dom = new JSDOM(description.OtapiItemDescription.ItemDescription);

    const images: any = [];
    const items = dom.window.document.querySelectorAll('img');
    for (let i = 0; i < items.length; i++) {
      images.push(items.item(i).src);
    }

    const Attributes = data.Result.Item.Attributes.reduce((att, itt) => {
      if (!itt.IsConfigurator) return att;
      return {
        ...att,
        [`${itt.Pid}${itt.Vid}]`]: itt,
      };
    }, {});

    const Variations = Object.keys(Attributes).map((key) => ({
      configId: Attributes[key].Pid,
      valueId: Attributes[key].Vid,
      configName: Attributes[key].PropertyName,
      value: Attributes[key].Value,
      icon: Attributes[key].MiniImageUrl,
      mainImage: Attributes[key].ImageUrl,
    }));

    const Items = data.Result.Item.ConfiguredItems.map((conf) => {
      const variations = conf.Configurators.map((el) => {
        const asset = Attributes[`${el.Pid}${el.Vid}]`];
        return {
          configId: el.Pid,
          valueId: el.Vid,
          configName: asset.PropertyName,
          value: asset.Value,
          icon: asset.MiniImageUrl,
          mainImage: asset.ImageUrl,
        };
      });

      return {
        price: conf.Price.ConvertedPriceList.Internal.Price,
        SKU: conf.Id,
        UPC: null,
        stock: conf.Quantity,
        variations,
      };
    });

    return {
      ...data.Result.Item,
      Images: images,
      Items,
      Variations,
    };
  }
}
