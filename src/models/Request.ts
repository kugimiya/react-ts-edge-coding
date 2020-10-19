export type RequestError = {
  message: string;
  type: string;
  file: string;
  line: number;
  trace: string[];
};

export type Request<T> = {
  payload: T;
  error: RequestError | null;
  version?: string;
};
