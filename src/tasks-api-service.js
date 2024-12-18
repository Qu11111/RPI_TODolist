import ApiService from './framework/view/api-service.js';


const Method = {
 GET: 'GET',
 PUT: 'PUT',
 POST: 'POST',
 DELETE: 'DELETE',
};


export default class TasksApiService extends ApiService {
 get tasks() {
   return this._load({url: 'tasks'})
     .then(ApiService.parseResponse);
 }
 async addTask(task){
  const responce = await this._load({
    url: 'tasks',
    method: Method.POST,
    body: JSON.stringify(task),
    headers: new Headers({'Content-Type':'application/json'}),
  })
  return ApiService.parseResponse(responce);
 }
 async updateTask(task) {
  const response = await this._load({
    url: `tasks/${task.id}`,
    method: Method.PUT,
    body: JSON.stringify(task),
    headers: new Headers({'Content-Type': 'application/json'}),
  });
  const parsedResponse = await ApiService.parseResponse(response);
  return parsedResponse;
}
async deleteTask(taskId) {
  try {
      const response = await this._load({
          url: `tasks/${taskId}`,
          method: Method.DELETE,
      });

      if (!response.ok) {
          throw new Error(`Ошибка при удалении задачи: ${response.status}`);
      }

      return await ApiService.parseResponse(response);
  } catch (error) {
      throw error; 
  }
}


}