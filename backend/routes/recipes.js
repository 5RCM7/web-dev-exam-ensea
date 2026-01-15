import { Router } from "express"
import {
	createRecipe,
	deleteRecipe,
	getRecipeById,
	getRecipes,
	updateRecipe,
} from "../controllers/recipesController.js"

const router = Router()

router.get("/", getRecipes)
router.post("/", createRecipe)
router.get("/:id", getRecipeById)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

export default router
