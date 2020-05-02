import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
  NativeMethodsMixin,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import disc2 from "./assets/disc2.png";
import * as Font from "expo-font";

// import playclear from "./assets/playclear.png";

let soundObject: any = null; // player

// let customFonts = {
//   Cantarell: require("./assets/Cantarell-Bold.ttf"),
// };
const songs = [
  {
    name: "Amore",
    artist: "Ryuichi Sakamoto",
    file: require("./assets/Amore.mp3"),
  },
  {
    name: "Zip Line",
    artist: "Kingdom",
    file: require("./assets/ZipLine.mp3"),
  },
  {
    name: "So Emotional",
    artist: "Whitney Houston",
    file: require("./assets/Soemotional.mp3"),
  },
  {
    name: "In The City",
    artist: "Dam Funk",
    file: require("./assets/InTheCity.mp3"),
  },
  {
    name: "CREEK",
    artist: "Hiroshi Yoshimura",
    file: require("./assets/CREEK.mp3"),
  },
  {
    name: "Why Do You Love Me",
    artist: "Cocteau Twins",
    file: require("./assets/WhyDoYouLoveMe.mp3"),
  },
  { name: "Moonwell", artist: "Hana", file: require("./assets/Moonwell.mp3") },
  { name: "Mizu", artist: "Qrion", file: require("./assets/Mizu.mp3") },
  { name: "Flee", artist: "Mechatok", file: require("./assets/Flee.mp3") },
  {
    name: "Forest Coloss",
    artist: "Mobilegirl",
    file: require("./assets/Forestcoloss.mp3"),
  },
];
// export default props => {
//   let [fontsLoaded] = useFonts({
//     'Inter-Black': require('./assets/Cantarell-BoldItalic.ttf'),
//   });

export default class App extends React.Component<
  {},
  { songIndex: number; playing: boolean }
> {
  //capture as component state variables, some things we'll use to affect ui/keep track of player state
  // const [songIndex, setSongIndex] = songs[0];

  // async _loadFontsAsync() {
  //   await Font.loadAsync(customFonts);
  //   this.setState({ fontsLoaded: true });
  // }

  // componentDidMount() {
  //   this._loadFontsAsync();
  // }

  constructor(props: any) {
    super(props);
    this.state = { songIndex: 0, playing: false };
    this.load(songs[0], false);
    console.log("SONG IS X", songs[0].name);
  }
  async load(song: any, play: boolean) {
    if (soundObject !== null) {
      await soundObject.unloadAsync();
    }
    soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate((status: any) => {
      // console.log(status);
      // setPlaying(status.isPlaying);
      if (status.didJustFinish) {
        console.log("DONE");
        this.next();
      }
    });
    console.log("SONG", song.name);
    await soundObject.loadAsync(song.file);
    if (play) {
      await soundObject.playAsync();
    }
    return soundObject;
  }
  async next() {
    //play next song
    console.log("NEXT", this.state.songIndex);
    const newIndex = this.state.songIndex + 1;
    if (newIndex < songs.length) {
      console.log("New Index", newIndex);
      console.log("IF WORKS");
      this.load(songs[newIndex], true);
      this.setState({ songIndex: newIndex });
    }
  }
  render() {
    console.log("hello hi hello");
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Disckid</Text>
          <Image source={disc2} style={styles.logo} />
          {/* <Text style={{ color: "#fff", fontSize: 18 }}>
            {this.state.playing ? "I'm playing" : "not playing"}
            Now playing track {this.state.songIndex + 1}:{" "}
            {songs[this.state.songIndex].name} -{" "}
            {songs[this.state.songIndex].artist}
          </Text> */}
        </View>
        <View style={styles.nowplaying}>
          <Text style={styles.now}>
            Now playing: {songs[this.state.songIndex].name} -{" "}
            {songs[this.state.songIndex].artist}
          </Text>
        </View>
        <ScrollView style={styles.list}>
          <View style={styles.listContainer}>
            <FlatList
              data={[
                { key: songs[0].name + " \u00B7 " + songs[0].artist },
                { key: songs[1].name + " \u00B7 " + songs[1].artist },
                { key: songs[2].name + " \u00B7 " + songs[2].artist },
                { key: songs[3].name + " \u00B7 " + songs[3].artist },
                { key: songs[4].name + " \u00B7 " + songs[4].artist },
                { key: songs[5].name + " \u00B7 " + songs[5].artist },
                { key: songs[6].name + " \u00B7 " + songs[6].artist },
                { key: songs[7].name + " \u00B7 " + songs[7].artist },
                { key: songs[8].name + " \u00B7 " + songs[8].artist },
              ]}
              renderItem={({ item }) => (
                <Text style={styles.list}>{item.key}</Text>
              )}
            />
          </View>
        </ScrollView>

        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => soundObject.playAsync()}>
              <Image
                style={styles.play}
                source={require("./assets/playclear.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => soundObject.pauseAsync()}>
              <Image
                style={styles.play}
                source={require("./assets/pauseclear2.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.next()}>
              <Image
                style={styles.next}
                source={require("./assets/nextclear.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// function ImageButton() {
//   return (
//     <TouchableOpacity onPress={() => soundObject.playAsync()}>
//       <Image style={styles.button} source={require("./assets/playclear.png")} />
//     </TouchableOpacity>
//   );
// }

const styles = StyleSheet.create({
  screen: {
    flex: 3,
    backgroundColor: "#001A33",
    // backgroundColor: "#000316",

    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 1,
    // backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },

  buttons: {
    flex: 0.4,
    flexDirection: "row",
    // backgroundColor: "#001A33",
    // justifyContent: "center",
    // alignItems: "center",
  },

  buttonContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    flex: 3,
    flexDirection: "row",
    color: "#E8E8E8",
    fontSize: 16,
    // backgroundColor: "lightgreen",
    // justifyContent: "center",
    // alignItems: "center",
    borderBottomColor: "#383838",
    borderBottomWidth: 1,
    borderTopColor: "#383838",
    borderTopWidth: 1,
  },

  listContainer: {
    flex: 3,
    // justifyContent: "center",
    // alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
  },

  play: {
    width: 70,
    height: 70,
  },

  next: {
    width: 60,
    height: 60,
  },
  columnWrapper: {
    // width: 100,
    // height: 100,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    color: "#E8E8E8",
    fontSize: 30,
    // fontWeight: 3,
    // fontFamily: "Cantarell",
    // fontFamily: "Ping Fang HK Semi Bold",
  },
  nowplaying: {
    flex: 0.2,
    // borderBottomColor: "grey",
    // borderBottomWidth: 3,
  },
  now: {
    flex: 0.4,
    color: "#E8E8E8",
    fontSize: 18,
    borderBottomColor: "grey",
    borderBottomWidth: 3,
  },
});
