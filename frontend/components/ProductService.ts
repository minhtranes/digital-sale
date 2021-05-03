// import { LitElement, property } from "lit-element";

// class Product {
//     private String idString;
//     private String name;
//     private String retailDepartment;
//     private String city;
//     private String phoneNumber;
//     private String currency;
//     private String businessAddress;
//     private Double importPrice;
//     private Double salePrice;
//     private String shippingAddress;
//     private LocalDateTime importDate;
//     private LocalDate expirationDate;

//     public getString(): idString {
//         return this.String;
//     }

//     public setString(String: idString): void {
//         this.String = String;
//     }

//     public getString(): name {
//         return this.String;
//     }

//     public setString(String: name): void {
//         this.String = String;
//     }

//     public getString(): retailDepartment {
//         return this.String;
//     }

//     public setString(String: retailDepartment): void {
//         this.String = String;
//     }

//     public getString(): city {
//         return this.String;
//     }

//     public setString(String: city): void {
//         this.String = String;
//     }

//     public getString(): phoneNumber {
//         return this.String;
//     }

//     public setString(String: phoneNumber): void {
//         this.String = String;
//     }

//     public getString(): currency {
//         return this.String;
//     }

//     public setString(String: currency): void {
//         this.String = String;
//     }

//     public getString(): businessAddress {
//         return this.String;
//     }

//     public setString(String: businessAddress): void {
//         this.String = String;
//     }

//     public getDouble(): importPrice {
//         return this.Double;
//     }

//     public setDouble(Double: importPrice): void {
//         this.Double = Double;
//     }

//     public getDouble(): salePrice {
//         return this.Double;
//     }

//     public setDouble(Double: salePrice): void {
//         this.Double = Double;
//     }

//     public getString(): shippingAddress {
//         return this.String;
//     }

//     public setString(String: shippingAddress): void {
//         this.String = String;
//     }

//     public getLocalDateTime(): importDate {
//         return this.LocalDateTime;
//     }

//     public setLocalDateTime(LocalDateTime: importDate): void {
//         this.LocalDateTime = LocalDateTime;
//     }

//     public getLocalDate(): expirationDate {
//         return this.LocalDate;
//     }

//     public setLocalDate(LocalDate: expirationDate): void {
//         this.LocalDate = LocalDate;
//     }



// }


// class ProductService extends LitElement {

//     products: Product[] = [];

//     private get endpoint(): string {
//         return "https://run.mocky.io/v3/ef3b6069-5f78-4c78-a83a-b44530738dac";
//     }

//     firstUpdated() {
//         fetch(this.endpoint)
//             .then((r) => r.json())
//             .then((data) => {
//                 this.products = data.result;
//             })
//     }
// }