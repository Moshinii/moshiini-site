import { LegalArticle, type LegalDoc } from "@/pages/legal"

const PRIVACIDADE: LegalDoc = {
  etiqueta: "Privacidade",
  etiquetaVariant: "lilac",
  title: "Política de Privacidade",
  meta: ["Versão 1.0", "Última atualização: outubro de 2025", "LGPD — Lei nº 13.709/2018"],
  intro:
    "Esta política descreve como a Moshiini Automações coleta, usa e protege dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
  sections: [
    {
      heading: "Dados que coletamos",
      blocks: [
        { type: "p", text: "O bot coleta apenas o necessário para funcionar:" },
        {
          type: "ul",
          items: [
            "**Identificadores do Discord:** ID de usuário, ID do servidor, nome de usuário e apelido no servidor.",
            "**Dados da loja e das compras:** produtos, preços, estoque, histórico de compras (itens, valores e datas), gastos acumulados, cupons resgatados e avaliações por estrelas.",
            "**Contadores de participação:** quantidade de mensagens (para cupons e sorteios), convites rastreados e rankings.",
            "**Conteúdo de atendimento:** mensagens e anexos enviados em tickets de compra, suporte (modmail) e trocas, incluindo comprovantes de pagamento anexados pelo próprio usuário.",
            "**Dados de configuração da loja:** canais, cargos e a **chave PIX do lojista**, que é **criptografada antes de ser salva** (criptografia Fernet) e nunca é armazenada em texto puro.",
          ],
        },
        {
          type: "p",
          text: "Não coletamos: senha do Discord, token da conta, dados de cartão ou qualquer credencial bancária. Pagamentos PIX são feitos pelo seu próprio aplicativo de banco, diretamente para a chave da loja.",
        },
      ],
    },
    {
      heading: "Como usamos seus dados",
      blocks: [
        {
          type: "ul",
          items: [
            "Operar as compras: gerar cobranças PIX, abrir tickets e registrar entregas.",
            "Manter o seu histórico, sacola e cupons (/minha_loja).",
            "Calcular recompensas: cargos por gasto, contagem de mensagens, ranking de compradores e de convites.",
            "Prevenir fraudes e abusos: verificação anti-bot, honeypot, auditoria de tickets e validação de comprovantes.",
            "Gerar estatísticas de funcionamento do bot (ex.: /status_publico mostra apenas números agregados, sem identificar ninguém).",
          ],
        },
      ],
    },
    {
      heading: "Compartilhamento",
      blocks: [
        {
          type: "ul",
          items: [
            "**Não vendemos seus dados.** Nunca.",
            "**Equipe da loja:** o dono do servidor e os gerentes da loja têm acesso aos dados das vendas e tickets **daquele servidor** — são eles que confirmam pagamentos e entregam produtos.",
            "**Transcrições de tickets:** ao encerrar um ticket, o bot pode gerar uma transcrição em HTML com as mensagens e anexos. As imagens podem ser arquivadas em serviço externo de hospedagem de imagem ou em um canal do Discord, conforme a configuração escolhida pela própria loja. Links de anexos do Discord expiram em cerca de 24 horas; já as imagens hospedadas externamente podem ficar públicas — a equipe da loja é informada disso no painel de configuração.",
            "**Obrigação legal:** podemos compartilhar informações quando exigido por lei ou ordem de autoridade competente.",
          ],
        },
      ],
    },
    {
      heading: "Retenção e backups",
      blocks: [
        {
          type: "ul",
          items: [
            "Os dados ficam armazenados enquanto a loja estiver ativa. Lojas inativas por mais de 30 dias podem ser removidas na limpeza periódica.",
            "Mantemos **backups automáticos** (semanais por servidor e cópias diárias do banco, com retenção limitada). Quando você pede exclusão, os dados saem do banco ativo; as cópias em backup expiram automaticamente conforme a rotação (semanas), sem uso nesse período.",
          ],
        },
      ],
    },
    {
      heading: "Segurança",
      blocks: [
        {
          type: "ul",
          items: [
            "Chaves PIX criptografadas; relatórios de erro enviados ao administrador passam por **redação automática de segredos** (tokens e chaves são removidos antes do envio).",
            "Restringimos quem pode exportar ou restaurar dados financeiros (somente administradores do servidor).",
            "Nenhum sistema é 100% inviolável: em caso de incidente relevante de segurança, avisaremos pelos canais oficiais.",
          ],
        },
      ],
    },
    {
      heading: "Seus direitos (LGPD)",
      blocks: [
        { type: "p", text: "Você pode solicitar, a qualquer momento:" },
        {
          type: "ul",
          items: [
            "**acesso** aos seus dados (a maior parte já fica visível em /minha_loja);",
            "**correção** de dados incorretos;",
            "**exclusão** dos seus dados pessoais;",
            "**revogação** de consentimentos e informações sobre o uso dos seus dados.",
          ],
        },
        {
          type: "p",
          text: "Para exercer esses direitos, abra um ticket de suporte no servidor oficial (https://discord.gg/C5aP3HEujN) ou use o modmail (DM para o bot). Pedidos legítimos são atendidos em até 15 dias.",
        },
      ],
    },
    {
      heading: "Menores de idade",
      blocks: [
        {
          type: "p",
          text: "O bot opera dentro do Discord e segue a mesma regra da plataforma: o uso é destinado a maiores de 13 anos. Não coletamos intencionalmente dados de crianças abaixo dessa idade.",
        },
      ],
    },
    {
      heading: "Alterações desta política",
      blocks: [
        {
          type: "p",
          text: "Podemos atualizar esta política quando houver mudanças no serviço ou na legislação. A versão vigente estará sempre nesta página e alterações relevantes serão anunciadas no servidor oficial.",
        },
      ],
    },
    {
      heading: "Contato",
      blocks: [
        {
          type: "p",
          text: "Encarregado de dados e contato para assuntos de privacidade: abra um ticket no servidor oficial ou envie uma DM ao bot (modmail).",
        },
      ],
    },
  ],
}

export function PrivacidadePage() {
  return <LegalArticle doc={PRIVACIDADE} />
}
