
const initialState = {
    seller_id: '',
    seller: {},
    category: {},
    category_id: '',
};


const seller = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case 'SELLER':
            return ({
                ...state,
                seller: action.payload
            });
        case 'CATEGORY':
            return ({
                ...state,
                category: action.payload
            });
        case 'CATEGORY_ID':
            return ({
                ...state,
                category: action.payload
            })
        default:
            return state;
    }

}


export default seller;