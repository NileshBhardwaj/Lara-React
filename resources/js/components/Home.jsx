import React, { useState, useEffect } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { NumberFormatBase } from "react-number-format";
function Home() {
    const url = "/products";
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");

    const fetchInfo = () => {
        return axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    };

    const addToCart = (productId, price) => {
        axios
            .post("/addToCart", {
                productId: productId,
                price: price,
            })
            .then(function (response) {
                console.log(response);
                setMessage("Product added to cart");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(function (error) {
                console.log(error);
            });
        // const message = response.data;
    };

    const handleDownload = () => {
        // create workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Product");

        // customize header names
        worksheet.autoFilter = {
            from: 'A2',
            to: 'E2',
          }

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
   
    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <>
            <div className="wrapper" id="excel">
                <button
                    style={{ borderRadius: "5px" }}
                    onClick={handleDownload}
                >
                    {" "}
                    <strong>Get Product List</strong>
                </button>
            </div>
            {message && (
                <div class="alert alert-success">
                    <strong>Success!</strong> {message}
                </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {data.map((dataObj, index) => (
                    <div className="product-card" style={{ width: "25%" }}>
                        <div className="badge">Hot</div>
                        <div className="product-tumb">
                            <img
                                src={`/images/${dataObj.image}`}
                                alt=""
                            />
                        </div> 
                        <div className="product-details">
                            <span className="product-catagory">
                                <strong>{dataObj.name}</strong>
                            </span>
                            <h4>
                                <a href="">
                                    <strong>{dataObj.name}</strong>
                                </a>
                            </h4>
                            <p>
                                <strong> {dataObj.description}</strong>
                            </p>
                            <div className="product-bottom-details">
                                <div className="product-price">
                                    <small>$1000</small>${dataObj.price}
                                </div>
                                <div className="product-links">
                                    <button
                                        onClick={() =>
                                            addToCart(dataObj.id, dataObj.price)
                                        }
                                    >
                                        {" "}
                                        <strong>Add to cart</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
