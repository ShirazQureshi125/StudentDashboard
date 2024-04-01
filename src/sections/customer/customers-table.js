import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Avatar, Box, Card, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useState } from 'react';
import EditStudentModal from './editStudentModal';


export const StudentsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
 
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      console.log('Student deleted successfully');
      alert('Student deleted successfully');
      window.location.reload();
      
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };
  const handleEdit = (student) => {
    setCurrentStudent(student); // Set the current student to the one selected
    setIsEditModalOpen(true); // Open the modal
  };
  const handleSaveEditedStudent = (student) => {
    // Logic to save the edited student to Firestore
    console.log('Saving student:', student);
    // Close the modal
    setIsEditModalOpen(false);
    window.location.reload();
  };
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <Box>
         
          </Box>
                <TableCell>
                  Name
                </TableCell>
              
                <TableCell>
                  Admission Date
                </TableCell>
                <TableCell>
                  Class
                </TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
  {items.map((student) => {
    const isSelected = selected.includes(student.id);
    const admDate = "01/04/2024"; // Consider using format() for real date formatting

    return (
      <TableRow
        hover
        key={student.id}
        selected={isSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectOne?.(student.id);
              } else {
                onDeselectOne?.(student.id);
              }
            }}
          />
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={student.avatar}>{getInitials(student.name)}</Avatar>
            <Typography variant="subtitle2">{student.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell>{admDate}</TableCell>
        <TableCell>{student.class}</TableCell>
        {/* Edit Button */}
        <TableCell>
          <IconButton
            onClick={() => handleEdit(student.id)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        {/* Delete Button */}
        <TableCell>
          <IconButton
            onClick={() => handleDelete(student.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <EditStudentModal
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      student={currentStudent}
      onSave={handleSaveEditedStudent}
    />
    </Card>
    
  );
};

StudentsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
