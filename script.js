const swiper = new Swiper('.swiper', {
    // Optional parameters

    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

let loginStatus = JSON.parse(localStorage.getItem('loginStatus')) || false;
localStorage.setItem('loginStatus', JSON.stringify(loginStatus));

let users = JSON.parse(localStorage.getItem('usersArray')) || [];
console.log(users);

class User {
    constructor(name, email, password, phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}

let passwordRegexp = /[A-Za-z0-9.]{5,30}/g;
let emailRegexp = /[A-Za-z0-9.@]{5,30}/g;

function registerUser() {
    let signupEmail = document.getElementById('signupEmail');
    let signupPassword = document.getElementById('signupPassword');
    let signupName = document.getElementById('signupName');
    let signupPhone = document.getElementById('signupPhone');

    if (emailRegexp.test(signupEmail.value) && passwordRegexp.test(signupPassword.value)) {
        users.push(new User(signupName.value, signupEmail.value, signupPassword.value, signupPhone.value));
        localStorage.setItem('usersArray', JSON.stringify(users));
    }
}

let login = document.querySelector('#login')
login.addEventListener('click', (e) => {
    openModalWindow();
});

function openModalWindow() {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('modal');
    modalWindow.innerHTML = `
        <form class="modal-content" id="loginForm">
            <span class="close" onclick="closeModalWindow()">&times;</span>
            <div class="modal-inputs">
                <input id="loginEmail" type="email" class="modal-input" placeholder="E-mail" required><br>
                <input id="loginPassword" type="password" class="modal-input" placeholder="Пароль" pattern="[A-Za-z0-9.]{5,30}"> <br>
            </div>
            <div class="modal-option">
                <input  class="checkbox" type="checkbox" name="showPassword" id="showPassword">показать пароль
                <a id="forgetPassword" class="modal-link" href="#">забыли пароль?</a>
            </div>
            <div class="modal-buttons">
                    <button id="logIn" type="submit" class="button form-button modal-button">Войти</button>
                    <button id="loginSignUp" type="submit" class="button form-button modal-button">Зарегистрироваться</button>
            </div>
        </form>
    `;

    document.body.appendChild(modalWindow);
    modalWindow.style.display = "block";

    togglePasswordInput(modalWindow.querySelector('.modal-content'));

    let logIn = document.querySelector('#logIn')
    logIn.addEventListener('click', (e) => {
        e.preventDefault();
        checkInputs();
        let signupEmail = document.getElementById('loginEmail');
        let signupPassword = document.getElementById('loginPassword');

        if (emailRegexp.test(signupEmail.value) && passwordRegexp.test(signupPassword.value)) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === signupEmail.value && users[i].password === signupPassword.value) {
                    localStorage.setItem('loginStatus', true);
                    window.location = 'index.html';
                }
            }
        }
    })

    let signUp = document.querySelector('#loginSignUp')
    signUp.addEventListener('click', (e) => {
        e.preventDefault();
        openSignUpModal();
    })
}

function togglePasswordInput(modalContent) {
    let passwordInput = modalContent.querySelector('input[type="password"]');
    if (passwordInput) {
        let showPassword = modalContent.querySelector('input[name="showPassword"]');
        showPassword.addEventListener('change', (e) => {
            if (e.target.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }
}

function openSignUpModal() {
    let modalSignUpWindow = document.createElement('div');
    modalSignUpWindow.classList.add('modal');
    modalSignUpWindow.innerHTML = `
        <form class="modal-content" id="signupForm">
            <span class="close" onclick="closeModalWindow()">&times;</span>
            <div class="modal-inputs">
                <input id="signupName" type="text" class="modal-input" placeholder="Имя"><br>
                <input id="signupEmail" type="email" class="modal-input" placeholder="E-mail" required title="Пожалуйста, введите корректный адрес электронной почты"><br>
                <input id="signupPassword" type="password" class="modal-input" placeholder="Пароль" pattern="[A-Za-z0-9.]{5,30}"> <br>
                <input id="signupPhone" type="number" class="modal-input" placeholder="Телефон"> <br>
            </div>
            <div class="modal-option">
            <input class="checkbox" type="checkbox" name="showPassword" id="showPassword"> показать пароль
            </div>
            <div class="modal-buttons">
                    <button id="goBack" type="button" class="button form-button modal-button">Назад</button>
                    <button id="signUp" type="button" class="button form-button modal-button">Зарегистрироваться</button>
            </div>
        </form>
    `;

    document.body.appendChild(modalSignUpWindow);
    modalSignUpWindow.style.display = "block";

    togglePasswordInput(modalSignUpWindow.querySelector('.modal-content'));

    let goBack = document.querySelector('#goBack');
    goBack.addEventListener('click', (e) => {
        e.preventDefault();
        modalSignUpWindow.remove();
    });
    let signUpButton = modalSignUpWindow.querySelector('#signUp');
    signUpButton.onclick = registerUser;
}

function closeModalWindow() {
    let modalWindow = document.querySelector('.modal');
    modalWindow.style.display = "none";
    modalWindow.remove();
}

function checkInputs() {
    let inputs = document.querySelectorAll('.modal-input');
    let isValid = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.transform = "scale(1.1)";
            input.style.borderColor = "red";
            input.style.transition = 'transform 0.2s';
        }
        else {
            input.style.transform = "";
            input.style.borderColor = "";
            input.style.transition = '';
        }
    });
    if (!isValid) {
        alert("Заполните поля правильно")
    }
}
const Buttons = document.querySelectorAll('a[href*="#"]');
for (let Button of Buttons) {
    Button.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = Button.getAttribute('href');
        document.querySelector('' + blockId).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}
