    // src/components/AddStudentModal.js

    import React, { useEffect, useState } from 'react';
    import { Modal, Box, TextField, Button, Typography } from '@mui/material';
    import { LocalizationProvider, DatePicker } from '@mui/lab';
    import AdapterDateFns from '@mui/lab/AdapterDateFns';
    import { addDoc, collection, getDocs } from 'firebase/firestore';
    import { db } from '../../../firebase';

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    };

    const AddStudentModal = ({ open, handleClose }) => {
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [students, setStudents] = useState('');
    const [admissionDate, setAdmissionDate] = useState(null);
    const fetchStudents = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'students'));
          const studentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStudents(studentData);
        } catch (error) {
          console.error('Error fetching students: ', error);
        }
      };
    //   useEffect(() => {
    //     // Fetch students on initial component mount
    //     fetchStudents();
    //   }, []);
      const reloadTableData = () => {
        fetchStudents();
      };
    const handleSubmit = async () => {
        // Add a new document with a generated id.
        try {
        await addDoc(collection(db, "students"), {
            name,
            class: studentClass,
            admDate: admissionDate,
        });
        handleClose();
        alert("Successfully added Student!");
        window.location.reload();
        setName('');
        setStudentClass('');
        setAdmissionDate(null);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
    };

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Student
            </Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            label="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Admission Date"
                value={admissionDate}
                onChange={(newValue) => {
                setAdmissionDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            </LocalizationProvider>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            >
            Add Student
            </Button>
        </Box>
        </Modal>
    );
    };

    export default AddStudentModal;
