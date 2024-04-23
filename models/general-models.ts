interface GeneralInitialState {
  isScreenScrolled: boolean;
}

interface InputTitlePlaceholder {
  title: string;
  placeHolder: string;
  value: string;
  setValue: (value: string) => void;
}

export { GeneralInitialState, InputTitlePlaceholder };
