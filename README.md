# PyLadies Floripa — Guia para a comunidade

Site da comunidade PyLadies Floripa, feito de forma voluntária para facilitar a divulgação de eventos, a história do grupo e os canais de participação.

Este guia explica, em linguagem direta, como **colocar o site no ar com um domínio**, **acessar o portal de eventos** e **manter a agenda atualizada**.

---

## O que é este projeto?

- **Site público** (páginas que qualquer pessoa vê):
  - `/` — Home
  - `/sobre` — História, pilares e projetos
  - `/eventos` — Agenda de workshops, meetups e encontros
- **Portal privado** (só para voluntárias):
  - `/portal` — Adicionar, editar e excluir eventos; trocar senha

O site é estático (React + Vite) e foi pensado para hospedagem na **Hostgator**, na pasta `public_html`.

---

## O que vocês vão precisar

| Item | Para quê |
|------|----------|
| Conta na Hostgator (ou similar) | Hospedar o site |
| Domínio (ex.: `pyladiesfloripa.com.br`) | Endereço público do site |
| Acesso ao **cPanel** | Enviar arquivos, apontar domínio, ver usuário da conta |
| **FileZilla** ou Gerenciador de Arquivos do cPanel | Subir a pasta do site |
| Opcional: alguém com Node.js no computador | Rodar `npm run build` quando houver mudanças no código |

---

## 1. Colocar o domínio no ar (Hostgator)

### 1.1 Domínio comprado na Hostgator

1. Entre no **cPanel** da Hostgator.
2. O domínio costuma apontar automaticamente para `public_html`.
3. Em **Domínios**, confira se o domínio está ligado à pasta correta (geralmente `public_html`).

### 1.2 Domínio comprado em outro lugar (Registro.br, GoDaddy, etc.)

1. No painel do registrador, configure os **DNS** para a Hostgator:
   - Use os nameservers que a Hostgator informou no e-mail de boas-vindas, **ou**
   - Crie um registro **A** apontando para o **IP do servidor** (disponível no cPanel).
2. Na Hostgator, em **Domínios** → **Domínios adicionais** ou **Apontar domínio**, associe o domínio à pasta `public_html`.
3. Aguarde a propagação DNS (pode levar de algumas horas até 48 h).

### 1.3 HTTPS (cadeado verde)

Na Hostgator, use **SSL/TLS** ou **Let's Encrypt** no cPanel para ativar HTTPS no domínio. Hoje isso é essencial para confiança e para o Google indexar bem.

---

## 2. Publicar o site (primeira vez e atualizações)

### Quem tem Node.js no computador (recomendado para quem mantém o código)

```bash
cd frontend
npm install
npm run build
```

Isso gera a pasta **`frontend/dist/`**. Todo o conteúdo de `dist/` deve ir para **`public_html/`** na Hostgator (via FileZilla ou Gerenciador de Arquivos).

**Arquivos importantes que precisam estar em `public_html`:**

| Arquivo | Função |
|---------|--------|
| `index.html` | Página principal do site |
| `assets/` | CSS e JavaScript |
| `photos/` | Fotos da comunidade |
| `.htaccess` | Rotas do site + proteção do `/portal` |
| `.htpasswd` | Senha de acesso do servidor ao portal |
| `robots.txt` | Orienta buscadores (Google) |
| `sitemap.xml` | Mapa do site para SEO |
| `manifest.json` | Ícone/nome ao salvar no celular |

### Atualizar o site depois de mudanças

1. Rode `npm run build` de novo.
2. Envie **todo** o conteúdo de `dist/` para `public_html`, **substituindo** os arquivos antigos.
3. Limpe o cache do navegador (ou abra em aba anônima) para conferir.

### Configurar o domínio no código (SEO)

Antes do build, crie o arquivo `frontend/.env` (copie de `.env.example`):

```env
VITE_SITE_URL=https://seudominio.com.br
```

Use o domínio real, **com** `https://` e **sem** barra no final.

