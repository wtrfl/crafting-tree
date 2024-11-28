
import craftingGrid from '/crafting-grid.png'

import createGridFromRecipe from "../utils/createGridFromRecipe";
import { useEffect, useState } from "react";

import index from "../utils/file_index.json"


export default function CraftingGrid({item}) {

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        const get = async () => {
            const r = await createGridFromRecipe(item);
            setRecipe(r)
        }
        get();
    }, [])

    return (
        <>
            <img src={craftingGrid} className="bg" />
            <div className="grid">
                {recipe.map(item => {
                    if (item === "") return (<span></span>);
                    return (<img src={`icon/minecraft_${item}.png`} />)
                })}
            </div>
        </>
    )

    
}