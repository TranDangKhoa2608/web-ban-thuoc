import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { CategoriesService } from '../../services/CategoriesService';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState(''); // Added for description
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await CategoriesService.fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddOrUpdateCategory = async () => {
    const formData = { 
      name: categoryName, 
      description: categoryDescription 
    };
    try {
      if (selectedCategory) {
        await CategoriesService.updateCate(selectedCategory.categoryID, formData);

        console.log("Category updated"+selectedCategory.categoryID);
      } else {
        await CategoriesService.addCategories(formData);
        console.log("Category added");
      }

      handleCloseDialog(); // Close dialog before refreshing
      await fetchCategories(); // Refresh categories after add/update
    } catch (error) {
      console.error("Error:", error.message);
      alert("Đã xảy ra lỗi: " + error.message); // Show error message
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    console.log("Category updated"+category.categoryID);
    setCategoryName(category.name);
    setCategoryDescription(category.description); // Populate description for editing
    setOpenDialog(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await CategoriesService.deleteCategory(id);
      fetchCategories(); // Refresh categories after delete
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
    setCategoryName('');
    setCategoryDescription(''); // Reset description on dialog close
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const filteredCategories = await CategoriesService.searchCategoriesByName(searchTerm);
        setCategories(filteredCategories);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      fetchCategories(); // Fetch all categories if no search term
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>QUẢN LÝ DANH MỤC</Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Tìm kiếm danh mục"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{ marginRight: '20px', flexGrow: 1 }} // Allow it to grow
        />
        <Button 
          variant="contained" 
          onClick={handleSearch} 
          color="success" // Adjusted button color
          style={{ height: '40px' }} // Adjust height
        >
          Tìm kiếm
        </Button>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenDialog(true)} 
          style={{ marginLeft: '20px', height: '40px' }} // Adjusted height
        >
          Thêm danh mục
        </Button>
      </Box>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{
    minWidth: 1200, // Điều chỉnh kích thước tối thiểu cho bảng
    margin: '20px auto', // Căn giữa bảng với khoảng cách trên dưới
  }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Danh Mục</TableCell>
              <TableCell>Mô Tả</TableCell> {/* Added description column */}
              <TableCell>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.categoryID}>
                <TableCell>{category.categoryID}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell> {/* Displaying description */}
                <TableCell>
                  <Button 
                    color="primary" 
                    variant="contained" 
       
                    onClick={() => handleEditCategory(category)} 
                    style={{ marginRight: '10px' }} // Spacing between buttons
                  >
                    Sửa
                  </Button>
                  <Button 
                    color="error" 
                    variant="contained" 
        
                    onClick={() => handleDeleteCategory(category.categoryID)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedCategory ? 'Cập nhật Danh Mục' : 'Thêm Danh Mục'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên Danh Mục"
            value={categoryName} // Fixed variable name
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mô Tả" // Added description input field
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4} // Allow for multiline input
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button 
            onClick={handleAddOrUpdateCategory} 
            color="primary"
            variant="contained" 
            
          >
            {selectedCategory ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesManagement;
