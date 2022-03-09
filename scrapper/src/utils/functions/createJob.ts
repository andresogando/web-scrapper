import { PutItemInput } from "@aws-sdk/client-dynamodb";
import { createDatabaseConnection } from "../../config";

export const createJob = async (jobs: any) => {
  try {
    const connection = await createDatabaseConnection();

    const params: PutItemInput = {
      Item: {
        ...jobs,
      },

      TableName: "Job",
    };

    const addItem = await connection.putItem(params, (err, data) => {
      if (err) console.log(err);
      console.log("Data Added");
      return data;
    });

    return addItem;
  } catch (err) {
    throw err;
  }
};
