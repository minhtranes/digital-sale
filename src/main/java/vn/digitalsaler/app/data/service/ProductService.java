package vn.digitalsaler.app.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersSpec;
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

	@Override
	public Page<Product> list(Pageable pageable) {
		RequestHeadersSpec<?> spec =
		 WebClient
			.create().get()
			.uri("https://run.mocky.io/v3/ef3b6069-5f78-4c78-a83a-b44530738dac");
			
		System.out.println("Fetched data from https://run.mocky.io/v3/ef3b6069-5f78-4c78-a83a-b44530738dac");
		
		
		List<Product> products = spec.retrieve().toEntityList(Product.class).block().getBody();
		
		return new PageImpl<>(products);
	}
	
	@Override
	public int count() {
		return 1;
	}
}