Depois do build, edite também em `public_html`:

- **`sitemap.xml`** — troque `https://pyladiesfloripa.com.br` pelo domínio real.
- **`robots.txt`** — mesma troca na linha do `Sitemap`.

---

## 3. Ajustar a proteção do portal no servidor

O `/portal` tem **duas camadas de senha**:

1. **Senha do servidor** (janela do navegador ao abrir `/portal`)
2. **Senha do portal** (tela dentro do site)

### 3.1 Senha do servidor (HTTP Basic Auth)

No arquivo **`.htaccess`** dentro de `public_html`, localize:

```apache
AuthUserFile "/home/SEU_USUARIO/public_html/.htpasswd"
```

Substitua **`SEU_USUARIO`** pelo **usuário da conta cPanel** da Hostgator (o mesmo que você usa para login no painel).

**Credenciais iniciais do servidor:**

| Campo | Valor inicial |
|-------|----------------|
| Usuário | `voluntaria` |
| Senha | `PyLadiesVoluntarias` |

> **Recomendação de segurança:** depois do primeiro acesso, peça a alguém da equipe técnica para gerar uma nova senha no arquivo `.htpasswd`. O modelo está em `frontend/public/.htpasswd.example`.

Para gerar nova senha no terminal (Mac/Linux):

```bash
htpasswd -nbm voluntaria 'SUA_NOVA_SENHA'
```

Cole o resultado no arquivo `.htpasswd` (uma linha só) e envie de volta para `public_html`.

### 3.2 Senha do portal (dentro do site)

| Campo | Valor inicial |
|-------|----------------|
| Senha | `PyLadiesVoluntarias` |

Para trocar: entre no portal → **Trocar senha** → informe a senha atual e a nova.

---

## 4. Como acessar o portal

1. Abra no navegador: **`https://seudominio.com.br/portal`**
2. O link **não aparece** no menu do site (é proposital, para não divulgar a área admin).
3. Digite a **senha do servidor** (usuário `voluntaria`).
4. Digite a **senha do portal**.
5. Você verá a lista de eventos, busca, filtros e o botão **Adicionar evento**.

**Dica:** salve o link `/portal` nos favoritos do navegador da equipe de voluntárias.

---

## 5. Como gerenciar eventos no portal

### Adicionar evento

1. Clique em **Adicionar evento**.
2. Preencha:
   - **Título** — nome do encontro
   - **Data** — dia do evento
   - **Local** — cidade, bairro ou `Online`
   - **Imagem** — clique em **Escolher imagem** (JPG, PNG ou WebP, até 2 MB)
   - **Descrição** — texto que aparece no card
   - **Link de inscrição** (opcional) — Google Forms, Sympla, etc.
3. Clique em **Adicionar evento**.

### Editar evento

1. Na lista, clique em **Editar** no evento desejado.
2. Altere os campos e salve.

### Excluir evento

1. Clique em **Excluir**.
2. Confirme na mensagem.

### Buscar e filtrar

- **Busca** — por título, local ou tema
- **Mês** — filtra por mês
- **Ordenação** — mais recentes ou ordem alfabética

---

## 6. Importante: eventos e o site público

O portal salva os eventos no **navegador** de quem editou (armazenamento local). Isso significa:

| Situação | O que acontece |
|----------|----------------|
| Você edita no portal no **seu** computador | Você vê as mudanças no **seu** navegador ao abrir `/eventos` |
| Outra pessoa abre o site no **celular dela** | Pode continuar vendo a lista **padrão** que veio no último deploy |

**Para que todos vejam os mesmos eventos**, alguém da equipe precisa **publicar uma nova versão do site** após atualizar os eventos no código (`frontend/src/data/events.ts`) e rodar `npm run build`, **ou** no futuro integrar um backend (painel com banco de dados).

**Fluxo recomendado hoje:**

