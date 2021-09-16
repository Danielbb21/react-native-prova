import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo } from "../store/UserSlice";
import FilterGameButtons from "./FilterGameButtons";
import { colors } from "../utils";
import Number, { NumberChosed } from "./Number";
import { api } from "../api";
import useApi from "../hooks/use-api";
const { PRIMARY_COLOR } = colors;
import * as Progress from "react-native-progress";
import { StatusBar } from "expo-status-bar";

interface CartObj {
  maxNumber: number;
  type: string;
  price: string;
  color: string;
  gameNumbers: string;
  date_game: string;
  game_date: string;
  game_id: number;
  user_id: number;
  id: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  token?: string;
  token_created_at?: string;
  created_at: string;
  updated_at: string;
}
interface Game {
  id: string;
  type: string;
  description: string;
  range: number;
  price: number;
  "max-number": number;
  color: string;
  "min-cart-value": number;
  created_at: string;
  updated_at: string;
}
interface Data {
  id: number;
  gameNumbers: string;
  user_id: number;
  game_id: number;
  price: number;
  game_date: string;
  created_at: string;
  updated_at: string;
  user: User;
  game: Game;
}

interface Bets {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data?: Data[];
}

const FilterGame = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);
  const allGames = useAppSelector((state) => state.game.items);
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  const bets = useAppSelector((state) => state.cart.items);
  const [betGame, setBetGame] = useState(bets);
  const [gameId, setGameId] = useState<string[]>([]);
  const [teste, setTeste] = useState<Bets[]>([]);
  const data = teste.map((t) => t.data);

  const { betsData, fetchData, isLoading, finish } = useApi();
  const [pageChosed, setPageChosed] = useState<number>();
  // const [data1, setData1] = useState(betsData?.data);
  useEffect(() => {
    fetchData(0, gameId);
    console.log("AQUIII");
  }, [bets, fetchData]);

  useEffect(() => {
    console.log("INIT");
    fetchData(1);
  }, [fetchData]);
  useEffect(() => {
    console.log("aquiii");
    dispatch(getGameData(token));
    // fetchData(1);

    setPageChosed(0);
    dispatch(getUserInfo(token));
  }, [token, dispatch, fetchData]);

  useEffect(() => {
    console.log("GAME_ID", gameId);
    fetchData(0, gameId);
    // api
    //   .get(`/gamble?gamble&page=1&games=${gameId}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     // console.log("RESPONse", response.data);
    //     setTeste(response.data);
    //   })
    //   .catch((err) => {
    //     console.log("ERRR", err.message);
    //   });
    if (gameFilters.length > 0) {
      setBetGame([]);
    }

    for (let i = 0; i < gameFilters.length; i++) {
      for (let j = 0; j < bets.length; j++) {
        if (bets[j].type === gameFilters[i]) {
          console.log("betSelected", bets[j]);

          setBetGame((previus) => {
            return [...previus, bets[j]];
          });
        }
      }
    }
    if (gameFilters.length === 0) {
      setBetGame(bets);
    }
  }, [gameFilters]);

  const setFilterHandler = (type: string) => {
    const gameFind = gameFilters.find((game) => game === type);
    const game_teste = allGames.find((game) => game.type === type);
    console.log("game_teste", game_teste);
    if (game_teste) {
      const gameAlreadyExist = gameId.find((game) => game === game_teste.id);
      if (!gameAlreadyExist) {
        setGameId((previus) => {
          const arr = [...previus];
          arr.push(game_teste.id);
          return arr;
        });
      } else {
        setGameId((game) => {
          const novo = [...game];
          return novo.filter((g) => g !== game_teste.id);
        });
      }
    }

    if (!gameFind) {
      setGameFilters((previus) => {
        const array = [...previus];
        array.push(type);
        return array;
      });
      return;
    }
    setGameFilters((previus) => {
      const array = [...previus];
      return array.filter((element) => element !== type);
    });
  };
  let allPages: number[] = [];

  if (betsData?.lastPage) {
    for (let i = 0; i < betsData.lastPage; i++) {
      allPages.push(i);
    }
  }

  const changePage = (page: number) => {
    console.log("PAGE", page + 1);
    setPageChosed(page);
    fetchData(page, gameId);
  };
  const formatApiDate = (date: string) => {
    const dateString = date.split("T");
    const data = dateString[0].split("-");
    const day = data[2];
    const month = data[1];
    const year = data[0];

    return `${day}/${month}/${year}`;
  };
  const arr = betsData?.data ? betsData.data : [];
  // console.log('INIT ', betsData?.data, isLoading);
  return (
    <View style={{ top: 100, marginLeft: 20, flex: 1, opacity: 0.95 }}>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontSize: 22,
            color: PRIMARY_COLOR,
            alignItems: "center",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Recent Games
        </Text>
        <Text style={{ fontSize: 17, fontStyle: "italic", color: "#868686" }}>
          Filters
        </Text>
        <View style={styles.buttons}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", width: "100%", padding: 10 }}>
              {allGames.length > 0 &&
                allGames.map((game) => {
                  if (gameFilters.find((g) => g === game.type)) {
                    return (
                      <FilterGameButtons
                        isNewGame={false}
                        chose={setFilterHandler.bind(null, game.type)}
                        key={game.id}
                        color={game.color}
                        name={game.type}
                        isClicked={true}
                      />
                    );
                  }
                  return (
                    <FilterGameButtons
                      isNewGame={false}
                      chose={setFilterHandler.bind(null, game.type)}
                      key={game.id}
                      color={game.color}
                      name={game.type}
                      isClicked={false}
                    />
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={{ height: 400 }}>
        {/* {isLoading &&(
               <View
               style={{
                 position: "absolute",
                 
                 height: '100%',
                 width: "100%",
                 backgroundColor: "#fff",
                 opacity: 1,
                 justifyContent: "center",
                 alignItems: "center",
               }}
             >
               <Progress.Circle
               size={100}
               indeterminate={true}
               color="#B5C401"
               thickness={2}
             />
             </View>
            )} */}
        {isLoading && (
          <View
            style={{
              position: "absolute",
              zIndex: 11418418,
              width: "100%",
              height: "100%",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Progress.Circle
              size={100}
              indeterminate={true}
              color="#B5C401"
              thickness={2}
            />

            <StatusBar style="auto" />
          </View>
        )}
        {arr?.length === 0 && !isLoading && finish && (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
            >
              No Game found
            </Text>
          </View>
        )}
        <ScrollView>
          {betsData &&
            betsData?.data &&
            betsData?.data.map((bet) => {
              return (
                <View
                  key={Math.random().toString()}
                  style={{
                    ...styles.betInfo,
                    borderLeftWidth: 6,
                    borderLeftColor: bet.game.color,
                  }}
                >
                  <Text style={{ ...styles.betNumbers }}>
                    {bet.gameNumbers.toString()}
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
                      {formatApiDate(bet.game_date)} - (R${" "}
                      {bet.price.toFixed(2).toString().replace(".", ",")})
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: bet.game.color,
                    }}
                  >
                    {bet.game.type}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.buttonWrapper}>
          {allPages.length > 1 &&
            allPages.map((page) => {
              if (pageChosed === page) {
                return (
                  <TouchableOpacity
                    onPress={changePage.bind(this, page)}
                    style={{
                      ...styles.pageChanger,
                      backgroundColor: "#D3D3D3",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{page + 1}</Text>
                  </TouchableOpacity>
                  //   <ButtonFilter onClick={changePage.bind(this, page)} isClicked = {true}>

                  // </ButtonFilter>
                );
              }
              return (
                <TouchableOpacity
                  onPress={changePage.bind(this, page)}
                  style={styles.pageChanger}
                >
                  <Text>{page + 1}</Text>
                </TouchableOpacity>
                // <ButtonFilter onClick={changePage.bind(this, page)}>
                //   {page + 1}
                // </ButtonFilter>
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default FilterGame;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
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
    width: "100%",
    flexWrap: "wrap",
  },
  buttonWrapper: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 10,
  },
  pageChanger: {
    height: 30,
    width: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});
