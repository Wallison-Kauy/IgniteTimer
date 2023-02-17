import { Play, HandPalm } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { useState, useEffect, createContext, useContext } from "react";
import { Countdown } from "./Countdown";
import { NewCycleForm } from "./NewCycleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { CyclesContext } from '../../contexts/CyclesContext';


export function Home() {

  const {
    activeCycle,
    createNewCycle,
    interruptCurrentCycle,
  } = useContext(CyclesContext);

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1).max(60),
  });
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data)
    reset()
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromperr
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
