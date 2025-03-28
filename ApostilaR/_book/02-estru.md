# Estruturas de Dados

No R, as principais estruturas de dados são:

- **Vetores**
- **Fatores**
- **Matrizes**
- **Listas**
- **Data frames**

## Vetores 

Vetores são a estrutura de dados mais básica do R. Um vetor é uma sequência de elementos do mesmo tipo, podendo ser numérico, caracter ou lógico. Pode ser definido como um conjunto de valores: $V=(v_1,v_2,...,v_n)$.


**Principais Características dos Vetores**

1. **Homogeneidade**: Todos os elementos devem ser do mesmo tipo (numérico, lógico ou caractere).
2. **Indexação Baseada em 1**: O acesso aos elementos é feito por índices que começam em 1 (diferente de outras linguagens como Python e C, que começam em 0).
3. **Operações Vetorizadas**: Permite a realização de operações matemáticas diretamente sobre o vetor.
4. **Tamanho Dinâmico**: Podem ser expandidos automaticamente conforme necessário.
5. **Reciclagem de Vetores**: Quando os vetores têm tamanhos diferentes, o vetor menor é reciclado para igualar o comprimento do maior.


#### Criando um vetor {-}
##### Criando um vetor com `c()` {-}

```r
# Vetor numérico
a <- c(1, 2, 3, 4, 5)
# Vetor de caracteres
b <- c("A", "B", "C")
# Vetor lógico
c <- c(TRUE, FALSE, TRUE)
# Vetor misto (convertido para caractere)
d <- c(1, "teste", TRUE)
# Exibindo os vetores
print(a)
print(b)
print(c)
print(d)
```

##### Criando um vetor com `seq()` {-}

Usar $a:b$ cria uma sequência de a a b, ou seja, $a, a+1, a+2, ..., b$
  

``` r
## Criando uma sequencia de 1 a 6
1:6
## Criando uma sequencia de 5 a 10
5:10
## Criando uma sequencia decrescente de 10 a 1
10:1
```

Também podemos usar a função `seq()` para criar sequências:
  

``` r
seq(from = 1, to = 10, by = 2) 
# gera sequencias de numeros 
# from: valor inicial, to: valor final, 
# by (opcional): Incremento, 
# length.out (opcional): Número total de elementos 
```

``` r
## Criando uma sequencia de 1 a 6
seq(from = 1, to = 6, by = 1) #equivalente a 1:6
## Criando uma sequencia de 1 a 10, com 5 elementos
seq(1, 10, length.out = 5)  
```

Criando um vetor com a função `seq()`

``` r
seq1 <- seq(1, 10, length.out = 5) 
```


##### Criando um vetor com `rep()` {-}

``` r
rep(2, times = 3)
# repete números ou vetores
# x: O valor ou vetor a ser repetido.
# times: Número total de repetições do vetor completo.
# length.out: Define o comprimento final do vetor gerado.
# each: Número de repetições de cada elemento individualmente.
# times ou length.out devem ser usados.

## Repete o valor 5, até completar 2 elementos
rep(5, length.out = 2) 
## Repete o vetor c(2,3) até completar 5 elementos
rep(c(2,3), length.out = 5) 
## Repete o vetor c(2,3) até 5 vezes
rep(c(2,3), times = 5)
## Repete cada elemento do vetor c(2,3), 3 vezes
rep(c(2,3), each = 3)
```

Criando um vetor com a função `rep()`
  

``` r
rep1 <- rep(c(1,2), each = 3)
```

##### Criando um vetor com `scan()` {-}

A função `scan()`  é utilizada para ler dados de entrada e criar vetores. Ela é muito útil para ler dados de um arquivo ou diretamente do console.

**Exemplo - Vetor numérico:** Considere os valores `10  20  30  40  60`. Para ler no R, fazemos:
```r
# Copie os dados acima. 
# Digite o código abaixo no Console do R:
x <- scan()
# Pressione Enter. 
# Cole os valores no Console.
# Para finalizar, pressione Enter 2 vezes.
print(x)
```

**Exemplo - Vetor de caracteres:** Considere os valores `Ana Mateus Carlos Tati`. Para ler no R, fazemos:
```r
# Copie os dados acima. 
# Digite o código abaixo no Console do R:
nomes <- scan(what = character())
# Pressione Enter. 
# Cole os valores no Console.
# Para finalizar, pressione Enter 2 vezes.
print(nomes)
```

**Exemplo - Separador diferente:** Considere os valores `1,2,3,4,5`. Para ler no R, fazemos:
```r
# Copie os dados acima. 
# Digite o código abaixo no Console do R:
valores <- scan(sep = ",")
# Pressione Enter. 
# Cole os valores no Console.
# Para finalizar, pressione Enter 2 vezes.
print(valores)
```

#### Manipulação e características de vetores {-}

```r
# Criando um vetor:
a <- c(1,2,5,7,8,10)
# Primeiro elemento de a
a[1]
# Último elemento
a[6]
# Subconjunto de elementos
a[2:4]
# Elementos específicos
a[c(1, 3, 5)]
```

Modificando valores do vetor $a$:
```r
# Substituindo um elemento
a[2] <- 99
print(a)
# Adicionando novos elementos
a <- c(a, 200)
print(a)
# ou usando a função append():
a <- append(a, 300)
# Removendo alguma posição do vetor:
a <- a[-2]
# Removendo mais de uma posição do vetor:
a <- a[-c(2,3)]
```

Nomeando os Elementos do Vetor
```r
# Nomes do vetor a:
names(a)
# Atribuindo nomes para o vetor a:
names(a) <- c("x1", "x2", "x3", "x4", "x5")
a["x1"]  # Retorna 3 (elemento nomeado "a")
```

Algumas características sobre o vetor: 

``` r
# Seja o vetor numérico:
vec_num <- c(3,6,7,9)
# Seja o vetor de caracteres:
vec_carac <- c("A","B","C")
# Seja o vetor de valores lógicos:
vec_logi <- c(TRUE, TRUE, FALSE)
```

```r
# (1) Tamanho (número de elementos):
length(vec_num)
length(vec_carac)
length(vec_logi)
# (2) estrutura:
str(vec_num)
str(vec_carac)
str(vec_logi)
```

Perguntando sobre o tipo do vetor:
```r
# is.vector -> identifica qualquer tipo de vetor
is.vector(vec_num)
is.vector(vec_carac)
is.vector(vec_logi)

# is.character -> identifica vetores de caracteres
is.character(vec_num)
is.character(vec_carac)
is.character(vec_logi)

# is.logical -> identifica vetores de valores logicos
is.logical(vec_num)
is.logical(vec_carac)
is.logical(vec_logi)
```

Para converter vetores de um tipo para outro tipo, funções `as.vector`, `as.character`, `as.logical`:
```r
# as.character -> Transforma em vetor de caracteres
vec_num_carac <- as.character(vec_num)
str(vec_num_carac)

vec_logi_carac <- as.character(vec_logi)
str(vec_logi_carac)

# as.logical -> Transforma em vetor de valores lógicos
vec_num_logi <- as.logical(c(0,1,1,0))
str(vec_num_logi)
```


