import { createContext, useReducer } from "react";

import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    user: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(
      `${GITHUB_URL}/users`,

      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        }, 
      }
    );
    const data = await response.json();
    console.log("data", data);
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  // Set Loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
