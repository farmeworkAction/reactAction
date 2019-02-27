import { init } from '@rematch/core'
import * as models from '../models'

const store = init({
  models,
})

export const { dispatch } = store
                                                  // state = { count: 0 }
// reducers
dispatch({ type: 'count/increment', payload: 1 }) // state = { count: 1 }
dispatch.count.increment(1)                       // state = { count: 2 }

// effects
dispatch({ type: 'count/incrementAsync', payload: 1 }) // state = { count: 3 } after delay
dispatch.count.incrementAsync(1)                       // state = { count: 4 } after delay

// reducers
dispatch({ type: 'data/increment', payload: 2 }) // state = { data: 1 }
dispatch.data.increment(2)                       // state = { data: 2 }

// effects
dispatch({ type: 'data/incrementAsync', payload: 2 }) // state = { data: 3 } after delay
dispatch.data.incrementAsync(2)
