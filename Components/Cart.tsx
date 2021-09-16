import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { api } from "../api";
import { hideCartComponent, showCartComponent } from "../store/CartShowSlice";
import { getBetData } from "../store/CartSlice";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import ActionButton from "./ActionButton";

interface CartOptions {
  id: string;
  price: number;
  numbers: number[];
  type: string;
  game_id: string;
  date: string;
  color: string;
}

interface CartProps {
  items: CartOptions[];
  onRemove: (id: string) => void;
  onSave: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  //   const cart = [...props.items];

  const closeCart = () => {
    dispatch(hideCartComponent());
  };
  const prices = props.items.map((p) => p.price);
  const totalPrice = prices.reduce((actual: number, next: number) => {
    return actual + next;
  }, 0);
  const removeItemToCart = (id: string) => {
    props.onRemove(id);
  };
  const formatDate2 = (date: Date) => {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.toDateString().split(" ")[2];

    return `${year}-${month}-${day} ${date.toLocaleTimeString()}`;
  };
  const isShow = useAppSelector(state => state.showCart.showComponent)

  const saveGame = () => {
    // if (totalPrice < 30) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Value of cart is less than R$ 30,00",
    //     visibilityTime: 1000,
    //     autoHide: true,
    //     topOffset: 30,
    //     bottomOffset: 40,
    //   });
    //   return;
    // }

    // const date2 = formatDate2(new Date());

    // const data = props.items.map((cart) => {
    //   return {
    //     gameNumbers: cart.numbers,
    //     price: cart.price,
    //     game_date: date2,
    //     game_id: cart.game_id,
    //   };
    // });

    // dispatch(getBetData(token, data));
    props.onSave();
  };

  return (
    
    <View style={styles.cartContainer}>
      <TouchableOpacity
        onPress={closeCart}
        style={{ position: "absolute", top: 10, right: 0 }}
      >
        <Icon name="close" size={30} color="#B5C401" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: 45, marginLeft: 25 }}
      >
        <Icon name="cart-outline" size={30} color="#B5C401" />
        <Text
          style={{
            color: "#707070",
            fontWeight: "bold",
            fontSize: 22,
            marginLeft: 12,
            marginBottom: 25,
          }}
        >
          CART
        </Text>
      </TouchableOpacity>
      <View style={{ maxHeight: 250 }}>
        <ScrollView>
          {props.items.length > 0 &&
            props.items.map((cartElement) => {
              return (
                <View
                  key={cartElement.id}
                  style={{
                    ...styles.betInfo,
                    borderLeftWidth: 6,
                    borderLeftColor: cartElement.color,
                  }}
                >
                  <Text style={{ ...styles.betNumbers }}>
                    {cartElement.numbers.toString()}
                  </Text>
                  <View
                    style={{
                      width: "90%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 7,
                    }}
                  >
                    <Text
                      style={{
                        color: "#868686",
                        fontSize: 15,
                        fontWeight: "normal",
                      }}
                    >
                      {cartElement.date} - (R${" "}
                      {cartElement.price
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                      )
                    </Text>
                    <TouchableOpacity
                      onPress={removeItemToCart.bind(null, cartElement.id)}
                    >
                      <Icon
                        name="trash-can-outline"
                        color="#707070"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: cartElement.color,
                    }}
                  >
                    {cartElement.type}
                  </Text>
                </View>
              );
            })}

          {props.items.length === 0 && (
            <View
              style={{
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.notFound}>Cart empty</Text>
            </View>
          )}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            top: 300,
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 28,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...styles.cartTotalText,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Cart
            </Text>
            <Text style={styles.cartTotalText}> Total:</Text>
          </View>
          <Text style={{ ...styles.cartTotalText, fontWeight: "bold" }}>
            R${totalPrice.toFixed(2).toString().replace(".", ",")}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 350,
            width: 245,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EBEBEB",
            flexDirection: "row",
          }}
          onPress={saveGame}
        >
          <Text
            style={{
              color: "#B5C401",
              fontSize: 30,
              marginRight: 15,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Save
          </Text>
          <Icon name="arrow-right" size={30} color="#B5C401" />
        </TouchableOpacity>
      </View>
    </View>
    
    
  );
};
export default Cart;

const styles = StyleSheet.create({

  cartContainer: {
    position: 'absolute',
    right: 10,
    
    
    height: "85%",
    width: 250,
    zIndex: 185181,
    backgroundColor: "#FFFFFF"
  },
  betInfo: {
    paddingLeft: 14,
    marginLeft: 28,
    marginBottom: 25,
    // borderLeft: 4px solid ${(props) => props.borderColor},
    borderRadius: 5,
  },
  betNumbers: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#868686",
    width: 196,
    flexWrap: "wrap",
  },
  notFound: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#868686",
  },
  cartTotalText: {
    fontSize: 15,
    color: "#707070",
    textTransform: "uppercase",
  },
});
