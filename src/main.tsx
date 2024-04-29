
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from "react-router-dom";
import './index.less'
import './reset.less'
import 'virtual:uno.css'
import PanoContainer from './Pano.tsx';


const panoContainer = document.getElementById('panoContainer')

const root = document.getElementById('root')

const renderRoot = root! || panoContainer!

ReactDOM.createRoot(renderRoot).render(
  <HashRouter>
    {!panoContainer ? <App /> : <PanoContainer />}
  </HashRouter>
)
