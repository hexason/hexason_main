import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class ProductFilterArgs {
  @Field(() => Int, { nullable: true })
  status?: number;
}
@InputType()
export class ProductOptionArgs {
  @Field(() => [SortArgs], { nullable: true })
  sort?: SortArgs[];

  @Field(() => Int, { nullable: true })
  @Min(0)
  skip: number;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(50)
  take: number;
}

@InputType()
export class SortArgs {
  @Field()
  key: string;

  @Field()
  value: string;
}
@ArgsType()
export class ProductListArgs {
  @Field(() => ProductOptionArgs, { nullable: true })
  options?: ProductOptionArgs;

  @Field(() => ProductFilterArgs, { nullable: true })
  filter?: ProductFilterArgs;
}

@ArgsType()
export class ProductFindByIdArgs {
  @Field()
  id: string;
}
