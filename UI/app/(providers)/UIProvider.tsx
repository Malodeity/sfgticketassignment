"use client";

import { NextUIProvider } from "@nextui-org/react";
import { FC, ReactNode } from "react";

interface NextUIProviderProps {
    children: ReactNode;
}

const UIProvider: FC<NextUIProviderProps> = ({ children }) => {
    return <NextUIProvider>{children}</NextUIProvider>
};

export default UIProvider;