#### Exercícios {-}

**1.** Gere o seguinte vetor usando `rep()`: `5 5 5 5 5 10 10 10 10 10`.

<!-- **2.** Crie um vetor que contenha a sequência 1, 2, 3 repetindo cada número 4 vezes consecutivamente. -->

**2.** Use rep() para gerar um vetor que repita c("A", "B", "C") até atingir o tamanho exato de 8 elementos.

**3.** Use seq() para gerar uma sequência de números de 1 a 20, pulando de 2 em 2.

<!-- **4.** Gere uma sequência de 10 a 0, com passo de -2. -->

**4.** Crie uma sequência de 5 números entre 0 e 1, com espaçamento igual entre eles.

**5.** A partir do vetor `v <- c(5, 10, 15, 20, 25, 30)`, extraia os elementos da posição 2 até a 5.

**6.** Dado `v <- c(3, 7, 12, 18, 25)`, obtenha apenas os valores maiores que 10.

**7.** Dado `v <- c(10, 20, 30, 40, 50)`, substitua os elementos das posições 2 e 4 por 999.

**8.** Dado `v <- c(2, 4, 6, 8, 10)`, remova o número que está na posição 4.

**9.** Dado `v <- c("1", "2", "3", "4")`, converta-o para numérico.

**10.** Dado `v <- c(100, 200, 300)`, converta-o para caractere.

**11.** Leia os valores: `3.5 7.2 9.8 5.1 6.3`, usando a função `scan()`. Conte o número de elementos do vetor.

**12.** Leia os valores: `10;20;30;40;50`, usando a função `scan()`.

**13.** Leia os nomes: `Maria Isabel,Aurora,Teresa,Luis,Antonio`, usando a função `scan()`. Identifique a estrutura do vetor.

<!-- **5.** Combine seq() e rep() para gerar o seguinte vetor: `1 1 2 2 3 3 4 4 5 5` -->

<!-- Desafio Extra: Usando seq() e rep(), crie um vetor  -->
<!-- que contenha a sequência de anos de 2000 a 2024,  -->
<!-- repetindo cada ano 3 vezes antes de passar para o próximo. -->

<!-- ## Desafio Extra -->

<!-- # ```{r} -->
<!-- # # Anos de 2000 a 2024 repetindo cada ano 3 vezes -->
<!-- # rep(seq(2000, 2024), each = 3) -->
<!-- # ``` -->


<div id="protectedContent1" style="display:none;">
  
### Respostas {-}
```r
# 1. 
rep(c(5, 10), each = 5)
# 2. 
rep(c("A", "B", "C"), length.out = 8)
# 3. 
seq(1, 20, by = 2)
# 4. 
seq(0, 1, length.out = 5)
# 5. 
v <- c(5, 10, 15, 20, 25, 30)
v[2:5]  # Elementos da posição 2 até 5
# 6. 
v <- c(3, 7, 12, 18, 25)
v[v > 10]  # Retorna valores maiores que 10
# 7. 
v <- c(10, 20, 30, 40, 50)
v[c(2, 4)] <- 999  # Modifica as posições 2 e 4
# 8. 
v <- c(2, 4, 6, 8, 10)
v <- v[-4]  # Remove o quarto elemento
v
# 9. 
v <- c("1", "2", "3", "4")
v_numeric <- as.numeric(v)
v_numeric
# 10. 
v <- c(100, 200, 300)
v_char <- as.character(v)
v_char
# 11. 
x <- scan()
# 12. 
x <- scan(sep = ";")
# 13.
x <- scan(what = character(), sep = ",")
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


<br>

#### Operações com vetores {-}

**Operações Aritméticas (elemento a elemento)**

``` r
# Considere os valores:
a <- 2
v1 <- c(1, 2, 3)
v2 <- c(4, 5, 6)
```
```r
## Soma
# Soma de vetores:
v1+v2
# Soma de vetor com escalar:
v1+a
## Subtração
# Subtração de vetores:
v1-v2
# Subtração de vetor com escalar:
v1-a
## Multiplicação
# Multiplicação de vetores
v1*v2
# Multiplicação de vetor com escalar:
v1*a
## Divisão
# Divisão de vetores
v1/v2
# Resto da divisão
v2%%v1
# Parte inteira da divisão
v2%/%v1
# Divisão de vetor por escalar:
v1/a
```
```r
## Potenciação
# Potenciação de vetores
v1^v2
# Potenciação de vetor por escalar:
v1^a
## Produto Escalar
v1%*%v2
# equivalente a:
sum(v1*v2)
```

**Reciclagem de Vetores**

Quando os vetores têm tamanhos diferentes, o vetor menor é reciclado para igualar o comprimento do maior.

``` r
v1 <- c(1, 2, 3, 4)
v2 <- c(10, 20)
v1 + v2  
```

```
## [1] 11 22 13 24
```


**Operações Lógicas e de Comparação**
```r
v1 > v2  
v1 < v2 
v1 == v2 
v1 != v2  
# Considere os valores:
x1 <- c(TRUE, FALSE, TRUE)
x2 <- c(FALSE, FALSE, TRUE)
x1 & x2
x1 | x1  
!x1      
```


#### Exercícios {-}

**1.** Calcule o cubo dos números inteiros de 1 a 100, ou seja, $1^3, 2^3, ..., 100^3$.

**2.** Sejam `v1 <- c(3, 6, 9, 12)` e `v2 <- c(2, 4, 6, 8)`.

- Calcule v1 + v2, v1 - v2, v1 * v2 e v1 / v2.
- Eleve cada elemento de v1 ao quadrado.
- Calcule a raiz quadrada de cada elemento de v2.
- Calcule o produto escalar entre os vetores.

**3.** Considere `v3 <- c(10, 20, 30)` e `v4 <- c(5, 15)`.

- Some v3 + v4. O que aconteceu?
- Multiplique v3 * v4. O que aconteceu?
- Explique o conceito de reciclagem de vetores com base no resultado.

**4.** Considere `v6 <- c(10, 15, 20, 25)` e `v7 <- c(12, 15, 18, 28)`.

- Compare v6 e v7 usando >, <, ==, !=.
- Quais valores de v6 são maiores que 15?
- Quais valores de v7 são menores ou iguais a 20?


<div id="protectedContent2" style="display:none;">
  
### Respostas {-}

``` r
# 1. 
x <- 1:100
x^3
```

```
##   [1]       1       8      27      64     125     216     343     512     729
##  [10]    1000    1331    1728    2197    2744    3375    4096    4913    5832
##  [19]    6859    8000    9261   10648   12167   13824   15625   17576   19683
##  [28]   21952   24389   27000   29791   32768   35937   39304   42875   46656
##  [37]   50653   54872   59319   64000   68921   74088   79507   85184   91125
##  [46]   97336  103823  110592  117649  125000  132651  140608  148877  157464
##  [55]  166375  175616  185193  195112  205379  216000  226981  238328  250047
##  [64]  262144  274625  287496  300763  314432  328509  343000  357911  373248
##  [73]  389017  405224  421875  438976  456533  474552  493039  512000  531441
##  [82]  551368  571787  592704  614125  636056  658503  681472  704969  729000
##  [91]  753571  778688  804357  830584  857375  884736  912673  941192  970299
## [100] 1000000
```

``` r
# 2. 
v1 <- c(3, 6, 9, 12)
v2 <- c(2, 4, 6, 8)
v1 + v2
```

```
## [1]  5 10 15 20
```

``` r
v1 - v2
```

```
## [1] 1 2 3 4
```

``` r
v1 * v2
```

```
## [1]  6 24 54 96
```

``` r
v1 / v2
```

```
## [1] 1.5 1.5 1.5 1.5
```

``` r
v1^2
```

```
## [1]   9  36  81 144
```

``` r
sqrt(v2)
```

```
## [1] 1.414214 2.000000 2.449490 2.828427
```

``` r
v1%*%v2
```

```
##      [,1]
## [1,]  180
```

``` r
# 3. 
v3 <- c(10, 20, 30) 
v4 <- c(5, 15)
v3+v4
```

```
## Warning in v3 + v4: longer object length is not a multiple of shorter object
## length
```

```
## [1] 15 35 35
```

``` r
v3*v4
```

```
## Warning in v3 * v4: longer object length is not a multiple of shorter object
## length
```

```
## [1]  50 300 150
```

``` r
# 4. 
v6 <- c(10, 15, 20, 25) 
v7 <- c(12, 15, 18, 28)
v6>v7
```

```
## [1] FALSE FALSE  TRUE FALSE
```

``` r
v6<v7
```

```
## [1]  TRUE FALSE FALSE  TRUE
```

``` r
v6==v7
```

```
## [1] FALSE  TRUE FALSE FALSE
```

``` r
v6!=v7
```

```
## [1]  TRUE FALSE  TRUE  TRUE
```

``` r
v6[v6>15]
```

```
## [1] 20 25
```

``` r
v7[v7 <= 20]
```

```
## [1] 12 15 18
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


