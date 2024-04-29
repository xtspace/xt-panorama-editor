import { PanoRouterContainer } from './router'
import { classNameExpansion } from './utils/classnames'


function PanoContainer() {
  classNameExpansion()

  return (
    <>{PanoRouterContainer()}</>
  )
}

export default PanoContainer
