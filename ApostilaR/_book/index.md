--- 
title: "Introdução ao R e RMarkdown"
author: "Profª. Angélica Maria T. Ribeiro"
date: "2024-03-22"
output:
  pdf_document: default
  html_document:
    df_print: paged
documentclass: book
bibliography: book.bib
link-citations: yes
github-repo: "rstudio/bookdown-demo"
site: bookdown::bookdown_site
---


# Introdução 

## Sobre o R e RStudio
- O R é uma linguagem de programação e um software voltado para análises estatísticas e de dados
- É de código aberto, sendo gratuito e de livre distribuição.
- Disponível para diferentes sistemas operacionais
- O RStudio também é um software livre, utilizado como ambiente de desenvolvimento integrado para o R

## Referências/Fontes de ajuda

#### Livros {-}
- [Livro: R Cookbook](https://rc2e.com/) [@Teetor2011]
- [Livro: R for Data Science](https://r4ds.had.co.nz/) [@Wickham2017]
- [Livro: The Book of R: A First Course in Programming and Statistics](https://web.itu.edu.tr/~tokerem/The_Book_of_R.pdf) [@Davies2016]
- [Livro: Hands-On Programming with R: Write Your Own Functions and Simulations](https://rstudio-education.github.io/hopr/) [@Grolemund2015]
- [Livro: Learning R: A Step-by-Step Function Guide to Data Analysis](https://duhi23.github.io/Analisis-de-datos/Cotton.pdf) [@Cotton2013]

#### Materiais em português {-}
- [Estatística Computacional com R (LEG/UFPR)](http://cursos.leg.ufpr.br/ecr/)
- [Ciência de Dados em R](https://livro.curso-r.com/index.html)
- [Introdução ao Software R](https://www.est.ufmg.br/~marcosop/est008/aulas/Intro_R.pdf)
- [Introdução ao R](https://www.lampada.uerj.br/arquivosdb/_book2/introducao.html#o-que-%C3%A9-o-r)
- [Introdução ao R: Curso Básico de Linguagem R](https://bookdown.org/wevsena/curso_r_tce/curso_r_tce.html#o-que-e-r)
- [Introdução ao R (Vinícius A., Tania M. e Davi W.)](https://nedurcode.com/r/Intro-R.html#4_Passos_iniciais)
<br>

#### Páginas de ajuda {-}
- [StackOverflow](https://stackoverflow.com/)
- [R-bloggers](https://www.r-bloggers.com/)

Outros materiais podem ser encontrados em: [R Contributed Documentation](https://cran.r-project.org/other-docs.html).


## Instalação do R

- Visitar o site do R: [https://cran.r-project.org/](https://cran.r-project.org/)
- Clicar no link referente ao sistema operacional correspondente
- Fazer a instalação de acordo com as instruções 

<div style="display: flex; justify-content: center; align-items: center;">
<img src="figs/rpage.png" alt="Página do R" width="600">
</div>


## Instalação do RStudio

<!-- ![Página do R](figs/rpage.png) -->
- Visitar a [página do RStudio](https://posit.co/download/rstudio-desktop/)
- Fazer o download do arquivo referente ao sistema operacional correspondente
- Fazer a instalação de acordo com as instruções 

<!-- Pacotes, manual e demonstrações -->
## Estrutura básica 
<!-- interface, personalização, etc -->

<div style="display: flex; justify-content: center; align-items: center;">
<img src="figs/rstudio_interf.png" alt="Página do RStudio" width="600">
</div>

## Introdução à linguagem R

<!-- R como calculadora. Operadores básicos (soma, sub, multi, log, etc). -->
<!-- Operadores lógicos. -->

<!-- **** Capítulo 2 -->
# Estruturas de Dados

## Vetores 
## Matrizes e data frames
## Operações com vetores e matrizes
## Listas 

<!-- **** Capítulo 3 -->
# Importação e Manipulação de dados 




<!-- <!-- **** Capítulo 4 (opcional??? )-->  
<!-- # Funções e Estruturas de controle -->
<!-- ## Construção de funções -->
<!-- ## Loops e condições -->
<!-- <!-- if, else, for, while. --> 
<!-- ## Funções apply, lapply, etc -->




# References {-}



<!-- Para compilar o livro em pdf, fazer no console do R: -->
<!-- bookdown::render_book('index.Rmd', 'bookdown::pdf_book') -->
<!-- ou em html: -->
<!-- bookdown::render_book('index.Rmd', 'bookdown::html_book') -->
<!-- Obs: estava dando erro, pois eu estava colocando uma frase comentada antes de introdução -->
