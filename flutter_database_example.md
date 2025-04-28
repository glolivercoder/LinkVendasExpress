# Exemplo de Implementação do Banco de Dados SQLite para LinkVendasExpress Flutter

Este documento contém exemplos de implementação do banco de dados SQLite para o projeto LinkVendasExpress em Flutter.

## Helper do Banco de Dados (data/datasources/local/database_helper.dart)

```dart
import 'dart:async';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path_provider/path_provider.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  static Database? _database;

  // Nome do banco de dados
  static const String _databaseName = "linkvendas_express.db";
  
  // Versão do banco de dados
  static const int _databaseVersion = 1;

  // Nomes das tabelas
  static const String tableProducts = 'products';
  static const String tableClients = 'clients';
  static const String tableVendors = 'vendors';
  static const String tableSales = 'sales';
  static const String tableSaleItems = 'sale_items';

  // Construtor privado
  DatabaseHelper._internal();

  // Singleton
  factory DatabaseHelper() {
    return _instance;
  }

  // Getter para o banco de dados
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  // Inicializar o banco de dados
  Future<Database> _initDatabase() async {
    final documentsDirectory = await getApplicationDocumentsDirectory();
    final path = join(documentsDirectory.path, _databaseName);
    return await openDatabase(
      path,
      version: _databaseVersion,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  // Criar tabelas
  Future<void> _onCreate(Database db, int version) async {
    // Tabela de produtos
    await db.execute('''
      CREATE TABLE $tableProducts (
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        itemDescription TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        sold INTEGER NOT NULL DEFAULT 0,
        category TEXT NOT NULL DEFAULT 'Todos',
        image TEXT,
        mediaType TEXT DEFAULT 'image',
        additionalImages TEXT,
        additionalMediaTypes TEXT,
        sku TEXT,
        gtin TEXT,
        ncm TEXT,
        weight REAL,
        expirationDate TEXT,
        checked INTEGER NOT NULL DEFAULT 0,
        vendorId TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT
      )
    ''');

    // Tabela de clientes
    await db.execute('''
      CREATE TABLE $tableClients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        rg TEXT,
        cpf TEXT,
        document TEXT,
        fatherName TEXT,
        motherName TEXT,
        birthDate TEXT,
        issueDate TEXT,
        birthPlace TEXT,
        whatsapp TEXT,
        email TEXT,
        cep TEXT,
        address TEXT,
        neighborhood TEXT,
        city TEXT,
        state TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT
      )
    ''');

    // Tabela de fornecedores
    await db.execute('''
      CREATE TABLE $tableVendors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        document TEXT,
        description TEXT,
        cnpj TEXT,
        url TEXT,
        email TEXT,
        whatsapp TEXT,
        telegram TEXT,
        instagram TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT
      )
    ''');

    // Tabela de vendas
    await db.execute('''
      CREATE TABLE $tableSales (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        time TEXT,
        total REAL NOT NULL,
        paymentMethod TEXT NOT NULL,
        clientId TEXT,
        clientName TEXT,
        clientDocument TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT,
        FOREIGN KEY (clientId) REFERENCES $tableClients (id) ON DELETE SET NULL
      )
    ''');

    // Tabela de itens de venda
    await db.execute('''
      CREATE TABLE $tableSaleItems (
        id TEXT PRIMARY KEY,
        saleId TEXT NOT NULL,
        productId TEXT,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        total REAL NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (saleId) REFERENCES $tableSales (id) ON DELETE CASCADE,
        FOREIGN KEY (productId) REFERENCES $tableProducts (id) ON DELETE SET NULL
      )
    ''');

    // Criar índices para melhorar a performance
    await db.execute('CREATE INDEX idx_products_category ON $tableProducts (category)');
    await db.execute('CREATE INDEX idx_clients_name ON $tableClients (name)');
    await db.execute('CREATE INDEX idx_clients_document ON $tableClients (document)');
    await db.execute('CREATE INDEX idx_sales_date ON $tableSales (date)');
    await db.execute('CREATE INDEX idx_sales_clientId ON $tableSales (clientId)');
    await db.execute('CREATE INDEX idx_sale_items_saleId ON $tableSaleItems (saleId)');
    await db.execute('CREATE INDEX idx_sale_items_productId ON $tableSaleItems (productId)');
  }

  // Atualizar banco de dados
  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 2) {
      // Atualizações para a versão 2
    }
  }

  // Fechar o banco de dados
  Future<void> close() async {
    final db = await database;
    db.close();
  }

  // Limpar todas as tabelas
  Future<void> clearAllTables() async {
    final db = await database;
    await db.transaction((txn) async {
      await txn.delete(tableSaleItems);
      await txn.delete(tableSales);
      await txn.delete(tableProducts);
      await txn.delete(tableClients);
      await txn.delete(tableVendors);
    });
  }

  // Backup do banco de dados
  Future<String> backup() async {
    final db = await database;
    await db.close();
    _database = null;

    final documentsDirectory = await getApplicationDocumentsDirectory();
    final dbPath = join(documentsDirectory.path, _databaseName);
    final backupPath = join(documentsDirectory.path, 'backup_$_databaseName');

    // Copiar o arquivo do banco de dados
    final dbFile = await File(dbPath).copy(backupPath);
    
    // Reabrir o banco de dados
    _database = await _initDatabase();
    
    return backupPath;
  }

  // Restaurar backup
  Future<bool> restoreBackup(String backupPath) async {
    try {
      final db = await database;
      await db.close();
      _database = null;

      final documentsDirectory = await getApplicationDocumentsDirectory();
      final dbPath = join(documentsDirectory.path, _databaseName);

      // Copiar o arquivo de backup para o local do banco de dados
      await File(backupPath).copy(dbPath);
      
      // Reabrir o banco de dados
      _database = await _initDatabase();
      
      return true;
    } catch (e) {
      print('Erro ao restaurar backup: $e');
      // Reabrir o banco de dados em caso de erro
      _database = await _initDatabase();
      return false;
    }
  }
}
```

