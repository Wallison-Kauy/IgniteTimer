import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsfinished } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducers";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  cycles:  Cycle[];
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProviver( {children}:CyclesContextProviderProps ) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,{
    cycles: [],
    activeCycleId: null,
  }, (initialState) => {
    const storedStateAsJson = localStorage.getItem('@ingnite-timer-1.0.0: cyles-state')
    if (storedStateAsJson){
      return JSON.parse(storedStateAsJson)
    }
    return initialState;
  })

  const {cycles,activeCycleId } =cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  
  const [amountSecondsPassed, setAmoutSecondsPassed] = useState( () => {
    if(activeCycle){
      return differenceInSeconds(new Date(),new Date(activeCycle.startDate))
    } 
    return 0
  });
  

  function setSecondsPassed(seconds: number) {
    setAmoutSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsfinished());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle))
  

    //setCycles((state) => [...state, newCycle]);

    setAmoutSecondsPassed(0);

    //reset();
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  useEffect( () => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ingnite-timer-1.0.0: cyles-state', stateJSON)
  }),[cyclesState]

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
