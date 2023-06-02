/*class Circle { 
   constructor(x, y, radius) { 
      this.radius = radius;
      this.x = x;
      this.y = y;
   }
   calcCircleLength() {
      return 2 * this.radius * Math.PI;
   }
}
const circle = new Circle(10, 12, 44);
function deepClone(circle) {
   if (typeof circle !== 'object' || circle === null) {
     return circle;
   }
   const copyCircle = Array.isArray(circle) ? [] : {};
   
   for (let key in circle) {
     if (circle.hasOwnProperty(key)) {
       if (typeof circle[key] === 'function') {
         copyCircle[key] = circle[key].bind(copyCircle);
       } else {
         copyCircle[key] = deepClone(circle[key]);
       }
     }
   }
      return copyCircle;
}
const circle3 = deepClone(circle);
console.log(circle3.calcCircleLength());*/
import { clone, mapObjIndexed, is, bind, mergeDeepRight } from 'ramda';

class Circle {
  constructor(x, y, radius) {
    this.radius = radius;
    this.point = {};
    this.point.x = x;
    this.point.y = y;
    //this.x = x;
   // this.y = y;
  }

  calcCircleLength() {
    return 2 * this.radius * Math.PI;
  }
}

const circle = new Circle(10, 12, 44);

const clonedCircle = clone(circle);

// Копіюємо методи
const clonedMethods = mapObjIndexed((value) => {
  if (is(Function, value)) {
    return bind(value, clonedCircle);
  }
  return value;
}, circle);

const finalClonedCircle = mergeDeepRight(clonedCircle, clonedMethods);

console.log(finalClonedCircle.calcCircleLength());
console.log(finalClonedCircle);