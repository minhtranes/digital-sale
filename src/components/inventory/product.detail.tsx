import React, { FC, useEffect, useReducer, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import reducer from "../../state/reducers/productEditReducer";
import { defaultCities } from "../config/ProductConfiguration";
import { emptyProduct, Product } from "./product";
import { saveProduct } from "../../services/product.service";
import { string } from "yargs";

interface ProductDefailInfo {
  product: Product;
  visible: boolean;
}

// const mapStateToProps = (state: RootState): ProductDefailInfo => {
//   console.log("Map state to props " + state.editingProduct.product.id);
//   return {
//     product: state.editingProduct.product,
//     visible: state.editingProduct.visible,
//   };
// };

const ProductDetail: FC<ProductDefailInfo> = (props) => {
  const [open, setOpen] = useState(false);

  // const iProduct = useSelector((state: RootState) => state.editingProduct);
  const [selectedProduct, setEditingProduct] = useState(emptyProduct);
  useEffect(() => {
    // setEditingProduct(props.product);
    // setOpen(props.visible);
    console.log("Open = " + open + " product = " + selectedProduct.id);
    // setOpen(open);
  }, []);

  const ep = useSelector((state: RootState) => {
    console.log(
      "Selected product changed to " + state.editingProduct.product.id
    );
    // setEditingProduct(state.editingProduct.product);
    return state.editingProduct.product;
  });

  // const openSelector = useSelector(
  //   (state: RootState) => state.editingProduct.visible
  // );

  const onFormOpen = () => {
    console.log("On visible: ");
    // const p = useSelector((state: RootState) => {
    //   console.log(
    //     "Selected product changed to " + state.editingProduct.product.id
    //   );
    //   // setEditingProduct(state.editingProduct.product);
    //   return state.editingProduct.product;
    // });
    setEditingProduct(ep);
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
    setEditingProduct({
      ...selectedProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    // setEditingProduct({
    //   product
    // })
    // console.info(
    //   "Action: update, key = [%s] value = [%s]",
    //   e.currentTarget.name,
    //   e.currentTarget.value
    // );
    // editProduct(e.currentTarget.name, e.currentTarget.value);
  };

  const onSaveProduct = () => {
    var savedProduct = saveProduct(selectedProduct);
    saveEditProduct(savedProduct);
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
      open={useSelector((state: RootState) => state.editingProduct.visible)}
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

// export default connect(mapStateToProps)(ProductDetail);
export default ProductDetail;
