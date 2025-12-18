export type PropResponse<T> = {
  status: number;
  message: string;
  info: T | null;
};
