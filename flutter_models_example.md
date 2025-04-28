# Exemplos de Modelos de Dados para LinkVendasExpress Flutter

Este documento contém exemplos de implementação dos modelos de dados para o projeto LinkVendasExpress em Flutter.

## Produto (Product)

### Entidade de Domínio (domain/entities/product.dart)

```dart
import 'package:equatable/equatable.dart';

class Product extends Equatable {
  final String id;
  final String description;
  final String? itemDescription;
  final double price;
  final int quantity;
  final int sold;
  final String category;
  final String? image;
  final String? mediaType;
  final List<String>? additionalImages;
  final List<String>? additionalMediaTypes;
  final String? sku;
  final String? gtin;
  final String? ncm;
  final double? weight;
  final DateTime? expirationDate;
  final bool checked;
  final String? vendorId;

  const Product({
    required this.id,
    required this.description,
    this.itemDescription,
    required this.price,
    required this.quantity,
    required this.sold,
    required this.category,
    this.image,
    this.mediaType = 'image',
    this.additionalImages = const [],
    this.additionalMediaTypes = const [],
    this.sku,
    this.gtin,
    this.ncm,
    this.weight,
    this.expirationDate,
    this.checked = false,
    this.vendorId,
  });

  @override
  List<Object?> get props => [
        id,
        description,
        itemDescription,
        price,
        quantity,
        sold,
        category,
        image,
        mediaType,
        additionalImages,
        additionalMediaTypes,
        sku,
        gtin,
        ncm,
        weight,
        expirationDate,
        checked,
        vendorId,
      ];
}
```

### Modelo de Dados (data/models/product_model.dart)

```dart
import 'dart:convert';
import '../../domain/entities/product.dart';

class ProductModel extends Product {
  const ProductModel({
    required String id,
    required String description,
    String? itemDescription,
    required double price,
    required int quantity,
    required int sold,
    required String category,
    String? image,
    String? mediaType,
    List<String>? additionalImages,
    List<String>? additionalMediaTypes,
    String? sku,
    String? gtin,
    String? ncm,
    double? weight,
    DateTime? expirationDate,
    bool checked = false,
    String? vendorId,
  }) : super(
          id: id,
          description: description,
          itemDescription: itemDescription,
          price: price,
          quantity: quantity,
          sold: sold,
          category: category,
          image: image,
          mediaType: mediaType,
          additionalImages: additionalImages,
          additionalMediaTypes: additionalMediaTypes,
          sku: sku,
          gtin: gtin,
          ncm: ncm,
          weight: weight,
          expirationDate: expirationDate,
          checked: checked,
          vendorId: vendorId,
        );

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'],
      description: json['description'],
      itemDescription: json['itemDescription'],
      price: json['price'].toDouble(),
      quantity: json['quantity'],
      sold: json['sold'] ?? 0,
      category: json['category'] ?? 'Todos',
      image: json['image'],
      mediaType: json['mediaType'] ?? 'image',
      additionalImages: json['additionalImages'] != null
          ? List<String>.from(jsonDecode(json['additionalImages']))
          : [],
      additionalMediaTypes: json['additionalMediaTypes'] != null
          ? List<String>.from(jsonDecode(json['additionalMediaTypes']))
          : [],
      sku: json['sku'],
      gtin: json['gtin'],
      ncm: json['ncm'],
      weight: json['weight'] != null ? json['weight'].toDouble() : null,
      expirationDate: json['expirationDate'] != null
          ? DateTime.parse(json['expirationDate'])
          : null,
      checked: json['checked'] == 1,
      vendorId: json['vendorId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'itemDescription': itemDescription,
      'price': price,
      'quantity': quantity,
      'sold': sold,
      'category': category,
      'image': image,
      'mediaType': mediaType,
      'additionalImages': additionalImages != null && additionalImages!.isNotEmpty
          ? jsonEncode(additionalImages)
          : null,
      'additionalMediaTypes': additionalMediaTypes != null && additionalMediaTypes!.isNotEmpty
          ? jsonEncode(additionalMediaTypes)
          : null,
      'sku': sku,
      'gtin': gtin,
      'ncm': ncm,
      'weight': weight,
      'expirationDate': expirationDate?.toIso8601String(),
      'checked': checked ? 1 : 0,
      'vendorId': vendorId,
    };
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'description': description,
      'itemDescription': itemDescription,
      'price': price,
      'quantity': quantity,
      'sold': sold,
      'category': category,
      'image': image,
      'mediaType': mediaType,
      'additionalImages': additionalImages != null && additionalImages!.isNotEmpty
          ? jsonEncode(additionalImages)
          : null,
      'additionalMediaTypes': additionalMediaTypes != null && additionalMediaTypes!.isNotEmpty
          ? jsonEncode(additionalMediaTypes)
          : null,
      'sku': sku,
      'gtin': gtin,
      'ncm': ncm,
      'weight': weight,
      'expirationDate': expirationDate?.toIso8601String(),
      'checked': checked ? 1 : 0,
      'vendorId': vendorId,
    };
  }

  factory ProductModel.fromMap(Map<String, dynamic> map) {
    return ProductModel(
      id: map['id'],
      description: map['description'],
      itemDescription: map['itemDescription'],
      price: map['price'].toDouble(),
      quantity: map['quantity'],
      sold: map['sold'] ?? 0,
      category: map['category'] ?? 'Todos',
      image: map['image'],
      mediaType: map['mediaType'] ?? 'image',
      additionalImages: map['additionalImages'] != null
          ? List<String>.from(jsonDecode(map['additionalImages']))
          : [],
      additionalMediaTypes: map['additionalMediaTypes'] != null
          ? List<String>.from(jsonDecode(map['additionalMediaTypes']))
          : [],
      sku: map['sku'],
      gtin: map['gtin'],
      ncm: map['ncm'],
      weight: map['weight'] != null ? map['weight'].toDouble() : null,
      expirationDate: map['expirationDate'] != null
          ? DateTime.parse(map['expirationDate'])
          : null,
      checked: map['checked'] == 1,
      vendorId: map['vendorId'],
    );
  }

  ProductModel copyWith({
    String? id,
    String? description,
    String? itemDescription,
    double? price,
    int? quantity,
    int? sold,
    String? category,
    String? image,
    String? mediaType,
    List<String>? additionalImages,
    List<String>? additionalMediaTypes,
    String? sku,
    String? gtin,
    String? ncm,
    double? weight,
    DateTime? expirationDate,
    bool? checked,
    String? vendorId,
  }) {
    return ProductModel(
      id: id ?? this.id,
      description: description ?? this.description,
      itemDescription: itemDescription ?? this.itemDescription,
      price: price ?? this.price,
      quantity: quantity ?? this.quantity,
      sold: sold ?? this.sold,
      category: category ?? this.category,
      image: image ?? this.image,
      mediaType: mediaType ?? this.mediaType,
      additionalImages: additionalImages ?? this.additionalImages,
      additionalMediaTypes: additionalMediaTypes ?? this.additionalMediaTypes,
      sku: sku ?? this.sku,
      gtin: gtin ?? this.gtin,
      ncm: ncm ?? this.ncm,
      weight: weight ?? this.weight,
      expirationDate: expirationDate ?? this.expirationDate,
      checked: checked ?? this.checked,
      vendorId: vendorId ?? this.vendorId,
    );
  }
}
```

