import { createStore } from 'solid-js/store'
import { createEffect, createSignal, onCleanup } from 'solid-js';
import './App.css'
import { formatCount } from './utils';

function App() {

  const [ currentTimestamp, setCurrentTimestamp ] = createSignal(Date.now())

  const currentTimestampInterval = setInterval(() => {
    setCurrentTimestamp(Date.now())
  }, 10);

  const [ timers, setTimers ] = createStore(JSON.parse(localStorage.getItem('timers')) ?? [
    {
      startTime: 0,
      stopTime: 0,
      note: '',
      activated: false,
      stopped: false
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
                  startTime: 0,
                  stopTime: 0,
                  note: '',
                  activated: false,
                  stopped: false
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
        <h4>~</h4>
        <h4>Count</h4>
        <h4>Notes</h4>
        <h4
          style={{
            "grid-column": "5 / 7"
          }}
        >Control</h4>
        <h4>Delete</h4>
      </div>
      {timers.length && <For each={timers}>{
        (timer, index) => {
          return (
            <div
              class='timers__timer'
            >
              <h4
                style={{
                  color: !timer.stopped ? '#059680' : '#f23645'
                }}
              >{index() + 1}</h4>
              <input
                type="datetime-local"
                name={`select-time-${index()}`}
                onBlur={e => {
                setTimers([index()], previousState => {
                  return ({
                    ...previousState,
                    startTime: new Date(e.target.value).getTime()
                  })
                })
              }}/>
              <h4
                onClick={() => {
                  showTimeSelector(true)
                }}
              >{
                timer.activated
                ?
                !timer.stopped
                ?
                formatCount(currentTimestamp() - timer.startTime)
                :
                formatCount(timer.stopTime - timer.startTime)
                :
                '-'
              }</h4>
              <input
                type="text"
                name={`comment-${index()}`}
                value={timer.note}
                onInput={e => {
                  console.log(e.target.value)
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
                        stopped: false,
                        activated: true,
                        startTime: Date.now()
                      })
                    })
                  }
                }
              >
                Set
              </button>
              <button
                onClick={() => {
                  setTimers([index()], previousState => {
                    return ({
                      ...previousState,
                      stopTime: Date.now(),
                      stopped: true
                    })
                  })
                }}
              >
                Stop
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
