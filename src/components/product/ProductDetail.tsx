import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import { defaultCities } from "../config/ProductConfiguration";

export const ProductDetail: FC = (props) => {
  const open = useSelector((state: RootState) => state.editingProduct.visible);

  const [eProduct, setEditingProduct] = useState(
    useSelector((state: RootState) => state.editingProduct.product)
  );
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEditingProduct({
      ...eProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleDropdownChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setEditingProduct({
      ...eProduct,
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
      onClose={() => saveEditProduct(eProduct)}
    >
      <div className="modal">
        <div className="header">Import Product</div>
        <form className="content">
          <div style={{ display: "inline-block" }}>
            <div className="field">
              <label>Id</label>
              <input type="text" value={eProduct.id} name="id" />
            </div>
            <div className="field">
              <label>Id (Text)</label>
              <input type="text" value={eProduct.idString} name="idString" />
            </div>
            <div className="field">
              <label>Name</label>
              <input type="text" value={eProduct.name} name="name" />
            </div>
            <div className="field">
              <label>Import Price</label>
              <input
                type="text"
                value={eProduct.importPrice}
                name="importPrice"
              />
            </div>
            <div className="field">
              <label>Sale Price</label>
              <input type="text" value={eProduct.salePrice} name="salePrice" />
            </div>
            <div className="field">
              <label>Import Date</label>
              <input
                type="text"
                value={eProduct.importDate}
                name="importDate"
              />
            </div>
            <div className="field">
              <label>Expiration Date</label>
              <input
                type="text"
                value={eProduct.expirationDate}
                name="expirationDate"
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
              />
            </div>
            <div className="field">
              <label>City</label>
              <select defaultValue={eProduct.city} name="city">
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
              />
            </div>
            <div className="field">
              <label>Currency</label>
              <input type="text" value={eProduct.currency} name="currency" />
            </div>
            <div className="field">
              <label>Business Address</label>
              <input
                type="text"
                value={eProduct.businessAddress}
                name="businessAddress"
                style={{ width: "500px" }}
              />
            </div>

            <div className="field">
              <label>Shipping Address</label>
              <input
                type="text"
                value={eProduct.shippingAddress}
                name="shippingAddress"
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
            onClick={() => saveEditProduct(eProduct)}
          >
            Save
          </button>
        </div>
      </div>
    </Popup>
  );
};
