import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello World 👋🌎';
  }

  @Query(() => String)
  info() {
    return 'A Base Graphql API Template, bootstrap w/ create-ts-api';
  }
}
