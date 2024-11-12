export interface Buyer {
  id: string; // Identificador único do comprador
  name?: string; // Nome completo do comprador
  surname?: string;
  phone?: string; // Número de telefone do comprador
  document?: string; // Documento de identidade (CPF, CNPJ, etc.)
  documentType?: string; // Tipo de documento (ex: CPF para pessoa física, CNPJ para pessoa jurídica)
  email?: string; // Endereço de e-mail do comprador
  birthDate?: string; // Data de nascimento do comprador
  cep?: string; // Código postal do endereço do comprador
  company: Company; // Representa a empresa a qual o ItemBase esta atrelado

  address?: {
    street?: string; // Nome da rua do endereço
    number?: string; // Número da residência
    complement?: string; // Complemento do endereço, como apartamento, bloco, etc.
    neighborhood?: string; // Bairro do endereço
    city?: string; // Cidade do endereço
    state?: string; // Estado do endereço
    country?: string; // País do endereço
    postcode?: string; // Código postal completo do endereço (pode ser usado em conjunto com o CEP)
  };

  createdAt?: Date; // Data de criação do perfil do comprador
  updatedAt?: Date; // Data da última atualização do perfil do comprador
  isActive?: boolean; // Status do perfil do comprador, indicando se está ativo ou inativo
  gender?: "male" | "female" | "other"; // Gênero do comprador
  maritalStatus?: "single" | "married" | "divorced" | "widowed"; // Estado civil do comprador

  buyerCompany?: {
    name?: string; // Nome da empresa associada ao comprador
    role?: string; // Cargo ou função do comprador na empresa
    businessPhone?: string; // Telefone de contato comercial do comprador
  };

  // Campos de customização e preferências
  preferences?: {
    preferredContactMethod?: "phone" | "email" | "sms"; // Método preferencial de contato
    newsletterSubscribed?: boolean; // Indica se o comprador está inscrito para receber newsletter
    language?: string; // Idioma preferido do comprador
  };

  notes?: string; // Campo para anotações adicionais sobre o comprador

  // Dados de UTM para rastreamento de marketing
  utm?: {
    source?: string; // Origem da campanha, ex: google, facebook
    medium?: string; // Meio da campanha, ex: cpc (custo por clique), banner, email
    campaign?: string; // Nome da campanha específica que trouxe o comprador
    term?: string; // Termo de pesquisa usado no anúncio ou palavra-chave associada
    content?: string; // Identificador específico do conteúdo ou variação do anúncio
  };
}

export interface Expense {
  id: string;
  orderDate: string; //Data que eu fiz a compra
  paymentDate?: string; //Data que eu vou pagar ou paguei a compra
  description: string; //O que eu comprei
  amount: number; //Valor total do item que eu comprei (se houver juros de parcelamento, incluir o valor total com juros)
  quantity: string; //Padrao 1
  paymentMethod?: "Credit Card" | "Debit Card" | "Cash" | "PIX" | "Billet"; //
  installment?: number; //Em quantas vezes vou pagar
  status?: "Paid" | "Wait Payment";
  category: "Personal" | "Mixed" | "Business" | "Goal";
  type?: "Variable Cost" | "Fix Cost" | "Direct Cost"; // Por padrao
  typeCategory?: Product[] | Service[] | "All" | null;
  company: Company; // Representa a empresa a qual o ItemBase esta atrelado
}

