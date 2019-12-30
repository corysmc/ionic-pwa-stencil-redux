import { ActionTypes, TypeKeys } from "./../actions/index";

const getInitialState = (): UserState => {
  return {
    name: "StencilJS"
  };
};

const user = (state = getInitialState(), action: ActionTypes): UserState => {
  switch (action.type) {
    case TypeKeys.SET_USER_NAME: {
      return { ...state, name: action.name };
    }
  }
  return state;
};

export default user;
