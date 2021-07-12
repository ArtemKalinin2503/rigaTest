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
    
    
    useEffect(() => {
        console.log(data);
    }, [data]);
    
    // Новая запись в БД
    const handleAddUser = async (e: { preventDefault: () => void }, values: TUser) => {
        e.preventDefault();
        await addUser(values);
    };
    
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
                    />
                }
            </div>
        </div>
    )
};

export default UsersInfo;
