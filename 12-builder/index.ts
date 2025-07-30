enum FetchMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

class FetchBuilder {
  private url: string;
  private head: Record<string, string> = {};
  private body: Record<string, string> = {};
  private method: FetchMethods;

  addFetchMethod(method: keyof typeof FetchMethods) {
    this.method = FetchMethods[method];
    return this;
  }

  addHeadFetch(head: Record<string, string>): FetchBuilder; // для массива
  addHeadFetch(key: string, value: string): FetchBuilder; // для параметров
  addHeadFetch(
    arrOrKey: Record<string, string> | string,
    value?: string
  ): FetchBuilder {
    if (typeof arrOrKey == 'string') {
      if (!value || arrOrKey.trim() == '' || value.trim() == '') {
        console.log('Ключ и значение заголовка не могут быть пустыми');
        return this;
      }
      this.head[arrOrKey] = value;
    }
    if (typeof arrOrKey == 'object') {
      this.head = { ...this.head, ...arrOrKey };
    }

    return this;
  }

  addBodyFetch(body: Record<string, string>): FetchBuilder;
  addBodyFetch(key: string, value: string): FetchBuilder;
  addBodyFetch(arrOrKey: Record<string, string> | string, value?: string
  ): FetchBuilder {
    if (typeof arrOrKey == 'string') {
      if (!value || arrOrKey.trim() == '' || value.trim() == '') {
        console.log('Ключ и значение тела запроса не могут быть пустыми');
        return this;
      }
      this.body[arrOrKey] = value;
    }
    if (typeof arrOrKey == 'object') {
      this.body = { ...this.body, ...arrOrKey };
    }

    return this;
  }

  addURL(url:string):FetchBuilder {
    if (!url || url.trim()=='') {
      console.log('URL не может быть пустым. Введите URL');
      return this
    }
    this.url = url.trim()
    return this
  }

  async exec(): Promise<any> {
    const options:RequestInit = {
      method: this.method,
      headers: this.head,
    };
    if (this.method != 'GET' && Object.keys(this.body).length> 0) {
      options.body = JSON.stringify(this.body)
    }
    const responce = await fetch(this.url, options)
    const data = await responce.json();
    return data;
  }
}

const fetchBuilder = new FetchBuilder();
fetchBuilder
  .addFetchMethod('GET')
  .addURL('https://dummyjson.com/users')
  .addHeadFetch({ 'Content-Type': 'application/json' })
  .exec()
  .then((data) => {
    const {username, password} = data.users[0]
    fetchBuilder
      .addURL('https://dummyjson.com/auth/login')
      .addBodyFetch({ username, password })
      .addFetchMethod('POST')
      .addHeadFetch('Content-Type', 'application/json')
      .exec()
      .then(console.log)
  })
