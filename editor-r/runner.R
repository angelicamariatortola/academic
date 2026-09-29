# ============================================================
# Funções internas do Editor de R (carregadas no webR ao abrir a página).
# Ficam em um ambiente anexado ("ferramentas:editor"), fora do ambiente
# global, para não aparecerem em ls() nem na aba Objetos.
#
# Toda a saída vai para o stdout, com marcadores que o app.js usa para
# dar cor a cada tipo de linha:
#   \036  linha de código ecoada no console ("> ...")
#   \035E erro   \035W aviso   \035M mensagem
#   \035A ajuda de uma função ("tópico<TAB>arquivo1<TAB>arquivo2..."),
#         que o app.js mostra na aba Help
# ============================================================

local({
  ferramentas <- new.env()

  emitir <- function(marca, texto) {
    linhas <- strsplit(texto, "\n", fixed = TRUE)[[1]]
    if (length(linhas) == 0) linhas <- ""
    cat(paste0(marca, linhas, "\n"), sep = "")
  }

  # "Erro em f(x): mensagem", como no console do R. Chamadas feitas pelo
  # próprio editor (eval) são omitidas, para não confundir quem usa o editor.
  descrever <- function(cond, rotulo) {
    msg <- sub("\n$", "", conditionMessage(cond))
    chamada <- conditionCall(cond)
    if (is.null(chamada) || identical(chamada[[1]], quote(eval))) {
      return(paste0(rotulo, ": ", msg))
    }
    txt <- paste(deparse(chamada, width.cutoff = 60L, nlines = 1L), collapse = "")
    paste0(rotulo, " em ", txt, ": ", msg)
  }

  # Avalia uma expressão no ambiente global e imprime o resultado visível.
  # Retorna FALSE se houve erro ou interrupção.
  avaliar <- function(expr) {
    ok <- TRUE
    withCallingHandlers(
      tryCatch({
        res <- withVisible(eval(expr, envir = globalenv()))
        if (res$visible) {
          if (isS4(res$value)) methods::show(res$value) else print(res$value)
        }
      },
      error = function(e) {
        emitir("\035E", descrever(e, "Erro"))
        ok <<- FALSE
      },
      interrupt = function(i) {
        emitir("\035E", "Execução interrompida.")
        ok <<- FALSE
      }),
      warning = function(w) {
        emitir("\035W", descrever(w, "Aviso"))
        invokeRestart("muffleWarning")
      },
      message = function(m) {
        emitir("\035M", sub("\n$", "", conditionMessage(m)))
        invokeRestart("muffleMessage")
      }
    )
    ok
  }

  # Executa um trecho de código como no console: ecoa cada expressão
  # (e os comentários entre elas) e para no primeiro erro.
  ferramentas$.editor_executar <- function(codigo) {
    linhas <- strsplit(codigo, "\n", fixed = TRUE)[[1]]
    exprs <- tryCatch(parse(text = codigo, keep.source = TRUE),
                      error = function(e) e)

    if (inherits(exprs, "error")) {
      visiveis <- linhas[nzchar(trimws(linhas))]
      emitir("\036", paste0(c("> ", rep("+ ", max(length(visiveis) - 1, 0))),
                            visiveis, collapse = "\n"))
      emitir("\035E", paste0("Erro de sintaxe: ", conditionMessage(exprs)))
      return(invisible(FALSE))
    }

    srcrefs <- attr(exprs, "srcref")
    ultima <- 0L
    for (i in seq_along(exprs)) {
      ini <- srcrefs[[i]][1]
      fim <- srcrefs[[i]][3]
      if (fim > ultima) {
        # Comentários antes do comando e a 1ª linha dele levam "> ";
        # as linhas de continuação do comando levam "+ "
        numeros <- seq(ultima + 1L, fim)
        prompts <- ifelse(numeros <= ini, "> ", "+ ")
        visiveis <- nzchar(trimws(linhas[numeros]))
        if (any(visiveis)) {
          emitir("\036", paste0(prompts[visiveis], linhas[numeros][visiveis],
                                collapse = "\n"))
        }
        ultima <- fim
      }
      if (!avaliar(exprs[[i]])) {
        if (i < length(exprs)) {
          emitir("\035M", "(As linhas seguintes não foram executadas por causa do erro acima.)")
        }
        return(invisible(FALSE))
      }
    }
    invisible(TRUE)
  }

  # Linhas (início, fim) da expressão que contém a linha do cursor, para que
  # Ctrl+Enter execute o comando inteiro mesmo quando ele ocupa várias linhas.
  ferramentas$.editor_intervalo <- function(codigo, linha) {
    exprs <- tryCatch(parse(text = codigo, keep.source = TRUE),
                      error = function(e) NULL)
    if (length(exprs) == 0) return(c(linha, linha))
    srcrefs <- attr(exprs, "srcref")
    ini <- vapply(srcrefs, function(s) s[1], integer(1))
    fim <- vapply(srcrefs, function(s) s[3], integer(1))
    dentro <- which(ini <= linha & fim >= linha)
    if (length(dentro) == 0) return(c(linha, linha))
    c(min(ini[dentro]), max(fim[dentro]))
  }

  # Resumo dos objetos do ambiente global para a aba Objetos:
  # uma linha "nome<TAB>classe<TAB>resumo" por objeto.
  ferramentas$.editor_objetos <- function() {
    nomes <- ls(globalenv())
    vapply(nomes, function(n) {
      x <- get(n, envir = globalenv())
      resumo <- tryCatch({
        if (is.data.frame(x)) {
          sprintf("%d obs. de %d variáveis", nrow(x), ncol(x))
        } else if (is.function(x)) {
          "função"
        } else if (is.atomic(x)) {
          valores <- utils::head(x, 6)
          valores <- if (is.character(valores)) paste0('"', valores, '"') else format(valores)
          txt <- paste(valores, collapse = " ")
          if (length(x) > 1) txt <- sprintf("[%d] %s%s", length(x), txt,
                                             if (length(x) > 6) " …" else "")
          txt
        } else if (is.list(x)) {
          sprintf("lista com %d elementos", length(x))
        } else {
          paste(utils::capture.output(utils::str(x, max.level = 0, give.attr = FALSE)),
                collapse = " ")
        }
      }, error = function(e) "")
      paste(n, class(x)[1], substr(gsub("[\t\n]", " ", resumo), 1, 150), sep = "\t")
    }, character(1), USE.NAMES = FALSE)
  }

  # View() não abre janela no navegador: mostra as primeiras linhas.
  ferramentas$View <- function(x, title) {
    print(utils::head(x, 20))
    if (NROW(x) > 20) {
      message("(View mostra só as 20 primeiras linhas neste editor. Total: ",
              NROW(x), " linhas.)")
    }
    invisible(x)
  }

  # ?mean e help(mean): em vez de abrir a aba Help do RStudio (que o R não
  # consegue fazer no navegador), avisa o app.js, que mostra a documentação
  # na aba Help do editor.
  mostrar_ajuda <- function(x, ...) {
    caminhos <- as.character(x)
    if (length(caminhos) == 0) {
      emitir("\035M", paste0("Nenhuma ajuda encontrada para \"", attr(x, "topic"),
                             "\". Confira o nome ou carregue o pacote com library()."))
    } else {
      emitir("\035A", paste(c(attr(x, "topic"), caminhos), collapse = "\t"))
    }
    invisible(x)
  }
  registerS3method("print", "help_files_with_topic", mostrar_ajuda,
                   envir = asNamespace("utils"))

  # Página HTML da documentação guardada em um arquivo de ajuda do R. Os
  # links para outras funções ficam como "../../pacote/help/topico.html",
  # que o app.js transforma em navegação dentro da aba Help.
  ferramentas$.editor_html_ajuda <- function(caminho) {
    pacote <- basename(dirname(dirname(caminho)))
    arquivo <- tempfile(fileext = ".html")
    links <- tools::findHTMLlinks(system.file(package = pacote), level = 0:1)
    tools::Rd2HTML(utils:::.getHelpFile(caminho), out = arquivo,
                   package = pacote, Links = links)
    paste(readLines(arquivo, encoding = "UTF-8", warn = FALSE), collapse = "\n")
  }

  # Arquivos de ajuda de um tópico (usado pelos links dentro da aba Help)
  ferramentas$.editor_caminhos_ajuda <- function(topico, pacote = NULL) {
    as.character(utils::help((topico), package = (pacote), try.all.packages = is.null(pacote)))
  }

  # Console: o comando digitado está completo? "ok", "incompleto" ou "erro"
  ferramentas$.editor_completo <- function(codigo) {
    tryCatch({
      parse(text = codigo, keep.source = FALSE)
      "ok"
    }, error = function(e) {
      if (grepl("end of input|INCOMPLETE_STRING|fim de entrada", conditionMessage(e))) "incompleto" else "erro"
    })
  }

  # Autocompletar (tecla Tab): devolve o trecho que está sendo digitado,
  # seguido das opções encontradas
  ferramentas$.editor_completar <- function(linha) {
    utils:::.assignLinebuffer(linha)
    utils:::.assignEnd(nchar(linha))
    token <- utils:::.guessTokenFromLine()
    utils:::.completeToken()
    c(token, utils:::.retrieveCompletions())
  }

  # Aba Packages: "nome<TAB>versão<TAB>carregado" para cada pacote instalado
  ferramentas$.editor_pacotes <- function() {
    ip <- utils::installed.packages()
    ip <- ip[!duplicated(ip[, "Package"]), , drop = FALSE]
    ip <- ip[order(tolower(ip[, "Package"])), , drop = FALSE]
    carregados <- sub("^package:", "", grep("^package:", search(), value = TRUE))
    paste(ip[, "Package"], ip[, "Version"], ip[, "Package"] %in% carregados, sep = "\t")
  }

  attach(ferramentas, name = "ferramentas:editor", warn.conflicts = FALSE)
})

# Gráficos: dispositivo do webR com fundo branco (o app.js ajusta o tamanho
# ao do painel antes de cada execução)
options(device = function(...) webr::canvas(width = 640, height = 440, bg = "white"))

# install.packages() passa a baixar pacotes do repositório do webR
invisible(tryCatch(webr::shim_install(), error = function(e) NULL))
