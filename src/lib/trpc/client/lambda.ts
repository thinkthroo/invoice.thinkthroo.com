import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import { ErrorResponse } from "./types";
import { fetchErrorNotification } from "@/components/FetchErrorNotification";
import { LambdaRouter } from "@/server/router/lambda";

const links = [
  httpBatchLink({
    fetch: async (input, init) => {
      const response = await fetch(input, init);
      if (response.ok) return response;

      const errorRes: ErrorResponse = await response.clone().json();

      errorRes.forEach((item) => {
        const errorData = item.error.json;

        const status = errorData.data.httpStatus;
        fetchErrorNotification.error({
          errorMessage: errorData.message,
          status,
        });
      });

      return response;
    },
    maxURLLength: 2083,
    transformer: superjson,
    url: "/trpc/lambda",
  }),
];

export const lambdaClient = createTRPCClient<LambdaRouter>({
  links,
});

export const lambdaQuery = createTRPCReact<LambdaRouter>();

export const lambdaQueryClient = lambdaQuery.createClient({ links });
