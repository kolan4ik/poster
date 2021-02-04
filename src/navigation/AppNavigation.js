import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MainScreen } from "../screens/MainScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { PostScreen } from "../screens/PostScreen";
import { BookedScreen } from "../screens/BookedScreen";
import { THEME } from "../theme";

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "ios" ? "#fff" : THEME.MAIN_COLOR,
    },
    headerTintColor: Platform.OS === "ios" ? THEME.MAIN_COLOR : "#fff",
  },
};
const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen,
  },
  navigatorOptions
);

const BookedNavigator = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen,
  },
  navigatorOptions
);
const bottomTabConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: "Все",
      tabBarIcon: (info) => (
        <Ionicons name="ios-albums" size={25} color={info.tintColor} />
      ),
    },
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: "Избранное",
      tabBarIcon: (info) => (
        <Ionicons name="ios-star" size={25} color={info.tintColor} />
      ),
    },
  },
};

const aboutNavigatoe = createStackNavigator(
  {
    About: AboutScreen,
  },
  navigatorOptions
);

const createNavigatoe = createStackNavigator(
  {
    Create: CreateScreen,
  },
  navigatorOptions
);

const BottomNavigator =
  Platform.OS === "ios"
    ? createBottomTabNavigator(bottomTabConfig, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR,
        },
      })
    : createMaterialBottomTabNavigator(bottomTabConfig, {
        activeTintColor: "#fff",
        shifting: true,
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
      });

const mainNavigatoe = createDrawerNavigator(
  {
    PostTabs: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerLabel: "Главная",
        //drawerIcon: <Ionicons name="ios-star" />,
      },
    },
    About: {
      screen: aboutNavigatoe,
      navigationOptions: {
        drawerLabel: "О приложении",
      },
    },
    Create: {
      screen: createNavigatoe,
      navigationOptions: {
        drawerLabel: "Новый пост",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: "open-bold",
      },
    },
  }
);
export const AppNavigation = createAppContainer(mainNavigatoe);
