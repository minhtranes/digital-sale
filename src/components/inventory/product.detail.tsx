import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { bindActionCreators } from "redux";
import { actionCreators, productListActionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import { defaultCities } from "../config/ProductConfiguration";
import { emptyProduct } from "./product";
import { saveProduct } from "../../services/product.service";

const ProductDetail: FC = (props) => {
  const [open, setOpen] = useState(false);

  const [selectedProduct, setEditingProduct] = useState(emptyProduct);
  useEffect(() => {
    console.log("Open = " + open + " product = " + selectedProduct.id);
  }, []);

  const ep = useSelector((state: RootState) => {
    var p = state.editingProduct.product;
    console.log("Editing product: id = " + p.id + ", name = " + p.name);
    return p;
  });

  const onFormOpen = () => {
    setEditingProduct(ep);
  };

  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEditingProduct({
      ...selectedProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSaveProduct = () => {
    saveProduct(selectedProduct).then((r) => {
      updateProducts([r.data]);
      saveEditProduct(r.data);
    });
  };

  const handleDropdownChange = (e: React.FormEvent<HTMLSelectElement>) => {};
  const [cities, setCities] = useState<string[]>(defaultCities);
  const dispatch = useDispatch();
  const { saveEditProduct, editProduct, abortEditProduct } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { updateProducts } = bindActionCreators(
    productListActionCreators,
    dispatch
  );

  return (
    <Popup
      open={useSelector((state: RootState) => state.editingProduct.visible)}
      onOpen={onFormOpen}
      closeOnDocumentClick
      modal
    >
      <div className="modal">
        <div className="header">Import Product</div>
        <form className="content">
          <div style={{ display: "inline-block" }}>
            <div className="field">
              <label>Id</label>
              <input
                type="text"
                value={selectedProduct.id}
                name="id"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Id (Text)</label>
              <input
                type="text"
                value={selectedProduct.idString}
                name="idString"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={selectedProduct.name}
                name="name"
                onChange={onValueChange}
                readOnly={false}
              />
            </div>
            <div className="field">
              <label>Import Price</label>
              <input
                type="text"
                value={selectedProduct.importPrice}
                name="importPrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Sale Price</label>
              <input
                type="text"
                value={selectedProduct.salePrice}
                name="salePrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Import Date</label>
              <input
                type="text"
                value={selectedProduct.importDate}
                name="importDate"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Expiration Date</label>
              <input
                type="text"
                value={selectedProduct.expirationDate}
                name="expirationDate"
                onChange={onValueChange}
              />
            </div>
          </div>
          <div style={{ display: "inline-block", alignContent: "flex-start" }}>
            <div className="field">
              <label>Retail Department</label>
              <input
                type="text"
                value={selectedProduct.retailDepartment}
                name="retailDepartment"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>City</label>
              <select
                defaultValue={selectedProduct.city}
                name="city"
                onChange={handleDropdownChange}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                value={selectedProduct.phoneNumber}
                name="phoneNumber"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Currency</label>
              <input
                type="text"
                value={selectedProduct.currency}
                name="currency"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Business Address</label>
              <input
                type="text"
                value={selectedProduct.businessAddress}
                name="businessAddress"
                style={{ width: "500px" }}
                onChange={onValueChange}
              />
            </div>

            <div className="field">
              <label>Shipping Address</label>
              <input
                type="text"
                value={selectedProduct.shippingAddress}
                name="shippingAddress"
                style={{ width: "500px" }}
                onChange={onValueChange}
              />
            </div>
          </div>
        </form>
        <div className="actions">
          <button
            className="btn"
            onClick={() => abortEditProduct()}
            style={{ marginRight: "2px" }}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{ marginLeft: "2px" }}
            onClick={onSaveProduct}
          >
            Save
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ProductDetail;
