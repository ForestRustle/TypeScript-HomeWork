//{ id: 1, date: “01-01-2023”, title: “Тест” }

class Task {
  constructor(
    public id: number,
    public date: string,
    public title: string,
    public priority: number
  ) {}
}

type SortField = 'id' | 'date' | 'title' | 'priority';

class TaskList {
  private tasks: Task[] = [];

  public sortBy(field: SortField) {
    this.tasks = this.tasks.sort((a, b) => {
      if (field === 'date') {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      } 
        if (a[field] > b[field]) return 1;
        else if (a[field] < b[field]) return -1;
        else return 0;
    });
  }
  public addTask(task: Task) {
    this.tasks.push(task);
  }
  public getTasks() {
    return this.tasks;
  }
  public count() {
    return this.tasks.length;
  }
  public getIterator(sortField: SortField = 'priority') {
    return new SortTaskIterator(this, sortField);
  }
}

interface IIteraror<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}


class SortTaskIterator implements IIteraror<Task> {
  private position: number = 0;
  private taskList: TaskList;

  constructor(
    taskList: TaskList,
    sortField: SortField = 'priority',
  ) {
    taskList.sortBy(sortField,);
    this.taskList = taskList;
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  next(): Task | undefined {
    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }
  prev(): Task | undefined {
    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }
  index(): number {
    return this.position;
  }
}

const taskList = new TaskList();
taskList.addTask(new Task(8, "03-01-2023", "Тест", 1));
taskList.addTask(new Task(1, "04-02-2023", "Тест", 2));
taskList.addTask(new Task(3, "09-05-2023", "Тест", 3));

const iterator = taskList.getIterator('id');

console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
