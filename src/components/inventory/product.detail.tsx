import React, { FC, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import reducer from "../../state/reducers/productEditReducer";
import { defaultCities } from "../config/ProductConfiguration";
import { emptyProduct } from "./product";
import productService from "../../services/product.service";
import { string } from "yargs";

interface ProductDefailInfo {
  productId: number;
}

export const ProductDetail: FC<ProductDefailInfo> = (props) => {
  const [open, setOpen] = useState(false);

  // const iProduct = useSelector((state: RootState) => state.editingProduct);
  const [eProduct, setEditingProduct] = useState(emptyProduct);
  useEffect(() => {
    let p = productService.getOne(props.productId);
    setEditingProduct(p);
    setOpen(!open);
  }, []);

  // const initalProduct = useSelector(
  //   (state: RootState) => state.editingProduct.product
  // );

  const onFormOpen = () => {
    // console.log("On load eProduct {}", eProduct.id);
  };
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    // console.log(
    //   e.currentTarget.name +
    //     " was changed from " +
    //     eProduct.importPrice +
    //     " to " +
    //     e.currentTarget.value
    // );
    // eProduct.importPrice = 65;
    // setEditingProduct({
    //   ...eProduct.product,
    //   [e.currentTarget.name]: e.currentTarget.value,
    // });
    // setEditingProduct({
    //   product
    // })
  };
  const onSubmit = (): void => {
    // event.preventDefault();
    console.log("Saving....");
    // saveEditProduct(iProduct);
  };
  const handleDropdownChange = (e: React.FormEvent<HTMLSelectElement>) => {
    // setEditingProduct({
    //   ...eProduct,
    //   [e.currentTarget.name]: e.currentTarget.value,
    // });
  };
  const [cities, setCities] = useState<string[]>(defaultCities);
  const dispatch = useDispatch();
  const { saveEditProduct, editProduct, abortEditProduct } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <Popup
      open={open}
      onOpen={onFormOpen}
      closeOnDocumentClick
      onClose={() => abortEditProduct()}
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
                value={eProduct.id}
                name="id"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Id (Text)</label>
              <input
                type="text"
                value={eProduct.idString}
                name="idString"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={eProduct.name}
                name="name"
                onChange={onValueChange}
                readOnly={false}
              />
            </div>
            <div className="field">
              <label>Import Price</label>
              <input
                type="text"
                value={eProduct.importPrice}
                name="importPrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Sale Price</label>
              <input
                type="text"
                value={eProduct.salePrice}
                name="salePrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Import Date</label>
              <input
                type="text"
                value={eProduct.importDate}
                name="importDate"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Expiration Date</label>
              <input
                type="text"
                value={eProduct.expirationDate}
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
                value={eProduct.retailDepartment}
                name="retailDepartment"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>City</label>
              <select
                defaultValue={eProduct.city}
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
                value={eProduct.phoneNumber}
                name="phoneNumber"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Currency</label>
              <input
                type="text"
                value={eProduct.currency}
                name="currency"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Business Address</label>
              <input
                type="text"
                value={eProduct.businessAddress}
                name="businessAddress"
                style={{ width: "500px" }}
                onChange={onValueChange}
              />
            </div>

            <div className="field">
              <label>Shipping Address</label>
              <input
                type="text"
                value={eProduct.shippingAddress}
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
            onClick={() => saveEditProduct(eProduct)}
          >
            Save
          </button>
        </div>
      </div>
    </Popup>
  );
};
