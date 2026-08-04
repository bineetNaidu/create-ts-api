import { Arg, Query, Resolver } from 'type-graphql';
import { ValidationError } from '@/lib/errors/ValidationError.js';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello World 👋🌎';
  }

  /**
   * Example query demonstrating how to perform input validation
   * and throw custom application/GraphQL error classes (e.g., ValidationError).
   */
  @Query(() => String)
  greeting(@Arg('name', () => String, { nullable: true }) name?: string) {
    if (name !== undefined && name.trim() === '') {
      throw new ValidationError('Name argument cannot be empty');
    }
    return `Hello, ${name || 'World'}! 👋🌎`;
  }

  @Query(() => String)
  info() {
    return 'A Base Graphql API Template, bootstrap w/ create-ts-api';
  }
}