<br>


#### Funções úteis para vetores {-}

**`sum()` - Soma dos elementos do vetor**
```r
x <- c(1, 3, 7, 8, 15)
sum(x)  
```
**`length()` - Tamanho do vetor**
```r
x <- c(2, 4, 6, 8, 10)
length(x)  
```
**`sort()` - Ordenar um vetor**
```r
x <- c(10, 5, 8, 3, 1)
sort(x)  # Ordenação crescente
sort(x, decreasing = TRUE)  # Ordenação decrescente
```
**`which()` - Índices que satisfazem uma condição**
```r
x <- c(10, 20, 30, 40, 50)
which(x > 25)  # Retorna os índices dos elementos maiores que 25
```
**`unique()` - Elementos únicos**
```r
x <- c(1, 2, 2, 3, 3, 3, 4, 4, 4, 4)
unique(x)  # Retorna os valores únicos
```
**`table()` - Frequência dos elementos**
```r
x <- c("A", "B", "A", "C", "B", "B", "A")
table(x)  # Conta quantas vezes cada letra aparece
```
**`%in%` - Operador de Pertinência**

Verifica se os elementos de um vetor estão presentes em outro.

```r
x <- c(1, 2, 3, 4, 5)
y <- c(2, 4, 6)
x %in% y  # Verifica quais elementos de x estão em y
# Terá o tamanho de x
# Se quisermos filtrar os valores de x que estão em y:
x[x %in% y]  # Retorna apenas os elementos de x que também estão em y
```



