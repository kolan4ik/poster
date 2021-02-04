import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { PostList } from "../components/PostList";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { loadPosts } from "../store/actions/post";

export const BookedScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate("Post", {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const allBoockedPost = useSelector((state) => state.post.allBookedPost);

  return <PostList data={allBoockedPost} onOpen={openPostHandler} />;
};

BookedScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Избранное",
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});
