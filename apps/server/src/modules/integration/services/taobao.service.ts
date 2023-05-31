import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
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
        [x: string]: string;
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

  async getItemByTaoId(id: string) {
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

    let images: any = [];
    const items = dom.window.document.querySelectorAll('img');
    for (let i = 0; i < items.length; i++) {
      images.push(items.item(i).src);
    }

    return {
      ...data.Result.Item,
      Images: images,
    };
  }
}
