// components/classic/music/index.js
const audio = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: String,
    content: String,
    url: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,
    play: "images/play.png",
    pause: "images/pause.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMusic() {
      if (this.data.isPlay) {
        audio.pause();
        this.setData({
          isPlay: false
        })
      } else {
        audio.title = this.properties.title;
        audio.src = this.properties.url;
        this.setData({
          isPlay: true
        })
      }
    },
    _recoveryMusic() {
      if (audio.src == this.properties.url) {
        this.setData({
          isPlay: true
        })
      }
      if (audio.paused) {
        this.setData({
          isPlay: false
        })
      }
    },
    _monitorMusic() {
      //点播放，开始
      audio.onPlay(() => {
        this.setData({
          isPlay: true
        })
      })
      //点暂停，不播放
      audio.onPause(() => {
        this.setData({
          isPlay: false
        })
      })
      //关掉的时候，不播放
      audio.onStop(() => {
        this.setData({
          isPlay: false
        })
      })
      //歌曲放完的时候，自动停止
      audio.onEnded(() => {
        this.setData({
          isPlay: false
        })
      })
    }
  },
  attached() {
    this._recoveryMusic();
    this._monitorMusic();
  }

})