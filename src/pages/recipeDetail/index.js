import React from "react";
import "./styles.scss";

function RecipeDetail() {
  return (
    <section className="SectionComponent hero section is-block is-relative">
      <div className="container">
        <div className="is-centered">

          {/* Nom de la recette */}
          <div className="field">
            <label className="label">Nom de la recette</label>
            <div className="control">
              <input className="input" type="text" placeholder="Nom de la recette" />
            </div>
          </div>

          {/* Description de la recette */}
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea" placeholder="Description"></textarea>
            </div>
          </div>

          {/* Ajout des ingrédients */}
          <div className="field has-addons">
            <div className="control control-container">
              <div className="select is-fullwidth">
                <select>
                  <option value="Pomme">Pomme</option>
                  <option value="Beurre">Beurre</option>
                  <option value="Farine">Farine</option>
                </select>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-primary">Ajouter un ingrédient</button>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success">Enregistrer</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RecipeDetail;
