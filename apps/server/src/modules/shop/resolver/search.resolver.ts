import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchArg, SearchProductResult } from '../gql/SearchQL';
import { SearchService } from '../services/search.service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchServ: SearchService) {}
  @Query(() => SearchProductResult)
  async searchProducts(@Args('data') data: SearchArg) {
    switch (data.provider) {
      case 'taobao':
        return await this.searchServ.searchFromTaobao(data);
      default:
        return await this.searchServ.searchFromLocal(data);
    }
  }
}
