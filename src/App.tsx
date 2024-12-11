import { useState } from 'react'

import './App.css'

function App() {

  const [inputTarefa, setInputTarefa] = useState<string>('');
  const [tarefas, setTarefas] = useState<string[]>([]);

  const [editTarefa, setEditTarefa] = useState({
    enabled: false,
    tarefa: ''
  })

  function registrar(){

    if(!inputTarefa){
      alert('Preencha o campo de tarefa')
    }

    if(editTarefa.enabled){
      salvarTarefaEditada();
      return
    }
  
    setTarefas(taref => [...taref, inputTarefa]);
    setInputTarefa('')
  }

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
  }

  function deletarTarefa(item: string){
    const removerTarefa = tarefas.filter(tarefa => tarefa !== item);
    setTarefas(removerTarefa);
  }



  return (
    <>
      <div className='container-lista'>
        <aside className='project-image'>
          <img className='list-img' src='src/assets/list-img.svg' alt='Imagem de uma Lista'></img>
        </aside>
        <article className='project-text'>

          <h1 className='title'>Lista de Tarefas</h1>

          <input className='input-tarefa' placeholder='Digite a tarefa' value={inputTarefa} onChange={(e) => setInputTarefa(e.target.value)} ></input>

          <button className='button-tarefa' onClick={registrar}>{editTarefa.enabled ? "Editar tarefa" : "Adicionar tarefa"}</button>

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
