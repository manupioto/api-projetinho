import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());

const personagens = [
    {
        id: 1,
        nome: "Harry Potter",
        papel: "Protagonista",
        idade: 17,
        descricao: "O Menino que Sobreviveu. Um jovem bruxo que descobre seu legado na Escola de Magia e Bruxaria de Hogwarts e lidera a luta contra as forças das trevas."
    },
    {
        id: 2,
        nome: "Voldemort",
        papel: "Antagonista",
        idade: 71,
        descricao: "Aquele-Que-Não-Deve-Ser-Nomeado. Um dos bruxos das trevas mais temidos da história do cinema, obcecado por poder e pela imortalidade."
    },
    {
        id: 3,
        nome: "Tony Stark (Iron Man)",
        papel: "Protagonista",
        idade: 48,
        descricao: "Gênio, bilionário, playboy e filantropo. Criador da armadura do Homem de Ferro e um dos líderes fundadores dos Vingadores."
    },
    {
        id: 4,
        nome: "Thanos",
        papel: "Antagonista",
        idade: 1000, // Idade fictícia aproximada nos cinemas
        descricao: "O Titã Louco. Um conquistador intergaláctico focado em reunir as seis Joias do Infinito para equilibrar o universo à sua própria maneira."
    },
    {
        id: 5,
        nome: "Jack Sparrow",
        papel: "Protagonista",
        idade: 40,
        descricao: "O excêntrico e lendário capitão pirata dos Sete Mares. Conhecido por sua sagacidade, sorte absurda e trejeitos únicos."
    },
    {
        id: 6,
        nome: "Katniss Everdeen",
        papel: "Protagonista",
        idade: 17,
        descricao: "A Garota em Chamas. Uma jovem habilidosa com o arco e flecha que se voluntaria para os Jogos Vorazes e acaba se tornando o símbolo de uma revolução."
    },
    {
        id: 7,
        nome: "Coringa (Joker)",
        papel: "Antagonista",
        idade: 40,
        descricao: "O Palhaço Príncipe do Crime. Um gênio do crime niilista e psicótico que busca instaurar o caos absoluto e testar os limites do Batman."
    },
    {
        id: 8,
        nome: "Marty McFly",
        papel: "Protagonista",
        idade: 17,
        descricao: "Um adolescente típico dos anos 80 que, acidentalmente, viaja no tempo para o ano de 1955 a bordo de um carro DeLorean modificado."
    },
    {
        id: 9,
        nome: "Darth Vader",
        papel: "Antagonista",
        idade: 45,
        descricao: "O temido Lorde Sith e braço direito do Imperador na trilogia clássica, conhecido por sua imponente armadura preta e sua respiração mecânica."
    },
    {
        id: 10,
        nome: "Indiana Jones",
        papel: "Protagonista",
        idade: 38,
        descricao: "Um renomado professor de arqueologia que viaja pelo mundo enfrentando perigos para resgatar relíquias históricas valiosas."
    }
];

// GET /
// Método: GET
// Descrição: Retorna a mensagem padrão de funcionamento da API
app.get("/", (request, response) => {
    response.send("API de Filmes funcionando perfeitamente! Luz, câmera, ação!");
});

// GET /personagens
// Método: GET
// Descrição: Retorna todos os personagens de filmes presentes na API
app.get("/personagens", (request, response) => {
    response.json(personagens);
});

// GET /personagem/id/:id
// Método: GET
// Descrição: Pega um personagem específico por meio do ID
app.get("/personagem/id/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const personagem = personagens.find(p => p.id === id);

    if (!personagem) {
        return response.status(404).json({
            mensagem: "Este ID não corresponde a nenhum personagem no nosso catálogo de filmes."
        });
    }

    response.json(personagem);
});

// GET /personagem/nome/:nome
// Método: GET
// Descrição: Pega um personagem específico por meio do nome
app.get("/personagem/nome/:nome", (request, response) => {
    const nome = request.params.nome.trim().toLowerCase();
    const personagem = personagens.filter(
        p => p.nome.trim().toLowerCase().includes(nome)
    );

    if (personagem.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum personagem com esse nome foi encontrado no elenco."
        });
    }

    response.json(personagem);
});

// GET /personagens/papel/:papel
// Método: GET
// Descrição: Pega um conjunto de personagens pelo papel (ex: Protagonista, Antagonista)
app.get("/personagens/papel/:papel", (request, response) => {
    const papel = request.params.papel.trim().toLowerCase();
    const filtrados = personagens.filter(
        p => p.papel.trim().toLowerCase() === papel
    );

    if (filtrados.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum personagem com esse tipo de papel foi listado."
        });
    }

    response.json(filtrados);
});

app.listen(process.env.porta, () => {
    console.log(`Servidor rodando e pronto para a estreia: http://127.0.0.1:${process.env.porta}`);
});