# Controle de Fluxo e Funções

## Controle de Fluxo

### Execução Condicional

#### 1. `if` e `if-else` {-}
O comando **if** é usado para executar um comando se alguma condição for satisfeita.

**Estrutura do if:**
```r
if (condicao) {
  # comandos que serao rodados
  # se condicao = TRUE
}
```
**Exemplo:**

``` r
x <- 5
if (x > 0) {
  print("O número é positivo")
}
```

```
## [1] "O número é positivo"
```

Caso queiramos executar um bloco alternativo, usamos o `if` em conjunto com o  `else`:

**Estrutura do if-else:**
```r
if (condicao) {
  # comandos que serao rodados
  # se condicao = TRUE
} else {
  # comandos que serao rodados
  # se condicao = FALSE
}
```

**Exemplo:**

``` r
x <- -3
if (x > 0) {
  print("O número é positivo")
} else {
  print("O número é negativo ou zero")
}
```

```
## [1] "O número é negativo ou zero"
```

#### 2. `ifelse` {-}
A função `ifelse()` é útil quando precisamos aplicar uma condição de forma vetorizada. 

**Estrutura do ifelse:**
```r
ifelse(vetor_de_condicoes, valor_se_TRUE, valor_se_FALSE)
```

**Exemplo:**

``` r
notas <- c(7, 4, 9, 5)
resultado <- ifelse(notas >= 6, "Aprovado", "Reprovado")
print(resultado)
```

```
## [1] "Aprovado"  "Reprovado" "Aprovado"  "Reprovado"
```


#### Exercícios {-}

**1.** Crie uma estrutura `if` que verifique se um número é maior do que 100 e em caso afirmativo print a mensagem: "O número é maior que 100". 

**2.** Crie uma estrutura `if` que verifique se um número é múltiplo de 5 e em caso afirmativo print a mensagem: "O número é múltiplo de 5".

**3.** Crie uma estrutura usando `if` em conjunto com `else` que print "Aprovado", caso a nota seja maior ou igual a 7, e "Reprovado", caso contrário.

**4.** Crie um vetor de números e use `ifelse` para verificar quais são pares e ímpares.

**5.** Crie um vetor de idades e use `ifelse` para classificar cada idade como "Menor de idade", se menor que 18, ou "Maior de idade", caso contrário.


<div id="protectedContent1" style="display:none;">
  
### Respostas {-}
```r
# 1.
numero <- 200
if (numero > 100) {
  print("O número é maior que 100")
}
# 2.
numero <- 15
if (numero %% 5 == 0) {
  print("O número é múltiplo de 5")
}
# 3.
nota <- 5
if (nota >= 7) {
  print("Aprovado!")
} else {
  print("Reprovado!")
}
# 4. 
numeros <- c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
resultado <- ifelse(numeros %% 2 == 0, "Par", "Ímpar")
print(resultado)
# 5.
idades <- c(10, 18, 15, 21, 30, 12)
classificacao <- ifelse(idades >= 18, "Maior de idade", "Menor de idade")
print(classificacao)
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



### Loopings

Os loops são usados para repetir blocos de código até que uma condição seja atendida.

#### 1. `for` {-}

Usado para iterar sobre vetores, listas ou sequências.

**Estrutura do `for`:**
```r
for(i in conjunto_de_valores){
  # comandos que serão repetidos
}
```
**Exemplo: Imprimindo números de 1 a 5**

``` r
for (i in 1:5) {
  print(i)
}
```

```
## [1] 1
## [1] 2
## [1] 3
## [1] 4
## [1] 5
```
**Exemplo: Iterando sobre um vetor de letras**

``` r
for (i in 1:5) {
  print(letters[i])
}
```

```
## [1] "a"
## [1] "b"
## [1] "c"
## [1] "d"
## [1] "e"
```

``` r
# letters -> vetor de letras do alfabeto disponíveis no R
```
**Exemplo: Iterando em vetores**

``` r
v <- 1:10
for (i in 1:length(v)) {
  v[i] <- v[i]/10
}
v
```

```
##  [1] 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0
```
Mas o R é vetorizado este é o tipo de loop não faz sentido, pois é muito mais rápido e fácil fazer: `v <- v/10`.

**Exemplo: Iterando em listas**

``` r
# Criando uma lista de vetores com tamanhos diferentes
lista <- list(c(2, 4, 6), c(10, 20, 30, 40))
# Dividindo cada vetor da lista pelo seu máximo:
for (i in seq_along(lista)) {
  lista[[i]] <- lista[[i]] / max(lista[[i]])
}
lista
```

```
## [[1]]
## [1] 0.3333333 0.6666667 1.0000000
## 
## [[2]]
## [1] 0.25 0.50 0.75 1.00
```

``` r
# seq_along(lista) faz o mesmo que 1:length(lista)
# Não podemos simplesmente fazer lista / max(lista), 
# pois lista não é um vetor numérico, mas uma lista de vetores.
```


**Exemplo: Iterando em matrizes (diferença entre & e &&)**
```r
## Comparando os Tempos de Execução:
n_linhas <- 2000
set.seed(12345)
x <- matrix(sample(c(T,F), size = n_linhas^2, replace = T), nrow = n_linhas)
y <- matrix(sample(c(T,F), size = n_linhas^2, replace = T), nrow = n_linhas)
result1 <- matrix(0, nrow = n_linhas, ncol = n_linhas)