Table: (\#tab:unnamed-chunk-13)Resumo das Funções para Vetores no R

|  Funcao  |                       Descricao                        |                   Exemplo                    |
|:--------:|:------------------------------------------------------:|:--------------------------------------------:|
|  sum()   |              Soma dos elementos do vetor               |             sum(c(1, 4, 2)) → 7              |
| length() |              Número de elementos do vetor              |            length(c(1, 2, 3)) → 3            |
|  sort()  |              Ordena os elementos do vetor              |           sort(c(5, 1, 3)) → 1 3 5           |
| which()  |    Indices dos elementos que atendem a uma condição    |         which(c(2, 5, 8) > 4) → 2 3          |
| unique() |               Valores únicos de um vetor               |       unique(c(1, 1, 2, 3, 3)) → 1 2 3       |
| table()  |          Frequência de cada elemento do vetor          |      table(c('A', 'B', 'A')) → A:2 B:1       |
|   %in%   | Verifica se os elementos de um vetor pertencem a outro | c(2, 3, 4) %in% c(3, 4, 5) → FALSE TRUE TRUE |


#### Valores perdidos e especiais {-}

Valores perdidos devem ser definidos como `NA` (not available):
```r
x <- c(1, 3, NA, 2)
x
```

Outros valores especiais são `NaN` (not a number),`-Inf` (menos infinito) e `Inf` (mais infinito):
```r
y <- 0/0
print(y)
z <- 1/0
print(z)
```

Podemos testar a presença de valores especiais:
```r
# Testando presença de NA:
x <- c(1, 3, NA, 2)
is.na(x)
# ou
any(is.na(x))
# Testando presença de NaN:
y <- 0/0
is.na(y)
# Testando presença de -Inf ou Inf:
z <- 1/0
is.infinite(z)
```

## Fatores

Os fatores no R são similares aos vetores de caracteres. No entanto, o fator contém categorias (niveis), armazenando valores que pertencem a estes níveis. Para criar fatores, usa-se a função `factor()`.


``` r
# Vetor de caracteres
cores_char <- c("azul", "vermelho", "verde", "azul")
print(cores_char) # O vetor de caracteres apenas contém texto.
```

```
## [1] "azul"     "vermelho" "verde"    "azul"
```

``` r
# Fator
cores_fac <- factor(cores_char)
print(cores_fac) # O fator atribui níveis aos valores.
```

```
## [1] azul     vermelho verde    azul    
## Levels: azul verde vermelho
```

Conversão de fator e vetor de caracteres:

``` r
# Conversão de fator para vetor de caracteres 
as.character(cores_fac)
```

```
## [1] "azul"     "vermelho" "verde"    "azul"
```

``` r
# Conversão de vetor de caracteres para fator 
factor(cores_char)
```

```
## [1] azul     vermelho verde    azul    
## Levels: azul verde vermelho
```

``` r
# ou usando as.factor():
as.factor(cores_char)
```

```
## [1] azul     vermelho verde    azul    
## Levels: azul verde vermelho
```

<div style="background-color: #e6f2ff; border: 1px solid #007acc; padding: 10px; border-radius: 5px;">
<details open>
  <summary><strong> Quando Usar Cada Um? </strong></summary>

- *Caracteres (character)*: se os dados forem simplesmente rótulos sem necessidade de categorias ordenadas ou níveis fixos.

- *Fatores (factor)*: se os dados representam categorias que serão usadas em análises estatísticas ou visualizações gráficas.

</div>
</p>
</details>

A ordem dos níveis dos fatores pode também ser modificada através do argumento `levels`:


``` r
cores_levels <- factor(c("azul", "vermelho", "verde", "azul"),
                levels = c("verde","azul","vermelho"))
cores_levels
```

```
## [1] azul     vermelho verde    azul    
## Levels: verde azul vermelho
```

Além disso, os níveis dos fatores podem também ser explicitamente definidos como *ordenados*, com o argumento `ordered = TRUE`:

``` r
satisfacao <- factor(c("Ruim", "Bom", "Excelente", "Bom", "Ruim"),
              levels = c("Ruim", "Bom", "Excelente"), 
              ordered = TRUE)
satisfacao
```

```
## [1] Ruim      Bom       Excelente Bom       Ruim     
## Levels: Ruim < Bom < Excelente
```

<div style="background-color: #e6f2ff; border: 1px solid #007acc; padding: 10px; border-radius: 5px;">
<details open>
  <summary><strong> Comparação entre ordered = TRUE e ordered = FALSE </strong></summary>
- `ordered = TRUE`: implica que o R respeita a ordem entre os níveis, permitindo comparações e análises baseadas nessa ordem (variáveis ordinais).
- `ordered = FALSE`: significa que os níveis são apenas categorias e não são comparáveis em termos de hierarquia ou ordem (variáveis nominais).

</div>
</p>
</details>


Outras funções úteis para fatores:
```r
# Níveis do fator
levels(cores_levels)
# Número de níveis do fator
nlevels(cores_levels)
```

#### Exercícios {-}

**1.** Dado o vetor:
```r
v1 <- c(2, 4, 6, 2, 8, 6, 10, 2, 4, 6)
```

Use funções do R para:

a. Contar o número total de elementos do vetor.
b. Encontrar os elementos únicos do vetor.
c. Ordenar os valores do vetor em ordem decrescente.

**2.** Dado o vetor de fatores:
```r
fatores <- factor(c("A", "B", "A", "C", "B", "A", "C", "B", "C", "A"))
```

Use funções do R para:

a. Contar quantas vezes cada nível aparece.
b. Listar os níveis únicos do fator.

**3.** Dados os vetores:
```r
v2 <- c(5, 10, 15, 20, 25)
v3 <- c(10, 20, 30)
```

a. Verifique quais elementos de v2 estão presentes em v3 usando `%in%`.
b. Use a função `which()` para encontrar as posições dos valores de v2 que estão presentes em v3.

**4.** Dado o vetor: `v4 <- c(10, NA, 30, 50, NA, NaN, 20)`:

a. Calcule a soma de todos os elementos, ignorando os valores ausentes (NA e NaN).

b. Calcule o número de elementos não ausentes no vetor.

c. Ordene o vetor em ordem crescente, colocando os valores ausentes por último.

d. Use a função `which()` para encontrar a posição dos valores ausentes no vetor.

**5.** Dado o vetor de fatores:
```r
categorias <- factor(c("A", "B", "A", "C", "B", "A", "B", "C", "A", "C"))
```

a. Use `table()` para contar as frequências de cada nível.
b. Altere o nível "B" para "X" e recalcule as frequências.
c. Ordene os niveis em ordem alfabética usando `sort()` e recalcule as frequências.


<div id="protectedContent3" style="display:none;">
  
### Respostas {-}


``` r
# 1. 
v1 <- c(2, 4, 6, 2, 8, 6, 10, 2, 4, 6)
length(v1)
```

```
## [1] 10
```

``` r
unique(v1)
```

```
## [1]  2  4  6  8 10
```

``` r
sort(v1, decreasing = T)
```

```
##  [1] 10  8  6  6  6  4  4  2  2  2
```

``` r
# 2. 
fatores <- factor(c("A", "B", "A", "C", "B", "A", "C", "B", "C", "A"))
table(fatores)
```

```
## fatores
## A B C 
## 4 3 3
```

``` r
unique(fatores) #ou
```

```
## [1] A B C
## Levels: A B C
```

``` r
levels(fatores)
```

```
## [1] "A" "B" "C"
```

``` r
# 3. 
v2 <- c(5, 10, 15, 20, 25)
v3 <- c(10, 20, 30)
# Verificando presença de elementos
v2 %in% v3  # -> elementos 10 e 20
```

```
## [1] FALSE  TRUE FALSE  TRUE FALSE
```

``` r
# Posições dos valores de v2 que estão em v3
which(v2 %in% v3) # -> posições 2 e 4
```

```
## [1] 2 4
```

``` r
# 4. 
v4 <- c(10, NA, 30, 50, NA, NaN, 20)
sum(v4, na.rm = TRUE)  
```

```
## [1] 110
```

``` r
length(v4[!is.na(v4)])  
```

```
## [1] 4
```

``` r
sort(v4, na.last = TRUE)  
```

```
## [1]  10  20  30  50  NA  NA NaN
```

``` r
which(is.na(v4))
```

```
## [1] 2 5 6
```

``` r
# 5. 
categorias <- factor(c("A", "B", "A", "A", "B", "A", "B", "C", "A", "C"))
table(categorias)
```

```
## categorias
## A B C 
## 5 3 2
```

``` r
levels(categorias)[levels(categorias) == "B"] <- "X"; table(categorias)
```

```
## categorias
## A X C 
## 5 3 2
```

``` r
categ_ord <- factor(categorias, levels = sort(levels(categorias))); table(categ_ord)
```

```
## categ_ord
## A C X 
## 5 2 3
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


## Matrizes

Matrizes são estruturas bidimensionais de dados, onde todos os elementos devem ser do mesmo tipo. Uma matriz pode ser definida como:
\[
M = \begin{bmatrix}
m_{11} & m_{12} & \dots & m_{1n} \\
m_{21} & m_{22} & \dots & m_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
m_{m1} & m_{m2} & \dots & m_{mn}
\end{bmatrix}
\]

- onde $m$ é o número de linhas e $n$ é o número de colunas da matriz. Neste caso, diz-se que a matriz tem dimensão $m\times n$.
- $m_{ij}$ representa o elemento na linha $i$ e coluna $j$.

Em **programação**, matrizes são usadas para armazenar dados de forma estruturada e realizar operações como multiplicação e transposição de maneira eficiente.

No **R**, matrizes podem ser criadas com a função `matrix()` e podem ser manipuladas com operações matemáticas vetorizadas.


``` r
# Exemplo de matriz 2x3 
matriz <- matrix(1:6, nrow = 2, ncol = 3)
matriz
```

```
##      [,1] [,2] [,3]
## [1,]    1    3    5
## [2,]    2    4    6
```

``` r
# Alterando o preenchimento da matriz por linhas:
matriz_linhas <- matrix(1:6, nrow = 2, ncol = 3, byrow = T)
matriz_linhas
```

```
##      [,1] [,2] [,3]
## [1,]    1    2    3
## [2,]    4    5    6
```

Para verificar a dimensão da matriz:


``` r
dim(matriz)
```

```
## [1] 2 3
```

Adicionando colunas com `cbind()`:

``` r
matriz_mais_colunas <- cbind(matriz, rep(99, 2))
```

Adicionando linhas com `rbind()`:

``` r
matriz_mais_linhas <- rbind(matriz, rep(99, 3))
```


Renomeando linhas e colunas de uma matriz:

``` r
colnames(matriz) <- c("c1","c2","c3")
rownames(matriz) <- c("l1","l2")
matriz
```

```
##    c1 c2 c3
## l1  1  3  5
## l2  2  4  6
```

``` r
# ou podemos fazer:
matriz2 <- matrix(1:6, nrow = 2, 
               dimnames = list(c("l1", "l2"),
                               c("c1", "c2", "c3")))
matriz2
```

```
##    c1 c2 c3
## l1  1  3  5
## l2  2  4  6
```


Acessando Elementos de Matrizes


```r
# Criando uma matriz 3x3
matriz <- matrix(1:9, nrow = 3)
matriz
# Para acessar o elemento da linha 2, coluna 3:
matriz[2, 3]  
# Acessando a segunda linha
matriz[2, ]  
# Acessando a terceira coluna
matriz[, 3]  
# Se a matriz tiver nomes nas linhas ou colunas:
colnames(matriz) <- c("c1","c2","c3")
rownames(matriz) <- c("l1","l2", "l3")
matriz["l1",] # -> linha 1
matriz[,"c1"] # -> coluna 1
```

Também podemos modificar valores diretamente:


``` r
matriz[1,2] <- 10  # Muda o valor da posição (1,2) para 10
print(matriz)
```

```
##    c1 c2 c3
## l1  1 10  5
## l2  2  4  6
```


**Operações Básicas com Matrizes:**

```r
## Soma de matrizes
A <- matrix(1:4, nrow = 2)
B <- matrix(5:8, nrow = 2)
nrow(A) # Número de linhas
ncol(A) # Número de colunas
dim(A) # dimensão da matriz: número de linhas e número de colunas
```
```r
A + B  # Soma elemento a elemento
## Multiplicação elemento a elemento
A * B  
## Multiplicação de matrizes (produto matricial)
A %*% B  
## Transposta de uma matriz
t(A)
## Diagonal de uma matriz
diag(A)
## Determinante de uma matriz
det(A)
## Inversão de uma matriz 
solve(A)
## Função solve para resolver sistemas de equações. Seja Ax=b, com
b <- c(2,5)
# então a solução x do sistema é:
solve(A, b)
# para a inversão da matriz apenas, b = I não precisa ser declarado.
```

#### Exercícios {-}

**1.** Crie uma matriz de dimensão 4x3 contendo os números de 1 a 12 preenchidos por linha. Em seguida, realize as seguintes operações:

a. Acesse o elemento da terceira linha e segunda coluna.
b. Extraia a segunda linha da matriz.
c. Substitua o elemento da quarta linha e terceira coluna por 99.

**2.** Crie uma matriz M de dimensão 3×5 contendo os números de 1 a 15 preenchidos por coluna.

a. Exiba a matriz M.
b. Descubra o número de linhas e colunas usando nrow() e ncol().
c. Exiba a matriz preenchida por linha em vez de coluna.
d. Extraia o elemento na segunda linha e quarta coluna.
e. Modifique o elemento da terceira linha e quinta coluna para 100.
f. Substitua todos os valores da primeira coluna por 0.

**3.** Crie duas matrizes A e B, ambas 3x3, contendo valores de 1 a 9 e de 10 a 18, respectivamente.

a. Realize a soma e a subtração entre A e B.
b. Multiplique elemento a elemento.
c. Faça o produto matricial entre A e B.

**4.** Crie as matrizes:

a. Uma matriz identidade 4×4
b. Uma matriz diagonal com os números 2, 4, 6 e 8 na diagonal principal.


<div id="protectedContent4" style="display:none;">
  
### Respostas {-}

```r
# 1. 
mat <- matrix(1:12, ncol = 3, byrow = T)
mat[3,2]
mat[2,]
mat[4,3] <- 99
# 2. 
M <- matrix(1:15, ncol = 5)
nrow(M); ncol(M)
M <- matrix(1:15, ncol = 5, byrow = T)
M[2,4]
M[3,5] <- 100
M[,1] <- 0
# 3. 
A <- matrix(1:9, ncol = 3)
B <- matrix(10:18, ncol = 3)
A + B
A - B
A*B
A%*%B
# 4. 
I <- diag(4)
matriz_diag <- diag(c(2,4,6,8))
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



## Listas
Listas podem armazenar diferentes tipos de objetos, como vetores, matrizes, etc. Pode ser criada, fazendo: `list(valor1, valor2, valor3)`.

``` r
# Criando uma lista
minha_lista <- list("Ana", 25, c(8, 9, 10), 
                    matrix(1:4, ncol = 2))
minha_lista
```

```
## [[1]]
## [1] "Ana"
## 
## [[2]]
## [1] 25
## 
## [[3]]
## [1]  8  9 10
## 
## [[4]]
##      [,1] [,2]
## [1,]    1    3
## [2,]    2    4
```

Acessando elementos da lista:


``` r
## Retorna uma lista com o primeiro elemento
minha_lista[1]
```

```
## [[1]]
## [1] "Ana"
```

``` r
str(minha_lista[1])
```

```
## List of 1
##  $ : chr "Ana"
```

``` r
## Retorna apenas o primeiro elemento da lista
# Acessando o primeiro elemento
minha_lista[[1]] 
```

```
## [1] "Ana"
```

``` r
str(minha_lista[[1]])
```

```
##  chr "Ana"
```

``` r
# Acessando o quarto elemento
minha_lista[[4]]  
```

```
##      [,1] [,2]
## [1,]    1    3
## [2,]    2    4
```

Visualizando a estrutura da lista:

``` r
str(minha_lista)
```

```
## List of 4
##  $ : chr "Ana"
##  $ : num 25
##  $ : num [1:3] 8 9 10
##  $ : int [1:2, 1:2] 1 2 3 4
```

Observe que é uma estrutura unidimensional:

``` r
length(minha_lista)
```

```
## [1] 4
```

Renomeando os elementos da lista:

``` r
names(minha_lista) <- c("nome", "idade", "notas", "matriz")
minha_lista
```

```
## $nome
## [1] "Ana"
## 
## $idade
## [1] 25
## 
## $notas
## [1]  8  9 10
## 
## $matriz
##      [,1] [,2]
## [1,]    1    3
## [2,]    2    4
```
```r
# ou já poderiamos ter criado com os nomes:
minha_lista <- list(nome = "Ana", idade = 25, notas = c(8, 9, 10),
                    matriz = matrix(1:4, ncol = 2))
```

Para acessar os elementos da lista pelo nome, podemos usar o operador `$`:

``` r
minha_lista$nome # equivalente a minha_lista[[1]]
```

```
## [1] "Ana"
```

``` r
minha_lista$matriz # equivalente a minha_lista[[4]]
```

```
##      [,1] [,2]
## [1,]    1    3
## [2,]    2    4
```

Podemos também ter uma lista de listas:

``` r
lista2 <- list(nome = "Ana",
              notas = list(sem1 = c(5,6,7), sem2 = c(8,6,9)),
              materias = list(sem1 = c("Matematica", "Historia", "Fisica"),
                              sem2 = c("Português", "Artes", "Geografia")))
```

Neste caso, para acessar os elementos, fazemos:

``` r
# Notas semestre 1
lista2$notas$sem1
```

```
## [1] 5 6 7
```

``` r
# Disciplinas semestre 2
lista2$materias$sem2
```

```
## [1] "Português" "Artes"     "Geografia"
```

``` r
# Disciplina 2 do semestre 2
# lista2$materias$sem2[2]
```

#### Exercícios {-}

**1.** Crie uma lista chamada `aluno` com os seguintes elementos: Nome: "Maria", Idade: 22, Notas: 7, 8, 9, Curso: "Matemática". Depois, realize as operações:

a. Acesse e imprima o nome do aluno.
b. Modifique a idade para 23.
c. Adicione um novo elemento chamado "cidade" com o valor "Curitiba".
d. Remova o elemento "curso".

**2.** Crie uma lista chamada meus_dados contendo um vetor numérico de 5 elementos, um vetor de caracteres com nomes de 3 cidades, um valor lógico (TRUE ou FALSE) e uma matriz 2x2 com números aleatórios.

a. Extraia o vetor numérico.
b. Acesse o segundo elemento do vetor de caracteres.
c. Modifique o valor lógico para FALSE.
d. Extraia o valor da matriz da linha 1, coluna 2.

**3.** Crie uma lista chamada familia, contendo: 

- Pai: Lista com Nome = "Carlos" e Idade = 45.
- Mãe: Lista com Nome = "Mariana" e Idade = 42.
- Filhos: Um vetor com os nomes "Lucas" e "Ana".

Agora, realize as seguintes operações:

a. Acesse e imprima a idade do pai.
b. Acesse e imprima o nome da mãe.
c. Acesse e imprima o segundo filho.
d. Modifique a idade da mãe para 43 anos.
e. Adicione um novo filho chamado "Pedro".



<div id="protectedContent5" style="display:none;">
  
### Respostas {-}

```r
# 1. 
# Criando a lista aluno
aluno <- list(
  Nome = "Maria",
  Idade = 22,
  Notas = c(7, 8, 9),
  Curso = "Matemática"
)
# a. Acesse e imprima o nome do aluno
aluno$Nome
# b. Modifique a idade para 23
aluno$Idade <- 23
# c. Adicione um novo elemento chamado "cidade" com o valor "Curitiba"
aluno$Cidade <- "Curitiba"
# d. Remova o elemento "curso"
aluno$Curso <- NULL
# 2. 
# Criando a lista meus_dados
meus_dados <- list(
  Numeros = c(10, 20, 30, 40, 50),  # a. Vetor numérico de 5 elementos
  Cidades = c("São Paulo", "Curitiba", "Rio de Janeiro"),  # b. Vetor de caracteres
  Logico = TRUE,  # c. Valor lógico
  Matriz = matrix(sample(1:10, 4), nrow = 2)  # d. Matriz 2x2 com números aleatórios
)
# a. Extraia o vetor numérico
meus_dados$Numeros
# b. Acesse o segundo elemento do vetor de caracteres
meus_dados$Cidades[2]
# c. Modifique o valor lógico para FALSE
meus_dados$Logico <- FALSE
# d. Extraia o valor da matriz da linha 1, coluna 2.
meus_dados$Matriz[1,2]
# 3.
# Criando a lista familia
familia <- list(
  Pai = list(Nome = "Carlos", Idade = 45),
  Mae = list(Nome = "Mariana", Idade = 42),
  Filhos = c("Lucas", "Ana")
)
# a. Acesse e imprima a idade do pai
familia$Pai$Idade
# b. Acesse e imprima o nome da mãe
familia$Mae$Nome
# c. Acesse e imprima o segundo filho
familia$Filhos[2]
# d. Modifique a idade da mãe para 43 anos
familia$Mae$Idade <- 43
# e. Adicione um novo filho chamado "Pedro"
familia$Filhos <- c(familia$Filhos, "Pedro")
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

## Data Frames
Os data.frames são estruturas de dados que armazenam colunas de diferentes tipos (numéricas, categóricas, lógicas).

``` r
## Criando um data frame
dados <- data.frame(
  Nome = c("Ana", "Bruno", "Carlos", "Maria", "Jose", "Tata"),
  Nivel_escolaridade = c("F","M","S","M","F","M"),
  Idade = c(25, 30, 22, 10, 15, 16),
  Nota = c(8,6,3,4,7,2),
  Aprovado = c(TRUE, TRUE, FALSE, FALSE, TRUE, FALSE)
)
dados
```

```
##     Nome Nivel_escolaridade Idade Nota Aprovado
## 1    Ana                  F    25    8     TRUE
## 2  Bruno                  M    30    6     TRUE
## 3 Carlos                  S    22    3    FALSE
## 4  Maria                  M    10    4    FALSE
## 5   Jose                  F    15    7     TRUE
## 6   Tata                  M    16    2    FALSE
```

``` r
## Algumas operações em data frames:
## Visualizar os primeiros valores:
head(dados)  # Mostra as primeiras 6 linhas (padrão)
```

```
##     Nome Nivel_escolaridade Idade Nota Aprovado
## 1    Ana                  F    25    8     TRUE
## 2  Bruno                  M    30    6     TRUE
## 3 Carlos                  S    22    3    FALSE
## 4  Maria                  M    10    4    FALSE
## 5   Jose                  F    15    7     TRUE
## 6   Tata                  M    16    2    FALSE
```

``` r
head(dados, 3) # Mostra as primeiras 3 linhas
```

```
##     Nome Nivel_escolaridade Idade Nota Aprovado
## 1    Ana                  F    25    8     TRUE
## 2  Bruno                  M    30    6     TRUE
## 3 Carlos                  S    22    3    FALSE
```

``` r
## Visualizar os últimos valores:
tail(dados)
```

```
##     Nome Nivel_escolaridade Idade Nota Aprovado
## 1    Ana                  F    25    8     TRUE
## 2  Bruno                  M    30    6     TRUE
## 3 Carlos                  S    22    3    FALSE
## 4  Maria                  M    10    4    FALSE
## 5   Jose                  F    15    7     TRUE
## 6   Tata                  M    16    2    FALSE
```

``` r
## estrutura 
str(dados)  
```

```
## 'data.frame':	6 obs. of  5 variables:
##  $ Nome              : chr  "Ana" "Bruno" "Carlos" "Maria" ...
##  $ Nivel_escolaridade: chr  "F" "M" "S" "M" ...
##  $ Idade             : num  25 30 22 10 15 16
##  $ Nota              : num  8 6 3 4 7 2
##  $ Aprovado          : logi  TRUE TRUE FALSE FALSE TRUE FALSE
```

``` r
## Selecionando colunas
# Podemos fazer:
dados[, 2]
```

```
## [1] "F" "M" "S" "M" "F" "M"
```

``` r
# ou
dados$Nivel_escolaridade
```

```
## [1] "F" "M" "S" "M" "F" "M"
```

``` r
## Selecionando linhas:
dados[3,]
```

```
##     Nome Nivel_escolaridade Idade Nota Aprovado
## 3 Carlos                  S    22    3    FALSE
```

``` r
## Selecionando um valor de uma linha e uma coluna:
dados[2,3]
```

```
## [1] 30
```

``` r
# Adicionando uma nova coluna aos dados
dados$Status <- c("Aprovado", "Aprovado", "Reprovado", "Reprovado", "Aprovado", "Reprovado")
# Removendo uma coluna dos dados
dados$Status <- NULL
# Renomeando colunas
colnames(dados) <- c("nome", "nivel", "idade", "nota", "aprovado")
```

Ordenando e filtrando valores de um data.frame:

``` r
# Ordenando os dados por idade -> função order()
dados[order(dados$idade), ]
```

```
##     nome nivel idade nota aprovado
## 4  Maria     M    10    4    FALSE
## 5   Jose     F    15    7     TRUE
## 6   Tata     M    16    2    FALSE
## 3 Carlos     S    22    3    FALSE
## 1    Ana     F    25    8     TRUE
## 2  Bruno     M    30    6     TRUE
```

``` r
# Ordenando por idade em ordem decrescente
dados[order(dados$idade, decreasing = TRUE), ]
```

```
##     nome nivel idade nota aprovado
## 2  Bruno     M    30    6     TRUE
## 1    Ana     F    25    8     TRUE
## 3 Carlos     S    22    3    FALSE
## 6   Tata     M    16    2    FALSE
## 5   Jose     F    15    7     TRUE
## 4  Maria     M    10    4    FALSE
```

``` r
# Selecionando linhas em que Aprovado == T
dados[dados$aprovado == T, ]
```

```
##    nome nivel idade nota aprovado
## 1   Ana     F    25    8     TRUE
## 2 Bruno     M    30    6     TRUE
## 5  Jose     F    15    7     TRUE
```

``` r
# Selecionando linhas em que idade maior que 25
dados[dados$idade > 25, ]
```

```
##    nome nivel idade nota aprovado
## 2 Bruno     M    30    6     TRUE
```

Usando a função subset:

``` r
# Selecionando linhas em que Aprovado == T
subset(dados, aprovado == T)
```

```
##    nome nivel idade nota aprovado
## 1   Ana     F    25    8     TRUE
## 2 Bruno     M    30    6     TRUE
## 5  Jose     F    15    7     TRUE
```

``` r
# Selecionando linhas em que idade maior que 25
subset(dados, idade > 25)
```

```
##    nome nivel idade nota aprovado
## 2 Bruno     M    30    6     TRUE
```

``` r
# Selecionando apenas a coluna "Nome" 
# onde a idade é maior que 25
subset(dados, idade > 25, select = nome)
```

```
##    nome
## 2 Bruno
```

``` r
# Selecionando os estudantes aprovados 
# e com nota maior ou igual a 7.
subset(dados, nota >= 7 & aprovado == T)
```

```
##   nome nivel idade nota aprovado
## 1  Ana     F    25    8     TRUE
## 5 Jose     F    15    7     TRUE
```


Podemos também acessar data frames disponíveis em pacotes do R:


``` r
# Visualizando os dados de todos os pacotes:
data(package = .packages(all.available = TRUE))
# Visualizando dados do pacote datasets
data(package = "datasets")
# Chamando o conjunto `mtcars` do pacote datasets
data("mtcars", package = "datasets")
# Visualizando as primeiras linhas do dataframe
head(mtcars)
```

```
##                    mpg cyl disp  hp drat    wt  qsec vs am gear carb
## Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
## Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
## Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
## Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
## Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
## Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```

``` r
# Informações sobre os dados:
?mtcars
# Estrutura dos dados
str(mtcars)
```

```
## 'data.frame':	32 obs. of  11 variables:
##  $ mpg : num  21 21 22.8 21.4 18.7 18.1 14.3 24.4 22.8 19.2 ...
##  $ cyl : num  6 6 4 6 8 6 8 4 4 6 ...
##  $ disp: num  160 160 108 258 360 ...
##  $ hp  : num  110 110 93 110 175 105 245 62 95 123 ...
##  $ drat: num  3.9 3.9 3.85 3.08 3.15 2.76 3.21 3.69 3.92 3.92 ...
##  $ wt  : num  2.62 2.88 2.32 3.21 3.44 ...
##  $ qsec: num  16.5 17 18.6 19.4 17 ...
##  $ vs  : num  0 0 1 1 0 1 0 1 1 1 ...
##  $ am  : num  1 1 1 0 0 0 0 0 0 0 ...
##  $ gear: num  4 4 4 3 3 3 3 4 4 4 ...
##  $ carb: num  4 4 1 1 2 1 4 2 2 4 ...
```

``` r
# Nomes das colunas
names(mtcars)
```

```
##  [1] "mpg"  "cyl"  "disp" "hp"   "drat" "wt"   "qsec" "vs"   "am"   "gear"
## [11] "carb"
```
```r
# Selecionando as variáveis mpg e cyl
mtcars[, c("mpg", "cyl")]
```


#### Exercícios {-}

**1.** Considere o data.frame:

``` r
dados <- data.frame(
  Nome = c("Ana", "Bruno", "Carlos", "Daniela", "Eduardo"),
  Idade = c(25, 30, 22, 28, 35),
  Altura = c(1.65, 1.80, 1.75, 1.60, 1.85),
  Peso = c(60, 85, 70, 55, 90),
  Estudante = c(TRUE, FALSE, TRUE, FALSE, FALSE)
)
```

a. Selecione apenas a coluna Nome.
b. Selecione as colunas Nome e Idade.
c. Selecione a linha correspondente a "Carlos".
d. Selecione os nomes das pessoas com idade superior a 28 anos.
e. Selecione apenas os estudantes (Estudante == TRUE).
f. Crie uma nova coluna chamada IMC usando a fórmula IMC = Peso / (Altura^2).
g. Usando a função subset, selecione todas as pessoas com altura maior que 1.70m.
h. Usando a função subset, selecione apenas os estudantes (Estudante == TRUE) e mostre apenas as colunas Nome e Idade.
i. Usando a função subset, selecione as pessoas com IMC >= 25 e que não são estudantes
j. Usando a função subset, filtre os indivíduos com idade entre 25 e 35 anos.
k. Ordenar o data frame em ordem crescente de idade


<div id="protectedContent6" style="display:none;">
  
### Respostas {-}

```r
# 1. 
# a. 
dados$Nome
# b. 
dados[, c("Nome", "Idade")]
# c. 
dados[dados$Nome == "Carlos", ]
# d.
dados[dados$Idade > 28,]$Nome
# e. 
dados[dados$Estudante == TRUE, ]
# f. 
dados$IMC <- dados$Peso / (dados$Altura^2)
# g.
subset(dados, Altura > 1.70)
# h. 
subset(dados, Estudante == TRUE, select = c(Nome, Idade))
# i.
subset(dados, IMC >= 25 & Estudante == FALSE)
# j. 
subset(dados, Idade >= 25 & Idade <= 35)
# k. 
dados[order(dados$Idade), ]
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

<br>

#### Exercícios do Capítulo 2 <span style="color:red">(Entregar na lista 1)</span>  {-}


**1.** Crie uma matriz M de dimensão 4x4 contendo números de 1 a 16 preenchidos por linha.

a. Transponha a matriz M e salve o resultado em M_t.
b. Substitua todos os valores da diagonal principal de M por 99.
c. Multiplique cada linha da matriz M por um vetor c(1, 2, 3, 4).
d. Crie uma matriz 3x3 e nomeie suas linhas como "Linha1", "Linha2", "Linha3" e colunas como "Col1", "Col2", "Col3". Depois, selecione apenas os elementos da segunda e terceira linha.

**2.** Crie uma lista chamada minha_lista contendo um vetor numérico de 5 elementos, uma matriz 2x2 e um data frame de 3 linhas e 2 colunas.

a. Substitua o segundo elemento da lista por um novo vetor de 5 números.
b. Verifique se um dos elementos da lista é um data frame.
c. Extraia a segunda coluna do data frame armazenado dentro da lista.
d. Remova o último elemento da lista sem saber quantos elementos ela possui.


**3.** Crie um data frame chamado df com 5 observações e as colunas Nome (caractere), Idade (numérico) e Profissao (caractere).

a. Converta a coluna Profissao em um fator e exiba seus níveis.
b. Reordene o data frame pela coluna Idade em ordem decrescente.
c. Selecione todas as linhas onde a idade seja um número par.
d. Crie um novo data frame contendo apenas os três primeiros registros do data frame original.

**4.** Use o data frame `airquality` para responder às questões abaixo:

a. Selecione apenas a coluna Temp.
b. Selecione as colunas Ozone e Wind.
c. Selecione os dados do dia 15.
d. Selecione as medições do mês de julho (Month == 7).
e. Selecione apenas as linhas onde Wind é maior que 10 mph.
f. Adicione uma nova coluna chamada Temp_Celsius convertendo a temperatura para graus Celsius ((Temp - 32) * 5/9).
g. Reordene o dataset do menor para o maior valor de Ozone.
h. Usando a função `%in%` selecione apenas os dados dos meses de maio e junho (5 e 6).

**5.** Usando a função subset e considerando os dados anteriores `airquality`, faça o que se pede:

a. Selecione todas as medições onde Ozone está acima de 50 e Wind está abaixo de 10 mph.
b. Filtre apenas os registros onde a temperatura (Temp) está acima de 85°F e retorne apenas as colunas Temp e Wind.
c. Selecione as medições para os dias 1 a 10.
d. Extraia todas as medições onde a velocidade do vento (Wind) está entre 5 e 15 mph.

**6.** Crie um data frame chamado df com três colunas:

- "Nome": c("Ana", "Bruno", "Bia", "Daniela", "Eduardo")
- "Idade": c(25, NA, 31, 29, NA)
- "Altura": c(1.65, 1.80, 1.75, NA, 1.68)

a. Identifique quais colunas contêm valores NA.
b. Conte quantos NA existem em cada coluna do data frame.
c. Remova todas as observações que possuem pelo menos um NA no data frame.

<div id="protectedContent7" style="display:none;">
  
### Respostas {-}

```r
## 1.
M <- matrix(1:16, nrow = 4, byrow = TRUE)
# a.
M_t <- t(M)
# b. 
diag(M) <- 99
# c.
M <- M * c(1, 2, 3, 4)
# d.
M2 <- matrix(1:9, nrow = 3, byrow = TRUE,
             dimnames = list(c("Linha1", "Linha2", "Linha3"),
                             c("Col1", "Col2", "Col3")))
M2[c("Linha2", "Linha3"), ]
## 2. 
minha_lista <- list(
  vetor = c(10, 20, 30, 40, 50),
  matriz = matrix(1:4, nrow = 2),
  dados = data.frame(Nome = c("Ana", "Beto", "Clara"), Idade = c(25, 30, 22))
)
# a. 
minha_lista[[2]] <- c(5,9,10,45,3)
# b.
is.data.frame(minha_lista$dados)
# c. 
minha_lista[[3]][, 2, drop = FALSE]
# ou
minha_lista$dados$Idade
# d. 
minha_lista <- minha_lista[-length(minha_lista)]
## 3.
df <- data.frame(
  Nome = c("Alice", "Bruno", "Carlos", "Daniela", "Eduardo"),
  Idade = c(23, 45, 31, 20, 30),
  Profissao = c("Engenheiro", "Professor", "Médico", "Advogado", "Designer")
)
# a. 
df$Profissao <- as.factor(df$Profissao)
levels(df$Profissao)
# b. 
df <- df[order(df$Idade, decreasing = TRUE), ]
# ou
df <- df[order(-df$Idade), ]
# c. 
df[df$Idade %% 2 == 0, ]
# d. 
df_novo <- df[1:3, ]
## 4. 
# a.
airquality$Temp
# b. 
airquality[, c("Ozone", "Wind")]
# c. 
airquality[airquality$Day == 15, ]
# d. 
airquality[airquality$Month == 7, ]
# e. 
airquality[airquality$Wind > 10, ]
# f.
airquality$Temp_Celsius <- (airquality$Temp - 32) * 5/9
# g.
airquality[order(airquality$Ozone), ]
# h.
airquality[airquality$Month %in% c(5, 6), ]
## 5.
# a.
subset(airquality, Ozone > 50 & Wind < 10)
# b. 
subset(airquality, Temp > 85, select = c(Temp, Wind))
# c.
subset(airquality, Day >= 1 & Day <= 10)
# d.
subset(airquality, Wind >= 5 & Wind <= 15)
## 6. 
df <- data.frame(
  Nome = c("Ana", "Bruno", "Bia", "Daniela", "Eduardo"),
  Idade = c(25, NA, 31, 29, NA),
  Altura = c(1.65, 1.80, 1.75, NA, 1.68)
)
# a.
colSums(is.na(df)) > 0
# b.
colSums(is.na(df))
# d. 
df_limpo <- na.omit(df)
```

</div>
  
  <input type="password" id="passwordInput7" placeholder="Digite a senha">
  <button id="submitButton7">Acesso Professor</button>
  
  
<script>
document.getElementById("submitButton7").addEventListener("click", function() 
{
  var password = document.getElementById("passwordInput7").value;
  var correctPassword = "0987";
  
  if (password === correctPassword) 
  {
    document.getElementById("protectedContent7").style.display = "block";
  }else 
  {
    alert("Senha incorreta! Tente novamente.");
  }
});
</script>
