import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { authors, books } from "./data";
import { AuthorType, BookType } from "./query";


export const BookRootMutationType = new GraphQLObjectType({
    name: "BookMutation",
    description: "Rook mutation for books",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book to library",
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: GraphQLNonNull(GraphQLInt)
                },
            },
            resolve: (parent, args) => {
                const book = {
                    id: books.length + 1,
                    name: args.name,
                    authorId: args.authorId
                }
                books.push(book);
                return book;
            }
        },
        addAuthor: {
            type: AuthorType,
            description: "Add an author to library",
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (parent, args) => {
                const author = {
                    id: authors.length + 1,
                    name: args.name,
                }
                authors.push(author);
                return author;
            }
        }
    })
})