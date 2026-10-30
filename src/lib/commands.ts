/* ============================================================
   FONTE ÚNICA DE DADOS DO BOT — espelha o catálogo real dos
   cogs (botvenda). Nenhuma página deve hardcodar contagem de
   comandos, limites, preço do Premium ou seções dos painéis:
   importe daqui.
   ============================================================ */

export type Tag = "TODOS" | "GERENTE+" | "DONO DO SERV" | "DONO DO BOT"

export type Command = {
  /** nome exato do slash command */
  name: string
  tag: Tag
  /** o que faz, em linguagem de quem usa */
  desc: string
  /** passos reais do fluxo, na ordem que aparecem no Discord */
  fluxo?: string[]
  /** exemplo de uso */
  exemplo?: string
  /** limites específicos do comando */
  nota?: string
}

export type CommandGroup = {
  id: string
  title: string
  intro: string
  commands: Command[]
  note?: string
}

/* ---------- grupos de comandos (8 categorias, 27 em produção) ---------- */

export const COMMAND_GROUPS: CommandGroup[] = [
  {
    id: "compras",
    title: "Compras e sua conta",
    intro: "Comandos que qualquer membro usa pra ver produtos, sacola, histórico e gastos.",
    commands: [
      {
        name: "/ajuda",
        tag: "TODOS",
        desc: "Central de Ajuda interativa: botões por categoria com todos os comandos e as tags de permissão.",
        fluxo: [
          "Mensagem só sua, com botões de categoria: Comprar, Gestão, Configurar, Cupons, Convites, Segurança e Bot",
          "Cada botão troca o conteúdo da mesma mensagem com os comandos daquela categoria",
        ],
        exemplo: "/ajuda → toca em “Comprar”",
      },
      {
        name: "/minha_loja",
        tag: "TODOS",
        desc: "Seu hub pessoal da loja, com 4 atalhos em botões.",
        fluxo: [
          "Ver Minha Sacola: edita quantidade, remove item e aplica cupom (menu ou botão Aplicar Código)",
          "Finalizar Compra: se a loja tem Termos, aparece o aceite antes do campo de entrega",
          "Meu Histórico, Meu Gasto Total e Meus Cupons abrem o seu registro de compras",
        ],
        exemplo: "/minha_loja → Ver Minha Sacola → Finalizar Compra",
      },
      {
        name: "/loja top",
        tag: "TODOS",
        desc: "Ranking público dos maiores compradores do servidor, com 1º, 2º e 3º em destaque.",
        exemplo: "/loja top limite: 15",
        nota: "Lista de 1 a 20 pessoas (padrão: 10).",
      },
      {
        name: "/loja meugasto",
        tag: "TODOS",
        desc: "Mostra quanto você já gastou e quanto falta pro próximo cargo de recompensa.",
        exemplo: "“faltam R$ 50 pro cargo Comprador”",
      },
      {
        name: "/loja robux calcular_robux",
        tag: "TODOS",
        desc: "Calculadora de Robux: simula o preço com o valor por milhar da loja, nos dois cenários de uma vez.",
        fluxo: [
          "Você informa a quantidade de Robux",
          "O bot responde com os dois cenários: “Criando item de X Robux” (com taxa de 30% do Roblox) e “Para receber X líquidos”",
        ],
        exemplo: "informe 1000 Robux → vê o preço dos dois jeitos",
        nota: "Precisa existir o produto “Robux” cadastrado na loja.",
      },
    ],
  },
  {
    id: "cupons-sorteios",
    title: "Cupons e sorteios",
    intro: "Suas mensagens viram moeda: contam pra roleta de cupons e pra requisito de sorteios.",
    commands: [
      {
        name: "/cupom resgatar",
        tag: "TODOS",
        desc: "Roleta de cupons: gasta mensagens acumuladas pra tentar a sorte e ganhar um cupom aleatório.",
        fluxo: [
          "O bot confere seu saldo de mensagens",
          "Sorteia entre os cupons ativos da loja por raridade (peso)",
          "Chega o cupom com o novo saldo — se algo falhar, as mensagens voltam",
        ],
        nota: "Cada giro custa 20 mensagens. Cupons ativos de sorteio são definidos pela loja.",
      },
      {
        name: "/cupom meuscupons",
        tag: "TODOS",
        desc: "Lista seus cupons disponíveis — os mesmos que aparecem na sacola na hora de pagar.",
        exemplo: "/cupom meuscupons → “BEMVINDO10 · 10%”",
      },
      {
        name: "/sorteio minhasmensagens",
        tag: "TODOS",
        desc: "Seu saldo de mensagens, usado pra entrar em sorteios com requisito e pra girar a roleta.",
        nota: "Pra participar de um sorteio, usa o botão “Participar” na mensagem do sorteio — pode exigir mensagens e/ou um cargo.",
      },
    ],
  },
  {
    id: "convites",
    title: "Convites com recompensa",
    intro: "Um convite ativo por ciclo: crie, divulgue, bata a meta e resgate.",
    commands: [
      {
        name: "/convite criar",
        tag: "TODOS",
        desc: "Cria seu convite rastreado (link permanente) e inicia um ciclo de recompensa.",
        fluxo: [
          "O bot valida se o sistema de convites está ativo na loja",
          "Gera seu link e mostra a meta e a recompensa",
        ],
        nota: "1 convite = 1 ciclo: só pode criar outro depois de resgatar a recompensa do atual.",
      },
      {
        name: "/convite status",
        tag: "TODOS",
        desc: "Recupera o link do seu convite ativo e o progresso do ciclo.",
        exemplo: "“3/5 convites · Meta batida!”",
      },
      {
        name: "/convite resgatar",
        tag: "TODOS",
        desc: "Ao bater a meta, abre um ticket com a staff pra receber a recompensa (com cargo automático, se configurado).",
        nota: "Resgate atômico: só o primeiro clique vale. O ciclo encerra e você já pode criar um novo convite.",
      },
      {
        name: "/convite ranking",
        tag: "TODOS",
        desc: "Top 10 convidadores do servidor, com medalhas.",
      },
    ],
    note: "Fluxo: /convite criar → compartilhe o link → cada entrada soma no contador → bateu a meta, /convite resgatar abre o ticket e o ciclo encerra (aí já pode criar outro).",
  },
  {
    id: "trocas",
    title: "Trocas com middleman",
    intro: "Troca segura entre membros, com ticket privado e recibo assinado digitalmente pelo bot.",
    commands: [
      {
        name: "/trocar enviar",
        tag: "TODOS",
        desc: "Convida alguém pra uma troca mediada pelo bot (middleman).",
        fluxo: [
          "A pessoa recebe uma DM explicando o MM e o comando pra aceitar",
          "Você recebe a confirmação do envio",
        ],
        exemplo: "/trocar enviar → escolhe a pessoa",
        nota: "O convite expira em 15 minutos. Até 3 convites pendentes por pessoa e 1 ticket MM ativo cada. Funciona no servidor principal do bot.",
      },
      {
        name: "/trocar aceitar",
        tag: "TODOS",
        desc: "Aceita um convite pendente e abre o ticket privado com os dois dentro.",
        fluxo: [
          "O ticket nasce com os dois participantes (quem convidou pode moderar o canal)",
          "Concluir Troca: precisa da confirmação dos dois → recibo HTML assinado chega por DM pra cada um e a assinatura é publicada nos logs",
          "Cancelar: fecha o ticket sem recibo de troca",
        ],
      },
      {
        name: "/trocar verificar",
        tag: "TODOS",
        desc: "Confere se um recibo de troca é autêntico e não foi alterado.",
        fluxo: [
          "Anexe o arquivo .html do recibo",
          "O bot confere a assinatura digital e compara com a cópia publicada nos logs",
          "Responde com os dados da troca e o veredito: válida ou suspeita de falsificação",
        ],
      },
    ],
    note: "Guarde o recibo: ele é a prova da troca. O bot compara sempre com a assinatura publicada nos logs do servidor — recibo editado não passa.",
  },
  {
    id: "geral",
    title: "Status e sugestões",
    intro: "Transparência do bot e canal direto com quem desenvolve.",
    commands: [
      {
        name: "/status_publico",
        tag: "TODOS",
        desc: "Resumo público do bot: servidores, membros, lojas, vendas totais, produtos ativos e tempo online.",
        nota: "Só números agregados, sem dados de receita — atualiza a cada 5 minutos.",
      },
      {
        name: "/sugestao",
        tag: "TODOS",
        desc: "Envia sua sugestão direto pra DM do dono do bot.",
        exemplo: "“adiciona pagamento via cartão”",
        nota: "1 envio a cada 24 horas. O dono recebe com um botão de bloquear anexado, pra cortar abuso na hora.",
      },
    ],
  },
  {
    id: "paineis",
    title: "Painéis de gestão",
    intro: "Os pontos de entrada da gestão. Todo o resto é botão, menu e modal dentro do painel.",
    commands: [
      {
        name: "/painel_admin abrir",
        tag: "GERENTE+",
        desc: "Abre a Central de Administração na forma efêmera (só você vê), com menu de 12 seções.",
        fluxo: [
          "Escolhe a seção no menu suspenso: Produtos & Estoque, Painéis de Venda, Configuração, Verificação, Cargos, Backup de Imagens, Cupons, Sorteios & Convites, Segurança, Manutenção, Parcerias e Mensagens",
          "Toda tela edita a mesma mensagem, sempre com botão Voltar",
        ],
        exemplo: "/painel_admin abrir → toca em “Produtos”",
        nota: "No Discord, o comando só aparece no seletor de quem tem Gerenciar Servidor (ou é gerente da loja).",
      },
      {
        name: "/painel_admin fixo",
        tag: "GERENTE+",
        desc: "Posta a Central fixa num canal. Os botões continuam funcionando depois de reinícios do bot e nunca expiram.",
        exemplo: "/painel_admin fixo → escolhe #gestão",
      },
      {
        name: "/painel_dono abrir",
        tag: "DONO DO BOT",
        desc: "Abre o Painel Exclusivo do dono da Moshiini, com 6 seções separadas da equipe da loja. Gerentes e admins de loja nem veem que existe.",
      },
    ],
  },
  {
    id: "planos",
    title: "Planos da loja",
    intro: "Só o dono do servidor ativa a loja e mexe na licença.",
    commands: [
      {
        name: "/loja vincular",
        tag: "DONO DO SERV",
        desc: "Ativa a loja de graça, no plano Gratuito, sem taxa.",
        fluxo: [
          "Confirma a ativação (confirmação chega por DM)",
          "O Assistente de Setup abre na sequência: checklist com canais, PIX, produtos e painéis",
        ],
        nota: "Depois da 1ª ativação, só o dono da loja vinculada pode (re)vincular — o dono do servidor não assume a loja de outro.",
      },
      {
        name: "/loja plano",
        tag: "DONO DO SERV",
        desc: "Mostra o plano atual, o uso dos limites e o vencimento da licença.",
        exemplo: "“3/5 produtos, 1/2 painéis”",
        nota: "Se existir fatura antiga do modelo de comissão, traz o botão “Já Paguei” pra quitação com auditoria.",
      },
      {
        name: "/loja mudardeplano",
        tag: "DONO DO SERV",
        desc: "Compra ou renova a licença Premium (R$ 0,50/dia): criação ilimitada + recursos de IA.",
        fluxo: [
          "Informa quantos dias no modal (já com licença ativa, pergunta “Estender Assinatura?”)",
          "Recebe o PIX (QR Code e copia-e-cola) na DM",
          "O pagamento é conferido e a licença ativa na hora",
        ],
        exemplo: "30 dias · R$ 15,00 → comprovante → ativada em segundos",
      },
    ],
    note: "Fora dos comandos: no plano Premium, o dono menciona o bot (@Moshiini) e edita a loja escrevendo em português — preço, estoque, status, renomear, descrição e painéis. Perguntas sobre a loja também funcionam.",
  },
  {
    id: "dono-do-bot",
    title: "Administração do bot",
    intro: "Ferramentas do dono da Moshiini: bloqueios de suporte e sugestões.",
    commands: [
      {
        name: "/modmail_admin bloquear",
        tag: "DONO DO BOT",
        desc: "Impede um usuário de abrir tickets de modmail.",
        exemplo: "menu com autocomplete (aceita colar ID)",
      },
      {
        name: "/modmail_admin desbloquear",
        tag: "DONO DO BOT",
        desc: "Libera os tickets de modmail do usuário.",
      },
      {
        name: "/sugestao_admin bloquear",
        tag: "DONO DO BOT",
        desc: "Impede um usuário de enviar sugestões.",
      },
      {
        name: "/sugestao_admin desbloquear",
        tag: "DONO DO BOT",
        desc: "Libera as sugestões do usuário.",
      },
    ],
    note: "Cirúrgico e rápido: o dia a dia dessas áreas fica no /painel_dono. Existe ainda o /testar_bot, que só carrega em ambiente de testes e nunca em produção.",
  },
]

