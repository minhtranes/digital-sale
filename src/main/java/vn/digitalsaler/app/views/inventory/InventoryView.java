package vn.digitalsaler.app.views.inventory;

import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.vaadin.artur.helpers.CrudServiceDataProvider;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import vn.digitalsaler.app.data.entity.Product;
import vn.digitalsaler.app.data.service.ProductService;
import vn.digitalsaler.app.views.main.MainView;

@Route(value = "inventory/:productID?/:action?(edit)", layout = MainView.class)
@PageTitle("Inventory")
@CssImport("./views/masterdetail/master-detail-view.css")
public class InventoryView extends Div implements BeforeEnterObserver {

	private final String PRODUCT_ID = "productID";
	private final String PRODUCT_EDIT_ROUTE_TEMPLATE = "inventory/%d/edit";

	private Grid<Product> grid = new Grid<>(Product.class, false);

	private TextField name;
	private DatePicker importDate;
	private DatePicker productDate;
	private DatePicker expirationDate;
	private TextField importPrice;
	private TextField salePrice;
	private ComboBox<String> category;

	private Button cancel = new Button("Cancel");
	private Button save = new Button("Save");

	private BeanValidationBinder<Product> binder;

	private Product product;

	@Autowired
	private ProductService productService;

	@PostConstruct
	void init() {
		grid.setDataProvider(new CrudServiceDataProvider<>(productService));
	}

	public InventoryView() {
		addClassName("inventory-view");
		// Create UI
		SplitLayout splitLayout = new SplitLayout();
		splitLayout.setSizeFull();

		createGridLayout(splitLayout);
		createEditorLayout(splitLayout);

		add(splitLayout);

		// Configure Grid
		grid.addColumn("name").setAutoWidth(true);
		grid.addColumn("importDate").setAutoWidth(true);
		grid.addColumn("produceDate").setAutoWidth(true);
		grid.addColumn("importPrice").setAutoWidth(true);
		grid.addColumn("salePrice").setAutoWidth(true);
		grid.addColumn("expirationDate").setAutoWidth(true);
		grid.addColumn("category").setAutoWidth(true);
		TemplateRenderer<Product> importantRenderer = TemplateRenderer
		        .<Product>of(
		                "<iron-icon hidden='[[!item.expired]]' icon='vaadin:check' style='width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-primary-text-color);'></iron-icon><iron-icon hidden='[[item.important]]' icon='vaadin:minus' style='width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: var(--lumo-disabled-text-color);'></iron-icon>")
		        .withProperty("expired", Product::isExpired);
		grid.addColumn(importantRenderer).setHeader("Expired")
		        .setAutoWidth(true);

		grid.addThemeVariants(GridVariant.LUMO_NO_BORDER);
		grid.setHeightFull();

		// when a row is selected or deselected, populate form
		grid.asSingleSelect().addValueChangeListener(event -> {
			if (event.getValue() != null) {
				UI.getCurrent().navigate(String.format(
				        PRODUCT_EDIT_ROUTE_TEMPLATE, event.getValue().getId()));
			} else {
				clearForm();
				UI.getCurrent().navigate(InventoryView.class);
			}
		});

		// Configure Form
		binder = new BeanValidationBinder<>(Product.class);

		// Bind fields. This where you'd define e.g. validation rules

		binder.bindInstanceFields(this);

		cancel.addClickListener(e -> {
			clearForm();
			refreshGrid();
		});

		save.addClickListener(e -> {
			try {
				if (this.product == null) {
					this.product = new Product();
				}
				binder.writeBean(this.product);

				productService.update(this.product);
				clearForm();
				refreshGrid();
				Notification.show("Product details stored.");
				UI.getCurrent().navigate(InventoryView.class);
			} catch (ValidationException validationException) {
				Notification.show(
				        "An exception happened while trying to store the samplePerson details.");
			}
		});

	}

	@Override
	public void beforeEnter(BeforeEnterEvent event) {
		Optional<Integer> productId = event.getRouteParameters()
		        .getInteger(PRODUCT_ID);
		if (productId.isPresent()) {
			Optional<Product> productFromBackend = productService
			        .get(productId.get());
			if (productFromBackend.isPresent()) {
				populateForm(productFromBackend.get());
			} else {
				Notification.show(
				        String.format(
				                "The requested product was not found, ID = %d",
				                productId.get()),
				        3000, Notification.Position.BOTTOM_START);
				// when a row is selected but the data is no longer available,
				// refresh grid
				refreshGrid();
				event.forwardTo(InventoryView.class);
			}
		}
	}

	private void createEditorLayout(SplitLayout splitLayout) {
		Div editorLayoutDiv = new Div();
		editorLayoutDiv.setId("editor-layout");

		Div editorDiv = new Div();
		editorDiv.setId("editor");
		editorLayoutDiv.add(editorDiv);

		FormLayout formLayout = new FormLayout();

		name = new TextField("Name");
		importDate = new DatePicker("Import Date");
		productDate = new DatePicker("Product Date");
		expirationDate = new DatePicker("Expiration Date");
		importPrice = new TextField("Import Price");
		salePrice = new TextField("Sale Price");
		category = new ComboBox<>("", "");

		Component[] fields = new Component[] { name, importDate, productDate,
		        expirationDate, importPrice, salePrice, category };

		for (Component field : fields) {
			((HasStyle) field).addClassName("full-width");
		}
		formLayout.add(fields);
		editorDiv.add(formLayout);
		createButtonLayout(editorLayoutDiv);

		splitLayout.addToSecondary(editorLayoutDiv);
	}

	private void createButtonLayout(Div editorLayoutDiv) {
		HorizontalLayout buttonLayout = new HorizontalLayout();
		buttonLayout.setId("button-layout");
		buttonLayout.setWidthFull();
		buttonLayout.setSpacing(true);
		cancel.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
		save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
		buttonLayout.add(save, cancel);
		editorLayoutDiv.add(buttonLayout);
	}

	private void createGridLayout(SplitLayout splitLayout) {
		Div wrapper = new Div();
		wrapper.setId("grid-wrapper");
		wrapper.setWidthFull();
		splitLayout.addToPrimary(wrapper);
		wrapper.add(grid);
	}

	private void refreshGrid() {
		grid.select(null);
		grid.getDataProvider().refreshAll();
	}

	private void clearForm() {
		populateForm(null);
	}

	private void populateForm(Product value) {
		this.product = value;
		binder.readBean(this.product);

	}
}
