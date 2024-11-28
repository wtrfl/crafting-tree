import index from './file_index.json'

import replacements from './replacements.json';

const pick = (choices, target, setDialogue) => {
    return new Promise((resolve) => {
        setDialogue({ open: true, target, choices, resolve })
    })
}

const tree = async(item, count, setDialogue) => {

    let exclusions = ["coal", "iron_ingot", "gold_ingot", "diamond", "emerald",
        "lapis_lazuli", "redstone", "copper_ingot", "amethyst_shard", "wheat",
        "melon_slice", "slimeball", "glowstone_dust", "quartz", "snowball"
    ]
    if (exclusions.includes(item)) return { item: item, count: count }

    // this will have a list of every ingredient this item needs to be crafted
    let ingredients = [];

    let path;

    // pull this item's crafting recipe
    try {

        // create path to recipe data file
        // if the item can be crafted multiple ways, open a dialogue so the user can choose
        if (Array.isArray(index[item].recipe)) {
            const choice = await pick(index[item].recipe, item, setDialogue)
            path = choice
        } else {
            path = index[item].recipe
        }

        console.log(path)

        // fetch and parse the recipe data
        const response = await fetch(path)
        const json = await response.json();

        // determine how many of this recipe we need to create to craft the target item
        let numberOfCraftsNeeded = Math.ceil(count / (json.result.count || 1))

        // use the recipe to determine which ingredients are needed and how many
        if (json.type === "minecraft:crafting_shaped") {

            const pattern = json.pattern;
            let keys = json.key;

            for (const item in keys) {
                if (keys[item] in replacements) { keys[item] = replacements[keys[item]] } else if (Array.isArray(keys[item])) { keys[item] = keys[item][0].split(':')[1] } else { keys[item] = keys[item].split(':')[1] }
            }

            for (const item in keys) {
                const amountInRecipe = pattern
                    .flatMap(str => str.split(""))
                    .filter(char => char === item)
                    .length;
                ingredients.push({
                    item: keys[item],
                    count: amountInRecipe * numberOfCraftsNeeded
                })
            }

        } else if (json.type === "minecraft:crafting_shapeless") {

            const ingredientsFromRecipe = json.ingredients.map(ing => {
                if (ing === "#minecraft:planks") { return "oak_planks" } else { return ing.split(':')[1] }
            })
            ingredients = Object.values(
                ingredientsFromRecipe.reduce((acc, item) => {
                    // Initialize or increment the count for each letter
                    acc[item] = acc[item] || { item, count: 0 };
                    acc[item].count += 1;
                    return acc;
                }, {})
            ).map(item => {
                // Multiply the final count by numberOfCraftsNeeded
                return {...item, count: item.count * numberOfCraftsNeeded };
            });

        }
    } catch (error) {
        // console.log("couldn't find recipe for", item)
        ingredients = false;
        console.log(error)
    }

    // for each ingredient required, iterate this function to find how to craft those items
    let dug = [];
    if (ingredients) {
        for (const ingredient of ingredients) {
            const result = await tree(ingredient.item, ingredient.count, setDialogue);
            dug.push(result);
        }
    }

    // return this object to the tree, either as the tree itself or as an ingredient in the tree
    let object = {
        item: item,
        count: count,
        
    }

    if (ingredients) {
        object.ingredients = dug;
        object.recipeUsed = path;
    }

    return object;

}

export default tree;