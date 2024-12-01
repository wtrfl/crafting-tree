import { useState } from "react";
import index from "../utils/file_index.json"
import ThemedInput from "./ThemedInput";

export default function Search({ setTarget }) {
    const [count, setCount] = useState(64)
    const [item, setItem] = useState("")

    const [autofillResults, setAutofillResults] = useState([]);

    const [focused, setFocused] = useState(false);

    const handleItemInput = (e) => {
        setAutofillResults([]);
        if (e.target.value.trim() !== "") {
            let term = e.target.value.split(" ").join("_");
            const matchingKeys = Object.keys(index).filter(key => key.includes(term)).slice(0, 5);
            setAutofillResults(matchingKeys);
        } 
        setItem(e.target.value)
    }

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setTimeout(() => setFocused(false), 100);

    const submit = () => {
        if (!(item in index)) return;
        if (!Number.isInteger(count) || count < 0) return;
        setTarget(item, count);
    }

    return (
        <div className="search">
            <div className="search-box">
                <ThemedInput
                    value={item}
                    onChange={(e) => handleItemInput(e)} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {autofillResults.length > 0 && focused && (
                    <div className="autofill">
                        {autofillResults.map(term => (
                            <div className="result" onClick={() => setItem(term)}>
                                {index[term].icon && <img src={index[term].icon} />}
                                {!index[term].icon && (<div className='image-placeholder'></div>)}
                                <span>{term}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ThemedInput
                type="number"
                step={1}
                min={1}
                value={count}
                pattern="\d*"
                onChange={(e) => setCount(Math.floor(e.target.value))} 
            />
            <button onClick={() => submit()}>Compute!</button>
        </div>
    )
}