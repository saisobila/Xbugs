import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  GestureDetector,
  Gesture,
  gestureHandlerRootHOC,
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import {SvgXml} from "react-native-svg";
import * as SQLite from "expo-sqlite";

export default function list(props) {
  const db = SQLite.openDatabase("example.db");

  const leftaction = (id) => {

    const sId = id
    function delClick() {
      console.log("clicked");
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM BugDataTest WHERE id = ?",
          [sId],
          (txObj, res) => {
            console.log(res);
          },
          (txObj2, error) => console.log(error)
        );
      });
    }

    function resClick() {}

    return (
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity
          onPress={delClick}
          style={{
            width: "30%",
            backgroundColor: "white",
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <SvgXml height={48} width={48} xml={del}></SvgXml>
        </TouchableOpacity>
        <View
          style={{
            width: "30%",
            backgroundColor: "white",
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgXml height={48} width={48} xml={res}></SvgXml>
        </View>
      </View>
    );
  };

  let dotcolour = props.res;
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <GestureHandlerRootView>
        <Swipeable renderLeftActions={() => leftaction(props.id)}>
          <View style={styles.list}>
            <View style={styles.resolve}>
              <View
                style={{
                  backgroundColor: dotcolour === 0 ? "red" : "green",
                  width: 15,
                  height: 15,
                  borderRadius: 50,
                }}
              ></View>
            </View>
            <View style={styles.infoCon}>
              <View>
                <Text style={styles.title}>{props.Title}</Text>
              </View>
              <View>
                <Text style={styles.desc}>{props.Description}</Text>
              </View>
            </View>
            <View style={styles.resolve}>
              <Text style={{fontSize: 30, fontWeight: "600"}}>+</Text>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <View style={styles.wline}></View>
        <View style={{display: "flex", width: "31%", marginLeft: 6}}>
          <Text style={styles.time}>
            {" "}
            {props.Day} {props.Month} at {props.Hour}:{props.Min}
          </Text>
        </View>
      </View>
    </View>
  );
}

const del =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/></svg>';

const res =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="black" fill-rule="evenodd" d="M13.657 3.05a.5.5 0 1 0-.707-.707l-.366.366A7 7 0 1 0 8 15a4.994 4.994 0 0 1-.597-1.03a6 6 0 1 1 4.471-10.552l-.71.71a5 5 0 1 0-4.08 8.788a5.028 5.028 0 0 1-.082-1.042A4.002 4.002 0 0 1 8 4a3.98 3.98 0 0 1 2.453.84l-.715.714a3 3 0 0 0-3.86 4.567a.5.5 0 1 0 .708-.707a2 2 0 0 1 2.43-3.137l-.757.757a1 1 0 1 0 .707.707l1.155-1.155l2.46-2.46a5.972 5.972 0 0 1 1.39 3.277c.367.158.713.36 1.029.597c0-1.636-.57-3.271-1.71-4.584zM16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-1.646-1.354a.5.5 0 0 1 0 .707l-2.5 2.5a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.707l.646.647l2.146-2.147a.5.5 0 0 1 .708 0"/></svg>';
const styles = StyleSheet.create({
  list: {
    display: "flex",
    width: "97%",
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  resolve: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "8%",
  },
  infoCon: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "95%",
    width: "82%",
    marginLeft: 5,
  },
  title: {
    fontSize: 22,
    marginTop: 5,
    fontWeight: "600",
    color: "black",
  },
  desc: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 10,
    color: "#4d4d4d",
    fontWeight: "500",
  },
  wline: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 0,
    width: "65%",
    backgroundColor: "white",
    height: 0.8,
  },
  time: {
    width: "100%",
    color: "white",
  },
});

const data = [
  {
    id: 1,
    title: "this is the title of the bug, it is too long ",
    desc: "this is normal bug in the main section irritates me every time",
    resolved: false,
    day: 13,
    mon: "feb",
    hr: 12,
    min: 45,
  },
];
