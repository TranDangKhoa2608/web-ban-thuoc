
import React, { useEffect, useState } from 'react';
import {
  Typography,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Backdrop,
  Box,
  MenuItem
} from '@mui/material';
import { MedicinesService } from '../../services/MedicinesService'; // Import MedicinesService
import { CategoriesService } from '../../services/CategoriesService'; // Import CategoriesService
import { CloudUpload } from '@mui/icons-material';
// import { CloudUpload } from '@mui/icons-material';
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    medicineName: '',
    categoryID: '',
    price: 0,
    quantity: 0,
    origin: '',
    disPrice: 0,
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await MedicinesService.fetchMedicines();
        const categoriesData = await CategoriesService.fetchCategories(); // Fetch all categories
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // If loading, show loading spinner
  if (loading) {
    return <CircularProgress />;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Open form to add a new product
  const handleAddClick = () => {
    setOpenAdd(true);
    setSelectedProduct(null);  // Reset selected product
    setImageFile(null);  // Reset the image state
  };

  // Open dialog to edit a product
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setImageFile(null); // Reset the image file state when editing a product
    setOpenEdit(true);
  };

  // Open dialog to confirm delete
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpenEdit(false);
    setOpenAdd(false);
    setOpenDelete(false);
    setSelectedProduct(null);
    setImageFile(null); // Reset the image state when closing the dialog
    setFormData({  // Reset formData to initial state
      medicineName: '',
      categoryID: '',
      price: 0,
      quantity: 0,
      origin: '',
      disPrice: 0,
      description: '',
      imageUrl: ''
    });
  };

  // Handle input changes (for text fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Set the selected image file to the state
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryID = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryID: selectedCategoryID,
    }));
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Check if search term is empty
    try {
      const results = await MedicinesService.searchMedicines(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  // Save the updated product
  const handleSave = async () => {
    if (selectedProduct) {
      const updatedData = new FormData();
      updatedData.append('medicineID', selectedProduct.medicineID);
      updatedData.append('medicineName', selectedProduct.medicineName);
      updatedData.append('categoryID', selectedProduct.categoryID);
      updatedData.append('price', selectedProduct.price);
      updatedData.append('quantity', selectedProduct.quantity);
      updatedData.append('origin', selectedProduct.origin);
      updatedData.append('description', selectedProduct.description);
      updatedData.append('disPrice', selectedProduct.disPrice);

      if (imageFile) {
        updatedData.append('imageUrl', imageFile);
      }

      try {
        const updatedProduct = await MedicinesService.updateMedicine(selectedProduct.medicineID, updatedData);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.medicineID === updatedProduct.medicineID ? updatedProduct : product
          )
        );
        handleClose(); // Close dialog after saving
      } catch (error) {
        setError(error); // Handle any errors from the API
      }
    }
  };

  const handleAddProduct = async () => {
    if (!formData.medicineName || !formData.categoryID) {
      console.error("Missing required fields: Tên thuốc or Danh mục");
      return; // Early return if required fields are missing
    }

    const formDataToSend = new FormData();
    formDataToSend.append('medicineName', formData.medicineName);
    formDataToSend.append('categoryID', formData.categoryID);
    formDataToSend.append('price', formData.price || 0);
    formDataToSend.append('disPrice', formData.disPrice || 0);
    formDataToSend.append('quantity', formData.quantity || 0);
    formDataToSend.append('origin', formData.origin);
    formDataToSend.append('description', formData.description);

    if (imageFile) {
      formDataToSend.append('imageUrl', imageFile); // Upload image
    }

    try {
      const newProduct = await MedicinesService.addMedicine(formDataToSend); // Send data
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      const productsData = await MedicinesService.fetchMedicines();
      const categoriesData = await CategoriesService.fetchCategories(); // Fetch all categories
      setProducts(productsData);
      setCategories(categoriesData);
      handleClose(); // Close dialog
    } catch (error) {
      console.error("Error adding product:", error); // Log error from server
    }
  };

  // Delete the selected product
  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await MedicinesService.deleteMedicine(selectedProduct.medicineID);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.medicineID !== selectedProduct.medicineID)
        );
        handleClose(); // Close dialog after deleting
      } catch (error) {
        setError(error); // Handle any errors from the API
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>DANH SÁCH SẢN PHẨM</Typography>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
  <Button onClick={handleAddClick} variant="contained" color="success" style={{ marginRight: '20px' }}>
    Thêm thuốc
  </Button>

  <TextField
    sx={{ width: '700' }}
    label="Search"
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
    style={{ margin: '0', width: '300px' }} // Remove vertical margin to align
  />
</div>

<Table sx={{ minWidth: 1200, marginTop: '20px', marginBottom: '20px' }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Mã</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Tên thuốc</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Loại thuốc</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Giá</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Tồn</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Mô tả</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Hình ảnh</TableCell>
          <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(searchResults.length ? searchResults : products).map((product) => (
          <TableRow key={product.medicineID}>
            <TableCell>{product.medicineID}</TableCell>
            <TableCell>{product.medicineName}</TableCell>
            <TableCell>{product.categoryID}</TableCell>
            <TableCell>{product.price} đ</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              <img
                src={`http://localhost:8080/uploads/${product.imageUrl}`} // Use template literals correctly
                alt={product.medicineName}
                width="100" // Adjust image size
                style={{ borderRadius: '10px' }} // Round image corners
              />
            </TableCell>
            <TableCell>
              <Button onClick={() => handleEditClick(product)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Chỉnh sửa
              </Button>
              <Button onClick={() => handleDeleteClick(product)} variant="contained" color="error">
                Xóa
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

      {/* Dialog for editing product */}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <TextField
                label="Tên thuốc"
                name="medicineName"
                value={selectedProduct.medicineName}
                onChange={handleInputEditChange}
                fullWidth
              />
             <FormControl fullWidth margin="normal">
        <InputLabel>Danh mục</InputLabel>
        <Select
          label="Danh mục"
          name="categoryID"
          value={selectedProduct?.categoryID || ''}
          onChange={handleCategoryChange}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryID} value={category.categoryID}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Chọn danh mục sản phẩm</FormHelperText>
      </FormControl>
              <TextField
                label="Giá"
                name="price"
                type="number"
                value={selectedProduct.price}
                onChange={handleInputEditChange}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Số lượng"
                name="quantity"
                type="number"
                value={selectedProduct.quantity}
                onChange={handleInputEditChange}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Xuất xứ"
                name="origin"
                value={selectedProduct.origin}
                onChange={handleInputEditChange}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Giá khuyến mãi"
                name="disPrice"
                type="number"
                value={selectedProduct.disPrice}
                onChange={handleInputEditChange}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <TextField
                label="Mô tả"
                name="description"
                value={selectedProduct.description}
                onChange={handleInputEditChange}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <TextField
                type="file"
                onChange={handleImageChange}
                style={{ marginTop: '20px' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleSave} color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>

       {/* Add Product Dialog */}
     <Backdrop open={openAdd} style={{ zIndex: 1 }}>
        <Dialog open={openAdd} onClose={handleClose}>
          <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
             <Box component="form">
               {/* Fields for adding a product */}
              <TextField
                label="Tên thuốc"
                name="medicineName"
               // Bind to formData
                 type="text"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
               <FormControl fullWidth margin="normal">
  <InputLabel>Danh mục</InputLabel>
  <Select
    label="Danh mục"
    name="categoryID"
    type="number"
    value={formData.categoryID} // Giá trị của categoryID
    onChange={handleCategoryChange}
    fullWidth
  >
    {categories.map((category) => (
      <MenuItem key={category.categoryID} value={category.categoryID}>
        {category.name}  {/* Hiển thị tên danh mục */}
      </MenuItem>
    ))}
  </Select>
  <FormHelperText>Chọn danh mục sản phẩm</FormHelperText>
</FormControl>

              <TextField
                label="Giá"
                name="price"
                type="number"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Còn"
                name="quantity"
                type="number"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Xuất xứ"
                name="origin"
                tyle="text"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mô tả"
                name="description"
                tyle="text"
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                label="Giảm giá (%)"
                name="disPrice"
                type="number"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
             <CloudUpload /> Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: '10px' }}
              />
            
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddProduct} color="primary">Add Product</Button>
          </DialogActions>
        </Dialog>
      </Backdrop>
      {/* Dialog for deleting a product */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          {selectedProduct && <Typography>Bạn có chắc chắn muốn xóa {selectedProduct.medicineName}?</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleDeleteProduct} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductList;
