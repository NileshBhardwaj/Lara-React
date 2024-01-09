import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
function Products() {
    const url = "/products";
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    // const handleInputChange = (event, id) => {

    //     //destructures the target property of the event object into two variables: name and value.
    //     const { name, value } = event.target;
    //     console.log(name,value);
    //     setData(
    //         data.map((item) =>
    //             item.id === id ? { ...item, [name]: parseFloat(value) } : item
    //         )
    //     );
    // };

    const handleInputChange = (event, id) => {
        var name = event.target.name;
        var value = event.target.value;

        // Create a new copy of the data array
        var newData = data.slice();

        console.log(newData);
        // Loop over each item in the data array
        for (var i = 0; i < newData.length; i++) {
            var item = newData[i];

            // If the item's id matches the given id
            if (item.id === id) {
                // Update the item's property based on the name and value
                item[name] = parseFloat(value);
            }
        }

        // Set the state with the new data array
        setData(newData);
    };

    const handleBlur = (id) => {
        const product = data.find((item) => item.id === id);
        // console.log(product)
        axios
            .post("/update-product", product)
            .then((response) => {
                // console.log(response.data);
                setMessage("Product details are updated successfully !");
                setTimeout(() => setMessage(""), 3000);
                useEffect();
            })
            .catch((error) => {
                // console.error(error);
            });
    };
    const handleDownload = () => {
        // create workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Product");

        // customize header names
        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Name", key: "name", width: 20 },
            { header: "Description", key: "description", width: 20 },
            { header: "Quantity", key: "quantity", width: 10 },
            { header: "Price", key: "price", width: 15 },
        ];

        // Add rows
        worksheet.addRow([
            "ID",
            "Name",
            "Description",
            "Quantity",
            "Price",
        ]).alignment = { horizontal: "right" };

        data.forEach((product, index) => {
            const { id, name, description, quantity, price } = product;

            // Add row with product data
            const row = worksheet.addRow({
                id,
                name,
                description,
                quantity,
                price,
            });

            // Apply currency format to price cells
            row.getCell(5).numFmt = '"$"#,##0.00';

            row.alignment = {
                horizontal: "right",
                vertical: "middle",
                wrapText: true,
            };
        });

        // calculate total price
        const totalPrice = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // Add total row
        const totalRow = worksheet.addRow(["Total"]);
        totalRow.alignment = {
            horizontal: "right",
            vertical: "middle",
            wrapText: true,
        };
        const totalCell = totalRow.getCell(5);
        totalCell.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true,
        };

        totalRow.font = { size: 13, bold: true };

        // Construct the formula string dynamically
        let formula = "";
        for (let i = 3; i < data.length + 3; i++) {
            formula += `D${i}*E${i} + `;
        }
        formula += `SUM(E3:E${data.length + 2})`;

        totalCell.value = {
            formula: formula,
            result: totalPrice,
        };

        // Apply currency format to total cell
        totalCell.numFmt = '"$"#,##0.00';

        worksheet.getRow(2).height = 20.35;

        // Merge cells for the title
        worksheet.mergeCells("A1:E1");
        let titleCell = worksheet.getCell("A1");
        titleCell.value = "Products";
        titleCell.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true,
        };

        worksheet.getRow(1).height = 30.35;

        titleCell.font = { size: 15, bold: true };
        titleCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "B2CD9C" }, // Yellow color
        };

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            FileSaver.saveAs(blob, "ReportFor2024.xlsx");
        });
    };
    return (
        <>
            <div>
                <h1>Products Details</h1>
            </div>

            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div id="responseContainer">
                    <div className="wrapper" id="excel">
                        <button
                            style={{ borderRadius: "5px" }}
                            onClick={handleDownload}
                        >
                            {" "}
                            <strong>
                                <FontAwesomeIcon icon={faFileExcel} />
                                Get Product List
                            </strong>
                        </button>
                    </div>
                    {message && (
                        <div class="alert alert-success">
                            <strong>Success!</strong> {message}
                        </div>
                    )}
                    <table id="responseContainer">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                {/* <th>Product ID</th> */}
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                {/* <th>Product Image</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}.</td>
                                    {/* <td>{item.id}</td> */}
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                    
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(event) =>
                                                handleInputChange(
                                                    event,
                                                    item.id
                                                )
                                            }
                                            onBlur={() => handleBlur(item.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="td-div">
                                        <label class="input-group-addon" for="number">$</label> 
                                        <input
                                            type="number"
                                            name="price"
                                            value={item.price}
                                            onChange={(event) =>
                                                handleInputChange(
                                                    event,
                                                    item.id
                                                )
                                            }
                                            onBlur={() => handleBlur(item.id)}
                                        />
                                        </div>
                                    </td>
                                    {/* <td>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={(event) =>
                                                handleInputChange(
                                                    event,
                                                    item.id
                                                )
                                            }
                                            onBlur={() => handleBlur(item.id)}
                                            />
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Products;