/** Total de comandos em produção (calculado — nunca hardcode). */
export const TOTAL_COMANDOS = COMMAND_GROUPS.reduce(
  (total, group) => total + group.commands.length,
  0
)

/* ---------- tags de permissão (aparecem na descrição dentro do Discord) ---------- */

export const TAGS: Record<
  Tag,
  { label: string; desc: string }
> = {
  TODOS: { label: "Todos", desc: "Qualquer membro do servidor pode usar." },
  "GERENTE+": {
    label: "Gerente+",
    desc: "Dono do servidor, admins ou gerentes da loja (nível 1+).",
  },
  "DONO DO SERV": { label: "Dono do servidor", desc: "Somente o dono do servidor." },
  "DONO DO BOT": { label: "Dono do bot", desc: "Somente o dono da Moshiini." },
}

/* ---------- seções reais da Central de Administração (12) ---------- */

export const CENTRAL_SECTIONS: { name: string; desc: string }[] = [
  {
    name: "Produtos & Estoque",
    desc: "Adicionar em formulário de 2 partes (preço, estoque, tipo moeda/item único/mensalidade, descrição, imagem, emoji, cargo de acesso), editar, listar, detalhes, ativar/desativar, excluir, limiar de estoque com aviso — e ✨ Criar com IA.",
  },
  {
    name: "Painéis de Venda",
    desc: "Criar painel (título, descrição, banner, thumbnail e cor), postar e sincronizar com prévia antes de publicar, dar nome, emoji e descrição próprios a cada opção e excluir.",
  },
  {
    name: "Configuração da Loja",
    desc: "Canais de log/provas/carrinho/tickets, chave PIX criptografada antes de salvar, campo de entrega do checkout, experiência do cliente, termos com aceite, auto-close do carrinho e Assistente de Setup.",
  },
  {
    name: "Verificação de Membros",
    desc: "Canal e cargo da verificação com captcha por DM, postagem do painel com botão “Verificar” e tempo de kick (0 desativa).",
  },
  {
    name: "Cargos & Auxiliares",
    desc: "Cargo de suporte que vê os tickets, canais ignorados na contagem de mensagens e recompensas por gasto (“cargo X ao gastar R$ Y”).",
  },
  {
    name: "Backup de Imagens",
    desc: "Destino das imagens de transcrições e provas: site, canal do Discord ou ambos — com teste de envio e resetar pro padrão.",
  },
  {
    name: "Cupons",
    desc: "Cupom de sorteio (desconto, peso de raridade, quantidade mínima, produto vinculado, mostrar no painel, auto-aplicar) e código público com usos máximos — com lista pra excluir ou desativar.",
  },
  {
    name: "Sorteios & Convites",
    desc: "Criar sorteio (duração de 30 min a 2 dias, prêmio, 1 a 50 vencedores, mensagens exigidas), gerenciar (cancelar/reroll/excluir), configurar convites (meta, recompensa, cargo) e desativar.",
  },
  {
    name: "Segurança & Honeypot",
    desc: "Ativar o canal-armadilha (ban temporário, padrão 7 dias, com desban automático), desativar, ver status e desbanir usuário.",
  },
  {
    name: "Manutenção & Relatórios",
    desc: "Relatório CSV (últimos 7/30 dias, este mês ou o passado), diagnóstico da loja, backup JSON no canal de logs e restauração com validação — backup e restaurar pedem administrador.",
  },
  {
    name: "Parcerias",
    desc: "Rede de divulgação entre lojas inscritas: escolhe o canal, monta o anúncio em 2 partes (com moderação por IA e prévia), ativa/desativa e acompanha status com strikes por anúncio apagado.",
  },
  {
    name: "Mensagens",
    desc: "Assistente de embed em 4 passos: escrever, cor e rodapé, preview e envio no canal que escolher.",
  },
]

