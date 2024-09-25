// seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector("#generated-password");

// Novos elementos
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");
// funções

// Letras minusculas aleatorias
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Letras maiusculas aleatorias
const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Números aleatorios
const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

// Símbolos aleatorios
const getSymbol = () => {
    const symbols ="'!@#$%¨&*()-+={[<>:?/|*,.]º§";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

// Gerando senhas aleatorias
const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSimbol) => {
    let password ="";

    const passwordLength = +lengthInput.value;

    const generators =[];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if(numbersInput.checked) {
        generators.push(getNumber);
    }

    if(symbolsInput.checked) {
        generators.push(getSymbol);
    }

    if(generators.length === 0) {
        return;
    }




    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue =
            generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        });
    }
    password = password.slice(0,passwordLength);

    generatePasswordElement.style.display = "block";
    generatePasswordElement.querySelector("h4").innerText = password;
}


//  Eventos
generatePasswordButton.addEventListener("click", () => {
   
   generatePassword(getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    const password = generatePasswordElement.querySelector("h4").innerText;
    
    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!";

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar";
        }, 1000);
    });
});