import { NextRequest } from "next/server";

export interface AuthContext {
  authorizationHeader?: string | null;
  // FIXME: Add these back when the auth is added
  //   clerkAuth?: ClerkAuth;
  //   jwtPayload?: JWTPayload | null;
  //   nextAuth?: User;
  userId?: string | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export const createContextInner = async (params?: {
  authorizationHeader?: string | null;
  // FIXME: Add these back when the auth is added
  //   clerkAuth?: ClerkAuth;
  //   nextAuth?: User;
  userId?: string | null;
}): Promise<AuthContext> => ({
  authorizationHeader: params?.authorizationHeader,
  // FIXME: Add these back when the auth is added
  //   clerkAuth: params?.clerkAuth,
  //   nextAuth: params?.nextAuth,
  userId: params?.userId,
});

export type Context = Awaited<ReturnType<typeof createContextInner>>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (request: NextRequest): Promise<Context> => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
};
