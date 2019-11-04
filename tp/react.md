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
- un IDE (WebStorm ou Visual Studio Code...)

- Récupérez le répertoire step0 du repository GIT

```
git clone -b step-0 https://github.com/antoinecellier/codelab-react-2019
cd codelab-react-2019
npm install # yarn
# Ou 
git clone https://github.com/antoinecellier/codelab-react-2019
cd codelab-nestjs/corrections/step0 -> TODO: repertoire corrections
npm install # yarn
```

Voici de plus quelques liens qui pourraient vous être utiles tout au long de ce codelab :
- [Documentation des hooks React](https://fr.reactjs.org/docs/hooks-intro.html)
- [Documentation de l'API Context React](https://fr.reactjs.org/docs/context.html#___gatsby)
- [Documentation de React router](https://reacttraining.com/react-router/)

<!-- ------------------------ -->
## Contexte des recettes

Nous allons développer une application de gestion de recettes.

Chaque recette contiendra les données suivantes :
- Un titre
- Une description
- Une liste d'ingrédients

Nous pourrons consulter, ajouter, modifier des recettes.

Créez un premier context pour consulter les recettes en effectuant les étapes suivantes :


#### Dans le fichier `src/context/recipes/index.js`

Créez un nouveau `context`:

```js
export const RecipesContext = createContext()
```

Déplacez la variables `recipes` du composant `Home` dans ce fichier.
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
Duration: 1

Dans ce TP vous allez vous abstraire de l'utilisation du composant `<RecipesContext.Consumer />` grâce au hook `useContext`


#### Dans le fichier `src/context/recipes/index.js` 

Créez le hook suivant:

```js
export const useRecipesContext = () => useContext(RecipesContext)
```


#### Dans le fichier `src/pages/home/index.js`

Retirez le composant `<RecipesContext.Consumer />`. Puis utilisez le hook que vous venez de créez pour récupérer le context.

```js
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

Dans cette partie vous allez récupèrer la liste des recettes sur une API.


#### Dans le fichier `src/context/recipes/actionsCreator.js`

Déclarez une action qui sera dispatché une fois les données récupèré :

```js
export const sideActions = {
    LIST_LOADED: 'LIST_LOADED'
}
```

Créez l'action permetant de récupèrer la liste des recettes :

```js
const actionsCreator = (dispatch) => ({
    list: async () => {
        const response = await fetch('http://react-19-20.cleverapps.io/${lastName}/recettes')
        const list = await response.json()
        return dispatch({
            type: sideActions.LIST_LOADED,
            payload: list,
        })
    }
})
```


#### Dans le fichier `src/context/recipes/index.js`

Déclarez un état initiale pour le contexte et supprimez la variables `recipes` qui contient la liste en "dur":

```js
const initialState = {
  list: [],
}
```

Créez un reducer qui va permettre de rendre immutable le contexte `recipes`: 

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

Vous venez d'ajoutez les actions dans le contexte `recipes`. Il faut donc changer la manière dont vous consommez le contexte: 

```js
const { state, actions } = useRecipesContext()
```

A présent l'objectif est de récupèrer la liste des recettes quand le composant est initialisé, pour cela vous pourrez utiliser le hook `useEffect`.

```js
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
```

`if (!state.list.length)` permet d'exécuter l'action seulement si le tableau de recette est encore vide.



<!-- ------------------------ -->
## Modifier une recette

L'objectif de cette partie est de récupèrer une recette grâce à l'api, afficher ses données dans le formulaire (`src/pages/recipeDetail/index.js`), et modifier la recette.

Dans un premier temps vous allez devoir récupèrer une recette grâce à ce endpoint (`http://react-19-20.cleverapps.io/${lastName}/recettes/${id}`).

Pour cela vous pourrez procèder de la même manière que l'affichage de la liste des recettes. 

L'application utilise la libraire `react-router-dom` qui met à disposition le hook `useParams` pour récupèrer les paramètres de la route courante. Ici le paramètre `id` va être utilisé pour récupèrer l'`id` de la recette courante.

### Dans le composant `src/pages/recipeDetail/index.js`

Vous allez pouvoir gérer les données du formulaire en utilisant l'état local, grâce au `hook`  `useState`.

Deux actions utilisateur vont être possible:

- Enregistrer la recette, toujours en utilisant le service `REST` fourni:

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

Maintenant que vous pouvez modifier le nom de la description de vos recettes, il reste à gérer les ingrédients.

L'objectif de cette partie est de récupèrer la liste des ingrédients grâce à l'api, disponible à partir de ce endpoint: `http://react-19-20.cleverapps.io/${lastName}/ingredients`.  

Ensuitez affichez ces données dans le `select` du formulaire:

```js
{listIngredients.map(ingredient => (
    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
))}
```

En cliquant sur le bouton `Ajouter un ingrédient`, l'ingrédient selectionnez sera ajouté à la liste en dessous du select.
Cette liste devra afficher le nom de l'ingrédient, pour cela vous pouvez mettre en place ce selecteur qui va permettre de récupère un ingrédient (`{ name: 'Recette 1', id: 1 }`) par rapport à son `id`:

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

Il ne reste plus qu'à gérer la mise à jour d'une recette en prenant en compte la liste des ingrédients ajouté.