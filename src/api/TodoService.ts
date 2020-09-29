import ApiRequest from "./ApiRequest";
import {TodoDto} from "../models/Todo";

export default class TodoService {
  static async getTodo(id: string): Promise<TodoDto> {
    const response = await ApiRequest.request<TodoDto>({
      url: `/todos/${id}`,
      method: 'GET'
    });

    return response.data;
  }
}
