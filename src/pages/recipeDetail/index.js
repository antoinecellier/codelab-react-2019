import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipesContext } from "../../context/recipes/index";
import "./styles.scss";

function RecipeDetail() {
  const { state: { current }, actions } = useRecipesContext()
  const params = useParams() 

  const [recipe, setRecipe] = useState(current)

  useEffect(() => {
    if (current.id !== params.id) actions.get(params.id)
  }, [current, actions, params.id])

  useEffect(() => {
    setRecipe(current)
  }, [current])

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
                <select>
                  <option value="reblochon">Reblochon</option>
                  <option value="pommes de terre">Pommes de terre</option>
                  <option value="charcuterie">Charcuterie</option>
                  <option value="merguez">Merguez</option>
                  <option value="morbier">Morbier</option>
                  <option value="haricots blanc">Haricots blanc</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">Ajouter un ingrédient</button>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
            <button className="button reset" onClick={() => setRecipe(current)}>Annuler les changements</button>
              <button className="button is-success" onClick={() => actions.post(recipe)}>Enregistrer</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RecipeDetail;
