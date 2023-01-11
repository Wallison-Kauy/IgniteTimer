import { HeaderContainer } from './styles'

import logo from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} />
      <nav>
        <NavLink to="" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/historia" title="Historia">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
