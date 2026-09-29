// ============================================================
// Editor de R — roda o R no navegador com o webR.
// ============================================================

import { WebR, ChannelType } from 'https://webr.r-wasm.org/v0.6.0/webr.mjs';

const PASTA = '/home/web_user';               // pasta de trabalho do R
const CHAVE_CODIGO = 'editor-r-seed:codigo';  // localStorage
const LIMITE_LINHAS_CONSOLE = 5000;
const LIMITE_GRAFICOS = 30;

// Dados de exemplo da pasta data/ do editor, copiados para a pasta de trabalho do R
const DADOS_EXEMPLO = [
  'data/processed/alunos_2023_limpo.csv',
  'data/raw/alunos_2023.csv',
  'data/raw/censo_escolar_pr.csv',
  'data/raw/matriculas.xlsx',
  'data/raw/notas.txt',
  'data/raw/seed_database.sqlite',
];

const LER_ALUNOS = 'alunos <- read.csv("data/processed/alunos_2023_limpo.csv", fileEncoding = "UTF-8")';

const CODIGO_INICIAL = `# Bem-vindo ao Editor de R!
# Coloque o cursor em uma linha e aperte Ctrl+Enter para executá-la.
# Para começar do zero, clique em "Novo".

# Exemplo com os dados da pasta data/

${LER_ALUNOS}
head(alunos)

mean(alunos$nota_mat, na.rm = TRUE)   # na.rm = TRUE ignora as notas em branco (NA)

boxplot(nota_mat ~ turno, data = alunos, col = "#56B4E9",
        xlab = NULL, ylab = "Nota de Matemática")
`;

const EXEMPLOS = [
  {
    titulo: 'Primeiros passos',
    codigo: `# O R como calculadora
2 + 3
10 / 4
sqrt(81)

# Guardando valores em objetos
notas <- c(7.5, 8.0, 6.5, 9.2, 5.8)
mean(notas)
summary(notas)
notas[notas >= 7]
`,
  },
  {
    titulo: 'Ler os dados dos alunos',
    codigo: `${LER_ALUNOS}

head(alunos)      # primeiras linhas
str(alunos)       # tipo de cada coluna
summary(alunos)   # resumo de cada coluna
table(alunos$turno)
`,
  },
  {
    titulo: 'CSV com ponto e vírgula (Censo)',
    codigo: `# Padrão brasileiro: separador ";" e vírgula decimal -> read.csv2()
censo <- read.csv2("data/raw/censo_escolar_pr.csv", fileEncoding = "latin1")

head(censo)
mean(censo$taxa_aprovacao)
`,
  },
  {
    titulo: 'Gráficos com o R base',
    codigo: `${LER_ALUNOS}

hist(alunos$nota_mat, main = "Notas de Matemática",
     xlab = "Nota", ylab = "Alunos", col = "#56B4E9")

boxplot(nota_mat ~ turno, data = alunos, col = "#E69F00",
        xlab = NULL, ylab = "Nota de Matemática")

plot(alunos$nota_mat, alunos$nota_por, pch = 19,
     xlab = "Matemática", ylab = "Português")
`,
  },
  {
    titulo: 'Resumos com dplyr',
    codigo: `install.packages("dplyr")   # uma vez por sessão (demora alguns segundos)
library(dplyr)

${LER_ALUNOS}

alunos |>
  group_by(turno) |>
  summarise(
    alunos    = n(),
    media_mat = mean(nota_mat, na.rm = TRUE),
    media_por = mean(nota_por, na.rm = TRUE)
  )
`,
  },
  {
    titulo: 'Gráfico com ggplot2',
    codigo: `install.packages("ggplot2")   # uma vez por sessão (demora alguns segundos)
library(ggplot2)

${LER_ALUNOS}

ggplot(alunos, aes(x = nota_mat, y = nota_por, color = turno)) +
  geom_point(alpha = 0.6) +
  labs(x = "Matemática", y = "Português", color = "Turno") +
  theme_minimal()
`,
  },
  {
    titulo: 'Ler planilha do Excel',
    codigo: `install.packages("readxl")   # uma vez por sessão
library(readxl)

matriculas <- read_excel("data/raw/matriculas.xlsx")
matriculas
`,
  },
  {
    titulo: 'Salvar um arquivo e baixar',
    codigo: `${LER_ALUNOS}

aprovados <- subset(alunos, nota_mat >= 6 & nota_por >= 6)
nrow(aprovados)

write.csv(aprovados, "aprovados.csv", row.names = FALSE)
# Baixe o arquivo pela aba "Files", ao lado.
`,
  },
];