1. Voluntárias organizam eventos no **portal** (rascunho e conferência).
2. Voluntária com acesso ao código/repositório **replica** os eventos em `events.ts` (ou recebe print/export da lista).
3. Roda `npm run build` e sobe para `public_html`.

Se a comunidade quiser só usar o portal sem passos técnicos, o próximo passo seria contratar/implementar um backend simples — isso pode ser planejado depois.

---

## 7. Outros conteúdos que podem precisar de atualização

| O quê | Onde alterar |
|-------|----------------|
| Link do formulário **Entrar na comunidade** | `frontend/src/data/links.ts` → `signupFormUrl` |
| Link **Quero palestrar** | `frontend/src/data/links.ts` → `speakerFormUrl` |
| Textos da página Sobre, timeline, projetos | `frontend/src/data/aboutPage.ts` |
| Fotos do site | `frontend/public/photos/` + catálogo em `frontend/src/data/photos.ts` |
| Redes sociais (footer) | `frontend/src/data/socialLinks.ts` |

Depois de qualquer mudança nesses arquivos: `npm run build` e novo upload para `public_html`.

---

## 8. Rodar o site no computador (teste local)

Útil antes de publicar mudanças:

```bash
cd frontend
npm install
npm run dev
```

Abre em **http://localhost:5173**

- Portal local: **http://localhost:5173/portal**
- A senha do **servidor** (HTTP Basic) **não vale** no `npm run dev` — só a senha do portal.

---

## 9. Páginas e rotas

| URL | Público? | Descrição |
|-----|----------|-----------|
| `/` | Sim | Home |
| `/sobre` | Sim | Sobre a comunidade |
| `/eventos` | Sim | Agenda completa |
| `/portal` | Não | Gestão de eventos (não indexar no Google) |

Se alguém acessar um endereço que não existe, verá a página **404**.

---

## 10. SEO e Google

- O site já inclui títulos, descrições e dados estruturados para buscadores.
- **`sitemap.xml`** e **`robots.txt`** devem usar o domínio real.
- O **`/portal`** está bloqueado no `robots.txt` para não aparecer no Google.
- Após publicar, cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie o sitemap: `https://seudominio.com.br/sitemap.xml`

---

## 11. Checklist rápido — “site no ar”

- [ ] Domínio apontando para a Hostgator
- [ ] HTTPS ativo
- [ ] Conteúdo de `dist/` em `public_html`
- [ ] `.htaccess` com usuário cPanel correto em `AuthUserFile`
- [ ] `.htpasswd` no `public_html`
- [ ] `VITE_SITE_URL` e `sitemap.xml` com domínio real
- [ ] Testar `/`, `/sobre`, `/eventos`
- [ ] Testar `/portal` (duas senhas)
- [ ] Trocar senhas iniciais
- [ ] Salvar link do portal nas favoritas da equipe

---

## 12. Quem pedir ajuda?

| Tema | Perfil |
|------|--------|
| Domínio, DNS, cPanel, upload | Quem administra a hospedagem |
| Build, `events.ts`, código | Voluntária dev ou quem mantém o repositório |
| Textos e fotos | Equipe de comunicação / voluntárias de conteúdo |
| Senhas do portal | Coordenação da comunidade (guardar com segurança) |

---

## Estrutura do repositório

```
pyladies-floripa/
└── frontend/
    ├── public/          # Fotos, .htaccess, robots.txt, sitemap, favicons
    ├── src/
    │   ├── components/  # Blocos do site (hero, footer, cards…)
    │   ├── data/        # Eventos, links, textos da página Sobre
    │   ├── pages/       # Home, Sobre, Eventos, Portal, 404
    │   └── lib/         # SEO, portal, armazenamento de eventos
    ├── .env.example     # Modelo do domínio para build
    └── package.json
```

---

## Créditos

Site desenvolvido de forma voluntária para a **PyLadies Floripa**.  
Com carinho pela comunidade — para dúvidas sobre este guia, converse com quem entregou o projeto ou com a voluntária responsável pela infraestrutura.