# Usando & (avalia todos)
system.time({
  for (i in 1:nrow(x)) {
    for (j in 1:ncol(x)) {
      if(x[i,j] & y[i,j] & (i%%2==0) & (j%%2==0))
      {
         result1[i,j] <- 1
      }
    }
  }
})
# Usando && (só avalia o primeiro)
system.time({
  for (i in 1:nrow(x)) {
    for (j in 1:ncol(x)) {
      if(x[i,j] && y[i,j] && (i%%2==0) && (j%%2==0))
      {
         result1[i,j] <- 1
      }
    }
  }
})
```

```r
## Comparando os Termos Avaliados:
x <- matrix(c(FALSE, TRUE, TRUE, TRUE), nrow = 2, byrow = T)
y <- matrix(c(FALSE, TRUE, FALSE, TRUE), nrow = 2, byrow = T)
result1 <- matrix(0, nrow = 2, ncol = 2)

# Função que identifica as avaliações
print_eval <- function(val, label, i, j) {
  cat(sprintf("[%d,%d] Avaliando: %s → %s\n", 
              i, j, label, val))
  # printa uma mensagem substituindo %d e %s
  # pelos valores i, j, label, val
  # %d usado para números e %s para strings (textos)
  return(val)
}

# Usando & (avalia todos)
for (i in 1:nrow(x)) {
  for (j in 1:ncol(x)) {
    if (print_eval(x[i,j], "x", i, j) & 
        print_eval(y[i,j], "y", i, j) & 
        print_eval(i %% 2 == 0, "i par", i, j) & 
        print_eval(j %% 2 == 0, "j par", i, j)) {
      result1[i,j] <- 1
    }
  }
}
# Usando && (só avalia o primeiro)
for (i in 1:nrow(x)) {
  for (j in 1:ncol(x)) {
    if (print_eval(x[i,j], "x", i, j) && 
        print_eval(y[i,j], "y", i, j) && 
        print_eval(i %% 2 == 0, "i par", i, j) && 
        print_eval(j %% 2 == 0, "j par", i, j)) {
      result1[i,j] <- 1
    }
  }
}
```

#### 2. `while` {-}

o recurso `for` é útil se você souber com antecedência o conjunto de valores sobre o qual deseja repetir uma ação. Caso não saiba, o loop `while` é mais flexível.

**Estrutura do while:**
```r
while (condição) {
  # comandos a serem executados
  # enquanto a condição for verdadeira
}
```

**Exemplo:**

``` r
x <- 1
while (x <= 3) {
  print(x)
  x <- x + 1
}
```

```
## [1] 1
## [1] 2
## [1] 3
```


#### 3. `repeat` {-}

Executa comandos indefinidamente até que um `break` seja encontrado.

**Estrutura do repeat:**
```r
repeat {
  # código
  if (condição) break
}
```

**Exemplo:** Parando quando x for 3

``` r
x <- 1
repeat {
  print(x)
  x <- x + 1
  if (x > 3) break
}
```

```
## [1] 1
## [1] 2
## [1] 3
```


📌 Diferença entre `while` e `repeat`:

**while:**

- A condição é testada antes de executar o bloco de código.
- O código só executa se a condição for verdadeira.
- Se a condição inicial for falsa, o bloco não será executado nem uma vez.

**repeat:**

- Não há condição inicial.
- O código é executado sempre até que um break seja chamado manualmente.
- É como um loop infinito que só para com break.


#### Exercicios {-}

**1.** Usando `for`:

a. Imprima os números de 1 a 10.
b. Imprima os números pares de 2 a 20.
c. Calcule a soma dos números de 1 a 100.
d. Imprima o quadrado de cada número de 1 a 10.
e. Dado um valor numérico, calcule o seu fatorial.
f. Dado um vetor de nomes, imprima todos os nomes em letras maiúsculas.
g. Imprima todos os elementos de uma matriz 3x3.
h. Imprima a soma de cada linha de uma matriz.

**2.** Usando `while`:

a. Imprima os números de 1 a 10.
b. Imprima os elementos do vetor `vetor <- c("a", "b", "c", "d")` um por um.
c. Conte quantos números pares existem no vetor `v <- c(2, 5, 8, 11, 14, 19)`.
d. Some os elementos do vetor `z <- c(10, 15, 20, 5, 8, 3)` até que a soma passe de 50.

**3.** Usando `repeat`:

a. Simular lançamentos de um dado até sair um número 6 (dica: use a função `sample()` para simular os lançamentos).
b. Some os números do vetor `numeros <- c(30, 20, 25, 10, 15, 5)` até atingir ou ultrapassar 100.

<div id="protectedContent2" style="display:none;">
  
### Respostas {-}
```r
## 1.
# a.
for (i in 1:10) {
  print(i)
}
# b.
for (i in seq(2, 20, by = 2)) {
  print(i)
}
# c.
soma <- 0
for (i in 1:100) {
  soma <- soma + i
}
print(soma)
# d.
for (i in 1:10) {
  print(i^2)
}
# e.
num <- 5
fatorial <- 1
for (i in 1:num) {
  fatorial <- fatorial * i
}
print(fatorial)
# f.
nomes <- c("ana", "joao", "maria", "carlos")
for (nome in nomes) {
  print(toupper(nome))
}
# g.
matriz <- matrix(1:9, nrow = 3, byrow = TRUE)
for (i in 1:nrow(matriz)) {
  for (j in 1:ncol(matriz)) {
    print(paste("Elemento [", i, ",", j, "] =", matriz[i, j]))
  }
}
# h.
matriz <- matrix(c(1, 2, 3, 4, 5, 6), nrow = 2, byrow = TRUE)
for (i in 1:nrow(matriz)) {
  linha_soma <- sum(matriz[i, ])
  print(linha_soma)
  # print(paste("Soma da linha", i, "=", linha_soma))
}
## 2.
# a. 
i <- 1
while (i <= 10) {
  print(i)
  i <- i + 1
}
# b. 
vetor <- c("a", "b", "c", "d")
i <- 1
while (i <= length(vetor)) {
  print(vetor[i])
  i <- i + 1
}
# c. 
v <- c(2, 5, 8, 11, 14, 19)
i <- 1
pares <- 0
while (i <= length(v)) {
  if (v[i] %% 2 == 0) {
    pares <- pares + 1
  }
  i <- i + 1
}
# d. 
z <- c(10, 15, 20, 5, 8, 3)
soma <- 0
i <- 1
while (soma <= 50 && i <= length(z)) {
  soma <- soma + z[i]
  i <- i + 1
}
## 3.
# a.
repeat {
  dado <- sample(1:6, 1)
  print(paste("Resultado:", dado))
  if (dado == 6) break
}
# b. 
numeros <- c(30, 20, 25, 10, 15, 5)
soma <- 0
i <- 1
repeat {
  soma <- soma + numeros[i]
  if (soma >= 100 || i == length(numeros)) break
  i <- i + 1
}
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




