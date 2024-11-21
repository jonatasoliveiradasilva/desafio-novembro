const apiUrl = "https://ecom-back-strapi.onrender.com/api/products";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyMTkzODk2LCJleHAiOjE3MzQ3ODU4OTZ9.80GSDlzuC2DpdhIlnMI9MCr6rl9VXYibOUhPQ_MuOig";

function configurarCabecalhos() {
    return {
        "Authorization": token,
        "Content-Type": "application/json"
    };
}

async function buscarProdutos() {

    try {

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: configurarCabecalhos()
        });

        if (!response.ok) {
            throw new Error("Erro na resposta da API:", response.status);
        }

        const data = await response.json();

        return data.data;

    } catch (error) {

        console.error("Erro ao buscar dados da API:", error);

        return null;
    }
}

function exibirProdutos(produtos) {

    const produtosContainer = document.getElementById("produtos");

    produtosContainer.innerHTML = "";

    produtos.forEach(produto => {

        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        const imagem = document.createElement("img");

        imagem.src = produto.attributes.imagens[0];
        imagem.alt = produto.attributes.nome;

        imagem.classList.add("produto-imagem");

        const nome = document.createElement("h2");
        nome.textContent = produto.attributes.nome;

        const preco = document.createElement("p");
        preco.textContent = `Preço: R$ ${produto.attributes.preco.toFixed(2)}`;

        const botaoComprar = document.createElement("button");

        botaoComprar.textContent = "Comprar";
        botaoComprar.onclick = () => {
            alert(`Você comprou ${produto.attributes.nome}`);
        };

        produtoDiv.appendChild(imagem);
        produtoDiv.appendChild(nome);
        produtoDiv.appendChild(preco);
        produtoDiv.appendChild(botaoComprar);
        produtosContainer.appendChild(produtoDiv);
    });
}

async function iniciarApp() {

    const produtos = await buscarProdutos();

    if (produtos) {
        exibirProdutos(produtos);
    } else {
        console.error("Nenhum produto encontrado");
    }
}

window.onload = iniciarApp;
