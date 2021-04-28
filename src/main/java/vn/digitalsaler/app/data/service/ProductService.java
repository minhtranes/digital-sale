package vn.digitalsaler.app.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.vaadin.artur.helpers.CrudService;

import vn.digitalsaler.app.data.entity.Product;

@Service
public class ProductService extends CrudService<Product, Integer> {

	@Autowired
	private ProductRepository productService;
	
	@Override
	protected JpaRepository<Product, Integer> getRepository() {
		return productService;
	}

}
