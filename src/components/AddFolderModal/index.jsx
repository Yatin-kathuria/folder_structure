import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  py: 4,
  px: 4
};

const AddFolderModal = ({ open, onClose, onAdd }) => {
  const [selectedTypeChip, setSetselectedTypeChip] = useState('Folder')
  const [selectedWhereChip, setSelectedWhereChip] = useState('Inside')
  const [name, setName] = useState('')

  function handleTypeSelectChip (event) {
    setSetselectedTypeChip(event.target.innerText);
  }

  function handleWhereSelectChip (event) {
    setSelectedWhereChip(event.target.innerText);
  }

  function handleClose () {
    setSetselectedTypeChip('Folder')
    setSelectedWhereChip('Inside')
    setName('')
    onClose()
  }

  function handleAdd () {
    if(!name.trim()) return 
    onAdd({name, type: selectedTypeChip, position: selectedWhereChip})
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Add Folder/File</h2>
        <Typography my={2}>Select What you want Add?</Typography>
        <Stack direction="row" spacing={2}>
          <Chip label="Folder" name="Folder" color="primary" variant={selectedTypeChip === "Folder" ? "filled" : "outlined"} onClick={handleTypeSelectChip} />
          <Chip label="File" name="File" color="primary" variant={selectedTypeChip === "File" ? "filled" : "outlined"} onClick={handleTypeSelectChip} />
        </Stack>
        <Typography my={2}>Select Where you want Add?</Typography>
        <Stack direction="row" spacing={2}>
          <Chip label="Inside" name="Inside" color="primary" variant={selectedWhereChip === "Inside" ? "filled" : "outlined"} onClick={handleWhereSelectChip} />
          <Chip label="Above" name="Above" color="primary" variant={selectedWhereChip === "Above" ? "filled" : "outlined"} onClick={handleWhereSelectChip} />
          <Chip label="Below" name="Below" color="primary" variant={selectedWhereChip === "Below" ? "filled" : "outlined"} onClick={handleWhereSelectChip} />
        </Stack>
        <Typography my={2}>Give your {selectedTypeChip} a name</Typography>
        <TextField id="outlined-basic" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} sx={{'width': '100%'}}/>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} mt={4}>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default AddFolderModal