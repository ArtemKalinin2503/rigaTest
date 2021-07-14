import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { TUser } from "../../hooks/useGetDataUsers/types";
import { Table, TableBody, TableContainer, TableHead, TableRow, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface IPropsTableGrid {
    cell: any,
    idCount?: string,
    rows: any,
    handleCopyTable?: any,
    nextCopyIndex?: number,
    handleEditRow?: any,
    handleDeleteRow?: any,
    handleDeleteTable? : any
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
    
    const {
        cell,
        idCount,
        rows,
        handleCopyTable,
        nextCopyIndex,
        handleEditRow,
        handleDeleteRow,
        handleDeleteTable
    } = props
    
    const [selected, setSelected] = useState<TUser>();
    
    // Клик по строке в таблице
    const handleClickRow = (
        event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        row: TUser,
        index: React.Key | null | undefined
    ) => {
        setSelected(row);
    };
    
    // Создать копию таблицы
    const handleCopy = async () => {
        const copyDataTables = {
            idCount: nextCopyIndex,
            dataTables: [...rows]
        };
        handleCopyTable(copyDataTables);
    };
    
    // Удалить копию таблицы
    const handleDeleteCopyTable = () => {
        if (idCount && handleDeleteTable) {
            handleDeleteTable(idCount);
        }
    };
    
    // Редактировать значение строки
    const editRow = (rowSelectIndex: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleEditRow(rowSelectIndex, idCount);
    };
    
    // Удалить значение строки
    const deleteRow = (rowSelectIndex: any) => {
        handleDeleteRow(rowSelectIndex, idCount);
    };
    
    useEffect(() => {
        console.log(rows);
    }, [rows]);
    
    // @ts-ignore
    const tableJSX = (cell: string[], rows: TUser[]) => {
        return (
            <TableContainer component={Paper}>
                <div className={classes.controlsTable}>
                    <Button variant="contained" color="primary" className={classes.btnCopy} onClick={handleCopy}>
                        Copy table
                    </Button>
                    <IconButton aria-label="Close" size="small" className={classes.btnClose}>
                        <CloseIcon fontSize="inherit" onClick={handleDeleteCopyTable}/>
                    </IconButton>
                </div>
                <Table className={classes.table} size="small" aria-label="">
                    <TableHead className={classes.headTable}>
                        <TableRow>
                            {cell && cell.map((itemCell: string, index: any) => {
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
                        {rows?.length && rows.map((row: TUser, index: React.Key | null | undefined) => (
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
                                    <Button
                                        className={classes.tableCell}
                                        color="primary"
                                        onClick={(index) => editRow(index)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className={classes.tableCell}
                                        color="primary"
                                        onClick={(index) => deleteRow(index)}
                                    >
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
        </>
    );
}

export default TableGrid;
