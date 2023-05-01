export class ResponseBody<Type> {
  status: number;
  message: string;
  data: Type;
}
