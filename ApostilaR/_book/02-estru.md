# Estruturas de Dados

A armazenação de dados pode ser feita através de vetores, matrizes ou data frames, o R permite a criação e manipulação desses elementos e conta com comandos úteis para o tratamento de dados. O objetivo deste capítulo é apresentar como é feita a criação e manipulação de estrutura de dados simples como vetores, matrizes, listas e data frames.

## Vetores

O comando `c(...)` é utilizado para a criação de vetores em R, os valores devem ser separados por vírgula. Um vetor pode ser do tipo `numeric` se possuir somente números, do tipo `logical` se possuir somente valores lógicos ou do tipo `character` se possuir palavras ou frases.


``` r
v1 = c(1.3,2.7,6.1)
v2 = c(TRUE,FALSE,FALSE)
v3 = c("olá","mundo")

v4 = c(3.1, "olá", FALSE)
mode(v4)
```

```
## [1] "character"
```

Neste exemplo o vetor `v1` será do tipo `numeric`, o vetor `v2` será do tipo `logical` e o vetor `v3` do tipo `character`. O comando `mode()` informa o tipo de uma variável ou vetor. O vetor `v4` possuiu informações de diversos tipos, quando isso ocorrer todas as informações do serão tratadas como sendo do tipo `character`.

O comando `rep()` pode ser usado para criar um vetor onde suas informações serão repetidas, por exemplo o comando `rep(1,4)` cria um vetor de tamanho 4 onde todas as entradas são iguais ao número 1. O comando `rep()`aceita como entrada intervalos da forma `valor_inicial : valor_final` ou outros vetores.


``` r
v1 = rep(2:6,3)
print(v1)
```

```
##  [1] 2 3 4 5 6 2 3 4 5 6 2 3 4 5 6
```


``` r
v2 = c("probabilidade", "estatistica")
v3 = rep(v2,4)
print(v3)
```

```
## [1] "probabilidade" "estatistica"   "probabilidade" "estatistica"  
## [5] "probabilidade" "estatistica"   "probabilidade" "estatistica"
```

O comando `paste()` pode ser usado para concatenar as entradas correspondentes de um vetor um uma entrada só no formato `caracter`. Por exemplo considere o vetor `v1 = c("olá", "probabilidade &")` e o vetor `v2 = c("mundo", "estatistica")`, o comando `paste(v1,v2)` resulta em um vetor cuja primeira entrada é `olá mundo` e a segunda é `probabilidade & estatistica`.


``` r
v1 = c("olá", "probabilidade &")
v2 = c("mundo", "estatistica")

paste(v1,v2)
```

```
## [1] "olá mundo"                   "probabilidade & estatistica"
```


Vimos que uma sequência de números pode ser criada utilizando a estrutura `valor_inicial : valor_final`, pode se utilizar também o comando `seq()`. O comando `seq()` precisa de três parâmetros principais: valor inicial da sequência, valor final e incremento. Por exemplo, o comando `seq(from = 1, to = 20, by = 2)` cria uma lista de 1 até 20 andando de dois em dois números.


``` r
seq(from = 1, to = 10, by = 2) 
```

```
## [1] 1 3 5 7 9
```

``` r
# gera sequencias de numeros 
# from: valor inicial, to: valor final, 
# by (opcional): Incremento, 
# length.out (opcional): Número total de elementos 

## Mesmo resultado que 'seq(from = 1, to = 20, by = 2)'.
seq(1,20,2) 
```

```
##  [1]  1  3  5  7  9 11 13 15 17 19
```

``` r
## Cria uma lista de 5 números de 1 até 10 igualmente espaçados.
seq(1,10,length.out = 5)
```

```
## [1]  1.00  3.25  5.50  7.75 10.00
```

Para acessar um elemento específico de um vetor basta utilizar o comando `v[i]`, onde `i` é a posição do elemento. Em R o primeiro elemento de um vetor é a posição de número 1, `i=1`, algo importante pois em algumas linguagem de programação o primeiro elemento é a posição de número zero.


``` r
V = c(-3, 6, -1, 9, -11, 16, 0, 3, 1, 45, 2, -8, 9, 6, -4)

V[4] ## Retorna o quarto elemento de V que é 9.
```

```
## [1] 9
```

``` r
V[2:6] ## Retorna os elementos na posição 2 até 6.
```

```
## [1]   6  -1   9 -11  16
```

``` r
V[c(2,7,8,13)] ## Retorna os elemenetos nas posições 2,7,8 e 13.
```

```
## [1] 6 0 3 9
```

``` r
V[V<0] ## Retorna os elementos de V que são menores que zero.
```

```
## [1]  -3  -1 -11  -8  -4
```

Perceba que dentro dos concheteses podem ser passados condições lógicas, por exemplo o comando `V[V<0]` retorna os elementos negativos do vetor. Supondo que estamos interessados na quantidade de entradas do vetor `V` que são múltiplos de 4, podemos usar o comando `length(V[V%%4==0])`, a expressão lógica dentro dos conchetes será verdadeira somente quanto o número for múltiplo de 4.

