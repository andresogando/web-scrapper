import { DynamoDB } from "aws-sdk";
import { JobSchema } from "../../common";

const createTableInput = { ...JobSchema };

export const tableCreate = async (connection: DynamoDB) => {
  return await connection.createTable(createTableInput, (err, data) => {
    if (err) throw err;
    console.log("Table Created: ", data);
    return data;
  });
};
