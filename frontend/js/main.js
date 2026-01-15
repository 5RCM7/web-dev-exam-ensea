// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getAllRecipes, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
// Cette fonction est appelée automatiquement au chargement de la page
// Elle charge et affiche toutes les recettes

document.addEventListener("DOMContentLoaded", () => {
	// console.log("Application chargée")
	loadRecipes()
	setupEventListeners()
})

// ============================================
// CHARGER ET AFFICHER LES RECETTES
// ============================================
// Cette fonction est fournie comme EXEMPLE de référence
// Étudiez-la pour comprendre le pattern async/await et le flow de données

const loadRecipes = async () => {
	try {
		// 1. Appeler l'API pour récupérer toutes les recettes
		const recipes = await getAllRecipes()

		// console.log("Recettes chargées:", recipes)

		// 2. Afficher les recettes dans la grid
		displayRecipes(recipes)
	} catch (error) {
		console.error("Erreur lors du chargement des recettes:", error)
		alert(
			"Impossible de charger les recettes. Vérifiez que le serveur est démarré."
		)
	}
}

// ============================================
// AFFICHER LES RECETTES DANS LA GRID
// ============================================
// Fonction fournie - génère le HTML pour toutes les recettes

const displayRecipes = (recipes) => {
	// Récupérer le conteneur où afficher les recettes
	const recipesContainer = document.getElementById("recipes-container")

	// Vider le conteneur avant d'ajouter les nouvelles recettes
	clearRecipesList(recipesContainer)

	// Si aucune recette, afficher un message
	if (recipes.length === 0) {
		recipesContainer.innerHTML = `
			<div class="col-12">
				<div class="alert alert-info text-center" role="alert">
					Aucune recette disponible. Ajoutez-en une !
				</div>
			</div>
		`
		return
	}

	// Générer et afficher chaque recette
	recipes.forEach((recipe) => {
		const cardHTML = renderRecipeCard(recipe)
		recipesContainer.innerHTML += cardHTML
		console.log("Recette:", recipe)
	})
}

// ============================================
// CONFIGURATION DES EVENT LISTENERS
// ============================================

const setupEventListeners = () => {
	// Event listener pour le formulaire d'ajout de recette
	const addRecipeForm = document.getElementById("addRecipeForm")

	if (addRecipeForm) {
		addRecipeForm.addEventListener("submit", handleAddRecipe)
	}
}

// ============================================
// AJOUTER UNE NOUVELLE RECETTE
// ============================================
// TODO: Compléter cette fonction pour gérer l'ajout d'une recette
// Cette fonction est appelée quand l'utilisateur soumet le formulaire dans le modal

export const handleAddRecipe = async (event) => {
	// TODO 1: Empêcher le rechargement de la page
	// Conseil: utilisez event.preventDefault()
	event.preventDefault()

	try {
		// TODO 2: Récupérer les valeurs des champs du formulaire
		// Les IDs des champs sont: recipeName, recipeIngredients, recipeInstructions, recipePrepTime
		// Conseil: utilisez document.getElementById('id').value

		const name = document.getElementById('recipeName').value
		const ingredientsText = document.getElementById('recipeIngredients').value
		const instructions = document.getElementById('recipeInstructions').value
		const prepTime = parseInt(document.getElementById('recipePrepTime').value, 10)
		const imageUrl = document.getElementById('imageUrl').value

		// Convertir les ingrédients (texte avec retours à la ligne) en tableau
		const ingredients = ingredientsText.split('\n').filter(line => line.trim() !== '').map(line => line.trim())

		// TODO 3: Créer un objet recette avec les données récupérées
		const newRecipe = {
			name,
			ingredients,
			instructions,
			prepTime
		}

		// Ajouter l'image si fournie
		if (imageUrl) {
			newRecipe.image = imageUrl
		}

		// TODO 4: Appeler l'API pour créer la recette
		// Conseil: utilisez await createRecipe(newRecipe)
		await createRecipe(newRecipe)

		// TODO 5: Fermer le modal après la création
		// Conseil: Bootstrap fournit une instance de modal accessible via:
		// const modal = bootstrap.Modal.getInstance(document.getElementById('addRecipeModal'))
		// modal.hide()
		const modal = bootstrap.Modal.getInstance(document.getElementById('addRecipeModal'))
		modal.hide()

		// TODO 6: Afficher un message de succès
		// Conseil: utilisez alert('Recette ajoutée avec succès!')
		alert('Recette ajoutée avec succès!')

		// TODO 7: Recharger la liste des recettes pour afficher la nouvelle
		// Conseil: appelez la fonction loadRecipes()
		loadRecipes()

		// TODO 8: Réinitialiser le formulaire
		// Conseil: utilisez event.target.reset()
		event.target.reset()
	} catch (error) {
		console.error("Erreur lors de l'ajout de la recette:", error)
		alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.")
	}
}
