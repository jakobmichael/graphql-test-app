import "./envs";
import express from "express";
import { graphqlHTTP } from "express-graphql"
import { helloWorldSchema } from "./api/schema/schema";
import { bookSchema } from "./api/schema/schema";
import { env } from "process";

const app = express();

const PORT_NUMBER = env.PORT_NUMBER;

const GRAPHQL_API_URL = env.GRAPHQL_API_URL;


app.use(GRAPHQL_API_URL + "/helloWorld", graphqlHTTP({
    schema: helloWorldSchema,
    graphiql: true,
}));


app.use(GRAPHQL_API_URL + "/library", graphqlHTTP({
    schema: bookSchema,
    graphiql: true,
}));

app.listen(PORT_NUMBER, () => console.log(`Server is running at http://localhost:${PORT_NUMBER} ${GRAPHQL_API_URL}`));
