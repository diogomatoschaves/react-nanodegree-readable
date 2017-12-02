export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function uuid () {
  
  return Math.random().toString(36).substr(2, 20);
}