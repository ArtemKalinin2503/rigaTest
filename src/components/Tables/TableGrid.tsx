import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { TUser } from "../../hooks/useGetDataUsers/types";
import { Table, TableBody, TableContainer, TableHead, TableRow, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAddCopyDataUsers } from "../../hooks/useAddCopyDataUsers";

interface IPropsTableGrid {
    cell: any,
    rows: any,
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        "&$selected, &$selected:hover": {
            backgroundColor: "#5092F7"
        }
    },
    tableCell: {
        "$selected &": {
            color: "white"
        }
    },
    headTable: {
        backgroundColor: "#2A4F88"
    },
    headTableCell: {
        color: "#B9D5F1"
    },
    btnCopy: {
        backgroundColor: "#5092F7",
        color: "white",
        width: '80',
        fontSize: 10,
        marginRight: 20
    },
    controlsTable: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: 20
    },
    btnClose: {
      color: 'red',
        fontSize: 20,
        fontWeight: "bold"
    },
    hover: {},
    selected: {}
});

const TableGrid = (props: IPropsTableGrid) => {
    
    const classes = useStyles();
    
    const {addUsersCopy, loading, data} = useAddCopyDataUsers();
    
    const {
        cell,
        rows,
    } = props
    
    const [selected, setSelected] = useState<TUser>();
    const [countCopy, setCountCopy] = useState(0);
    
    const handleClickRow = (
        event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        row: TUser,
        index: React.Key | null | undefined
    ) => {
        setSelected(row);
        console.log(index);
        console.log(row);
    };
    
    // Создать копию таблицы
    const handleCopyTable = async () => {
        let count = 0;
        console.log(countCopy)
        await addUsersCopy(
            rows,
            countCopy ? countCopy + 1 : count + 1
        );
    };
    
    // Удалить копию таблицы
    const handleDeleteCopyTable = () => {
        if (countCopy) {
            // @ts-ignore
            setCountCopy(countCopy - 1);
        }
    };
    
    useEffect(() => {
        // Получаю самый последний idCount - для того, чтобы если были ранее сохраненные копии, актуализировать свой count
        const maxCount = data?.length && data.reduce((acc, curr) => acc.b > curr.b ? acc : curr);
        // @ts-ignore
        if (maxCount?.idCopy) {
            // @ts-ignore
            setCountCopy(maxCount?.idCopy);
        }
        console.log(data);
    }, [data]);
    
    const tableJSX = (cell: string[], rows: TUser[]) => {
        return (
            <TableContainer component={Paper}>
                <div className={classes.controlsTable}>
                    <Button variant="contained" color="primary" className={classes.btnCopy} onClick={handleCopyTable}>
                        Copy table
                    </Button>
                    <IconButton aria-label="Close" size="small" className={classes.btnClose}>
                        <CloseIcon fontSize="inherit" onClick={handleDeleteCopyTable}/>
                    </IconButton>
                </div>
                <Table className={classes.table} size="small" aria-label="">
                    <TableHead className={classes.headTable}>
                        <TableRow>
                            {cell && cell.map((itemCell: string, index: React.Key | null | undefined) => {
                                return (
                                    <TableCell key={index} className={classes.headTableCell}>
                                        {itemCell}
                                    </TableCell>
                                )
                            })}
                            <>
                                <TableCell className={classes.headTableCell} />
                                <TableCell className={classes.headTableCell} />
                            </>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: TUser, index: React.Key | null | undefined) => (
                            <TableRow
                                className={classes.tableRow}
                                classes={{ hover: classes.hover, selected: classes.selected }}
                                hover
                                key={index}
                                onClick={(event) => handleClickRow(event, row, index)}
                                selected={selected === row}
                            >
                                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                                <TableCell className={classes.tableCell}>{row.surname}</TableCell>
                                <TableCell className={classes.tableCell}>{row.age}</TableCell>
                                <TableCell className={classes.tableCell}>{row.city}</TableCell>
                                <TableCell>
                                    <Button className={classes.tableCell} color="primary">
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.tableCell} color="primary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    };
    return (
        <>
            {tableJSX(cell, rows)}
            {/*// @ts-ignore*/}
            {data && tableJSX(cell, data)}
        </>
    );
}

export default TableGrid;
