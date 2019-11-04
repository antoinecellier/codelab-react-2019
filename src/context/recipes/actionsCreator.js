export const sideActions = {
    LIST_LOADED: 'LIST_LOADED',
    CURRENT_LOADED: 'CURRENT_LOADED',
}

const lastName = '<votre nom>'

const actionsCreator = (dispatch) => ({
    list: async () => {
        const response = await fetch(`http://react-19-20.cleverapps.io/${lastName}/recettes`)
        const list = await response.json()
        dispatch({
            type: sideActions.LIST_LOADED,
            payload: list,
        })
    },
    get: async (id) => {
        const response = await fetch(`http://react-19-20.cleverapps.io/${lastName}/recettes/${id}`)
        const recipe = await response.json()
        dispatch({
            type: sideActions.CURRENT_LOADED,
            payload: recipe,
        })
    },
    post: async (recipe) => {
        const response = await fetch(
            `http://react-19-20.cleverapps.io/${lastName}/recettes/${recipe.id}`, 
            {
                method: 'PUT',
                body: JSON.stringify(recipe),
                headers: { 'content-type': 'application/json' }
            })
        const recipeUploaded = await response.json()
        dispatch({
            type: sideActions.CURRENT_LOADED,
            payload: recipeUploaded,
        })
    },
})

export default actionsCreator