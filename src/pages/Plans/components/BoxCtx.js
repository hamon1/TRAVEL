import { createContext, useState } from "react";

const BoxCtx = createContext();

export function BoxCtxProvider({children}) {
    const [boxes, setBoxes] = useState([]);
    const BoxInsert = ({id, text}) => {
        const box = {
            id,
            text,
        };
        setBoxes([box, ...boxes]);
    };

    return (
        <BoxCtxProvider value={{boxes, BoxInsert}}>
            {children}
        </BoxCtxProvider>
    );
}

export default BoxCtx;