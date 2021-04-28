package vn.digitalsaler.app.data.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import vn.digitalsaler.app.data.AbstractEntity;

import java.time.LocalDate;

@Entity
@Table(name = "product")
public class Product extends AbstractEntity {

	private String name;
	private LocalDate importDate;
	private LocalDate produceDate;
	private String importPrice;
	private String salePrice;
	private LocalDate expirationDate;
	private String category;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getImportDate() {
		return importDate;
	}

	public void setImportDate(LocalDate importDate) {
		this.importDate = importDate;
	}

	public LocalDate getProduceDate() {
		return produceDate;
	}

	public void setProduceDate(LocalDate produceDate) {
		this.produceDate = produceDate;
	}

	public String getImportPrice() {
		return importPrice;
	}

	public void setImportPrice(String importPrice) {
		this.importPrice = importPrice;
	}

	public String getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(String salePrice) {
		this.salePrice = salePrice;
	}

	public LocalDate getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public boolean isExpired() {
		if (expirationDate == null || produceDate == null) {
			return false;
		}
		return expirationDate.isBefore(LocalDate.now());
	}
}