/* ---------- seções reais do Painel Exclusivo do Dono (6) ---------- */

export const OWNER_SECTIONS: { name: string; desc: string }[] = [
  {
    name: "Licenças & Equipe",
    desc: "Gerar cobrança via PIX, gerentes de loja por servidor, bloquear/desbloquear loja, definir e verificar licença, remover assinatura e avisar geral (info, atenção ou urgente, pra todos, donos ou lojistas).",
  },
  {
    name: "Modmail",
    desc: "Definir a categoria dos tickets de suporte, iniciar DM com um usuário, bloquear e desbloquear modmail por menu ou ID.",
  },
  {
    name: "Ações Globais",
    desc: "Limpar lojas inativas há 30+ dias, remover um cargo de todos os membros, notificar todos por DM e ver o status global (infra, vendas, top servidores).",
  },
  {
    name: "Modelo & API da IA",
    desc: "Trocar o modelo da IA sem reiniciar o bot: presets prontos ou ID livre, URL e chave da API e restaurar o padrão.",
  },
  {
    name: "Logs de Operação",
    desc: "Escolhe o servidor e liga/desliga as categorias do log do dono, com atalhos de ligar/desligar tudo.",
  },
  {
    name: "Ficha de Servidor",
    desc: "Ficha completa de um servidor (membros, loja, tickets, configurações) com exportar HTML, tickets em ZIP e trocar de servidor.",
  },
]