## Fonte de Dados Local para Produtos (data/datasources/local/product_local_datasource.dart)

```dart
import 'package:sqflite/sqflite.dart';
import '../../models/product_model.dart';
import 'database_helper.dart';

abstract class ProductLocalDataSource {
  Future<List<ProductModel>> getProducts();
  Future<ProductModel> getProductById(String id);
  Future<String> addProduct(ProductModel product);
  Future<void> updateProduct(ProductModel product);
  Future<void> deleteProduct(String id);
  Future<List<ProductModel>> getProductsByCategory(String category);
  Future<List<ProductModel>> searchProducts(String query);
}

class ProductLocalDataSourceImpl implements ProductLocalDataSource {
  final DatabaseHelper dbHelper;

  ProductLocalDataSourceImpl({required this.dbHelper});

  @override
  Future<List<ProductModel>> getProducts() async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableProducts,
      orderBy: 'description ASC',
    );

    return List.generate(maps.length, (i) {
      return ProductModel.fromMap(maps[i]);
    });
  }

  @override
  Future<ProductModel> getProductById(String id) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableProducts,
      where: 'id = ?',
      whereArgs: [id],
    );

    if (maps.isNotEmpty) {
      return ProductModel.fromMap(maps.first);
    }

    throw Exception('Product not found');
  }

  @override
  Future<String> addProduct(ProductModel product) async {
    final db = await dbHelper.database;
    
    // Adicionar data de criação
    final now = DateTime.now().toIso8601String();
    final productMap = product.toMap();
    productMap['createdAt'] = now;
    productMap['updatedAt'] = now;
    
    await db.insert(
      DatabaseHelper.tableProducts,
      productMap,
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
    
    return product.id;
  }

  @override
  Future<void> updateProduct(ProductModel product) async {
    final db = await dbHelper.database;
    
    // Adicionar data de atualização
    final productMap = product.toMap();
    productMap['updatedAt'] = DateTime.now().toIso8601String();
    
    await db.update(
      DatabaseHelper.tableProducts,
      productMap,
      where: 'id = ?',
      whereArgs: [product.id],
    );
  }

  @override
  Future<void> deleteProduct(String id) async {
    final db = await dbHelper.database;
    await db.delete(
      DatabaseHelper.tableProducts,
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  @override
  Future<List<ProductModel>> getProductsByCategory(String category) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableProducts,
      where: 'category = ?',
      whereArgs: [category],
      orderBy: 'description ASC',
    );

    return List.generate(maps.length, (i) {
      return ProductModel.fromMap(maps[i]);
    });
  }

  @override
  Future<List<ProductModel>> searchProducts(String query) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableProducts,
      where: 'description LIKE ? OR sku LIKE ? OR gtin LIKE ?',
      whereArgs: ['%$query%', '%$query%', '%$query%'],
      orderBy: 'description ASC',
    );

    return List.generate(maps.length, (i) {
      return ProductModel.fromMap(maps[i]);
    });
  }
}
```

