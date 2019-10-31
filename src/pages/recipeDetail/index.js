import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipesContext } from "../../context/recipes/index";
import { useIngredientsContext } from "../../context/ingredients/index";
import "./styles.scss";

function RecipeDetail() {
  const { state: { current }, actions } = useRecipesContext()
  const { 
    state: { list: listIngredients  }, 
    actions: ingredientsActions,
    selectors
  } = useIngredientsContext()

  const params = useParams() 

  const [recipe, setRecipe] = useState(current)
  const [ingredients, setIngredients] = useState(current.ingredients)
  const [ingredientSelected, setIngredientSelected] = useState('')

  useEffect(() => {
    if (current.id !== params.id) actions.get(params.id)
    if (!listIngredients.length) ingredientsActions.list()
  }, [current, actions, params.id, listIngredients.length, ingredientsActions])
  

  useEffect(() => {
    setRecipe(current)
    setIngredients(current.ingredients)
  }, [current])

  const addIngredient = (id) => {
    setIngredients([ ...ingredients, selectors.getIngredientById(id)])
  }

  return (
    <section className="SectionComponent hero section is-block is-relative">
      <div className="container">
        <div className="is-centered">

          {/* Nom de la recette */}
          <div className="field">
            <label className="label">Nom de la recette</label>
            <div className="control">
              <input className="input" type="text" value={recipe.name} onChange={(e) => setRecipe({...recipe, name: e.target.value})} placeholder="Nom de la recette" />
            </div>
          </div>

          {/* Description de la recette */}
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea" value={recipe.description} onChange={(e) => setRecipe({...recipe, description: e.target.description})} placeholder="Description"></textarea>
            </div>
          </div>

          {/* Ajout des ingrédients */}
          <div className="field has-addons">
            <div className="control control-container">
              <div className="select is-fullwidth">
                <select 
                  value={ingredientSelected}
                  onChange={(e) => setIngredientSelected(e.target.value)}>
                  <option defaultValue> -- Selectionnez un ingrédient -- </option>
                  {listIngredients.map(ingredient => (
                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="control">
              <button 
                type="submit" 
                className="button is-primary"
                disabled={!ingredientSelected} 
                onClick={() => addIngredient(ingredientSelected)}>
                  Ajouter un ingrédient
                </button>
            </div>
          </div>

          {/* Liste des ingrédients */}
          <div className="field">
              <h3>Liste des ingrédients :</h3>
              <ul>
                {ingredients.map(ingredient => (<li key={ingredient.id}>- {ingredient.name}</li>))}
              </ul>
          </div>
          <hr />
          <div className="field is-grouped">
            <div className="control">
            <button className="button reset" onClick={() => setRecipe(current)}>Annuler les changements</button>
              <button className="button is-success" onClick={() => actions.post({ ...recipe, ingredients })}>Enregistrer</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RecipeDetail;
