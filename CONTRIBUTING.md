# Contribuindo com o PyLadies Floripa

Que bom ter você contribuindo com o site do PyLadies Floripa! 💜

Este guia explica o fluxo que usamos para fazer alterações no projeto, desde a criação de uma branch até a abertura de um Pull Request (PR).

Se você nunca contribuiu com Git ou GitHub antes, não tem problema. A ideia é que este documento também sirva como um guia para quem está começando.

---

## 1. Antes de começar

Antes de começar uma alteração, procure uma **Issue** relacionada à tarefa.

A Issue ajuda a entender o que precisa ser feito e permite que as pessoas envolvidas acompanhem o trabalho.

Se a tarefa ainda não tiver uma Issue, você pode abrir uma nova descrevendo o que gostaria de fazer.

---

## 2. Como funciona o fluxo do projeto

Utilizamos um fluxo baseado no **Git Flow**.

A `main` representa a versão estável do projeto. A `dev` é utilizada para reunir as alterações que estão sendo desenvolvidas antes de chegarem à versão estável.

Cada tarefa deve ser desenvolvida em uma branch própria, criada a partir da `dev`.

O fluxo é:

```text
main
  ↑
  │
 dev
  ↑
  │
 feat/add-partner-section
```

Na prática:

```text
dev
 │
 ├── feat/add-partner-section
 │
 ├── fix/events-section
 │
 └── docs/add-contributing-guide
        │
        ↓
   Pull Request
        │
        ↓
       dev
```

Depois que as alterações forem revisadas e aprovadas, elas são integradas à `dev`.

A `main` não deve receber diretamente as alterações das branches de desenvolvimento.

---

## 3. Crie uma branch para sua alteração

Antes de criar sua branch, atualize a `dev` local:

```bash
git checkout dev
git pull origin dev
```

Agora crie uma branch para sua tarefa:

```bash
git checkout -b feat/add-partner-section
```

O comando acima cria a branch e já muda você para ela.

A partir desse momento, todas as alterações relacionadas à tarefa devem ser feitas nessa branch.

### Nome da branch

O nome deve seguir o formato:

```text
tipo/descricao-da-alteracao
```

Alguns exemplos:

```text
feat/add-partner-section
fix/events-section
docs/add-contributing-guide
refactor/header-component
style/update-button
```

Os principais tipos que utilizamos são:

| Tipo       | Quando usar                         |
| ---------- | ----------------------------------- |
| `feat`     | Nova funcionalidade                 |
| `fix`      | Correção de um problema             |
| `docs`     | Alteração na documentação           |
| `refactor` | Refatoração de código               |
| `style`    | Alterações visuais ou de formatação |
| `chore`    | Manutenção do projeto               |

Prefira nomes curtos e objetivos que indiquem o propósito da alteração.

### Por que não trabalhar diretamente na `dev`?

A `dev` reúne as alterações que estão em desenvolvimento e também precisa permanecer organizada.

Trabalhar em uma branch separada permite que cada alteração seja revisada individualmente antes de ser integrada ao projeto.

---

## 4. Desenvolva e teste

Agora você pode fazer as alterações necessárias para sua tarefa.

Durante o desenvolvimento, teste o que foi feito e verifique se as alterações não afetaram outras partes do projeto.

Antes de abrir o PR, confira principalmente:

* A alteração funciona como esperado?
* O projeto continua funcionando normalmente?
* Existe algum erro no console?
* Alguma outra parte do site foi afetada?
* Se houve alteração visual, ela está de acordo com o restante do site?

---

## 5. Faça seus commits

Utilizamos **Conventional Commits** para manter o histórico do projeto organizado.

A estrutura básica é:

```text
tipo: descrição
```

Por exemplo:

```bash
git commit -m "feat: add partner section"
```

Outros exemplos:

```bash
git commit -m "fix: adjust events section"
```

```bash
git commit -m "docs: add contributing guide"
```

### Tipos mais comuns

| Tipo       | Quando usar                              |
| ---------- | ---------------------------------------- |
| `feat`     | Nova funcionalidade                      |
| `fix`      | Correção de um problema                  |
| `docs`     | Documentação                             |
| `refactor` | Refatoração sem mudança de comportamento |
| `style`    | Alterações de estilo ou formatação       |
| `chore`    | Manutenção do projeto                    |

Prefira mensagens que expliquem de forma objetiva o que foi alterado.

Por exemplo:

```text
feat: add partner section
```

é melhor do que:

```text
update
```

ou:

```text
changes
```

---

## 6. Envie sua branch para o GitHub

Depois de terminar sua alteração, adicione os arquivos modificados:

