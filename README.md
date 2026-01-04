# Front-end - Pesquisa Nacional Indígena

Aplicação web PWA (Progressive Web App) desenvolvida em React para coleta de dados de pesquisas nacionais, com foco em entrevistas indígenas e gerais. Sistema offline-first que permite trabalho completo sem conexão com internet.

## 🚀 Stack Tecnológica

- **React** 17 com **TypeScript**
- **React Router** - Roteamento
- **Styled Components** - Estilização
- **Unform** - Gerenciamento de formulários
- **Yup** - Validação de formulários
- **Axios** - Cliente HTTP
- **PrimeReact** - Componentes UI
- **React Spring** - Animações
- **Service Worker** - Funcionalidade PWA

## 📁 Estrutura do Projeto

```
src/
├── pages/                    # Páginas da aplicação
│   ├── Indigenous_Interview/ # Formulário de entrevista indígena
│   │   ├── Forms/           # Formulários modulares
│   │   ├── dtos/            # Tipos TypeScript
│   │   └── validation/      # Schemas de validação
│   ├── Interview/           # Formulário de entrevista geral
│   ├── Dashboard/           # Dashboard principal
│   ├── OfflineInterviews/   # Gerenciamento de entrevistas offline
│   └── ...
├── components/              # Componentes reutilizáveis
│   ├── Button/
│   ├── Input/
│   ├── Select/
│   └── ...
├── hooks/                   # Custom hooks
│   ├── auth.tsx            # Autenticação
│   └── toast.tsx           # Notificações
├── services/                # Serviços
│   ├── api.ts              # Configuração do Axios
│   └── offlineInterviewsService.ts
├── routes/                  # Configuração de rotas
├── templates/               # Templates de páginas
└── utils/                   # Utilitários
```

## 🔧 Pré-requisitos

- Node.js (versão 12 ou superior)
- Yarn ou npm

## ⚙️ Configuração do Ambiente

### 1. Instalar dependências

```bash
yarn install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário):

```env
REACT_APP_API_URL=http://localhost:3333
```

### 3. Executar em desenvolvimento

```bash
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## 📱 Funcionalidades PWA

- **Instalável**: Pode ser instalada como app nativo
- **Offline-first**: Funciona completamente offline
- **Service Worker**: Cache de recursos estáticos
- **LocalStorage**: Armazenamento persistente de dados

## 🔄 Funcionalidade Offline

### Como funciona

1. **Modo Online/Offline**: Switch na interface permite alternar entre modos
2. **Armazenamento Local**: Dados são salvos no `localStorage` quando offline
3. **Estrutura de Dados**:
   - Cada formulário salva seu estado individualmente
   - Entrevistas completas são armazenadas com UUID único
   - Backup automático antes do envio

### Chaves do LocalStorage

- `@Safety:token` - Token de autenticação
- `@Safety:user` - Dados do usuário logado
- `@Safety:offline-interviews` - Entrevistas gerais offline
- `@Safety:indigenous-offline-interviews` - Entrevistas indígenas offline
- `@Safety:current-offline-interview-id` - ID da entrevista atual
- `@Safety:indigenous_*` - Estados individuais dos formulários indígenas

### Envio em Lote

Quando online, os dados offline são enviados automaticamente:

1. Acesse a página "Entrevistas Offline"
2. Clique em "Enviar Entrevistas"
3. Os dados são validados e enviados para a API
4. Backup é criado antes do envio
5. Erros são registrados para revisão

## 📋 Formulários

### Entrevista Indígena

Formulário dividido em 6 módulos sequenciais:

1. **Informações Básicas**: Município, aldeia/comunidade, tipo de comunidade, projeto
2. **Demográfico**: Dados demográficos da população
3. **Domicílio**: Informações sobre residência
4. **Saúde e Doença**: Condições de saúde
5. **Alimentação e Nutrição**: Hábitos alimentares
6. **Apoio e Proteção Social**: Programas sociais

**Características**:
- Validação em cada etapa
- Progressão sequencial
- Persistência automática
- Suporte offline completo

### Entrevista Geral

Formulário completo para pesquisas gerais com múltiplas seções.

## 🎨 Componentes Principais

- **Button**: Botões estilizados
- **Input**: Campos de texto
- **Select**: Seletores customizados
- **Checkbox**: Caixas de seleção
- **RadioInput**: Botões de opção
- **TextArea**: Áreas de texto
- **ToastContainer**: Notificações toast
- **Spinner**: Indicadores de carregamento
- **Paginate**: Paginação de listas

## 🔐 Autenticação

- Login com email e senha
- Recuperação de senha via email
- Token JWT armazenado no localStorage
- Rotas protegidas com autenticação
- Controle de acesso por roles

## 🧪 Testes

```bash
yarn test
```

## 📦 Build para Produção

```bash
yarn build
```

O build será gerado na pasta `build/` e está otimizado para produção.

## 🚀 Deploy

### Netlify

O projeto está configurado para deploy automático na Netlify:

- **Configuração**: `netlify.toml`
- **Build command**: `yarn build`
- **Publish directory**: `build`

### Variáveis de Ambiente (Produção)

Configure no painel da Netlify:

- `REACT_APP_API_URL` - URL da API em produção

## 📱 PWA - Manifest

O arquivo `public/manifest.json` configura:

- Nome da aplicação
- Ícones para diferentes dispositivos
- Tema e cores
- Modo de exibição

## 🔄 Service Worker

O Service Worker está configurado para:

- Cache de recursos estáticos
- Funcionamento offline
- Atualizações automáticas

## 🎯 Rotas Principais

- `/` - Login
- `/dashboard` - Dashboard principal
- `/indigenous-interview` - Formulário indígena
- `/indigenous-interview/:id` - Editar entrevista indígena offline
- `/interview` - Formulário geral
- `/offline` - Gerenciar entrevistas offline
- `/profile` - Perfil do usuário
- `/projects` - Gerenciar projetos

## 🛠️ Scripts Disponíveis

- `yarn start` - Inicia servidor de desenvolvimento
- `yarn build` - Cria build de produção
- `yarn test` - Executa testes
- `yarn format` - Formata código com Prettier

## 📝 Validação de Formulários

Utiliza **Yup** para validação:

- Validação em tempo real
- Mensagens de erro personalizadas
- Validação assíncrona quando necessário
- Schemas reutilizáveis por módulo

## 🎨 Estilização

- **Styled Components**: CSS-in-JS
- **PrimeFlex**: Sistema de grid e utilitários
- **Tema customizado**: Cores e estilos próprios
- **Responsivo**: Adaptável a diferentes tamanhos de tela

## 🔒 Segurança

- Tokens JWT armazenados de forma segura
- Validação de dados no cliente e servidor
- Sanitização de inputs
- Proteção contra XSS

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das alterações
3. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso interno.

