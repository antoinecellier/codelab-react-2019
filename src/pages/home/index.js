import React from "react";
import RecipeCard from "../../components/RecipeCard"

function HomePage() {
  const recipes = [
    {
      id: 1,
      image: "https://source.unsplash.com/aHrxrT1q2h0/800x600",
      title: "Faucibus turpis in",
      body:
        "Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec.",
      url: "/post/golden-gate"
    },
    {
      id: 2,
      image: "https://source.unsplash.com/BkmdKnuAZtw/800x600",
      title: "Faucibus turpis in",
      body:
        "Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec.",
      url: "/post/beach"
    },
    {
      id: 3,
      image: "https://source.unsplash.com/3XN-BNRDUyY/800x600",
      title: "Faucibus turpis in",
      body:
        "Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec.",
      url: "/post/road"
    },
    {
      id: 4,
      image: "https://source.unsplash.com/eOcyhe5-9sQ/800x600",
      title: "Faucibus turpis in",
      body:
        "Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec.",
      url: "/post/ballons"
    }
  ]
  
  return (
    <section className="SectionComponent hero section is-block is-relative">
      <div className="container">
        <div className="columns is-centered is-variable is-4 is-multiline">

          {/* Liste des recettes */}
          {recipes.map((item, index) => <RecipeCard item={item} key={index} />)}

        </div>
      </div>
    </section>
  );
}

export default HomePage;
