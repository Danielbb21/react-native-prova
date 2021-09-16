import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  
} from "react-native";
import Modal from 'react-native-modal';
import Toast  from "react-native-toast-message";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch } from "../store/store";
import { useAppSelector } from "../store/store-hooks";
import ActionButton from "./ActionButton";
import Cart from "./Cart";
import FilterGameButtons from "./FilterGameButtons";
import GameInfo from "./GameInfo";
import Number, { NumberChosed } from "./Number";
import {
  hideCart,
  hideCartComponent,
  showCart,
  showCartComponent,
} from "../store/CartShowSlice";
import { getBetData } from "../store/CartSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../Routes";

interface Options {
  type: string;
  description: string;
  range: number;
  price: number;
  color: string;
  game_id: string;
  "max-number": number;
}
interface CartOptions {
  id: string;
  price: number;
  numbers: number[];
  type: string;
  game_id: string;
  date: string;
  color: string;
}

interface ParamTypes {
  id: string;
}
type authScreenProp = StackNavigationProp<RootStackParamList>;

const Bet = () => {
  const navigation = useNavigation<authScreenProp>();

  const allGames = useAppSelector((state) => state.game.items);
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const games = useAppSelector((state) => state.game.items);
  const [filterGame, setFilterGame] = useState<string>("");

  const [gameOptions, setGameOptions] = useState<Options>();
  const [numbersOfTheGame, setNumbersOfTheGame] = useState<number[]>([]);
  const [chosedNumbers, setChosedNumber] = useState<number[]>([]);
  const [cartNumbers, setCartNumber] = useState<CartOptions[]>([]);

  const showCartElement = useAppSelector(
    (state) => state.showCart.showComponent
  );

  const fillNumbers = (maxNumbers: number, range: number): number[] => {
    var numeros = [];

    while (numeros.length < maxNumbers) {
      var aleatorio = Math.floor(Math.random() * range) + 1;

      if (numeros.indexOf(aleatorio) === -1) numeros.push(aleatorio);
    }
    return numeros;
  };

  const comparaNumeros = (a: number, b: number): number => {
    if (a === b) return 0;
    if (a < b) return -1;
    if (a > b) return 1;
    else return 3;
  };

  const [filter, setFilter] = useState<string>("");
  const [showGameInfo, setShowGameInfo] = useState<boolean>(true);
  const pickNumbersOfTheArray = useCallback((range: number) => {
    const arrayOfNumbers = fillNumbers(range, range);
    const sortedArray = arrayOfNumbers.sort(comparaNumeros);

    setNumbersOfTheGame(sortedArray);
  }, []);

  useEffect(() => {
    dispatch(getGameData(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (games.length === 0) return;
    let gameOne = games[0];
    setFilter(games[0].type);
    const {
      price,
      color,
      range,
      type,
      id,
      description,
      "max-number": maxNumber,
    } = gameOne;
    setGameOptions({
      price,
      color,
      range,
      type,
      game_id: id,
      description,
      "max-number": maxNumber,
    });
    pickNumbersOfTheArray(range);
  }, [pickNumbersOfTheArray, games, dispatch, token]);

  useEffect(() => {
    if (chosedNumbers.length > 0) {
      dispatch(showCart());
    } else {
      dispatch(hideCart());
    }
  }, [chosedNumbers]);
  const setFilterHandler = (typeGame: string) => {
    const gameChosed = games.filter((game) => game.type === typeGame);
    setFilter(gameChosed[0].type);
    if (typeGame !== gameOptions?.type) {
      setChosedNumber([]);
    }
    const {
      price,
      color,
      range,
      type,
      id,
      description,
      "max-number": maxNumber,
    } = gameChosed[0];
    setGameOptions({
      game_id: id,
      price,
      color,
      range,
      type,
      description,
      "max-number": maxNumber,
    });
    pickNumbersOfTheArray(range);
  };

  const formatDate2 = (date: Date) => {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.toDateString().split(" ")[2];

    return `${day}/${month}/${year}`;
  };

  const isPosibleToChoseTheNumber = (numberToBeChose: number): boolean => {
    const isAlreadyChosed = chosedNumbers.find(
      (num) => num === numberToBeChose
    );
    const isAlreadyIntheLimit =
      chosedNumbers.length === gameOptions?.["max-number"];
    if (isAlreadyChosed) {
      setChosedNumber((previus) => {
        const arr = [...previus];
        arr.filter((num) => num !== numberToBeChose);
        const novo = arr.sort(comparaNumeros);
        return novo;
      });
      return false;
    }
    if (isAlreadyIntheLimit) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You already chosed all the numbers",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

      return false;
    }

    return true;
  };

  const formatDate = (date: Date) => {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.toDateString().split(" ")[2];

    return `${year}-${month}-${day} ${date.toLocaleTimeString()}`;
  };

  const saveBets = () => {
    const prices = cartNumbers.map((p) => p.price);
    const totalPrice = prices.reduce((actual: number, next: number) => {
      return actual + next;
    }, 0);

    if (totalPrice < 30) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Value of cart is less than R$ 30,00",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    const date2 = formatDate(new Date());

    const data = cartNumbers.map((cart) => {
      return {
        gameNumbers: cart.numbers,
        price: cart.price,
        game_date: date2,
        game_id: cart.game_id,
      };
    });

    dispatch(getBetData(token, data));
    setCartNumber([]);
    dispatch(hideCartComponent());
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1500);
  };

  const handleChoseNumber = (numberChosed: number) => {
    const isPosibleToChose = isPosibleToChoseTheNumber(numberChosed);
    setShowGameInfo(true);
    if (isPosibleToChose) {
      setChosedNumber((previusState) => {
        let newArray = [...previusState];
        newArray.push(numberChosed);
        const novo = newArray.sort(comparaNumeros);
        return novo;
      });
    }
  };

  const removeNumber = (num: number) => {
    setChosedNumber((previus) => {
      const arr = [...previus];
      const novo = arr
        .filter((element) => element !== num)
        .sort(comparaNumeros);
      return novo;
    });
  };

  const completeGameHandler = () => {
    let arrayOfChosenNumbers = [...chosedNumbers];

    if (arrayOfChosenNumbers.length === gameOptions?.["max-number"]) {
      arrayOfChosenNumbers = [];
    }
    if (!gameOptions) {
      return;
    }

    while (arrayOfChosenNumbers.length !== gameOptions?.["max-number"]) {
      let numberSorted = Math.floor(Math.random() * gameOptions?.range) + 1;

      let isAlreadyChosed = arrayOfChosenNumbers.find(
        (number) => number === numberSorted
      );
      if (!isAlreadyChosed) {
        arrayOfChosenNumbers.push(numberSorted);
      }
    }
    const arr = arrayOfChosenNumbers.sort(comparaNumeros);
    setChosedNumber(arr);
  };

  const clearGameHandler = () => {
    if (chosedNumbers.length > 0) {
      setChosedNumber([]);
    }
  };

  const addGameToCartHandler = () => {
    if (chosedNumbers.length !== gameOptions?.["max-number"]) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Still missing numbers in your game",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

      return;
    }
    setCartNumber((previus) => {
      const newArray = [...previus];
      newArray.push({
        id: Math.random().toString(),
        color: gameOptions.color,
        numbers: chosedNumbers,
        price: gameOptions.price,
        type: gameOptions.type,
        game_id: gameOptions.game_id,
        date: formatDate2(new Date()),
      });
      return newArray;
    });

    setChosedNumber([]);
    dispatch(showCartComponent());
  };

  const removeItem = (id: string) => {
    console.log("id", id);
    setCartNumber((previus) => previus.filter((element) => element.id !== id));
  };
  return (
    <>
        
         <Modal
          style={{
            margin: 0,
          }}
          isVisible={showCartElement}
          hasBackdrop={true}
          backdropColor="#fff"
          backdropOpacity={0.7}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          swipeDirection="right"
          useNativeDriver
          hideModalContentWhileAnimating
       >
        <View
          style={{
            

            zIndex: 151581,
            width: "100%",
            height: "100%",
          }}
        >
          <Cart onRemove={removeItem} items={cartNumbers} onSave={saveBets} />
        </View>
        </Modal>
        
      {!showGameInfo && (
        <View style={{ width: '100%', justifyContent: 'center', height: 100, alignItems: 'center', top: 80, zIndex:8484, marginTop: 10 }}>
          <TouchableOpacity onPress={() => setShowGameInfo(true)} >
            <View
              style={{
                height: 6,
                width: 36,
                backgroundColor: "#C1C1C1",
                borderRadius: 5,
                marginBottom: 10,
              }}
            ></View>
          </TouchableOpacity>
        </View>
      )}
      {showGameInfo && (
        <View style={{ ...styles.headerContainer, paddingLeft: 20 }}>
          <Text
            style={{
              fontSize: 22,
              color: "#707070",
              fontWeight: "bold",
              fontStyle: "italic",
              textTransform: "uppercase",
              marginBottom: 15,
              marginTop: 25,
            }}
          >
            NEW BET FOR {gameOptions?.type}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "#868686",
              fontStyle: "italic",
              marginBottom: 20,
            }}
          >
            Chose a game
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}
          >
            {games.map((game) => {
              if (filter === game.type) {
                return (
                  <View style={{ padding: 5 }}>
                    <FilterGameButtons
                      isNewGame={true}
                      chose={setFilterHandler.bind(null, game.type)}
                      key={game.id}
                      color={game.color}
                      name={game.type}
                      isClicked={true}
                    />
                  </View>
                );
              } else {
                return (
                  <View style={{ padding: 5 }}>
                    <FilterGameButtons
                      isNewGame={true}
                      chose={setFilterHandler.bind(null, game.type)}
                      key={Math.random().toString()}
                      color={game.color}
                      name={game.type}
                      isClicked={false}
                    />
                  </View>
                );
              }
            })}
          </View>

          {chosedNumbers.length === 0 && (
            <View>
              <Text
                style={{
                  color: "#868686",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginTop: 20,
                }}
              >
                Fill your bet
              </Text>

              <Text
                style={{
                  color: "#868686",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginTop: 20,
                }}
              >
                {gameOptions?.description}
              </Text>
            </View>
          )}

          <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {chosedNumbers.length > 0 &&
                chosedNumbers.map((num) => {
                  return (
                    <View
                      style={{ paddingBottom: 25 }}
                      key={Math.random().toString()}
                    >
                      <NumberChosed
                        key={Math.random().toString()}
                        colorGame={gameOptions?.color}
                        onRemove={removeNumber.bind(null, num)}
                      >
                        {num}
                      </NumberChosed>
                    </View>
                  );
                })}
            </View>
          </ScrollView>

          <View style={{ flexDirection: "row", marginTop: 25, marginBottom: 10 }}>
            {chosedNumbers.length > 0 && (
              <>
                <ActionButton
                  wid={110}
                  hei={32}
                  color="#B5C401"
                  backColor="#B5C401"
                  execute={completeGameHandler}
                >
                  Complet Game
                </ActionButton>
                <ActionButton
                  wid={87}
                  hei={32}
                  color="#B5C401"
                  backColor="#B5C401"
                  execute={clearGameHandler}
                >
                  Clear Game
                </ActionButton>
                <ActionButton
                  wid={122}
                  hei={32}
                  color="#B5C401"
                  backColor="#B5C401"
                  icon={true}
                  iconName="cart-outline"
                  execute={addGameToCartHandler}
                >
                  Add to Cart
                </ActionButton>
              </>
            )}
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => setShowGameInfo(false)}>
              <View
                style={{
                  height: 6,
                  width: 36,
                  backgroundColor: "#C1C1C1",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              ></View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 470,
            marginBottom: 100,
            width: "100%",
            marginLeft: 20,
            marginRight: 30,
            flexDirection: "row",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          {numbersOfTheGame.map((number) => {
            if (chosedNumbers.find((num) => num === number)) {
              return (
                <Number
                  isClicked={true}
                  backColor={gameOptions?.color}
                  key={Math.random().toString()}
                  onChose={handleChoseNumber.bind(null, number)}
                >
                  {number}
                </Number>
              );
            }

            return (
              <Number
                isClicked={false}
                key={Math.random().toString()}
                onChose={handleChoseNumber.bind(null, number)}
              >
                {number}
              </Number>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Bet;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: "100%",
    opacity: 0.8,
    marginTop: 100,
    zIndex: 9999,
    backgroundColor: "#F7F7F7",
  },
});
