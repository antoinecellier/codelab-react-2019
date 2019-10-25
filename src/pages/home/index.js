import React from "react";
import RecipeCard from "../../components/RecipeCard"
import { RecipesContext, useRecipesContext } from '../../context/recipes/index'

function HomePage() {
  const recipesContext = useRecipesContext()
  return (
    <section className="SectionComponent hero section is-block is-relative">
      <div className="container">
        <div className="columns is-centered is-variable is-4 is-multiline">
            {recipesContext.map((item, index) => <RecipeCard item={item} key={index} />)}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
