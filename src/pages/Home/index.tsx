import { Play, HandPalm } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { Countdown } from "./Countdown";
import { NewCycleForm } from "./NewCycleForm";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmout = Math.floor(currentSeconds / 60);
  const secondsAmout = currentSeconds % 60;

  const minutes = String(minutesAmout).padStart(2, "0");
  const seconds = String(secondsAmout).padStart(2, "0");

  function handleCreatenewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmoutSecondsPassed(0);

    reset();
  }

  function handleInterruprtCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatenewCycle)} action="">
        <NewCycleForm />
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruprtCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
