import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { CyclesContextProviver } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
       <CyclesContextProviver>
        <Router />
       </CyclesContextProviver>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
