import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const useForm = (validateValue: (value: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState('');
    

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid ;

    
    const changeValueHandler = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        
        setEnteredValue(event.nativeEvent.text);

    };
    const cleanField = () =>{
        setEnteredValue('');
    }

   
    
    return { value: enteredValue, isValid: valueIsValid,hasError, changeValueHandler, cleanField }
}

export default useForm;