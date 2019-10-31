const getIngredientById = (state) => (id) => {
    return state.list.find((ingredient) => ingredient.id === id)
}

export default (state) => ({
    getIngredientById: getIngredientById(state)    
})