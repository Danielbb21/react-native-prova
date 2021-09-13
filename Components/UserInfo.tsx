import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getGameData } from "../store/GameSlice";
import { showUpdate } from "../store/ShowUpdate";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo } from "../store/UserSlice";
import UpdateUser from "./UpdateUser";

interface UserGame {
  type: string;
  quantity: number;
  price: number | null;
}

const UserInfo = () => {
  const userGameInfo: UserGame[] = [];
  const [perPrice, setPerPrice] = useState<boolean>(false);
  const games = useAppSelector((state) => state.game.items);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);
  // const [userUpdate, setUserUpdate] = useState<boolean>(false);
  const userUpdate = useAppSelector(state =>  state.update.isShow);
  
  useEffect(() => {
    
    dispatch(getGameData(token));

    dispatch(getUserInfo(token));
  }, [token, dispatch]);

  const typeOfGames = games.map((game) => game.type);

  const perPriceHandler = () => {
    setPerPrice((previus) => !previus);
  };

  const checkPrice = (typeGame: string | null | undefined): number => {
    if (typeGame) {
      let price = 0;
      const gameValue = user.gambles.filter((cart) => {
        return cart["game"] ? cart["game"]["type"] === typeGame : "";
      });
      gameValue.forEach((game) => {
        price += game["price"];
      });

      if (price) {
        return price;
      }
      return 0;
    }
    return 0;
  };

  typeOfGames.forEach((game) => {
    let price = checkPrice(game);

    let quantity = user.gambles.filter((cart) => {
      return cart["game"] ? cart["game"]["type"] === game : "";
    }).length;
    userGameInfo.push({
      type: game,
      quantity: quantity,
      price: price,
    });
  });

  return (
    <>
    {!userUpdate &&<View style={styles.fatherContainer}>
      <View style={styles.container}>
        <Text style={{ ...styles.textStyle, marginTop: 10, fontSize: 20 }}>
          Your information
        </Text>
        <Text style={{ ...styles.textStyle, fontSize: 17, marginTop: 5 }}>
          Name: {user.name}
        </Text>
        <Text style={{ ...styles.textStyle, fontSize: 17, marginTop: 5 }}>
          Name: {user.email}
        </Text>
        <Text style={{ ...styles.textStyle, fontSize: 20, marginTop: 10 }}>
          {!perPrice
            ? "Number of games per game type"
            : "Value spent in each type of game"}
        </Text>
        <ScrollView>
          <View>
            {userGameInfo &&
              userGameInfo.map((user) => {
                return (
                  <View key = {Math.random().toString()}
                    style={{
                      maxHeight: 100,
                      overflow: "scroll",
                      flexDirection: "row",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ ...styles.textStyle, fontSize: 15 }}>
                      {" "}
                      {user.type}:{" "}
                    </Text>
                    <Text style={{ ...styles.textStyle, fontSize: 15 }}>
                      {!perPrice
                        ? user.quantity
                        : `R$ ${user.price
                            ?.toFixed(2)
                            .toString()
                            .replace(".", ",")}`}
                    </Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{ ...styles.choseOptionButton, marginTop: 10}}
          onPress={() => dispatch(showUpdate())}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
           
            Update data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.choseOptionButton, marginTop: 30 }}
          onPress={perPriceHandler}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {" "}
            {!perPrice ? "Get by price" : "Get by quantity"}
          </Text>
        </TouchableOpacity>
      </View>
    </View> }
    {userUpdate && 
      <UpdateUser />
    }
    </>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  fatherContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 300,
    height: 400,
    backgroundColor: "#fff",
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  choseOptionButton: {
    height: 45,
    width: 150,
    borderRadius: 20,
    backgroundColor: "#01AC66",
    borderColor: "#01AC66",
    alignItems: "center",
    justifyContent: "center",
  },
});
