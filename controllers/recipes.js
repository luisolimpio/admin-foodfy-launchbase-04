const fs = require('fs')

const data = require("../data.json")

exports.index = function(req, res) {
    return res.render("admin/index", { recipes: data.recipes })
}

exports.create = function(req, res) {
    return res.render("admin/create")
}

exports.show = function(req, res) {
    const recipeIndex = req.params.id

    if(recipeIndex >= data.recipes.length) return res.send("Instuctor not Found")

    // const recipe = {
    //     ...data.recipe[recipeIndex],

    // }
    
    return res.render("admin/details", { recipe: data.recipes[recipeIndex] })
}

exports.edit = function(req, res) {
    const recipeIndex = req.params.id

    return res.render("admin/edit", { recipe: data.recipes[recipeIndex] })
}

exports.post = function(req, res) {
    const { image_url, title, author, ingredients, preparation, information } = req.body

    const lastRecipe = data.recipes[data.recipes.length - 1]
    const id = lastRecipe ? lastRecipe.id + 1 : 1

    filteredIngredients = ingredients.filter(function(ingredient) {
        return ingredient != ""
    })
    filteredPreparation = preparation.filter(function(step) {
        return step != ""
    })

    data.recipes.push({
        id,
        image_url,
        title,
        author,
        ingredients: filteredIngredients,
        preparation: filteredPreparation,
        information,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}

exports.put = function(req, res) {
    const recipeIndex = req.body.id
    const { ingredients, preparation } = req.body

    const filteredIngredients = ingredients.filter(function(ingredient) {
        return ingredient != ""
    })
    const filteredPreparation = preparation.filter(function(step) {
        return step != ""
    })

    data.recipes[recipeIndex] = {
        ...data.recipes[recipeIndex],
        ...req.body,
        ingredients: filteredIngredients,
        preparation: filteredPreparation,
        id: Number(req.body.id)
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}

exports.delete = function(req, res) {
    const recipeIndex = req.body.id

    const filteredRecipes = data.recipes.filter(function(recipe) {
        return recipe.id != recipeIndex
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}