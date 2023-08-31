import  Box  from '@mui/system/Box';
import React from 'react';
import './confirm.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ConfirmDelete = ({ open, setopen, resetFunc, deleteFunction,
  deleteLoading, message, succcessMsg, errorMessage,
  loadingText, textContent
}) => {
    const handleClose = () => {
        setopen(false)
        resetFunc()
    }
    return (
          <Dialog
          open={open} onClose={handleClose}
          keepMounted={deleteLoading}
          fullWidth={true}
          fullScreen={false}
          TransitionComponent={Transition}
          sx={{  width: "auto", height: "auto", '& .':{opacity:0} }}
            >
             <h2
            style={{
              padding: "14px",
              // paddingTop:0,
              fontWeight: "bold",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.6)",
            }}
          >
            Are you sure to {" "}
            <span style={{fontWeight:700}} className="">
              {" " + message}
            </span>
          </h2>
          
               {(succcessMsg?.length || errorMessage?.length)? (
          <DialogContent >
            <Box
             
                sx={{
                  // boxShadow: "0px 0px 2px 0px rgba(20,0,0,0.4)",
                  py: 2,
                  width:'100%'
                }}
            >
                {succcessMsg?.length ? (
                  <Typography className="success_text">
                    {succcessMsg}
                  </Typography>
                ) : null}
                {errorMessage?.length ? (
                <Typography className="error_text ">
                  {errorMessage}
                </Typography>
              ) : null}
            </Box>
          </DialogContent>
          ) : null}
                <DialogActions>
                     <Stack direction={"row"} spacing={3}>
              <Button
                size="medium"
                variant="outlined"
                color={`info`}
                disabled={deleteLoading}
                sx={{
                  mr: 2, fontSize: { md: "11px", sm: "7px", xs: "7px" },
                  bgcolor: 'gray',
                }}
                onClick={handleClose}
              >
                Close
              </Button>
             
              <Button
                size="medium"
                variant="contained"
                color={`error`}
                disabled={deleteLoading}
                sx={{ mr: 1, fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
                onClick={deleteFunction}
              >
                {deleteLoading ? loadingText : textContent }
              </Button>
            </Stack>
          </DialogActions>      
        </Dialog>   
    );
}

export default ConfirmDelete;
