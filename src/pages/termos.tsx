import { LegalArticle, type LegalDoc } from "@/pages/legal"

const TERMOS: LegalDoc = {
  etiqueta: "Termos de uso",
  etiquetaVariant: "amber",
  title: "Termos de Uso",
  meta: ["Versão 1.0", "Última atualização: outubro de 2025"],
  intro:
    "Ao adicionar o bot **Moshiini** a um servidor, criar uma loja, comprar em uma loja que use o bot ou contratar a licença Premium, você concorda com estes Termos de Uso. Leia com atenção antes de usar.",
  sections: [
    {
      heading: "O serviço",
      blocks: [
        {
          type: "p",
          text: "A Moshiini Automações é uma **ferramenta (bot) para Discord** que permite a donos de servidores operar lojas virtuais próprias, com painéis de produtos, carrinho, cobrança via PIX, tickets de entrega, cupons, sorteios, convites e demais automações.",
        },
        {
          type: "p",
          text: "A Moshiini **não é uma loja**. Nós fornecemos a tecnologia; **cada servidor opera sua própria loja de forma independente**, com seus próprios produtos, preços, regras e chave PIX.",
        },
      ],
    },
    {
      heading: "Lojas, produtos e vendedores",
      blocks: [
        {
          type: "ul",
          items: [
            "Os produtos, serviços, itens digitais ou contas vendidos por meio do bot pertencem **exclusivamente aos donos dos servidores (lojistas)** que os cadastraram.",
            "A Moshiini **não vende, não fornece, não verifica e não garante** nenhum produto anunciado pelas lojas. Não validamos origem, propriedade, qualidade, legalidade ou prazo de entrega dos itens.",
            "Toda negociação, pagamento e entrega acontece **diretamente entre o comprador e o lojista**. Qualquer problema com um pedido (produto não entregue, item diferente do anunciado, conta que parou de funcionar etc.) deve ser resolvido com a loja onde a compra foi feita, pelo ticket de suporte da própria loja.",
            "A Moshiini **não se responsabiliza** por prejuízos decorrentes de compras feitas em lojas de terceiros que utilizam o bot.",
          ],
        },
      ],
    },
    {
      heading: "Golpes e fraudes entre usuários",
      blocks: [
        {
          type: "ul",
          items: [
            "A Moshiini **não se responsabiliza por golpes, fraudes ou furtos** praticados por usuários, lojistas ou terceiros dentro ou fora do Discord, ainda que a negociação tenha começado em um servidor que usa o bot.",
            "O sistema de trocas (/trocar) com recibo assinado digitalmente e os tickets oficiais existem para **reduzir** riscos — não eliminam a possibilidade de fraude.",
            "Proteja-se: só pague pelo **QR Code gerado dentro do ticket oficial da loja**, desconfie de qualquer pessoa que peça pagamento por DM fora do fluxo do bot, confirme a identidade da staff e nunca compartilhe senha, token ou código de verificação da sua conta.",
            "A equipe da Moshiini **nunca** pede senha, token ou códigos da sua conta do Discord por mensagem direta.",
          ],
        },
      ],
    },
    {
      heading: "Conta do Discord, bans e punições",
      blocks: [
        {
          type: "ul",
          items: [
            "O Discord é uma plataforma de terceiros, com regras próprias (Termos de Serviço e Diretrizes da Comunidade). A Moshiini **não tem controle** sobre decisões do Discord e **não se responsabiliza** por advertências, suspensões ou banimentos de contas de usuários ou de servidores inteiros aplicados pelo Discord — incluindo casos relacionados ao conteúdo vendido pelas lojas.",
            "O sistema de segurança **honeypot** e as verificações anti-bot são configurados por cada loja. Banimentos aplicados por esses sistemas são **decisão e responsabilidade da administração do servidor**, que também é responsável por revisões e desbanimentos.",
            "Usar o bot não garante imunidade a punições: se uma loja vender conteúdo que viole as regras do Discord (ex.: itens obtidos ilegalmente, conteúdo proibido), as consequências são do lojista e de quem participa da negociação.",
          ],
        },
      ],
    },
    {
      heading: "Pagamentos e licença Premium",
      blocks: [
        {
          type: "ul",
          items: [
            "Os pagamentos PIX das compras vão **diretamente para a chave PIX cadastrada pela loja**. A Moshiini não recebe, não custodia e não intermedia os valores das vendas — por isso **não é possível solicitar estorno ou reembolso de compras à Moshiini**; o assunto é entre comprador e lojista.",
            "A **licença Premium** (R$ 0,50/dia) é o único valor pago à Moshiini e é ativada após a confirmação do pagamento. Períodos já decorridos não são reembolsáveis. Lojas com a licença expirada mantêm as vendas ativas dentro dos limites do plano Gratuito, sem perda de dados.",
            "Comprovantes falsificados, tentativas de burlar cobrança ou abuso do sistema de licenças podem resultar em **suspensão da loja**.",
          ],
        },
      ],
    },
    {
      heading: "Conduta e uso proibido",
      blocks: [
        { type: "p", text: "É proibido usar o bot para:" },
        {
          type: "ul",
          items: [
            "vender produtos ilegais, obtidos por fraude, ou que violem os Termos de Serviço e as Diretrizes da Comunidade do Discord;",
            "praticar fraude, lavagem de dinheiro ou qualquer crime previsto em lei;",
            "explorar falhas do bot, manipular estoques, cupons, sorteios ou o sistema de convites;",
            "sobrecarregar o serviço intencionalmente (spam de comandos, abuso de automações).",
          ],
        },
        {
          type: "p",
          text: "A Moshiini pode **suspender ou bloquear** lojas e usuários que violem estas regras, sem aviso prévio, mantendo os registros necessários para auditoria.",
        },
      ],
    },
    {
      heading: "Disponibilidade e dados",
      blocks: [
        {
          type: "ul",
          items: [
            'O serviço é fornecido **"como está"**. Fazemos backups automáticos e monitoramento, mas **não garantimos** disponibilidade ininterrupta nem a impossibilidade de perda de dados em falhas graves.',
            "Estatísticas, rankings e contadores (mensagens, gastos, convites) são recursos de engajamento — não possuem valor monetário e podem ser zerados em caso de erro, restauração de backup ou decisão da loja.",
          ],
        },
      ],
    },
    {
      heading: "Alterações destes termos",
      blocks: [
        {
          type: "p",
          text: "Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível nesta página, e mudanças relevantes serão anunciadas no servidor oficial: https://discord.gg/C5aP3HEujN. O uso continuado do bot após uma atualização significa concordância com a nova versão.",
        },
      ],
    },
    {
      heading: "Contato",
      blocks: [
        {
          type: "p",
          text: "Dúvidas, denúncias ou solicitações comerciais: abra um ticket de suporte no servidor oficial ou envie uma sugestão pelo comando /sugestao.",
        },
      ],
    },
  ],
}

export function TermosPage() {
  return <LegalArticle doc={TERMOS} />
}
