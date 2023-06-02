class Point {
  constructor(x, y) {
   this.x = x;
   this.y = y;
 }
}

class Circle {
  constructor(point, radius) {
    this.radius = radius;
    this.point = new Point(point.x, point.y);
  }

 static circleObject(point, radius) { 
   return  new Circle(point, radius);
 }

  calcCircleLength() {
    return (2 * this.radius * Math.PI).toFixed(3);
  }
  clone() {
    return new Circle(this.point, this.radius);
  }

  pointInCircle(point)
  {
    return Math.pow((point.x - this.point.x), 2) + Math.pow((point.y - this.point.y), 2) <= Math.pow((this.radius), 2);
  }
  toStrings() {
    console.log(`Object Circle with centre in point with coordinates x:${this.point.x} and y: ${this.point.y} and radius: ${this.radius}; circle length is: ${this.calcCircleLength()}`);
  }
}

function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'function') {
          copy[key] = obj[key].bind(copy);
      } else {
        copy[key] = deepClone(obj[key]);
      }
    }
  }

  copy.__proto__ = Object.create(Object.getPrototypeOf(obj));
  return copy;
}
const obj1 = new Circle(new Point(12, 15), 45);
const obj2 = Circle.circleObject(44, 45, 4);
const obj3 =obj1.clone();
console.log(obj1.calcCircleLength());
const obj4 = deepClone(obj1);
console.log(obj4.calcCircleLength());
console.log(obj4.point.x);
console.log(obj4.pointInCircle(new Point(14, 13)));
console.log(obj4.pointInCircle(new Point(70, 13)));
console.log(obj4.toStrings());

 //Завдання 2
function propsCount (currentOblect) { 
  return +Object.keys(currentOblect).length;
}
let mentor = {
  cours: "JS",
  duration: 3,
  direction: "web"
 };
propsCount(mentor);

//Завдання 3

class Person {
  constructor(options) {
    this.name = options.name;
    this.surname = options.surname;
  }
  showFullName() {
    console.log(`${this.name} ${this.surname}`);
  }
}
class Student extends Person {
  constructor(options) {
    super(options);
    this.year = options.year;
  }
  showFullName(middleName) {
    console.log(`${this.name} ${this.surname} ${middleName}`);
  }
  showCourse() {
    let today = new Date();
    let year = today.getFullYear();
    let course = year - this.year;
    if (course < 1 || course > 6) {
      console.log("You are not a Student");
    } else {
      console.log(`Your course is ${course}`);
    }
  }
}
const stud1 = new Student({
  name: "Vasyl",
  surname: "Petrenko",
  year: 2020,
});

stud1.showFullName("Ivanovych");
stud1.showCourse();

//Завдання 4

class Marker {
  constructor(color) {
    this.color = color;
    this.ink = 1;
  }

  print(string) {
    let textToPrint = '';
    for (let char of string) {
      if (char !== ' ' && this.ink > 0) {
        textToPrint += char;
        this.ink -= 0.005;
      } else {
        textToPrint += ' ';
      }
    } if (this.color === "Red") {
      console.log('\x1b[31m%s\x1b[0m', textToPrint);
    } else if (this.color === "Green") {
      console.log('\x1b[32m%s\x1b[0m', textToPrint);
    } else if (this.color === "Blue") {
      console.log('\x1b[34m%s\x1b[0m', textToPrint);
    } else { 
      console.log(textToPrint);

    }
  }
}

class RefillingMarker extends Marker {
  refill(inkAmount) {
    this.ink += inkAmount;
  }
}

// Приклад використання класів:

// Створення екземпляра простого маркера
const testMarker = new Marker('Blue');

// Друкування тексту
testMarker.print("Hello some text");  

// Створення екземпляра заправляємого маркера
const refillableMarker = new RefillingMarker('Green');

// Друкування тексту
refillableMarker.print("Some text");  

// Заправка маркера
refillableMarker.refill(0.5);

//Завдання 5

class Worker {
  constructor(fullName, dayRate, workingDays, experience) {
    this.fullName = fullName;
    this.dayRate = dayRate;
    this.workingDays = workingDays;
    this._experience = experience;
  }

  showSalary() {
    const salary = this.dayRate * this.workingDays;
    console.log(`Salary of ${this.fullName} is ${salary}`);
  }

  showSalaryWithExperience() {
    const salary = this.dayRate * this.workingDays * this._experience;
    console.log(`Salary of ${this.fullName} with experience is ${salary}`);
  }

  get experience() {
    return this._experience;
  }

  set experience(value) {
    this._experience = value;
  }
}

const workerPetrenko = new Worker("Petro Petrenko", 100, 22);
const workerIvanenko = new Worker("Ivan Ivanenko", 150, 15);
const workerStepanenko = new Worker("Stepan Stepanenko", 50, 25);
const workerIrynivna = new Worker("Iryna Irynivna", 300, 12);

workerPetrenko.experience = 1.5;
workerIvanenko.experience = 2;
workerStepanenko.experience = 1.2;
workerIrynivna.experience = 6;

const workers = [workerPetrenko, workerIvanenko, workerStepanenko, workerIrynivna];

workers.sort((a, b) => a.experience - b.experience);

for (const worker of workers) {
  const result = `${worker.fullName}: ${worker.dayRate * worker.workingDays} with experience ${worker.experience}`;
  console.log(result);
}

