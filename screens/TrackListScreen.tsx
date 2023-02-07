import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setAlbumList} from '../redux/slices/albumSlice';
import GetAlbumByIdService from '../services/Albums/GetAlbumById';
import GetAlbumService from '../services/Albums/GetAlbums';
import GetTracksByAlbumIdService from '../services/Tracks/GetTracksByAlbumId';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {useIsFocused} from '@react-navigation/native';

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
  } catch (error) {
    console.log('error', error);
    await TrackPlayer.reset();
    await TrackPlayer.updateOptions({
      stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Stop,
      ],
    });
    console.log('heree');
  }
};

const togglePlayBack = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log('hereaaa', currentTrack, playbackState);
  if (currentTrack != null) {
    if (playbackState != State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const TrackListScreen = (props: number) => {
  const playBackState = usePlaybackState();
  const {albumId} = props.route.params;
  const [tracksData, setTracksData] = useState();
  var previewUrlList: any[] | Track = [];
  const isFocused = useIsFocused();
  const renderItem = ({item, index}) => {
    const {albumName, name, artistName, playbackSeconds, previewURL} = item;

    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          borderRadius: 10,
          borderWidth: 0.2,
          borderColor: 'black',
          height: 120,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1.5,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 19,
              fontWeight: 'bold',
              left: 10,
            }}>
            {name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              left: 20,
            }}>
            {artistName}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                left: 20,
                alignSelf: 'flex-start',
              }}>
              {(playbackSeconds / 60).toPrecision(2)} mins
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconButton
              icon={'play'}
              size={30}
              style={{alignSelf: 'flex-end'}}
              onPress={async () => {
                let tempCurrent = await TrackPlayer.getCurrentTrack();
                if (tempCurrent === index) {
                  console.log('nnnnn');
                  togglePlayBack(playBackState);
                } else {
                  await TrackPlayer.skip(index);
                  await TrackPlayer.play();
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  async function setPreviewUrlList(trackList) {
    let temp = [] as any;
    await trackList.forEach((element, index) => {
      const {albumName, name, artistName, playbackSeconds, previewURL} =
        element;
      temp.push({
        id: index,
        title: name,
        artist: artistName,
        artwork: null,
        url: previewURL,
      });
    });
    previewUrlList = temp;
    await TrackPlayer.add(temp);
  }
  async function getAlbumDetails() {
    await GetTracksByAlbumIdService(albumId)
      .then(response => {
        let temp = response.data.tracks;
        setTracksData(temp);
        setPreviewUrlList(temp);
      })
      .catch(error => {});
  }

  useEffect(() => {
    setupPlayer();
  }, [isFocused]);

  useEffect(() => {
    getAlbumDetails();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#6495ed'}}>
      <FlatList
        data={tracksData}
        extraData={tracksData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

export default TrackListScreen;
