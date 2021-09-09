import React from 'react';
import Form from 'components/Form/Form';
import { formList } from './config';
import { useHistory, useParams } from 'react-router-dom';
import validator from 'validator';
import FoodMenuApi from '../../lib/Api/FoodMenu';
import { useSnackbar } from 'notistack';
const CreateFoodMenu = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const handelFormSubmit = (formValues, formErrors) => {
        const { name, price, description } = formValues;

        if (validator.isEmpty(name)) {
            formErrors['name'] = 'Name cannot be Empty';
        }
        if (validator.isEmpty(price)) {
            formErrors['price'] = 'Price cannot be Empty';
        }
        if (validator.isEmpty(description)) {
            formErrors['description'] = 'Description cannot be Empty';
        }

        if (Object.keys(formErrors).length === 0) {
            FoodMenuApi.createFoodMenu({ name, price: +price, description }, id)
                .then((response) => {
                    console.log('response :', response);
                    history.push(`/restaurants/${id}/food`);
                    enqueueSnackbar('New food item created successfully', {
                        variant: 'success'
                    });
                })
                .catch((err) => {
                    console.log('err :', err);
                    enqueueSnackbar('Failed to create food Item', {
                        variant: 'error'
                    });
                });
        }
    };

    return (
        <div>
            <h1>RestaurantFoodList</h1>
            <Form
                formList={formList}
                handelFormSubmit={handelFormSubmit}
                heading={'Create Food'}
            />
        </div>
    );
};

export default CreateFoodMenu;
