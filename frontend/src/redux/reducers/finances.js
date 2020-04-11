const initialState = {
  salaryAfterTax: 87000,
  shoppingAmount: 0.0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "setFinancesValue": {
      const { valueName, value } = action.payload;
      return {
        ...state,
        [valueName]: value,
      };
    }
    case "setShoppingValue": {
      const { value } = action.payload;
      return {
        ...state,
        shopping: value,
      };
    }
    default:
      return state;
  }
}
