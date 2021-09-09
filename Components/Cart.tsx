import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { hideCartComponent } from "../store/CartShowSlice";
import { useAppDispatch } from "../store/store-hooks";

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
}

const Cart: React.FC<CartProps> = (props) => {
  const dispatch = useAppDispatch();

  //   const cart = [...props.items];

  const closeCart = () => {
    dispatch(hideCartComponent());
  };
  const prices = props.items.map((p) => p.price);
  const totalPrice = prices.reduce((actual: number, next: number) => {
    return actual + next;
  }, 0);
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
      <View style={{ maxHeight: 400 }}>
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
                    <Icon name="trash-can-outline" color="#707070" size={20} />
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
            top: 410,
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
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    position: "absolute",
    right: 0,
    top: 15,
    opacity: 1,
    height: "100%",
    width: 265,
    zIndex: 185181,
    backgroundColor: "#FFFFFF",
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
