export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number) {
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }

    timer = setTimeout(() => {
      fn.apply(this, args); // call the function if time expires
    }, wait);
  };
}
