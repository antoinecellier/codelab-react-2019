import React, { useReducer, createContext, useContext } from 'react'
import actionsCreator, { sideActions } from './actionsCreator'
import selectorsCreator from './selectors'

export const IngredientsContext = createContext()

export const useIngredientsContext = () => useContext(IngredientsContext)

const initialState = {
    list: [],
}

function reducer(state, action) {
    switch (action.type) {
        case sideActions.LIST_LOADED:
            return { ...state, list: action.payload }
        default:
            return state
    }
}

export const IngredientsProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = actionsCreator(dispatch)
    const selectors = selectorsCreator(state)

    return (
        <IngredientsContext.Provider value={{ state, actions, selectors }}>
            {children}
        </IngredientsContext.Provider>
    )
}