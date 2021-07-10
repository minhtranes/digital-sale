import React, { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { endEditProduct } from "../../state/action-creators";
import { RootState } from "../../state/reducers";
import { defaultCities } from "../config/ProductConfiguration";

export const ProductDetail: FC = (props) => {
  const open = useSelector((state: RootState) => state.editingProduct.visible);

  const [editingProduct, setEditingProduct] = useState(
    useSelector((state: RootState) => state.editingProduct.product)
  );
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEditingProduct({
      ...editingProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleDropdownChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setEditingProduct({
      ...editingProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const [cities, setCities] = useState<string[]>(defaultCities);

  const dispatch = useDispatch();
  const { endEditProduct: saveEditProduct, abortEditProduct } =
    bindActionCreators(actionCreators, dispatch);

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={() => saveEditProduct(editingProduct)}
    >
      <div className="modal">
        <div className="header">Import Product</div>
        <form className="content">
          <div style={{ display: "inline-block" }}>
            <div className="field">
              <label>Id</label>
              <input
                type="text"
                value={editingProduct.id}
                name="id"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Id (Text)</label>
              <input
                type="text"
                value={editingProduct.idString}
                name="idString"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={editingProduct.name}
                name="name"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Import Price</label>
              <input
                type="text"
                value={editingProduct.importPrice}
                name="importPrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Sale Price</label>
              <input
                type="text"
                value={editingProduct.salePrice}
                name="salePrice"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Import Date</label>
              <input
                type="text"
                value={editingProduct.importDate}
                name="importDate"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Expiration Date</label>
              <input
                type="text"
                value={editingProduct.expirationDate}
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
                value={editingProduct.retailDepartment}
                name="retailDepartment"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>City</label>
              <select
                defaultValue={editingProduct.city}
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
                value={editingProduct.phoneNumber}
                name="phoneNumber"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Currency</label>
              <input
                type="text"
                value={editingProduct.currency}
                name="currency"
                onChange={onValueChange}
              />
            </div>
            <div className="field">
              <label>Business Address</label>
              <input
                type="text"
                value={editingProduct.businessAddress}
                name="businessAddress"
                onChange={onValueChange}
                style={{ width: "500px" }}
              />
            </div>

            <div className="field">
              <label>Shipping Address</label>
              <input
                type="text"
                value={editingProduct.shippingAddress}
                name="shippingAddress"
                onChange={onValueChange}
                style={{ width: "500px" }}
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
            type="submit"
            style={{ marginLeft: "2px" }}
            onClick={() => saveEditProduct(editingProduct)}
          >
            Save
          </button>
        </div>
      </div>
    </Popup>
  );
};
