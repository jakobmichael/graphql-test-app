import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { BookRootMutationType } from './mutation';
import { BookRootQueryType } from './query';

export const helloWorldSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HelloWorld",
        fields: () => ({
            message: {
                 type: GraphQLString,
                resolve: () => "Hello World"
                }
        })
    })
})

export const bookSchema = new GraphQLSchema({
    query: BookRootQueryType,
    mutation: BookRootMutationType
})