// Dicas em português para os erros mais comuns de quem está começando
const DICAS = [
  [/object '([^']+)' not found/,
    (m) => `O objeto <code>${esc(m[1])}</code> ainda não existe. Confira se o nome está escrito igual (maiúsculas e minúsculas contam) e se a linha que o cria já foi executada.`],
  [/could not find function "([^"]+)"/,
    (m) => `A função <code>${esc(m[1])}()</code> não foi encontrada. Confira o nome ou, se ela for de um pacote, carregue-o antes com <code>library()</code>.`],
  [/there is no package called [‘'"]([^’'"]+)[’'"]/,
    (m) => `O pacote <code>${esc(m[1])}</code> não está instalado nesta sessão. Rode <code>install.packages("${esc(m[1])}")</code> e depois o <code>library()</code> de novo.`],
  [/cannot open file '([^']+)'|cannot open the connection|does not exist/,
    () => 'O arquivo não foi encontrado. Veja os nomes disponíveis na aba <strong>Files</strong>: os dados de exemplo ficam em <code>data/raw/</code> e <code>data/processed/</code>.'],
  [/unexpected end of input|INCOMPLETE_STRING/,
    () => 'Parece que faltou fechar um parêntese, colchete, chave ou aspas.'],
  [/unexpected (symbol|numeric constant|string constant)/,
    () => 'Parece que faltou uma vírgula, um operador ou um parêntese entre dois termos.'],
  [/unexpected '([^']+)'/,
    (m) => `Há um <code>${esc(m[1])}</code> sobrando ou fora do lugar.`],
  [/non-numeric argument to binary operator/,
    () => 'A conta envolve um valor que não é número (por exemplo, um texto entre aspas). Confira o tipo com <code>class()</code>.'],
];

// ---------- Utilidades ----------

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const isolado = window.crossOriginIsolated === true;

function lerStorage(chave) {
  try { return localStorage.getItem(chave); } catch { return null; }
}
function gravarStorage(chave, valor) {
  try { localStorage.setItem(chave, valor); } catch { /* armazenamento indisponível */ }
}

