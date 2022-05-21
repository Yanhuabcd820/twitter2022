import moment from 'moment'
moment.locale('zh-tw');

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    },
    ampm(datetime) {
      return datetime ? moment(datetime).format(' A hh:mm ・ YYYY年MM月DD日') : '-'
    },

  }
}


export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    },
    emptyAvatar(src) {
      return src || 'https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    },
    emptyCover(src) {
      return src || 'https://images.pexels.com/photos/85683/sheep-flock-of-sheep-series-standing-on-85683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    }
  }
}