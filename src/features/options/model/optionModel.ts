export interface OptionProps {
  title: string;
  description: string;
  optionId: string;
  counsilId: string;
  votes:number;
}

export enum OptionsView{
  BARS = 'bars'
}
