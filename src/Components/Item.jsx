
import { useHoverContext } from "../utils/HoverContext";
import { memo } from "react";
import index from '../utils/file_index.json';

const Item = (({ item, topLevel = false }) => {

    const { hoverValue, setHoverValue } = useHoverContext();

    const handleMouseEnter = () => {
        if (hoverValue !== item.recipeUsed) {
          setHoverValue(item.recipeUsed); // Only update if the value is different
        }
      };
    const handleMouseLeave = () => setHoverValue(false);
    
    if (!item.ingredients || item.ingredients.length === 0) return (
        <li className={topLevel ? 'top-level' : ''} >
            <div onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
                <img src={`icon/minecraft_${item.item}.png`} alt={item.item} />
                <span>{item.count}</span>
            </div>
        </li>
    )

    return (
        <li className={topLevel ? 'top-level' : ''} >
            <div onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
                <img src={index[item.item].icon} alt={item.item} />
                <span>{item.count}</span>
            </div>
            <ul>{item.ingredients.map(ingredient => <Item item={ingredient} />)}</ul>
        </li>
    )
})

export default Item;