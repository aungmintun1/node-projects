/* eslint-disable */
export const login = async (email,password) => {
    alert(email,password);
};

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('pressed')
    login({email, password});
});