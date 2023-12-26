
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from "axios"
import {NextUIProvider} from "@nextui-org/react";
axios.defaults.baseURL = "";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
)
