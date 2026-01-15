import { Router } from "express"
import {
	createRecipe,
	deleteRecipe,
	getRecipeById,
	getRecipes,
	searchRecipes,
	updateRecipe,
} from "../controllers/recipesController.js"

const router = Router()

router.get("/", getRecipes)
router.get("/search", searchRecipes)
router.post("/", createRecipe)
router.get("/:id", getRecipeById)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

export default router
