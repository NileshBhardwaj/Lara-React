import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import ReactPaginate from "react-paginate";
import Modal from "@material-ui/core/Modal";
function Products() {
    const url = "/products";
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, ErrorMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [uploadStatus, setUploadStatus] = useState(false);
    const indexOfLastItem = currentPage * itemsPerPage;
    const [selectedId, setSelectedId] = useState(null);
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // This line creates a new array `currentItems` that contains only the items for the current page.
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const [open, setOpen] = React.useState(false);
    const [img, setImg] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios
            .get(`${url}?page=${currentPage}&limit=${itemsPerPage}`)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, [currentPage, itemsPerPage, uploadStatus]);
    useEffect(() => {}, [uploadStatus]);
    const handlePageChange = (data) => {
        let selected = data.selected;
        setCurrentPage(selected + 1);
    };
    const handleInputChange = (event, id) => {
        var name = event.target.name;
        var value = event.target.value;

        // Create a new copy of the data array
        var newData = data.slice();

        // console.log(newData);
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
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (id) => {
        console.log(id);
        const image = data.find((item) => item.id === id);
        setImg(image.image);
        setSelectedId(id); // Store the id
        setOpen(true);
    };

    // const

    const uploadFile = (event) => {
        const file = event.target.files[0];
        const fileType = file.type;
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (!validImageTypes.includes(fileType)) {
            // Not a valid image
            ErrorMessage(
                "Invalid file type."
            );
            return;
        } else {
            ErrorMessage("");
        }
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
            setSelectedFile(file); // Store the file
        }
    };

    const update = () => {
        if (!selectedFile) {
            ErrorMessage("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("id", selectedId);

        axios
            .post("/update-product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
                setMessage("Product Image is updated successfully !");
                setTimeout(() => setMessage(""), 3000);
                setUploadStatus("success");
                setSelectedId(null);
                setSelectedFile(null);
                setPreviewImage(null);
                handleClose();
            })
            .catch((error) => {
                console.error(error);
                setUploadStatus("error");
            });
    };
    const handleDownload = () => {
        // create workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Product");

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

        // Merge cells for the title
        worksheet.mergeCells("A1:E1");

        worksheet.getRow(2).values = [
            "ID",
            "Name",
            "Description",
            "Quantity",
            "Price",
        ];
        worksheet.columns = [
            { key: "id", width: 10 },
            { key: "name", width: 20 },
            { key: "description", width: 20 },
            { key: "quantity", width: 20 },
            { key: "price", width: 20 },
        ];

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
        const lastRow = data.length + 2;

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
        worksheet.getRow(2).alignment = { horizontal: "right" };
        // Merge cells for the title.

        worksheet.autoFilter = {
            from: {
                row: 2,
                column: 1,
            },
            to: {
                row: 32,
                column: 5,
            },
        };

        // worksheet.autoFilter = 'A1:C1';
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
                        <div className="alert alert-success">
                            <strong>Success!</strong> {message}
                        </div>
                    )}
                    {/* {errorMessage && (
                        <div className="alert alert-danger">
                            <strong>Alert!</strong> {errorMessage}
                        </div>
                    )} */}
                    <table id="responseContainer">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Change Image</th>
                                {/* <th>Open Modal</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item.id}>
                                    {/* <td>{index + 1}.</td> */}
                                    <td>{item.id}</td>
                                    <td>
                                        <div className="product-tumb">
                                            <div className="imageContainer">
                                                <img
                                                    className="circle"
                                                    src={`/images/${
                                                        item.image
                                                    }?v=${Date.now()}`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </td>
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
                                            <label
                                                className="input-group-addon"
                                                htmlFor="number"
                                            >
                                                $
                                            </label>
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
                                                onBlur={() =>
                                                    handleBlur(item.id)
                                                }
                                            />
                                        </div>
                                    </td>
                                    {/* <td>
                                        <input
                                            type="file"
                                            name="image"
                                            className="file"
                                            // accept="image/png, image/jpeg"
                                            onChange={(event) =>
                                                uploadFile(event, item.id)
                                            }
                                        />
                                    </td> */}
                                    <td>
                                        <button
                                            className="modal-button"
                                            type="button"
                                            onClick={() => handleOpen(item.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFileUpload}
                                            />
                                            Upload Image
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(data.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            <Modal
                onClose={handleClose}
                open={open}
                style={{
                    // position: "absolute",
                    // border: "0px solid #000",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    border: '2px solid #000',
                    boxShadow: "background.paper",
                    height: "49%",
                    width: "49%",
                    margin: "auto",
                    padding: "0%",
                    color: "Black",
                   
                }}
            >
                <>
                    <div className="header">
                        <h2 className="">Upload new Image of Product</h2>
                        <div>
                            <button
                                className="close"
                                type="button"
                                onClick={handleClose}
                            >
                                {" "}
                                <strong>
                                    <FontAwesomeIcon icon={faWindowClose} />
                                </strong>{" "}
                            </button>
                        </div>
                    </div>
                    <div id="seprator"></div>
                    <div className="imageContainer-modal">
                        <img
                            className="circle-modal"
                            src={previewImage || `/images/${img}`}
                            alt=""
                        />
                    </div>
                    
                    <div className="footer">
                    {errorMessage && (
                        <div className="alert alert-danger">
                            <strong>Alert!</strong> {errorMessage}
                        </div>
                    )}
                        <input
                            type="file"
                            name="image"
                            className="file"
                            // accept="image/png, image/jpeg"
                            onChange={(event) => uploadFile(event)}
                        />
                        <button onClick={update} className=".btn-default">
                            Update
                        </button>
                    </div>
                </>
            </Modal>
        </>
    );
}

export default Products;
