import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

const setDevEnvironment = () => {
    console.log("Environment is 'development'")
    configDotenv({
        path: resolve(__dirname, "../.env.development")
    })
}

configDotenv();

switch (process.env.NODE_ENV) {
    case "development":
        setDevEnvironment();
        break
    case "test":
        configDotenv({
            path: resolve(__dirname, "../.env.test")
        })
        break
    default:
        // throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
        setDevEnvironment();
}


export interface IProcessEnv {
    GRAPHQL_API_URL: string;
    PORT_NUMBER: number;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv { }
    }
}

export const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL!;