import useSWR, { SWRHook } from "swr";

// @ts-ignore
export const useClientDataSWR: SWRHook = (key, fetch, config) =>
  useSWR(key, fetch, {
    dedupingInterval: 0,
    focusThrottleInterval: 5 * 60 * 1000,
    refreshWhenOffline: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    ...config,
  });

// @ts-ignore
export const useActionSWR: SWRHook = (key, fetch, config) =>
  useSWR(key, fetch, {
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    ...config,
  });