Então podemos inclusive passar comando dentro dos concheteses como `V[V<0]` que percorre o vetor `V` e retorna os elementos menores que zero. Isso é útil para excluir os valores `NA` ou `NULL` (valores que nulos ou que estão faltando), para basta utilizar dentro dos concheteses o comando `!is.na(V)` (elementos de `V` que não são `NA`) ou `!is.null(V)`.

Para verificar se um objeto é um vetor utilizar a função `is.vector(...)`, que retorna `TRUE` se o objeto for um vetor e `FALSE` se não for. A função `as.vector(...)` recebe como entrada uma variável e tenta, da melhor forma, transforma-la em um vetor.

## Matrizes e data frames

Para a criação de matrizes é utilizado o comando `matrix(...)`. Esse comando tem como parâmetros principais um número ou um vetor, a quantidade de linhas e a quantidade de colunas. Por exemplo, o coamndo `matrix(1,3,3)` cria uma matriz 3x3 onde todos as entradas são iguais a 1. O comando `matrix(V,n,m)` pega os dados do vetor `V` e organiza em uma matriz nxm, primeiro preenchendo as colunas de cima para baixo e depois preenchendo as colunas da esquerda para a direta.


``` r
V = c(-3, 6, -1, 9, -11, 16, 0, 3, 1, 45, 2, -8, 9, 6, -4)

matrix(V,3,5) ## Transforma o vetor V em uma matriz 3x5.
```

```
##      [,1] [,2] [,3] [,4] [,5]
## [1,]   -3    9    0   45    9
## [2,]    6  -11    3    2    6
## [3,]   -1   16    1   -8   -4
```

``` r
matrix(V,3,5,byrow = TRUE) ## Começa preenchendo as linhas depois as colunas.
```

```
##      [,1] [,2] [,3] [,4] [,5]
## [1,]   -3    6   -1    9  -11
## [2,]   16    0    3    1   45
## [3,]    2   -8    9    6   -4
```

Para acessar um elemento específico de uma matriz basta utilizar o comando `M[i,j]`, onde `i` representa a linha e `j` representa a coluna.


``` r
V = c(-3, 6, -1, 9, -11, 16, 0, 3, 1, 45, 2, -8, 9, 6, -4)

M = matrix(V,3,5)

M[2,3] ## Retorna o elemento na linha 2 coluna 3.
```

```
## [1] 3
```

``` r
M[1,] ## Retorna a primeira linha. 
```

```
## [1] -3  9  0 45  9
```

``` r
M[,4] ## Retorna a quarta coluna. 
```

```
## [1] 45  2 -8
```

``` r
## Retorna um pedaço da matriz M formado pelos elementos da linha 1 até a 2 e colunas 3 até a 5. 
M[1:2,3:5] 
```

```
##      [,1] [,2] [,3]
## [1,]    0   45    9
## [2,]    3    2    6
```

Para verificar se um objeto é uma matriz utilizar a função `is.matrix(...)`, que retorna `TRUE` se o obejto for uma matriz e `FALSE` se não for. A função `as.matrix(...)` recebe como entrada uma variável e tenta, da melhor forma, transforma-la em uma matriz.

Semelhantes as matrizes outra forma de organizar os dados pode ser feita utilizando Data Frames. Data Frames são estruturas de dados que organiza os dados em colunas, para a criação de Data Frames pode ser utilizado o comando `data.frame(...)`, onde as entradas serão vetores que irão formar as colunas do Data Frame. No exemplo a seguir o Data Frame represente a quantidade de estudantes de uma turma em cada semestre entre os anos de 2019 - 2024.


``` r
Ano = c(2019,2020,2021,2022,2023,2024)
Primeiro.sem = c(38,18,21,25,22,29)
Segundo.sem = c(39,15,20,21,25,31)
turmas = data.frame(Ano,Primeiro.sem,Segundo.sem)
```

Como o comando `subsets` é possível selecionar um parte do data frame que satisfaz uma condição desejada. Por exemplo, o comando `subset(turmas, Primeiro.sem > 25)`, retorna somente os anos onde a quantidade de alunos no primeiro semestre é maior que 25.

O comando `as.data.frame` pode ser usada para transformar listas de vetores em um Data Frame.


``` r
turmas = list(Ano = c(2019,2020,2021,2022,2023,2024),Primeiro.sem = c(38,18,21,25,22,29),Segundo.sem = c(39,15,20,21,25,31))

as.data.frame(turmas)
```

```
##    Ano Primeiro.sem Segundo.sem
## 1 2019           38          39
## 2 2020           18          15
## 3 2021           21          20
## 4 2022           25          21
## 5 2023           22          25
## 6 2024           29          31
```

