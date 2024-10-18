import React from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { SuggestionListItem } from "./SuggestionListItem";

export class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.searchInputRef = undefined;
  }

  handleOnPressItem = (item, event) => {
    this.searchInputRef.blur();
    this.props.onPressItem(item, event); // Use this.props here
  };

  render() {
    return (
      <View style={styles.suggestionListContainer}>
        <TextInput
          ref={(ref) => {
            this.searchInputRef = ref;
          }}
          style={styles.searchInput}
          placeholder={this.props.placeholder} // Use this.props here
          onChangeText={this.props.handleSearchTextChange} // Use this.props here
        ></TextInput>
        {this.props.showList && ( // Use this.props here
          <FlatList
            style={styles.searchList}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps="always"
            initialNumToRender={5}
            data={this.props.suggestionListData} // Use this.props here
            renderItem={({ item }) => (
              <SuggestionListItem
                onPressItem={this.handleOnPressItem} // Use this.handleOnPressItem
                item={item}
              ></SuggestionListItem>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchButtons: {
    flexDirection: "row",
    height: "10%",
    backgroundColor: "#fff",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    paddingLeft: 18,
    paddingRight: 18,
  },
  searchInput: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius:10
  },
  suggestionListContainer: {
    width: "90%",
    marginLeft: "5%",
  },
  searchList: {
    width: "95%",
    marginTop: 10,
  },
});
