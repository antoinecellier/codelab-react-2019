import React from "react";
import RecipeCard from "../../components/RecipeCard"
import { RecipesContext } from '../../context/recipes/index'

function HomePage() {
  return (
    <section className="SectionComponent hero section is-block is-relative">
      <div className="container">
        <div className="columns is-centered is-variable is-4 is-multiline">
          <RecipesContext.Consumer>
            {context => context.map((item, index) => <RecipeCard item={item} key={index} />)}
          </RecipesContext.Consumer>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
