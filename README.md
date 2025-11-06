# ONG-ConecTodos

Descrição
---------
Site institucional e de cadastro desenvolvido para a ONG "ConecTodos". O projeto serve como apresentação dos projetos, captura de cadastros e controle simples de permissões de exibição via login simulado.

Recursos principais
-------------------
- Página inicial com missão, visão e valores ([index.html](index.html))
- Página de projetos com cards e formulário para adicionar novos projetos (visível apenas para administradores) ([projetos.html](projetos.html))
- Formulário de cadastro com máscara para CPF e telefone ([cadatro.html](cadatro.html))
- Login simulado com armazenamento do usuário no localStorage e controle de visibilidade por função
  - Autenticação e UI: [`authenticate`](script.js), [`updateUI`](script.js), [`checkPermission`](script.js)
  - Máscaras de entrada: eventos ligados a `#icpf` e `#itelefone` em [`script.js`](script.js)
  - Adição dinâmica de cards: handler ligado a `#addBtn` em [`script.js`](script.js)
- Estilos gerais em [styles.css](styles.css)

Estrutura do repositório
------------------------
- [index.html](index.html) — página inicial
- [projetos.html](projetos.html) — listagem de projetos e formulário de adição
- [cadatro.html](cadatro.html) — formulário de cadastro de usuários
- [script.js](script.js) — lógica de UI, autenticação simulada, máscaras e adição de cards
- [styles.css](styles.css) — estilos globais
- [README.md](README.md) — este arquivo

Como executar localmente
------------------------
1. Abra os arquivos HTML diretamente no navegador (ex.: arrastar `index.html` para o navegador) ou rode um servidor estático;