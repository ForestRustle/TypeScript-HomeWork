"use strict";
//{ id: 1, date: “01-01-2023”, title: “Тест” }
class Task {
    constructor(id, date, title, priority) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.priority = priority;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
    }
    sortBy(field) {
        this.tasks = this.tasks.sort((a, b) => {
            if (field === 'date') {
                const dateA = new Date(a.date.split('-').reverse().join('-'));
                const dateB = new Date(b.date.split('-').reverse().join('-'));
                return dateA.getTime() - dateB.getTime();
            }
            if (a[field] > b[field])
                return 1;
            else if (a[field] < b[field])
                return -1;
            else
                return 0;
        });
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    count() {
        return this.tasks.length;
    }
    getIterator(sortField = 'priority') {
        return new SortTaskIterator(this, sortField);
    }
}
class SortTaskIterator {
    constructor(taskList, sortField = 'priority') {
        this.position = 0;
        taskList.sortBy(sortField);
        this.taskList = taskList;
    }
    current() {
        return this.taskList.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev() {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index() {
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
