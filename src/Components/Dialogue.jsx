import React from 'react'
import CraftingGrid from './CraftingGrid';

export default function Dialogue({ dialogue, setDialogue }) {
    if (!dialogue.open) return null;

    const handleResolve = (choice) => {
        dialogue.resolve(choice)
        setDialogue({ open: false, target: null, choices: [], resolve: null })
    }

    return (
        <div className="dialogue-overlay">
            <div className="dialogue">
                <div className="header">
                    <span>How will you craft <code>{dialogue.target}</code>?</span>
                </div>
                <div className="recipe-row">
                    {dialogue.choices.map(choice => (
                        <div className="inline-crafting-grid" onClick={() => handleResolve(choice)}>
                            <CraftingGrid item={choice} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
