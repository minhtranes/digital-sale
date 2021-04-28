package vn.digitalsaler.app.data.service;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.digitalsaler.app.data.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
