"use client";
import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";

function makeUseProvider(initialState) {
    const Context = createContext({
        state: initialState,
        updateState: () => null,
    })

    const Provider = (Component) => {
        const useContextProvider = () => {
            function reducer(state, payload) {
                return {
                    ...state,
                    ...payload,
                }
            }

            const [state, dispatch] = useReducer(reducer, initialState);

            const updateState = useCallback((partialState) => {
                dispatch(partialState)
            }, [])

            const resetState = useCallback(() => {
                dispatch(initialState)
            }, [dispatch])

            return useMemo(() => ({
                state,
                updateState,
                resetState,
            }), [state, updateState, resetState])
        }

        function ContextHOC(props) {
            const { updateState, state, resetState } = useContextProvider()
            const ctx = {
                state,
                updateState,
                resetState,
            }

            return (
                <Context.Provider value={ctx}>
                    <Component {...props} />
                </Context.Provider>
            )
        }
        return ContextHOC
    }

    return {
        Provider,
        useProvider: () => useContext(Context),
    }
}

export default makeUseProvider