## Cliente (Client)

### Entidade de Domínio (domain/entities/client.dart)

```dart
import 'package:equatable/equatable.dart';

class Client extends Equatable {
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

  const Client({
    required this.id,
    required this.name,
    this.rg,
    this.cpf,
    this.document,
    this.fatherName,
    this.motherName,
    this.birthDate,
    this.issueDate,
    this.birthPlace,
    this.whatsapp,
    this.email,
    this.cep,
    this.address,
    this.neighborhood,
    this.city,
    this.state,
  });

  @override
  List<Object?> get props => [
        id,
        name,
        rg,
        cpf,
        document,
        fatherName,
        motherName,
        birthDate,
        issueDate,
        birthPlace,
        whatsapp,
        email,
        cep,
        address,
        neighborhood,
        city,
        state,
      ];
}
```

### Modelo de Dados (data/models/client_model.dart)

```dart
import '../../domain/entities/client.dart';

class ClientModel extends Client {
  const ClientModel({
    required String id,
    required String name,
    String? rg,
    String? cpf,
    String? document,
    String? fatherName,
    String? motherName,
    DateTime? birthDate,
    DateTime? issueDate,
    String? birthPlace,
    String? whatsapp,
    String? email,
    String? cep,
    String? address,
    String? neighborhood,
    String? city,
    String? state,
  }) : super(
          id: id,
          name: name,
          rg: rg,
          cpf: cpf,
          document: document,
          fatherName: fatherName,
          motherName: motherName,
          birthDate: birthDate,
          issueDate: issueDate,
          birthPlace: birthPlace,
          whatsapp: whatsapp,
          email: email,
          cep: cep,
          address: address,
          neighborhood: neighborhood,
          city: city,
          state: state,
        );

  factory ClientModel.fromJson(Map<String, dynamic> json) {
    return ClientModel(
      id: json['id'],
      name: json['name'],
      rg: json['rg'],
      cpf: json['cpf'],
      document: json['document'],
      fatherName: json['fatherName'],
      motherName: json['motherName'],
      birthDate: json['birthDate'] != null
          ? DateTime.parse(json['birthDate'])
          : null,
      issueDate: json['issueDate'] != null
          ? DateTime.parse(json['issueDate'])
          : null,
      birthPlace: json['birthPlace'],
      whatsapp: json['whatsapp'],
      email: json['email'],
      cep: json['cep'],
      address: json['address'],
      neighborhood: json['neighborhood'],
      city: json['city'],
      state: json['state'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'rg': rg,
      'cpf': cpf,
      'document': document,
      'fatherName': fatherName,
      'motherName': motherName,
      'birthDate': birthDate?.toIso8601String(),
      'issueDate': issueDate?.toIso8601String(),
      'birthPlace': birthPlace,
      'whatsapp': whatsapp,
      'email': email,
      'cep': cep,
      'address': address,
      'neighborhood': neighborhood,
      'city': city,
      'state': state,
    };
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'rg': rg,
      'cpf': cpf,
      'document': document,
      'fatherName': fatherName,
      'motherName': motherName,
      'birthDate': birthDate?.toIso8601String(),
      'issueDate': issueDate?.toIso8601String(),
      'birthPlace': birthPlace,
      'whatsapp': whatsapp,
      'email': email,
      'cep': cep,
      'address': address,
      'neighborhood': neighborhood,
      'city': city,
      'state': state,
    };
  }

  factory ClientModel.fromMap(Map<String, dynamic> map) {
    return ClientModel(
      id: map['id'],
      name: map['name'],
      rg: map['rg'],
      cpf: map['cpf'],
      document: map['document'],
      fatherName: map['fatherName'],
      motherName: map['motherName'],
      birthDate: map['birthDate'] != null
          ? DateTime.parse(map['birthDate'])
          : null,
      issueDate: map['issueDate'] != null
          ? DateTime.parse(map['issueDate'])
          : null,
      birthPlace: map['birthPlace'],
      whatsapp: map['whatsapp'],
      email: map['email'],
      cep: map['cep'],
      address: map['address'],
      neighborhood: map['neighborhood'],
      city: map['city'],
      state: map['state'],
    );
  }

  ClientModel copyWith({
    String? id,
    String? name,
    String? rg,
    String? cpf,
    String? document,
    String? fatherName,
    String? motherName,
    DateTime? birthDate,
    DateTime? issueDate,
    String? birthPlace,
    String? whatsapp,
    String? email,
    String? cep,
    String? address,
    String? neighborhood,
    String? city,
    String? state,
  }) {
    return ClientModel(
      id: id ?? this.id,
      name: name ?? this.name,
      rg: rg ?? this.rg,
      cpf: cpf ?? this.cpf,
      document: document ?? this.document,
      fatherName: fatherName ?? this.fatherName,
      motherName: motherName ?? this.motherName,
      birthDate: birthDate ?? this.birthDate,
      issueDate: issueDate ?? this.issueDate,
      birthPlace: birthPlace ?? this.birthPlace,
      whatsapp: whatsapp ?? this.whatsapp,
      email: email ?? this.email,
      cep: cep ?? this.cep,
      address: address ?? this.address,
      neighborhood: neighborhood ?? this.neighborhood,
      city: city ?? this.city,
      state: state ?? this.state,
    );
  }
}
```

