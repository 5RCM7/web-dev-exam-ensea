// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getOneRecipe, deletOneRecipe } from "./api.js"
import { renderRecipeCard, renderSingleRecipe } from "./ui.js"

const loadRecipe = async (recipeId) => {
	try {
		// Appeler l'API pour récupérer la recette par son ID
		const recipe = await getOneRecipe(recipeId)
		
		const recipeDetail = document.getElementById("recipe-detail")

		// Afficher la recette dans la grid
		recipeDetail.innerHTML = renderSingleRecipe(recipe)
	} catch (error) {
		console.error("Erreur lors du chargement de la recette:", error.message)
		
		// Afficher un message d'erreur dans le conteneur
		const recipeDetail = document.getElementById("recipe-detail")
		const errorMessage = document.getElementById("error-message")
		
		if (recipeDetail) {
			recipeDetail.classList.add("d-none")
		}
		if (errorMessage) {
			errorMessage.classList.remove("d-none")
			document.getElementById("error-text").textContent = 
				"Impossible de charger la recette. Vérifiez que le serveur est démarré."
		}
	}
}

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
// Cette fonction est appelée automatiquement au chargement de la page
// Elle charge et affiche toutes les recettes

const setupEventListeners = () => {
	const loader = document.getElementById("loading-spinner")
	const recipeDetail = document.getElementById("recipe-detail")
	const deleteButton = document.getElementById("delete-recipe-btn")

	if (loader) {
		loader.classList.add("d-none")
	}
	if (recipeDetail) {
		recipeDetail.classList.remove("d-none")
	}

	if (deleteButton) {
		deleteButton.addEventListener("click", handleDeleteRecipe)
	}
}

const handleDeleteRecipe = async () => {
	// Récupérer l'ID de la recette depuis l'URL
	const urlParams = new URLSearchParams(window.location.search)
	const recipeId = urlParams.get("id")

	if (!recipeId) {
		alert("ID de recette introuvable.")
		return
	}

	// Demander confirmation avant de supprimer
	if (!confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
		return
	}

	try {
		await deletOneRecipe(recipeId)
		alert("Recette supprimée avec succès !")
		// Rediriger vers la page d'accueil
		window.location.href = "index.html"
	} catch (error) {
		console.error("Erreur lors de la suppression de la recette:", error)
		alert("Erreur lors de la suppression de la recette. Veuillez réessayer.")
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// receive recipe id from url
	const urlParams = new URLSearchParams(window.location.search)
	const recipeId = urlParams.get("id")
	console.log("API recipeData:", recipeId)
	loadRecipe(recipeId)
	setupEventListeners()
})

// ============================================
// AFFICHER LES RECETTES DANS LA GRID
// ============================================
// Fonction fournie - génère le HTML pour toutes les recettes

const displaySingleRecipe = (recipe) => {
	// Récupérer le conteneur où afficher les recettes
	const recipesDetails = document.getElementById("recipe-detail")

	// Vider le conteneur avant d'ajouter les nouvelles recettes
	clearRecipesList(recipesDetails)

	// Si il n'y a pas de recette, afficher un message
	if (!recipe) {
		recipesDetails.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center" role="alert">
                    Recette non-disponible. Veuillez revenir plus tard !
                </div>
            </div>
        `
		return
	}

	renderSingleRecipe(recipe)
}