## Fonte de Dados Local para Vendas (data/datasources/local/sale_local_datasource.dart)

```dart
import 'package:sqflite/sqflite.dart';
import '../../models/sale_model.dart';
import '../../models/sale_item_model.dart';
import 'database_helper.dart';

abstract class SaleLocalDataSource {
  Future<List<SaleModel>> getSales();
  Future<SaleModel> getSaleById(String id);
  Future<String> addSale(SaleModel sale);
  Future<void> deleteSale(String id);
  Future<List<SaleModel>> getSalesByDateRange(DateTime startDate, DateTime endDate);
  Future<List<SaleModel>> getSalesByClient(String clientId);
  Future<List<SaleModel>> getSalesByPaymentMethod(String paymentMethod);
  Future<List<SaleModel>> searchSales(String query);
}

class SaleLocalDataSourceImpl implements SaleLocalDataSource {
  final DatabaseHelper dbHelper;

  SaleLocalDataSourceImpl({required this.dbHelper});

  @override
  Future<List<SaleModel>> getSales() async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableSales,
      orderBy: 'date DESC',
    );

    return await _getSalesWithItems(maps);
  }

  @override
  Future<SaleModel> getSaleById(String id) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableSales,
      where: 'id = ?',
      whereArgs: [id],
    );

    if (maps.isEmpty) {
      throw Exception('Sale not found');
    }

    final List<SaleModel> sales = await _getSalesWithItems(maps);
    return sales.first;
  }

  @override
  Future<String> addSale(SaleModel sale) async {
    final db = await dbHelper.database;
    
    // Iniciar transação
    return await db.transaction((txn) async {
      // Adicionar data de criação
      final now = DateTime.now().toIso8601String();
      final saleMap = sale.toMap();
      
      // Remover itens do mapa da venda
      saleMap.remove('items');
      
      saleMap['createdAt'] = now;
      saleMap['updatedAt'] = now;
      
      // Inserir venda
      await txn.insert(
        DatabaseHelper.tableSales,
        saleMap,
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
      
      // Inserir itens da venda
      for (var item in sale.items) {
        final itemModel = item as SaleItemModel;
        final itemMap = itemModel.toMap();
        itemMap['createdAt'] = now;
        
        await txn.insert(
          DatabaseHelper.tableSaleItems,
          itemMap,
          conflictAlgorithm: ConflictAlgorithm.replace,
        );
        
        // Atualizar estoque do produto se houver ID do produto
        if (itemModel.productId != null) {
          // Obter produto
          final productMaps = await txn.query(
            DatabaseHelper.tableProducts,
            where: 'id = ?',
            whereArgs: [itemModel.productId],
          );
          
          if (productMaps.isNotEmpty) {
            final product = productMaps.first;
            final currentQuantity = product['quantity'] as int;
            final currentSold = product['sold'] as int;
            
            // Atualizar quantidade e vendidos
            await txn.update(
              DatabaseHelper.tableProducts,
              {
                'quantity': currentQuantity - itemModel.quantity,
                'sold': currentSold + itemModel.quantity,
                'updatedAt': now,
              },
              where: 'id = ?',
              whereArgs: [itemModel.productId],
            );
          }
        }
      }
      
      return sale.id;
    });
  }

  @override
  Future<void> deleteSale(String id) async {
    final db = await dbHelper.database;
    
    // Iniciar transação
    await db.transaction((txn) async {
      // Obter itens da venda
      final itemMaps = await txn.query(
        DatabaseHelper.tableSaleItems,
        where: 'saleId = ?',
        whereArgs: [id],
      );
      
      // Restaurar estoque dos produtos
      for (var itemMap in itemMaps) {
        final productId = itemMap['productId'];
        if (productId != null) {
          final quantity = itemMap['quantity'] as int;
          
          // Obter produto
          final productMaps = await txn.query(
            DatabaseHelper.tableProducts,
            where: 'id = ?',
            whereArgs: [productId],
          );
          
          if (productMaps.isNotEmpty) {
            final product = productMaps.first;
            final currentQuantity = product['quantity'] as int;
            final currentSold = product['sold'] as int;
            
            // Atualizar quantidade e vendidos
            await txn.update(
              DatabaseHelper.tableProducts,
              {
                'quantity': currentQuantity + quantity,
                'sold': currentSold - quantity,
                'updatedAt': DateTime.now().toIso8601String(),
              },
              where: 'id = ?',
              whereArgs: [productId],
            );
          }
        }
      }
      
      // Excluir itens da venda (a restrição ON DELETE CASCADE faria isso automaticamente,
      // mas estamos fazendo explicitamente para garantir)
      await txn.delete(
        DatabaseHelper.tableSaleItems,
        where: 'saleId = ?',
        whereArgs: [id],
      );
      
      // Excluir venda
      await txn.delete(
        DatabaseHelper.tableSales,
        where: 'id = ?',
        whereArgs: [id],
      );
    });
  }

  @override
  Future<List<SaleModel>> getSalesByDateRange(DateTime startDate, DateTime endDate) async {
    final db = await dbHelper.database;
    
    // Converter datas para formato ISO
    final startDateStr = startDate.toIso8601String().split('T')[0];
    final endDateStr = endDate.toIso8601String().split('T')[0];
    
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableSales,
      where: 'date >= ? AND date <= ?',
      whereArgs: [startDateStr, endDateStr],
      orderBy: 'date DESC',
    );

    return await _getSalesWithItems(maps);
  }

  @override
  Future<List<SaleModel>> getSalesByClient(String clientId) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableSales,
      where: 'clientId = ?',
      whereArgs: [clientId],
      orderBy: 'date DESC',
    );

    return await _getSalesWithItems(maps);
  }

  @override
  Future<List<SaleModel>> getSalesByPaymentMethod(String paymentMethod) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableSales,
      where: 'paymentMethod = ?',
      whereArgs: [paymentMethod],
      orderBy: 'date DESC',
    );

    return await _getSalesWithItems(maps);
  }

  @override
  Future<List<SaleModel>> searchSales(String query) async {
    final db = await dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      DatabaseHelper.tableSales,
      where: 'clientName LIKE ? OR clientDocument LIKE ?',
      whereArgs: ['%$query%', '%$query%'],
      orderBy: 'date DESC',
    );

    return await _getSalesWithItems(maps);
  }

  // Método auxiliar para obter itens de vendas
  Future<List<SaleModel>> _getSalesWithItems(List<Map<String, dynamic>> saleMaps) async {
    final db = await dbHelper.database;
    final List<SaleModel> sales = [];

    for (var saleMap in saleMaps) {
      final saleId = saleMap['id'];
      
      // Obter itens da venda
      final List<Map<String, dynamic>> itemMaps = await db.query(
        DatabaseHelper.tableSaleItems,
        where: 'saleId = ?',
        whereArgs: [saleId],
      );
      
      // Converter mapas para modelos
      final List<SaleItemModel> items = itemMaps.map((itemMap) {
        return SaleItemModel.fromMap(itemMap);
      }).toList();
      
      // Criar modelo de venda com itens
      final sale = SaleModel.fromMap(saleMap);
      
      // Adicionar à lista
      sales.add(
        SaleModel(
          id: sale.id,
          date: sale.date,
          time: sale.time,
          total: sale.total,
          paymentMethod: sale.paymentMethod,
          clientId: sale.clientId,
          clientName: sale.clientName,
          clientDocument: sale.clientDocument,
          items: items,
        ),
      );
    }

    return sales;
  }
}
```

