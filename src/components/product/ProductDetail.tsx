import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import { defaultCities } from "../config/ProductConfiguration";

export const ProductDetail: FC = (props) => {
  const open = useSelector((state: RootState) => state.editingProduct.visible);

  const iProduct = useSelector(
    (state: RootState) => state.editingProduct.product,
    (l, r) => l.id === r.id
  );
  const [eProduct, setEditingProduct] = useState(iProduct);
  // const initalProduct = useSelector(
  //   (state: RootState) => state.editingProduct.product
  // );
  const onFormOpen = () => {
    console.log("On load eProduct {}", iProduct.id);
  };
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(
      e.currentTarget.name +
        " was changed from " +
        iProduct.importPrice +
        " to " +
        e.currentTarget.value
    );
    iProduct.importPrice = 65;
    // setIProduct({
    //   ...iProduct,
    //   [e.currentTarget.name]: e.currentTarget.value,
    // });
  };
  const onSubmit = (): void => {
    // event.preventDefault();
    console.log("Saving....");
    saveEditProduct(iProduct);
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
                value={iProduct.id}
                name="id"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Id (Text)</label>
              <input
                type="text"
                value={iProduct.idString}
                name="idString"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={iProduct.name}
                name="name"
                onChange={onValueChange}
                readOnly={false}
              />
            </div>
            <div className="field">
              <label>Import Price</label>
              <input
                type="text"
                value={iProduct.importPrice}
                name="importPrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Sale Price</label>
              <input
                type="text"
                value={iProduct.salePrice}
                name="salePrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Import Date</label>
              <input
                type="text"
                value={iProduct.importDate}
                name="importDate"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Expiration Date</label>
              <input
                type="text"
                value={iProduct.expirationDate}
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
                value={iProduct.retailDepartment}
                name="retailDepartment"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>City</label>
              <select
                defaultValue={iProduct.city}
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
                value={iProduct.phoneNumber}
                name="phoneNumber"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Currency</label>
              <input
                type="text"
                value={iProduct.currency}
                name="currency"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Business Address</label>
              <input
                type="text"
                value={iProduct.businessAddress}
                name="businessAddress"
                style={{ width: "500px" }}
                onChange={onValueChange}
              />
            </div>

            <div className="field">
              <label>Shipping Address</label>
              <input
                type="text"
                value={iProduct.shippingAddress}
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
            onClick={() => onSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </Popup>
  );
};
