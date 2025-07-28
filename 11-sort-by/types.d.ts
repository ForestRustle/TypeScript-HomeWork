declare module 'sort-by' {
  type Mapper<T> = (item: T) => any;
  type Sort<T> = (a: T, b: T) => number;

  function sortBy<T>(...args: Array<string | Mapper>): Sort<T>
  export default sortBy
}
