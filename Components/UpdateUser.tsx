import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { hideUpdate } from '../store/ShowUpdate';
import { useAppDispatch, useAppSelector } from '../store/store-hooks'
import { getUserInfo } from '../store/UserSlice';

const UpdateUser = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.user.token);
    
    const user = useAppSelector((state) => state.user.info);
  
    const [enteredEmail, setEnteredEmail] = useState<string>("");
    const [enteredName, setEnteredName] = useState<string>("");
    const [enteredPassword, setEnteredPassword] = useState<string>("");
    const [enteredConfirmPassword, setEnteredConfirmPassword] =
      useState<string>("");
    const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      enteredEmail
    );
    const nameValid = enteredName.trim().length !== 0;
    const passwordValid = enteredPassword.trim().length >= 6;
    const passwordConfirmValid = enteredConfirmPassword.trim().length >= 6;
    const formIsValid =
      nameValid && emailValid && passwordValid && passwordConfirmValid;
    
  
    useEffect(() => {
      if (token) {
        dispatch(getUserInfo(token));
        setEnteredName(user.name);
        setEnteredEmail(user.email);
      }
    }, [token, dispatch, user.name, user.email]);
    console.log('email', enteredEmail);
    console.log('email', enteredName);
    
    return (
        <View style ={styles.mainWrapper}>
            <Text style={{...styles.textStyle, fontSize: 20}}>Update your data</Text>

            <TouchableOpacity onPress = {() => dispatch(hideUpdate())}>
                <Text >Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateUser


const styles = StyleSheet.create({
    mainWrapper: {
        height: 400,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        position: "absolute",
        top: 150,
        left: 50
    },
    textStyle: {
        fontWeight: "bold",
        fontStyle: "italic",
      },
})