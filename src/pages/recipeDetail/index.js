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
                  <option defaultValue></option>
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

          {/* Liste des ingrédients */}
          <div className="field">
            <h3>Liste des ingrédients :</h3>
            <ul>
              <li key="1">Pommes de terre</li>
              <li key="2">Tomates</li>
            </ul>
          </div>
          <hr />

          <div className="field is-grouped">
            <div className="control">
              <button className="button reset">Annuler les changements</button>
              <button className="button is-success">Enregistrer</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RecipeDetail;
