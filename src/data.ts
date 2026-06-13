import { Product, Category, StoreInfo } from "./types";

/*
  =========================================
  1. INFORMAÇÕES DA LOJA (EDITÁVEL MANUALMENTE)
  =========================================
  Altere aqui os principais dados da loja, como nome, telefone,
  Instagram, endereço, horário de atendimento e dados do PIX.
*/
export const storeInfo: StoreInfo = {
  name: "Café & Bistrô",
  whatsappDisplay: "(81) 98617-5422",
  whatsappNumber: "5581986175422", // WhatsApp oficial para onde serão enviadas as mensagens do pedido
  instagramUser: "@cafeebistro2024",
  instagramUrl: "https://www.instagram.com/cafeebistro2024",
  address: "Avenida Prof. Artur de Sá, Nº 5",
  openingHour: 7, // Horário de abertura (formato 24h)
  closingHour: 16, // Horário de fechamento (formato 24h)
  openingText: "Segunda a Sábado: 7:00 às 16:00",
  deliveryInfo: "99 Food — Café & Bistrô",
  deliveryFee: 7.00, // Taxa de entrega fixa
  paymentInfo: "Aceitamos Pix, Cartão e Dinheiro",
  paymentOptions: ["Pix", "Cartão", "Dinheiro"],
  pix: "CNPJ: 12.345.678/0001-90" // Chave PIX da loja
};

/*
  =========================================
  2. CATEGORIAS DO CARDÁPIO
  =========================================
  Para criar novas categorias ou remover existentes, edite esta lista.
*/
export const categories: Category[] = [
  {
    id: "todos",
    name: "Todos",
    shortName: "Todos",
    description: "Todos os produtos do cardápio.",
    visible: true,
    order: 1
  },
  {
    id: "cafe-da-manha",
    name: "Café da Manhã",
    shortName: "Café da Manhã",
    description: "Opções deliciosas para começar bem o seu dia.",
    visible: true,
    order: 2
  },
  {
    id: "almoco",
    name: "Almoço",
    shortName: "Almoço",
    description: "Saborosos pratos e grelhados preparados na hora.",
    visible: true,
    order: 3
  },
  {
    id: "carnes-nobres-almoco",
    name: "Carnes Nobres do Almoço",
    shortName: "Carnes Nobres",
    description: "Cortes selecionados e carnes nobres grelhadas na hora.",
    visible: true,
    order: 3.5
  },
  {
    id: "lanches",
    name: "Lanches",
    shortName: "Lanches",
    description: "Lanches rápidos, saborosos e quentinhos.",
    visible: true,
    order: 4
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    shortName: "Sobremesas",
    description: "Doces irresistíveis e sobremesas maravilhosas.",
    visible: true,
    order: 5
  },
  {
    id: "bebidas",
    name: "Bebidas",
    shortName: "Bebidas",
    description: "Sucos naturais refrescantes e cafés de alta qualidade.",
    visible: true,
    order: 6
  },
  {
    id: "refrigerantes-e-aguas",
    name: "Refrigerantes e Águas",
    shortName: "Refri & Água",
    description: "Refrigerantes de diversos tamanhos, Skinka, H2O e águas.",
    visible: true,
    order: 7
  }
];

// Campo de observação padrão para todos os produtos
const defaultObservationField = {
  id: "observacao-pedido",
  label: "Observação do pedido",
  type: "text" as const,
  placeholder: "Ex: sem cebola, sem gelo, bem passado, pouco açúcar..."
};

