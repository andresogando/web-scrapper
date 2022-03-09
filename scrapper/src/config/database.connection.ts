import * as AWS from "aws-sdk";
// import { tableCreate } from "../utils/functions";

let connection: AWS.DynamoDB;
export const createDatabaseConnection = async () => {
  try {
    if (connection) {
      console.log("No connection necessary.");
      return connection;
    }

    AWS.config.loadFromPath(__dirname + "/../../awsconfig.json");
    connection = await new AWS.DynamoDB({});
    // await tableCreate(connection);

    console.log("Connected!");

    return connection;
  } catch (err) {
    throw err;
  }
};
