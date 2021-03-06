import React from "react";
import RecipeCard from "../../components/RecipeCard"

function HomePage() {
  
  const recipes = [
      {
          id: 1,
          name: "Raclette",
          description:
          "Quel fromage choisir pour la raclette ? Il n’existe pas qu’une sorte de fromage à raclette, si vous regardez bien, vous en trouverez de Savoie, de Suisse (Valais), nature, fumé, à la moutarde…",
      },
      {
          id: 2,
          name: "Tartiflette",
          description:
          "La tartiflette est un gratin de pommes de terre et d'oignons sur lequel on fait fondre du reblochon, un fromage originaire des Pays de Savoie et fabriqué dans les Aravis et le Val d'Arly.",
      },
      {
          id: 3,
          name: "Couscous",
          description:
          "Le couscous est d'une part une semoule de blé dur préparée à l'huile d'olive et d'autre part, une spécialité culinaire issue de la cuisine berbère, à base de couscous, de légumes, d'épices, d'huile d'olive, et de viande ou de poisson.",
      },
      {
          id: 4,
          name: "Cassoulet",
          description:
          "Le cassoulet est une spécialité régionale du Languedoc, à base de haricots secs, généralement blancs, et de viande. À son origine, il était à base de fèves. Le cassoulet tient son nom de la cassole en terre cuite émaillée fabriquée à Issel.",
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