/** “Sincronizar Comandos” é botão do hub (Central e Painel do Dono), não seção. */
export const PANELS_NOTE =
  "O botão “Sincronizar Comandos” fica no hub dos dois painéis — reenvia a lista de comandos ao Discord quando um comando novo demora a aparecer. Só o dono do bot consegue executar."

/* ---------- limites e cooldowns reais do bot ---------- */

export const LIMITS: { value: string; label: string; desc: string }[] = [
  {
    value: "20 mensagens",
    label: "Por giro da roleta",
    desc: "É o custo de cada /cupom resgatar — o saldo vem das suas mensagens no servidor.",
  },
  {
    value: "1 a cada 24 h",
    label: "Sugestões",
    desc: "O /sugestao aceita uma sugestão por dia, direto na DM do dono do bot.",
  },
  {
    value: "15 min",
    label: "Convite de troca",
    desc: "Validade do convite do middleman — e até 3 convites pendentes por pessoa.",
  },
  {
    value: "5 min",
    label: "Reabrir modmail",
    desc: "Intervalo mínimo entre abrir um ticket de suporte e outro pela DM do bot.",
  },
  {
    value: "3 tentativas",
    label: "Captcha de verificação",
    desc: "Errou 3 vezes? 5 minutos de espera antes de tentar de novo.",
  },
  {
    value: "25 h",
    label: "Kick sem verificar",
    desc: "Tempo padrão pra levar kick sem verificar — cada loja configura o seu (0 desativa).",
  },
  {
    value: "7 dias",
    label: "Ban do honeypot",
    desc: "Quem fala no canal-armadilha leva ban temporário, com desbanimento automático.",
  },
  {
    value: "2 análises",
    label: "Comprovante por ticket",
    desc: "A IA lê até 2 comprovantes por canal, com 60 s de intervalo (imagem até 5 MB, PDF até 8 MB).",
  },
  {
    value: "3–6 h",
    label: "Anúncios de parceria",
    desc: "Intervalo da rede de parcerias no plano Gratuito — 2–4 h no Premium.",
  },
  {
    value: "3 por dia",
    label: "Criar loja com IA (Grátis)",
    desc: "Gerações diárias do rascunho com IA — 10 por dia no Premium. Zera à meia-noite.",
  },
]

