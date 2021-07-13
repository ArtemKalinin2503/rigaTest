import React, { useEffect, useState } from "react";
import { useGetDataUsers } from "../../hooks/useGetDataUsers";
import AddUserTableForm from "../Forms/AddUserTableForm";
import { useAddDataUser } from "../../hooks/useAddDataUser";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableGrid from "../Tables/TableGrid";
import { TUser } from "../../hooks/useGetDataUsers/types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
        wrapper: {
            width: '100%'
        }
    }),
);

const UsersInfo = () => {
    
    const classes = useStyles();
    
    const { loading, data } = useGetDataUsers();
    
    const { addUser }  = useAddDataUser();
    
    const userTableNameCell = ['Name', 'Surname', 'Age', 'City'];
    
    const [copyDataTable, setCopyDataTable] = useState([] as Array<object>);
    const [nextCopyIndex, setNextCopyIndex] = useState(1);
    
    useEffect(() => {
        console.log(data);
    }, [data]);
    
    // Новая запись в БД
    const handleAddUser = async (e: { preventDefault: () => void }, values: TUser) => {
        e.preventDefault();
        await addUser(values);
    };
    
    // Кнопка копировать таблицу
    const handleCopyOriginal = (copyDataTablesUsers: any) => {
        setCopyDataTable(
            [...copyDataTable, copyDataTablesUsers]
        );
        setNextCopyIndex(nextCopyIndex + 1);
    };
    
    // Редактировать строку в ячейке
    const handleEditRow = (index: any, idCount: any) => {
        console.log('rowIndex ' + index);
        console.log('idCountTable ' + idCount);
    };
    
    // Удалить строку в ячейке
    const handleDeleteRow = (index: any, idCount: any) => {
        console.log('rowIndex ' + index);
        console.log('idCountTable ' + idCount);
        console.log(copyDataTable);
        const newCopyDataTable = copyDataTable;
        newCopyDataTable.forEach((item) => {
            // @ts-ignore
            if (item?.idCount === idCount) {
                // @ts-ignore
                item?.dataTables.splice(index, 1);
            }
        });
        setCopyDataTable(newCopyDataTable);
    };
    
    useEffect(() => {
        console.log(copyDataTable);
    }, [copyDataTable]);
    
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <AddUserTableForm
                    handleAddUser={(e: { preventDefault: () => void; }, values: TUser) => handleAddUser(e, values)}
                />
            </div>
            <div className={classes.wrapper}>
                {loading
                    ?
                    <CircularProgress color="primary"/>
                    :
                    <TableGrid
                        cell={userTableNameCell}
                        rows={data}
                        nextCopyIndex={nextCopyIndex}
                        handleCopyTable={(copyDataTablesUsers: TUser[]) => handleCopyOriginal(copyDataTablesUsers)}
                        handleEditRow={(index: any, idCount: any) => handleEditRow(index, idCount)}
                        handleDeleteRow={(index: any, idCount: any) => handleDeleteRow(index, idCount)}
                    />
                }
                {copyDataTable?.length && copyDataTable.map((item) => {
                    return (
                        <>
                            <TableGrid
                                cell={userTableNameCell}
                                // @ts-ignore
                                idCount={item?.idCount}
                                // @ts-ignore
                                rows={item?.dataTables}
                                nextCopyIndex={nextCopyIndex}
                                handleCopyTable={(copyDataTablesUsers: TUser[]) => handleCopyOriginal(copyDataTablesUsers)}
                                handleEditRow={(index: any, idCount: string) => handleEditRow(index, idCount)}
                                handleDeleteRow={(index: any, idCount: string) => handleDeleteRow(index, idCount)}
                            />
                        </>
                    )
                })
                }
            </div>
        </div>
    )
};

export default UsersInfo;
