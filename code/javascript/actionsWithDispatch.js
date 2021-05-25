function useActions({ state, dispatch }) {
  return {
    state,
    actions: {
      ...ActionsWithDispatch(dispatch)
    }
  };
}

export function ActionsWithDispatch(dispatch) {
  return {
    refreshItems: async () => {
      const startRefreshItems = actionFactory(
        ActionTypes.START_REFRESH_ITEMS
      );
      const refreshItems = actionFactory(
        ActionTypes.REFRESH_ITEMS
      );
      try {
        // Couldn't this be a reducer funciton that uses state?
        // dispatch({ type: 'REDUCER_FUNC', payload: (state) => {...state, loading: true} });
        dispatch(startRefreshItems());
        const items = await fetchItems(); // see below
        return dispatch(refreshItems(items));
      } catch (e) {
        return dispatch(GeneralActions.handleAPIError(e));
      }
    }
  };
}

const apiClient = ApiClient();
apiClient.fetchItems().then((items) => {
  dispatch({ type: ActionTypes.SET_ITEMS, payload: items });
});

export function ApiClient() {

  return {
    fetchItems: async (): Promise<Item[]> => {
    const response = await axios.get('/items').then((res) => res.data);
    return response.map(mapItem);
  }
};
}

// import {store} from './store';

function FooComponent(props) {
  const {state, actions} = useActions(useContext(store));

  return (
    <div>
      {state.items.map((i)tem) => (<div key={item.name}>{item.name}</div>)}
      <div onClick={actions.refreshItems}>Get Items</div>
    </div>
  )
}
