import { FormContainer, TaskInput, MinutsAmoutInput } from "./styles";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function NewCycleForm() {
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1).max(60),
  });
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggetions"
        placeholder="De um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggetions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="Banana"></option>
      </datalist>

      <label htmlFor="minutsAmount">Durante</label>
      <MinutsAmoutInput
        id="minutsAmount"
        type="number"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
