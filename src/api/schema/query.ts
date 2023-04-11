import { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { authors, books } from "./data";

export const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: GraphQLNonNull(GraphQLInt)
        },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(
                    author => author.id === book.authorId
                )
            }
        }
    })
})


export const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This is an author of a book",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

export const BookRootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query for Top Level",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "List of all Books",
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: () => authors
        },
        book: {
            type: BookType,
            description: "A single book",
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        author: {
            type: AuthorType,
            description: "A single author",
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        }
    })
})



