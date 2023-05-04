import react from 'react';

const UseInput = ({ type, value, name, 
    handleChange, handleBlur, classname,
    placeholder }) => {
    
    
    return (
        <input type={type} name={name} id={name} onChange={handleChange}
            className={classname} placeholder={placeholder}
            value={value} onBlur={handleBlur}
       />
    );
}

export default UseInput;
