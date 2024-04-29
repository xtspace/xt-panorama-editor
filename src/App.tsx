
import Auth from './auth';
import { RouterContainer } from './router'
import { classNameExpansion } from './utils/classnames'


function App() {
  classNameExpansion()

  return (
    <Auth>
      {RouterContainer()}
    </Auth>
  )
}

export default App
