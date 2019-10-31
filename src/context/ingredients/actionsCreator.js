export const sideActions = {
    LIST_LOADED: 'LIST_LOADED',
}

const actionsCreator = (dispatch) => ({
    list: async () => {
        const response = await fetch('http://react-19-20.cleverapps.io/antoine/ingredients')
        const list = await response.json()
        return dispatch({
            type: sideActions.LIST_LOADED,
            payload: list,
        })
    },
})

export default actionsCreator