export const sideActions = {
    LIST_LOADED: 'LIST_LOADED'
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
    }
})

export default actionsCreator