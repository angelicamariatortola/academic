# Importação e Manipulação de dados 


## Importação e exportação de Dados

<div style="background-color: #e6f2ff; border: 1px solid #007acc; padding: 10px; border-radius: 5px;">
<details open>
  <summary><strong> Caminhos: </strong></summary>

- Funções de importação/exportação exigem um caminho/endereço do local onde os dados/arquivos estão salvos;
- Podemos passar para estas funções o *caminho absoluto* (caminhos completos que conduzem ao arquivo de interesse);
- O *caminho absoluto* pode dificultar que outras pessoas reproduzam o mesmo código em outros computadores;
- Deste modo, uma boa prática é especificar o **diretório de trabalho** que o R vai considerar como referência. E nas funções de importação ou exportação, nomear apenas o *caminho relativo* (caminho reduzido, ou seja, apenas o nome da pasta ou arquivo de interesse);
- **Diretório de trabalho**: Local/pasta que o R usa de referência para buscar, importar, exportar e salvar arquivos.

</details>
</div>


Para identificar o diretório de trabalho da sessão R usamos `getwd()`. Para definir outro diretório usar `setwd("caminho_do_seu_diretorio")`.


Aqui vamos utilizar o diretório de trabalho:
```r
setwd("/home/angelica/Dropbox/UTFPR/Ensino/Estatistica Computacional com o R/Capitulo 3 - Importacao")
```


### Usando funções básicas do R

#### Importando dados de pacotes {-}

Para visualizar os dados de pacotes instalados no R:

``` r
data(package = .packages(all.available = TRUE))
```

Para visualizar dados específicos de algum pacote:

``` r
data(package = "carData") 
```

Para importar algum conjunto de dados de um pacote:

``` r
# Carregando o conjunto "Adler" do pacote "carData"
data("Adler", package = "carData")
```

Trabalhando com os dados importados:

``` r
# Acessando variáveis destes dados:
Adler$instruction 
```

```
##   [1] good       good       good       good       good       good      
##   [7] good       good       good       good       good       good      
##  [13] good       good       good       good       good       good      
##  [19] good       good       good       good       good       good      
##  [25] good       good       good       good       good       good      
##  [31] good       good       good       good       good       good      
##  [37] scientific scientific scientific scientific scientific scientific
##  [43] scientific scientific scientific scientific scientific scientific
##  [49] scientific scientific scientific scientific scientific scientific
##  [55] scientific scientific scientific scientific scientific scientific
##  [61] scientific scientific scientific scientific scientific scientific
##  [67] scientific scientific scientific scientific scientific scientific
##  [73] none       none       none       none       none       none      
##  [79] none       none       none       none       none       none      
##  [85] none       none       none       none       none       none      
##  [91] none       none       none       none       none       none      
##  [97] none       none       none       none       none       none      
## [103] none       none       none       none       none       none      
## Levels: good none scientific
```

``` r
# Visualizando a estrutura dos dados:
str(Adler)
```

```
## 'data.frame':	108 obs. of  3 variables:
##  $ instruction: Factor w/ 3 levels "good","none",..: 1 1 1 1 1 1 1 1 1 1 ...
##  $ expectation: Factor w/ 2 levels "high","low": 1 1 1 1 1 1 1 1 1 1 ...
##  $ rating     : int  25 0 -16 5 11 -6 42 -2 -13 14 ...
```

``` r
# Visualizando as primeiras linhas dos dados:
head(Adler)
```

```
##   instruction expectation rating
## 1        good        high     25
## 2        good        high      0
## 3        good        high    -16
## 4        good        high      5
## 5        good        high     11
## 6        good        high     -6
```


#### Exportando dados do R para algum diretório {-}

```r
## Exportando arquivos CSV
write.csv(Adler, file = "dados_adler.csv", 
          sep = ",", dec = ".", row.names = FALSE)
## Exportando arquivos TXT
write.table(Adler, file = "dados_adler.txt", 
            sep = " ", dec = ".", row.names = FALSE)
```


#### Importando dados de arquivos locais  {-}

```r
## Arquivos CSV
dados <- read.csv("dados.csv", sep = ",", dec = ".", header = TRUE)
## Arquivos TSV
dados <- read.delim("dados.tsv", sep = "\t", dec = ".", header = TRUE)
## Arquivos TXT
dados <- read.table("dados.txt", sep = "", dec = ".", header = TRUE)
```

**Argumentos:**

- sep → Define o separador de colunas.
- dec → Define o separador decimal.
- header = TRUE → Indica se a primeira linha contém nomes das colunas.

**Comparação:**

- read.csv() → Arquivos CSV padrão (separador "," e decimal ".").
- read.delim() → Arquivos .tsv (tabulação "\t").
- read.table() →  Arquivos .txt. Função mais genérica. Importa arquivos gerais

```r
# Exemplo:
# Dados Adler - extensão txt
dados_adler_txt <- read.table("dados_adler.txt", header = T)
# Dados Adler - extensão csv
dados_adler_csv <- read.csv("dados_adler.csv",  header = T)
# Dados Adler - extensão tsv
dados_adler_tsv <- read.delim("dados_adler.tsv",  header = T)
```

#### Importando dados da Web {-}

Podemos usar as funções `read.table` e `read.csv` também para importar dados da web:
```r
## Extensão txt
dados_web_txt <- read.table("https://angelicamariatortola.github.io/academic/figs/dados_adler.txt", header = T)
## Extensão csv
dados_web_csv <- read.csv("https://angelicamariatortola.github.io/academic/figs/dados_adler.csv", header = T)
```

#### Exercícios {-}

**1.** Considere o pacote `datasets`:

a. Liste os conjuntos de dados disponíveis no pacote.
b. Carregue o conjunto "mtcars" e exiba suas primeiras 6 linhas.
c. Carregue o conjunto "iris" e verifique a sua estrutura.
d. Print os nomes das variáveis dos dados "mtcars" e "iris".
e. Quantas linhas e colunas tem cada um destes conjuntos de dados?

**2.** Crie um arquivo chamado "dados.txt" com o seguinte conteúdo (salve no seu diretório de trabalho):
```r
Nome Idade Altura
Ana 25 1.68
João 30 1.75
Carlos 22 1.80
```
a. Importe esse arquivo usando `read.table()`, definindo corretamente os argumentos.
b. Verifique se o dataset foi carregado corretamente printando seus valores e verificando a sua estrutura.

**3.** Crie um arquivo chamado "dados.csv" com o seguinte conteúdo:
```r
Nome,Idade,Altura
Ana,25,1.68
João,30,1.75
Carlos,22,1.80
Maria,35,1.60
Bia,24,1.65
Joana,26,1.72
```
a. Carregue esse arquivo no R usando `read.csv()`.
b. Exiba as primeiras 4 linhas do dataset.
c. Renomeie as colunas dos dados para "nome", "idade" e "alt". 

**4.** Use o dataset "mtcars" e com a função `write.table()`, exporte apenas os primeiros 10 registros dos dados em um arquivo chamado "mtcars.txt". Centifique-se de que a primeira linha contenha os nomes das colunas, que ele não atribua nomes para as linhas e que os valores sejam separados por ";".


<div id="protectedContent1" style="display:none;">