export interface Goal {
  id: string;
  description: string;
  importance: string;
  startDate: string; // Quando vou comecar a juntar ? 01/12/24
  targetDate: string; // Ate quando quero juntar tudo? 01/01/25
  amount: number; // Quanto vou juntar? R$10000.00
  workdays: string[]; // Dias que vou trabalhar da semana  Seg - Sex (5) -> Adicionar pergunta se vai trabalhar no feriado sim ou nao.
  initialDailyGoal: number; // R$500.00
  status: "waiting" | "in_progress" | "completed";
  imageUrl: string; // Foto da meta
  completed: boolean;
  completedDate: string;
  company: Company; // Representa a empresa a qual o ItemBase esta atrelado
}
export interface Income {
  id: string;
  orderDate: string;
  paymentDate?: string; // Se o método de pagamento não for "Fiado", a data do pagamento deve ser igual à data do pedido
  description: string | ItemBase["description"]; // Pode ser uma string ou a descrição do ItemBase
  amount: number | ItemBase["unitPrice"]; // Pode ser um número ou o preço unitário do ItemBase
  quantity: number; // Quantidade de itens ou serviços
  type: "Service" | "Product" | ItemBase["type"]; // Service, Product, ou o tipo do ItemBase
  paymentMethod?: "Credit Card" | "Debit Card" | "Cash" | "PIX" | "Fiado"; // Método de pagamento
  installment?: number; // Número de parcelas, se aplicável
  status?: "Paid" | "Wait Payment"; // Status do pagamento
  buyer?: Buyer; // Referência ao comprador
  category: "Business" | "Personal"; // Categoria de renda
  company: Company; // Representa a empresa a qual o ItemBase esta atrelado
}

// Base comum para Produto e Serviço
//Refatorar ItemBase com base em exemplo de NFe NFSe XML
export interface ItemBase {
  id: string; // Identificador único
  description: string; // Descrição do item
  unitPrice: number; // Preço unitário do item
  type: "Product" | "Service"; // Tipo de item, pode ser "product" ou "service"
  sku?: string; // Código SKU (opcional para serviços)
  currency?: string; // Moeda, ex: "USD", "BRL"
  createdAt?: Date; // Data de criação do item
  updatedAt?: Date; // Data da última atualização do item
  company: Company; // Representa a empresa a qual o ItemBase esta atrelado
}

// Interface para Produto Físico
export interface Product extends ItemBase {
  type: "Product"; // Tipo fixo para produtos
  weight?: number; // Peso do produto (em kg, gramas, etc.)
  dimensions?: {
    // Dimensões do produto
    width: number; // Largura do produto
    height: number; // Altura do produto
    depth: number; // Profundidade do produto
  };
  manufacturer?: string; // Fabricante do produto
  category?: string; // Categoria do produto
}

// Interface para Serviço
export interface Service extends ItemBase {
  type: "Service"; // Tipo fixo para serviços
  duration?: number; // Duração do serviço em minutos ou horas
  provider?: string; // Nome do provedor do serviço
  category?: string; // Categoria do serviço
}

export interface User {
  id: string; // Identificador único do usuário
  firstName: string; // Nome do usuário
  lastName?: string; // Sobrenome do usuário
  email: string; // Email do usuário
  phone?: string; // Telefone do usuário (opcional)
  cpf?: string; // CPF do usuário
  password: string; // Senha do usuário
  companies?: Company[]; // Lista de empresas associadas ao usuário
  hasCNPJ: boolean; // Indica se o usuário possui CNPJ
}

export interface Company {
  cnpj: string; // Número do CNPJ
  corporateName: string; // Razão social
  tradeName?: string; // Nome fantasia (opcional)
  openingDate: string; // Data de abertura
  mainActivity: string; // Atividade econômica principal (CNAE)
  secondaryActivities?: string[]; // Atividades secundárias (opcional)
  legalNature: string; // Natureza jurídica da empresa
  status: "Active" | "Inactive"; // Status da empresa (ativa ou inativa)

  address: {
    street: string; // Nome da rua
    number: string; // Número do endereço
    complement?: string; // Complemento do endereço (opcional)
    neighborhood: string; // Bairro
    city: string; // Cidade
    state: string; // Estado (UF)
    postalCode: string; // CEP
  };

  contact?: {
    phone?: string; // Telefone de contato (opcional)
    email?: string; // Email de contato (opcional)
  };

  registrationInfo: {
    registrationStatus: string; // Situação cadastral (ex: Ativa, Suspensa)
    registrationDate: string; // Data da situação cadastral
    specialStatus?: string; // Situação especial, se aplicável (ex: Falência)
    specialStatusDate?: string; // Data da situação especial (opcional)
  };
}