```bash
git add .
```

Faça o commit:

```bash
git commit -m "feat: add partner section"
```

E envie sua branch para o GitHub:

```bash
git push -u origin feat/add-partner-section
```

Depois disso, a branch estará disponível no GitHub para que você possa abrir um Pull Request.

---

## 7. Abra um Pull Request

Ao abrir o Pull Request, confira se a **base branch é `dev`**.

O PR deve ser aberto da sua branch para a `dev`:

```text
feat/add-partner-section → dev
```

Não abra o PR diretamente para `main`.

O Pull Request é o momento de explicar para as outras pessoas o que você fez e facilitar a revisão da sua alteração.

### O que colocar no PR?

#### O que foi feito

Explique de forma simples quais foram as alterações.

Por exemplo:

```markdown
## O que foi feito

- Adicionada uma nova seção de parceiros
- Criado o componente para exibir os parceiros
- Adicionados os links dos parceiros
```

Não é necessário explicar cada linha de código. O objetivo é dar uma visão geral da alteração.

---

### Evidências

Se a alteração tiver impacto visual, coloque evidências no PR.

Pode ser um:

* print;
* GIF;
* vídeo curto.

Por exemplo:

```markdown
## Evidências

### Antes

[imagem]

### Depois

[imagem]
```

Isso ajuda quem está revisando a entender rapidamente o resultado da alteração.

Para alterações que não são visuais, explique como a mudança pode ser verificada.

---

### Como testar

Explique o passo a passo necessário para testar sua alteração.

Por exemplo:

```markdown
## Como testar

1. Acesse a página inicial
2. Vá até a seção de parceiros
3. Verifique se os parceiros estão sendo exibidos
4. Clique em um parceiro e verifique se o link funciona
```

Tente deixar o processo simples o suficiente para que outra pessoa consiga testar sem precisar perguntar como fazer.

---

### Relacionando o PR com a Issue

Se sua alteração estiver relacionada a uma Issue, coloque a referência na descrição do PR.

Por exemplo:

```markdown
Closes #123
```

Assim, quando o PR for integrado, a Issue poderá ser fechada automaticamente pelo GitHub.

---

## 8. O que acontece depois do PR?

Depois de abrir o PR:

1. Outra pessoa da equipe revisa a alteração.
2. Podem ser solicitados alguns ajustes.
3. Você faz os ajustes na mesma branch.
4. Cria um novo commit e envia as alterações para o GitHub com git push.
5. Os novos commits serão adicionados automaticamente ao Pull Request já aberto.
6. Depois da aprovação, o PR é integrado à `dev`.

Quando a `dev` estiver pronta para uma nova versão estável, as alterações poderão ser integradas à `main` seguindo o processo de publicação do projeto.

---

## 9. Checklist antes de abrir o PR

Antes de abrir o PR, confira:

* [ ] Criei uma branch a partir da `dev`
* [ ] O nome da branch segue o padrão do projeto
* [ ] Testei minha alteração localmente
* [ ] Meus commits seguem Conventional Commits
* [ ] Expliquei o que foi alterado
* [ ] Adicionei evidências quando necessário
* [ ] Expliquei como testar a alteração
* [ ] O PR está direcionado para `dev`
* [ ] Relacionei o PR à Issue, quando aplicável

---

## 10. Fluxo completo

De forma resumida:

```text
main
  │
  ▼
dev
  │
  ├──► feat/add-partner-section
  │
  ├──► fix/events-section
  │
  └──► docs/add-contributing-guide
             │
             ▼
       Pull Request → dev
             │
             ▼
       revisão e aprovação
             │
             ▼
            merge
```

### Exemplo completo

Suponha que você queira adicionar uma seção de parceiros.

Primeiro, atualize a `dev`:

```bash
git checkout dev
git pull origin dev
```

Crie sua branch:

```bash
git checkout -b feat/add-partner-section
```

Faça o desenvolvimento e os testes.

Depois, crie seu commit:

```bash
git add .
git commit -m "feat: add partner section"
```

Envie a branch:

```bash
git push -u origin feat/add-partner-section
```

No GitHub, abra o Pull Request:

```text
feat/add-partner-section → dev
```

Na descrição do PR, informe:

* o que foi feito;
* como testar;
* evidências da alteração;
* Issue relacionada, quando houver.

Depois da revisão e aprovação, a alteração será integrada à `dev`.

---

## 11. Ficou com dúvida?

Não tem problema!

Se você estiver contribuindo pela primeira vez ou não souber como fazer alguma parte do processo, pergunte.

A ideia do projeto é justamente criar um espaço onde pessoas possam aprender e contribuir juntas. 💜
