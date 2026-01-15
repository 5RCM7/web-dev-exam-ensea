import { Router } from "express"
import {
	createRecipe,
	getRecipeById,
	getRecipes,
} from "../controllers/recipesController.js"

const router = Router()

router.get("/", getRecipes)
router.post("/", createRecipe)
router.get("/:id", getRecipeById)

export default router
