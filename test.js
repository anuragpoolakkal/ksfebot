const history = new Map();

const from = 92929292;
const msg = "Hey";

history.set(from, []);
const temp = history.get(from);

temp.push(msg);
history.set(from, temp);

console.log(history);

temp.push("hello");
history.set(from, temp);

console.log(history);


console.log(history.get(from).toString());

