import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

// Hook получает данные из формы
export const useForm = (initialValuesForm: any) => {

    const [values, setValues] = useState(initialValuesForm);
    
    // Получаем данные из формы
    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        handleInputChange,
    }
}

// Компонент, который принимает в качестве children компонент форму
export const Form = (props: { [x: string]: any; children: any; }) => {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}
