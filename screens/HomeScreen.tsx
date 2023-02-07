import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setAlbumList} from '../redux/slices/albumSlice';
import GetAlbumService from '../services/Albums/GetAlbums';

const HomeScreen = () => {
  // const {albums = [], limit} = useSelector(state => state.album);
  const [albumData, setAlbumData] = useState();
  const [pageNumber, setPageNumber] = useState(20);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    const {name, originallyReleased, trackCount, id, artistName} = item;

    return (
      <View style={{flex: 1, margin: 20}}>
        <Card
          style={{
            width: '100%',
            height: 250,
            justifyContent: 'space-evenly',
          }}
          onPress={() => {
            navigation.navigate('TrackListScreen', {
              albumId: id,
            });
          }}>
          <ImageBackground
            source={require('../assets/music.jpg')}
            style={{
              width: 'auto',
              height: '100%',
            }}>
            <View style={{flex: 1.3}}>
              <Text
                style={{
                  fontSize: 17,
                  margin: 8,
                  color: 'lime',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {name}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'yellow',
                  margin: 8,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {artistName}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {originallyReleased.substr(0, 10)}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    fontSize: 16,
                    margin: 10,
                    color: '#40e0d0',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  Tracks - {trackCount}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <IconButton
                  icon="play"
                  size={18}
                  style={{backgroundColor: '#87ceeb'}}
                />
              </View>
            </View>
          </ImageBackground>
        </Card>
      </View>
    );
  };

  function fetchMoreData() {
    let temp = pageNumber + 5;
    setPageNumber(temp);
    getAlbums(temp, pageNumber);
  }

  async function getArtists(artistIdList: []) {}

  async function getAlbums(tempLimit, tempOffset) {
    await GetAlbumService(tempLimit, tempOffset)
      .then(response => {
        let temp: [] = response.data.albums;
        setAlbumData(temp);
        dispatch(
          setAlbumList({
            albumList: temp,
            offset: tempOffset,
          }),
        );
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  // const setAlbum = () => {
  //   albums.length ? setAlbumData(albums) : getAlbums(pageNumber, 0);
  //   console.log(albums[0]);
  // };

  useEffect(() => {
    getAlbums(pageNumber, 0);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#6495ed'}}>
      <FlatList
        style={{flex: 1, margin: 10}}
        data={albumData}
        extraData={albumData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={fetchMoreData}
      />
    </View>
  );
};

export default HomeScreen;
