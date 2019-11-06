summary: Codelab React 2019
id: codelab-react-2019
categories: front-end
tags: react
status: Published 
authors: Antoine CELLIER

# React
<!-- ------------------------ -->
## Prérequis 

### Pour faire ce codelab, vous avez besoin des outils suivants :

- GIT
- NodeJS 10.x ou >
- un IDE (Visual Studio Code ou Webstorm...)

```
git clone -b step-2 https://github.com/antoinecellier/codelab-react-2019
cd codelab-react-2019
npm install # yarn
npm run start # yarn start
```

Quelques liens qui pourraient vous être utiles tout au long de ce codelab :
- [Documentation des hooks React](https://fr.reactjs.org/docs/hooks-intro.html)
- [Documentation de l'API Context React](https://fr.reactjs.org/docs/context.html#___gatsby)
- [Documentation de React router](https://reacttraining.com/react-router/)

<!-- ------------------------ -->
## Contexte des recettes

Nous allons développer une application de gestion de recettes.

Chaque recette contiendra les données suivantes :
- Un id (`id`)
- Un titre (`name`)
- Une description (`description`)
- Une liste d'ingrédients (`ingredients`)

Nous pourrons consulter et modifier des recettes.

Dans un premier temps vous allez créer un contexte qui va contenir les données des recettes. Ensuite ce contexte pourra être consommé n'importe où dans votre arbre de composants.

Créez un contexte pour consulter les recettes en effectuant les étapes suivantes :


#### Dans le fichier `src/context/recipes/index.js`

Créez un nouveau `context`:

```js
export const RecipesContext = createContext()
```

Déplacez la variable `recipes` du composant `Home` dans ce fichier.
```js
const recipes = [ ... ]
```

Puis créez le `Provider` du context, et passez la variable `recipes` à la props value du `Provider`:

```js
export const RecipesProvider = ({ children }) => {  
    return (
        <RecipesContext.Provider value={recipes}>
            {children}
        </RecipesContext.Provider>
    )
}
```


#### Dans le fichier `src/App.js`, 

Importez `RecipesProvider` et wrappez le composant `Switch` avec celui ci :

```js
import { RecipesProvider } from "./context/recipes/index"
...
    <RecipesProvider>
        <Switch>
            ...
        </Switch>
    </RecipesProvider>
```


#### Dans le fichier `src/pages/home/index.js` 

Vous pouvez enfin consommer votre contexte :

```js
import { RecipesContext } from '../../context/recipes/index'
...
<RecipesContext.Consumer>
    {context => context.map((item, index) => <RecipeCard item={item} key={item.id} />)}
</RecipesContext.Consumer>
```

A la fin de ce TP vous affichez la liste des recettes seulement grâce aux données du contexte `recipes`.

<!-- ------------------------ -->
## Consommer un contexte grâce aux hooks

Continuez avec votre code ou récupérez la branche `git checkout step-3`.

Dans ce TP vous allez utiliser les `hook` afin de consommer plus facilement un contexte dans un composant. 
L'objectif est de ne plus utiliser le composant `<RecipesContext.Consumer />` grâce au hook `useContext`.

#### Dans le fichier `src/context/recipes/index.js` 

Créez le hook suivant:

```js
export const useRecipesContext = () => useContext(RecipesContext)
```


#### Dans le fichier `src/pages/home/index.js`

Retirez le composant `<RecipesContext.Consumer />`. Puis utilisez le hook que vous venez de créez pour récupérer le context.

```js
  import { useRecipesContext } from '../../context/recipes/index'
  
  ...

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
```

<!-- ------------------------ -->
## Récupèrer les recettes de manière asynchrone

Continuez avec votre code ou récupérez la branche `git checkout step-4`.

A partir d'ici vous pouvez consulter la liste des recettes à partir d'une variable stockée dans le contexte `recipes`.
Maintenant l'objectif est de récupérer des données sur un service pour les afficher dans votre application.

Le service est disponible à cette url: `http://react-19-20.cleverapps.io/${lastName}/recettes`
La variable `lastName` devra être votre nom de famille. Cela permet d'avoir vos propres données.

#### Dans le fichier `src/context/recipes/actionsCreator.js`

Déclarez une action qui sera dispatchée une fois les données récupérées :

```js
export const sideActions = {
    LIST_LOADED: 'LIST_LOADED'
}
```

Créez l'action permettant de récupérer la liste des recettes (n'oubliez pas de mettre à jour la variable `lastName`) :

```js
const lastName = '<votre nom>'

const actionsCreator = (dispatch) => ({
    list: async () => {
        // Appel asynchrone au service pour récupérer la liste des recettes
        const response = await fetch('http://react-19-20.cleverapps.io/${lastName}/recettes')
        const list = await response.json()
        // Une fois la liste récupérée, vous dispatchez une action qui contient la liste des recettes
        dispatch({
            type: sideActions.LIST_LOADED,
            payload: list,
        })
    }
})
```


#### Dans le fichier `src/context/recipes/index.js`

Déclarez un état initial pour le contexte et supprimez la variable `recipes` qui contient la liste en "dur":

```js
const initialState = {
  list: [],
}
```

Créez un reducer qui va permettre de mettre à jour les données du contexte quand une action est dispatchée :  

``` js
function reducer(state, action) {
    switch (action.type) {
        case sideActions.LIST_LOADED:
            return { ...state, list: action.payload }
        default:
            return state
    }
}
```

Pour finir l'objectif est de rendre disponible vos actions et vos états depuis le contexte `recipes` en utilisant le hook `useReducer` et votre fonction `actionsCreator`.

Pour cela vous devez modifier l'implémentation de `RecipesProvider`: 

```js
export const RecipesProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = actionsCreator(dispatch)

    return (
        <RecipesContext.Provider value={{ state, actions }}>
            {children}
        </RecipesContext.Provider>
    )
}
```


#### Dans le fichier `src/pages/home/index.js`

Vous venez d'ajouter les actions dans le contexte `recipes`. Il faut donc changer la manière dont vous récupérez la liste des recettes.

En plus de l'état vous pouvez récupérez les actions du contexte :
```js
const { state, actions } = useRecipesContext()
```

A présent l'objectif est de récupérer la liste des recettes quand le composant est initialisé, pour cela vous pourrez utiliser le hook `useEffect` et exécuter l'action `actions.list()`.

```js
useEffect(() => {
    if (!state.list.length) actions.list()
}, [actions, state])

return (
    <section className="SectionComponent hero section is-block is-relative">
        <div className="container">
            <div className="columns is-centered is-variable is-4 is-multiline">
                {state.list.map(item => <RecipeCard item={item} key={item.id} />)}
            </div>
        </div>
    </section>
);
```

`if (!state.list.length)` permet d'exécuter l'action seulement si le tableau de recettes est encore vide.

L'application doit maintenant afficher trois recette: Recette 1, Recette 2, Recette 3.

<!-- ------------------------ -->
## Modifier une recette

Continuez avec votre code ou récupérez la branche `git checkout step-5`.

L'objectif de cette partie est de récupérer une recette grâce au service `http://react-19-20.cleverapps.io`, afficher ces données dans le formulaire (`src/pages/recipeDetail/index.js`), et modifier la recette.

#### Attention il y a moins de directives pour ce TP, vous pourrez reprendre la même logique que le TP précédent.

Dans un premier temps vous allez devoir récupérer une recette grâce à cette url: 
`http://react-19-20.cleverapps.io/${lastName}/recettes/${id}`

L'application utilise la libraire `react-router-dom` qui met à disposition le hook `useParams` pour récupérer les paramètres de la route courante. Ici le paramètre `id` va être utilisé pour récupérer l'`id` de la recette courante.

```js
import { useParams } from 'react-router-dom'
...
const { id } = useParams()
```

### Dans le composant `src/pages/recipeDetail/index.js`

Vous allez pouvoir gérer les données du formulaire en utilisant l'état local, grâce au hook `useState`:
```js
const [recipe, setRecipe] = useState(currentRecipe)

...
<input 
    className="input" 
    type="text" 
    value={recipe.name} 
    onChange={(e) => setRecipe({...recipe, name: e.target.value})} 
    placeholder="Nom de la recette" 
/>
```


Deux actions utilisateur vont être possibles:

- Enregistrer la recette, toujours en utilisant le service REST fourni:

```js
await fetch(`http://react-19-20.cleverapps.io/${lastName}/recettes/${recipe.id}`, 
{
    method: 'PUT',
    body: JSON.stringify(recipe),
    headers: { 'content-type': 'application/json' }
})
```

- Réinitialiser les données du formulaire avec les données du context grâce au bouton `Reset`


<!-- ------------------------ -->
## Ajouter des ingrédients à une recette

Continuez avec votre code ou récupérez la branche `git checkout step-6`.


Maintenant que vous pouvez modifier le nom et la description de vos recettes, il reste à gérer les ingrédients.

L'objectif de cette partie est de récupérer la liste des ingrédients partir de cette url: `http://react-19-20.cleverapps.io/${lastName}/ingredients`, de les afficher dans le select du formulaire et de pouvoir les ajouter à une recette.   

Dans un premier temps vous devez créez un nouveau context pour récupèrer la liste des ingrédients: `src/context/ingredients`
N'hésitez pas à reprendre ce que vous avez fait pour les recettes. 

Une fois la liste des ingrédients récupèré vous devez les afficher dans le `select` du formulaire comme ceci:

```js
const [ingredientSelected, setIngredientSelected] = useState('')

...

<select value={ingredientSelected} onChange={(e) => setIngredientSelected(e.target.value)}>
    <option defaultValue></option>
    {ingredientsList.map(ingredient => (
        <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
    ))}
</select>
```

En cliquant sur le bouton `Ajouter un ingrédient`, l'ingrédient selectionnez sera ajouté à la liste en dessous du select.
Cette liste devra afficher le nom de l'ingrédient, pour cela vous pouvez mettre en place un selecteur qui va permettre de récupérer un ingrédient (`{ name: 'Recette 1', id: 1 }`) par rapport à son `id`:

Dans le fichier `src/context/ingredients/selectors.js` ajoutez ce code:
```js
const getIngredientById = (state) => (id) => {
    return state.list.find((ingredient) => ingredient.id === id)
}

export default (state) => ({
    getIngredientById: getIngredientById(state)    
})
```

Il faut maintenant mettre ce selecteur dans le contexte `ingredients`. 
Dans le fichier `src/context/ingredients/index.js` :

```js
import selectorsCreator from './selectors'

...
export const IngredientsProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = actionsCreator(dispatch)
    const selectors = selectorsCreator(state) // création des selecteurs

    return (
        <IngredientsContext.Provider value={{ state, actions, selectors }}>
            {children}
        </IngredientsContext.Provider>
    )
}
```

Le selecteur est maintenant disponible depuis vos composants:
```js
  const { state, actions, selectors } = useIngredientsContext()
```

Il ne reste plus qu'à gérer la modification d'une recette en prenant en compte la liste des ingrédients ajoutés.
