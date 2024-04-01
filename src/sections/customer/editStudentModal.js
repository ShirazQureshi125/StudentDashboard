import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
import { updateDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase';

const EditStudentModal = ({ open, onClose, student, onSave }) => {
    const [editedStudent, setEditedStudent] = useState(student);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedStudent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveEditedStudent = async () => {
        try {
            const studentRef = doc(db, 'students', student);
            await updateDoc(studentRef, editedStudent);
            onSave(editedStudent);
            onClose(); 
            window.location.reload();
        } catch (error) {
            console.error('Error updating student:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={editedStudent?.name || ''}
                    onChange={handleChange}
                />
                {/* Add more fields as necessary */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSaveEditedStudent}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStudentModal;
