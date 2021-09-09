export const formList = [
    {
        field: 'name',
        label: 'Name',
        errorMessage: 'Name cannot be Empty',
        isCheckEmpty: true,
        type: 'text',
        fieldType: 'textField',
        classNames: 'textArea'
    },
    {
        field: 'description',
        label: 'Description',
        errorMessage: 'Description cannot be Empty',
        isCheckEmpty: true,
        type: 'text',
        fieldType: 'textArea',
        classNames: 'textArea'
    },
    {
        field: 'price',
        label: 'Price',
        errorMessage: 'Price cannot be Empty',
        isCheckEmpty: true,
        type: 'number',
        fieldType: 'textField',
        classNames: 'textArea',
        regex: '^\\d+$'
    }
];
