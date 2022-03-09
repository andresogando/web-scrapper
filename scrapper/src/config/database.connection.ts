import * as AWS from "aws-sdk";
// import { tableCreate } from "../utils/functions";

let connection: AWS.DynamoDB;
export const createDatabaseConnection = async () => {
  try {
    if (connection) {
      return connection;
    }

    AWS.config.loadFromPath(__dirname + "/../../awsconfig.json");
    connection = await new AWS.DynamoDB({});

    /** Activate for first use to create table on my aws account {already created and populated with data} */
    // await tableCreate(connection);

    console.log("Connected!");

    return connection;
  } catch (err) {
    throw err;
  }
};
