# Estrutura do Projeto Flutter - LinkVendasExpress

Este documento descreve a estrutura inicial do projeto Flutter para o LinkVendasExpress.

## Arquivos Iniciais

```
linkvendas_express_flutter/
├── android/                  # Configurações específicas do Android
├── ios/                      # Configurações específicas do iOS
├── lib/                      # Código-fonte principal
│   ├── core/                 # Código central e utilitários
│   │   ├── constants/        # Constantes da aplicação
│   │   │   ├── app_constants.dart
│   │   │   ├── api_constants.dart
│   │   │   └── theme_constants.dart
│   │   ├── errors/           # Classes de erro
│   │   │   ├── exceptions.dart
│   │   │   └── failures.dart
│   │   ├── network/          # Configuração de rede
│   │   │   ├── api_client.dart
│   │   │   └── network_info.dart
│   │   ├── theme/            # Temas e estilos
│   │   │   ├── app_theme.dart
│   │   │   ├── light_theme.dart
│   │   │   └── dark_theme.dart
│   │   └── utils/            # Funções utilitárias
│   │       ├── date_utils.dart
│   │       ├── string_utils.dart
│   │       └── currency_utils.dart
│   ├── data/                 # Camada de dados
│   │   ├── datasources/      # Fontes de dados (local, remoto)
│   │   │   ├── local/
│   │   │   │   ├── database_helper.dart
│   │   │   │   ├── product_local_datasource.dart
│   │   │   │   ├── client_local_datasource.dart
│   │   │   │   ├── vendor_local_datasource.dart
│   │   │   │   └── sale_local_datasource.dart
│   │   │   └── remote/
│   │   │       ├── wordpress_api.dart
│   │   │       └── product_remote_datasource.dart
│   │   ├── models/           # Modelos de dados
│   │   │   ├── product_model.dart
│   │   │   ├── client_model.dart
│   │   │   ├── vendor_model.dart
│   │   │   ├── sale_model.dart
│   │   │   └── sale_item_model.dart
│   │   └── repositories/     # Implementações de repositórios
│   │       ├── product_repository_impl.dart
│   │       ├── client_repository_impl.dart
│   │       ├── vendor_repository_impl.dart
│   │       └── sale_repository_impl.dart
│   ├── domain/               # Regras de negócio
│   │   ├── entities/         # Entidades de domínio
│   │   │   ├── product.dart
│   │   │   ├── client.dart
│   │   │   ├── vendor.dart
│   │   │   ├── sale.dart
│   │   │   └── sale_item.dart
│   │   ├── repositories/     # Interfaces de repositório
│   │   │   ├── product_repository.dart
│   │   │   ├── client_repository.dart
│   │   │   ├── vendor_repository.dart
│   │   │   └── sale_repository.dart
│   │   └── usecases/         # Casos de uso
│   │       ├── product/
│   │       │   ├── get_products.dart
│   │       │   ├── add_product.dart
│   │       │   ├── update_product.dart
│   │       │   └── delete_product.dart
│   │       ├── client/
│   │       │   ├── get_clients.dart
│   │       │   ├── add_client.dart
│   │       │   └── update_client.dart
│   │       ├── vendor/
│   │       │   ├── get_vendors.dart
│   │       │   └── add_vendor.dart
│   │       └── sale/
│   │           ├── add_sale.dart
│   │           └── get_sales.dart
│   ├── presentation/         # Interface do usuário
│   │   ├── blocs/            # Gerenciadores de estado (Bloc/Cubit)
│   │   │   ├── product/
│   │   │   │   ├── product_bloc.dart
│   │   │   │   ├── product_event.dart
│   │   │   │   └── product_state.dart
│   │   │   ├── client/
│   │   │   │   ├── client_bloc.dart
│   │   │   │   ├── client_event.dart
│   │   │   │   └── client_state.dart
│   │   │   ├── vendor/
│   │   │   │   ├── vendor_bloc.dart
│   │   │   │   ├── vendor_event.dart
│   │   │   │   └── vendor_state.dart
│   │   │   └── sale/
│   │   │       ├── sale_bloc.dart
│   │   │       ├── sale_event.dart
│   │   │       └── sale_state.dart
│   │   ├── pages/            # Telas da aplicação
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard_page.dart
│   │   │   │   ├── widgets/
│   │   │   │   │   ├── sales_summary_card.dart
│   │   │   │   │   ├── stock_alert_card.dart
│   │   │   │   │   └── recent_sales_list.dart
│   │   │   ├── inventory/
│   │   │   │   ├── inventory_page.dart
│   │   │   │   ├── add_product_page.dart
│   │   │   │   ├── edit_product_page.dart
│   │   │   │   └── widgets/
│   │   │   │       ├── product_list_item.dart
│   │   │   │       └── category_filter.dart
│   │   │   ├── sales/
│   │   │   │   ├── sales_page.dart
│   │   │   │   ├── add_sale_page.dart
│   │   │   │   ├── sale_history_page.dart
│   │   │   │   └── widgets/
│   │   │   │       ├── product_selector.dart
│   │   │   │       ├── client_selector.dart
│   │   │   │       └── payment_method_selector.dart
│   │   │   ├── clients/
│   │   │   │   ├── clients_page.dart
│   │   │   │   ├── add_client_page.dart
│   │   │   │   ├── edit_client_page.dart
│   │   │   │   └── widgets/
│   │   │   │       ├── client_list_item.dart
│   │   │   │       └── client_details_card.dart
│   │   │   ├── vendors/
│   │   │   │   ├── vendors_page.dart
│   │   │   │   ├── add_vendor_page.dart
│   │   │   │   └── edit_vendor_page.dart
│   │   │   ├── reports/
│   │   │   │   ├── reports_page.dart
│   │   │   │   ├── sales_report_page.dart
│   │   │   │   └── inventory_report_page.dart
│   │   │   └── settings/
│   │   │       ├── settings_page.dart
│   │   │       ├── theme_settings_page.dart
│   │   │       ├── backup_page.dart
│   │   │       └── wordpress_settings_page.dart
│   │   └── widgets/          # Widgets reutilizáveis
│   │       ├── app_drawer.dart
│   │       ├── custom_app_bar.dart
│   │       ├── product_card.dart
│   │       ├── search_bar.dart
│   │       ├── confirmation_dialog.dart
│   │       ├── loading_indicator.dart
│   │       ├── error_message.dart
│   │       ├── empty_state.dart
│   │       └── responsive_widgets.dart
│   ├── di/                   # Injeção de dependências
│   │   └── injection_container.dart
│   └── main.dart             # Ponto de entrada da aplicação
├── test/                     # Testes unitários e de integração
├── pubspec.yaml              # Dependências do projeto
└── README.md                 # Documentação do projeto
```