## Venda (Sale)

### Entidade de Domínio (domain/entities/sale.dart)

```dart
import 'package:equatable/equatable.dart';
import 'sale_item.dart';

class Sale extends Equatable {
  final String id;
  final DateTime date;
  final String? time;
  final double total;
  final String paymentMethod;
  final String? clientId;
  final String? clientName;
  final String? clientDocument;
  final List<SaleItem> items;

  const Sale({
    required this.id,
    required this.date,
    this.time,
    required this.total,
    required this.paymentMethod,
    this.clientId,
    this.clientName,
    this.clientDocument,
    required this.items,
  });

  String get formattedDate {
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }

  @override
  List<Object?> get props => [
        id,
        date,
        time,
        total,
        paymentMethod,
        clientId,
        clientName,
        clientDocument,
        items,
      ];
}
```

### Modelo de Dados (data/models/sale_model.dart)

```dart
import 'dart:convert';
import '../../domain/entities/sale.dart';
import 'sale_item_model.dart';

class SaleModel extends Sale {
  const SaleModel({
    required String id,
    required DateTime date,
    String? time,
    required double total,
    required String paymentMethod,
    String? clientId,
    String? clientName,
    String? clientDocument,
    required List<SaleItemModel> items,
  }) : super(
          id: id,
          date: date,
          time: time,
          total: total,
          paymentMethod: paymentMethod,
          clientId: clientId,
          clientName: clientName,
          clientDocument: clientDocument,
          items: items,
        );

  factory SaleModel.fromJson(Map<String, dynamic> json) {
    return SaleModel(
      id: json['id'],
      date: DateTime.parse(json['date']),
      time: json['time'],
      total: json['total'].toDouble(),
      paymentMethod: json['paymentMethod'],
      clientId: json['clientId'],
      clientName: json['clientName'],
      clientDocument: json['clientDocument'],
      items: json['items'] != null
          ? (json['items'] as List)
              .map((item) => SaleItemModel.fromJson(item))
              .toList()
          : [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'date': date.toIso8601String(),
      'time': time,
      'total': total,
      'paymentMethod': paymentMethod,
      'clientId': clientId,
      'clientName': clientName,
      'clientDocument': clientDocument,
      'items': items.map((item) => (item as SaleItemModel).toJson()).toList(),
    };
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'date': date.toIso8601String(),
      'time': time,
      'total': total,
      'paymentMethod': paymentMethod,
      'clientId': clientId,
      'clientName': clientName,
      'clientDocument': clientDocument,
      'items': jsonEncode(items.map((item) => (item as SaleItemModel).toJson()).toList()),
    };
  }

  factory SaleModel.fromMap(Map<String, dynamic> map) {
    return SaleModel(
      id: map['id'],
      date: DateTime.parse(map['date']),
      time: map['time'],
      total: map['total'].toDouble(),
      paymentMethod: map['paymentMethod'],
      clientId: map['clientId'],
      clientName: map['clientName'],
      clientDocument: map['clientDocument'],
      items: map['items'] != null
          ? (jsonDecode(map['items']) as List)
              .map((item) => SaleItemModel.fromJson(item))
              .toList()
          : [],
    );
  }

  SaleModel copyWith({
    String? id,
    DateTime? date,
    String? time,
    double? total,
    String? paymentMethod,
    String? clientId,
    String? clientName,
    String? clientDocument,
    List<SaleItemModel>? items,
  }) {
    return SaleModel(
      id: id ?? this.id,
      date: date ?? this.date,
      time: time ?? this.time,
      total: total ?? this.total,
      paymentMethod: paymentMethod ?? this.paymentMethod,
      clientId: clientId ?? this.clientId,
      clientName: clientName ?? this.clientName,
      clientDocument: clientDocument ?? this.clientDocument,
      items: items ?? this.items.map((e) => e as SaleItemModel).toList(),
    );
  }
}
```

