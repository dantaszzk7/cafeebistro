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
  pix: "CNPJ: 66.644.687/0001-06" // Chave PIX da loja
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
    id: "lanches",
    name: "Lanches",
    shortName: "Lanches",
    description: "Lanches rápidos, saborosos e quentinhos.",
    visible: true,
    order: 4
  },
  {
    id: "combos",
    name: "Combos",
    shortName: "Combos",
    description: "Ofertas completas com hambúrguer/pão, batata crocante e bebida.",
    visible: true,
    order: 4.5
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
    id: "cafe-da-manha",
    name: "Café da manhã",
    category: "cafe-da-manha",
    description: "Monte seu café da manhã escolhendo as opções disponíveis.",
    price: 17.99,
    emoji: "🍽️",
    image: "https://i.ibb.co/4w3x866p/caf-a-manha.png",
    available: true,
    featured: true,
    order: 1,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "opcoes-principais",
        label: "Escolha até 2 opções principais",
        type: "checkbox" as const,
        required: true,
        minChoices: 1,
        maxChoices: 2,
        options: [
          "Macaxeira",
          "Cuscuz",
          "Inhame"
        ]
      },
      {
        id: "opcoes-carne",
        label: "Escolha até 2 opções de carne",
        type: "checkbox" as const,
        required: true,
        minChoices: 1,
        maxChoices: 2,
        options: [
          "Guisado",
          "Charque",
          "Galinha guisada",
          "Galinha assada",
          "Carne de sol"
        ]
      },
      {
        id: "observacao",
        label: "Observação do pedido",
        type: "text" as const,
        placeholder: "Ex: sem cebola, pouca farofa, mais macaxeira, sem salada..."
      }
    ]
  },
  // -----------------------------------------
  // CATEGORIA: ALMOÇO (almoco)
  // -----------------------------------------
  {
    id: "almoco",
    name: "Almoço",
    category: "almoco",
    description: "Monte seu almoço escolhendo a carne e os acompanhamentos.",
    price: 17.99,
    emoji: "🍛",
    image: "https://i.ibb.co/W43JpjCc/almo-o.png",
    available: true,
    featured: true,
    order: 8,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "carne",
        label: "Escolha a carne",
        type: "select" as const,
        required: true,
        options: [
          "Fígado",
          "Guisado",
          "Toscana",
          "Galinha guisada",
          "Galinha assada",
          "Guisado de boi",
          "Filé de peito"
        ]
      },
      {
        id: "acompanhamentos",
        label: "Escolha os acompanhamentos",
        type: "checkbox" as const,
        required: false,
        options: [
          "Arroz",
          "Feijão",
          "Macarrão",
          "Farofa",
          "Salada"
        ]
      },
      {
        id: "observacao",
        label: "Observação do almoço",
        type: "text" as const,
        placeholder: "Ex: sem salada, sem farofa, mais arroz, pouco feijão..."
      }
    ]
  },
  {
    id: "almoco-nobre",
    name: "Almoço Gourmet",
    category: "almoco",
    description: "Escolha sua carne nobre e os acompanhamentos do seu almoço.",
    price: 24.99,
    emoji: "🥩",
    image: "https://i.ibb.co/5Wvc6PJR/almo-o-gourmet.png",
    available: true,
    featured: true,
    order: 9,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "carne-nobre",
        label: "Escolha a carne nobre",
        type: "select" as const,
        required: true,
        options: [
          "Picanha",
          "Maminha",
          "Fraldinha",
          "Colchão mole",
          "Filé mignon",
          "Filé de tilápia"
        ]
      },
      {
        id: "acompanhamentos",
        label: "Escolha os acompanhamentos",
        type: "checkbox" as const,
        required: false,
        options: [
          "Arroz",
          "Feijão",
          "Macarrão",
          "Farofa",
          "Salada",
          "Batata frita"
        ]
      },
      {
        id: "observacao",
        label: "Observação do almoço",
        type: "text" as const,
        placeholder: "Ex: sem salada, sem farofa, carne bem passada, mais arroz..."
      }
    ]
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
    description: "Escolha dois sabores para montar sua tapioca.",
    price: 12.99,
    emoji: "🌮",
    image: "https://i.ibb.co/LDmKBCyq/tapioca.png",
    available: true,
    featured: false,
    order: 20,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "primeiro-sabor",
        label: "Escolha o primeiro sabor",
        type: "select" as const,
        required: true,
        options: [
          "Frango",
          "Queijo",
          "Côco",
          "Calabresa"
        ]
      },
      {
        id: "segundo-sabor",
        label: "Escolha o segundo sabor",
        type: "select" as const,
        required: true,
        options: [
          "Frango",
          "Queijo",
          "Côco",
          "Calabresa"
        ]
      },
      {
        id: "observacao",
        label: "Observação da tapioca",
        type: "text" as const,
        placeholder: "Ex: sem manteiga, bem passada, pouco recheio..."
      }
    ]
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
  {
    id: "batata-frita-m",
    name: "Batata frita",
    category: "lanches",
    description: "Porção de batata frita tamanho M.",
    price: 14.99,
    emoji: "🍟",
    image: "https://i.ibb.co/HTNstCZJ/image.png",
    available: true,
    featured: false,
    order: 24,
    variants: [
      {
        id: "m",
        name: "Tamanho M",
        price: 14.99
      }
    ],
    addons: [],
    customFields: [
      {
        id: "observacao",
        label: "Observação do pedido",
        type: "text" as const,
        placeholder: "Ex: sem sal, bem crocante, com ketchup..."
      }
    ]
  },

  // -----------------------------------------
  // CATEGORIA: COMBOS (combos)
  // -----------------------------------------
  {
    id: "combo-hamburguer-artesanal",
    name: "Combo Hambúrguer artesanal",
    category: "combos",
    description: "Hambúrguer artesanal + batata frita + bebida.",
    price: 24.99,
    emoji: "🍔",
    image: "https://i.ibb.co/6R7DvkbW/combo-artesanal.png",
    available: true,
    featured: true,
    order: 24.1,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "bebida",
        label: "Escolha a bebida do combo",
        type: "select" as const,
        required: true,
        options: [
          "Suco",
          "Refrigerante"
        ]
      },
      {
        id: "detalhe-bebida",
        label: "Detalhe da bebida",
        type: "text" as const,
        placeholder: "Ex: suco de laranja, Coca-Cola, Antártica..."
      },
      {
        id: "observacao",
        label: "Observação do combo",
        type: "text" as const,
        placeholder: "Ex: sem cebola, batata mais crocante, pouco molho..."
      }
    ]
  },
  {
    id: "combo-hamburguer-tradicional",
    name: "Combo Hambúrguer tradicional",
    category: "combos",
    description: "Hambúrguer tradicional + batata frita + bebida.",
    price: 19.99,
    emoji: "🍔",
    image: "https://i.ibb.co/xtnj9N4W/combo-hamburguer-tradicional.png",
    available: true,
    featured: true,
    order: 24.2,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "bebida",
        label: "Escolha a bebida do combo",
        type: "select" as const,
        required: true,
        options: [
          "Suco",
          "Refrigerante"
        ]
      },
      {
        id: "detalhe-bebida",
        label: "Detalhe da bebida",
        type: "text" as const,
        placeholder: "Ex: suco de laranja, Coca-Cola, Antártica..."
      },
      {
        id: "observacao",
        label: "Observação do combo",
        type: "text" as const,
        placeholder: "Ex: sem cebola, batata mais crocante, pouco molho..."
      }
    ]
  },
  {
    id: "combo-pao-com-charque",
    name: "Combo Pão com charque",
    category: "combos",
    description: "Pão com charque + batata frita + bebida.",
    price: 19.99,
    emoji: "🥖",
    image: "https://i.ibb.co/67jC6ms5/combo-p-o-com-charque.png",
    available: true,
    featured: true,
    order: 24.3,
    variants: [],
    addons: [],
    customFields: [
      {
        id: "bebida",
        label: "Escolha a bebida do combo",
        type: "select" as const,
        required: true,
        options: [
          "Suco",
          "Refrigerante"
        ]
      },
      {
        id: "detalhe-bebida",
        label: "Detalhe da bebida",
        type: "text" as const,
        placeholder: "Ex: suco de laranja, Coca-Cola, Antártica..."
      },
      {
        id: "observacao",
        label: "Observação do combo",
        type: "text" as const,
        placeholder: "Ex: sem cebola, batata mais crocante, pouco molho..."
      }
    ]
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
    customFields: [
      {
        id: "sabor-marca",
        label: "Escolha o sabor/marca",
        type: "select" as const,
        required: true,
        options: ["Coca-Cola", "Antártica"]
      },
      {
        id: "observacao",
        label: "Observação do pedido",
        type: "text" as const,
        placeholder: "Ex: bem gelado..."
      }
    ]
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
    customFields: [
      {
        id: "sabor-marca",
        label: "Escolha o sabor/marca",
        type: "select" as const,
        required: true,
        options: ["Coca-Cola", "Antártica", "Fanta", "Sprite"]
      },
      {
        id: "observacao",
        label: "Observação do pedido",
        type: "text" as const,
        placeholder: "Ex: bem gelado..."
      }
    ]
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
    customFields: [
      {
        id: "sabor-marca",
        label: "Escolha o sabor/marca",
        type: "select" as const,
        required: true,
        options: ["Coca-Cola", "Antártica", "Fanta", "Sprite"]
      },
      {
        id: "observacao",
        label: "Observação do pedido",
        type: "text" as const,
        placeholder: "Ex: bem gelado..."
      }
    ]
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