O pacote `datasets` possuiu diversos exemplos de Data Frames que podem ser usados e manipulados, para conferir todos os dados disponiveis utilize o comando `library(help = "datasets")`.

## Operações com vetores e matrizes

Para vetores e matrizes são validas as operações básicas de adição, subtração, multiplicação e divisão, essas operações são realizadas elemento a elemento então os vetores devem ter o mesmo tamanho.


``` r
v1 = c(2,12,31,43,1)
v2 = c(11, 22, 17, 81, 20)

v1+v2
```

```
## [1]  13  34  48 124  21
```

``` r
v1-v2
```

```
## [1]  -9 -10  14 -38 -19
```

``` r
v1*v2
```

```
## [1]   22  264  527 3483   20
```

``` r
v1/v2
```

```
## [1] 0.1818182 0.5454545 1.8235294 0.5308642 0.0500000
```

``` r
v1^2
```

```
## [1]    4  144  961 1849    1
```

As mesmas operações podem ser aplicadas as matrizes. As matrizes possuem também comandos próprios para calcular a sua transposta, inversa e matriz identidade.


``` r
A = matrix(c(2,1,0,4),2,2)
B = matrix(c(6,4,2,1),2,2)

t(A) ## Retorna a transposta da matriz A
```

```
##      [,1] [,2]
## [1,]    2    1
## [2,]    0    4
```

``` r
solve(A) ## Retorna a inversa da matriz A
```

```
##        [,1] [,2]
## [1,]  0.500 0.00
## [2,] -0.125 0.25
```

``` r
diag(2) ## matriz identidade 2x2
```

```
##      [,1] [,2]
## [1,]    1    0
## [2,]    0    1
```

A operação `A*B` retorna a multiplicação elemento a elemento para realizar a multiplicação usual de matrizes utilizar o comando `A %*% B`.

## Listas

Vimos que os elementos de um vetor devem ser todos do mesmo tipo, o `mode()` deve ser igual. As listas em R não possuem essa restrição. O comando `list(...)` pode ser usado para a criação de listas. Listas podem conter também diferentes de estrutura de dados como vetores, matrizes e data frames.

Por exemplo, uma lista pode ser utilizada para armazenar o nome, peso, altura de uma pessoa e informar se o IMC está acima de 30 (TRUE se o IMC maior que 30 e FALSE caso contrário).


``` r
pessoa <- list("Pedro", 1.82, 102, TRUE)

mode(pessoa)
```

```
## [1] "list"
```

``` r
pessoa
```

```
## [[1]]
## [1] "Pedro"
## 
## [[2]]
## [1] 1.82
## 
## [[3]]
## [1] 102
## 
## [[4]]
## [1] TRUE
```

Utilizando o comando `mode(pessoa)` vemos que seu tipo é `"list"`. Caso seja necessário verificar o tipo de cada elemento dentro de uma lista pode ser utilizado o comando `str()`, que retorna todos os elementos e especifíca seus tipos.

Quando imprimimos os elementos da lista vemos que cada elemento é indexado utilizando colchetes duplo (`[[i]]`), então para acessar o i-ésimo elemento da lista `pessoa1` utilizamos o comando `pessoa[[i]]`.

A estrutura de listas também permite a utilização de nomes para identificar seus elementos.


``` r
pessoa <- list(Nome = "Pedro", Altura = 1.82, Peso = 102, IMC.Alto = TRUE)

pessoa
```

```
## $Nome
## [1] "Pedro"
## 
## $Altura
## [1] 1.82
## 
## $Peso
## [1] 102
## 
## $IMC.Alto
## [1] TRUE
```

Quando os elementos estiverem nomeados as informações da lista podem ser acessadas utilizando o nome dos elementos. Por exemplo, na lista pessoa se queremos acessar o nome podemos utilizar o comando `pessoa[["Nome"]]` ou `pessoa$Nome`.


``` r
pessoa <- list(Nome = "Pedro", Altura = 1.82, Peso = 102, IMC.Alto = TRUE)

pessoa$Altura
```

```
## [1] 1.82
```

``` r
pessoa[["Peso"]]
```

```
## [1] 102
```

## Exercícios

1.  Dado o vetor `V = c(-3, 6, -1, 9, -11, 16, 0, 3, 1, 45, 2, -8, 9, 6, -4)` crie um comando que retorna somente os elementos maiores que a média desses valores.

2.  Transforme o vetor do exercício anterior em uma matriz (de tamanho arbitrário) e utilize o comando `mean` para calcular a média de cada coluna.

3.  Dado os vetores `A = c(-0.2, 0.1, 5.4, 18, 27, 20, 3, -12, 1.1, 5.8)` e `B = c(13.4, 14.6, 11.8, -8.9, 13.4, 0.5, 6.7,  5.7,  9.2,  5.2)` transforme esses vetores em matrizes e calcule o produto entre essas matrizes.

