import { useEffect, useState } from 'react'
import './App.scss'

import tree from './utils/tree';
import { HoverProvider, useHoverContext } from "./utils/HoverContext";

import Item from './Components/Item';
import Search from './Components/Search';
import HoverCraftingGrid from './Components/HoverCraftingGrid';
import Dialogue from './Components/Dialogue';
import Loader from './Components/Loader';

function App() {
    const [data, setData] = useState(null)
    
    const [targetItem, setTargetItem] = useState("bookshelf");
    const [targetCount, setTargetCount] = useState(1);

    const [dialogue, setDialogue] = useState({ open: false, target: null, choices: [], resolve: null })

    useEffect(() => {
        (async () => {
            setData(null);
            const response = await tree(targetItem, targetCount, setDialogue);
            setData(response);
        })();
    }, [targetItem, targetCount])

    const setTarget = (item, count) => {
        console.log(item, count)
        setTargetItem(item);
        setTargetCount(count);
    }

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    

    return (
        <HoverProvider>
            <div className="react-app" onMouseMove={handleMouseMove}>
                <Search setTarget={setTarget} />
                {!data && (
                    <Loader />
                )}
                { data && (
                    <ul>
                        <Item item={data} topLevel />
                    </ul>
                )}
                <div className="crafting-grid" style={{top: position.y, left: position.x}}>
                    <HoverCraftingGrid pos={position} />
                </div>
                <Dialogue dialogue={dialogue} setDialogue={setDialogue} />
            </div>
        </HoverProvider>
    )
}

export default App