/* ---------- planos (fonte única pra home, faq e docs) ---------- */

export const PLAN = {
  free: {
    nome: "Gratuito",
    preco: "R$ 0",
    precoNota: "para sempre, sem taxa",
    features: [
      "Painéis de venda ilimitados de visualização, com carrinho e PIX",
      "5 produtos ativos e 2 painéis ativos",
      "Tickets de entrega, avaliação por estrelas e ranking",
      "Cupons, sorteios e convites com recompensa",
      "Verificação com captcha e honeypot anti-hack",
      "3 gerações de loja com IA por dia",
    ],
  },
  premium: {
    nome: "Premium",
    preco: "R$ 0,50",
    precoNota: "por dia — pague quantos dias quiser",
    features: [
      "Criação ilimitada: produtos e painéis sem limite",
      "IA confere o comprovante do PIX e confirma o pagamento sozinha",
      "Criar loja com IA: 10 gerações por dia",
      "Editar a loja mencionando o bot (@Moshiini) e escrevendo em português",
      "Anúncios de parceria mais frequentes (2–4 h)",
      "Excedente do Grátis reativa sozinho ao renovar — nada é apagado",
    ],
  },
}

/* ---------- fluxo real de compra (home / como-funciona) ---------- */

export const BUY_FLOW: { title: string; desc: string }[] = [
  {
    title: "Acha o produto no painel",
    desc: "No painel de vendas, escolhe o produto no menu suspenso e decide: comprar direto ou calcular entre R$ e quantidade.",
  },
  {
    title: "Monta a sacola",
    desc: "Informa a quantidade (aceita 1000, 1.000 e 1,000), ajusta itens, aplica cupom e confere o total.",
  },
  {
    title: "Finaliza a compra",
    desc: "Se a loja tem Termos, aceita com um botão; depois preenche o campo de entrega (nick ou ID) que o dono configurou.",
  },
  {
    title: "Paga no ticket privado",
    desc: "O ticket abre com o resumo do pedido, QR Code PIX, copia-e-cola e o identificador do pedido (TXID). Você anexa o comprovante.",
  },
  {
    title: "Recebe e avalia",
    desc: "No Premium a IA confere o comprovante e confirma sozinha; a staff entrega e publica as provas. Você avalia com estrelas — e pode cancelar antes da entrega, com reembolso do estoque e do cupom.",
  },
]
