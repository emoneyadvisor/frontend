const initialState = {
  currentStep: 0,
  showPlanReady: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "incrementStep": {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }
    case "decrementStep": {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
    case "resetStep": {
      return {
        ...state,
        currentStep: 0,
      };
    }
    case "setStep": {
      const { step } = action.payload;
      return {
        ...state,
        currentStep: step,
      };
    }
    case "toggleShowPlanReady": {
      return {
        ...state,
        showPlanReady: !state.showPlanReady,
      };
    }
    default:
      return state;
  }
}
