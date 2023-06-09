import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
//...

export const Sanityclient = createClient({
  projectId: "3ddr4ljd",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
  token:
    "skBecSyaQDbQNiwakMSC3mneC4VZdhDyDIK3LKk5iriqgg2msQmaX1Y4jBLRBv57hOYBPwqGtwGa6Ze7LyXVgdxMwA5ZNLb5B0yFAzn6olg3HiqqnQvqLRYvVt9NbAPkLgznqSVXH8BJa7gsi2yFtVeCZ2wMedsZof4yJrbXn6YFxQB2dVDe",
});

const builder = imageUrlBuilder(Sanityclient);

export const urlfor = (source) => builder.image(source);