function baixar(blob, nome) {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: nome });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function formatarTamanho(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1).replace('.', ',')} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1).replace('.', ',')} MB`;
}

// Link compartilhável: código em base64 (URL-safe) depois de "#codigo="
function codificar(texto) {
  let bin = '';
  new TextEncoder().encode(texto).forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodificar(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

let timerAviso;
function aviso(html, ms = 3000) {
  const el = $('aviso');
  el.innerHTML = html;
  el.hidden = false;
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => { el.hidden = true; }, ms);
  return el;
}

function status(texto, classe) {
  const el = $('status');
  el.textContent = texto;
  el.className = `status ${classe}`;
}

// ---------- Console ----------

const con = $('console');            // linhas de saída
const areaConsole = $('area-console'); // saída + linha de comando (rola junto)

function escrever(texto, classe) {
  const el = document.createElement('div');
  el.className = classe;
  el.textContent = texto;
  con.append(el);
  while (con.childElementCount > LIMITE_LINHAS_CONSOLE) con.firstElementChild.remove();
  areaConsole.scrollTop = areaConsole.scrollHeight;
  return el;
}

function escreverHtml(html, classe) {
  const el = escrever('', classe);
  el.innerHTML = html;
  areaConsole.scrollTop = areaConsole.scrollHeight;
  return el;
}

function limparConsole() {
  con.replaceChildren();
}

// Número de caracteres que cabem numa linha do console (vira options(width))
function larguraConsole() {
  const medidor = Object.assign(document.createElement('span'), { textContent: 'x'.repeat(50) });
  medidor.style.cssText = 'position:absolute;visibility:hidden';
  con.append(medidor);
  const larguraChar = medidor.getBoundingClientRect().width / 50 || 8;
  medidor.remove();
  return Math.max(40, Math.min(200, Math.floor((con.clientWidth - 30) / larguraChar)));
}

// Gráficos novos são criados no tamanho do painel, para o texto ficar legível
function tamanhoGrafico() {
  const area = $('graficos');
  if (area.clientWidth < 100 || area.clientHeight < 100) return { largura: 640, altura: 440 };
  return {
    largura: Math.round(Math.min(1200, Math.max(320, area.clientWidth - 16))),
    altura: Math.round(Math.min(900, Math.max(240, area.clientHeight - 16))),
  };
}

// Linhas marcadas pelo runner.R: \x1e = código ecoado; \x1dE/W/M = erro/aviso/mensagem;
// \x1dA = pedido de ajuda (tópico e arquivos), aberto na aba Help depois da execução
let textoProblemas = '';
let ajudaPendente = null;
function processarLinha(tipo, linha) {
  if (linha.startsWith('\x1e')) {
    escrever(linha.slice(1), 'entrada');
  } else if (linha.startsWith('\x1dA')) {
    const [topico, ...caminhos] = linha.slice(2).split('\t');
    ajudaPendente = { topico, caminhos };
  } else if (linha.startsWith('\x1d')) {
    const classe = { E: 'erro', W: 'aviso', M: 'mensagem' }[linha[1]] ?? 'mensagem';
    escrever(linha.slice(2), classe);
    if (classe !== 'mensagem') textoProblemas += `${linha.slice(2)}\n`;
  } else {
    escrever(linha, tipo === 'stderr' ? 'mensagem' : 'saida');
  }
}

function mostrarDica() {
  for (const [padrao, texto] of DICAS) {
    const m = textoProblemas.match(padrao);
    if (m) {
      escreverHtml(`<strong>Dica:</strong> ${texto(m)}`, 'dica');
      return;
    }
  }
}

// ---------- Execução ----------

let webR;
let ocupado = false;
let fila = Promise.resolve();

// Tudo o que usa o R passa por esta fila, para rodar uma coisa de cada vez
function enfileirar(tarefa) {
  const p = fila.then(() => (webR ? tarefa() : undefined));
  fila = p.catch((e) => {
    console.error(e);
    escrever(`Erro interno do editor: ${e.message ?? e}`, 'erro');
  });
  return fila;
}

function definirOcupado(valor) {
  ocupado = valor;
  areaConsole.classList.toggle('ocupado', valor);
  $('btn-parar').disabled = !(valor && isolado);
  if (valor) status('Executando…', 'executando');
  else status(versaoR, 'pronto');
}

async function executar(codigo) {
  if (!codigo.trim()) return;
  registrarHistorico(codigo);
  definirOcupado(true);
  textoProblemas = '';
  const shelter = await new webR.Shelter();
  try {
    const { largura, altura } = tamanhoGrafico();
    await webR.evalRVoid(`options(width = ${larguraConsole()}, device = function(...)
      webr::canvas(width = ${largura}, height = ${altura}, bg = "white"))`);
    await webR.objs.globalEnv.bind('.editor_codigo', codigo);
    const res = await shelter.captureR(
      'local({ codigo <- .editor_codigo; rm(.editor_codigo, envir = globalenv()); .editor_executar(codigo) })',
      { captureGraphics: false, captureConditions: false, withAutoprint: false, throwJsException: false },
    );
    for (const item of res.output) {
      for (const linha of String(item.data).split('\n')) processarLinha(item.type, linha);
    }
  } finally {
    await shelter.purge();
    definirOcupado(false);
  }
  mostrarDica();
  if (ajudaPendente) {
    const { topico, caminhos } = ajudaPendente;
    ajudaPendente = null;
    await mostrarAjuda(topico, caminhos);
  }
  await atualizarPaineis();
}

// Linhas [início, fim] (base 0) do comando que contém a linha do cursor
async function intervaloComando(documento, linha) {
  await webR.objs.globalEnv.bind('.editor_doc', documento);
  const r = await webR.evalRRaw(
    `local({ d <- .editor_doc; rm(.editor_doc, envir = globalenv()); .editor_intervalo(d, ${linha + 1}) })`,
    'number[]',
  );
  return [r[0] - 1, r[1] - 1];
}

function destacar(ini, fim) {
  const linhas = [];
  for (let i = ini; i <= fim; i++) linhas.push(editor.addLineClass(i, 'background', 'linha-executada'));
  setTimeout(() => linhas.forEach((h) => editor.removeLineClass(h, 'background', 'linha-executada')), 700);
}

// Como no RStudio: depois de executar, o cursor vai para o próximo comando
function moverCursorApos(fim) {
  let prox = fim + 1;
  while (prox < editor.lineCount() && !editor.getLine(prox).trim()) prox++;
  if (prox >= editor.lineCount()) {
    editor.setCursor({ line: editor.lineCount() - 1, ch: editor.getLine(editor.lineCount() - 1).length });
  } else {
    editor.setCursor({ line: prox, ch: 0 });
  }
  editor.scrollIntoView(null, 60);
}

function executarAtual() {
  enfileirar(async () => {
    let codigo;
    if (editor.somethingSelected()) {
      codigo = editor.getSelection();
      const { from, to } = editor.listSelections()[0];
      destacar(Math.min(from.line, to.line), Math.max(from.line, to.line));
    } else {
      const [ini, fim] = await intervaloComando(editor.getValue(), editor.getCursor().line);
      codigo = editor.getRange({ line: ini, ch: 0 }, { line: fim, ch: editor.getLine(fim).length });
      destacar(ini, fim);
      moverCursorApos(fim);
    }
    await executar(codigo);
  });
  editor.focus();
}

function executarTudo() {
  enfileirar(async () => {
    destacar(0, editor.lineCount() - 1);
    await executar(editor.getValue());
  });
  editor.focus();
}

function parar() {
  if (ocupado && isolado) webR.interrupt();
}

// ---------- Gráficos ----------

const graficos = [];
let graficoAtual = -1;

function novoGrafico() {
  graficos.push(document.createElement('canvas'));
  if (graficos.length > LIMITE_GRAFICOS) graficos.shift();
  mostrarGrafico(graficos.length - 1);
  mostrarAba('graficos');
}

function desenharGrafico(imagem) {
  if (graficos.length === 0) novoGrafico();
  const canvas = graficos[graficos.length - 1];
  if (canvas.width !== imagem.width || canvas.height !== imagem.height) {
    canvas.width = imagem.width;
    canvas.height = imagem.height;
  }
  canvas.getContext('2d').drawImage(imagem, 0, 0);
  imagem.close?.();
}

function mostrarGrafico(i) {
  graficoAtual = i;
  const area = $('graficos');
  const vazio = graficos.length === 0;
  if (vazio) {
    area.innerHTML = '<p class="vazio">Os gráficos criados com <code>plot()</code>, <code>hist()</code>, <code>ggplot()</code> etc. aparecem aqui.</p>';
  } else {
    area.replaceChildren(graficos[i]);
  }
  $('graf-contador').textContent = vazio ? 'Nenhum gráfico' : `Gráfico ${i + 1} de ${graficos.length}`;
  $('btn-graf-anterior').disabled = vazio || i === 0;
  $('btn-graf-proximo').disabled = vazio || i === graficos.length - 1;
  $('btn-graf-baixar').disabled = vazio;
  $('btn-graf-limpar').disabled = vazio;
}

// Saídas que chegam fora da execução capturada: gráficos (canvas) e textos avulsos
let mostrarSaidaAvulsa = false;
async function lerSaidas() {
  for (;;) {
    const msg = await webR.read();
    if (msg.type === 'canvas') {
      if (msg.data.event === 'canvasNewPage') novoGrafico();
      else if (msg.data.event === 'canvasImage') desenharGrafico(msg.data.image);
    } else if ((msg.type === 'stdout' || msg.type === 'stderr') && mostrarSaidaAvulsa) {
      escrever(msg.data, msg.type === 'stdout' ? 'saida' : 'mensagem');
    } else if (msg.type === 'closed') {
      return;
    }
  }
}

// ---------- Objetos e arquivos ----------

async function atualizarObjetos() {
  const linhas = await webR.evalRRaw('.editor_objetos()', 'string[]');
  const corpo = $('lista-objetos');
  if (linhas.length === 0) {
    corpo.innerHTML = '<tr><td colspan="3" class="vazio">Nenhum objeto criado ainda.</td></tr>';
    return;
  }
  corpo.replaceChildren(...linhas.map((l) => {
    const [nome, classe, valor] = l.split('\t');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${esc(nome)}</td><td>${esc(classe)}</td><td class="valor">${esc(valor ?? '')}</td>`;
    return tr;
  }));
}

