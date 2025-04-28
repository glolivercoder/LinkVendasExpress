# LinkVendasExpress Flutter

Aplicativo de gerenciamento de estoque e vendas desenvolvido em Flutter.

## Visão Geral

O LinkVendasExpress Flutter é uma versão reescrita do aplicativo original LinkVendasExpress, mantendo todas as funcionalidades existentes, mas com um código mais limpo, modular e eficiente. O aplicativo permite gerenciar estoque, vendas, clientes e fornecedores, além de gerar relatórios e sincronizar dados com WordPress/WooCommerce.

## Funcionalidades Principais

- **Gerenciamento de Estoque**: Cadastro, edição e exclusão de produtos
- **Gerenciamento de Vendas**: Registro de vendas, histórico e relatórios
- **Gerenciamento de Clientes**: Cadastro e histórico de clientes
- **Gerenciamento de Fornecedores**: Cadastro de fornecedores
- **Relatórios e Dashboards**: Visualização de dados de vendas e estoque
- **Integração com WordPress/WooCommerce**: Sincronização de produtos
- **Temas Claro e Escuro**: Suporte a diferentes temas
- **Backup e Restauração**: Exportação e importação de dados

## Documentação

A documentação completa do projeto está disponível nos seguintes arquivos:

- [Análise e Plano de Implementação](LINKVENDASEXPRESSFLUTTER.md): Documento principal com análise do aplicativo atual e plano para recriar em Flutter
- [Estrutura do Projeto](flutter_project_structure.md): Estrutura de pastas e arquivos do projeto Flutter
- [Configuração do Ambiente](flutter_setup_instructions.md): Instruções para configurar o ambiente de desenvolvimento
- [Exemplos de Modelos de Dados](flutter_models_example.md): Implementação dos modelos de dados
- [Exemplo de Banco de Dados](flutter_database_example.md): Implementação do banco de dados SQLite
- [Exemplos de UI](flutter_ui_examples.md): Implementação de telas e componentes

## Capturas de Tela

As capturas de tela do aplicativo original estão disponíveis na pasta [screenshots](screenshots/). Estas capturas servem como referência para a implementação da interface do usuário no Flutter.

## Requisitos

- Flutter SDK 3.19.0 ou superior
- Dart SDK 3.3.0 ou superior
- Android Studio ou VS Code com plugins Flutter e Dart
- Dispositivo Android ou iOS para testes

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/linkvendas-express-flutter.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd linkvendas-express-flutter
   ```

3. Instale as dependências:
   ```bash
   flutter pub get
   ```

4. Execute o aplicativo:
   ```bash
   flutter run
   ```

## Arquitetura

O projeto segue a arquitetura Clean Architecture com as seguintes camadas:

- **Presentation**: UI, Widgets, Pages, ViewModels
- **Domain**: Entidades, Casos de Uso, Interfaces de Repositório
- **Data**: Implementações de Repositório, Fontes de Dados, APIs

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
