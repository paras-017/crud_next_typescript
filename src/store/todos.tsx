import { ReactNode, createContext, useContext, useState } from "react";

export type Todo = {
    id:string;
    task:string;
    complete:boolean;
    createdAt : Date;
}
export type TodosContext = {
    todos:Todo[],
    handleAddTodo:(task:string)=>void
}
const [todos, setTodos] = useState<Todo[]>([])
export const todosContext = createContext<TodosContext | null>(null)

export const TodoProvider = ({children}:{children:ReactNode})=>{
    const handleAddTodo = (task:string)=>{
        setTodos((prev)=>{
            const newTodos:Todo[] = [
                        {id:Math.random().toString(),
                        task:task,
                        complete:false,
                        createdAt : new Date()},
                        ...prev
        ]
        return newTodos
    }
        )
    }

    return(
        <todosContext.Provider value={{todos,handleAddTodo}}>
            {children}
        </todosContext.Provider>
    )
}



// context API
export function useTodos(){
  const todosContextValue = useContext(todosContext)
  if(!todosContext) throw new Error("UseTodos used outstide of provider");
  return todosContextValue
}