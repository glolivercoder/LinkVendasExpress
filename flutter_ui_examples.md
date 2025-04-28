# Exemplos de UI para LinkVendasExpress Flutter

## Dashboard (presentation/pages/dashboard/dashboard_page.dart)

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../core/theme/app_theme.dart';
import '../../blocs/product/product_bloc.dart';
import '../../blocs/sale/sale_bloc.dart';
import '../../widgets/app_drawer.dart';
import '../../widgets/custom_app_bar.dart';
import 'widgets/sales_summary_card.dart';
import 'widgets/stock_alert_card.dart';
import 'widgets/recent_sales_list.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  @override
  void initState() {
    super.initState();
    context.read<ProductBloc>().add(LoadProducts());
    context.read<SaleBloc>().add(LoadSales());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Dashboard',
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              context.read<ProductBloc>().add(LoadProducts());
              context.read<SaleBloc>().add(LoadSales());
            },
          ),
        ],
      ),
      drawer: const AppDrawer(),
      body: RefreshIndicator(
        onRefresh: () async {
          context.read<ProductBloc>().add(LoadProducts());
          context.read<SaleBloc>().add(LoadSales());
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: EdgeInsets.all(16.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Resumo',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              SizedBox(height: 16.h),
              BlocBuilder<SaleBloc, SaleState>(
                builder: (context, state) {
                  if (state is SalesLoaded) {
                    return SalesSummaryCard(sales: state.sales);
                  }
                  return const SalesSummaryCard(sales: []);
                },
              ),
              SizedBox(height: 24.h),
              Text(
                'Alertas de Estoque',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              SizedBox(height: 16.h),
              BlocBuilder<ProductBloc, ProductState>(
                builder: (context, state) {
                  if (state is ProductsLoaded) {
                    final lowStockProducts = state.products
                        .where((product) => product.quantity < 5)
                        .toList();
                    return StockAlertCard(products: lowStockProducts);
                  }
                  return const StockAlertCard(products: []);
                },
              ),
              SizedBox(height: 24.h),
              Text(
                'Vendas Recentes',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              SizedBox(height: 16.h),
              BlocBuilder<SaleBloc, SaleState>(
                builder: (context, state) {
                  if (state is SalesLoaded) {
                    return RecentSalesList(sales: state.sales.take(5).toList());
                  } else if (state is SaleLoading) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (state is SaleError) {
                    return Center(child: Text(state.message));
                  }
                  return const Center(child: Text('Nenhuma venda recente'));
                },
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/sales/add');
        },
        child: const Icon(Icons.add_shopping_cart),
        tooltip: 'Nova Venda',
      ),
    );
  }
}
```

## Inventário (presentation/pages/inventory/inventory_page.dart)

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../domain/entities/product.dart';
import '../../blocs/product/product_bloc.dart';
import '../../widgets/app_drawer.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/search_bar.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/loading_indicator.dart';
import '../../widgets/error_message.dart';
import 'widgets/product_list_item.dart';
import 'widgets/category_filter.dart';

class InventoryPage extends StatefulWidget {
  const InventoryPage({Key? key}) : super(key: key);

  @override
  State<InventoryPage> createState() => _InventoryPageState();
}

class _InventoryPageState extends State<InventoryPage> {
  String _searchQuery = '';
  String _selectedCategory = 'Todos';
  List<Product> _filteredProducts = [];

  @override
  void initState() {
    super.initState();
    context.read<ProductBloc>().add(LoadProducts());
  }

  void _filterProducts(List<Product> products) {
    setState(() {
      _filteredProducts = products.where((product) {
        // Filtrar por categoria
        final categoryMatch = _selectedCategory == 'Todos' || 
                             product.category == _selectedCategory;
        
        // Filtrar por busca
        final searchMatch = _searchQuery.isEmpty || 
                           product.description.toLowerCase().contains(_searchQuery.toLowerCase()) ||
                           (product.sku?.toLowerCase().contains(_searchQuery.toLowerCase()) ?? false);
        
        return categoryMatch && searchMatch;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Estoque',
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              context.read<ProductBloc>().add(LoadProducts());
            },
          ),
        ],
      ),
      drawer: const AppDrawer(),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(16.w),
            child: Row(
              children: [
                Expanded(
                  child: CustomSearchBar(
                    hintText: 'Buscar produtos...',
                    onChanged: (value) {
                      setState(() {
                        _searchQuery = value;
                      });
                      
                      // Atualizar filtro quando o BLoC tiver produtos carregados
                      final state = context.read<ProductBloc>().state;
                      if (state is ProductsLoaded) {
                        _filterProducts(state.products);
                      }
                    },
                  ),
                ),
                SizedBox(width: 8.w),
                IconButton(
                  icon: const Icon(Icons.filter_list),
                  onPressed: () {
                    // Mostrar modal de filtros avançados
                  },
                ),
              ],
            ),
          ),
          BlocBuilder<ProductBloc, ProductState>(
            builder: (context, state) {
              if (state is ProductsLoaded) {
                final categories = ['Todos', ...state.products
                    .map((product) => product.category)
                    .toSet()
                    .toList()];
                
                // Atualizar produtos filtrados quando o estado mudar
                if (_filteredProducts.isEmpty) {
                  _filterProducts(state.products);
                }
                
                return CategoryFilter(
                  categories: categories,
                  selectedCategory: _selectedCategory,
                  onCategorySelected: (category) {
                    setState(() {
                      _selectedCategory = category;
                    });
                    _filterProducts(state.products);
                  },
                );
              }
              return const SizedBox.shrink();
            },
          ),
          Expanded(
            child: BlocBuilder<ProductBloc, ProductState>(
              builder: (context, state) {
                if (state is ProductLoading) {
                  return const LoadingIndicator();
                } else if (state is ProductsLoaded) {
                  if (_filteredProducts.isEmpty) {
                    return EmptyState(
                      icon: Icons.inventory,
                      message: 'Nenhum produto encontrado',
                      buttonText: 'Adicionar Produto',
                      onButtonPressed: () {
                        Navigator.pushNamed(context, '/inventory/add');
                      },
                    );
                  }
                  
                  return ListView.builder(
                    padding: EdgeInsets.all(16.w),
                    itemCount: _filteredProducts.length,
                    itemBuilder: (context, index) {
                      final product = _filteredProducts[index];
                      return ProductListItem(
                        product: product,
                        onTap: () {
                          Navigator.pushNamed(
                            context, 
                            '/inventory/edit',
                            arguments: product,
                          );
                        },
                        onDelete: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text('Confirmar exclusão'),
                              content: Text('Deseja realmente excluir o produto "${product.description}"?'),
                              actions: [
                                TextButton(
                                  onPressed: () => Navigator.pop(context),
                                  child: const Text('Cancelar'),
                                ),
                                TextButton(
                                  onPressed: () {
                                    Navigator.pop(context);
                                    context.read<ProductBloc>().add(DeleteProduct(product.id));
                                  },
                                  child: const Text('Excluir'),
                                ),
                              ],
                            ),
                          );
                        },
                      );
                    },
                  );
                } else if (state is ProductError) {
                  return ErrorMessage(
                    message: state.message,
                    onRetry: () {
                      context.read<ProductBloc>().add(LoadProducts());
                    },
                  );
                }
                return const EmptyState(
                  icon: Icons.inventory,
                  message: 'Nenhum produto encontrado',
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/inventory/add');
        },
        child: const Icon(Icons.add),
        tooltip: 'Adicionar Produto',
      ),
    );
  }
}
```

## Formulário de Produto (presentation/pages/inventory/add_product_page.dart)

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:uuid/uuid.dart';
import '../../../domain/entities/product.dart';
import '../../blocs/product/product_bloc.dart';
import '../../widgets/custom_app_bar.dart';

class AddProductPage extends StatefulWidget {
  const AddProductPage({Key? key}) : super(key: key);

  @override
  State<AddProductPage> createState() => _AddProductPageState();
}

class _AddProductPageState extends State<AddProductPage> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final _itemDescriptionController = TextEditingController();
  final _priceController = TextEditingController();
  final _quantityController = TextEditingController();
  final _categoryController = TextEditingController();
  final _skuController = TextEditingController();
  final _gtinController = TextEditingController();
  final _ncmController = TextEditingController();
  final _weightController = TextEditingController();
  
  String? _selectedCategory;
  List<String> _categories = ['Todos'];
  
  @override
  void initState() {
    super.initState();
    
    // Carregar categorias existentes
    final state = context.read<ProductBloc>().state;
    if (state is ProductsLoaded) {
      _categories = ['Todos', ...state.products
          .map((product) => product.category)
          .toSet()
          .toList()];
    }
  }
  
  @override
  void dispose() {
    _descriptionController.dispose();
    _itemDescriptionController.dispose();
    _priceController.dispose();
    _quantityController.dispose();
    _categoryController.dispose();
    _skuController.dispose();
    _gtinController.dispose();
    _ncmController.dispose();
    _weightController.dispose();
    super.dispose();
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Gerar ID único
      final id = const Uuid().v4();
      
      // Criar produto
      final product = Product(
        id: id,
        description: _descriptionController.text,
        itemDescription: _itemDescriptionController.text,
        price: double.parse(_priceController.text),
        quantity: int.parse(_quantityController.text),
        sold: 0,
        category: _selectedCategory ?? _categoryController.text,
        sku: _skuController.text,
        gtin: _gtinController.text,
        ncm: _ncmController.text,
        weight: _weightController.text.isNotEmpty 
            ? double.parse(_weightController.text) 
            : null,
      );
      
      // Adicionar produto
      context.read<ProductBloc>().add(AddProduct(product));
      
      // Mostrar snackbar
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Produto adicionado com sucesso!'),
          backgroundColor: Colors.green,
        ),
      );
      
      // Voltar para a tela anterior
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Adicionar Produto',
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: _submitForm,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.w),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Informações Básicas',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              SizedBox(height: 16.h),
              TextFormField(
                controller: _descriptionController,
                decoration: const InputDecoration(
                  labelText: 'Descrição',
                  hintText: 'Digite a descrição do produto',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, digite a descrição';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16.h),
              TextFormField(
                controller: _itemDescriptionController,
                decoration: const InputDecoration(
                  labelText: 'Descrição Detalhada',
                  hintText: 'Digite a descrição detalhada do produto',
                ),
                maxLines: 3,
              ),
              SizedBox(height: 16.h),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _priceController,
                      decoration: const InputDecoration(
                        labelText: 'Preço',
                        hintText: '0.00',
                        prefixText: 'R\$ ',
                      ),
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Digite o preço';
                        }
                        if (double.tryParse(value) == null) {
                          return 'Preço inválido';
                        }
                        return null;
                      },
                    ),
                  ),
                  SizedBox(width: 16.w),
                  Expanded(
                    child: TextFormField(
                      controller: _quantityController,
                      decoration: const InputDecoration(
                        labelText: 'Quantidade',
                        hintText: '0',
                      ),
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Digite a quantidade';
                        }
                        if (int.tryParse(value) == null) {
                          return 'Quantidade inválida';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16.h),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Categoria',
                ),
                value: _selectedCategory,
                items: _categories.map((category) {
                  return DropdownMenuItem<String>(
                    value: category == 'Todos' ? null : category,
                    child: Text(category),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedCategory = value;
                  });
                },
                hint: const Text('Selecione uma categoria'),
              ),
              SizedBox(height: 8.h),
              if (_selectedCategory == null)
                TextFormField(
                  controller: _categoryController,
                  decoration: const InputDecoration(
                    labelText: 'Nova Categoria',
                    hintText: 'Digite o nome da nova categoria',
                  ),
                ),
              SizedBox(height: 24.h),
              Text(
                'Informações Adicionais',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              SizedBox(height: 16.h),
              TextFormField(
                controller: _skuController,
                decoration: const InputDecoration(
                  labelText: 'SKU',
                  hintText: 'Digite o código SKU',
                ),
              ),
              SizedBox(height: 16.h),
              TextFormField(
                controller: _gtinController,
                decoration: const InputDecoration(
                  labelText: 'GTIN/EAN',
                  hintText: 'Digite o código de barras',
                ),
              ),
              SizedBox(height: 16.h),
              TextFormField(
                controller: _ncmController,
                decoration: const InputDecoration(
                  labelText: 'NCM',
                  hintText: 'Digite o código NCM',
                ),
              ),
              SizedBox(height: 16.h),
              TextFormField(
                controller: _weightController,
                decoration: const InputDecoration(
                  labelText: 'Peso (kg)',
                  hintText: '0.00',
                ),
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 32.h),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _submitForm,
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 16.h),
                  ),
                  child: Text(
                    'Salvar Produto',
                    style: TextStyle(fontSize: 16.sp),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```
