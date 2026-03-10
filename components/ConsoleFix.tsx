'use client';

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    try {
      const safeArgs = args.map(arg => {
        if (arg && typeof arg === 'object' && arg instanceof HTMLElement) {
          return `<${arg.tagName.toLowerCase()} class="${arg.className}">`;
        }
        return arg;
      });
      originalWarn.apply(console, safeArgs);
    } catch (e) {
      originalWarn.apply(console, args);
    }
  };

  console.error = (...args) => {
    try {
      const safeArgs = args.map(arg => {
        if (arg && typeof arg === 'object' && arg instanceof HTMLElement) {
          return `<${arg.tagName.toLowerCase()} class="${arg.className}">`;
        }
        return arg;
      });
      originalError.apply(console, safeArgs);
    } catch (e) {
      originalError.apply(console, args);
    }
  };
}

export function ConsoleFix() {
  return null;
}
