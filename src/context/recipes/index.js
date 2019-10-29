import React, { useReducer, createContext, useContext } from 'react'
import actionsCreator, { sideActions } from './actionsCreator'

export const RecipesContext = createContext()

export const useRecipesContext = () => useContext(RecipesContext)

const initialState = {
    list: [],
    current: {
        name: '',
        description: ''
      }
}

function reducer(state, action) {
    switch (action.type) {
        case sideActions.LIST_LOADED:
            return { ...state, list: action.payload }
        case sideActions.CURRENT_LOADED:
            return { ...state, current: action.payload }
        default:
            return state
    }
}

export const RecipesProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = actionsCreator(dispatch)

    return (
        <RecipesContext.Provider value={{ state, actions }}>
            {children}
        </RecipesContext.Provider>
    )
}