### Controle de Fluxo (break e next)

O R oferece mecanismos para interromper ou pular iterações em loops.

#### 1. break {-}

Interrompe a execução de um loop.

**Exemplo:** Parar quando encontrar um número maior que 5.


``` r
v <- c(2, 3, 6, 1, 4)
for (i in 1:length(v)) {
  if (v[i] > 5) {
    print("Número maior que 5 encontrado! Parando o loop.")
    break
  }
  print(v[i])
}
```

```
## [1] 2
## [1] 3
## [1] "Número maior que 5 encontrado! Parando o loop."
```



#### 2. next {-}
Pula a iteração atual e continua para a próxima.


``` r
for (i in 1:5) {
  if (i %% 2 == 0) next
  print(i)
}
```

```
## [1] 1
## [1] 3
## [1] 5
```

``` r
# Os números pares foram ignorados.
```

#### Exercicios {-}

**1.** Usando `break`:

a. Imprima números de 1 a 10, mas parar se encontrar um múltiplo de 7.
b. Imprima os valores do vetor `valores <- c(5, 3, 2, -1, 7)` até encontrar o número negativo. 
c. Some os elementos do vetor `numeros <- c(5, 10, 15, 20, 30)` até a soma ultrapassar 50.


**2.** Usando `next`:

a. Imprima somente os números pares de 1 a 10.
b. Dado o vetor `vetor <- c(10, -5, 7, -2, 4)`, imprima somente os seus valores positivos.
b. Dado o vetor `dados <- c(10, NA, 20, 15, NA, 5)`, pule os valores NA ao calcular a soma.


