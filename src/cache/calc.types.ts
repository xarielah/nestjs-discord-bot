export type CalcDocument = {
  players: number;
};

export type CalcByDayDocument = {
  day: number;
} & CalcDocument;

export type CalcByHourDocument = {
  hour: string;
} & CalcDocument;
