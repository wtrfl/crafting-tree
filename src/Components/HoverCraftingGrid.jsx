
import { useHoverContext } from "../utils/HoverContext";
import CraftingGrid from "./CraftingGrid";

export default function HoverCraftingGrid() {

    const { hoverValue } = useHoverContext();

    if (!hoverValue || hoverValue == "") return (null);

    return <CraftingGrid item={hoverValue} />

}