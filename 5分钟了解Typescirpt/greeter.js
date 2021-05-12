function gretter(person) {
    return 'Hello, ' + person;
}
var user = { firstName: 'Sun', lastName: 'Yan zhe' };
document.body.textContent = gretter(user);
