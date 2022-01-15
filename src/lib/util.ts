export type Dictionary<Value> = {
  [key: string]: Value
}

export const forEachKey = <T>(
  dictionary: Dictionary<T>,
  callback: (value: T) => void
) => {
  Object.keys(dictionary).forEach((key) => callback(dictionary[key]))
}

export const mapEachKey = <T, R>(
  dictionary: Dictionary<T>,
  callback: (value: T) => R
) => {
  return Object.keys(dictionary).map((key) => callback(dictionary[key]))
}
