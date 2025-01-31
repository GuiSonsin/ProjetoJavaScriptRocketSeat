const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const form = document.querySelector("form")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")


const valueDolar = 6.04;
const valueEuro = 6.30;
const valueLibra = 7.00;

// Manipulando o input amount para receber apenas numeros
amount.addEventListener("input", () => {
    const hasCaractersRegex = /\D+/
    amount.value = amount.value.replace(hasCaractersRegex, "")
})

// Capturando o evento de submit do formulario
form.onsubmit = (event) => {
    // Desativa o recarrecamento automatico da pagina
    event.preventDefault()    
    
    switch(currency.value){
        case "USD":
            convertCurrency(amount.value, valueDolar, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, valueEuro, "€")
            break
        case "GBP":
            convertCurrency(amount.value, valueLibra, "£")
            break
    }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol){
    try{
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        let total = amount * price

        // Se tirar do replace pra frente ele ver formatado com o R$ atras do valor, com o replace trocamos o R$ por nada
        total = formatCurrencyBRL(total).replace("R$", "")

        result.textContent = `${total} Reais`


        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")
    }catch(error){
        // Remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possivel converter. Tente novamente mais tarde!")
    }
}

// Formata a moeda em real brasileiro
function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}