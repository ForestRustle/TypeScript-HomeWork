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
  addBodyFetch(
    arrOrKey: Record<string, string> | string,
    value?: string
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

  addURL(url: string): FetchBuilder {
    if (!url || url.trim() == '') {
      console.log('URL не может быть пустым. Введите URL');
      return this;
    }
    this.url = url.trim();
    return this;
  }

  async exec(): Promise<any> {
    const options: RequestInit = {
      method: this.method,
      headers: this.head,
    };
    if (this.method != 'GET' && Object.keys(this.body).length > 0) {
      options.body = JSON.stringify(this.body);
    }
    if (!this.head['Content-Type']) {
      this.head['Content-Type'] = 'application/json';
    }
    const responce = await fetch(this.url, options);
    const data = await responce.json();
    return data;
  }
}

class FetchProxy {
  constructor(private builder: FetchBuilder) {}
  addFetchMethod(method: keyof typeof FetchMethods) {
    this.builder.addFetchMethod(method);
    return this;
  }

  addHeadFetch(arrOrKey: any, value?: string) {
    this.builder.addHeadFetch(arrOrKey as any, value as any);
    return this;
  }

  addBodyFetch(arrOrKey: any, value?: any) {
    this.builder.addBodyFetch(arrOrKey as any, value as any);
    return this;
  }

  addURL(url: string): this {
    this.builder.addURL(url);
    return this;
  }

  async exec(): Promise<any> {
    const startTTL = performance.now();
    try {
      const result = await this.builder.exec();
      const endTTL = performance.now();
      console.log(`Время ответа ${endTTL - startTTL} ms`);
      return result;
    } catch (error) {
      const endTTL = performance.now();
      console.error(`Время выполнения с ошибкой ${endTTL - startTTL} ms`);
      throw error;
    }
  }
}

interface IAPI {
  requestToApi(id: number): Promise<Record<any, string>>;
}

class RequestToAPI implements IAPI {
  private builder: FetchBuilder = new FetchBuilder();

  async requestToApi(id: number): Promise<Record<any, string>> {
    if (id >= 10) {
      throw new Error('ID проудукта должен быть меньше 10');
    }
    const url = `https://dummyjson.com/products/${id}`;
    const proxy = new FetchProxy(this.builder);

    return proxy
      .addFetchMethod('GET')
      .addURL(url)
      .addHeadFetch('Content-Type', 'application/json')
      .exec();
  }
}

const api = new RequestToAPI();

api
  .requestToApi(5)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

api
  .requestToApi(15)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
