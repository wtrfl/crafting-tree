import React, { createContext, useState, useContext } from "react";

const HoverContext = createContext();

export const useHoverContext = () => useContext(HoverContext);

export const HoverProvider = ({ children }) => {
    const [hoverValue, setHoverValue] = useState(false);
    return (
        <HoverContext.Provider value={{ hoverValue, setHoverValue }} >
            {children}
        </HoverContext.Provider>
    )
}