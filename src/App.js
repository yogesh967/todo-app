import { Provider } from "react-redux";
import store from "./redux/store";
import MainRoutes from "./routes";
import "./app.scss";
function App() {
  return (
    <div className="App">
      <Provider store={store()}>
        <MainRoutes />
      </Provider>
    </div>
  );
}

export default App;
