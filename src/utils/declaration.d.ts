declare module '*.scss' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

interface Window {
  __THEME__: 'dark' | 'light';
  __SET_THEME__: (theme: 'dark' | 'light') => void;
}
