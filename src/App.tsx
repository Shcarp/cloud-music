import React from "react"
import "./style.scss"
import "./assets/iconfont/iconfont.css"
import "./style/global.style.scss"
import { renderRoutes } from "react-router-config"
import routes from "./routes"
import { BrowserRouter } from "react-router-dom"
import store from "./store/index"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
        {  renderRoutes(routes) }
      </BrowserRouter>
    </Provider>
  )
}

export default App