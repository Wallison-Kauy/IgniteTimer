import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  HomeContainer,
  FormContainer,
  Separator,
  StartCountDownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="minutsAmount">Durante</label>
          <input id="minutsAmount" type="number" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