## Repositório de Produtos (data/repositories/product_repository_impl.dart)

```dart
import 'package:dartz/dartz.dart';
import '../../domain/entities/product.dart';
import '../../domain/repositories/product_repository.dart';
import '../datasources/local/product_local_datasource.dart';
import '../models/product_model.dart';
import '../../core/errors/failures.dart';
import '../../core/errors/exceptions.dart';

class ProductRepositoryImpl implements ProductRepository {
  final ProductLocalDataSource localDataSource;

  ProductRepositoryImpl({required this.localDataSource});

  @override
  Future<Either<Failure, List<Product>>> getProducts() async {
    try {
      final products = await localDataSource.getProducts();
      return Right(products);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao obter produtos: ${e.toString()}'));
    }
  }

  @override
  Future<Either<Failure, Product>> getProductById(String id) async {
    try {
      final product = await localDataSource.getProductById(id);
      return Right(product);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao obter produto: ${e.toString()}'));
    }
  }

  @override
  Future<Either<Failure, String>> addProduct(Product product) async {
    try {
      final productModel = ProductModel(
        id: product.id,
        description: product.description,
        itemDescription: product.itemDescription,
        price: product.price,
        quantity: product.quantity,
        sold: product.sold,
        category: product.category,
        image: product.image,
        mediaType: product.mediaType,
        additionalImages: product.additionalImages,
        additionalMediaTypes: product.additionalMediaTypes,
        sku: product.sku,
        gtin: product.gtin,
        ncm: product.ncm,
        weight: product.weight,
        expirationDate: product.expirationDate,
        checked: product.checked,
        vendorId: product.vendorId,
      );
      
      final id = await localDataSource.addProduct(productModel);
      return Right(id);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao adicionar produto: ${e.toString()}'));
    }
  }

  @override
  Future<Either<Failure, void>> updateProduct(Product product) async {
    try {
      final productModel = ProductModel(
        id: product.id,
        description: product.description,
        itemDescription: product.itemDescription,
        price: product.price,
        quantity: product.quantity,
        sold: product.sold,
        category: product.category,
        image: product.image,
        mediaType: product.mediaType,
        additionalImages: product.additionalImages,
        additionalMediaTypes: product.additionalMediaTypes,
        sku: product.sku,
        gtin: product.gtin,
        ncm: product.ncm,
        weight: product.weight,
        expirationDate: product.expirationDate,
        checked: product.checked,
        vendorId: product.vendorId,
      );
      
      await localDataSource.updateProduct(productModel);
      return const Right(null);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao atualizar produto: ${e.toString()}'));
    }
  }

  @override
  Future<Either<Failure, void>> deleteProduct(String id) async {
    try {
      await localDataSource.deleteProduct(id);
      return const Right(null);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao excluir produto: ${e.toString()}'));
    }
  }

  @override
  Future<Either<Failure, List<Product>>> getProductsByCategory(String category) async {
    try {
      final products = await localDataSource.getProductsByCategory(category);
      return Right(products);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao obter produtos por categoria: ${e.toString()}'));
    }
  }

  @override
  Future<Either<Failure, List<Product>>> searchProducts(String query) async {
    try {
      final products = await localDataSource.searchProducts(query);
      return Right(products);
    } catch (e) {
      return Left(DatabaseFailure('Erro ao buscar produtos: ${e.toString()}'));
    }
  }
}
```