async function atualizarArquivos() {
  let linhas = await webR.evalRRaw(
    `local({ f <- list.files("${PASTA}", recursive = TRUE)
             if (length(f)) paste(f, file.size(file.path("${PASTA}", f)), sep = "\\t") else character(0) })`,
    'string[]',
  );
  const corpo = $('lista-arquivos');
  linhas = linhas.filter((l) => !l.startsWith('default.profraw\t'));  // arquivo interno do webR
  if (linhas.length === 0) {
    corpo.innerHTML = '<tr><td colspan="3" class="vazio">Nenhum arquivo.</td></tr>';
    return;
  }
  corpo.replaceChildren(...linhas.map((l) => {
    const [nome, tamanho] = l.split('\t');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${esc(nome)}</td><td class="num">${formatarTamanho(Number(tamanho))}</td>
      <td class="acoes"><button class="pequeno" data-baixar>Baixar</button>
      <button class="pequeno" data-remover title="Remove o arquivo da sessão">Remover</button></td>`;
    tr.querySelector('[data-baixar]').addEventListener('click', () => enfileirar(async () => {
      const dados = await webR.FS.readFile(`${PASTA}/${nome}`);
      baixar(new Blob([dados]), nome.split('/').pop());
    }));
    tr.querySelector('[data-remover]').addEventListener('click', () => enfileirar(async () => {
      await webR.FS.unlink(`${PASTA}/${nome}`);
      await atualizarArquivos();
    }));
    return tr;
  }));
}

async function atualizarPaineis() {
  try {
    await atualizarObjetos();
    await atualizarArquivos();
    await atualizarPacotes();
  } catch (e) {
    console.error(e);
  }
}

async function criarPastas(caminho) {
  const partes = caminho.split('/').slice(0, -1);
  for (let i = 1; i <= partes.length; i++) {
    try { await webR.FS.mkdir(`${PASTA}/${partes.slice(0, i).join('/')}`); } catch { /* já existe */ }
  }
}

async function carregarDadosExemplo() {
  let carregados = 0;
  await Promise.all(DADOS_EXEMPLO.map(async (caminho) => {
    try {
      const resp = await fetch(new URL(caminho, location.href));
      if (!resp.ok) return;
      const dados = new Uint8Array(await resp.arrayBuffer());
      await criarPastas(caminho);
      await webR.FS.writeFile(`${PASTA}/${caminho}`, dados);
      carregados++;
    } catch { /* arquivo indisponível: segue sem ele */ }
  }));
  return carregados;
}

const LEITURA_SUGERIDA = {
  csv: (n) => `read.csv("${n}")`,
  txt: (n) => `read.delim("${n}")`,
  tsv: (n) => `read.delim("${n}")`,
  xlsx: (n) => `readxl::read_excel("${n}")`,
  xls: (n) => `readxl::read_excel("${n}")`,
  rds: (n) => `readRDS("${n}")`,
  r: (n) => `source("${n}")`,
};

async function enviarArquivos(arquivos) {
  for (const arq of arquivos) {
    const dados = new Uint8Array(await arq.arrayBuffer());
    await webR.FS.writeFile(`${PASTA}/${arq.name}`, dados);
    const sugestao = LEITURA_SUGERIDA[arq.name.split('.').pop().toLowerCase()];
    escreverHtml(`Arquivo <code>${esc(arq.name)}</code> enviado para a pasta de trabalho.` +
      (sugestao ? ` Para ler: <code>${esc(sugestao(arq.name))}</code>` : ''), 'sistema');
  }
  await atualizarArquivos();
}

// ---------- Abas ----------

function mostrarAba(nome) {
  const grupo = document.querySelector(`.abas [data-aba="${nome}"]`).closest('.abas');
  grupo.querySelectorAll('[role="tab"]').forEach((b) => {
    const ativa = b.dataset.aba === nome;
    b.setAttribute('aria-selected', String(ativa));
    $(`aba-${b.dataset.aba}`).hidden = !ativa;
  });
}

// ---------- Editor ----------

function codigoInicial() {
  const m = location.hash.match(/^#codigo=(.+)$/);
  if (m) {
    try {
      const codigo = decodificar(m[1]);
      history.replaceState(null, '', location.pathname + location.search);
      return codigo;
    } catch { /* link inválido: ignora */ }
  }
  return lerStorage(CHAVE_CODIGO) ?? CODIGO_INICIAL;
}

const editor = CodeMirror($('editor'), {
  value: codigoInicial(),
  mode: 'r',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  indentUnit: 2,
  tabSize: 2,
  extraKeys: {
    'Ctrl-Enter': executarAtual,
    'Cmd-Enter': executarAtual,
    'Shift-Ctrl-Enter': executarTudo,
    'Shift-Cmd-Enter': executarTudo,
    'Shift-Ctrl-C': 'toggleComment',
    'Shift-Cmd-C': 'toggleComment',
    'Alt--': (cm) => cm.replaceSelection(' <- '),
    Tab: (cm) => (cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection('  ')),
    'Shift-Tab': (cm) => cm.indentSelection('subtract'),
  },
});

let timerSalvar;
editor.on('change', () => {
  clearTimeout(timerSalvar);
  timerSalvar = setTimeout(() => gravarStorage(CHAVE_CODIGO, editor.getValue()), 400);
});

// ---------- Ligações da interface ----------

$('btn-executar').addEventListener('click', executarAtual);
$('btn-executar-tudo').addEventListener('click', executarTudo);
$('btn-parar').addEventListener('click', parar);
$('btn-limpar').addEventListener('click', limparConsole);

const selExemplos = $('sel-exemplos');
EXEMPLOS.forEach((ex, i) => selExemplos.add(new Option(ex.titulo, String(i))));
// Pede confirmação antes de descartar um código que não seja o inicial nem um exemplo
function podeSubstituir(pergunta) {
  const atual = editor.getValue().trim();
  return !atual || atual === CODIGO_INICIAL.trim() || EXEMPLOS.some((e) => e.codigo.trim() === atual)
    || window.confirm(`${pergunta} (Salve antes se quiser guardá-lo.)`);
}

selExemplos.addEventListener('change', () => {
  const ex = EXEMPLOS[Number(selExemplos.value)];
  selExemplos.value = '';
  if (!ex || !podeSubstituir('Substituir o código do editor pelo exemplo?')) return;
  editor.setValue(ex.codigo);
  editor.setCursor({ line: 0, ch: 0 });
  editor.focus();
});

$('btn-novo').addEventListener('click', () => {
  if (!podeSubstituir('Apagar o código do editor e começar em branco?')) return;
  editor.setValue('');
  editor.focus();
});

$('btn-abrir').addEventListener('click', () => $('arq-script').click());
$('arq-script').addEventListener('change', async (ev) => {
  const arq = ev.target.files[0];
  if (arq) editor.setValue(await arq.text());
  ev.target.value = '';
});

$('btn-salvar').addEventListener('click', () => {
  baixar(new Blob([editor.getValue()], { type: 'text/plain;charset=utf-8' }), 'script.R');
});

$('btn-compartilhar').addEventListener('click', async () => {
  const link = `${location.origin}${location.pathname}#codigo=${codificar(editor.getValue())}`;
  try {
    await navigator.clipboard.writeText(link);
    aviso('Link copiado! Quem abrir o link verá este código no editor.');
  } catch {
    const el = aviso('Copie o link abaixo:<input readonly>', 15000);
    const campo = el.querySelector('input');
    campo.value = link;
    campo.select();
  }
});

// ---------- Console: linha de comando, como no RStudio ----------
// Enter executa (ou, se o comando estiver incompleto, abre uma linha "+");
// Shift+Enter quebra a linha; ↑/↓ percorrem o histórico; Tab completa; Esc apaga.

const entrada = $('entrada');
const prompt = $('prompt');
const historico = [];          // comandos digitados no console (setas ↑/↓)
let posHistorico = 0;
let navegando = false;         // o texto veio do histórico e ainda não foi editado

function ajustarEntrada() {
  const n = entrada.value.split('\n').length;
  entrada.rows = n;
  prompt.textContent = ['>', ...Array(n - 1).fill('+')].join('\n');
  areaConsole.scrollTop = areaConsole.scrollHeight;
}

function definirEntrada(texto) {
  entrada.value = texto;
  ajustarEntrada();
  entrada.focus();
  entrada.setSelectionRange(texto.length, texto.length);
}

async function enviarDoConsole() {
  const cmd = entrada.value;
  if (!cmd.trim()) {
    escrever('>', 'entrada');
    return;
  }
  enfileirar(async () => {
    await webR.objs.globalEnv.bind('.editor_cmd', cmd);
    const situacao = await webR.evalRString(
      'local({ c <- .editor_cmd; rm(.editor_cmd, envir = globalenv()); .editor_completo(c) })',
    );
    if (situacao === 'incompleto') {
      definirEntrada(`${cmd}\n`);   // continua na linha de baixo, com "+"
      return;
    }
    if (historico[historico.length - 1] !== cmd) historico.push(cmd);
    posHistorico = historico.length;
    definirEntrada('');
    await executar(cmd);
  });
}

// Tab: completa o nome que está sendo digitado, usando o próprio R
async function completar() {
  const pos = entrada.selectionStart;
  const antes = entrada.value.slice(0, pos);
  const linha = antes.slice(antes.lastIndexOf('\n') + 1);
  if (!linha.trim()) return;
  enfileirar(async () => {
    await webR.objs.globalEnv.bind('.editor_linha', linha);
    const [token, ...opcoes] = await webR.evalRRaw(
      'local({ l <- .editor_linha; rm(.editor_linha, envir = globalenv()); .editor_completar(l) })',
      'string[]',
    );
    if (opcoes.length === 0) return;
    // Parte comum a todas as opções (se houver só uma, é ela inteira)
    let comum = opcoes[0];
    for (const o of opcoes) while (!o.startsWith(comum)) comum = comum.slice(0, -1);
    if (comum.length > token.length) {
      const novo = entrada.value.slice(0, pos - token.length) + comum + entrada.value.slice(pos);
      entrada.value = novo;
      const cursor = pos - token.length + comum.length;
      entrada.setSelectionRange(cursor, cursor);
      ajustarEntrada();
    }
    if (opcoes.length > 1) {
      const lista = opcoes.slice(0, 60).join('   ') + (opcoes.length > 60 ? '   …' : '');
      escrever(lista, 'opcoes');
    }
  });
}

entrada.addEventListener('input', () => {
  navegando = false;
  ajustarEntrada();
});
entrada.addEventListener('keydown', (ev) => {
  const antes = entrada.value.slice(0, entrada.selectionStart);
  const depois = entrada.value.slice(entrada.selectionEnd);
  if (ev.key === 'Enter' && !ev.shiftKey) {
    ev.preventDefault();
    enviarDoConsole();
  } else if (ev.key === 'Tab') {
    ev.preventDefault();
    completar();
  } else if (ev.key === 'Escape' && !ocupado) {
    ev.preventDefault();
    definirEntrada('');
  } else if (ev.key === 'ArrowUp' && (navegando || !antes.includes('\n')) && posHistorico > 0) {
    ev.preventDefault();
    definirEntrada(historico[--posHistorico]);
    navegando = true;
  } else if (ev.key === 'ArrowDown' && (navegando || !depois.includes('\n')) && posHistorico < historico.length) {
    ev.preventDefault();
    posHistorico++;
    definirEntrada(historico[posHistorico] ?? '');
    navegando = true;
  }
});

// Clicar no console leva o cursor para a linha de comando (sem atrapalhar
// quem está selecionando texto para copiar ou clicando em um link)
areaConsole.addEventListener('click', (ev) => {
  if (ev.target.closest('a, button') || String(window.getSelection())) return;
  entrada.focus();
});

// ---------- History: tudo o que foi executado (editor e console) ----------

const listaHistorico = $('lista-historico');

function registrarHistorico(codigo) {
  const linhas = codigo.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#'));
  for (const l of linhas) {
    const li = document.createElement('li');
    li.textContent = l;
    li.title = 'Clique para levar ao console';
    listaHistorico.append(li);
  }
  while (listaHistorico.childElementCount > 500) listaHistorico.firstElementChild.remove();
  listaHistorico.parentElement.scrollTop = listaHistorico.parentElement.scrollHeight;
}

listaHistorico.addEventListener('click', (ev) => {
  const li = ev.target.closest('li');
  if (li) definirEntrada(li.textContent);
});
$('btn-hist-limpar').addEventListener('click', () => listaHistorico.replaceChildren());

// ---------- Packages ----------

async function atualizarPacotes() {
  const linhas = await webR.evalRRaw('.editor_pacotes()', 'string[]');
  $('lista-pacotes').replaceChildren(...linhas.map((l) => {
    const [nome, versao, carregado] = l.split('\t');
    const tr = document.createElement('tr');
    tr.classList.toggle('carregado', carregado === 'TRUE');
    tr.innerHTML = `<td><input type="checkbox" aria-label="Carregar ${esc(nome)}"
      ${carregado === 'TRUE' ? 'checked' : ''}></td><td>${esc(nome)}</td><td>${esc(versao)}</td>`;
    // Como no RStudio: marcar/desmarcar escreve o comando no console e o executa
    tr.querySelector('input').addEventListener('change', (ev) => {
      const cmd = ev.target.checked
        ? `library(${nome})`
        : `detach("package:${nome}", unload = TRUE)`;
      enfileirar(() => executar(cmd));
    });
    return tr;
  }));
}

$('btn-pac-instalar').addEventListener('click', () => {
  const nome = window.prompt('Nome do pacote a instalar (por exemplo, dplyr):')?.trim();
  if (!nome) return;
  if (!/^[A-Za-z][A-Za-z0-9.]*$/.test(nome)) {
    aviso('Nome de pacote inválido.');
    return;
  }
  enfileirar(() => executar(`install.packages("${nome}")`));
});

// ---------- Help: documentação do R dentro da aba ----------

const PACOTES_DO_R = ['base', 'compiler', 'datasets', 'graphics', 'grDevices', 'grid', 'methods',
  'parallel', 'splines', 'stats', 'stats4', 'tcltk', 'tools', 'utils'];

function enderecoRdrr(caminho) {
  const partes = caminho.split('/');
  const arquivo = partes.pop();
  const pacote = partes[partes.length - 2];
  return PACOTES_DO_R.includes(pacote)
    ? `https://rdrr.io/r/${pacote}/${arquivo}.html`
    : `https://rdrr.io/cran/${pacote}/man/${arquivo}.html`;
}

const ESTILO_AJUDA = `<style>
  body { font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.5; color: #1f2328;
         margin: 0.8rem 1rem; }
  h2 { font-size: 1.2rem; margin-top: 0.2rem; } h3 { font-size: 1rem; margin: 1.1rem 0 0.3rem; }
  pre, code { font-family: ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace; font-size: 0.9em; }
  pre { background: #f6f8fa; padding: 0.5rem 0.7rem; border-radius: 6px; overflow: auto; }
  table { border-collapse: collapse; } td { vertical-align: top; padding: 0.15rem 0.6rem 0.15rem 0; }
  a { color: #1a5fb4; } img, .katex-display { max-width: 100%; }
  table[width] { width: auto; } hr { display: none; }
</style>`;

function mostrarInicioAjuda() {
  $('ajuda-doc').hidden = true;
  $('ajuda-inicio').hidden = false;
  $('ajuda-externa').hidden = true;
  $('ajuda-titulo').textContent = 'Como usar o editor';
}

async function mostrarAjuda(topico, caminhos) {
  mostrarAba('ajuda');
  if (caminhos.length > 1) {
    // O mesmo nome existe em mais de um pacote (como filter, no dplyr e no stats)
    const itens = caminhos.map((c) => {
      const pacote = c.split('/').slice(-3)[0];
      return `<li><a href="#" data-caminho="${esc(c)}">${esc(topico)} {${esc(pacote)}}</a></li>`;
    }).join('');
    exibirDocumento(`<h2>Ajuda para “${esc(topico)}”</h2><p>Encontrada em mais de um pacote:</p>
      <ul>${itens}</ul>`, `Ajuda para ${topico}`, null);
    return;
  }
  const caminho = caminhos[0];
  try {
    await webR.objs.globalEnv.bind('.editor_caminho', caminho);
    const html = await webR.evalRString(
      'local({ c <- .editor_caminho; rm(.editor_caminho, envir = globalenv()); .editor_html_ajuda(c) })',
    );
    const titulo = (html.match(/<title>R: ([^<]*)<\/title>/) ?? [])[1] ?? topico;
    exibirDocumento(html, `${topico} {${caminho.split('/').slice(-3)[0]}}: ${titulo}`, caminho);
  } catch (e) {
    console.error(e);
    const url = enderecoRdrr(caminho);
    exibirDocumento(`<p>Não foi possível mostrar a documentação aqui.
      <a href="${esc(url)}" target="_blank" rel="noopener">Abrir no rdrr.io</a>.</p>`, topico, caminho);
  }
}

function exibirDocumento(html, titulo, caminho) {
  const doc = $('ajuda-doc');
  $('ajuda-inicio').hidden = true;
  doc.hidden = false;
  $('ajuda-titulo').textContent = titulo;
  const externa = $('ajuda-externa');
  externa.hidden = !caminho;
  if (caminho) externa.href = enderecoRdrr(caminho);
  // O documento fica isolado num iframe; os links são tratados aqui
  doc.srcdoc = html.includes('<head>') ? html.replace('<head>', `<head>${ESTILO_AJUDA}`)
    : `<!doctype html><html><head><meta charset="utf-8">${ESTILO_AJUDA}</head><body>${html}</body></html>`;
  doc.onload = () => {
    doc.contentDocument?.addEventListener('click', (ev) => {
      const a = ev.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (a.dataset.caminho) {                        // escolha entre pacotes
        ev.preventDefault();
        enfileirar(() => mostrarAjuda(a.textContent.split(' {')[0], [a.dataset.caminho]));
        return;
      }
      const m = href.match(/^\.\.\/\.\.\/([^/]+)\/(?:help|html)\/([^/#?]+?)(?:\.html)?(?:#.*)?$/);
      if (m) {                                        // link para outra função do R
        ev.preventDefault();
        enfileirar(() => abrirTopico(decodeURIComponent(m[2]), m[1]));
      } else if (/^https?:/.test(href)) {
        ev.preventDefault();
        window.open(href, '_blank', 'noopener');
      } else if (!href.startsWith('#')) {
        ev.preventDefault();                          // links internos sem destino aqui
      }
    });
  };
}

async function abrirTopico(topico, pacote) {
  await webR.objs.globalEnv.bind('.editor_topico', topico);
  await webR.objs.globalEnv.bind('.editor_pacote', pacote);
  const caminhos = await webR.evalRRaw(
    `local({ t <- .editor_topico; p <- .editor_pacote; rm(.editor_topico, .editor_pacote, envir = globalenv())
             r <- .editor_caminhos_ajuda(t, p); if (!length(r)) r <- .editor_caminhos_ajuda(t); r })`,
    'string[]',
  );
  if (caminhos.length) await mostrarAjuda(topico, caminhos);
}

$('btn-ajuda-inicio').addEventListener('click', mostrarInicioAjuda);

// ---------- Divisórias arrastáveis entre os painéis ----------

const area = document.querySelector('.area');
const CHAVE_TAMANHOS = 'editor-r-seed:tamanhos';
try {
  const salvos = JSON.parse(lerStorage(CHAVE_TAMANHOS) ?? '{}');
  for (const [prop, valor] of Object.entries(salvos)) area.style.setProperty(prop, valor);
} catch { /* tamanhos salvos inválidos: usa o padrão */ }

document.querySelectorAll('.divisoria').forEach((div) => {
  div.addEventListener('pointerdown', (ev) => {
    ev.preventDefault();
    const vertical = div.classList.contains('vertical');
    const alvo = vertical ? area : $(div.dataset.divide);
    const prop = vertical ? '--col-esq' : (div.dataset.divide === 'coluna-esq' ? '--lin-esq' : '--lin-dir');
    const caixa = alvo.getBoundingClientRect();
    div.setPointerCapture(ev.pointerId);
    div.classList.add('arrastando');
    document.body.classList.add('arrastando');
    const mover = (e) => {
      const frac = vertical ? (e.clientX - caixa.left) / caixa.width : (e.clientY - caixa.top) / caixa.height;
      area.style.setProperty(prop, `${Math.round(Math.min(0.85, Math.max(0.15, frac)) * 1000) / 10}%`);
      editor.refresh();
    };
    const soltar = () => {
      div.removeEventListener('pointermove', mover);
      div.classList.remove('arrastando');
      document.body.classList.remove('arrastando');
      const tamanhos = {};
      for (const p of ['--col-esq', '--lin-esq', '--lin-dir']) {
        const v = area.style.getPropertyValue(p);
        if (v) tamanhos[p] = v;
      }
      gravarStorage(CHAVE_TAMANHOS, JSON.stringify(tamanhos));
      if (graficos.length) mostrarGrafico(graficoAtual);
    };
    div.addEventListener('pointermove', mover);
    div.addEventListener('pointerup', soltar, { once: true });
  });
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') parar();
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'l') {
    ev.preventDefault();
    limparConsole();
  }
});

document.querySelectorAll('.abas [role="tab"]').forEach((b) => {
  b.addEventListener('click', () => mostrarAba(b.dataset.aba));
});

$('btn-graf-anterior').addEventListener('click', () => mostrarGrafico(graficoAtual - 1));
$('btn-graf-proximo').addEventListener('click', () => mostrarGrafico(graficoAtual + 1));
$('btn-graf-baixar').addEventListener('click', () => {
  graficos[graficoAtual]?.toBlob((b) => baixar(b, `grafico-${graficoAtual + 1}.png`));
});
$('btn-graf-limpar').addEventListener('click', () => {
  graficos.length = 0;
  mostrarGrafico(-1);
});

$('btn-obj-limpar').addEventListener('click', () => enfileirar(async () => {
  await webR.evalRVoid('rm(list = ls(globalenv()), envir = globalenv())');
  await atualizarObjetos();
}));

$('btn-enviar').addEventListener('click', () => $('arq-dados').click());
$('arq-dados').addEventListener('change', (ev) => {
  const arquivos = [...ev.target.files];
  ev.target.value = '';
  enfileirar(() => enviarArquivos(arquivos));
});

// ---------- Inicialização ----------

let versaoR = 'R pronto';

async function iniciar() {
  status('Carregando o R… (na primeira vez pode levar alguns segundos)', 'carregando');
  escreverHtml('Carregando o R no seu navegador…', 'sistema');
  try {
    const r = new WebR({ channelType: ChannelType.Automatic });
    await r.init();
    webR = r;
    lerSaidas();
    await webR.evalRVoid(await (await fetch('runner.R')).text());
    await carregarDadosExemplo();
    versaoR = await webR.evalRString('R.version.string');
    mostrarSaidaAvulsa = true;

    limparConsole();
    escreverHtml(`<strong>${esc(versaoR)}</strong> pronto. Coloque o cursor em uma linha do editor e aperte
      <kbd>Ctrl</kbd>+<kbd>Enter</kbd>, ou digite um comando aqui no console.`, 'sistema');
    if (!isolado) {
      escreverHtml('Modo compatível: o botão Parar não está disponível. Se um código travar, recarregue a página.', 'sistema');
    }
    status(versaoR, 'pronto');
    await atualizarPaineis();
  } catch (e) {
    console.error(e);
    status('Não foi possível carregar o R', 'falha');
    escrever(`Não foi possível carregar o R. Confira a conexão com a internet e recarregue a página.\nDetalhe: ${e.message ?? e}`, 'erro');
  }
}

fila = iniciar();
editor.focus();