<div id="protectedContent3" style="display:none;">
  
### Respostas {-}

```r
## 1.
# a.
for (i in 1:10) {
  if (i %% 7 == 0) {
    break
  }
  print(i)
}
# b.
valores <- c(5, 3, 2, -1, 7)
i <- 1
for(i in 1:length(valores))
  {
    if (valores[i] < 0) {
      print("Número negativo encontrado.")
      break
    } else {
    print(valores[i])
  }
}
# c. 
numeros <- c(5, 10, 15, 20, 30)
soma <- 0
for (n in numeros) {
  soma <- soma + n
  if (soma > 50) {
    break
  }
}
## 2. 
# a. 
for (i in 1:10) {
  if (i %% 2 != 0) {
    next
  }
  print(i)
}
# b. 
vetor <- c(10, -5, 7, -2, 4)
for (i in 1:length(v)) {
  if (vetor[i] < 0) {
    next
  }
  print(vetor[i])
}
# c.
dados <- c(10, NA, 20, 15, NA, 5)
soma <- 0
for (i in dados) {
  if (is.na(i)) {
    next
  }
  soma <- soma + i
}
# ou
soma <- 0
for (i in 1:length(dados)) {
  if (is.na(dados[i])) {
    next
  }
  soma <- soma + dados[i]
}
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


## Família de funções apply


Essas funções servem para evitar loops explícitos (for, while) e tornar o código mais limpo e eficiente. São funções vetorizadas que operam em listas, matrizes, data.frames, etc.


<!-- | Função   | Aplicação                          | Exemplo                                 | -->
<!-- |----------|------------------------------------|------------------------------------------| -->
<!-- | apply()  | Matriz, por linha/coluna           | apply(mat, 1, sum)                        | -->
<!-- | lapply() | Lista → Lista                      | lapply(lista, mean)                       | -->
<!-- | sapply() | Lista → Vetor simplificado         | sapply(lista, mean)                       | -->
<!-- | tapply() | Vetor com grupos (fator)           | tapply(dados, grupos, mean)              | -->

#### apply {-}

Aplica uma função a linhas ou colunas de uma matriz ou data.frame.

```r
## Estrutura do apply:
apply(matriz, MARGIN = 1, FUN = sum)  # aplica por linha
apply(matriz, MARGIN = 2, FUN = sum) # aplica por coluna
```

**Exemplo:** Comparando `for` e `apply` em operações com matrizes

``` r
# Soma das linhas de uma matriz usando `for`:
mat <- matrix(1:9, ncol = 3)
soma_for <- c()
for (i in 1:nrow(mat)) {
    soma_for[i] <- sum(mat[i,])
}
cat("Resultado com for:", soma_for)
```

```
## Resultado com for: 12 15 18
```

``` r
# Soma das linhas de uma matriz usando `apply`:
soma_apply <- apply(mat, 1, sum)
cat("Resultado com apply:", soma_apply)
```

```
## Resultado com apply: 12 15 18
```

#### lapply {-}

Aplica uma função a cada elemento de uma lista, retornando outra lista.

```r
## Estrutura do lapply:
lapply(lista, sum)
```

#### sapply {-}

Igual ao lapply(), mas simplifica o resultado (tenta transformar em vetor/matriz).

```r
## Estrutura do sapply:
sapply(lista, sum)
```

**Exemplo:** Comparando `for` com `lapply` e `sapply` em operações com listas.

``` r
# Soma de cada vetor de uma lista usando `for`:
lista <- list(v1 = c(1,2,3), v2 = c(4,5))
soma_for_lista <- list(v1 = c(), v2 = c())
for (i in 1:length(lista)) {
    soma_for_lista[[i]] <- sum(lista[[i]])
}
soma_for_lista # resultado em lista
```

```
## $v1
## [1] 6
## 
## $v2
## [1] 9
```

``` r
unlist(soma_for_lista) # resultado em vetor
```

```
## v1 v2 
##  6  9
```

``` r
# Soma de cada vetor de uma lista usando `lapply` e `sapply`:
(soma_lapply <- lapply(lista, sum)) # resultado em lista
```

```
## $v1
## [1] 6
## 
## $v2
## [1] 9
```

``` r
(soma_sapply <- sapply(lista, sum)) # resultado em vetor
```

```
## v1 v2 
##  6  9
```

#### tapply {-}

Aplica uma função a valores por grupo.

```r
## Estrutura do tapply:
tapply(valores, grupos, soma)
```

**Exemplo:** Comparando `for` com `tapply` para grupos.

``` r
# Soma dos valores por grupo usando `for`:
valores <- c(10, 20, 30, 40, 50, 60)
grupos <- c("A", "A", "B", "B", "A", "B")
resultado <- c()
grupos_unicos <- unique(grupos)
for (i in 1:length(grupos_unicos)) {
  resultado[i] <- sum(valores[grupos == grupos_unicos[i]])
}
print(resultado)
```

```
## [1]  80 130
```

``` r
# Soma dos valores por grupo usando `tapply`:
tapply(valores, grupos, sum)
```

```
##   A   B 
##  80 130
```



#### Exercicios {-}

**1.** Usando `apply`, `lapply`, `sapply` ou `tapply`:

a. Calcule a soma de cada coluna de uma matriz.
b. Calcule o valor máximo de cada linha de uma matriz.
c. Ordene cada coluna de uma matriz.
d. Calcule o comprimento de cada vetor numa lista.
e. Converta uma lista de strings com letras minúsculas para maiúsculas.
f. Calcule a média para cada vetor da lista `valores <- list(x = 1:5, y = 2:6, z = 3:7)`
 e retorne em um vetor.
g. Calcule a média de salários por setor, para os dados:
```r
salario <- c(2000, 2500, 2200, 4000, 5000, 4500)
setor <- c("RH", "RH", "RH", "TI", "TI", "TI")
```

<div id="protectedContent4" style="display:none;">
  
### Respostas {-}

```r
## 1.
# a. Calcule a soma de cada coluna de uma matriz.
matriz <- matrix(1:9, nrow = 3)
apply(matriz, 2, sum)
# b. Calcule o valor máximo de cada linha de uma matriz.
apply(matriz, 1, max)
# c. Ordene cada coluna de uma matriz.
apply(matriz, 2, sort)
# d. Calcule o comprimento de cada vetor numa lista.
lista <- list(a = 1:3, b = 5:10, c = 20:30)
lapply(lista, length)
# e. Converta uma lista de strings com letras minúsculas para maiúsculas.
palavras <- list("gato", "cachorro", "papagaio")
lapply(palavras, toupper)
# f. Calcule a média para cada vetor da lista e retorne em um vetor.
valores <- list(x = 1:5, y = 2:6, z = 3:7)
sapply(valores, mean)
# g. Calcule a média de salários por setor.
salario <- c(2000, 2500, 2200, 4000, 5000, 4500)
setor <- c("RH", "RH", "RH", "TI", "TI", "TI")
tapply(salario, setor, mean)
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




