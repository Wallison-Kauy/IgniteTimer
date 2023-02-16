import { Play, HandPalm } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { useState, useEffect, createContext } from "react";
import { differenceInSeconds } from "date-fns";
import { Countdown } from "./Countdown";
import { NewCycleForm } from "./NewCycleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useForm, FormProvider } from "react-hook-form";

export function Home() {
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

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatenewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruprtCycle} type="button">
            <HandPalm size={24} />
            Interromperr
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começarr
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
