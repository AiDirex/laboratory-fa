import {defaultNetwork} from './reducers/network'
export const loadState = () => {
  try {
    const serializerdState = localStorage.getItem('state');
    if (serializerdState === null) {
      return undefined;
    }
    let data = JSON.parse(serializerdState);
    data.network = {current: defaultNetwork}
    return data
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializerdState = JSON.stringify(state)
    localStorage.setItem('state', serializerdState);
  } catch (err) {
    // Ignore error.
  }
}
