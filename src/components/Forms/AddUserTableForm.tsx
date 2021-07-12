import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useForm, Form } from "../../hooks/useForms";
import { TextField ,Typography } from '@material-ui/core';

interface IPropsAddUserForm {
    handleAddUser?: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
        buttonAdd: {
            width: '100%',
            maxWidth: 200,
            margin: 8,
            backgroundColor: '#5092F7'
        }
    }),
);

const initialValuesForm = {
    name: '',
    surname: '',
    age: '',
    city: ''
}

// Форма добавления пользователя в таблицу "Пользователи"
const AddUserTableForm = (props: IPropsAddUserForm) => {
    
    const {
        handleAddUser
    } = props
    
    const classes = useStyles();
    
    const { values, handleInputChange } = useForm(initialValuesForm);
    
    const [validForm, setValidFrom] = useState(true);

    // Валидация формы
    const handleAdd = (e: { preventDefault: () => void;}, values: any) => {
        e.preventDefault();
        if (values && (values.name && values.surname && values.age && values.city)) {
            setValidFrom(true);
            handleAddUser(e, values)
        } else {
            setValidFrom(false);
        }
    };
    
    return (
        <>
            <Form
                id="addUserTable"
                className={classes.root}
                noValidate autoComplete="off"
                onSubmit={(e: { preventDefault: () => void;}) => handleAdd(e, values)}>
                <div>
                    <TextField
                        error={values && !values.name && !validForm}
                        id="outlined-error"
                        label="Name"
                        defaultValue="Name"
                        name="name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={values.name}
                        required
                    />
                </div>
                <div>
                    <TextField
                        error={values && !values.surname && !validForm}
                        id="outlined-error"
                        label="Surname"
                        name="surname"
                        defaultValue="Surname"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={values.surname}
                        required
                    />
                </div>
                <div>
                    <TextField
                        error={values && !values.age && !validForm}
                        id="outlined-error"
                        label="Age"
                        name="age"
                        defaultValue="Age"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={values.age}
                        required
                    />
                </div>
                <div>
                    <TextField
                        error={values && !values.city && !validForm}
                        id="outlined-error"
                        label="City"
                        name="city"
                        defaultValue="City"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={values.city}
                        required
                    />
                </div>
                {!validForm &&
                <Typography
                    variant="caption"
                    component="h3"
                    color="error"
                >
                    Все поля обязательны для заполнения
                </Typography>
                }
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonAdd}
                    type="submit"
                    form="addUserTable"
                >
                    Add
                </Button>
            </Form>
        </>
    );
};

export default AddUserTableForm;
