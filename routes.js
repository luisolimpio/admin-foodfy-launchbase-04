const express = require('express')

const recipes = require('./controllers/recipes')
const data = require('./data.json')

const routes = express.Router()

routes.get("/", function(req, res){
    return res.render("web/index", { recipes: data.recipes })
})
routes.get("/about", function(req, res){
    return res.render("web/about")
})
routes.get("/recipe", function(req, res){
    return res.render("web/recipe", { recipes: data.recipes })
})
routes.get("/recipe/:index", function(req, res){
    const recipeIndex = req.params.index
    return res.render("web/details", { recipe: data.recipes[recipeIndex] })
})

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)


module.exports = routes