## Funções

Funções em R são blocos de código reutilizáveis que executam tarefas específicas.

#### Estrutura de função {-}
```r
nome_da_funcao <- function(argumentos_separados_por_virgula) {
  # corpo da função
  # instruções e retorno
  return(valor)
}
```
**Exemplo:** Função que calcula a soma de dois valores.

``` r
minha_soma <- function(a, b) {
  soma <- a + b
  return(soma)  # resultado retornado
}
```

Essa função tem os seguintes componentes:

- `minha_soma`: nome da função
- `a` e `b`: argumentos da função
- `soma <- x + y`: operação que a função executa
- `return(soma)`: valor retornado pela função

Após rodarmos o código de criar a função, podemos chamá-la como outras funções do R:

``` r
minha_soma(2,5)
```

```
## [1] 7
```

Se criar a função sem retorno, ela cria o objeto, mas não o retorna ao ser chamada:

``` r
minha_nova_soma <- function(a, b) {
  soma <- a + b
}
minha_nova_soma(2,2)
```

No entanto, a última linha da função é a atribuição `soma <- x + y` e esse será o "resultado retornado". Assim, podemos visualizar este resultado da função se o atribuirmos para outro objeto:

``` r
resultado <- minha_nova_soma(2,2)
resultado
```

```
## [1] 4
```

