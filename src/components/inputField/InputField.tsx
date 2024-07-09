import React, { useRef } from 'react'
import styles from './styles.module.css'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className={`${styles.input}`} onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur();
        }}>
            <input ref={inputRef} type={`${styles.input}`} placeholder='Enter a task' value={todo} onChange={(e) => setTodo(e.target.value)} className={`${styles.input__box}`} />
            <button className={`${styles.input_submit}`} type='submit'>Go</button>
        </form>
    )
}

export default InputField