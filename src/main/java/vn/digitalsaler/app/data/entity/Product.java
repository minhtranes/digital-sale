package vn.digitalsaler.app.data.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import vn.digitalsaler.app.data.AbstractEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
public class Product extends AbstractEntity {
	private String idString;
	private String name;
	private String retailDepartment;
	private String city;
	private String phoneNumber;
	private String currency;
	private String businessAddress;
	private Double importPrice;
	private Double salePrice;
	private String shippingAddress;
	private LocalDateTime importDate;
	private LocalDate expirationDate;

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRetailDepartment() {
		return retailDepartment;
	}

	public void setRetailDepartment(String retailDepartment) {
		this.retailDepartment = retailDepartment;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	public Double getImportPrice() {
		return importPrice;
	}

	public void setImportPrice(Double importPrice) {
		this.importPrice = importPrice;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public LocalDateTime getImportDate() {
		return importDate;
	}

	public void setImportDate(LocalDateTime importDate) {
		this.importDate = importDate;
	}

	public LocalDate getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}

	public boolean isExpired() {
		if (expirationDate == null) {
			return false;
		}
		return expirationDate.isBefore(LocalDate.now());
	}
}
