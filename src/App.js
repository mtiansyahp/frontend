import { Provider } from 'react-redux'
import { store, RootRoutes } from './config'
import {useEffect } from "react";

const App = () => {
  useEffect(() => {
    if ("caches" in window) {
        caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name);
        });
        });
    }
  }, []);
  return (
    <Provider store={store}>
      <RootRoutes/>
    </Provider>
  )
}

export default App
