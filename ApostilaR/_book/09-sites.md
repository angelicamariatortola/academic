# Websites com RMarkdown


Requisitos:

- Conta no [GitHub](https://github.com/)
- R e RStudio instalados
- Pacotes: `rmarkdown`, `knitr`, `usethis`


## Criando um novo projeto

1. Abra o **RStudio**.
2. Vá em `File > New Project > New Directory > Simple R Markdown Website`.
3. Escolha o nome da pasta e o diretório onde será salvo.
4. O RStudio criará um projeto com os arquivos básicos:
  - `index.Rmd`: página inicial
  - `about.Rmd`: página "sobre"
  - `_site.yml`: configurações do site

## Estrutura do arquivo `_site.yml`

Este arquivo controla o menu de navegação, os arquivos e o tema do site.

```yaml
name: "meu_site"
output_dir: "docs"
navbar:
  title: "Meu Site"
  left:
    - text: "Início"
      href: index.html
    - text: "Sobre"
      href: about.html
output:
  html_document:
    theme: flatly
    highlight: textmate
```

A linha `output_dir: "docs"` é importante para publicar no **GitHub Pages**.

## Editar os arquivos .Rmd

Personalize o `index.Rmd` e o `about.Rmd` com seu conteúdo:


```r
---
title: "Bem-vindo ao Meu Site"
output: html_document
---

# Olá!

Este é o meu site feito com **RMarkdown**.
```

## Renderizar o site

Clique em **Build > Build All**, ou execute no console:

```r
rmarkdown::render_site()
```

Isso gera arquivos .html em uma pasta chamada docs/, que será usada para publicação.

**Obs.:** Para adicionar mais abas ao site, criar outros arquivos .Rmd na mesma pasta, atualizar e salvar a informação em `_site.yml`. Após isso, compilar novamente o website em **Build**.

## Publicando no GitHub

**1. Criando um repositório no GitHub**

- Acesse https://github.com.
- Crie um novo repositório.
- Nomeie o repositório em **Repository name** (ex: meusite).
- Defina o repositório como **público** para poder usar o Github Pages.


**2. Subindo os arquivos via terminal **

- Abra o terminal na pasta com os arquivos do site:

```r
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meusite.git
git push -u origin main
```

- Digitar o nome de usuário e senha.
- Caso não lembre a senha, é possível gerar uma nova em: **Settings > Developer Settings > Personal Acess Tokens > Tokens** e clicar em **Generate new token**.
- Deixe o campo **repo** selecionado dentre as opções de **Select scopes**
- Copie e salve o token gerado, pois ele só fica disponível uma vez.


**3. Subindo os arquivos manualmente no github**

- No repositório GitHub, clique em "uploading an existing file";
- Arraste os arquivos ou clique em "choose your files"
- Depois clique em "Commit changes"

Ideal para enviar poucos arquivos ou atualizações simples.

## Ativar o GitHub Pages

- Acesse o repositório no GitHub.
- Vá em **Settings > Pages**.
- Em **Source**, selecione: Deploy from a branch
- Em Branch, selecione:
  - Select Branch: main
  - Select folder: /docs
- Clique para salvar

O GitHub publicará o site em uma URL como: https://seu-usuario.github.io/meusite/
Espere alguns segundos até o site estar no ar.

**Obs.:** Você também pode criar sites personalizados usando o pacote **blogdown** do R (https://bookdown.org/yihui/blogdown/).

## Deletando um repositório

- No repositório clicar em **settings**
- Rolar até o final da página em **Danger Zone**
- Clicar em **Delete this repository** e nas mensagens de confirmação subsequentes.

### Referências {-}

- [Gerador de sites do RMarkdown](https://bookdown.org/yihui/rmarkdown/rmarkdown-site.html)
- [GitHub Pages](https://pages.github.com/)
- [Temas Bootstrap para RMarkdown](https://bootswatch.com/)
- [blogdown: Criando sites com R Markdown](https://bookdown.org/yihui/blogdown/)


### Exercício {-}

a. Crie um novo projeto de Website simples em RMarkdown. Edite o conteúdo do site:

- No arquivo `index.Rmd`, mude o título e adicione um texto com seu nome e formação acadêmica.
- No arquivo `about.Rmd` escreva um parágrafo falando sobre você e seus interesses profissionais.
- Crie um novo arquivo, por exemplo portfolio.Rmd, com algumas imagens que representem seus interesses e vida acadêmica.

b. Atualize o arquivo `_site.yml` para as páginas existentes e compile o site.
c. Crie um novo repositório no github e faça o envio dos seus arquivos.
d. Identifique se o site foi corretamente gerado no link: https://seu_usuario.github.io/seu_site/

