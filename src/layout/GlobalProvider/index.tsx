import { PropsWithChildren } from "react";
import QueryProvider from "./Query";

const GlobalLayout = async ({ children }: PropsWithChildren) => {
    return (
        <QueryProvider>{children}</QueryProvider>
    )
}

export default GlobalLayout;