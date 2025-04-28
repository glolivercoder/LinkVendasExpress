# LinkVendasExpress Flutter

Este documento apresenta uma análise detalhada e um plano para recriar o aplicativo LinkVendasExpress em Flutter, mantendo todas as funcionalidades existentes, mas com um código mais limpo, modular e eficiente.

## Índice

1. [Análise do Aplicativo Atual](#análise-do-aplicativo-atual)
2. [Arquitetura Proposta](#arquitetura-proposta)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Bibliotecas Recomendadas](#bibliotecas-recomendadas)
5. [Modelos de Dados](#modelos-de-dados)
6. [Telas e Componentes](#telas-e-componentes)
7. [Gerenciamento de Estado](#gerenciamento-de-estado)
8. [Armazenamento de Dados](#armazenamento-de-dados)
9. [Integrações Externas](#integrações-externas)
10. [Temas e Estilos](#temas-e-estilos)
11. [Responsividade](#responsividade)
12. [Implementação por Módulos](#implementação-por-módulos)

## Análise do Aplicativo Atual

O aplicativo atual LinkVendasExpress é uma aplicação React/React Native que oferece funcionalidades de gerenciamento de estoque, vendas, clientes e fornecedores. Principais características:

### Funcionalidades Principais
- **Gerenciamento de Estoque**: Cadastro, edição e exclusão de produtos
- **Gerenciamento de Vendas**: Registro de vendas, histórico e relatórios
- **Gerenciamento de Clientes**: Cadastro e histórico de clientes
- **Gerenciamento de Fornecedores**: Cadastro de fornecedores
- **Relatórios e Dashboards**: Visualização de dados de vendas e estoque
- **Integração com WordPress/WooCommerce**: Sincronização de produtos

### Estrutura de Dados
- Produtos (id, descrição, preço, quantidade, categoria, etc.)
- Clientes (id, nome, documento, contato, endereço, etc.)
- Fornecedores (id, nome, documento, contato, etc.)
- Vendas (id, data, cliente, itens, total, método de pagamento, etc.)
- Itens de Venda (id, venda, produto, quantidade, preço, total)

### Interface do Usuário
- Design responsivo com suporte a temas claro e escuro
- Layout adaptável para dispositivos móveis
- Componentes reutilizáveis para formulários, tabelas e cards

### Armazenamento
- Utiliza IndexedDB para armazenamento local
- Suporte para backup e restauração de dados

## Arquitetura Proposta

Para a versão Flutter, propomos uma arquitetura limpa (Clean Architecture) com separação clara de responsabilidades:

### Camadas da Arquitetura
1. **Presentation**: UI, Widgets, Pages, ViewModels
2. **Domain**: Entidades, Casos de Uso, Interfaces de Repositório
3. **Data**: Implementações de Repositório, Fontes de Dados, APIs

### Padrões de Design
- **Repository Pattern**: Para acesso a dados
- **Provider/Bloc Pattern**: Para gerenciamento de estado
- **Dependency Injection**: Para injeção de dependências
- **Factory Pattern**: Para criação de objetos complexos

## Estrutura de Pastas

```
lib/
├── core/                     # Código central e utilitários
│   ├── constants/            # Constantes da aplicação
│   ├── errors/               # Classes de erro
│   ├── network/              # Configuração de rede
│   ├── theme/                # Temas e estilos
│   └── utils/                # Funções utilitárias
├── data/                     # Camada de dados
│   ├── datasources/          # Fontes de dados (local, remoto)
│   ├── models/               # Modelos de dados
│   └── repositories/         # Implementações de repositórios
├── domain/                   # Regras de negócio
│   ├── entities/             # Entidades de domínio
│   ├── repositories/         # Interfaces de repositório
│   └── usecases/             # Casos de uso
├── presentation/             # Interface do usuário
│   ├── blocs/                # Gerenciadores de estado (Bloc/Cubit)
│   ├── pages/                # Telas da aplicação
│   │   ├── inventory/        # Telas de estoque
│   │   ├── sales/            # Telas de vendas
│   │   ├── clients/          # Telas de clientes
│   │   ├── vendors/          # Telas de fornecedores
│   │   ├── reports/          # Telas de relatórios
│   │   └── settings/         # Telas de configurações
│   └── widgets/              # Widgets reutilizáveis
├── di/                       # Injeção de dependências
└── main.dart                 # Ponto de entrada da aplicação
```

## Bibliotecas Recomendadas

### Gerenciamento de Estado
- **flutter_bloc**: Para gerenciamento de estado baseado em BLoC
- **provider**: Para injeção de dependências e gerenciamento de estado simples

### Armazenamento Local
- **sqflite**: Banco de dados SQLite para Flutter
- **hive**: Banco de dados NoSQL leve e rápido
- **shared_preferences**: Para armazenamento de configurações simples

### UI/UX
- **flutter_screenutil**: Para design responsivo
- **google_fonts**: Para fontes personalizadas
- **flutter_svg**: Para renderização de SVGs
- **cached_network_image**: Para carregamento e cache de imagens
- **shimmer**: Para efeitos de carregamento
- **flutter_slidable**: Para ações deslizantes em listas

### Formulários e Validação
- **form_field_validator**: Para validação de formulários
- **intl**: Para internacionalização e formatação

### Gráficos e Relatórios
- **fl_chart**: Para gráficos interativos
- **pdf**: Para geração de relatórios em PDF
- **printing**: Para impressão de relatórios

### Integração com APIs
- **dio**: Cliente HTTP para Flutter
- **retrofit**: Para simplificar chamadas de API REST

### Utilitários
- **get_it**: Para injeção de dependências
- **equatable**: Para comparações de objetos simplificadas
- **dartz**: Para programação funcional e tratamento de erros
- **flutter_dotenv**: Para variáveis de ambiente
- **path_provider**: Para acesso ao sistema de arquivos
- **permission_handler**: Para gerenciamento de permissões

## Modelos de Dados

### Product (Produto)
```dart
class Product {
  final String id;
  final String description;
  final String itemDescription;
  final double price;
  final int quantity;
  final int sold;
  final String category;
  final String image;
  final String mediaType;
  final List<String> additionalImages;
  final List<String> additionalMediaTypes;
  final String sku;
  final String gtin;
  final String ncm;
  final double weight;
  final DateTime? expirationDate;
  final bool checked;
  final String? vendorId;
  
  // Construtor e métodos
}
```

### Client (Cliente)
```dart
class Client {
  final String id;
  final String name;
  final String? rg;
  final String? cpf;
  final String? document;
  final String? fatherName;
  final String? motherName;
  final DateTime? birthDate;
  final DateTime? issueDate;
  final String? birthPlace;
  final String? whatsapp;
  final String? email;
  final String? cep;
  final String? address;
  final String? neighborhood;
  final String? city;
  final String? state;
  
  // Construtor e métodos
}
```

### Vendor (Fornecedor)
```dart
class Vendor {
  final String id;
  final String name;
  final String? document;
  final String? description;
  final String? cnpj;
  final String? url;
  final String? email;
  final String? whatsapp;
  final String? telegram;
  final String? instagram;
  
  // Construtor e métodos
}
```

### Sale (Venda)
```dart
class Sale {
  final String id;
  final DateTime date;
  final String? time;
  final double total;
  final String paymentMethod;
  final String? clientId;
  final String? clientName;
  final String? clientDocument;
  final List<SaleItem> items;
  
  // Construtor e métodos
  
  String get formattedDate {
    // Implementação para formatar a data
  }
}
```

### SaleItem (Item de Venda)
```dart
class SaleItem {
  final String id;
  final String saleId;
  final String? productId;
  final String description;
  final double price;
  final int quantity;
  final double total;
  
  // Construtor e métodos
}
```

## Telas e Componentes

### Telas Principais

1. **Dashboard**
   - Resumo de vendas
   - Gráficos de desempenho
   - Alertas de estoque baixo
   - Vendas recentes

2. **Inventory (Estoque)**
   - Lista de produtos
   - Formulário de cadastro/edição
   - Filtros por categoria
   - Busca de produtos

3. **Sales (Vendas)**
   - Registro de novas vendas
   - Seleção de produtos
   - Seleção de cliente
   - Escolha de método de pagamento
   - Histórico de vendas

4. **Clients (Clientes)**
   - Lista de clientes
   - Formulário de cadastro/edição
   - Busca de clientes
   - Detalhes do cliente

5. **Vendors (Fornecedores)**
   - Lista de fornecedores
   - Formulário de cadastro/edição
   - Busca de fornecedores

6. **Reports (Relatórios)**
   - Relatório de vendas
   - Relatório de estoque
   - Exportação para PDF
   - Gráficos e análises

7. **Settings (Configurações)**
   - Configurações gerais
   - Temas e aparência
   - Backup e restauração
   - Integração com WordPress

### Componentes Reutilizáveis

1. **AppBar Personalizada**
2. **Drawer de Navegação**
3. **Cards de Produto**
4. **Formulários Reutilizáveis**
5. **Tabelas de Dados**
6. **Componentes de Gráficos**
7. **Dialogs e Modais**
8. **Botões Personalizados**
9. **Campos de Busca**
10. **Seletores de Data e Hora**

## Gerenciamento de Estado

Utilizaremos o padrão BLoC (Business Logic Component) com a biblioteca flutter_bloc para gerenciamento de estado. Cada funcionalidade principal terá seu próprio BLoC:

### Exemplo de BLoC para Produtos

```dart
// Estados
abstract class ProductState extends Equatable {}

class ProductInitial extends ProductState {}
class ProductLoading extends ProductState {}
class ProductsLoaded extends ProductState {
  final List<Product> products;
  ProductsLoaded(this.products);
}
class ProductError extends ProductState {
  final String message;
  ProductError(this.message);
}

// Eventos
abstract class ProductEvent extends Equatable {}

class LoadProducts extends ProductEvent {}
class AddProduct extends ProductEvent {
  final Product product;
  AddProduct(this.product);
}
class UpdateProduct extends ProductEvent {
  final Product product;
  UpdateProduct(this.product);
}
class DeleteProduct extends ProductEvent {
  final String id;
  DeleteProduct(this.id);
}

// BLoC
class ProductBloc extends Bloc<ProductEvent, ProductState> {
  final ProductRepository repository;
  
  ProductBloc(this.repository) : super(ProductInitial()) {
    on<LoadProducts>(_onLoadProducts);
    on<AddProduct>(_onAddProduct);
    on<UpdateProduct>(_onUpdateProduct);
    on<DeleteProduct>(_onDeleteProduct);
  }
  
  Future<void> _onLoadProducts(LoadProducts event, Emitter<ProductState> emit) async {
    emit(ProductLoading());
    try {
      final products = await repository.getProducts();
      emit(ProductsLoaded(products));
    } catch (e) {
      emit(ProductError(e.toString()));
    }
  }
  
  // Implementações para outros eventos
}
```

## Armazenamento de Dados

Utilizaremos SQLite através da biblioteca sqflite para armazenamento local de dados:

### Exemplo de Implementação de Repositório

```dart
class ProductRepositoryImpl implements ProductRepository {
  final DatabaseHelper dbHelper;
  
  ProductRepositoryImpl(this.dbHelper);
  
  @override
  Future<List<Product>> getProducts() async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query('products');
    
    return List.generate(maps.length, (i) {
      return Product.fromMap(maps[i]);
    });
  }
  
  @override
  Future<Product> getProductById(String id) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      'products',
      where: 'id = ?',
      whereArgs: [id],
    );
    
    if (maps.isNotEmpty) {
      return Product.fromMap(maps.first);
    }
    
    throw Exception('Product not found');
  }
  
  @override
  Future<String> addProduct(Product product) async {
    final db = await dbHelper.database;
    final id = await db.insert('products', product.toMap());
    return id.toString();
  }
  
  @override
  Future<void> updateProduct(Product product) async {
    final db = await dbHelper.database;
    await db.update(
      'products',
      product.toMap(),
      where: 'id = ?',
      whereArgs: [product.id],
    );
  }
  
  @override
  Future<void> deleteProduct(String id) async {
    final db = await dbHelper.database;
    await db.delete(
      'products',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}
```

### Classe Helper para Banco de Dados

```dart
class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  static Database? _database;
  
  factory DatabaseHelper() => _instance;
  
  DatabaseHelper._internal();
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    final path = await getDatabasesPath();
    final dbPath = join(path, 'linkvendas_express.db');
    
    return await openDatabase(
      dbPath,
      version: 1,
      onCreate: _createDatabase,
    );
  }
  
  Future<void> _createDatabase(Database db, int version) async {
    // Criar tabelas
    await db.execute('''
      CREATE TABLE products(
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        itemDescription TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        sold INTEGER NOT NULL,
        category TEXT,
        image TEXT,
        mediaType TEXT,
        additionalImages TEXT,
        additionalMediaTypes TEXT,
        sku TEXT,
        gtin TEXT,
        ncm TEXT,
        weight REAL,
        expirationDate TEXT,
        checked INTEGER,
        vendorId TEXT
      )
    ''');
    
    // Criar outras tabelas (clients, vendors, sales, saleItems)
  }
}
```

## Integrações Externas

### Integração com WordPress/WooCommerce

```dart
class WordPressService {
  final Dio dio;
  final String baseUrl;
  final String consumerKey;
  final String consumerSecret;
  
  WordPressService({
    required this.dio,
    required this.baseUrl,
    required this.consumerKey,
    required this.consumerSecret,
  });
  
  Future<List<dynamic>> getProducts() async {
    try {
      final response = await dio.get(
        '$baseUrl/wp-json/wc/v3/products',
        queryParameters: {
          'consumer_key': consumerKey,
          'consumer_secret': consumerSecret,
          'per_page': 100,
        },
      );
      
      return response.data;
    } catch (e) {
      throw Exception('Failed to get products: $e');
    }
  }
  
  Future<dynamic> syncProduct(Product product) async {
    try {
      // Verificar se o produto já existe
      final existingProducts = await dio.get(
        '$baseUrl/wp-json/wc/v3/products',
        queryParameters: {
          'consumer_key': consumerKey,
          'consumer_secret': consumerSecret,
          'sku': product.sku,
        },
      );
      
      final Map<String, dynamic> productData = {
        'name': product.description,
        'description': product.itemDescription,
        'regular_price': product.price.toString(),
        'sku': product.sku,
        'manage_stock': true,
        'stock_quantity': product.quantity,
        'categories': [
          {'id': await getCategoryId(product.category)}
        ],
      };
      
      if (existingProducts.data.isNotEmpty) {
        // Atualizar produto existente
        final productId = existingProducts.data[0]['id'];
        final response = await dio.put(
          '$baseUrl/wp-json/wc/v3/products/$productId',
          queryParameters: {
            'consumer_key': consumerKey,
            'consumer_secret': consumerSecret,
          },
          data: productData,
        );
        
        return response.data;
      } else {
        // Criar novo produto
        final response = await dio.post(
          '$baseUrl/wp-json/wc/v3/products',
          queryParameters: {
            'consumer_key': consumerKey,
            'consumer_secret': consumerSecret,
          },
          data: productData,
        );
        
        return response.data;
      }
    } catch (e) {
      throw Exception('Failed to sync product: $e');
    }
  }
  
  Future<int> getCategoryId(String categoryName) async {
    // Implementação para obter ou criar categoria
  }
}
```

## Temas e Estilos

### Definição de Temas

```dart
class AppTheme {
  static ThemeData lightTheme() {
    return ThemeData(
      primaryColor: const Color(0xFF3498db),
      colorScheme: ColorScheme.light(
        primary: const Color(0xFF3498db),
        secondary: const Color(0xFFf39c12),
        background: const Color(0xFFF5F5F5),
        surface: Colors.white,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onBackground: const Color(0xFF333333),
        onSurface: const Color(0xFF333333),
      ),
      scaffoldBackgroundColor: const Color(0xFFF5F5F5),
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFF2c3e50),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      cardTheme: CardTheme(
        color: Colors.white,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFFCCCCCC)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFFCCCCCC)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFF3498db), width: 2),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF3498db),
          foregroundColor: Colors.white,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        ),
      ),
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: Color(0xFF333333),
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Color(0xFF333333),
        ),
        titleLarge: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Color(0xFF333333),
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: Color(0xFF333333),
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: Color(0xFF333333),
        ),
      ),
    );
  }
  
  static ThemeData darkTheme() {
    return ThemeData(
      primaryColor: const Color(0xFF3498db),
      colorScheme: ColorScheme.dark(
        primary: const Color(0xFF3498db),
        secondary: const Color(0xFFf39c12),
        background: const Color(0xFF1A1A1A),
        surface: const Color(0xFF2A2A2A),
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onBackground: Colors.white,
        onSurface: Colors.white,
      ),
      scaffoldBackgroundColor: const Color(0xFF1A1A1A),
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFF2c3e50),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      cardTheme: CardTheme(
        color: const Color(0xFF2A2A2A),
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF2A2A2A),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFF3A3A3A)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFF3A3A3A)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFF3498db), width: 2),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF3498db),
          foregroundColor: Colors.white,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        ),
      ),
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        titleLarge: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: Colors.white,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: Colors.white,
        ),
      ),
    );
  }
}
```

## Responsividade

Utilizaremos o pacote flutter_screenutil para garantir que a interface seja responsiva em diferentes tamanhos de tela:

```dart
class ResponsiveText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final TextOverflow? overflow;
  final int? maxLines;
  
  const ResponsiveText({
    Key? key,
    required this.text,
    this.style,
    this.textAlign,
    this.overflow,
    this.maxLines,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: style?.copyWith(
        fontSize: (style?.fontSize ?? 14).sp,
      ),
      textAlign: textAlign,
      overflow: overflow,
      maxLines: maxLines,
    );
  }
}

class ResponsiveButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? color;
  final double? width;
  final double? height;
  
  const ResponsiveButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.color,
    this.width,
    this.height,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width?.w,
      height: height?.h,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          padding: EdgeInsets.symmetric(
            horizontal: 16.w,
            vertical: 12.h,
          ),
        ),
        child: ResponsiveText(
          text: text,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
```

## Implementação por Módulos

### Módulo 1: Core e Configuração Inicial

- Configuração do projeto
- Definição de temas e estilos
- Configuração de rotas
- Utilitários e constantes
- Configuração de injeção de dependências

### Módulo 2: Modelos de Dados e Armazenamento

- Definição de entidades
- Implementação de repositórios
- Configuração do banco de dados
- Migração de dados (se necessário)

### Módulo 3: Dashboard e Navegação

- Tela de dashboard
- Drawer de navegação
- AppBar personalizada
- Widgets de resumo e estatísticas

### Módulo 4: Gerenciamento de Estoque

- Lista de produtos
- Formulário de cadastro/edição de produtos
- Filtros e busca
- Categorias de produtos

### Módulo 5: Gerenciamento de Vendas

- Registro de vendas
- Seleção de produtos
- Seleção de cliente
- Escolha de método de pagamento
- Histórico de vendas

### Módulo 6: Gerenciamento de Clientes

- Lista de clientes
- Formulário de cadastro/edição de clientes
- Busca de clientes
- Detalhes do cliente

### Módulo 7: Gerenciamento de Fornecedores

- Lista de fornecedores
- Formulário de cadastro/edição de fornecedores
- Busca de fornecedores

### Módulo 8: Relatórios e Análises

- Relatório de vendas
- Relatório de estoque
- Exportação para PDF
- Gráficos e análises

### Módulo 9: Configurações e Integrações

- Configurações gerais
- Temas e aparência
- Backup e restauração
- Integração com WordPress/WooCommerce

### Módulo 10: Testes e Otimização

- Testes unitários
- Testes de integração
- Otimização de desempenho
- Correção de bugs

## Conclusão

A migração do LinkVendasExpress para Flutter permitirá criar uma aplicação mais robusta, com melhor desempenho e uma experiência de usuário mais fluida. A arquitetura proposta garante um código limpo, modular e de fácil manutenção, facilitando futuras atualizações e expansões.

A implementação por módulos permite um desenvolvimento incremental, com entregas parciais funcionais, e a possibilidade de testar cada módulo independentemente antes da integração final.

Com as bibliotecas recomendadas, será possível implementar todas as funcionalidades existentes no aplicativo atual, além de adicionar melhorias e otimizações que tornarão a experiência do usuário ainda melhor.
