import { useState, useRef, useEffect, useMemo, useCallback } from 'react'

import './App.css'

function App() {

  const [inputTarefa, setInputTarefa] = useState<string>('');
  const [tarefas, setTarefas] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null); // Fazendo referência ao elemento Input 
  const primeiraRenderizacao = useRef(true); // Fazendo refência a renderização da página.

  const [editTarefa, setEditTarefa] = useState({
    enabled: false,
    tarefa: ''
  })

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('@listatarefa');

    if(tarefasSalvas){
      setTarefas(JSON.parse(tarefasSalvas));
    };

  }, [])

  useEffect(() => {
    if (primeiraRenderizacao.current){
      primeiraRenderizacao.current = false;
      return
    }
    
    localStorage.setItem('@listatarefa', JSON.stringify(tarefas));
    
  }, [tarefas])

  const registrar = useCallback(()=> {

    if(!inputTarefa){
      alert('Preencha o campo de tarefa')
      return
    }

    if(editTarefa.enabled){
      salvarTarefaEditada();
      return
    }
  
    setTarefas(taref => [...taref, inputTarefa]);
    setInputTarefa('')

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTarefa, tarefas])

  function salvarTarefaEditada(){
    const indexTarefa = tarefas.findIndex(taref => taref === editTarefa.tarefa);
    const todasTarefas = [...tarefas];

    todasTarefas[indexTarefa] = inputTarefa;

    setTarefas(todasTarefas);

    setEditTarefa({
      enabled: false,
      tarefa: ''
    })

    setInputTarefa('');
  }

  function editarTarefa(item: string){
    setInputTarefa(item)
    setEditTarefa({
      enabled: true,
      tarefa: item
    })

    inputRef.current?.focus();
  }

  function deletarTarefa(item: string){
    const removerTarefa = tarefas.filter(tarefa => tarefa !== item);
    setTarefas(removerTarefa);
  }

  const totalTarefas = useMemo(() => {

    return tarefas.length

  }, [tarefas])

  return (
    <>
      <div className='container-lista'>
        <aside className='project-image'>
          <img className='list-img' src='src/assets/list-img.svg' alt='Imagem de uma Lista'></img>
        </aside>
        <article className='project-text'>

          <h1 className='title'>Lista de Tarefas</h1>

          <input className='input-tarefa' placeholder='Digite a tarefa' value={inputTarefa} onChange={(e) => setInputTarefa(e.target.value)} ref={inputRef}></input>

          <button className='button-tarefa' onClick={registrar}>{editTarefa.enabled ? "Editar tarefa" : "Adicionar tarefa"}</button>
          <br></br>
          <br></br>
          <strong>Você tem {totalTarefas} tarefas</strong>

          {tarefas.map((item) => (
            <section key={item}>
              <span>{item}</span>
              <button onClick={() => deletarTarefa(item)}>Deletar</button>
              <button onClick={() =>
                editarTarefa(item)
              }>Editar</button>

            </section>
          ))}

        </article>
      </div>
      
    </>
  )
}

export default App
