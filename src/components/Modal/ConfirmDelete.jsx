import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ConfirmDelete = ({ open, setopen, resetFunc, deleteFunction,
  deleteLoading, message, succcessMsg, errorMessage }) => {
    const handleClose = () => {
        setopen(false)
        resetFunc()
    }
    return (
        <div>
          <Dialog
          open={open} onClose={handleClose}
          keepMounted={deleteLoading}
          fullWidth={true}
          fullScreen={false}
          TransitionComponent={Transition}
          sx={{ p: 3, width: "auto", height: "auto", '& .':{opacity:0} }}
            >
             <h2
            style={{
              padding: "14px",
              fontWeight: "bold",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.6)",
            }}
          >
            Are you sure to {" "}
            <span className="text-red-600">
              {" " + message}
            </span>
          </h2>
          
               {(succcessMsg?.length || errorMessage?.length)? (
          <DialogContent >
            <Box
              px={2}
              my={2}
              sx={{ boxShadow: "0px 0px 2px 0px rgba(20,0,0,0.4)" }}
            >
                {succcessMsg?.length ? (
                  <Typography className="text-green-600 rounded-3xl px-3 py-3 text-sm">
                    {succcessMsg}
                  </Typography>
                ) : null}
                {errorMessage?.length ? (
                <Typography className="text-red-400 rounded-3xl px-3 py-3 text-sm">
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
                sx={{ mr: 2, fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
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
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </Stack>
          </DialogActions>      
        </Dialog>   
        </div>
    );
}

export default ConfirmDelete;
