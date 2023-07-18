import { createStore } from 'solid-js/store'
import { createEffect, createSignal, onCleanup } from 'solid-js';
import './App.css'
import { formatCount } from './utils';

function App() {

  const [ currentTimestamp, setCurrentTimestamp ] = createSignal(Date.now())

  const currentTimestampInterval = setInterval(() => {
    setCurrentTimestamp(Date.now())
  }, 100);

  const [ timers, setTimers ] = createStore(JSON.parse(localStorage.getItem('timers')) ?? [
    {
      timeReference: 0,
      note: '',
      activated: false
    }
  ])

  createEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers))
  })
  onCleanup(() => clearInterval(currentTimestampInterval))

  return (
    <div
      class='main-frame'
    >
      <div
        class='timers__control'
      >
        <h1>Timers</h1>
        <button
          onClick={() => {
            setTimers(previousState => {
              return [
                ...previousState,
                {
                  timeReference: 0,
                  note: '',
                  activated: false
                }
              ]
            })
          }}
        >Add Timer</button>
      </div>
      <div
        class='timers__timer'
      >
        <h4>Sl</h4>
        <h4>Count</h4>
        <h4>Notes</h4>
        <h4>Setter</h4>
        <h4>Delete</h4>
      </div>
      {timers.length && <For each={timers}>{
        (timer, index) => {
          return (
            <div
              class='timers__timer'
            >
              <h4>{index() + 1}</h4>
              <h4>{timer.activated ? formatCount(currentTimestamp() - timer.timeReference) : '-'}</h4>
              <input
                type="text"
                name={`comment-${index()}`}
                value={timer.note}
                onInput={e => {
                  setTimers([index()], previousState => {
                    return ({
                      ...previousState,
                      note: e.target.value
                    })
                  })
                }}
              />
              <button
                onClick={
                  () => {
                    setTimers([index()], previousState => {
                      return ({
                        ...previousState,
                        activated: true,
                        timeReference: Date.now()
                      })
                    })
                  }
                }
              >
                Set
              </button>
              <button
                onClick={() => {
                  setTimers(previousState => {
                    return [...previousState.filter((timer, indexFilter) => {
                      return indexFilter !== index()
                    })]
                  })
                }}
              >
                Del
              </button>
            </div>
          )
        }
      }</For>}
    </div>
  );
}

export default App;
