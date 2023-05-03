// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

// function getFullName(params) {
//   return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
// }

// const columns = [
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     width: 160,
//     valueGetter: getFullName,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon' },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
//   { id: 4, lastName: 'Stark', firstName: 'Arya' },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
// ];

// export function ValueGetterGrid() {
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns} />
//     </Box>
//   );
// }


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { randomStatusOptions, randomPrice } from '@mui/x-data-grid-generator';

// const rows1 = [
//   {
//     id: 1,
//     status: randomStatusOptions(),
//     subTotal: randomPrice(),
//     total: randomPrice(),
//   },
//   {
//     id: 2,
//     status: randomStatusOptions(),
//     subTotal: randomPrice(),
//     total: randomPrice(),
//   },
//   {
//     id: 3,
//     status: randomStatusOptions(),
//     subTotal: randomPrice(),
//     total: randomPrice(),
//   },
// ];

// const currencyFormatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
// });

// const usdPrice = {
//   type: 'number',
//   width: 130,
//   valueFormatter: ({ value }) => currencyFormatter.format(value),
//   cellClassName: 'font-tabular-nums',
// };

// export  function CustomColumnTypesGrid() {
//   return (
//     <Box
//       sx={{
//         height: 300,
//         width: '100%',
//         '& .font-tabular-nums': {
//           fontVariantNumeric: 'tabular-nums',
//         },
//       }}
//     >
//       <DataGrid
//         columns={[
//           { field: 'status', width: 130 },
//           { field: 'subTotal', ...usdPrice },
//           { field: 'total', ...usdPrice },
//         ]}
//         rows={rows1}
//       />
//     </Box>
//   );
// }


// import * as React from 'react';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { DataGrid } from '@mui/x-data-grid';

// export default function VisibleColumnsModelControlled() {
//   const { data, loading } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 20,
//     maxColumns: 20,
//   });

//   const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
//     id: false,
//     brokerId: false,
//     status: false,
//   });

//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid
//         {...data}
//         loading={loading}
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={(newModel) =>
//           setColumnVisibilityModel(newModel)
//         }
//       />
//     </div>
//   );
// }


import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { DataGrid, GridColumnMenu } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomUserItem(props) {
  const { myCustomHandler, myCustomValue } = props;
  return (
    <MenuItem onClick={myCustomHandler}>
      <ListItemIcon>
        <SettingsApplicationsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{myCustomValue}</ListItemText>
    </MenuItem>
  );
}

function CustomColumnMenu(props) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Add new item
        ColumnMenuUserItem: CustomUserItem,
      }}
      slotProps={{
        columnMenuUserItem: {
          // set `displayOrder` for new item
          displayOrder: 15,
          // pass additional props
          myCustomValue: 'Do custom action',
          myCustomHandler: () => alert('Custom handler fired'),
        },
      }}
    />
  );
}

export default function AddNewColumnMenuGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
    maxColumns: 5,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} slots={{ columnMenu: CustomColumnMenu }} />
    </div>
  );
}
