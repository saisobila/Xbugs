import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, {useRef, useState, useEffect} from "react";
import {SvgXml} from "react-native-svg";
import List from "./list";
import * as SQLite from "expo-sqlite";

export default function Home() {
  const timehr = new Date().getHours();
  const timemin = new Date().getMinutes();
  const Month = new Date().toLocaleString("default", {month: "short"});
  const day = new Date().getDate();

  const db = SQLite.openDatabase("example.db");
  const [data, setdata] = useState([]);
  const [newTitle, setnewTitle] = useState();
  const [newDescription, setnewDescription] = useState();
  const res = 0;

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS BugDataTest ( id INTEGER PRIMARY KEY AUTOINCREMENT , title TEXT , desc TEXT, res INTEGER, day INTEGER, mon TEXT, hr INTEGER, min INTEGER )"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM BugDataTest ORDER BY id DESC",
        null,
        (txOBJ, resultSet) => {
          setdata(resultSet.rows._array);
          // console.log("6" + resultSet);
          // console.log("1" + resultSet.rows._array);
        },
        (txOBJ, error) => console.log("2" + txOBJ + error)
      );
    });
  }, []);

  const AddNewBug = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO BugDataTest (title, desc, res, day, mon, hr, min) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [newTitle, newDescription, res, day, Month, timehr, timemin],
        (txObj, resultSet) => {
          // console.log(resultSet);
          setnewTitle();
          setnewDescription();
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <View style={styles.main}>
      <StatusBar style="light" backgroundColor="white" translucent={false} />
      <View
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View style={styles.logoStyle}>
          <View style={{width: "50%"}}>
            <Text style={{fontSize: 28, fontWeight: "bold"}}>
              Manage your Bugs Here
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center", 
              alignItems: "center",
            }}
          >
            <View>
              <SvgXml xml={logo} height={70} width={70}></SvgXml>
            </View>
            <Text
              style={{
                color: "black",
                fontSize: 22,
                fontWeight: "bold",
                marginLeft: -20,
              }}
            >
              BUGS
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={{display: "flex", alignItems: "center"}}>
          <View style={[styles.addBug]}>
            <View
              style={{display: "flex", width: "100%", alignItems: "center"}}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  marginBottom: 20,
                  fontWeight: 800,
                }}
              >
                Add New Bug
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Bug Title (Prefer 30 characters)"
                placeholderTextColor="grey"
                selectionColor={"white"}
                onChangeText={setnewTitle}
                value={newTitle}
              ></TextInput>
              <TextInput
                multiline={true}
                onChangeText={setnewDescription}
                value={newDescription}
                style={[styles.input, {height: 70}]}
                placeholder="Bug Description "
                placeholderTextColor="grey"
                selectionColor={"white"}
              ></TextInput>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => AddNewBug()}
                  activeOpacity={0.7}
                  style={styles.Button}
                  title="Add Bug"
                >
                  <Text style={{fontSize: 18, fontWeight: "bold"}}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.Buglist}>
            {data.map((name, index) => {
              const id = name.id;
              return (
                <List
                  key={name.id}
                  id={name.id}
                  Title={name.title}
                  Description={name.desc}
                  Day={name.day}
                  Month={name.mon}
                  Hour={name.hr}
                  Min={name.min}
                  res={name.res}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const logo =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M9 7h2l1 2.5L13 7h2l-2 5l2 5h-2l-1-2.5l-1 2.5H9l2-5zm3-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 14 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8"/></svg>';

const styles = StyleSheet.create({
  main: {
    height: "100%",
    backgroundColor: "white",
    width: "100%",
    display: "flex",
  },
  logoStyle: {
    height: 70,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  addBug: {
    backgroundColor: "black",
    height: 300,
    width: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    borderRadius: 30,
  },
  input: {
    backgroundColor: "black",
    width: 250,
    height: 45,
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 2,
    color: "white",
    borderColor: "white",
    fontSize: 16,
  },
  Button: {
    height: 50,
    width: 140,
    backgroundColor: "white",
    borderRadius: 50,
    marginTop: 20,
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: 300,
    width: "100%",
    backgroundColor: "green",
    // ... other styles
  },
  header: {
    // ... header styles
  },
  content: {
    padding: 20,
    // ... content styles
  },
  Buglist: {
    width: "100%",
    height: 1000,
    backgroundColor: "black",
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
});
