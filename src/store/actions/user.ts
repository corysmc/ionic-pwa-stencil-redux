import { TypeKeys } from "./index";

export interface SetUserName {
  type: TypeKeys.SET_USER_NAME;
  name: string;
}

export const setUserName = (name: string) => (dispatch, _getState) => {
  const action: SetUserName = {
    type: TypeKeys.SET_USER_NAME,
    name
  };
  dispatch(action);
};
