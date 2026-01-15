import { Router } from "express"
import {
	createRecipe,
	getRecipeById,
	getRecipes,
	updateRecipe,
} from "../controllers/recipesController.js"

const router = Router()

router.get("/", getRecipes)
router.post("/", createRecipe)
router.get("/:id", getRecipeById)
router.put("/:id", updateRecipe)

export default router
