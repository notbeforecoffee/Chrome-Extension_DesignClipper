import React, { FC, useState, ChangeEvent } from "react";

interface IWebForm {
  //list of all fields form will accept and the db key they map to.  Name in the input field must match the attribute names in the db
}

const WebForm: FC<IWebForm> = (
  props: IWebForm,
  callback: any,
  initialState = {}
) => {
  const [values, setValues] = useState(initialState);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };

  const initialInformation = [
    { tag: "PDP URL", name: "link", type: "url" },
    { tag: "Image URL", name: "imageURLs", type: "url" },
    { tag: "Trade Price", name: "tradePrice", type: "number" },
    { tag: "sku", name: "sku", type: "number" },
    { tag: "Item Name", name: "name", type: "text" },
  ];

  const additionalInformation = [
    { tag: "Company Name", name: "vendor", type: "text" },
    { tag: "Materials", name: "materials", type: "text" },
  ];

  const dimensionsArray = [
    { tag: "Dimensions: H", name: "height", type: "number" },
    { tag: "Dimensions: D", name: "width", type: "number" },
    { tag: "Dimensions: L", name: "length", type: "number" },
  ];

  return (
    <div>
      <form>
        {initialInformation.map((item) => (
          <label className="initialInfo">
            {item.tag}
            <input
              name={item.name}
              type={item.type}
              value={""}
              onChange={handleOnChange}
            />
          </label>
        ))}

        <div>
          <hr></hr>
          <h2>Additional Information</h2>
          <p>Please fill these out once item is chosen as part of the design</p>
        </div>

        <section className="">
          {additionalInformation.map((item) => (
            <label className="additionalInfo">
              {item.tag}
              <input
                name={item.name}
                type={item.type}
                value={""}
                onChange={handleOnChange}
              />
            </label>
          ))}
          </section>

          <section className='dimensions'>
          {dimensionsArray.map((item) => (
            <label className="dimensions">
              {item.tag}
              <input
                name={item.name}
                type={item.type}
                value={""}
                onChange={handleOnChange}
              />
            </label>
          ))}

          <label>
            Weight
            <input
              name="weight"
              type="number"
              value={""}
              onChange={handleOnChange}
            />
            {/* need to capture this choice still */}
            <select className="weightUnits">
              <option value="LB">LB</option>
              <option value="KG">KG</option>
            </select>
          </label>

        </section>
      </form>
    </div>
  );
};

export default WebForm;