## Arquivos Principais

### main.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'di/injection_container.dart' as di;
import 'core/theme/app_theme.dart';
import 'presentation/pages/dashboard/dashboard_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(360, 690),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp(
          title: 'LinkVendas Express',
          theme: AppTheme.lightTheme(),
          darkTheme: AppTheme.darkTheme(),
          themeMode: ThemeMode.system,
          home: child,
          debugShowCheckedModeBanner: false,
        );
      },
      child: DashboardPage(),
    );
  }
}
```

### pubspec.yaml

```yaml
name: linkvendas_express
description: Aplicativo de gerenciamento de estoque e vendas

publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: ">=2.17.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  
  # Gerenciamento de Estado
  flutter_bloc: ^8.1.3
  provider: ^6.0.5
  equatable: ^2.0.5
  
  # Armazenamento Local
  sqflite: ^2.3.0
  shared_preferences: ^2.2.2
  path_provider: ^2.1.1
  
  # UI/UX
  flutter_screenutil: ^5.9.0
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  flutter_slidable: ^3.0.1
  
  # Formulários e Validação
  form_field_validator: ^1.1.0
  intl: ^0.18.1
  
  # Gráficos e Relatórios
  fl_chart: ^0.65.0
  pdf: ^3.10.7
  printing: ^5.11.1
  
  # Integração com APIs
  dio: ^5.3.3
  retrofit: ^4.0.3
  
  # Utilitários
  get_it: ^7.6.4
  dartz: ^0.10.1
  flutter_dotenv: ^5.1.0
  permission_handler: ^11.0.1
  
  # Outros
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.6
  retrofit_generator: ^8.0.4
  mockito: ^5.4.2
  bloc_test: ^9.1.4

flutter:
  uses-material-design: true
  
  assets:
    - assets/images/
    - assets/icons/
    - .env
```

## Próximos Passos

1. Configurar o ambiente de desenvolvimento Flutter
2. Criar o projeto usando o comando `flutter create`
3. Substituir os arquivos gerados pela estrutura proposta
4. Implementar os modelos de dados
5. Configurar o banco de dados local
6. Implementar os repositórios
7. Desenvolver os BLoCs para gerenciamento de estado
8. Criar as telas principais
9. Implementar a navegação
10. Adicionar temas e estilos
11. Implementar a integração com WordPress/WooCommerce
12. Testar e otimizar
