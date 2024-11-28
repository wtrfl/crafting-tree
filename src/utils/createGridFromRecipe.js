
import replacements from './replacements.json';
import index from './file_index.json'

function ensureNineItems(array) {
    while (array.length < 9) {
        array.push("");
    }
    return array.slice(0, 9);
}

export default async function createGridFromRecipe(item) {

    let result = null;

    try {

        const path = '../data/recipes/' + item

        await fetch(path)
            .then((response) => response.json())
            .then((json) => {
                if (json.type === "minecraft:crafting_shapeless") {
                    result = ensureNineItems(json.ingredients.map(item => {
                        if (item in replacements) return replacements[item]
                        return item.split(':')[1]
                    }))
                } else if (json.type === "minecraft:crafting_shaped") {
                    let keys = json.key

                    for (const item in keys) {
                        if (keys[item] in replacements) { keys[item] = replacements[keys[item]] }
                        else if (Array.isArray(keys[item])) { keys[item] = keys[item][0].split(':')[1] }
                        else { keys[item] = keys[item].split(':')[1] }
                    } 

                    const pattern = json.pattern;

                    result = ensureNineItems(pattern
                        .flatMap(str => str.padEnd(3, " ").split(""))
                        .map(str => {
                            if (str in keys) return keys[str]
                            return ""
                        }))

                }
            })
        
    } catch (e) {
        result = false;
    } finally {
        return result
    }

    

}