## Item de Venda (SaleItem)

### Entidade de Domínio (domain/entities/sale_item.dart)

```dart
import 'package:equatable/equatable.dart';

class SaleItem extends Equatable {
  final String id;
  final String saleId;
  final String? productId;
  final String description;
  final double price;
  final int quantity;
  final double total;

  const SaleItem({
    required this.id,
    required this.saleId,
    this.productId,
    required this.description,
    required this.price,
    required this.quantity,
    required this.total,
  });

  @override
  List<Object?> get props => [
        id,
        saleId,
        productId,
        description,
        price,
        quantity,
        total,
      ];
}
```

### Modelo de Dados (data/models/sale_item_model.dart)

```dart
import '../../domain/entities/sale_item.dart';

class SaleItemModel extends SaleItem {
  const SaleItemModel({
    required String id,
    required String saleId,
    String? productId,
    required String description,
    required double price,
    required int quantity,
    required double total,
  }) : super(
          id: id,
          saleId: saleId,
          productId: productId,
          description: description,
          price: price,
          quantity: quantity,
          total: total,
        );

  factory SaleItemModel.fromJson(Map<String, dynamic> json) {
    return SaleItemModel(
      id: json['id'],
      saleId: json['saleId'],
      productId: json['productId'],
      description: json['description'],
      price: json['price'].toDouble(),
      quantity: json['quantity'],
      total: json['total'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'saleId': saleId,
      'productId': productId,
      'description': description,
      'price': price,
      'quantity': quantity,
      'total': total,
    };
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'saleId': saleId,
      'productId': productId,
      'description': description,
      'price': price,
      'quantity': quantity,
      'total': total,
    };
  }

  factory SaleItemModel.fromMap(Map<String, dynamic> map) {
    return SaleItemModel(
      id: map['id'],
      saleId: map['saleId'],
      productId: map['productId'],
      description: map['description'],
      price: map['price'].toDouble(),
      quantity: map['quantity'],
      total: map['total'].toDouble(),
    );
  }

  SaleItemModel copyWith({
    String? id,
    String? saleId,
    String? productId,
    String? description,
    double? price,
    int? quantity,
    double? total,
  }) {
    return SaleItemModel(
      id: id ?? this.id,
      saleId: saleId ?? this.saleId,
      productId: productId ?? this.productId,
      description: description ?? this.description,
      price: price ?? this.price,
      quantity: quantity ?? this.quantity,
      total: total ?? this.total,
    );
  }
}
```