Na prática, no entanto, é sempre bom criarmos funções que retornem os seus resultados.

**Exemplo:** Função que calcula o quadrado de um número.

``` r
## Forma mais sucinta
## se o corpo da função for na mesma linha não é necessário colocar chaves
quad <- function(x) x^2
quad(3)
```

```
## [1] 9
```

**Componentes de uma função:**

- nome_da_funcao: Nome que você escolhe para a função.
- function(): Palavra-chave que define uma função.
- argumentos: Parâmetros de entrada.
- corpo da função: Código executado.
- return(): (opcional) Retorna o valor final da função. 


#### Funções com argumentos padrão {-}

Voltando ao exemplo da soma de dois números. Se fixarmos um valor para algum dos argumentos, apenas o valor do outro argumento seria necessário:

``` r
minha_soma2 <- function(a, b = 0) {
  soma <- a + b
  return(soma)  # resultado retornado
}
minha_soma2(2)
```

```
## [1] 2
```

No R, muitas funções já tem alguns argumentos pré-definidos (default), ficando a critério do usuário modificá-los ou não.

#### Funções anônimas {-}

Usadas geralmente dentro de funções como apply, lapply, etc.


``` r
lista <- list(c(1,2),c(2,3,4))
lapply(lista, function(x) x^2)
```

```
## [[1]]
## [1] 1 4
## 
## [[2]]
## [1]  4  9 16
```

#### Funções que usam outras funções {-}
Podemos também usar funções dentro de funções.

``` r
# Função que calcula a soma das colunas de uma matriz:
calcula_soma_matriz <- function(mat){
  soma_linhas <- apply(mat, 2, sum)
  return(soma_linhas)
}
matriz <- matrix(1:9, ncol = 3)
calcula_soma_matriz(matriz)
```

```
## [1]  6 15 24
```

#### Funções que retornam multiplos objetos {-}

Funções podem retornar múltiplos valores. Podemos utilizar `list()` ou `data.frame()` para agrupar os retornos.

``` r
# Função que retorna os valores minimos e máximos de um vetor:
min_max_vetor <- function(v){
  min_vec <- min(v)
  max_vec <- max(v)
  return(list(minimo_vec = min_vec, maximo_vec = max_vec))
}
v <- c(1,6,3,90,0,3,7,8)
min_max_vetor(v)
```

```
## $minimo_vec
## [1] 0
## 
## $maximo_vec
## [1] 90
```




#### Exercícios {-}

**1.** Crie uma função `raiz_numeros()` que receba 2 números e devolva a raiz quadrada da soma desses números.

**2.** Crie uma função `max_numeros()` que receba dois valores (numéricos) e devolva o maior deles.

**3.** Crie uma função `soma_pares()` que recebe um vetor numérico e retorna a soma apenas dos números pares.

**4.** Crie a função `remover_na(vetor)` que remove os NA de um vetor e retorna o vetor limpo.

**5.** Defina uma função `resumo_vetor()` que retorne o mínimo, a mediana e o máximo de um vetor. Faça com que a função lide com NA’s e que isso seja um argumento com default.

**6.** Rode `help(sample)` para descobrir o que a função `sample()` faz. Em seguida

