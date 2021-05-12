// 接口
interface Person {
  firstName: string;
  lastName: string;
}

function gretter(person: Person) {
  return 'Hello, ' + person;
}

const user = { firstName: 'Sun', lastName: 'Yan zhe' };

document.body.textContent = gretter(user)