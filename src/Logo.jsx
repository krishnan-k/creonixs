import logo from './assets/logo.png'
import { me } from './data'

export default function Logo({ stacked }) {
  return (
    <a className={'logo' + (stacked ? ' stacked' : '')} href="#/"><img src={logo} alt="" />{me.name}</a>
  )
}