### Respostas {-}
```r
# 1.
# a.
data(package = "datasets")
# b.
data(mtcars)
head(mtcars)
# c.
data(iris)
str(iris)
# d.
names(mtcars)
names(iris)
# e.
nrow(mtcars); ncol(mtcars)
nrow(iris); ncol(iris)
# 2.
setwd("/home/angelica/Dropbox/UTFPR/Ensino/Estatistica Computacional com o R/Capitulo 3 - Importacao")
# a.
dados_txt <- read.table("dados.txt", sep = " ", header = T)
# b.
str(dados_txt)
# 3.
# a.
dados_csv <- read.csv("dados.csv", sep = ",", header = T)
str(dados_csv)
# b.
head(dados_csv, 4)
# c.
names(dados_csv) <- c("nome", "idade", "alt")
# 4.
write.table(head(mtcars, 10), "mtcars.txt",
            row.names = F, sep = ";")
```

</div>

<input type="password" id="passwordInput1" placeholder="Digite a senha">
<button id="submitButton1">Acesso Professor</button>


<script>

document.getElementById("submitButton1").addEventListener("click", function()
{
  var password = document.getElementById("passwordInput1").value;
  var correctPassword = "0987";

  if (password === correctPassword)
  {
    document.getElementById("protectedContent1").style.display = "block";
  }else
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>


### Usando funções do pacote readr

Esse pacote possibilita ler dados de forma mais eficiente. Transforma os dados em "tibbles" um tipo de estrutura de dados mais "amigável".

O `readr` transforma arquivos de textos em tibbles usando as funções:

  - read_csv(): arquivos separados por vírgula.
  - read_tsv(): arquivos separados por tabulação.
  - read_delim(): arquivos separados por um delimitador genérico. 
O argumento `delim=` indica qual caractere separa cada coluna no arquivo de texto.
  - read_table(): arquivos de texto tabular com colunas separadas por espaço.


```r
library(readr)
dados_readr_delim <- read_delim("dados_adler.txt", col_names = T, 
                                delim = " ")
# delim = "\t" para arquivo separação por tabulação
dados_readr_csv <- read_csv("dados_adler.csv", col_names = T)
```


### Usando funções do pacote readxl

Para ler planilhas do Excel (arquivos .xlsx ou .xls), basta utilizarmos a função `read_excel()` do pacote `readxl`

**Exemplo:** Fazer o download dos dados disponíveis no link: 
https://github.com/curso-r/livro-material/raw/master/assets/data/imdb.zip


```r
# install.packages("readxl")
library(readxl)
imdb <- read_excel("imdb/imdb.xlsx", sheet = 1)
View(imdb)
excel_sheets("imdb/imdb.xlsx") # planilhas dos dados imdb
colnames(imdb)
```


#### Exercícios {-}

Para os exercícios a seguir, baixe os arquivos de dados no link abaixo e salve-os em alguma pasta do seu computador.

[📥 Baixar arquivos de dados (.zip)](data/exercicios_importacao_r.zip)

**1.** Usando funções do pacote `readr`, importe os arquivos:

a. `alunos.csv`.
b. `vendas.csv`.
c. `dados.txt`.
d. `tabela.tsv`.


**2.** Usando funções do pacote `readxl`:

a. Importe a planilha 1 do arquivo `notas.xlsx`.
b. Importe a planilha 2025 do arquivo `financeiro.xlsx`.
c. Importe o intervalo B2:D10 do arquivo `relatorio.xlsx`.
d. Liste os nomes das planilhas do arquivo `multiaba.xlsx`.

**3.** Para cada conjunto de dados anterior, print o seu número de linhas, de colunas e os nomes das variáveis.

<div id="protectedContent2" style="display:none;">

### Respostas {-}
```r
# 1.
library(readr)
setwd("/home/angelica/Dropbox/UTFPR/Ensino/Estatistica Computacional com o R/ApostilaR/data")
df_alunos <- read_csv("exercicios_importacao_r/alunos.csv")
df_vendas <- read_csv2("exercicios_importacao_r/vendas.csv")
df_pipe <- read_delim("exercicios_importacao_r/dados.txt", delim = "|")
df_tsv <- read_tsv("exercicios_importacao_r/tabela.tsv")
# 2.
library(readxl)
df_notas <- read_excel("exercicios_importacao_r/notas.xlsx")
df_financeiro <- read_excel("exercicios_importacao_r/financeiro.xlsx", sheet = "2025")
df_relatorio <- read_excel("exercicios_importacao_r/relatorio.xlsx", range = "B2:D10")
abas <- excel_sheets("exercicios_importacao_r/multiaba.xlsx")
```

</div>

<input type="password" id="passwordInput2" placeholder="Digite a senha">
<button id="submitButton2">Acesso Professor</button>


<script>

document.getElementById("submitButton2").addEventListener("click", function()
{
  var password = document.getElementById("passwordInput2").value;
  var correctPassword = "0987";

  if (password === correctPassword)
  {
    document.getElementById("protectedContent2").style.display = "block";
  }else
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>

----

## Manipulação de Dados

A manipulação de dados consiste na transformação de dados de uma base "crua" para uma base que se possa trabalhar e extrair informações. Alguns pacotes úteis no R para esta finalidade são os pacotes `dplyr` e `tidyr`. Eles utilizam como inputs dados no formato de `tibbles`.


### Tibbles

Tibbles são estruturas de dados mais "amigáveis".

``` r
# Para instalar e carregar
# install.packages("tibble")
library(tibble)
```
Para criar um tibble com a função `as_tibble`:

``` r
as_tibble(mtcars)
```

```
## # A tibble: 32 × 11
##      mpg   cyl  disp    hp  drat    wt  qsec    vs    am  gear  carb
##    <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
##  1  21       6  160    110  3.9   2.62  16.5     0     1     4     4
##  2  21       6  160    110  3.9   2.88  17.0     0     1     4     4
##  3  22.8     4  108     93  3.85  2.32  18.6     1     1     4     1
##  4  21.4     6  258    110  3.08  3.22  19.4     1     0     3     1
##  5  18.7     8  360    175  3.15  3.44  17.0     0     0     3     2
##  6  18.1     6  225    105  2.76  3.46  20.2     1     0     3     1
##  7  14.3     8  360    245  3.21  3.57  15.8     0     0     3     4
##  8  24.4     4  147.    62  3.69  3.19  20       1     0     4     2
##  9  22.8     4  141.    95  3.92  3.15  22.9     1     0     4     2
## 10  19.2     6  168.   123  3.92  3.44  18.3     1     0     4     4
## # ℹ 22 more rows
```

Ele mostra apenas as primeiras linhas e oculta as colunas que não cabem na largura da tela.

Para criar um tibble com a função `tibble()`:


``` r
tibble(
  coluna1 = c("a", "b", "c", "d"),
  coluna2 = 1:4,
  coluna3 = coluna2 ^ 2,
  coluna4 = 0
)
```

```
## # A tibble: 4 × 4
##   coluna1 coluna2 coluna3 coluna4
##   <chr>     <int>   <dbl>   <dbl>
## 1 a             1       1       0
## 2 b             2       4       0
## 3 c             3       9       0
## 4 d             4      16       0
```

 
Podemos observar que:

- Uma coluna pode ser criada a partir de outras;
- Valores únicos são reciclados para todas as linhas dos dados.

o pacote `tibble` possui também algumas funções úteis:

- `add_row()`: para adicionar linhas a uma tibble;
- `add_column()`: para adicionar colunas a uma tibble;


**Exemplo:**

``` r
mtcars_tibble <- as_tibble(mtcars[1:5,c("mpg", "cyl")])

add_row(mtcars_tibble, mpg = 2, cyl = 3)
```

```
## # A tibble: 6 × 2
##     mpg   cyl
##   <dbl> <dbl>
## 1  21       6
## 2  21       6
## 3  22.8     4
## 4  21.4     6
## 5  18.7     8
## 6   2       3
```

``` r
add_column(mtcars_tibble, mpg2 = mtcars_tibble$mpg^2)
```

```
## # A tibble: 5 × 3
##     mpg   cyl  mpg2
##   <dbl> <dbl> <dbl>
## 1  21       6  441 
## 2  21       6  441 
## 3  22.8     4  520.
## 4  21.4     6  458.
## 5  18.7     8  350.
```

### O Operador Pipe (`%>%`)

É uma ferramenta útil para deixar o código mais legível, encadeado e natural, especialmente quando você está aplicando várias funções uma após a outra. A ideia do operador pipe é bem simples: usar o valor resultante da expressão do lado esquerdo como primeiro argumento da função do lado direito.

**Exemplo:** Vamos calcular a raiz quadrada da soma dos valores de 1 a 4.


``` r
library(magrittr)

x <- c(1, 2, 3, 4)

# Sem o Pipe:
sqrt(sum(x))
```

```
## [1] 3.162278
```

``` r
# Com o Pipe:
x %>%
  sum() %>%
  sqrt()
```

```
## [1] 3.162278
```

**Exemplo:** Vamos transpor uma matriz (t()) e calcular a soma de suas colunas (colSums()).

``` r
mat <- matrix(1:9, nrow = 3, byrow = TRUE)

# Sem o Pipe:
colSums(t(mat))
```

```
## [1]  6 15 24
```

``` r
# Com o Pipe:
mat %>%
  t() %>%
  colSums()
```

```
## [1]  6 15 24
```


#### Exercícios {-}

Faça o que se pede com e sem o operador Pipe (%>%):

a. Crie um vetor de 5 números, multiplique cada elemento por 3 e calcule a sua média.
b. Crie um vetor de 10 números, tire o seu valor absoluto e arredonde-o para 1 casa decimal.
c. Crie uma matriz 4x2 com números de 1 a 8, aplique a soma às linhas da matriz e eleve esses valores ao quadrado.
d. Crie uma matriz 2x4 com os números de 1 a 8, multiplique por 2 e calcule a média de cada coluna.


<div id="protectedContent3" style="display:none;">

### Respostas {-}
```r
# a.
c(2, 4, 6, 8, 10) %>%
  `*`(3) %>%
  mean()
# b.
rnorm(10) %>%
  abs() %>%
  round(1)
# c.
mat2 <- matrix(1:8, nrow = 4)
mat2 %>%
  apply(1, sum) %>%
  `^`(2)
# d.
matrix(1:8, nrow = 2) %>%
  `*`(2) %>%
colMeans()
```

</div>

<input type="password" id="passwordInput3" placeholder="Digite a senha">
<button id="submitButton3">Acesso Professor</button>


<script>

document.getElementById("submitButton3").addEventListener("click", function()
{
  var password = document.getElementById("passwordInput3").value;
  var correctPassword = "0987";

  if (password === correctPassword)
  {
    document.getElementById("protectedContent3").style.display = "block";
  }else
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>


### O pacote dplyr

Permite a manipulação de dados de forma clara e eficiente. Algumas de suas principais funções, são:

- `select()`: seleciona colunas
- `arrange()`: ordena a base
- `filter()`: filtra linhas
- `mutate()`: cria ou modifica colunas
- `summarise()`: resume variáveis
- `group_by()`: agrupa os dados
- `count()`: conta observações


Estas funções tem as seguintes características:

- O input e output são estruturas tibble.
- O tibble é colocado no primeiro argumento e o que queremos fazer nos outros argumentos.
- O operador Pipe pode ser usado para facilitar as manipulações.

Vantagens de se usar o dplyr:

- A manipulação de dados fica mais simples.
- O código fica mais intuitivo.
- É possível trabalhar com diferentes fontes de dados.

Primeiramente instalar e carregar o pacote:
```r
# install.packages("dplyr")
# library(dplyr)
```



**Exemplos:** Para ilustrar o pacote `dplyr`, vamos usar os dados do imdb, disponíveis no link: https://github.com/curso-r/livro-material/raw/master/assets/data/imdb.zip



``` r
# library(readr)
data_imdb <- read_csv("data/imdb/imdb.csv",
                      show_col_types = FALSE)
head(data_imdb)
```

```
## # A tibble: 6 × 20
##   id_filme  titulo    ano data_lancamento generos duracao pais  idioma orcamento
##   <chr>     <chr>   <dbl> <chr>           <chr>     <dbl> <chr> <chr>      <dbl>
## 1 tt0092699 Broadc…  1987 1988-04-01      Comedy…     133 USA   Engli…  20000000
## 2 tt0037931 Murder…  1945 1945-06-23      Comedy…      91 USA   Engli…        NA
## 3 tt0183505 Me, My…  2000 2000-09-08      Comedy      116 USA   Engli…  51000000
## 4 tt0033945 Never …  1941 1947-05-02      Comedy…      71 USA   Engli…        NA
## 5 tt0372122 Adam &…  2005 2007-05-17      Comedy…      99 USA   Engli…        NA
## 6 tt3703836 Henry …  2015 2016-01-08      Drama        87 USA   Engli…        NA
## # ℹ 11 more variables: receita <dbl>, receita_eua <dbl>, nota_imdb <dbl>,
## #   num_avaliacoes <dbl>, direcao <chr>, roteiro <chr>, producao <chr>,
## #   elenco <chr>, descricao <chr>, num_criticas_publico <dbl>,
## #   num_criticas_critica <dbl>
```

#### Função `select` (seleciona colunas) {-}


``` r
## Selecionando a coluna título:
# Sem o operador Pipe:
select(data_imdb, titulo)
```

```
## # A tibble: 11,340 × 1
##    titulo                           
##    <chr>                            
##  1 Broadcast News                   
##  2 Murder, He Says                  
##  3 Me, Myself & Irene               
##  4 Never Give a Sucker an Even Break
##  5 Adam & Steve                     
##  6 Henry Gamble's Birthday Party    
##  7 No Way Out                       
##  8 Welcome Home, Roscoe Jenkins     
##  9 Some Kind of Wonderful           
## 10 The Family That Preys            
## # ℹ 11,330 more rows
```

```r
# Com o operador Pipe:
data_imdb %>%
  select(titulo)
```


``` r
## Selecionando as colunas título, ano e orcamento:
# Sem o operador Pipe:
select(data_imdb, titulo, ano, orcamento)
```

```
## # A tibble: 11,340 × 3
##    titulo                              ano orcamento
##    <chr>                             <dbl>     <dbl>
##  1 Broadcast News                     1987  20000000
##  2 Murder, He Says                    1945        NA
##  3 Me, Myself & Irene                 2000  51000000
##  4 Never Give a Sucker an Even Break  1941        NA
##  5 Adam & Steve                       2005        NA
##  6 Henry Gamble's Birthday Party      2015        NA
##  7 No Way Out                         1987  15000000
##  8 Welcome Home, Roscoe Jenkins       2008  35000000
##  9 Some Kind of Wonderful             1987        NA
## 10 The Family That Preys              2008        NA
## # ℹ 11,330 more rows
```

```r
# Com o operador Pipe:
data_imdb %>%
  select(titulo, ano, orcamento)
```

Selecionando uma sequencia de colunas dos dados

``` r
select(data_imdb, titulo:generos)
```

```
## # A tibble: 11,340 × 4
##    titulo                              ano data_lancamento generos              
##    <chr>                             <dbl> <chr>           <chr>                
##  1 Broadcast News                     1987 1988-04-01      Comedy, Drama, Roman…
##  2 Murder, He Says                    1945 1945-06-23      Comedy, Crime, Myste…
##  3 Me, Myself & Irene                 2000 2000-09-08      Comedy               
##  4 Never Give a Sucker an Even Break  1941 1947-05-02      Comedy, Musical      
##  5 Adam & Steve                       2005 2007-05-17      Comedy, Drama, Music 
##  6 Henry Gamble's Birthday Party      2015 2016-01-08      Drama                
##  7 No Way Out                         1987 1987-12-11      Action, Crime, Drama 
##  8 Welcome Home, Roscoe Jenkins       2008 2008-02-08      Comedy, Romance      
##  9 Some Kind of Wonderful             1987 1988-01-13      Drama, Romance       
## 10 The Family That Preys              2008 2008-09-12      Drama                
## # ℹ 11,330 more rows
```

``` r
# ou
# select(data_imdb, 2:5)
```

Funções úteis que podem ser usadas com a função `select()`:

- `starts_with()`: colunas que começam com um texto especificado
- `ends_with()`: colunas que terminam com um texto especificado
- `contains()`: colunas que contêm um texto especificado

**Exemplos:**

``` r
## Selecionando colunas que começam com o texto "num".
select(data_imdb, starts_with("num"))
```

```
## # A tibble: 11,340 × 3
##    num_avaliacoes num_criticas_publico num_criticas_critica
##             <dbl>                <dbl>                <dbl>
##  1          26257                  142                   62
##  2           1639                   35                   10
##  3         219069                  502                  161
##  4           2108                   35                   18
##  5           2953                   48                   15
##  6           2364                   26                   14
##  7          34513                  125                   72
##  8          13315                   45                   74
##  9          27065                  145                   55
## 10           6703                   52                   29
## # ℹ 11,330 more rows
```

``` r
## Selecionando colunas que terminam com o texto "cao".
select(data_imdb, ends_with("cao"))
```

```
## # A tibble: 11,340 × 4
##    duracao direcao                        producao                     descricao
##      <dbl> <chr>                          <chr>                        <chr>    
##  1     133 James L. Brooks                Amercent Films               Take two…
##  2      91 George Marshall                Paramount Pictures           A pollst…
##  3     116 Bobby Farrelly, Peter Farrelly Twentieth Century Fox        A nice-g…
##  4      71 Edward F. Cline                Universal Pictures           A filmma…
##  5      99 Craig Chester                  Funny Boy Films              Follows …
##  6      87 Stephen Cone                   Chicago Media Project        Preacher…
##  7     114 Roger Donaldson                Orion Pictures               A coveru…
##  8     104 Malcolm D. Lee                 Universal Pictures           Dr. RJ S…
##  9      95 Howard Deutch                  Hughes Entertainment         When Kei…
## 10     111 Tyler Perry                    Louisiana Producers Film So… Two fami…
## # ℹ 11,330 more rows
```

``` r
## Selecionando colunas que contém "_".
select(data_imdb, contains("_"))
```

```
## # A tibble: 11,340 × 7
##    id_filme  data_lancamento receita_eua nota_imdb num_avaliacoes
##    <chr>     <chr>                 <dbl>     <dbl>          <dbl>
##  1 tt0092699 1988-04-01         51249404       7.2          26257
##  2 tt0037931 1945-06-23               NA       7.1           1639
##  3 tt0183505 2000-09-08         90570999       6.6         219069
##  4 tt0033945 1947-05-02               NA       7.2           2108
##  5 tt0372122 2007-05-17           309404       5.9           2953
##  6 tt3703836 2016-01-08               NA       6.1           2364
##  7 tt0093640 1987-12-11         35509515       7.1          34513
##  8 tt0494652 2008-02-08         42436517       5.5          13315
##  9 tt0094006 1988-01-13         18553948       7.1          27065
## 10 tt1142798 2008-09-12         37105289       5.7           6703
## # ℹ 11,330 more rows
## # ℹ 2 more variables: num_criticas_publico <dbl>, num_criticas_critica <dbl>
```

Para remover colunas, adicionar "-" antes dos nomes:

``` r
select(data_imdb, -c(ano, direcao))
```

```
## # A tibble: 11,340 × 18
##    id_filme  titulo       data_lancamento generos duracao pais  idioma orcamento
##    <chr>     <chr>        <chr>           <chr>     <dbl> <chr> <chr>      <dbl>
##  1 tt0092699 Broadcast N… 1988-04-01      Comedy…     133 USA   Engli…  20000000
##  2 tt0037931 Murder, He … 1945-06-23      Comedy…      91 USA   Engli…        NA
##  3 tt0183505 Me, Myself … 2000-09-08      Comedy      116 USA   Engli…  51000000
##  4 tt0033945 Never Give … 1947-05-02      Comedy…      71 USA   Engli…        NA
##  5 tt0372122 Adam & Steve 2007-05-17      Comedy…      99 USA   Engli…        NA
##  6 tt3703836 Henry Gambl… 2016-01-08      Drama        87 USA   Engli…        NA
##  7 tt0093640 No Way Out   1987-12-11      Action…     114 USA   Engli…  15000000
##  8 tt0494652 Welcome Hom… 2008-02-08      Comedy…     104 USA   Engli…  35000000
##  9 tt0094006 Some Kind o… 1988-01-13      Drama,…      95 USA   Engli…        NA
## 10 tt1142798 The Family … 2008-09-12      Drama       111 USA   Engli…        NA
## # ℹ 11,330 more rows
## # ℹ 10 more variables: receita <dbl>, receita_eua <dbl>, nota_imdb <dbl>,
## #   num_avaliacoes <dbl>, roteiro <chr>, producao <chr>, elenco <chr>,
## #   descricao <chr>, num_criticas_publico <dbl>, num_criticas_critica <dbl>
```


#### Função `arrange` (ordena a base) {-}


``` r
## Ordenando os dados (crescente) pelo orcamento
arrange(data_imdb, orcamento)
```

```
## # A tibble: 11,340 × 20
##    id_filme  titulo   ano data_lancamento generos duracao pais  idioma orcamento
##    <chr>     <chr>  <dbl> <chr>           <chr>     <dbl> <chr> <chr>      <dbl>
##  1 tt5345298 Patie…  2016 2016-10-11      Horror      116 USA   Icela…         0
##  2 tt7692822 Driven  2019 2019-02-09      Comedy…      90 USA   Engli…         0
##  3 tt3748918 To Yo…  2019 2020-03-17      Animat…      91 USA   Engli…         1
##  4 tt8196068 Twist…  2018 2018-10-03      Drama,…      89 USA   Engli…         3
##  5 tt0772152 Amate…  2006 2006-07-30      Crime,…      71 USA   Engli…        45
##  6 tt1260680 Pathf…  2011 2011-01-11      Action…     100 USA   Engli…        50
##  7 tt1701224 My Na…  2012 2012-10-19      Crime,…      90 USA   Frenc…       300
##  8 tt0054880 Flami…  1963 1963-04-29      Comedy…      45 USA   Engli…       300
##  9 tt1980185 Memor…  2012 2014-03-10      Crime,…      70 USA   Engli…       300
## 10 tt5009236 King …  2015 2015-03-27      Biogra…      46 USA   Engli…       500
## # ℹ 11,330 more rows
## # ℹ 11 more variables: receita <dbl>, receita_eua <dbl>, nota_imdb <dbl>,
## #   num_avaliacoes <dbl>, direcao <chr>, roteiro <chr>, producao <chr>,
## #   elenco <chr>, descricao <chr>, num_criticas_publico <dbl>,
## #   num_criticas_critica <dbl>
```

``` r
# Ordenando os dados (decrescente) pelo orcamento
arrange(data_imdb, desc(orcamento))
```

```
## # A tibble: 11,340 × 20
##    id_filme  titulo   ano data_lancamento generos duracao pais  idioma orcamento
##    <chr>     <chr>  <dbl> <chr>           <chr>     <dbl> <chr> <chr>      <dbl>
##  1 tt4154796 Aveng…  2019 2019-04-24      Action…     181 USA   Engli… 356000000
##  2 tt4154756 Aveng…  2018 2018-04-25      Action…     149 USA   Engli… 321000000
##  3 tt2527336 Star …  2017 2017-12-13      Action…     152 USA   Engli… 317000000
##  4 tt0449088 Pirat…  2007 2007-05-23      Action…     169 USA   Engli… 300000000
##  5 tt2527338 Star …  2019 2019-12-18      Action…     141 USA   Engli… 275000000
##  6 tt3778644 Solo:…  2018 2018-05-23      Action…     135 USA   Engli… 275000000
##  7 tt0348150 Super…  2006 2006-09-01      Action…     154 USA   Engli… 270000000
##  8 tt0398286 Tangl…  2010 2010-11-26      Animat…     100 USA   Engli… 260000000
##  9 tt0413300 Spide…  2007 2007-05-01      Action…     139 USA   Engli… 258000000
## 10 tt2975590 Batma…  2016 2016-03-23      Action…     152 USA   Engli… 250000000
## # ℹ 11,330 more rows
## # ℹ 11 more variables: receita <dbl>, receita_eua <dbl>, nota_imdb <dbl>,
## #   num_avaliacoes <dbl>, direcao <chr>, roteiro <chr>, producao <chr>,
## #   elenco <chr>, descricao <chr>, num_criticas_publico <dbl>,
## #   num_criticas_critica <dbl>
```

``` r
# Ordenando em relação a duas ou mais colunas.
arrange(data_imdb, desc(ano), desc(orcamento))
```

```
## # A tibble: 11,340 × 20
##    id_filme  titulo   ano data_lancamento generos duracao pais  idioma orcamento
##    <chr>     <chr>  <dbl> <chr>           <chr>     <dbl> <chr> <chr>      <dbl>
##  1 tt6587640 Troll…  2020 2020-04-10      Animat…      90 USA   Engli…  90000000
##  2 tt7713068 Birds…  2020 2020-02-06      Action…     109 USA   Engli…  84500000
##  3 tt5774060 Under…  2020 2020-01-30      Action…      95 USA   Engli…  80000000
##  4 tt6820324 Timmy…  2020 2020-03-24      Advent…      99 USA   Engli…  45000000
##  5 tt1634106 Blood…  2020 2020-03-27      Action…     109 USA   Engli…  45000000
##  6 tt100595… Unhin…  2020 2020-09-24      Action…      90 USA   Engli…  33000000
##  7 tt8461224 The T…  2020 2020-08-07      Action…      95 USA   Engli…  30000000
##  8 tt103089… Force…  2020 2020-06-30      Action…      91 USA   Engli…  23000000
##  9 tt4411584 The S…  2020 2020-07-31      Drama,…     107 USA   Engli…  21000000
## 10 tt8244784 The H…  2020 2020-03-24      Action…      90 USA   Engli…  14000000
## # ℹ 11,330 more rows
## # ℹ 11 more variables: receita <dbl>, receita_eua <dbl>, nota_imdb <dbl>,
## #   num_avaliacoes <dbl>, direcao <chr>, roteiro <chr>, producao <chr>,
## #   elenco <chr>, descricao <chr>, num_criticas_publico <dbl>,
## #   num_criticas_critica <dbl>
```


#### Exercícios  {-}

**1.** Considerando o conjunto de dados `mtcars` do pacote `datasets`, faça o que se pede usando o operador Pipe (`%>%`):

a. Selecione todas as colunas que começam com a letra "d".
b. Selecione todas as colunas que terminam com a letra "t".
c. Selecione todas as colunas que contêm a letra "a" no nome.
d. Remova todas as colunas que começam com "c".
e. Remova todas as colunas que contêm "ar".
f. Organize os dados em ordem crescente de mpg (milhas por galão).
g. Organize os dados em ordem decrescente de hp (horsepower).
h. Organize os dados em ordem crescente por cyl (cilindros) e por mpg (milhas por galão).

**2.** Considerando o conjunto de dados `iris` do pacote `datasets`, faça o que se pede usando o operador Pipe (`%>%`)

a. Selecione apenas as colunas que contêm "Length".
b. Selecione todas as colunas exceto as que terminam com "Width".
c. Organize os dados por Sepal.Length em ordem decrescente.
d. Organize os dados por Species e, dentro de cada espécie, por Petal.Width.

<div id="protectedContent4" style="display:none;">
  
### Respostas {-}

```r
# 1. 
mtcars %>% select(starts_with("d"))
mtcars %>% select(ends_with("t"))
mtcars %>% select(contains("a"))
mtcars %>% select(-starts_with("c"))
mtcars %>% select(-contains("ar"))
mtcars %>% arrange(mpg)
mtcars %>% arrange(desc(hp))
mtcars %>% arrange(cyl, mpg)
# 2.
iris %>% select(contains("Length"))
iris %>% select(-ends_with("Width"))
iris %>% arrange(desc(Sepal.Length))
iris %>% arrange(Species, Petal.Width)
```
</div>
  
<input type="password" id="passwordInput4" placeholder="Digite a senha">
<button id="submitButton4">Acesso Professor</button>
  
  
<script>

document.getElementById("submitButton4").addEventListener("click", function() 
{
  var password = document.getElementById("passwordInput4").value;
  var correctPassword = "0987";
  
  if (password === correctPassword) 
  {
    document.getElementById("protectedContent4").style.display = "block";
  }else 
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>

  

  
#### Função `filter` (filtra linhas) {-}


Filtrando linhas para uma coluna:


``` r
# Notas maiores do que 9:
data_imdb %>% filter(nota_imdb > 9)
```


```
## # A tibble: 5 × 8
##   id_filme   titulo          ano data_lancamento generos duracao pais  nota_imdb
##   <chr>      <chr>         <dbl> <chr>           <chr>     <dbl> <chr>     <dbl>
## 1 tt10218912 As I Am        2019 2019-12-06      Drama,…      62 USA         9.3
## 2 tt6735740  Love in Kiln…  2019 2019-06-23      Comedy      100 USA         9.3
## 3 tt0111161  The Shawshan…  1994 1995-02-10      Drama       142 USA         9.3
## 4 tt0068646  The Godfather  1972 1972-09-21      Crime,…     175 USA         9.2
## 5 tt5980638  The Transcen…  2018 2020-06-19      Music,…      96 USA         9.2
```

Usando o filtro para mais de uma coluna:

``` r
# Ano maior do que 2010 e nota maior do que 8.5
data_imdb %>% filter(ano > 2010, nota_imdb > 8.5)
# cada coluna é separada por vírgula
```

```
## # A tibble: 8 × 8
##   id_filme   titulo          ano data_lancamento generos duracao pais  nota_imdb
##   <chr>      <chr>         <dbl> <chr>           <chr>     <dbl> <chr>     <dbl>
## 1 tt10218912 As I Am        2019 2019-12-06      Drama,…      62 USA         9.3
## 2 tt8503618  Hamilton       2020 2020-07-03      Biogra…     160 USA         8.7
## 3 tt6735740  Love in Kiln…  2019 2019-06-23      Comedy      100 USA         9.3
## 4 tt10765852 Metallica & …  2019 2019-10-18      Music       150 USA         8.8
## 5 tt6019206  Kill Bill: T…  2011 2011-03-27      Action…     247 USA         8.8
## 6 tt8241876  5th Borough    2020 2020-06-03      Crime        95 USA         8.6
## 7 tt2170667  Wheels         2014 2017-02-01      Drama       115 USA         8.8
## 8 tt5980638  The Transcen…  2018 2020-06-19      Music,…      96 USA         9.2
```

Combinando as funções `select()` e `filter()`

``` r
# Notas maiores do que 9 e selecionando as colunas titulo e nota_imdb
data_imdb %>%
  filter(nota_imdb > 9) %>%
  select(titulo, nota_imdb)
```

```
## # A tibble: 5 × 2
##   titulo                   nota_imdb
##   <chr>                        <dbl>
## 1 As I Am                        9.3
## 2 Love in Kilnerry               9.3
## 3 The Shawshank Redemption       9.3
## 4 The Godfather                  9.2
## 5 The Transcendents              9.2
```

Combinando a função `filter()` com o operador `%in%`:

``` r
# Filtrando os filmes de direção de Tarantino e Spielberg
# e que tenham nota maior do que 8
data_imdb %>%
  filter(direcao %in% c("Quentin Tarantino", "Steven Spielberg"),
         nota_imdb > 8)
```

```
## # A tibble: 9 × 7
##   id_filme  titulo                 ano data_lancamento generos direcao nota_imdb
##   <chr>     <chr>                <dbl> <chr>           <chr>   <chr>       <dbl>
## 1 tt0110912 Pulp Fiction          1994 1994-10-28      Crime,… Quenti…       8.9
## 2 tt0082971 Raiders of the Lost…  1981 1981-06-12      Action… Steven…       8.4
## 3 tt0097576 Indiana Jones and t…  1989 1989-10-06      Action… Steven…       8.2
## 4 tt0120815 Saving Private Ryan   1998 1998-10-30      Drama,… Steven…       8.6
## 5 tt6019206 Kill Bill: The Whol…  2011 2011-03-27      Action… Quenti…       8.8
## 6 tt0108052 Schindler's List      1993 1994-03-11      Biogra… Steven…       8.9
## 7 tt0105236 Reservoir Dogs        1992 1992-10-09      Crime,… Quenti…       8.3
## 8 tt1853728 Django Unchained      2012 2013-01-17      Drama,… Quenti…       8.4
## 9 tt0107290 Jurassic Park         1993 1993-09-17      Action… Steven…       8.1
```

Para filtrar strings contidas nos valores de alguma variável carater, podemos usar a função `str_detect()` do pacote `stringr`. Esta função serve para verificar se cada string de um vetor de caracteres contém um determinado padrão de texto.


``` r
library(stringr)
# Para visualizar a estrutura da variável "generos":
str(data_imdb$generos)
```

```
##  chr [1:11340] "Comedy, Drama, Romance" "Comedy, Crime, Mystery" "Comedy" ...
```

``` r
# Filtrando os filmes que contém genero "Drama":
head(
  data_imdb %>%
    filter(str_detect(string = generos, pattern = "Drama")) %>%
    select(titulo, generos))
```

```
## # A tibble: 6 × 2
##   titulo                        generos               
##   <chr>                         <chr>                 
## 1 Broadcast News                Comedy, Drama, Romance
## 2 Adam & Steve                  Comedy, Drama, Music  
## 3 Henry Gamble's Birthday Party Drama                 
## 4 No Way Out                    Action, Crime, Drama  
## 5 Some Kind of Wonderful        Drama, Romance        
## 6 The Family That Preys         Drama
```

``` r
# Se não usássemos a função str_detect, ele retornaria apenas as linhas
# que contém exatamente a palavra "Drama":
head(
  data_imdb %>%
    filter(generos == "Drama") %>%
    select(titulo, generos))
```

```
## # A tibble: 6 × 2
##   titulo                                                generos
##   <chr>                                                 <chr>  
## 1 Henry Gamble's Birthday Party                         Drama  
## 2 The Family That Preys                                 Drama  
## 3 Curse of the Starving Class                           Drama  
## 4 The Effect of Gamma Rays on Man-in-the-Moon Marigolds Drama  
## 5 Storm Center                                          Drama  
## 6 The Ticket                                            Drama
```


#### Função `mutate` {-}

Usado para modificar uma coluna existente ou criar uma nova coluna.


``` r
# Transformando a variável duracao de minutos para horas:
data_imdb %>% mutate(duracao = duracao/60)
# Ou criando uma nova variável:
data_imdb %>% mutate(duracao_horas = duracao/60)
```

```
## # A tibble: 11,340 × 6
##    id_filme  titulo                          ano data_lancamento generos duracao
##    <chr>     <chr>                         <dbl> <chr>           <chr>     <dbl>
##  1 tt0092699 Broadcast News                 1987 1988-04-01      Comedy…    2.22
##  2 tt0037931 Murder, He Says                1945 1945-06-23      Comedy…    1.52
##  3 tt0183505 Me, Myself & Irene             2000 2000-09-08      Comedy     1.93
##  4 tt0033945 Never Give a Sucker an Even …  1941 1947-05-02      Comedy…    1.18
##  5 tt0372122 Adam & Steve                   2005 2007-05-17      Comedy…    1.65
##  6 tt3703836 Henry Gamble's Birthday Party  2015 2016-01-08      Drama      1.45
##  7 tt0093640 No Way Out                     1987 1987-12-11      Action…    1.9 
##  8 tt0494652 Welcome Home, Roscoe Jenkins   2008 2008-02-08      Comedy…    1.73
##  9 tt0094006 Some Kind of Wonderful         1987 1988-01-13      Drama,…    1.58
## 10 tt1142798 The Family That Preys          2008 2008-09-12      Drama      1.85
## # ℹ 11,330 more rows
```

```
## # A tibble: 11,340 × 7
##    id_filme  titulo            ano data_lancamento generos duracao duracao_horas
##    <chr>     <chr>           <dbl> <chr>           <chr>     <dbl>         <dbl>
##  1 tt0092699 Broadcast News   1987 1988-04-01      Comedy…     133          2.22
##  2 tt0037931 Murder, He Says  1945 1945-06-23      Comedy…      91          1.52
##  3 tt0183505 Me, Myself & I…  2000 2000-09-08      Comedy      116          1.93
##  4 tt0033945 Never Give a S…  1941 1947-05-02      Comedy…      71          1.18
##  5 tt0372122 Adam & Steve     2005 2007-05-17      Comedy…      99          1.65
##  6 tt3703836 Henry Gamble's…  2015 2016-01-08      Drama        87          1.45
##  7 tt0093640 No Way Out       1987 1987-12-11      Action…     114          1.9 
##  8 tt0494652 Welcome Home, …  2008 2008-02-08      Comedy…     104          1.73
##  9 tt0094006 Some Kind of W…  1987 1988-01-13      Drama,…      95          1.58
## 10 tt1142798 The Family Tha…  2008 2008-09-12      Drama       111          1.85
## # ℹ 11,330 more rows
```

Aplicando `mutate()` com mais colunas:

``` r
# Criando a variável lucro e modificando pais de USA para Estados Unidos
data_imdb_lucro_pais <- data_imdb %>% 
  mutate(lucro = receita - orcamento, pais = "Estados Unidos")

head(data_imdb %>% select(pais))
```

```
## # A tibble: 6 × 1
##   pais 
##   <chr>
## 1 USA  
## 2 USA  
## 3 USA  
## 4 USA  
## 5 USA  
## 6 USA
```

``` r
head(data_imdb_lucro_pais %>% select(lucro, pais))
```

```
## # A tibble: 6 × 2
##      lucro pais          
##      <dbl> <chr>         
## 1 47331309 Estados Unidos
## 2       NA Estados Unidos
## 3 98270999 Estados Unidos
## 4       NA Estados Unidos
## 5       NA Estados Unidos
## 6       NA Estados Unidos
```



#### Exercícios {-}

Nos exercicios a seguir, utilize o operador Pipe (`%>%`).

**1.** Considerando o conjunto de dados `mtcars` do pacote `datasets`:

a. Filtre os carros com mpg (milhas por galão) maior que 25.
b. Filtre os carros com hp maior que 150 e mostre apenas mpg, hp e wt.
c. Filtre os carros com cyl igual a 4 ou 8 (use %in%).

**2.** Considerando o conjunto de dados `iris` do pacote `datasets`:

a. Filtre apenas as observações da espécie que contém "set" no nome.
b. Filtre a espécie que contém "ver" e mostre apenas colunas com "Length".
c. Crie uma nova coluna peso_relativo em mtcars que seja wt / max(wt) (peso relativo).

**3.** Utilize a base imdb nos exercícios a seguir.

a. Ordene os filmes em ordem crescente de ano e decrescente de receita e salve em um objeto chamado filmes_ordenados.
b. Selecione apenas as colunas titulo e orcamento e então ordene de forma decrescente pelo orcamento.
c. Crie uma coluna chamada prejuizo (orcamento - receita) e salve a nova tabela em um objeto chamado imdb_prejuizo. Em seguida, filtre apenas os filmes que deram prejuízo e ordene a tabela por ordem crescente de prejuízo.
d. Fazendo apenas uma chamada da função mutate(), crie as seguintes colunas novas na base imdb:
  - lucro = receita - orcamento
  - lucro_medio
  - lucro_relativo = (lucro - lucro_medio)/lucro_medio
  - houve_lucro = "sim", se lucro > 0 e "não" caso contrário
e. Crie uma nova coluna que classifique o filme em "recente" (posterior a 2000) e "antigo" (de 2000 para trás).


<div id="protectedContent5" style="display:none;">
  
### Respostas {-}

```r
# 1.
mtcars %>%  filter(mpg > 25)
mtcars %>% filter(hp > 150) %>% 
  select(mpg, hp, wt)
mtcars %>% filter(cyl %in% c(4, 8))
# 2.
iris %>% 
  filter(str_detect(Species, "set"))
iris %>% 
  filter(str_detect(Species, "ver")) %>% 
  select(contains("Length"))
mtcars %>% 
  mutate(peso_relativo = wt / max(wt))
# 3.
# a.
filmes_ordenados <- data_imdb %>%
  arrange(ano, desc(receita))
# b. 
data_imdb %>%
  select(titulo, orcamento) %>%
  arrange(desc(orcamento))
# c.
imdb_prejuizo <- data_imdb %>%
  mutate(prejuizo = orcamento - receita) %>%
  filter(prejuizo > 0) %>%
  arrange(prejuizo)
# d.
data_imdb <- data_imdb %>%
  mutate(
    lucro = receita - orcamento,
    lucro_medio = mean(lucro, na.rm = TRUE),
    lucro_relativo = (lucro - lucro_medio) / lucro_medio,
    houve_lucro = if_else(lucro > 0, "sim", "não")
  )
# e.
data_imdb <- data_imdb %>%
  mutate(classificacao = if_else(ano > 2000, "recente", "antigo"))
```

</div>
  
  <input type="password" id="passwordInput5" placeholder="Digite a senha">
  <button id="submitButton5">Acesso Professor</button>
  
  
<script>

document.getElementById("submitButton5").addEventListener("click", function() 
{
  var password = document.getElementById("passwordInput5").value;
  var correctPassword = "0987";
  
  if (password === correctPassword) 
  {
    document.getElementById("protectedContent5").style.display = "block";
  }else 
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>




#### Funções `summarise`, `group_by` e `count` {-}

Para ilustrar estas funções considere os dados:

``` r
filmes <- tibble::tibble(
  titulo = c("A", "B", "C", "D", "E", "F", "G", "H", "I", "J"),
  ano = c(2020, 2021, 2020, 2021, 2021, 2022, 2022, 2020, 2022, 2021),
  genero = c("Ação", "Comédia", "Ação", "Comédia", "Drama", "Ação", 
             "Drama", "Ação", "Comédia", "Drama"),
  receita = c(100, 200, 150, 180, 90, 300, 120, 80, 220, 70),
  orcamento = c(50, 100, 60, 90, 40, 80, 50, 30, 100, 35),
  nota = c(7.5, 8.2, 7.0, 6.8, 7.9, 8.5, 7.2, 6.5, 8.0, 7.4)
)
```

A função `summarise` possibilita calcular medidas resumo para os dados:

``` r
# Calculando a média dos orcamentos:
filmes %>% summarize(media_receita = mean(receita, na.rm = TRUE))
```

```
## # A tibble: 1 × 1
##   media_receita
##           <dbl>
## 1           151
```

``` r
# Calculando a mediana dos orcamentos:
filmes %>% summarize(mediana_receita = median(receita, na.rm = TRUE))
```

```
## # A tibble: 1 × 1
##   mediana_receita
##             <dbl>
## 1             135
```

Calculando várias medidas para a mesma variável:

``` r
filmes %>% summarise(
  media = mean(receita, na.rm = TRUE),
  mediana = median(receita, na.rm = TRUE),
  minimo = min(receita, na.rm = TRUE),
  maximo = max(receita, na.rm = TRUE)
)
```

```
## # A tibble: 1 × 4
##   media mediana minimo maximo
##   <dbl>   <dbl>  <dbl>  <dbl>
## 1   151     135     70    300
```

Calculando medidas para variáveis distintas:

``` r
filmes %>% summarize(
  media_orcamento = mean(orcamento, na.rm = TRUE),
  media_receita = mean(receita, na.rm = TRUE),
  media_nota = mean(nota, na.rm = TRUE)
)
```

```
## # A tibble: 1 × 3
##   media_orcamento media_receita media_nota
##             <dbl>         <dbl>      <dbl>
## 1            63.5           151        7.5
```


A função `group_by`, possibilita aplicar o `summarise` para uma variável por categorias de uma ou mais variáveis.


``` r
# Calculando a receita média dos filmes por ano.
filmes %>% 
  group_by(ano) %>% 
  summarise(receita_media = mean(receita, na.rm = TRUE)) 
```

```
## # A tibble: 3 × 2
##     ano receita_media
##   <dbl>         <dbl>
## 1  2020          110 
## 2  2021          135 
## 3  2022          213.
```

``` r
# Calculando a receita média dos filmes por genero.
filmes %>% 
  group_by(genero) %>% 
  summarise(receita_media = mean(receita, na.rm = TRUE)) 
```

```
## # A tibble: 3 × 2
##   genero  receita_media
##   <chr>           <dbl>
## 1 Ação            158. 
## 2 Comédia         200  
## 3 Drama            93.3
```

``` r
# Calculando a receita média dos filmes por ano e genero.
filmes %>% 
  group_by(ano, genero) %>% 
  summarise(receita_media = mean(receita, na.rm = TRUE)) 
```

```
## `summarise()` has grouped output by 'ano'. You can override using the `.groups`
## argument.
```

```
## # A tibble: 6 × 3
## # Groups:   ano [3]
##     ano genero  receita_media
##   <dbl> <chr>           <dbl>
## 1  2020 Ação              110
## 2  2021 Comédia           190
## 3  2021 Drama              80
## 4  2022 Ação              300
## 5  2022 Comédia           220
## 6  2022 Drama             120
```

A função `group_by` em conjunto com `summarise` também permite contar o número de observações.



``` r
# Calculando o total de filmes por ano.
filmes %>% 
  group_by(ano) %>% 
  summarise(n = n())
```

```
## # A tibble: 3 × 2
##     ano     n
##   <dbl> <int>
## 1  2020     3
## 2  2021     4
## 3  2022     3
```

``` r
# Calculando o total de filmes por genero
filmes %>% 
  group_by(genero) %>% 
  summarise(n = n())
```

```
## # A tibble: 3 × 2
##   genero      n
##   <chr>   <int>
## 1 Ação        4
## 2 Comédia     3
## 3 Drama       3
```

``` r
# Calculando o total de filmes por ano e genero
filmes %>% 
  group_by(ano, genero) %>% 
  summarise(n = n())
```

```
## `summarise()` has grouped output by 'ano'. You can override using the `.groups`
## argument.
```

```
## # A tibble: 6 × 3
## # Groups:   ano [3]
##     ano genero      n
##   <dbl> <chr>   <int>
## 1  2020 Ação        3
## 2  2021 Comédia     2
## 3  2021 Drama       2
## 4  2022 Ação        1
## 5  2022 Comédia     1
## 6  2022 Drama       1
```

Para contagem de observações, a função `count` também pode ser usada:

``` r
# Calculando o total de filmes por ano.
filmes %>% count(ano)
```

```
## # A tibble: 3 × 2
##     ano     n
##   <dbl> <int>
## 1  2020     3
## 2  2021     4
## 3  2022     3
```

``` r
# Calculando o total de filmes por genero
filmes %>% count(genero, sort = TRUE)
```

```
## # A tibble: 3 × 2
##   genero      n
##   <chr>   <int>
## 1 Ação        4
## 2 Comédia     3
## 3 Drama       3
```

``` r
# Calculando o total de filmes por ano e por genero
filmes %>% count(ano, genero)
```

```
## # A tibble: 6 × 3
##     ano genero      n
##   <dbl> <chr>   <int>
## 1  2020 Ação        3
## 2  2021 Comédia     2
## 3  2021 Drama       2
## 4  2022 Ação        1
## 5  2022 Comédia     1
## 6  2022 Drama       1
```


#### Exercícios  {-}

Utilize a base imdb nos exercícios a seguir.

a. Calcule a duração média e mediana dos filmes da base.
b. Calcule o lucro médio dos filmes com duração maior que 2 horas (ou seja, 120 minutos).
c. Apresente na mesma tabela o lucro médio dos filmes com duracao menor que 120 minutos e o lucro médio dos filmes com duracao maior ou igual a 120 minutos.
d. Calcule a nota IMDB média dos filmes por ano de lançamento e ordene em relação ao ano.
e. Calcule a receita média e mediana dos filmes por ano e ordene em relação ao ano. Retorne a tabela sem NA's.

<div id="protectedContent6" style="display:none;">
  
### Respostas {-}

```r
# a.
data_imdb %>% 
  summarise(
    duracao_media = mean(duracao, na.rm = TRUE),
    duracao_mediana = median(duracao, na.rm = TRUE)
  )
# b.
data_imdb %>% 
  filter(duracao > 120) %>% 
  mutate(lucro = receita - orcamento) %>%
  summarise(lucro_medio = mean(lucro, na.rm = TRUE))
# c.
data_imdb %>%
  mutate(lucro = receita - orcamento,
         grupo_duracao = ifelse(duracao < 120, "< 120 min", "≥ 120 min")) %>%
  group_by(grupo_duracao) %>%
  summarise(lucro_medio = mean(lucro, na.rm = TRUE))
# d
notas_por_ano <- data_imdb %>%
  group_by(ano) %>%
  summarise(nota_media = mean(nota_imdb, na.rm = TRUE)) %>%
  arrange(ano)
# e.
receita_por_ano <- data_imdb %>%
  group_by(ano) %>%
  summarise(
    receita_media = mean(receita, na.rm = TRUE),
    receita_mediana = median(receita, na.rm = TRUE)
  ) %>% arrange(ano)  %>%
  filter(!is.na(receita_media), !is.na(receita_mediana))
```

</div>
  
  <input type="password" id="passwordInput6" placeholder="Digite a senha">
  <button id="submitButton6">Acesso Professor</button>
  
  
<script>
document.getElementById("submitButton6").addEventListener("click", function() 
{
  var password = document.getElementById("passwordInput6").value;
  var correctPassword = "0987";
  
  if (password === correctPassword) 
  {
    document.getElementById("protectedContent6").style.display = "block";
  }else 
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>


#### Exercícios do Capítulo 4 <span style="color:red">(Entregar na lista 1)</span>  {-}


**1** Crie um data frame no R com os dados fictícios. Após isso, crie uma pasta no computador chamada "meus_dados" e usando as funções do pacote `readr`, use as funções de exportação para enviar os dados do R, nos formatos txt e csv, para a pasta "meus_dados". Após isso utilize as funções de importação para trazer novamente estes dados para o R. 

**2.** Crie dois conjuntos de dados em duas planilhas distintas de um arquivo de excel e salve o arquivo em alguma pasta do seu computador com a extensão .xlsx. Na sequencia, importe estes dados para o R e exiba os nomes das planilhas, usando funções do pacote `readxl`. 


**3.** Considerando os dados do imdb:

a. Filtre os filmes lançados entre 1990 e 1999 com lucro (receita - orçamento) positivo. Em seguida, mostre apenas titulo, ano e lucro, ordenados por lucro decrescente.
b. Crie uma nova variável lucro = receita - orcamento, e depois: selecione os gêneros "Action", "Drama" e "Comedy", calcule o lucro médio por gênero, ordene do maior para o menor lucro.
c. Crie uma tabela apenas com os diretores que: dirigiram mais de 10 filmes e cuja nota média no IMDb ultrapassa 7.
d. Filtre todos os filmes cujo título contém "Love" e mostre titulo, ano, genero, e nota_imdb, ordenados da maior para a menor nota.
e. Crie uma coluna faixa_lucro com os seguintes critérios:
  - "grande prejuízo" se lucro < -10 milhões
  - "prejuízo moderado" se entre -10M e 0
  - "pequeno lucro" se entre 0 e 10M
  - "grande lucro" se lucro > 10M
  
Depois, mostre a contagem de filmes em cada faixa.


**4.** Pesquise, explique o conceito e dê exemplos de outras 3 funções do pacote `dplyr`.

