import React, { useEffect } from "react";
import RecipeCard from "../../components/RecipeCard"
import { useRecipesContext } from '../../context/recipes/index'

function HomePage() {
  const { state, actions } = useRecipesContext()
  
  useEffect(() => {
    if (!state.list.length) actions.list()
  })

  return (
    <section className="SectionComponent hero section is-block is-relative">
      <div className="container">
        <div className="columns is-centered is-variable is-4 is-multiline">
            {state.list.map((item, index) => <RecipeCard item={item} key={index} />)}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
