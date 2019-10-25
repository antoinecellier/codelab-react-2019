import React, { useReducer, createContext, useContext } from 'react'
import actionsCreator, { actions } from './actionsCreator'

export const RecipesContext = createContext()

export const useRecipesContext = () => useContext(RecipesContext)

const recipes = [
    {
        id: 1,
        title: "Raclette",
        body:
        "Quel fromage choisir pour la raclette ? Il n’existe pas qu’une sorte de fromage à raclette, si vous regardez bien, vous en trouverez de Savoie, de Suisse (Valais), nature, fumé, à la moutarde…",
    },
    {
        id: 2,
        title: "Tartiflette",
        body:
        "La tartiflette est un gratin de pommes de terre et d'oignons sur lequel on fait fondre du reblochon, un fromage originaire des Pays de Savoie et fabriqué dans les Aravis et le Val d'Arly.",
    },
    {
        id: 3,
        title: "Couscous",
        body:
        "Le couscous est d'une part une semoule de blé dur préparée à l'huile d'olive et d'autre part, une spécialité culinaire issue de la cuisine berbère, à base de couscous, de légumes, d'épices, d'huile d'olive, et de viande ou de poisson.",
    },
    {
        id: 4,
        title: "Cassoulet",
        body:
        "Le cassoulet est une spécialité régionale du Languedoc, à base de haricots secs, généralement blancs, et de viande. À son origine, il était à base de fèves. Le cassoulet tient son nom de la cassole en terre cuite émaillée fabriquée à Issel.",
    }
]

export const RecipesProvider = ({ children }) => {  
    return (
        <RecipesContext.Provider value={recipes}>
            {children}
        </RecipesContext.Provider>
    )
}