/*
  =========================================
  3. PRODUTOS DO SISTEMA (EDITÁVEL MANUALMENTE)
  =========================================
  Aqui você pode adicionar, remover ou editar todos os produtos:
  - id: Identificador único em minúsculas (sem espaços)
  - name: Nome visível do produto
  - category: Categoria à qual pertence (use o "id" das categorias acima)
  - description: Descrição curta do produto
  - price: Preço como número (ex: 15.99) ou null para indicar "Preço a confirmar"
  - emoji: Um emoji que combine com o produto
  - image: Caminho da imagem (ex: /src/assets/images/... ou URL da web)
  - available: true/false (disponível ou esgotado)
  - featured: true/false (destacado na página inicial ou não)
  - order: Ordem de exibição dentro do cardápio
  - variants: Sabores especiais ou tamanhos configuráveis (preços mudam)
  - addons: Itens adicionais opcionais pagos
  - customFields: Perguntas para o cliente (ex: Sabor do suco, ponto da carne)
*/
export const products: Product[] = [
  // -----------------------------------------
  // CATEGORIA: CAFÉ DA MANHÃ (cafe-da-manha)
  // -----------------------------------------
  {
    id: "macaxeira",
    name: "Macaxeira",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🍠",
    image: "https://i.ibb.co/WNfRyT2S/macaxeira.png",
    available: true,
    featured: true,
    order: 1,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "inhame",
    name: "Inhame",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🥔",
    image: "https://i.ibb.co/kV4cnt0J/inhame.png",
    available: true,
    featured: true,
    order: 2,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "cuscuz",
    name: "Cuscuz",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🌽",
    image: "https://i.ibb.co/KzqCRK0t/cuscuz.png",
    available: true,
    featured: true,
    order: 3,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "charque",
    name: "Charque",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🍖",
    image: "https://i.ibb.co/27mC6SMV/charuqe.png",
    available: true,
    featured: false,
    order: 4,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "queijo-coalho",
    name: "Queijo coalho",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🧀",
    image: "https://i.ibb.co/Z1f6pRBv/queijo-coalho.png",
    available: true,
    featured: false,
    order: 5,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "calabresa",
    name: "Calabresa",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🌭",
    image: "https://i.ibb.co/jZjHhBGV/calabresa.png",
    available: true,
    featured: false,
    order: 6,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "guisado-galinha",
    name: "Guisado / Galinha",
    category: "cafe-da-manha",
    description: "Opção de café da manhã da casa.",
    price: 17.99,
    emoji: "🍲",
    image: "https://i.ibb.co/zdrQ6xM/guisado.png",
    available: true,
    featured: false,
    order: 7,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },

  // -----------------------------------------
  // CATEGORIA: ALMOÇO (almoco)
  // -----------------------------------------
  {
    id: "peito-de-frango",
    name: "Peito de frango",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🍗",
    image: "https://i.ibb.co/wN2VxWbL/frango.png",
    available: true,
    featured: true,
    order: 8,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "figado-ao-molho",
    name: "Fígado ao molho",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/m51W0xfQ/figado.png",
    available: true,
    featured: true,
    order: 9,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "charque-almoco",
    name: "Charque",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🍖",
    image: "https://i.ibb.co/27mC6SMV/charuqe.png",
    available: true,
    featured: true,
    order: 10,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "toscana",
    name: "Toscana",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🌭",
    image: "https://i.ibb.co/mVkSwLvk/toscana.png",
    available: true,
    featured: false,
    order: 11,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "galinha-assada",
    name: "Galinha assada",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🍗",
    image: "https://i.ibb.co/gZtn3L0w/galinha-assada.png",
    available: true,
    featured: false,
    order: 12,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "galinha-guisada-almoco",
    name: "Galinha guisada",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🍲",
    image: "https://i.ibb.co/zdrQ6xM/guisado.png",
    available: true,
    featured: false,
    order: 13,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "guisado-de-boi",
    name: "Guisado de boi",
    category: "almoco",
    description: "Prato de almoço da casa.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/v4pjsPN8/guisado-de-boi.png",
    available: true,
    featured: false,
    order: 14,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "carne-de-sol",
    name: "Carne de sol",
    category: "almoco",
    description: "Carne de sol suculenta acompanhada de guarnições da casa.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/wNnQf9Jz/carne-de-sol.png",
    available: true,
    featured: true,
    order: 14.1,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "costela",
    name: "Costela",
    category: "almoco",
    description: "Costela cozida lentamente com temperos especiais.",
    price: 24.99,
    emoji: "🍖",
    image: "https://i.ibb.co/8gWTdkSC/costela.png",
    available: true,
    featured: true,
    order: 14.2,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "cupim",
    name: "Cupim",
    category: "almoco",
    description: "Cupim assado lentamente até derreter na boca.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/0yVkfd5F/cupim.png",
    available: true,
    featured: true,
    order: 14.3,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },

  // -----------------------------------------
  // CATEGORIA: CARNES NOBRES DO ALMOÇO (carnes-nobres-almoco)
  // -----------------------------------------
  {
    id: "picanha",
    name: "Picanha",
    category: "carnes-nobres-almoco",
    description: "Picanha grelhada e macia, servida no ponto certo.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/TxQf1Pv2/picanha.png",
    available: true,
    featured: true,
    order: 14.4,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "maminha",
    name: "Maminha",
    category: "carnes-nobres-almoco",
    description: "Maminha assada, extremamente suculenta e saborosa.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/Qv2WDyHb/mamminha.png",
    available: true,
    featured: true,
    order: 14.5,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "fraldinha",
    name: "Fraldinha",
    category: "carnes-nobres-almoco",
    description: "Fraldinha fatiada de sabor inigualável e textura macia.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/prXfCvgC/fraldinha.png",
    available: true,
    featured: true,
    order: 14.6,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "colchao-mole",
    name: "Colchão mole",
    category: "carnes-nobres-almoco",
    description: "Corte macio e saboroso de colchão mole grelhado.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/prXfCvgC/fraldinha.png",
    available: true,
    featured: false,
    order: 14.7,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "file-mignon",
    name: "Filé mignon",
    category: "carnes-nobres-almoco",
    description: "O corte mais nobre e macio, grelhado com perfeição.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/TxQf1Pv2/picanha.png",
    available: true,
    featured: true,
    order: 14.8,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "file-de-tilapia",
    name: "Filé de tilápia",
    category: "carnes-nobres-almoco",
    description: "Filé de tilápia grelhado leve e saboroso.",
    price: 24.99,
    emoji: "🐟",
    image: "https://i.ibb.co/wN2VxWbL/frango.png",
    available: true,
    featured: false,
    order: 14.9,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },

  // -----------------------------------------
  // CATEGORIA: LANCHES (lanches)
  // -----------------------------------------
  {
    id: "hamburguer-artesanal",
    name: "Hambúrguer artesanal",
    category: "lanches",
    description: "Hambúrguer artesanal da casa.",
    price: 19.99,
    emoji: "🍔",
    image: "https://i.ibb.co/mCNCVrn5/hamburguer-artesanal.png",
    available: true,
    featured: true,
    order: 15,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "hamburguer-tradicional",
    name: "Hambúrguer tradicional",
    category: "lanches",
    description: "Delicioso hambúrguer tradicional com carne selecionada, alface e queijo.",
    price: 14.99,
    emoji: "🍔",
    image: "https://i.ibb.co/mCNCVrn5/hamburguer-artesanal.png",
    available: true,
    featured: false,
    order: 15.5,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "cachorro-quente",
    name: "Cachorro quente",
    category: "lanches",
    description: "Cachorro quente da casa.",
    price: 7.99,
    emoji: "🌭",
    image: "https://i.ibb.co/0jw8sZHm/cachorro-quente.png",
    available: true,
    featured: true,
    order: 16,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "sanduiche-natural",
    name: "Sanduíche natural",
    category: "lanches",
    description: "Sanduíche natural da casa.",
    price: 9.99,
    emoji: "🥪",
    image: "https://i.ibb.co/VWMxqY8v/sanduiche-natural.png",
    available: true,
    featured: false,
    order: 17,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "sanduiche",
    name: "Sanduíche",
    category: "lanches",
    description: "Sanduiche da casa.",
    price: 9.99,
    emoji: "🥪",
    image: "https://i.ibb.co/CKzhPNbX/sanduiche.png",
    available: true,
    featured: false,
    order: 18,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "pao-com-charque",
    name: "Pão com charque",
    category: "lanches",
    description: "Pão de sal bem quentinho recheado com deliciosa charque acebolada.",
    price: 11.99,
    emoji: "🥖",
    image: "https://i.ibb.co/27mC6SMV/charuqe.png",
    available: true,
    featured: false,
    order: 18.5,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "kebab",
    name: "Kebab",
    category: "lanches",
    description: "Kebab da casa.",
    price: 12.99,
    emoji: "🌯",
    image: "https://i.ibb.co/ZpbrHcHF/kebab.png",
    available: true,
    featured: false,
    order: 19,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "tapioca",
    name: "Tapioca",
    category: "lanches",
    description: "Tapioca da casa.",
    price: null,
    emoji: "🌮",
    image: "https://i.ibb.co/LDmKBCyq/tapioca.png",
    available: true,
    featured: false,
    order: 20,
    variants: [
      { id: "frango", name: "Frango", price: 9.99 },
      { id: "queijo", name: "Queijo", price: 9.99 },
      { id: "coco", name: "Côco", price: 9.99 },
      { id: "calabresa", name: "Calabresa", price: 9.99 },
      { id: "carne-de-sol", name: "Carne de sol", price: 12.99 },
      { id: "picanha", name: "Picanha", price: 12.99 },
      { id: "charque", name: "Charque", price: 12.99 },
      { id: "cupim", name: "Cupim", price: 12.99 },
      { id: "nutela", name: "Nutela", price: 12.99 },
      { id: "doce-de-leite", name: "Doce de leite", price: 12.99 },
      { id: "cartola", name: "Cartola", price: 12.99 }
    ],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "mungunza",
    name: "Mungunzá",
    category: "lanches",
    description: "Mungunzá da casa.",
    price: 6.99,
    emoji: "🥣",
    image: "https://i.ibb.co/cScqMJJN/mungunza.png",
    available: true,
    featured: false,
    order: 21,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "caldinho",
    name: "Caldinho",
    category: "lanches",
    description: "Caldinho da casa.",
    price: 9.99,
    emoji: "🍵",
    image: "https://i.ibb.co/93T8f395/caldinho.png",
    available: true,
    featured: false,
    order: 22,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "salada-de-fruta",
    name: "Salada de fruta",
    category: "lanches",
    description: "Salada de fruta da casa.",
    price: 9.99,
    emoji: "🍧",
    image: "https://i.ibb.co/tTHc6XZv/salada-de-frutas.png",
    available: true,
    featured: false,
    order: 23,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },

  // -----------------------------------------
  // CATEGORIA: SOBREMESAS (sobremesas)
  // -----------------------------------------
  {
    id: "sorvete-com-brigadeiro-quente",
    name: "Sorvete com brigadeiro quente",
    category: "sobremesas",
    description: "Sorvete com brigadeiro quente.",
    price: 12.99,
    emoji: "🍨",
    image: "https://i.ibb.co/4RyCWs6D/sorvete-e-brigadeiro.png",
    available: true,
    featured: true,
    order: 24,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "pudim",
    name: "Pudim",
    category: "sobremesas",
    description: "Pudim da casa.",
    price: 5.99,
    emoji: "🍮",
    image: "https://i.ibb.co/spk8xFnS/pudim.png",
    available: true,
    featured: true,
    order: 25,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "acai",
    name: "Açaí",
    category: "sobremesas",
    description: "Açaí da casa.",
    price: null,
    emoji: "🍧",
    image: "https://i.ibb.co/Z621bVFr/acai.png",
    available: true,
    featured: false,
    order: 26,
    variants: [
      { id: "500ml", name: "500 ml", price: 12.99 },
      { id: "700ml", name: "700 ml", price: 15.99 }
    ],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "sorvete",
    name: "Sorvete",
    category: "sobremesas",
    description: "Sorvete saboroso.",
    price: 9.99,
    emoji: "🍨",
    image: "https://i.ibb.co/S4xmvS1y/sorvete.png",
    available: true,
    featured: false,
    order: 26.5,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },

  // -----------------------------------------
  // CATEGORIA: BEBIDAS (bebidas)
  // -----------------------------------------
  {
    id: "suco",
    name: "Suco",
    category: "bebidas",
    description: "Suco natural da casa.",
    price: null,
    emoji: "🍹",
    image: "https://i.ibb.co/fzBmK58D/sucos.png",
    available: true,
    featured: true,
    order: 27,
    variants: [
      { id: "300ml", name: "300 ml", price: 4.99 },
      { id: "500ml", name: "500 ml", price: 9.99 }
    ],
    addons: [],
    /* 
      Para alterar sabores de Sucos editáveis, altere a lista em 'options' abaixo:
    */
    customFields: [
      {
        id: "sabor",
        label: "Sabor do suco",
        type: "select" as const,
        options: [
          "Laranja",
          "Maracujá",
          "Goiaba",
          "Limão",
          "Cajá",
          "Caju",
          "Graviola",
          "Acerola",
          "Morango"
        ]
      },
      defaultObservationField
    ]
  },
  {
    id: "tamarindo",
    name: "Tamarindo",
    category: "bebidas",
    description: "Bebida de tamarindo.",
    price: 3.99,
    emoji: "🥤",
    image: "https://i.ibb.co/6JVyzX71/tamarindo.png",
    available: true,
    featured: false,
    order: 28,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "cafe-expresso",
    name: "Café expresso",
    category: "bebidas",
    description: "Café expresso.",
    price: 4.99,
    emoji: "☕",
    image: "https://i.ibb.co/5X4Hyjby/caafe-expresso.png",
    available: true,
    featured: false,
    order: 29,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "capuchinho",
    name: "Capuchinho",
    category: "bebidas",
    description: "Capuchinho da casa.",
    price: null, // "Preço a confirmar"
    emoji: "☕",
    image: "https://i.ibb.co/gZ8JRnXR/capuchinno.png",
    available: true,
    featured: false,
    order: 30,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "cafe-chocolate",
    name: "Café com chocolate",
    category: "bebidas",
    description: "Café com chocolate.",
    price: null, // "Preço a confirmar"
    emoji: "☕",
    image: "https://i.ibb.co/4ncq4yYc/cafe-com-chocolate.png",
    available: true,
    featured: false,
    order: 31,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },

  // -----------------------------------------
  // CATEGORIA: REFRIGERANTES E ÁGUAS (refrigerantes-e-aguas)
  // -----------------------------------------
  {
    id: "refrigerante-litro",
    name: "Refrigerante litro",
    category: "refrigerantes-e-aguas",
    description: "Refrigerante tamanho litro.",
    price: 9.99,
    emoji: "🍾",
    image: "https://i.ibb.co/qLB3PPw7/refrigerante-litro.png",
    available: true,
    featured: true,
    order: 32,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "refrigerante-lata",
    name: "Refrigerante lata",
    category: "refrigerantes-e-aguas",
    description: "Refrigerante em lata.",
    price: 5.99,
    emoji: "🥫",
    image: "https://i.ibb.co/sdyr0hdT/refirgerante-lata.png",
    available: true,
    featured: false,
    order: 33,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "refrigerante-mini",
    name: "Refrigerante mini",
    category: "refrigerantes-e-aguas",
    description: "Refrigerante mini.",
    price: 4.99,
    emoji: "🥤",
    image: "https://i.ibb.co/1fSy7JnG/refirgerante-mini.png",
    available: true,
    featured: false,
    order: 34,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "skinka",
    name: "Skinka",
    category: "refrigerantes-e-aguas",
    description: "Bebida Skinka.",
    price: 5.99,
    emoji: "🧃",
    image: "https://i.ibb.co/cSY8P2jP/skinka.png",
    available: true,
    featured: false,
    order: 35,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "h2o",
    name: "H2O",
    category: "refrigerantes-e-aguas",
    description: "Bebida H2O.",
    price: 6.99,
    emoji: "🥤",
    image: "https://i.ibb.co/99K5dxWM/h2o.png",
    available: true,
    featured: false,
    order: 36,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "agua-com-gas",
    name: "Água com gás",
    category: "refrigerantes-e-aguas",
    description: "Água com gás.",
    price: 3.99,
    emoji: "💧",
    image: "https://i.ibb.co/NdDw6H90/agua-com-gas.png",
    available: true,
    featured: false,
    order: 37,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "agua-sem-gas",
    name: "Água sem gás",
    category: "refrigerantes-e-aguas",
    description: "Água sem gás.",
    price: 1.99,
    emoji: "💧",
    image: "https://i.ibb.co/NgXqpbRp/agua-sem-gas.png",
    available: true,
    featured: false,
    order: 38,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  },
  {
    id: "agua-coco",
    name: "Água de coco",
    category: "refrigerantes-e-aguas",
    description: "Água de coco.",
    price: 4.99,
    emoji: "🥥",
    image: "https://i.ibb.co/kV1mKcn2/c6560f83-25da-46eb-9b98-26b4e54a73e0.png",
    available: true,
    featured: false,
    order: 39,
    variants: [],
    addons: [],
    customFields: [defaultObservationField]
  }
];
