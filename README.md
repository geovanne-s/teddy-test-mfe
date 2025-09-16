# Desafio Teddy MFE

Este projeto é uma arquitetura de Micro Frontends (MFE) desenvolvida para o desafio Teddy. A aplicação é organizada como um monorepo usando PNPM. A arquitetura de MFE é implementada com o Vite, utilizando o plugin `vite-plugin-federation`, permitindo que os módulos `clients` e `shell` sejam carregados separadamente.

## Arquitetura

O projeto consiste em duas aplicações principais:

* **Shell**: A aplicação principal que serve como "invólucro" para os micro frontends.
    * **URL de acesso:** `http://localhost:8080`
* **Clients**: O micro frontend responsável pelo gerenciamento de clientes.
    * **URL de acesso:** `http://localhost:5001`
    * **Dependência:** O `shell` consome o `remoteEntry.js` do `clients` para carregar o micro frontend em tempo de execução.

## Tecnologias e Ferramentas

O projeto utiliza as seguintes tecnologias:

* **React**: Biblioteca para construção da interface do usuário.
* **Vite**: Ferramenta de build e servidor de desenvolvimento para projetos web modernos.
* **Redux Toolkit**: Gerenciamento de estado.
* **React Router DOM**: Roteamento de componentes.
* **Tailwind CSS**: Estrutura de CSS.
* **PNPM**: Gerenciador de pacotes, utilizado para gerenciar o monorepo.
* **Docker**: Conteinerização das aplicações.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

## Como Executar o Projeto

O projeto pode ser executado facilmente com o Docker Compose.

1.  **Construir e Iniciar os Contêineres:**
    No diretório raiz do projeto, execute o seguinte comando:
    ```bash
    docker-compose up --build
    ```
    Isso irá construir as imagens do Docker para as aplicações `shell` e `clients` e iniciar os contêineres.

2.  **Acessar a Aplicação:**
    * Abra seu navegador e acesse `http://localhost:8080` para ver a aplicação `shell`.
    * A aplicação `clients` é acessada internamente pelo `shell`.

## Estrutura do Projeto

O projeto segue uma estrutura de monorepo:

* `/apps`: Contém os dois micro frontends (`shell` e `clients`).
    * `/apps/shell`: Aplicação principal.
    * `/apps/clients`: Micro frontend de clientes.

## Scripts de Desenvolvimento

Cada aplicação possui seus próprios scripts de desenvolvimento, conforme definido em seus respectivos arquivos `package.json`.

* **`pnpm run dev`**: Inicia o servidor de desenvolvimento.
* **`pnpm run build`**: Compila a aplicação para produção.
* **`pnpm run lint`**: Executa a verificação de código (lint).
* **`pnpm run preview`**: Inicia um servidor local para visualizar a build de produção.
* **`pnpm run test`**: Executa os testes (disponível apenas no `clients`).
* **`pnpm run tailwind:init`**: Inicializa as configurações do Tailwind CSS.
