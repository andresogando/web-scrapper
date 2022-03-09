import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";
import { uuid } from "uuidv4";

export const composeJob = ({
  Title,
  Company,
  Location,
  Listdate,
  Description,
  Experience,
}): PutItemInputAttributeMap => {
  const job = {
    id: {
      S: uuid(),
    },
    title: {
      S: Title,
    },
    company: {
      S: Company,
    },
    address: {
      S: Location,
    },
    listdate: {
      S: Listdate,
    },
    description: {
      S: Description,
    },
    experience: {
      S: Experience,
    },
  };
  return job;
};