a. use-a para escrever uma função `linha_aleatoria()` que devolva uma linha aleatória de um dataframe;
b. generalize a função para `linha_aleatoria_n()` que retorne um número `n` qualquer de linhas do dataframe, especificado pelo usuário.
c. Como tratar possíveis erros do código anterior?


<div id="protectedContent5" style="display:none;">
  
### Respostas {-}

```r
## 1.
raiz_numeros <- function(a, b){
  raiz_ab <- sqrt(a+b)
  return(raiz_ab)
}
## 2.
max_numeros <- function(a, b){
  maior_ab <- max(a, b)
  return(maior_ab)
}
## 3.
soma_pares <- function(v){
  soma <- sum(v[v%%2==0])
  return(soma)
}
## 4.
remover_na <- function(vetor){
  vetor_limpo <- vetor[!is.na(vetor)]
  return(vetor_limpo)
}
## 5.
resumo_vetor <- function(v, na.rm = TRUE) {
  min_vec = min(v, na.rm = na.rm)
  mediana_vec = median(v, na.rm = na.rm)
  max_vec = max(v, na.rm = na.rm)
  return(list(minimo = min_vec, mediana = mediana_vec, maximo = max_vec))
}
## 6.
dados <- data.frame(nome = c("Ana", "Beto", "Carlos"), idade = c(50,48,37), 
                    escolaridade = c("F", "M", "S"))
# a.
linha_aleatoria <- function(dados){
  linha <- sample(1:nrow(dados), size = 1)
  return(dados[linha,])
}
# b. 
linha_aleatoria_n <- function(dados, n){
  linha <- sample(1:nrow(dados), size = n_min)
  return(dados[linha,])
}
# c. 
linha_aleatoria_n <- function(dados, n){
  if(n <= 0) return(cat("n deve ser maior do que 0 e menor do que nrow(dados)"))
  n_min <- min(n, nrow(dados))
  linha <- sample(1:nrow(dados), size = n_min)
  return(dados[linha,])
}
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





#### Exercícios do Capítulo 3 <span style="color:red">(Entregar na lista 1)</span>  {-}

**1.** Considere o dataframe com as colunas a seguir. Crie uma função `filtra_dados()` com os argumentos `dados`, `variável` e `filtro`, de modo que o usuário consiga definir um conjunto de valores no `filtro`, para alguma `variavel` especificada. Trate a possível situação de erro no caso do usuário entrar com outros nomes que não estão no conjunto de dados.


``` r
  nome = c("Ana", "Bruno", "Carlos", "Diana")
  idade = c(20, 21, 19, 22)
  nota = c(8.5, 6.4, 9.2, 4.8)
```

**2.** Criar função que receba nota e retorne:

- "Aprovado", se >= 7
- "Recuperação", se >= 5 e < 7
- "Reprovado", se < 5

**3.**  Crie uma função que receba a idade de uma pessoa e classifique-a como "Criança" (se 0-12 anos), "Adolescente" (se 13-17 anos), "Adulto" (se 18-59 anos) ou "Idoso" (se 60+ anos). 

**4.** Crie uma função que retorne todos os elementos pares de cada vetor dentro de uma lista.

**5.** Crie uma função chamada `calculadora_soma()` que:

- Peça ao usuário que digite vários números separados por vírgula (ex: 10, 20, 30).
- Leia esses valores usando a função `readline()`.
- Converta os valores digitados para números.
- Some todos os valores e mostre o resultado na tela.

**Dica:** Use a função `strsplit()` para separar os números de entrada pela vírgula e `as.numeric()` para transformar os textos em números.




<!-- #### Funções aninhadas {-} -->

<!-- Funções aninhadas são funções definidas dentro de outras funções. -->
<!-- ```{r} -->

<!-- ``` -->

<!-- #### Funções recursivas {-} -->

<!-- Função recursiva é uma função que chama a si mesma dentro de seu corpo. -->

<!-- ```{r} -->
<!-- fatorial <- function(n) { -->
<!--   if (n == 0 || n == 1)  -->
<!--     { -->
<!--       return(1) -->
<!--     } else { -->
<!--       fac <- n * fatorial(n - 1) -->
<!--       return(fac) -->
<!--     } -->
<!-- } -->
<!-- fatorial(5)   -->
<!-- ``` -->
 
